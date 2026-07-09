import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import GalleryPage from './components/GalleryPage'
import ConversationPage from './components/ConversationPage'
import './App.css'

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [galleryNum, setGalleryNum] = useState(1)

  useEffect(() => {
    window.history.replaceState({ page: 'landing' }, '')

    function handlePop(e) {
      const state = e.state || { page: 'landing' }
      setPage(state.page)
      if (state.painting) setSelectedPainting(state.painting)
    }

    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  function goTo(newPage, painting = null, character = null) {
    const state = { page: newPage }
    if (painting)  state.painting  = painting
    if (character) state.character = character
    window.history.pushState(state, '')
    setPage(newPage)
    if (painting)  setSelectedPainting(painting)
    if (character) setSelectedCharacter(character)
  }

  return (
    <div className="app-shell">
      <div className={`page ${page === 'landing' ? 'active' : ''}`}>
        <LandingPage onEnter={() => goTo('gallery')} />
      </div>

      <div className={`page ${page === 'gallery' ? 'active' : ''}`}>
        <GalleryPage
          onSelect={(name, char) => goTo('conversation', name, char)}
          galleryNum={galleryNum}
          onGallerySwitch={setGalleryNum}
        />
      </div>

      <div className={`page ${page === 'conversation' ? 'active' : ''}`}>
        {selectedPainting && (
          <ConversationPage
            painting={selectedPainting}
            initialCharacter={selectedCharacter}
            onBack={() => window.history.back()}
          />
        )}
      </div>
    </div>
  )
}
