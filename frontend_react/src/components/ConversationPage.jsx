import { useState, useEffect, useRef } from 'react'
import {
  PAINTING_DATA,
  CHARACTER_NAMES,
  CHARACTER_DESCRIPTIONS,
  CHARACTER_LOCATIONS,
  GREETING_MESSAGES,
  SUGGESTED_QUESTIONS,
} from '../constants'
import './ConversationPage.css'

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/chat`
  : '/chat'

const SESSION_ID = (() => {
  let id = localStorage.getItem('paintchat_session')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('paintchat_session', id)
  }
  return id
})()

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <span /><span /><span />
    </div>
  )
}

export default function ConversationPage({ painting, initialCharacter, onBack }) {
  const data      = PAINTING_DATA[painting]
  const character = initialCharacter || data.characters[0]

  const [messages,    setMessages]    = useState([])
  const [input,       setInput]       = useState('')
  const [isTyping,    setIsTyping]    = useState(false)
  const [chipsGone,   setChipsGone]   = useState(false)
  const [isListening, setIsListening] = useState(false)

  const chatRef       = useRef(null)
  const textareaRef   = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    setMessages([{ type: 'char', text: GREETING_MESSAGES[character], char: character }])
    setChipsGone(false)
    setInput('')
  }, [painting, character])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, isTyping])

  function handleInputChange(e) {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isListening) {
        recognitionRef.current?.stop()
        setIsListening(false)
      }
      sendMessage()
    }
  }

  function toggleMic() {
    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.continuous = true

    rec.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('')
      setInput(transcript)
    }

    rec.onend = () => setIsListening(false)
    rec.onerror = () => setIsListening(false)

    recognitionRef.current = rec
    rec.start()
    setIsListening(true)
  }

  function handleChip(question) {
    setChipsGone(true)
    sendMessage(question)
  }

  async function sendMessage(override) {
    const msg = (override ?? input).trim()
    if (!msg || isTyping) return

    setMessages(prev => [...prev, { type: 'user', text: msg }])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setChipsGone(true)
    setIsTyping(true)

    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ session_id: SESSION_ID, painting, character, message: msg }),
      })
      if (!res.ok) throw new Error('Request failed')
      const json = await res.json()
      setMessages(prev => [...prev, { type: 'char', text: json.reply, char: character }])
    } catch {
      setMessages(prev => [...prev, {
        type: 'char',
        text: 'The canvas remains still. Please try again.',
        char: character,
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const charName  = CHARACTER_NAMES[character]
  const location  = CHARACTER_LOCATIONS[character]
  const intro     = CHARACTER_DESCRIPTIONS[character]
  const chips     = SUGGESTED_QUESTIONS[character] || []
  const showChips = !chipsGone && messages.length <= 1

  return (
    <div className={`conv-layout ${data.bgClass}`}>

      {/* ── LEFT SIDEBAR ── */}
      <aside className="conv-sidebar">
        <div className="sidebar-painting">
          <img src={data.image} alt={painting} className="sidebar-img" />
        </div>

        <div className="sidebar-info">
          <h2 className="sidebar-char-name">{charName}</h2>
          <p className="sidebar-location">{location}</p>
          <p className="sidebar-intro">{intro}</p>
        </div>

        <button className="back-btn" onClick={onBack}>← Back to Gallery</button>
      </aside>

      {/* ── RIGHT CHAT AREA ── */}
      <main className="conv-main">
        <div className="chat-header">
          <span className="chat-header-label">Conversation with</span>
          <span className="chat-header-name">{charName}</span>
        </div>

        <div className="chat-window" ref={chatRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrapper ${msg.type}`}>
              {msg.type === 'char' && (
                <div className="msg-sender">{CHARACTER_NAMES[msg.char]}</div>
              )}
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}

          {showChips && (
            <div className="chips-row">
              {chips.map(q => (
                <button key={q} className="chip" onClick={() => handleChip(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="input-area">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? 'Listening…' : `Ask ${charName} anything…`}
            rows={1}
          />
          <button className="send-btn" onClick={() => sendMessage()} aria-label="Send">
            ↑
          </button>
          <button
            className={`mic-btn${isListening ? ' listening' : ''}`}
            onClick={toggleMic}
            aria-label={isListening ? 'Stop listening' : 'Voice input'}
            title={isListening ? 'Listening… click to stop' : 'Click to speak'}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 17.93V22h2v-1.07A8.001 8.001 0 0 0 20 13h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93z"/>
            </svg>
          </button>
        </div>
      </main>

    </div>
  )
}
