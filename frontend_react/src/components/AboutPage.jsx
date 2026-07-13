import './AboutPage.css'

function Ornament() {
  return (
    <div className="about-divider">
      <span className="about-div-line" />
      <svg className="about-div-diamond" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="7,1 13,7 7,13 1,7"
          fill="none"
          stroke="rgba(140,105,200,0.45)"
          strokeWidth="1.1"
        />
        <circle cx="7" cy="7" r="1.4" fill="rgba(180,140,230,0.4)" />
      </svg>
      <span className="about-div-line" />
    </div>
  )
}

export default function AboutPage({ onBack }) {
  return (
    <div className="about-page">
      <div className="about-panel">
      <div className="about-panel-inner">

        <button className="about-back" onClick={onBack}>
          ← Back
        </button>

        <h1 className="about-page-title">About</h1>

        <Ornament />

        <div className="about-body">

          <h2 className="about-section-head">The Project — Chat with Painting</h2>

          <p>
            I've always loved museums, not just as spaces to look, but as spaces to listen.
            That instinct followed me from an IT undergraduate degree into a Master's in Museum Studies
            at Newcastle University, where I first started thinking seriously about how digital tools
            could change the way people encounter art, not replace the encounter, but deepen it.
          </p>

          <p>
            Chat with Painting grew out of that question. It began in August 2025 as a simple chatbot,
            one painting, one conversation and has evolved through several versions since, each one
            teaching me something new about how AI can (and can't) hold a character, a memory, a voice.
          </p>

          <p>
            The six paintings featured here are all by Raja Ravi Varma and that's not incidental.
            He's one of my favorite painters, someone who fused European realism with Indian mythology
            and everyday life a century before "fusion" was a compliment people gave art. In India,
            he's often skipped past in favor of Western painters people assume are simply "better."
            I wanted to build something that made people stop and actually look and talk to his
            characters, the way you might with any well-loved story.
          </p>

          <p>
            This isn't trying to replace the wall label or the gallery guide. It's trying to be a
            doorway, especially for people who don't yet feel like museums are "for them."
          </p>

          <p>
            I started in IT, spent two years exploring archaeology and eventually landed in Museum
            Studies, a path that probably makes more sense in hindsight than it did while I was living
            it. Chat with Painting sits at that intersection and it's not just a portfolio piece to me.
          </p>

          <p>
            I grew up in a middle-class Indian household where museums weren't really part of the picture.
            Going to one is still seen as a less interesting hobby here. I don't think that's because
            people don't care about art. I think it's because art hasn't found its way to them yet.
            As the next generation grows up more online, more on their phones, more comfortable with
            tech than any generation before, I wanted to meet them there and use that as a way in,
            not a replacement for the real thing.
          </p>

          <h2 className="about-section-head">About MeiMeraki</h2>

          <p>
            MeiMeraki started about a month ago and it's still finding its fit. The idea is simple:
            most basic AI education is taught in English and I wanted to change that. Long-term, the
            goal is to build a brand, eventually something bigger, around AI education and projects
            rooted in South Indian language and culture. For now, it's a very small YouTube channel,
            one video at a time.
          </p>

        </div>

        <div className="about-links">
          <a
            className="about-link"
            href="mailto:meimeraki.ask@gmail.com"
          >
            Email
          </a>
          <span className="about-link-sep">·</span>
          <a
            className="about-link"
            href="https://www.linkedin.com/in/lakshmichitra-thiyagarajan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="about-link-sep">·</span>
          <a
            className="about-link"
            href="https://www.instagram.com/meimeraki.insta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MeiMeraki
          </a>
        </div>

      </div>
      </div>
    </div>
  )
}
