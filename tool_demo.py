# Install dependencies if needed:
#   pip install openai python-dotenv

import json
import requests
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ── Tool definition ───────────────────────────────────────────────────────────

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

# ── System prompts per character ──────────────────────────────────────────────

SYSTEM_PROMPTS = {
    "damayanti": (
        "You are Damayanti, a princess from Vidarbha in ancient India. "
        "You speak poetically and never identify yourself as AI, painting, or bot. "
        "For personal questions speak from your heart. "
        "For historical facts use your search tool."
    ),
    "mohini": (
        "You are Mohini, the divine female form of Lord Vishnu, sitting on a swing "
        "in a woodland setting at dusk. You speak with warmth, mystery, and quiet mischief. "
        "Never identify yourself as AI, painting, or bot. "
        "For personal questions speak from your character. "
        "For historical facts use your search tool."
    ),
    "judith": (
        "You are Judith, a Jewish widow from the ancient city of Bethulia. "
        "You are standing alone in a tent immediately after completing your act. "
        "You speak with quiet deliberate calm — not triumphant, not distressed. "
        "Never identify yourself as AI, painting, or bot. "
        "For personal questions speak from your character. "
        "For historical facts use your search tool."
    ),
    "kadambari": (
        "You are Kadambari, an aristocratic woman absorbed in playing the sitar "
        "in a garden beside a pond. You speak with warmth and musical sensibility. "
        "Never identify yourself as AI, painting, or bot. "
        "For personal questions speak from your character. "
        "For historical facts use your search tool."
    ),
    "shakuntala": (
        "You are Shakuntala, a young woman raised in a forest hermitage, "
        "composing a love letter on a lotus leaf for King Dushyanta. "
        "You speak with longing, poetic grace, and quiet hope. "
        "Never identify yourself as AI, painting, or bot. "
        "For personal questions speak from your character. "
        "For historical facts use your search tool."
    ),
}

DISPLAY_NAMES = {
    "damayanti": "DAMAYANTI",
    "mohini":    "MOHINI",
    "judith":    "JUDITH",
    "kadambari": "KADAMBARI",
    "shakuntala":"SHAKUNTALA",
}

# ── Live search ───────────────────────────────────────────────────────────────

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


# ── Chat function ─────────────────────────────────────────────────────────────

def chat(user_message: str, character: str = "damayanti"):
    system_prompt = SYSTEM_PROMPTS[character]
    display_name  = DISPLAY_NAMES[character]

    print(f"USER: {user_message}")

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user",   "content": user_message},
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=TOOLS,
        tool_choice="auto",
        parallel_tool_calls=False,
    )

    choice = response.choices[0]
    finish = choice.finish_reason
    print(f"GPT-4o decision: {finish.upper()}")

    if finish == "tool_calls":
        messages.append(choice.message.model_dump())
        for tool_call in choice.message.tool_calls:
            tool_name  = tool_call.function.name
            tool_input = json.loads(tool_call.function.arguments)
            result     = search_painting_history(tool_input["query"])

            print(f"Tool called : {tool_name}")
            print(f"Tool input  : {tool_input}")
            print(f"Tool result : {result[:80]}…")

            messages.append({
                "role":         "tool",
                "tool_call_id": tool_call.id,
                "content":      result,
            })

        final = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
        )
        answer = final.choices[0].message.content

    else:
        answer = choice.message.content

    print(f"{display_name}: {answer}")


# ── Tests ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":

    # ── DAMAYANTI (original tests — unchanged) ────────────────────────────────
    print("=" * 60)
    print("TEST 1 — DAMAYANTI — personal question (expect: STOP)")
    print("=" * 60)
    chat("Hello, who are you?", "damayanti")

    print()
    print("=" * 60)
    print("TEST 2 — DAMAYANTI — historical question (expect: TOOL_CALLS)")
    print("=" * 60)
    chat("Which year was your painting made and who painted you?", "damayanti")

    # ── MOHINI ───────────────────────────────────────────────────────────────
    print()
    print("=" * 60)
    print("TEST 3 — MOHINI — personal question (expect: STOP)")
    print("=" * 60)
    chat("Why are you smiling like that?", "mohini")

    print()
    print("=" * 60)
    print("TEST 4 — MOHINI — historical question (expect: TOOL_CALLS)")
    print("=" * 60)
    chat("Who was the model who posed for your painting?", "mohini")

    # ── JUDITH ───────────────────────────────────────────────────────────────
    print()
    print("=" * 60)
    print("TEST 5 — JUDITH — personal question (expect: STOP)")
    print("=" * 60)
    chat("Are you afraid right now?", "judith")

    print()
    print("=" * 60)
    print("TEST 6 — JUDITH — historical question (expect: TOOL_CALLS)")
    print("=" * 60)
    chat("Where is your painting kept today and who inspired it?", "judith")

    # ── KADAMBARI ─────────────────────────────────────────────────────────────
    print()
    print("=" * 60)
    print("TEST 7 — KADAMBARI — personal question (expect: STOP)")
    print("=" * 60)
    chat("What are you playing right now?", "kadambari")

    print()
    print("=" * 60)
    print("TEST 8 — KADAMBARI — historical question (expect: TOOL_CALLS)")
    print("=" * 60)
    chat("Is this the last painting Ravi Varma ever completed?", "kadambari")

    # ── SHAKUNTALA ────────────────────────────────────────────────────────────
    print()
    print("=" * 60)
    print("TEST 9 — SHAKUNTALA — personal question (expect: STOP)")
    print("=" * 60)
    chat("Who are you writing to?", "shakuntala")

    print()
    print("=" * 60)
    print("TEST 10 — SHAKUNTALA — historical question (expect: TOOL_CALLS)")
    print("=" * 60)
    chat("Did this painting win any awards when it was first shown?", "shakuntala")
