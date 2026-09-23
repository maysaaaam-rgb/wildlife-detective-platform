/**
 * ENGLISH ADVENTURE ACADEMY — PROJECT LIBRARY & ACTIVITY REGISTRY
 * school-store.js
 * 
 * Central registry of interactive ESL curriculum modules, smartboard slide decks,
 * and classroom lesson protocols for Grade 3 & 4 (CEFR A1 / A1+).
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

  const SchoolStore = {
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
        // Query match
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

        // Category filter
        if (filters.category && filters.category !== 'all' && lesson.category !== filters.category) {
          return false;
        }

        // Grade filter
        if (filters.grade && filters.grade !== 'all') {
          const hasGrade = lesson.grades ? lesson.grades.includes(filters.grade) : lesson.grade === filters.grade;
          if (!hasGrade) return false;
        }

        // Level filter
        if (filters.cefr && filters.cefr !== 'all') {
          const lvl = lesson.level || lesson.cefrLevel;
          if (lvl !== filters.cefr) return false;
        }

        return true;
      });
    },

    getStats: function() {
      return {
        totalLessons: LESSON_REGISTRY.length,
        totalMissions: LESSON_REGISTRY.reduce((acc, l) => acc + (l.missions ? l.missions.length : 0), 0),
        totalXP: LESSON_REGISTRY.reduce((acc, l) => acc + (l.xp || 100), 0),
        cefrRange: "A1 – A1+",
        activeGrades: "Grade 3 & 4"
      };
    }
  };

  root.SchoolStore = SchoolStore;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolStore;
  }
})(typeof window !== 'undefined' ? window : globalThis);
