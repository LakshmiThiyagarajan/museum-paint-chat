export const PAINTING_DATA = {
  // ── Gallery 1 ──
  "Judith": {
    image: "/images/judith.jpg",
    characters: ["judith"],
    bgClass: "bg-judith",
    animClass: "anim-judith",
    gallery: 1,
  },
  "Damayanti and the Swan": {
    image: "/images/damayanti.jpg",
    characters: ["damayanti", "swan"],
    bgClass: "bg-damayanti",
    animClass: "anim-damayanti",
    gallery: 1,
  },
  "Mohini on a Swing": {
    image: "/images/mohini.jpg",
    characters: ["mohini"],
    bgClass: "bg-mohini",
    animClass: "anim-mohini",
    gallery: 1,
  },
  // ── Gallery 2 ──
  "Stolen Interview": {
    image: "/images/stolen.jpg",
    characters: ["woman", "man"],
    bgClass: "bg-stolen",
    animClass: "anim-stolen",
    gallery: 2,
  },
  "Shakuntala": {
    image: "/images/shakuntala.jpg",
    characters: ["shakuntala"],
    bgClass: "bg-shakuntala",
    animClass: "anim-shakuntala",
    gallery: 2,
  },
  "Kadambari": {
    image: "/images/kadambari.jpg",
    characters: ["kadambari"],
    bgClass: "bg-kadambari",
    animClass: "anim-kadambari",
    gallery: 2,
  },
}

export const GALLERY_HOOKS = {
  "Stolen Interview":
    "A secret courtyard. Two hearts meeting where eyes should not linger.",
  "Damayanti and the Swan":
    "A swan speaks of a king. A princess begins to wonder.",
  "Mohini on a Swing": "She swings above the world. Time slows to watch her.",
  "Judith": "The act is done. She stands alone in the silence that follows.",
  "Shakuntala": "A lotus leaf. A name. Words that will not come fast enough.",
  "Kadambari": "She plays for the afternoon, for the pond, for no one. For everyone.",
}

export const CHARACTER_NAMES = {
  woman: "The Young Woman",
  man: "The Young Man",
  damayanti: "Damayanti",
  swan: "The Celestial Swan",
  mohini: "Mohini",
  judith: "Judith",
  shakuntala: "Shakuntala",
  kadambari: "Kadambari",
}

export const PAINTING_MODAL = {
  "Stolen Interview": {
    icon: '🌸',
    subtitle: 'A stolen moment in a secret courtyard',
  },
  "Damayanti and the Swan": {
    icon: '🦢',
    subtitle: 'A princess at the edge of love',
  },
  "Mohini on a Swing": {
    icon: '✨',
    subtitle: 'She swings above the world',
  },
  "Judith": {
    icon: '⚔️',
    subtitle: 'The stillness after the storm',
  },
  "Shakuntala": {
    icon: '🌿',
    subtitle: 'Words for an absent king',
  },
  "Kadambari": {
    icon: '🎵',
    subtitle: 'Music in the garden at dusk',
  },
}

export const CHARACTER_INTROS = {
  woman: {
    emoji: '🌸',
    displayName: 'The Young Woman',
    intro: 'Oh — you caught me in a private moment. I was not expecting a visitor. Shall I tell you what troubles my heart?',
    button: 'Talk to her',
  },
  man: {
    emoji: '🌿',
    displayName: 'The Young Man',
    intro: 'Ah, a traveler. I have been sitting here, unable to leave. Perhaps you can understand what I cannot say aloud.',
    button: 'Talk to him',
  },
  damayanti: {
    emoji: '👸',
    displayName: 'Damayanti',
    intro: 'Greetings, traveler. I am Princess Damayanti. Would you like to hear the story that changed my life?',
    button: 'Talk to Damayanti',
  },
  swan: {
    emoji: '🦢',
    displayName: 'Hamsa, the Swan',
    intro: 'Hello! I carried messages between Nala and Damayanti. Shall I tell you how their story began?',
    button: 'Talk to Hamsa',
  },
  mohini: {
    emoji: '✨',
    displayName: 'Mohini',
    intro: 'So you stopped to look. Most simply stare and walk on. Come closer — I have been waiting for someone to ask why I smile.',
    button: 'Talk to Mohini',
  },
  judith: {
    emoji: '⚔️',
    displayName: 'Judith',
    intro: 'You have come in quietly. Good. I was just gathering myself before I walk out. Ask what you wish — I have very little to hide.',
    button: 'Talk to Judith',
  },
  shakuntala: {
    emoji: '🌿',
    displayName: 'Shakuntala',
    intro: 'Come in. The deer will not mind — he is quite used to company. I am trying to find the right words for a letter. Sit with us a while.',
    button: 'Talk to Shakuntala',
  },
  kadambari: {
    emoji: '🎵',
    displayName: 'Kadambari',
    intro: 'Ah, you found the garden. Not many do at this hour. Come, sit. I was resting between one phrase and the next. Do you know the sitar at all?',
    button: 'Talk to Kadambari',
  },
}

