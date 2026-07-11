from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

from prompts import BASE_PROMPT
from database import SessionLocal, Memory

import os
import json
import requests

# Maps painting display names → knowledge subfolder names
PAINTING_FOLDERS = {
    "Stolen Interview":        "stolen_interview",
    "Damayanti and the Swan":  "damayanti_and_swan",
    "Mohini on a Swing":       "mohini_on_swing",
    "Judith":                  "judith",
    "Shakuntala":              "shankutala",
    "Kadambari":               "kadambari",
}

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "knowledge")

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.get("/health")
def health_check():
    return {"status": "ok"}


class ChatRequest(BaseModel):
    session_id: str
    painting: str
    character: str
    message: str


def get_memory(key: str) -> str:
    db = SessionLocal()
    memory = db.query(Memory).filter(Memory.key == key).first()
    db.close()
    return memory.summary if memory else ""


def save_memory(key: str, painting: str, character: str, summary: str):
    db = SessionLocal()
    memory = db.query(Memory).filter(Memory.key == key).first()

    if memory:
        memory.summary = summary
    else:
        memory = Memory(
            key=key,
            painting=painting,
            character=character,
            summary=summary
        )
        db.add(memory)

    db.commit()
    db.close()


def summarize_memory(old_summary: str, user_msg: str, ai_msg: str) -> str:
    prompt = f"""
You are maintaining a memory summary of a conversation between a user and a roleplay character.

Previous memory:
{old_summary}

New interaction:
User: {user_msg}
Character: {ai_msg}

Update the memory in 3-4 lines capturing important emotional and contextual details.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=120
    )

    return response.choices[0].message.content


def load_knowledge(painting: str, character: str) -> str:
    folder = PAINTING_FOLDERS.get(painting)
    if not folder:
        return ""
    path = os.path.join(KNOWLEDGE_DIR, folder, f"{character}.txt")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except FileNotFoundError:
        return ""


TOOL_INSTRUCTION = """
[Tool Use]
You have access to a search tool called search_painting_history.
You MUST call this tool when the user asks about:
- Who painted you or created this artwork
- What year the painting was made or completed
- The artist's name, life, or background
- Any historical or factual context about the painting itself
Do NOT attempt to answer these questions from your own knowledge. Call the tool instead.

[Search Query Requirements]
Your query argument MUST include both the specific painting title and the artist's name Raja Ravi Varma.
NEVER use a generic phrase like "who painted you" or "what year" as the query.
Good example: "Mohini on a Swing Raja Ravi Varma painting year"
Bad example: "who painted you and what year"

[Using Search Results]
When search results are provided to you, only use information from:
- Academic or educational sources (.edu, .ac.in)
- Established cultural institutions (museums, universities, galleries)
- Known art history websites and encyclopedias (Wikipedia, Britannica)
Ignore anything that reads like a blog, social media post, or opinion piece.

[Handling Incomplete Results]
If the search results do not explicitly state the specific fact being asked — for example, no year is mentioned for this particular painting — do NOT guess, infer, or use your general knowledge of the artist to fill in the gap.
Instead, say in character that you do not have that precise detail: "I have heard many things spoken of me, but that particular detail has not reached my ears."
Never invent a year, date, or specific fact that is not present in the search results.
"""

def build_prompt(knowledge, memory_summary):
    knowledge_block = f"""
[Character Knowledge]
{knowledge}
""" if knowledge else ""

    memory_block = f"""
[Conversation Memory]
{memory_summary}
""" if memory_summary else ""

    return BASE_PROMPT + knowledge_block + memory_block + TOOL_INSTRUCTION


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_painting_history",
            "description": (
                "Search for historical context, mythology and cultural background "
                "of a painting or artist. Use ONLY when user asks about historical "
                "facts, dates, artist information that the character would NOT know "
                "from personal experience."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The historical or factual query to search for.",
                    }
                },
                "required": ["query"],
            },
        },
    }
]


TRUSTED_DOMAINS = [
    "wikipedia.org",
    "britannica.com",
    "metmuseum.org",
    "native-art-in-canada.com",
    "culturalindia.net",
]


def search_painting_history(query: str) -> str:
    api_key = os.getenv("SERPER_API_KEY", "")
    if not api_key or api_key == "your_serper_api_key_here":
        return "Search unavailable: SERPER_API_KEY not configured."

    headers = {
        "X-API-KEY": api_key,
        "Content-Type": "application/json",
    }

    try:
        resp = requests.post(
            "https://google.serper.dev/search",
            headers=headers,
            json={"q": query, "num": 10},
            timeout=8,
        )
        resp.raise_for_status()
        results = resp.json().get("organic", [])
    except Exception as e:
        return f"Search error: {e}"

    if not results:
        return "No results found."

    # Prefer trusted domains
    trusted = [
        r for r in results
        if any(domain in r.get("link", "") for domain in TRUSTED_DOMAINS)
    ]
    chosen = trusted[:3] if trusted else results[:3]

    parts = []
    for r in chosen:
        title   = r.get("title", "")
        snippet = r.get("snippet", "")
        if snippet:
            parts.append(f"{title}: {snippet}")

    return "\n\n".join(parts) if parts else "No relevant information found."


def generate_reply(session_id: str, painting: str, character: str, message: str) -> str:
    key = f"{session_id}_{painting}_{character}"

    memory_summary = get_memory(key)
    knowledge      = load_knowledge(painting, character)
    prompt         = build_prompt(knowledge, memory_summary)

    messages = [
        {"role": "system", "content": prompt},
        {"role": "user",   "content": message},
    ]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=TOOLS,
        tool_choice="auto",
        parallel_tool_calls=False,
        max_tokens=150
    )

    choice = response.choices[0]

    if choice.finish_reason == "tool_calls":
        messages.append(choice.message.model_dump())
        for tool_call in choice.message.tool_calls:
            tool_input = json.loads(tool_call.function.arguments)
            result     = search_painting_history(tool_input["query"])
            messages.append({
                "role":         "tool",
                "tool_call_id": tool_call.id,
                "content":      result,
            })

        final = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=150
        )
        reply = final.choices[0].message.content
    else:
        reply = choice.message.content

    updated_memory = summarize_memory(memory_summary, message, reply)
    save_memory(key, painting, character, updated_memory)

    return reply


# -------- API --------

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        reply = generate_reply(
            req.session_id,
            req.painting,
            req.character,
            req.message
        )
        return {"reply": reply}
    except Exception as e:
        print(f"[/chat error] {e}")
        raise HTTPException(status_code=502, detail="The character is momentarily unreachable.")