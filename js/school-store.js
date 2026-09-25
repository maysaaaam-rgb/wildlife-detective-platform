/**
 * ENGLISH ADVENTURE ACADEMY — PROJECT LIBRARY & ACTIVITY REGISTRY
 * school-store.js
 * 
 * Central registry of interactive ESL curriculum modules, smartboard slide decks,
 * classroom lesson protocols, student cadets, and multi-layer avatar wardrobe.
 */

(function(root) {
  'use strict';

  const LESSON_REGISTRY = [
    {
      id: "wildlife-detective",
      title: "Wildlife Detective: TikTok vs. Nature",
      slug: "wildlife-detective",
      level: "A1+",
      cefrLevel: "A1+",
      grade: "4th Grade",
      grades: ["4th Grade", "Grade 4"],
      category: "Science & Media Literacy",
      duration: "45 min",
      thumbnail: "🐾🦫",
      icon: "🦫",
      badge: "Interactive Game & Video",
      isNew: true,
      featured: true,
      xp: 100,
      heroGradient: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)",
      accentColor: "#52b788",
      description: "Investigate viral exotic pets like Capybaras and Axolotls. Learn the difference between TikTok trends and real wild habitats through 4 interactive missions.",
      summary: "Investigate viral exotic pets like Capybaras and Axolotls. Learn the difference between TikTok trends and real wild habitats through 4 interactive missions.",
      targetLanguage: {
        grammar: ["It needs...", "It cannot live in...", "Keep it wild!"],
        vocabulary: ["wetland", "herd", "chew", "teeth", "webbed feet", "snorkel face", "nightlight"]
      },
      links: {
        play: "lessons/wildlife-detective/index.html",
        slides: "lessons/wildlife-detective/slides.html",
        guide: "lessons/wildlife-detective/lesson-plan.md"
      },
      route: "lessons/wildlife-detective/index.html",
      slidesRoute: "lessons/wildlife-detective/slides.html",
      lessonPlanRoute: "lessons/wildlife-detective/lesson-plan.md",
      hasSlides: true,
      hasLessonPlan: true,
      skills: ["Media Literacy", "Listening", "TPR Speaking", "Animal Biology"],
      tags: ["TikTok vs Nature", "Capybara", "Axolotl", "Wetland", "Animal Welfare", "TPR"],
      missions: [
        "Mission 1: Video Evidence Lounge (Gnawing furniture vs Wild swimming)",
        "Mission 2: Animal Care Matcher (Mexican Axolotl chilled water needs)",
        "Mission 3: Screen vs Reality (Nightlight toy choice vs Live pet suffering)",
        "Mission 4: Living Room Escape (Snorkel Face, Webbed Feet, Herd of 20)"
      ],
      objectives: [
        "Contrast viral social media depictions with biological animal welfare needs",
        "Identify 3 Capybara adaptations: snorkel face, webbed feet, and herd behavior",
        "Determine conservation needs for exotic species such as the endangered Mexican Axolotl",
        "Master classroom speaking structures: 'It needs...', 'It cannot live in...', and 'Keep it wild!'"
      ],
      tprSuperpowers: [
        { name: "Snorkel Face", icon: "👀👃", action: "Crouch low, keeping eyes and nose above desk" },
        { name: "Webbed Feet", icon: "🐾", action: "Spread fingers wide and paddle the air" },
        { name: "Herd Power", icon: "👥", action: "Link arms with desk neighbor in a herd of 20" }
      ]
    },
    {
      id: "who-stole-the-treasure",
      title: "Who Stole the Treasure? & Room Rescue",
      slug: "who-stole-the-treasure",
      level: "A1",
      cefrLevel: "A1",
      grade: "3rd & 4th Grade",
      grades: ["3rd & 4th Grade", "Grade 3", "Grade 4"],
      category: "Detective & Mystery",
      duration: "40 min",
      thumbnail: "🕵️🏴‍☠️",
      icon: "🏴‍☠️",
      badge: "Interactive Game & Alibis",
      isNew: false,
      featured: true,
      xp: 120,
      heroGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
      accentColor: "#6366f1",
      description: "8-suspect royal palace mystery game! Interrogate suspects, inspect alibis, solve mini-game challenge rooms, and rescue the treasure in 4-team multiplayer.",
      summary: "8-suspect royal palace mystery game! Interrogate suspects, inspect alibis, solve mini-game challenge rooms, and rescue the treasure in 4-team multiplayer.",
      targetLanguage: {
        grammar: ["Who was at the...", "He/She was...", "The thief is... because..."],
        vocabulary: ["suspect", "alibi", "witness", "treasure", "palace", "thief", "lock"]
      },
      links: {
        play: "lessons/who-stole-the-treasure/index.html",
        slides: null,
        guide: null
      },
      route: "lessons/who-stole-the-treasure/index.html",
      slidesRoute: null,
      lessonPlanRoute: null,
      hasSlides: false,
      hasLessonPlan: false,
      skills: ["Reading", "Listening", "Deduction", "Past Simple", "Team Collaboration"],
      tags: ["Mystery", "Detective", "Grammar", "Past Simple", "Team Scoreboard", "Boss Lock"],
      missions: [
        "Suspect Lineup: 8 Royal palace & pirate characters",
        "Alibi Verification & Witness Interviews",
        "5 Mini-Game Challenge Chambers",
        "Final Boss Vault Code Cracking"
      ],
      objectives: [
        "Identify suspects, clothing, and professions using English descriptions",
        "Analyze suspect alibis and determine truth vs contradiction",
        "Solve vocabulary and grammar locks in cooperative 4-team play",
        "Formulate investigative conclusions: 'The thief is... because...'"
      ]
    }
  ];

  /* =========================================================================
     STUDENT CADETS ROSTER (Grade 4 Wildlife Detective Class)
     ========================================================================= */
  const DEFAULT_STUDENTS = [
    {
      id: "std-1",
      name: "Leo Martinez",
      grade: "4th Grade",
      level: 4,
      xp: 420,
      element: "thunder",
      stageName: "Detective Sleuth",
      avatar: {
        glow: "gold",
        back: "cape",
        body: "capybara",
        torso: "trenchcoat",
        face: "cheerful",
        eyewear: "monocle",
        headwear: "deerstalker"
      },
      companionName: "Sherlock Capy",
      attendance: "present"
    },
    {
      id: "std-2",
      name: "Maya Chen",
      grade: "4th Grade",
      level: 3,
      xp: 340,
      element: "nature",
      stageName: "Baby Monster",
      avatar: {
        glow: "wetland",
        back: "wings",
        body: "axolotl",
        torso: "explorer",
        face: "winking",
        eyewear: "snorkel",
        headwear: "helmet"
      },
      companionName: "Aqua Axo",
      attendance: "present"
    },
    {
      id: "std-3",
      name: "Sam Jackson",
      grade: "4th Grade",
      level: 2,
      xp: 210,
      element: "astral",
      stageName: "Cracking Egg",
      avatar: {
        glow: "none",
        back: "none",
        body: "owl",
        torso: "wizard",
        face: "smirk",
        eyewear: "glasses",
        headwear: "wizard"
      },
      companionName: "Professor Hoot",
      attendance: "present"
    },
    {
      id: "std-4",
      name: "Emma Watson",
      grade: "4th Grade",
      level: 5,
      xp: 590,
      element: "fire",
      stageName: "Apex Guardian",
      avatar: {
        glow: "lightning",
        back: "wings",
        body: "fox",
        torso: "armor",
        face: "cheerful",
        eyewear: "star",
        headwear: "crown"
      },
      companionName: "Champion Vulpix",
      attendance: "present"
    },
    {
      id: "std-5",
      name: "Lucas Silva",
      grade: "4th Grade",
      level: 3,
      xp: 310,
      element: "nature",
      stageName: "Baby Monster",
      avatar: {
        glow: "gold",
        back: "none",
        body: "capybara",
        torso: "explorer",
        face: "cheerful",
        eyewear: "goggles",
        headwear: "helmet"
      },
      companionName: "Pantanal Paws",
      attendance: "present"
    },
    {
      id: "std-6",
      name: "Aria Patel",
      grade: "4th Grade",
      level: 4,
      xp: 450,
      element: "astral",
      stageName: "Detective Sleuth",
      avatar: {
        glow: "wetland",
        back: "cape",
        body: "axolotl",
        torso: "trenchcoat",
        face: "winking",
        eyewear: "monocle",
        headwear: "deerstalker"
      },
      companionName: "Detective Gills",
      attendance: "present"
    }
  ];

  /* =========================================================================
     MULTI-LAYER AVATAR WARDROBE CATALOG (With strict level gating)
     ========================================================================= */
  const AVATAR_CATALOG = {
    headwear: [
      { id: "none", name: "No Hat / Crest", icon: "✖️", visual: "", unlockLevel: 1 },
      { 
        id: "floppy-ears", 
        name: "Floppy Monster Ears", 
        icon: "🐰", 
        visual: "🐰", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 62 82 C 32 35 25 5 55 12 C 72 18 78 58 74 84 Z" fill="#f472b6" stroke="#db2777" stroke-width="3.5"/><path d="M 54 75 C 38 40 34 20 54 22 C 64 24 68 55 64 76 Z" fill="#fbcfe8"/><path d="M 138 82 C 168 35 175 5 145 12 C 128 18 122 58 126 84 Z" fill="#f472b6" stroke="#db2777" stroke-width="3.5"/><path d="M 146 75 C 162 40 166 20 146 22 C 136 24 132 55 136 76 Z" fill="#fbcfe8"/></svg>`
      },
      { 
        id: "deerstalker", 
        name: "Detective Cap", 
        icon: "🕵️", 
        visual: "🧢", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="56" rx="44" ry="24" fill="#78350f" stroke="#451a03" stroke-width="3.5"/><path d="M 52 64 C 44 64 42 74 58 76 L 142 76 C 158 74 156 64 148 64 Z" fill="#92400e" stroke="#451a03" stroke-width="2.5"/><path d="M 70 56 Q 100 42 130 56" stroke="#fbbf24" stroke-width="3" fill="none"/></svg>`
      },
      { 
        id: "horns", 
        name: "Dragon Horns", 
        icon: "⚡", 
        visual: "⚡", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 74 76 Q 52 28 36 34 Q 58 52 72 80 Z" fill="#f59e0b" stroke="#b45309" stroke-width="3"/><path d="M 126 76 Q 148 28 164 34 Q 142 52 128 80 Z" fill="#f59e0b" stroke="#b45309" stroke-width="3"/></svg>`
      },
      { 
        id: "helmet", 
        name: "Safari Helmet", 
        icon: "🪖", 
        visual: "🪖", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 58 66 C 58 40 80 32 100 32 C 120 32 142 40 142 66 Z" fill="#a16207" stroke="#713f12" stroke-width="3.5"/><ellipse cx="100" cy="68" rx="52" ry="12" fill="#ca8a04" stroke="#713f12" stroke-width="3"/><circle cx="100" cy="30" r="5" fill="#facc15"/></svg>`
      },
      { 
        id: "wizard", 
        name: "Wizard Hat", 
        icon: "🧙", 
        visual: "🪄", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><polygon points="100,10 65,70 135,70" fill="#4338ca" stroke="#312e81" stroke-width="3.5"/><ellipse cx="100" cy="72" rx="50" ry="12" fill="#6366f1" stroke="#312e81" stroke-width="3"/><circle cx="100" cy="10" r="6" fill="#fbbf24"/></svg>`
      },
      { 
        id: "crown", 
        name: "Royal Crown", 
        icon: "👑", 
        visual: "👑", 
        unlockLevel: 5,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 64 74 L 60 42 L 80 58 L 100 36 L 120 58 L 140 42 L 136 74 Z" fill="#eab308" stroke="#a16207" stroke-width="3.5"/><circle cx="60" cy="40" r="4" fill="#ef4444"/><circle cx="100" cy="34" r="5" fill="#3b82f6"/><circle cx="140" cy="40" r="4" fill="#10b981"/></svg>`
      }
    ],
    eyewear: [
      { id: "none", name: "No Glasses", icon: "✖️", visual: "", unlockLevel: 1 },
      { 
        id: "glasses", 
        name: "Classic Glasses", 
        icon: "👓", 
        visual: "👓", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="78" cy="98" r="16" fill="rgba(56,189,248,0.22)" stroke="#0284c7" stroke-width="3.5"/><circle cx="122" cy="98" r="16" fill="rgba(56,189,248,0.22)" stroke="#0284c7" stroke-width="3.5"/><line x1="94" y1="98" x2="106" y2="98" stroke="#0284c7" stroke-width="3.5"/><line x1="62" y1="96" x2="52" y2="92" stroke="#0284c7" stroke-width="3"/><line x1="138" y1="96" x2="148" y2="92" stroke="#0284c7" stroke-width="3"/></svg>`
      },
      { 
        id: "monocle", 
        name: "Detective Monocle", 
        icon: "🧐", 
        visual: "🔍", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="122" cy="98" r="16" fill="rgba(250,204,21,0.25)" stroke="#ca8a04" stroke-width="3.5"/><path d="M 122 114 Q 130 135 125 155" stroke="#ca8a04" stroke-width="2" fill="none" stroke-dasharray="3,3"/></svg>`
      },
      { 
        id: "snorkel", 
        name: "Wetland Mask", 
        icon: "🤿", 
        visual: "🤿", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><rect x="65" y="86" width="70" height="26" rx="12" fill="rgba(16,185,129,0.3)" stroke="#059669" stroke-width="3"/><path d="M 132 98 L 152 98 L 152 65" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`
      },
      { 
        id: "goggles", 
        name: "Aviator Goggles", 
        icon: "🥽", 
        visual: "🥽", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="78" cy="98" rx="17" ry="14" fill="rgba(245,158,11,0.3)" stroke="#78350f" stroke-width="4"/><ellipse cx="122" cy="98" rx="17" ry="14" fill="rgba(245,158,11,0.3)" stroke="#78350f" stroke-width="4"/><line x1="95" y1="98" x2="105" y2="98" stroke="#78350f" stroke-width="4"/><path d="M 61 98 L 48 98 M 139 98 L 152 98" stroke="#451a03" stroke-width="4"/></svg>`
      },
      { 
        id: "star", 
        name: "Star Glasses", 
        icon: "🕶️", 
        visual: "⭐🕶️", 
        unlockLevel: 4,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><polygon points="78,82 83,93 95,94 86,102 89,114 78,107 67,114 70,102 61,94 73,93" fill="#ec4899" stroke="#be185d" stroke-width="2.5"/><polygon points="122,82 127,93 139,94 130,102 133,114 122,107 111,114 114,102 105,94 117,93" fill="#ec4899" stroke="#be185d" stroke-width="2.5"/><line x1="95" y1="98" x2="105" y2="98" stroke="#be185d" stroke-width="3"/></svg>`
      }
    ],
    torso: [
      { id: "none", name: "Wild Fur Coat", icon: "✖️", visual: "", unlockLevel: 1 },
      { 
        id: "explorer", 
        name: "Explorer Vest", 
        icon: "🦺", 
        visual: "🦺", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 68 116 L 86 162 L 114 162 L 132 116 Z" fill="#d97706" stroke="#78350f" stroke-width="3"/><path d="M 72 116 L 90 128 L 88 152 L 74 148 Z" fill="#b45309"/><path d="M 128 116 L 110 128 L 112 152 L 126 148 Z" fill="#b45309"/><circle cx="94" cy="136" r="2.5" fill="#facc15"/><circle cx="94" cy="148" r="2.5" fill="#facc15"/></svg>`
      },
      { 
        id: "trenchcoat", 
        name: "Detective Trenchcoat", 
        icon: "🧥", 
        visual: "🧥", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 66 114 L 84 170 L 116 170 L 134 114 Z" fill="#92400e" stroke="#451a03" stroke-width="3.5"/><polygon points="82,114 100,136 118,114 100,122" fill="#451a03"/><rect x="80" y="142" width="40" height="8" rx="2" fill="#451a03"/><circle cx="100" cy="146" r="4" fill="#fbbf24"/></svg>`
      },
      { 
        id: "jacket", 
        name: "Safari Explorer Jacket", 
        icon: "🧥", 
        visual: "🧥", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 64 115 L 82 166 L 118 166 L 136 115 Z" fill="#047857" stroke="#064e3b" stroke-width="3.5"/><rect x="74" y="132" width="16" height="18" rx="3" fill="#065f46" stroke="#064e3b" stroke-width="2"/><rect x="110" y="132" width="16" height="18" rx="3" fill="#065f46" stroke="#064e3b" stroke-width="2"/></svg>`
      },
      { 
        id: "wizard", 
        name: "Hero Cloak", 
        icon: "🥋", 
        visual: "🥋", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 65 116 Q 100 132 135 116 L 130 172 Q 100 180 70 172 Z" fill="#4f46e5" stroke="#312e81" stroke-width="3.5"/><polygon points="100,122 92,138 108,138" fill="#fbbf24"/></svg>`
      },
      { 
        id: "armor", 
        name: "Cyber Armor", 
        icon: "🛡️", 
        visual: "🛡️", 
        unlockLevel: 5,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 70 116 L 85 165 L 115 165 L 130 116 Z" fill="#0284c7" stroke="#082f49" stroke-width="3.5"/><circle cx="100" cy="140" r="10" fill="#38bdf8" stroke="#f0f9ff" stroke-width="2"/><line x1="100" y1="116" x2="100" y2="165" stroke="#38bdf8" stroke-width="2.5"/></svg>`
      }
    ],
    face: [
      { 
        id: "cheerful", 
        name: "Cheerful Smile", 
        icon: "😄", 
        visual: "😊", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="82" cy="102" r="5" fill="#0f172a"/><circle cx="118" cy="102" r="5" fill="#0f172a"/><path d="M 88 122 Q 100 138 112 122" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="74" cy="115" rx="6" ry="4" fill="#fda4af"/><ellipse cx="126" cy="115" rx="6" ry="4" fill="#fda4af"/></svg>`
      },
      { 
        id: "winking", 
        name: "Detective Wink", 
        icon: "😉", 
        visual: "😉", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="82" cy="102" r="5" fill="#0f172a"/><path d="M 112 102 Q 120 95 126 102" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M 88 122 Q 100 136 112 122" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="74" cy="115" rx="6" ry="4" fill="#fda4af"/></svg>`
      },
      { 
        id: "curious", 
        name: "Curious Eyes", 
        icon: "👀", 
        visual: "👀", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="80" cy="100" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/><circle cx="82" cy="100" r="4.5" fill="#0284c7"/><circle cx="120" cy="100" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/><circle cx="122" cy="100" r="4.5" fill="#0284c7"/><circle cx="100" cy="125" r="4" fill="#0f172a"/></svg>`
      },
      { 
        id: "smirk", 
        name: "Clever Smirk", 
        icon: "😏", 
        visual: "😏", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="82" cy="102" r="5" fill="#0f172a"/><circle cx="118" cy="102" r="5" fill="#0f172a"/><path d="M 90 125 Q 104 122 114 116" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`
      }
    ],
    back: [
      { id: "none", name: "No Back Gear", icon: "✖️", visual: "", unlockLevel: 1 },
      { 
        id: "cape", 
        name: "Detective Cape", 
        icon: "🧣", 
        visual: "🧣", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 62 108 L 44 176 Q 100 192 156 176 L 138 108 Z" fill="#dc2626" stroke="#991b1b" stroke-width="3.5" opacity="0.95"/></svg>`
      },
      { 
        id: "tail", 
        name: "Dragon Tail", 
        icon: "🦎", 
        visual: "🦎", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 132 145 C 160 148 185 130 180 110 C 172 105 160 120 136 135 Z" fill="#059669" stroke="#065f46" stroke-width="3"/></svg>`
      },
      { 
        id: "wings", 
        name: "Emerald Wings", 
        icon: "🪽", 
        visual: "🪽", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 58 116 C 18 80 8 112 26 142 C 40 148 52 138 58 130 Z" fill="#10b981" fill-opacity="0.8" stroke="#047857" stroke-width="2.5"/><path d="M 142 116 C 182 80 192 112 174 142 C 160 148 148 138 142 130 Z" fill="#10b981" fill-opacity="0.8" stroke="#047857" stroke-width="2.5"/></svg>`
      },
      { 
        id: "jetpack", 
        name: "Rocket Jetpack", 
        icon: "🚀", 
        visual: "🚀", 
        unlockLevel: 5,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><rect x="42" y="105" width="20" height="42" rx="7" fill="#64748b" stroke="#334155" stroke-width="3"/><rect x="138" y="105" width="20" height="42" rx="7" fill="#64748b" stroke="#334155" stroke-width="3"/><polygon points="45,147 52,170 59,147" fill="#f97316"/><polygon points="141,147 148,170 155,147" fill="#f97316"/></svg>`
      }
    ],
    glow: [
      { id: "none", name: "No Aura", icon: "✖️", visual: "", unlockLevel: 1 },
      { 
        id: "gold", 
        name: "Golden Sparkles", 
        icon: "✨", 
        visual: "✨", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="115" r="76" fill="radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)" opacity="0.85"/><circle cx="48" cy="68" r="4" fill="#fef08a"/><circle cx="152" cy="74" r="5" fill="#fef08a"/><circle cx="40" cy="140" r="3" fill="#fde047"/><circle cx="160" cy="138" r="4" fill="#fde047"/></svg>`
      },
      { 
        id: "wetland", 
        name: "Wetland Dew", 
        icon: "💧", 
        visual: "💧", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="115" r="76" fill="radial-gradient(circle, rgba(56,189,248,0.38) 0%, transparent 70%)" opacity="0.85"/><circle cx="54" cy="80" r="6" fill="#38bdf8" opacity="0.7"/><circle cx="146" cy="76" r="5" fill="#38bdf8" opacity="0.7"/><circle cx="156" cy="120" r="7" fill="#0284c7" opacity="0.6"/></svg>`
      },
      { 
        id: "nebula", 
        name: "Mystic Nebula", 
        icon: "🌌", 
        visual: "🌌", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="115" r="82" fill="radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(99,102,241,0.15) 50%, transparent 75%)" opacity="0.9"/></svg>`
      },
      { 
        id: "lightning", 
        name: "Neon Spark", 
        icon: "⚡", 
        visual: "⚡", 
        unlockLevel: 4,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="115" r="80" fill="radial-gradient(circle, rgba(234,179,8,0.45) 0%, rgba(249,115,22,0.18) 55%, transparent 75%)" opacity="0.9"/></svg>`
      }
    ],
    body: [
      { 
        id: "capybara", 
        name: "Capybara", 
        icon: "🦫", 
        visual: "🦫", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="118" rx="55" ry="50" fill="#a16207" stroke="#713f12" stroke-width="4"/><ellipse cx="100" cy="126" rx="35" ry="32" fill="#fef3c7" opacity="0.45"/><ellipse cx="68" cy="164" rx="14" ry="9" fill="#a16207" stroke="#713f12" stroke-width="3"/><ellipse cx="132" cy="164" rx="14" ry="9" fill="#a16207" stroke="#713f12" stroke-width="3"/><ellipse cx="62" cy="74" rx="9" ry="12" fill="#713f12"/><ellipse cx="138" cy="74" rx="9" ry="12" fill="#713f12"/></svg>`
      },
      { 
        id: "axolotl", 
        name: "Axolotl", 
        icon: "🦎", 
        visual: "🦎", 
        unlockLevel: 1,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="118" rx="54" ry="48" fill="#f472b6" stroke="#db2777" stroke-width="4"/><ellipse cx="100" cy="126" rx="32" ry="28" fill="#fdf2f8"/><ellipse cx="68" cy="164" rx="13" ry="9" fill="#f472b6" stroke="#db2777" stroke-width="3"/><ellipse cx="132" cy="164" rx="13" ry="9" fill="#f472b6" stroke="#db2777" stroke-width="3"/><path d="M 46 86 Q 24 74 28 62 Q 45 70 48 88" fill="#ec4899"/><path d="M 154 86 Q 176 74 172 62 Q 155 70 152 88" fill="#ec4899"/></svg>`
      },
      { 
        id: "owl", 
        name: "Forest Owl", 
        icon: "🦉", 
        visual: "🦉", 
        unlockLevel: 2,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="118" rx="52" ry="50" fill="#78350f" stroke="#451a03" stroke-width="4"/><ellipse cx="100" cy="126" rx="32" ry="32" fill="#fef3c7"/><ellipse cx="68" cy="164" rx="12" ry="8" fill="#d97706" stroke="#451a03" stroke-width="3"/><ellipse cx="132" cy="164" rx="12" ry="8" fill="#d97706" stroke="#451a03" stroke-width="3"/><polygon points="100,108 92,120 108,120" fill="#d97706"/></svg>`
      },
      { 
        id: "fox", 
        name: "Detective Fox", 
        icon: "🦊", 
        visual: "🦊", 
        unlockLevel: 3,
        svg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="118" rx="52" ry="50" fill="#ea580c" stroke="#9a3412" stroke-width="4"/><polygon points="62,70 50,42 78,54" fill="#ea580c" stroke="#9a3412" stroke-width="3"/><polygon points="138,70 150,42 122,54" fill="#ea580c" stroke="#9a3412" stroke-width="3"/><ellipse cx="100" cy="130" rx="30" ry="26" fill="#fff7ed"/><ellipse cx="68" cy="164" rx="12" ry="8" fill="#431407"/><ellipse cx="132" cy="164" rx="12" ry="8" fill="#431407"/></svg>`
      }
    ]
  };

  /* Local storage keys */
  const ROSTER_STORAGE_KEY = 'eaa_cadet_roster_v2';
  const ACTIVE_USER_KEY = 'eaa_active_student_avatar_v2';

  function getStageTitle(level) {
    if (level <= 1) return 'Cracking Egg';
    if (level === 2) return 'Cracking Egg';
    if (level === 3) return 'Baby Monster';
    if (level === 4) return 'Detective Sleuth';
    return 'Apex Guardian';
  }

  function getStudentElement(student) {
    if (student.element) return student.element;
    if (student.id === 'std-1') return 'thunder';
    if (student.id === 'std-2') return 'nature';
    if (student.id === 'std-3') return 'astral';
    if (student.id === 'std-4') return 'fire';
    if (student.id === 'std-5') return 'nature';
    if (student.id === 'std-6') return 'astral';
    return 'nature';
  }

  function getStoredStudents() {
    let list = null;
    try {
      const saved = localStorage.getItem(ROSTER_STORAGE_KEY);
      if (saved) list = JSON.parse(saved);
    } catch(e) {}
    if (!list) list = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    return list.map(s => {
      if (!s.element) s.element = getStudentElement(s);
      if (!s.stageName) s.stageName = getStageTitle(s.level);
      return s;
    });
  }

  function saveStudents(students) {
    try {
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(students));
    } catch(e) {}
  }

  const SchoolStore = {
    // Curriculum modules
    getAllLessons: function() {
      return LESSON_REGISTRY.slice();
    },

    getLessonById: function(id) {
      return LESSON_REGISTRY.find(l => l.id === id || l.slug === id) || null;
    },

    getCategories: function() {
      const cats = new Set(LESSON_REGISTRY.map(l => l.category));
      return Array.from(cats);
    },

    getGrades: function() {
      const grades = new Set();
      LESSON_REGISTRY.forEach(l => l.grades.forEach(g => grades.add(g)));
      return Array.from(grades);
    },

    getCEFRLevels: function() {
      const levels = new Set(LESSON_REGISTRY.map(l => l.level || l.cefrLevel));
      return Array.from(levels);
    },

    search: function(query, filters = {}) {
      const q = (query || '').toLowerCase().trim();
      return LESSON_REGISTRY.filter(lesson => {
        if (q) {
          const matchTitle = lesson.title.toLowerCase().includes(q);
          const matchDesc = lesson.description.toLowerCase().includes(q);
          const matchTags = (lesson.tags || []).some(t => t.toLowerCase().includes(q));
          const matchSkills = (lesson.skills || []).some(s => s.toLowerCase().includes(q));
          const matchVocab = lesson.targetLanguage && lesson.targetLanguage.vocabulary
            ? lesson.targetLanguage.vocabulary.some(v => v.toLowerCase().includes(q))
            : false;
          const matchGrammar = lesson.targetLanguage && lesson.targetLanguage.grammar
            ? lesson.targetLanguage.grammar.some(g => g.toLowerCase().includes(q))
            : false;

          if (!matchTitle && !matchDesc && !matchTags && !matchSkills && !matchVocab && !matchGrammar) {
            return false;
          }
        }

        if (filters.category && filters.category !== 'all' && lesson.category !== filters.category) {
          return false;
        }

        if (filters.grade && filters.grade !== 'all') {
          const hasGrade = lesson.grades ? lesson.grades.includes(filters.grade) : lesson.grade === filters.grade;
          if (!hasGrade) return false;
        }

        if (filters.cefr && filters.cefr !== 'all') {
          const lvl = lesson.level || lesson.cefrLevel;
          if (lvl !== filters.cefr) return false;
        }

        return true;
      });
    },

    getStats: function() {
      const students = getStoredStudents();
      const totalCadets = students.length;
      const classXP = students.reduce((acc, s) => acc + s.xp, 0);

      return {
        totalLessons: LESSON_REGISTRY.length,
        totalMissions: LESSON_REGISTRY.reduce((acc, l) => acc + (l.missions ? l.missions.length : 0), 0),
        totalXP: LESSON_REGISTRY.reduce((acc, l) => acc + (l.xp || 100), 0),
        classXP: classXP,
        totalCadets: totalCadets,
        cefrRange: "A1 – A1+",
        activeGrades: "Grade 3 & 4"
      };
    },

    // Student Roster Management
    getStudents: function() {
      return getStoredStudents();
    },

    getStudent: function(studentId) {
      const students = getStoredStudents();
      return students.find(s => s.id === studentId) || null;
    },

    updateStudent: function(studentId, updates = {}) {
      const students = getStoredStudents();
      const std = students.find(s => s.id === studentId);
      if (!std) return null;

      Object.assign(std, updates);
      saveStudents(students);
      return std;
    },

    saveStudentAvatar: function(studentId, avatar) {
      const students = getStoredStudents();
      const std = students.find(s => s.id === studentId);
      if (!std) return null;

      std.avatar = { ...std.avatar, ...avatar };
      saveStudents(students);

      try {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(std.avatar));
      } catch(e) {}

      return std;
    },

    awardStudentXP: function(studentId, points = 10) {
      const students = getStoredStudents();
      const std = students.find(s => s.id === studentId);
      if (!std) return null;

      std.xp += points;
      // Level progression: 100 XP per level
      std.level = Math.floor(std.xp / 100) + 1;
      saveStudents(students);
      return std;
    },

    toggleAttendance: function(studentId) {
      const students = getStoredStudents();
      const std = students.find(s => s.id === studentId);
      if (!std) return null;

      std.attendance = std.attendance === 'present' ? 'absent' : 'present';
      saveStudents(students);
      return std;
    },

    // Avatar Wardrobe Catalog & Stacking
    getAvatarCatalog: function() {
      return JSON.parse(JSON.stringify(AVATAR_CATALOG));
    },

    getStageTitle: function(level) {
      return getStageTitle(level);
    },

    getStudentElement: function(student) {
      return getStudentElement(student);
    },

    getActiveUserAvatar: function() {
      try {
        const saved = localStorage.getItem(ACTIVE_USER_KEY);
        if (saved) return JSON.parse(saved);
      } catch(e) {}

      // Default active user is Cadet 1
      const students = getStoredStudents();
      return students[0] ? students[0].avatar : DEFAULT_STUDENTS[0].avatar;
    },

    equipUserAvatarItem: function(slot, itemId) {
      const avatar = this.getActiveUserAvatar();
      avatar[slot] = itemId;
      try {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(avatar));
      } catch(e) {}

      // Also sync to Cadet 1
      const students = getStoredStudents();
      if (students[0]) {
        students[0].avatar[slot] = itemId;
        saveStudents(students);
      }
      return avatar;
    }
  };

  root.SchoolStore = SchoolStore;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolStore;
  }
})(typeof window !== 'undefined' ? window : globalThis);
