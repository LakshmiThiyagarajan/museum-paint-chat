import { useState, useEffect } from 'react'
import { PAINTING_DATA, GALLERY_HOOKS, PAINTING_MODAL, CHARACTER_INTROS } from '../constants'
import './GalleryPage.css'

export default function GalleryPage({ onSelect, galleryNum = 1, onGallerySwitch }) {
  const PAINTING_NAMES = Object.keys(PAINTING_DATA).filter(
    name => PAINTING_DATA[name].gallery === galleryNum
  )
  const [selecting, setSelecting] = useState(null)

  useEffect(() => {
    if (!selecting) return
    function onKey(e) { if (e.key === 'Escape') setSelecting(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selecting])

  function handlePaintingClick(name) {
    if (selecting) return
    setSelecting(name)
  }

  function handleCharSelect(paintingName, charKey) {
    setSelecting(null)
    onSelect(paintingName, charKey)
  }

  return (
    <div className={`gallery-page${galleryNum === 2 ? ' gallery-2' : ''}`}>

      {/* ── Header ── */}
      <header className="gallery-header">
        <div className="gallery-tagline-panel">
          <p className="gallery-tagline">
            Choose a painting.&nbsp;&nbsp;Meet its characters.&nbsp;&nbsp;Hear their stories.
          </p>
        </div>
      </header>

      {/* ── Paintings on wall ── */}
      <div className="gallery-paintings">
        {PAINTING_NAMES.map((name) => (
          <div key={name} className={`gallery-slot${name === 'Shakuntala' ? ' slot-raised' : name === 'Judith' ? ' slot-lowered' : ''}`}>
            <article className="frame-card" onClick={() => handlePaintingClick(name)}>

              <div className="painting-popup" aria-hidden="true">
                <p className="popup-hook">{GALLERY_HOOKS[name]}</p>
                <span className="popup-cta">Enter the painting →</span>
              </div>

              {name === 'Shakuntala' && (
                <div className="frame-label label-above">
                  <h3 className="painting-title">{name}</h3>
                  <p className="artist-line">Raja Ravi Varma</p>
                </div>
              )}

              <div className="frame-outer">
                <div className="frame-inner">
                  <img src={PAINTING_DATA[name].image} alt={name} loading="lazy" />
                </div>
              </div>

              {name !== 'Shakuntala' && (
                <div className="frame-label">
                  <h3 className="painting-title">{name}</h3>
                  <p className="artist-line">Raja Ravi Varma</p>
                </div>
              )}

            </article>
          </div>
        ))}
      </div>

      {/* ── Floor spacer — reserves image floor/bench area ── */}
      <div className="gallery-floor" aria-hidden="true" />

      {/* ── Gallery navigation — bottom of page ── */}
      <nav className="gallery-nav">
        <button
          className={`gallery-nav-btn${galleryNum === 1 ? ' gallery-nav-active' : ''}`}
          onClick={() => onGallerySwitch(1)}
        >Gallery I</button>
        <span className="gallery-nav-sep">·</span>
        <button
          className={`gallery-nav-btn${galleryNum === 2 ? ' gallery-nav-active' : ''}`}
          onClick={() => onGallerySwitch(2)}
        >Gallery II</button>
      </nav>

      {/* ── Character-select modal ── */}
      {selecting && (
        <div
          className="modal-overlay"
          onClick={() => setSelecting(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card" onClick={e => e.stopPropagation()}>

            <button
              className="modal-close"
              onClick={() => setSelecting(null)}
              aria-label="Close"
            >×</button>

            <div className="modal-painting-head">
              <div className="modal-icon">{PAINTING_MODAL[selecting].icon}</div>
              <h2 className="modal-painting-name">{selecting}</h2>
              <p className="modal-subtitle">{PAINTING_MODAL[selecting].subtitle}</p>
              <div className="modal-divider" />
            </div>

            <div className="modal-characters">
              {PAINTING_DATA[selecting].characters.map((charKey) => {
                const c = CHARACTER_INTROS[charKey]
                return (
                  <div key={charKey} className="modal-char-card">
                    <div className="modal-char-emoji">{c.emoji}</div>
                    <h3 className="modal-char-name">{c.displayName}</h3>
                    <p className="modal-char-intro">{c.intro}</p>
                    <button
                      className="modal-talk-btn"
                      onClick={() => handleCharSelect(selecting, charKey)}
                    >
                      {c.button}
                    </button>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