export const CHARACTER_LOCATIONS = {
  woman:     "📍 Secret Palace Courtyard",
  man:       "📍 Hidden Garden Alcove",
  damayanti: "📍 Palace Garden, Vidarbha",
  swan:      "📍 Beside the Lotus Pond",
  mohini:    "📍 Forest Swing at Dusk",
  judith:    "📍 Holofernes's Tent, Assyrian Camp",
  shakuntala:"📍 Forest Hermitage, Kanva's Ashram",
  kadambari: "📍 Garden Courtyard, Princely Household",
}

export const GREETING_MESSAGES = {
  woman:     "Oh — you startled me. I was not expecting anyone here. This place is our secret. Please, speak softly.",
  man:       "Ah — a visitor. You have come upon us here. She stands before me even now. Forgive me if I seem distracted.",
  damayanti: "Greetings, traveler. I am Damayanti, daughter of King Bhima of Vidarbha. What would you like to know of my story?",
  swan:      "Hello, dear visitor! I am Hamsa — a celestial swan who carried messages between two souls in love. Ask me anything.",
  mohini:    "So you stopped to look. Most simply pass by. I have been here since dusk — what brings you to seek me out?",
  judith:    "You have come in quietly. Good. The camp is not entirely asleep. My name is Judith. What are you doing here?",
  shakuntala:"Oh, come in.. I was just trying to find the right words for a letter. What brings you to this part of the forest?",
  kadambari: "Ah, you found the garden. Not many people do at this hour. Come, sit. I was just resting between one phrase and the next. Do you know the sitar at all?",
}

export const SUGGESTED_QUESTIONS = {
  woman:     ["Who are you?", "Who is he to you?", "Are you afraid?", "Tell me your secret."],
  man:       ["Who are you waiting for?", "What is this place?", "Do you love her?", "What happened here?"],
  damayanti: ["Who are you?", "Tell me your story.", "Who is Nala?", "What happened next?"],
  swan:      ["Who are you?", "What messages did you carry?", "Tell me about Nala.", "What is love like?"],
  mohini:    ["Who are you?", "Why do you swing alone?", "Are you divine?", "What do you desire?"],
  judith:    ["Who are you?", "Where are we?", "What happened here?", "Why are you alone?"],
  shakuntala:["Who are you writing to?", "What does love feel like?", "Who is Dushyanta?", "Tell me your story."],
  kadambari: ["What are you playing?", "How long did you learn?", "Are you a princess?", "Who taught you music?"],
}

export const CHARACTER_DESCRIPTIONS = {
  woman:
    "She stands by the stone pillar, petals trembling in her fingers. Her heart speaks what her lips dare not say.",
  man: "He sits quietly, unable to look away from her. Every glance is a confession he cannot make.",
  damayanti:
    "A princess whose heart stirs at the swan's words — gentle, wise, and quietly beginning to wonder.",
  swan: "A celestial messenger who knows King Nala's virtues and speaks with calm, unhurried grace.",
  mohini:
    "She swings above the world with a stillness that draws all eyes and quiets all noise.",
  judith:
    "She stands alone in the darkened tent, sword in hand, still. The act is done. Only silence remains.",
  shakuntala:
    "She bends over a lotus leaf, searching for words that will not come. Every syllable costs her something.",
  kadambari:
    "She plays beside the garden pond, unhurried. The melody belongs to the afternoon.",
}
