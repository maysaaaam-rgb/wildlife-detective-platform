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
      { id: "none", name: "No Hat", icon: "✖️", visual: "", unlockLevel: 1 },
      { id: "deerstalker", name: "Detective Cap", icon: "🕵️", visual: "🧢", unlockLevel: 1 },
      { id: "helmet", name: "Safari Helmet", icon: "🪖", visual: "🪖", unlockLevel: 2 },
      { id: "wizard", name: "Wizard Hat", icon: "🧙", visual: "🪄", unlockLevel: 3 },
      { id: "crown", name: "Royal Crown", icon: "👑", visual: "👑", unlockLevel: 5 }
    ],
    eyewear: [
      { id: "none", name: "No Glasses", icon: "✖️", visual: "", unlockLevel: 1 },
      { id: "monocle", name: "Detective Monocle", icon: "🧐", visual: "🔍", unlockLevel: 1 },
      { id: "snorkel", name: "Wetland Mask", icon: "🤿", visual: "🤿", unlockLevel: 2 },
      { id: "goggles", name: "Aviator Goggles", icon: "🥽", visual: "🥽", unlockLevel: 3 },
      { id: "star", name: "Star Glasses", icon: "🕶️", visual: "⭐🕶️", unlockLevel: 4 }
    ],
    torso: [
      { id: "none", name: "Wild Coat", icon: "✖️", visual: "", unlockLevel: 1 },
      { id: "trenchcoat", name: "Trenchcoat", icon: "🧥", visual: "🧥", unlockLevel: 1 },
      { id: "explorer", name: "Safari Vest", icon: "🦺", visual: "🦺", unlockLevel: 2 },
      { id: "wizard", name: "Hero Cloak", icon: "🥋", visual: "🥋", unlockLevel: 3 },
      { id: "armor", name: "Cyber Armor", icon: "🛡️", visual: "🛡️", unlockLevel: 5 }
    ],
    face: [
      { id: "cheerful", name: "Cheerful Smile", icon: "😄", visual: "😊", unlockLevel: 1 },
      { id: "winking", name: "Detective Wink", icon: "😉", visual: "😉", unlockLevel: 1 },
      { id: "smirk", name: "Clever Smirk", icon: "😏", visual: "😏", unlockLevel: 2 }
    ],
    back: [
      { id: "none", name: "No Back Gear", icon: "✖️", visual: "", unlockLevel: 1 },
      { id: "cape", name: "Detective Cape", icon: "🧣", visual: "🧣", unlockLevel: 1 },
      { id: "wings", name: "Emerald Wings", icon: "🪽", visual: "🪽", unlockLevel: 3 },
      { id: "jetpack", name: "Rocket Pack", icon: "🚀", visual: "🚀", unlockLevel: 5 }
    ],
    glow: [
      { id: "none", name: "No Aura", icon: "✖️", visual: "", unlockLevel: 1 },
      { id: "gold", name: "Golden Sparkles", icon: "✨", visual: "✨", unlockLevel: 1 },
      { id: "wetland", name: "Wetland Dew", icon: "💧", visual: "💧", unlockLevel: 2 },
      { id: "lightning", name: "Neon Spark", icon: "⚡", visual: "⚡", unlockLevel: 4 }
    ],
    body: [
      { id: "capybara", name: "Capybara", icon: "🦫", visual: "🦫", unlockLevel: 1 },
      { id: "axolotl", name: "Axolotl", icon: "🦎", visual: "🦎", unlockLevel: 1 },
      { id: "owl", name: "Forest Owl", icon: "🦉", visual: "🦉", unlockLevel: 2 },
      { id: "fox", name: "Detective Fox", icon: "🦊", visual: "🦊", unlockLevel: 3 }
    ]
  };

  /* Local storage keys */
  const ROSTER_STORAGE_KEY = 'eaa_cadet_roster_v2';
  const ACTIVE_USER_KEY = 'eaa_active_student_avatar_v2';

  function getStoredStudents() {
    try {
      const saved = localStorage.getItem(ROSTER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
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
