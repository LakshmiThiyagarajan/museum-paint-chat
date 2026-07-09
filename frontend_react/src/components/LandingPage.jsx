import './LandingPage.css'

function Ornament() {
  return (
    <div className="panel-divider">
      <span className="div-line" />
      <svg className="div-diamond" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="7,1 13,7 7,13 1,7"
          fill="none"
          stroke="rgba(140,105,200,0.45)"
          strokeWidth="1.1"
        />
        <circle cx="7" cy="7" r="1.4" fill="rgba(180,140,230,0.4)" />
      </svg>
      <span className="div-line" />
    </div>
  )
}

export default function LandingPage({ onEnter }) {
  return (
    <div className="landing">

      {/* === BACKGROUND === */}
      <div className="bg-layer" aria-hidden="true">
        <div className="dec-circle" />
      </div>

      {/* === GLASS CONTENT PANEL === */}
      <div className="landing-panel">
        <h1 className="main-title">Chat with Painting</h1>

        <Ornament />

        <p className="sub-title">Voices from the Canvas</p>

        <p className="landing-desc">
          Ever wanted to talk with the character in a painting?
        </p>

        <button className="enter-btn" onClick={onEnter}>
          Begin the Conversation &rarr;
        </button>
      </div>

      {/* Corner accents */}
      <svg className="corner corner-tl" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 45 L3 3 L45 3" fill="none" stroke="rgba(140,105,200,0.2)" strokeWidth="1" />
        <rect x="12" y="12" width="8" height="8" fill="none" stroke="rgba(140,105,200,0.15)" strokeWidth="0.8" transform="rotate(45 16 16)" />
      </svg>
      <svg className="corner corner-tr" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3 L45 3 L45 45" fill="none" stroke="rgba(140,105,200,0.2)" strokeWidth="1" />
        <rect x="28" y="12" width="8" height="8" fill="none" stroke="rgba(140,105,200,0.15)" strokeWidth="0.8" transform="rotate(45 32 16)" />
      </svg>
      <svg className="corner corner-bl" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 45 L3 45 L3 3" fill="none" stroke="rgba(140,105,200,0.2)" strokeWidth="1" />
        <rect x="12" y="28" width="8" height="8" fill="none" stroke="rgba(140,105,200,0.15)" strokeWidth="0.8" transform="rotate(45 16 32)" />
      </svg>
      <svg className="corner corner-br" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3 L45 3 L45 45" fill="none" stroke="rgba(140,105,200,0.2)" strokeWidth="1" transform="scale(-1,1) translate(-48,0)" />
        <rect x="28" y="28" width="8" height="8" fill="none" stroke="rgba(140,105,200,0.15)" strokeWidth="0.8" transform="rotate(45 32 32)" />
      </svg>

    </div>
  )
}
