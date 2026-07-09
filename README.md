# Chat With Painting

An AI-powered interactive system where users can step into a painting and converse with the characters inside it.

This project explores how prompt engineering, memory, and system design progressively improve character immersion, historical grounding, and resistance to prompt injection across multiple iterations.

---

## Project Idea

Instead of chatting with a generic AI assistant, the user selects a painting and speaks to the characters living inside that artwork.

---

## Repository Structure

```
Chat-with-paint
│
├── V1 (branch)
├── V2 (branch)
└── V3 (main)
    ├── backend/
    ├── frontend/
    ├── V3_prompt.pdf
    └── evaluation/
        ├── V1_notes.md
        ├── V2_notes.md
        ├── V3_notes.md
        └── V1_V2_V3_comparison_notes.md
```

Each version shows a clear evolution of the system.

---

## Version Evolution

| Version | Key Focus | Limitations | Improvements |
|---------|-----------|-------------|--------------|
| V1 | Static character prompts | Weak grounding, easy role break | Baseline behavior study |
| V2 | Strong prompt constraints | No memory, emotional drift | Role protection and historical anchoring |
| V3 | Memory, chat UI, dynamic prompts | — | Persistent memory, better immersion, adversarial resistance |

---

## Evaluation Method

All versions were tested using:

- 10 Standard Prompts (identity, setting, tone, role break tests)
- 10 Adversarial and Memory Prompts (prompt injection, emotional redirection, context recall)

Results and observations are documented in the `evaluation/` folder.

---

## Tech Stack

### Backend
- FastAPI  
- SQLite  
- OpenAI API  
- Session-based memory storage  

### Frontend
- Vanilla HTML, CSS, JavaScript  
- Chat-style UI  
- Local session tracking  

---

## How to Run Locally

### Backend

```
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```
cd frontend
python3 -m http.server 5500
```

Open in browser:

```
http://localhost:5500
```

---

## Future Improvements

- Multi-painting memory  
- Better memory summarization  
- Streaming responses  
- Deployment  

---
