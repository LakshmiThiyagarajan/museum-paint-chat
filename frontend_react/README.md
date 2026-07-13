# Chat With Painting

An AI-powered interactive system where users step into a painting and converse with the characters inside it.

**Live: [museum-paint-chat.vercel.app](https://museum-paint-chat.vercel.app)**

This project explores how prompt engineering, memory, tool calling, and system design progressively improve character immersion, historical grounding, and resistance to prompt injection across multiple iterations. The current live version features six paintings by Raja Ravi Varma, real-time web search for historical accuracy, persistent conversation memory, and voice input.

## Project Idea

Instead of chatting with a generic AI assistant, the user selects a painting and speaks to the characters living inside that artwork. Ask about their day, their feelings, or real historical facts about the painting and its artist, the system knows the difference and answers accordingly.

## Features

- **In-character roleplay** across six characters, each with their own personality, scene, and speaking style
- **Persistent memory** per session, so characters recall earlier parts of the conversation
- **Tool calling** for historical accuracy: when asked factual questions (who painted this, what year), the system searches the web live via Serper.dev rather than guessing from the model's training data
- **Hallucination guarding**: characters admit uncertainty rather than inventing facts when search results are incomplete
- **Voice input** via the browser's native Web Speech API, no external service required
- **Deployed and publicly accessible**, not just a local prototype

## Tech Stack

**Frontend**
- Vite + React 18
- Browser-native voice input (Web Speech API)
- Deployed on Vercel

**Backend**
- FastAPI (Python)
- SQLite via SQLAlchemy for session memory
- OpenAI API (GPT-4o-mini) for character responses
- Serper.dev for live web search / tool calling
- Deployed on Render

## Repository Structure

```
museum-paint-chat/
├── backend/
│   ├── main.py           # API routes, prompt building, tool calling, memory
│   ├── prompts.py        # Base character instructions
│   ├── database.py       # SQLAlchemy models
│   ├── knowledge/        # Per-character knowledge files
│   └── requirements.txt
├── frontend_react/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   └── components/   # Landing, Gallery, Conversation, About pages
│   └── public/images/    # Painting artwork
└── README.md
```

## Version History

This is the current (v3+) iteration of a project that has gone through several rounds of prompt and architecture evolution, from a static single-painting prototype to the current deployed system with memory, tool calling, and a full React frontend. Earlier evaluation notes (adversarial prompt testing, role-break resistance, memory recall testing) from prior versions are preserved in project history.

## How to Run Locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend_react
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/chat` requests to the backend automatically.

You'll need your own API keys in a `.env` file at the project root:
```
OPENAI_API_KEY=your_key_here
SERPER_API_KEY=your_key_here
```

## About

This project sits at the intersection of AI engineering and museum studies. Full story, and more about the MeiMeraki brand, on the [About page](https://museum-paint-chat.vercel.app/about).

- [GitHub](https://github.com/LakshmiThiyagarajan/museum-paint-chat)
- [LinkedIn](https://linkedin.com/in/lakshmichitra-thiyagarajan)
- [MeiMeraki](https://youtube.com/@MeiMeraki)

## Future Improvements

- Multi-painting shared memory
- Streaming responses
- Persistent database (currently resets on backend redeploy, a known free-tier tradeoff)