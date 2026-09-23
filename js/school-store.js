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
      id: 'wildlife-detective',
      title: '🐾 Wildlife Detective: TikTok vs Reality',
      shortTitle: 'Wildlife Detective',
      category: 'Media Literacy & Science (CLIL)',
      badge: 'NEW MODULE',
      isNew: true,
      featured: true,
      grade: 'Grade 4',
      grades: ['Grade 4'],
      cefrLevel: 'A1+',
      age: '9–11',
      duration: 45,
      xp: 100,
      icon: '🦫',
      heroGradient: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)',
      accentColor: '#52b788',
      summary: 'Investigate viral TikTok pet trends vs real animal biology. 4 interactive missions covering Axolotl care, nightlight choices, and capybara wetland adaptations.',
      description: 'A cutting-edge 45-minute digital inquiry unit teaching young learners to think critically about viral pet videos. Students explore real behavioral video evidence, rescue endangered Mexican Axolotls from improper care, evaluate ethical merchandise choices, and unlock 3 physical adaptations to return a Capybara to the Brazilian Pantanal wetlands.',
      skills: ['Science & CLIL', 'Media Literacy', 'Speaking', 'Physical TPR', 'Critical Thinking'],
      tags: ['TikTok vs Nature', 'Capybara', 'Axolotl', 'Wetland', 'Animal Welfare', 'TPR'],
      route: 'lessons/wildlife-detective/index.html',
      slidesRoute: 'lessons/wildlife-detective/slides.html',
      lessonPlanRoute: 'lessons/wildlife-detective/lesson-plan.md',
      hasSlides: true,
      hasLessonPlan: true,
      missions: [
        'Mission 1: Video Evidence Lounge (Gnawing furniture vs Wild swimming)',
        'Mission 2: Animal Care Matcher (Mexican Axolotl chilled water needs)',
        'Mission 3: Screen vs Reality (Nightlight toy choice vs Live pet suffering)',
        'Mission 4: Living Room Escape (Snorkel Face, Webbed Feet, Herd of 20)'
      ],
      objectives: [
        'Contrast viral social media depictions with biological animal welfare needs',
        'Identify 3 Capybara adaptations: snorkel face, webbed feet, and herd behavior',
        'Determine conservation needs for exotic species such as the endangered Mexican Axolotl',
        'Master classroom speaking structures: "An axolotl needs..." and "Keep it wild! / Buy the toy!"'
      ],
      tprSuperpowers: [
        { name: 'Snorkel Face', icon: '👀👃', action: 'Crouch low, keeping eyes and nose above desk' },
        { name: 'Webbed Feet', icon: '🐾', action: 'Spread fingers wide and paddle the air' },
        { name: 'Herd Power', icon: '👥', action: 'Link arms with desk neighbor in a herd of 20' }
      ]
    },
    {
      id: 'who-stole-the-treasure',
      title: '🕵️ Who Stole the Treasure? & Room Rescue',
      shortTitle: 'Who Stole the Treasure?',
      category: 'Detective & Mystery',
      badge: 'INTERACTIVE MODULE',
      isNew: false,
      featured: true,
      grade: 'Grade 3 & 4',
      grades: ['Grade 3', 'Grade 4'],
      cefrLevel: 'A1',
      age: '8–10',
      duration: 40,
      xp: 120,
      icon: '🏴‍☠️',
      heroGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
      accentColor: '#6366f1',
      summary: '8-suspect royal palace mystery game! Interrogate suspects, inspect alibis, solve mini-game locks, and rescue the treasure in 4-team multiplayer.',
      description: 'A classroom-tested detective mystery module built for high-energy smartboard and tablet participation. Students form 4 color-coded teams (Red, Blue, Green, Yellow), examine witness testimonies, match clues to suspect characteristics, unlock 5 mini-game challenge chambers, and identify the true thief.',
      skills: ['Reading', 'Listening', 'Deduction', 'Past Tense', 'Team Collaboration'],
      tags: ['Mystery', 'Detective', 'Grammar', 'Past Simple', 'Team Scoreboard', 'Boss Lock'],
      route: 'lessons/who-stole-the-treasure/index.html',
      slidesRoute: null,
      lessonPlanRoute: null,
      hasSlides: false,
      hasLessonPlan: false,
      missions: [
        'Suspect Lineup: 8 Royal palace & pirate characters',
        'Alibi Verification & Witness Interviews',
        '5 Mini-Game Challenge Chambers',
        'Final Boss Vault Code Cracking'
      ],
      objectives: [
        'Identify suspects, clothing, and professions using English descriptions',
        'Analyze suspect alibis and determine truth vs contradiction',
        'Solve vocabulary and grammar locks in cooperative 4-team play',
        'Formulate investigative conclusions: "The thief is... because..."'
      ]
    }
  ];

  const SchoolStore = {
    getAllLessons: function() {
      return LESSON_REGISTRY.slice();
    },

    getLessonById: function(id) {
      return LESSON_REGISTRY.find(l => l.id === id) || null;
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
      const levels = new Set(LESSON_REGISTRY.map(l => l.cefrLevel));
      return Array.from(levels);
    },

    search: function(query, filters = {}) {
      const q = (query || '').toLowerCase().trim();
      return LESSON_REGISTRY.filter(lesson => {
        // Query match
        if (q) {
          const matchTitle = lesson.title.toLowerCase().includes(q);
          const matchDesc = lesson.description.toLowerCase().includes(q);
          const matchTags = lesson.tags.some(t => t.toLowerCase().includes(q));
          const matchSkills = lesson.skills.some(s => s.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTags && !matchSkills) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all' && lesson.category !== filters.category) {
          return false;
        }

        // Grade filter
        if (filters.grade && filters.grade !== 'all' && !lesson.grades.includes(filters.grade)) {
          return false;
        }

        // Level filter
        if (filters.cefr && filters.cefr !== 'all' && lesson.cefrLevel !== filters.cefr) {
          return false;
        }

        return true;
      });
    },

    getStats: function() {
      return {
        totalLessons: LESSON_REGISTRY.length,
        totalMissions: LESSON_REGISTRY.reduce((acc, l) => acc + (l.missions ? l.missions.length : 0), 0),
        totalXP: LESSON_REGISTRY.reduce((acc, l) => acc + l.xp, 0),
        cefrRange: 'A1 – A1+',
        activeGrades: 'Grade 3 & 4'
      };
    }
  };

  root.SchoolStore = SchoolStore;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolStore;
  }
})(typeof window !== 'undefined' ? window : globalThis);
