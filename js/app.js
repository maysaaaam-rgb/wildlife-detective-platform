/**
 * ENGLISH ADVENTURE ACADEMY — PORTAL CONTROLLER
 * js/app.js
 * 
 * Strict implementation of ADVENTURE ACADEMY UI/UX & ENGINE ARCHITECTURAL RULES:
 * 1. Anti-Admin Dashboard Directive (Tactile 3D Buttons, Duolingo/Blooket fidelity)
 * 2. Multi-Layer Composite Viewport (Strict z-0 to z-60 stacking, immediate layer sync, level locking)
 * 3. Student Classroom Grid (55-60% companion height, isometric glowing pedestal, idleBob, +10 XP primary action)
 * 4. Consolidated Bottom Dock (Single glassmorphic dock housing sound, timer, roster, wardrobe, etc.)
 */

(function() {
  'use strict';

  /* =========================================================================
     ACOUSTIC HARMONIC SOUND ENGINE (Web Audio API)
     Dyad chimes, overtone blend, and level-up fanfare
     ========================================================================= */
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (window.academyAudio) {
      window.academyAudio.init();
      return;
    }
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHarmonicChime(type = 'xp') {
    if (!soundEnabled) return;
    if (window.academyAudio && !window.academyAudio.enabled) return;

    // Use global zero-dependency Web Audio synthesizer instance if present
    if (window.academyAudio) {
      if (type === 'xp') {
        window.academyAudio.playCoin();
        return;
      }
      if (type === 'levelUp') {
        window.academyAudio.playFanfare();
        return;
      }
      if (type === 'whoosh' || type === 'modal') {
        window.academyAudio.playWhoosh();
        return;
      }
      if (type === 'snap' || type === 'click' || type === 'equip') {
        window.academyAudio.playSnap();
        return;
      }
      if (type === 'bell') {
        window.academyAudio.playTimerAlarm();
        return;
      }
    }

    initAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;

    if (type === 'xp') {
      // Dual-tone positive coin chime: 987.77 Hz (B5) -> 1318.51 Hz (E6)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, t);
      osc.frequency.setValueAtTime(1318.51, t + 0.08);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } else if (type === 'equip' || type === 'snap') {
      // Mechanical micro-click for active button presses
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.03);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.035);
    } else if (type === 'whoosh' || type === 'modal') {
      // Modal opening whoosh chord
      [220, 277.18, 329.63].forEach(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.38);
      });
    } else if (type === 'levelUp') {
      // Level-Up C-Major Fanfare (C5 -> E5 -> G5 -> C6)
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + i * 0.09);
        gain.gain.setValueAtTime(0.2, t + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.005, t + i * 0.09 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t + i * 0.09);
        osc.stop(t + i * 0.09 + 0.25);
      });
    } else if (type === 'bell') {
      // Timer completion bell
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 1.2);
    }
  }

  /* =========================================================================
     PORTAL STATE & DOM REFERENCES
     ========================================================================= */
  let currentCategory = 'all';
  let currentGrade = 'all';
  let currentSearch = '';
  let activeWardrobeSlot = 'headwear';
  let timerInterval = null;
  let timerSecondsLeft = 0;

  const elements = {
    gallery: null,
    studentGrid: null,
    searchInput: null,
    categoryFilters: null,
    metricLessons: null,
    metricMissions: null,
    metricXP: null,
    userXPBadge: null,
    // Modals
    lessonModal: null,
    modalTitle: null,
    modalBody: null,
    modalClose: null,
    avatarModal: null,
    avatarModalClose: null,
    // Customizer layers
    layerGlow: null,
    layerBack: null,
    layerBody: null,
    layerTorso: null,
    layerFace: null,
    layerEyewear: null,
    layerHeadwear: null,
    wardrobeTabs: null,
    wardrobeItems: null,
    customizerLevelTag: null,
    // Bottom dock
    dockSoundBtn: null,
    dockTimerBadge: null,
    dockTimerBtn: null
  };

  function init() {
    elements.gallery = document.getElementById('modules-gallery');
    elements.studentGrid = document.getElementById('student-grid');
    elements.searchInput = document.getElementById('search-input');
    elements.categoryFilters = document.getElementById('category-filters');
    elements.metricLessons = document.getElementById('metric-total-lessons');
    elements.metricMissions = document.getElementById('metric-total-missions');
    elements.metricXP = document.getElementById('metric-total-xp');
    elements.userXPBadge = document.getElementById('user-xp-val');

    // Lesson plan modal
    elements.lessonModal = document.getElementById('lesson-modal');
    elements.modalTitle = document.getElementById('modal-title');
    elements.modalBody = document.getElementById('modal-body');
    elements.modalClose = document.getElementById('modal-close-btn');

    // Avatar customizer modal
    elements.avatarModal = document.getElementById('avatar-customizer-modal');
    elements.avatarModalClose = document.getElementById('avatar-modal-close-btn');
    elements.layerGlow = document.getElementById('layer-glow');
    elements.layerBack = document.getElementById('layer-back');
    elements.layerBody = document.getElementById('layer-body');
    elements.layerTorso = document.getElementById('layer-torso');
    elements.layerFace = document.getElementById('layer-face');
    elements.layerEyewear = document.getElementById('layer-eyewear');
    elements.layerHeadwear = document.getElementById('layer-headwear');
    elements.wardrobeTabs = document.getElementById('wardrobe-tabs');
    elements.wardrobeItems = document.getElementById('wardrobe-items-grid');
    elements.customizerLevelTag = document.getElementById('customizer-level-tag');
    elements.equippedSpecsList = document.getElementById('equipped-specs-list');
    elements.btnSaveMonster = document.getElementById('btn-save-monster');
    elements.btnCancelCustomizer = document.getElementById('btn-cancel-customizer');

    // Bottom dock controls
    elements.dockSoundBtn = document.getElementById('dock-sound-btn');
    elements.dockTimerBadge = document.getElementById('dock-timer-badge');
    elements.dockTimerBtn = document.getElementById('dock-timer-btn');

    setupStats();
    setupFilters();
    setupSearch();
    setupModals();
    setupBottomDock();
    renderClassroomGrid();
    renderGallery();

    // Tactile elastic micro-click feedback on active button and dock icon presses
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('button, .btn-3d, .btn-xp-3d, .dock-action-btn, .dock-btn, .filter-btn, .overflow-item, a.btn-3d');
      if (btn) {
        playHarmonicChime('snap');
      }
    });
  }

  /* =========================================================================
     STATS & USER SCORE
     ========================================================================= */
  function setupStats() {
    if (!window.SchoolStore) return;
    const stats = window.SchoolStore.getStats();
    if (elements.metricLessons) elements.metricLessons.innerText = stats.totalLessons;
    if (elements.metricMissions) elements.metricMissions.innerText = stats.totalMissions;
    if (elements.metricXP) elements.metricXP.innerText = `${stats.totalXP} XP`;
    if (elements.userXPBadge) elements.userXPBadge.innerText = stats.classXP;
  }

  /* =========================================================================
     DIRECTIVE 3: STUDENT CLASSROOM GRID RENDERER
     - 55%–60% of card height allocated to companion graphic
     - Isometric glowing pedestal (radial-gradient)
     - Subtle floating CSS physics (animation: idleBob 3s ease-in-out infinite)
     - Single prominent 3D button (+10 XP) per card
     - Secondary actions collapsed into overflow menu (•••)
     ========================================================================= */
  function renderClassroomGrid() {
    if (!elements.studentGrid || !window.SchoolStore) return;
    const students = window.SchoolStore.getStudents();
    const catalog = window.SchoolStore.getAvatarCatalog();

    elements.studentGrid.innerHTML = students.map(student => {
      // Resolve dynamic stage strictly from XP (Single Source of Truth)
      const stage = (window.SchoolStore && window.SchoolStore.getStageFromXP)
        ? window.SchoolStore.getStageFromXP(student.xp)
        : (window.getStageFromXP ? window.getStageFromXP(student.xp) : { level: 1, levelName: 'Level 1 • Mystery Egg', spriteType: 'egg' });

      const element = (window.SchoolStore.getStudentElement ? window.SchoolStore.getStudentElement(student) : (student.element || 'nature'));
      const archetype = (window.SchoolStore && window.SchoolStore.getStudentArchetype)
        ? window.SchoolStore.getStudentArchetype(student)
        : (window.getStudentArchetype ? window.getStudentArchetype(student) : 'ignis');
      const archetypeClass = `archetype-${archetype}`;

      // Resolve companion items for composite sprite
      const glowItem = catalog.glow.find(g => g.id === student.avatar.glow);
      const backItem = catalog.back.find(b => b.id === student.avatar.back);
      const bodyChoice = (student.avatar && student.avatar.body) || archetype;
      const bodyItem = catalog.body.find(b => b.id === bodyChoice) || catalog.body.find(b => b.id === archetype) || catalog.body[0];
      const torsoItem = catalog.torso.find(t => t.id === student.avatar.torso);
      const faceItem = catalog.face.find(f => f.id === student.avatar.face);
      const eyewearItem = catalog.eyewear.find(e => e.id === student.avatar.eyewear);
      const headItem = catalog.headwear.find(h => h.id === student.avatar.headwear);
      const isAbsent = student.attendance === 'absent';

      return `
        <article class="student-card element-${element} ${archetypeClass} ${isAbsent ? 'absent' : ''}" id="card-${student.id}" data-archetype="${archetype}">
          <!-- Small rounded chip level indicator at the top of the card -->
          <span class="student-level-chip">${stage.levelName}</span>
          <span class="student-archetype-chip ${archetypeClass}" title="Species Archetype: ${archetype.toUpperCase()}">${archetype.toUpperCase()}</span>

          <!-- Overflow menu (•••) for secondary actions -->
          <button class="student-overflow-btn" onclick="window.appController.toggleOverflow('${student.id}', event)" title="Student Options">•••</button>
          <div class="overflow-dropdown" id="dropdown-${student.id}">
            <button class="overflow-item" onclick="window.appController.openStudentProfile('${student.id}')">📜 View Student Profile &amp; XP</button>
            <button class="overflow-item" onclick="window.appController.openCustomizer('${student.id}')">🎨 Monster Studio</button>
            <button class="overflow-item" onclick="window.appController.toggleStudentAttendance('${student.id}')">
              ${isAbsent ? '✅ Mark Present' : '❌ Mark Absent'}
            </button>
          </div>

          <!-- TOP 55% STAGE FOR MONSTER SPRITE / EGG (Rendered at full scale with object-fit: contain) -->
          <div class="student-companion-stage element-${element} ${archetypeClass}" onclick="window.appController.openCustomizer('${student.id}')" style="cursor: pointer;" title="Customize ${student.companionName}">
            <!-- Elemental glowing pedestal disc -->
            <div class="pedestal-disc element-${element} ${archetypeClass}"></div>
            <!-- Multi-layer composite companion sprite with idle CSS breathing float -->
            <div class="roster-sprite companion-composite-rig" style="position: relative; width: 115px; height: 115px;">
              ${glowItem && glowItem.svg ? `<div style="position:absolute; inset:0; z-index:0; transform:scale(1.2); opacity:0.85; pointer-events:none;">${glowItem.svg}</div>` : ''}
              ${backItem && backItem.svg ? `<div style="position:absolute; inset:0; z-index:10; pointer-events:none;">${backItem.svg}</div>` : ''}
              <div style="position:absolute; inset:0; z-index:20; pointer-events:none;">${bodyItem.svg || `<div class="companion-graphic">${bodyItem.icon}</div>`}</div>
              ${torsoItem && torsoItem.svg ? `<div style="position:absolute; inset:0; z-index:30; pointer-events:none;">${torsoItem.svg}</div>` : ''}
              ${faceItem && faceItem.svg ? `<div style="position:absolute; inset:0; z-index:40; pointer-events:none;">${faceItem.svg}</div>` : ''}
              ${eyewearItem && eyewearItem.svg ? `<div style="position:absolute; inset:0; z-index:50; pointer-events:none;">${eyewearItem.svg}</div>` : ''}
              ${headItem && headItem.svg ? `<div style="position:absolute; inset:0; z-index:60; pointer-events:none;">${headItem.svg}</div>` : ''}
            </div>
          </div>

          <!-- BOTTOM 45% INFO & TACTILE 3D ACTION (High contrast typography, no redundant grade subtitles) -->
          <div class="student-info-plate">
            <div class="student-name-box">
              <div class="student-name-row">
                <h4 class="student-name" onclick="window.appController.openStudentProfile('${student.id}')" style="cursor:pointer;" title="View Student Profile &amp; XP Ledger">${student.name}</h4>
                <!-- Chunky tactile game badge for XP -->
                <span class="student-xp-badge" onclick="window.appController.openStudentProfile('${student.id}')" style="cursor:pointer;" title="View Student Profile &amp; XP Ledger">⭐ ${student.xp} XP</span>
              </div>
              <div class="student-companion-name">🐾 ${student.companionName}</div>
              ${isAbsent ? '<div style="font-size: 0.72rem; color: #ef4444; font-weight: 800; margin-top: 2px;">(Absent)</div>' : ''}
            </div>

            <!-- Single Prominent 3D Button: +10 XP -->
            <button type="button" class="btn-xp-3d" onclick="window.appController.awardXP('${student.id}', event)" title="Award +10 XP to ${student.name}">
              <span>⭐ +10 XP</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function handleAwardXP(studentId, event) {
    const prevStudent = window.SchoolStore.getStudent(studentId);
    const prevXP = prevStudent ? Number(prevStudent.xp) || 0 : 0;
    const prevStage = (window.SchoolStore && window.SchoolStore.getStageFromXP)
      ? window.SchoolStore.getStageFromXP(prevXP)
      : (window.getStageFromXP ? window.getStageFromXP(prevXP) : null);

    const std = (window.SchoolStore && window.SchoolStore.awardXP)
      ? window.SchoolStore.awardXP({ studentId, amount: 10, type: 'participation', reason: 'Classroom Participation (+10 XP)' })
      : window.SchoolStore.awardStudentXP(studentId, 10, 'participation', 'Classroom Participation (+10 XP)');
    if (!std) return;

    // Acoustic harmonic chime
    playHarmonicChime('xp');

    // Visual floating particle effect
    const btn = event.currentTarget;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const particle = document.createElement('div');
      particle.className = 'xp-float-particle';
      particle.innerText = '+10 XP ⭐';
      particle.style.left = `${rect.left + rect.width / 2 - 35}px`;
      particle.style.top = `${rect.top - 10}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }

    // Check level up milestone dynamically from XP
    const newStage = (window.SchoolStore && window.SchoolStore.getStageFromXP)
      ? window.SchoolStore.getStageFromXP(std.xp)
      : (window.getStageFromXP ? window.getStageFromXP(std.xp) : null);

    if (prevStage && newStage && newStage.level > prevStage.level) {
      if (window.triggerEvolutionCeremony) {
        window.triggerEvolutionCeremony(std, {
          name: newStage.levelName,
          stageKey: newStage.spriteType,
          description: `Congratulations! ${std.name}'s companion has advanced to ${newStage.levelName} (${std.xp} XP)!`
        });
      } else {
        playHarmonicChime('levelUp');
        alert(`🎉 Level Up! ${std.name} has advanced to ${newStage.levelName}!`);
      }
    }

    setupStats();
    renderClassroomGrid();
  }

  function toggleOverflow(studentId, event) {
    event.stopPropagation();
    document.querySelectorAll('.overflow-dropdown').forEach(d => {
      if (d.id !== `dropdown-${studentId}`) d.classList.remove('show');
    });
    const dropdown = document.getElementById(`dropdown-${studentId}`);
    if (dropdown) dropdown.classList.toggle('show');
  }

  function toggleStudentAttendance(studentId) {
    window.SchoolStore.toggleAttendance(studentId);
    playHarmonicChime('equip');
    renderClassroomGrid();
  }

  /* =========================================================================
     DIRECTIVE 2: MULTI-LAYER COMPOSITE VIEWPORT (AVATARS & CUSTOMIZERS)
     - Strict z-index stacking:
       z-0: Ambient Glow / Aura
       z-10: Back Gear (Capes, Wings)
       z-20: Base Body Sprite & Paws
       z-30: Torso Clothing & Vests
       z-40: Facial Features (Eyes, Cheerful Mouth)
       z-50: Eyewear (Glasses, Goggles)
       z-60: Horns & Headwear (Hats, Headbands)
     - Immediate stage layer update
     - Locked items: pointer-events: none, opacity 0.45, lock indicator
     ========================================================================= */
  let activeCustomizerStudent = null;
  let draftAvatar = {};

  function openCustomizerModal(studentId = 'std-1') {
    const students = window.SchoolStore.getStudents();
    activeCustomizerStudent = (window.SchoolStore.getStudent && window.SchoolStore.getStudent(studentId)) || students.find(s => s.id === studentId) || students[0];
    if (!activeCustomizerStudent) return;

    draftAvatar = { ...activeCustomizerStudent.avatar };

    if (elements.customizerLevelTag) {
      elements.customizerLevelTag.innerText = `⭐ ${activeCustomizerStudent.name} (LVL ${activeCustomizerStudent.level})`;
    }

    renderCompositeLayers();
    renderWardrobeTabs();
    renderWardrobeItems(activeWardrobeSlot);
    renderEquippedSpecsSidebar();

    if (elements.avatarModal) {
      elements.avatarModal.classList.add('open');
      playHarmonicChime('whoosh');
    }
  }

  function renderCompositeLayers() {
    if (!activeCustomizerStudent) return;
    const catalog = window.SchoolStore.getAvatarCatalog();

    // Layer 0 (z-index 0): Ambient Aura / Glow
    const glowItem = catalog.glow.find(g => g.id === draftAvatar.glow) || catalog.glow[0];
    if (elements.layerGlow) {
      elements.layerGlow.innerHTML = (glowItem && glowItem.id !== 'none')
        ? (glowItem.svg || `<span class="layer-glow-content">${glowItem.visual || glowItem.icon}</span>`)
        : '';
    }

    // Layer 1 (z-index 10): Back Gear (Wings, Tails behind body)
    const backItem = catalog.back.find(b => b.id === draftAvatar.back) || catalog.back[0];
    if (elements.layerBack) {
      elements.layerBack.innerHTML = (backItem && backItem.id !== 'none')
        ? (backItem.svg || `<span class="layer-back-content">${backItem.visual || backItem.icon}</span>`)
        : '';
    }

    // Layer 2 (z-index 20): Base Body Sprite (Paws, Head, Torso)
    const bodyItem = catalog.body.find(b => b.id === draftAvatar.body) || catalog.body[0];
    if (elements.layerBody) {
      elements.layerBody.innerHTML = bodyItem
        ? (bodyItem.svg || `<span class="layer-body-content">${bodyItem.icon}</span>`)
        : '';
    }

    // Layer 3 (z-index 30): Outfits & Clothing (Vests, Explorer Jackets)
    const torsoItem = catalog.torso.find(t => t.id === draftAvatar.torso) || catalog.torso[0];
    if (elements.layerTorso) {
      elements.layerTorso.innerHTML = (torsoItem && torsoItem.id !== 'none')
        ? (torsoItem.svg || `<span class="layer-torso-content">${torsoItem.visual || torsoItem.icon}</span>`)
        : '';
    }

    // Layer 4 (z-index 40): Facial Expressions (Eyes, Mouth)
    const faceItem = catalog.face.find(f => f.id === draftAvatar.face) || catalog.face[0];
    if (elements.layerFace) {
      elements.layerFace.innerHTML = (faceItem && faceItem.id !== 'none')
        ? (faceItem.svg || `<span class="layer-face-content">${faceItem.visual || faceItem.icon}</span>`)
        : '';
    }

    // Layer 5 (z-index 50): Eyewear (Glasses, Goggles)
    const eyeItem = catalog.eyewear.find(e => e.id === draftAvatar.eyewear) || catalog.eyewear[0];
    if (elements.layerEyewear) {
      elements.layerEyewear.innerHTML = (eyeItem && eyeItem.id !== 'none')
        ? (eyeItem.svg || `<span class="layer-eyewear-content">${eyeItem.visual || eyeItem.icon}</span>`)
        : '';
    }

    // Layer 6 (z-index 60): Headwear & Crests (Hats, Horns)
    const headItem = catalog.headwear.find(h => h.id === draftAvatar.headwear) || catalog.headwear[0];
    if (elements.layerHeadwear) {
      elements.layerHeadwear.innerHTML = (headItem && headItem.id !== 'none')
        ? (headItem.svg || `<span class="layer-headwear-content">${headItem.visual || headItem.icon}</span>`)
        : '';
    }
  }

  function renderWardrobeTabs() {
    if (!elements.wardrobeTabs) return;
    const slots = [
      { id: 'headwear', label: '🎩 Headwear & Crests (Layer 6)' },
      { id: 'eyewear',  label: '👓 Eyewear (Layer 5)' },
      { id: 'torso',    label: '🦺 Outfits & Vests (Layer 3)' },
      { id: 'face',     label: '😄 Facial Expressions (Layer 4)' },
      { id: 'back',     label: '🪽 Back Gear & Tails (Layer 1)' },
      { id: 'glow',     label: '✨ Ambient Aura (Layer 0)' },
      { id: 'body',     label: '🐾 Base Body (Layer 2)' }
    ];

    elements.wardrobeTabs.innerHTML = slots.map(s => `
      <button class="wardrobe-tab-btn ${s.id === activeWardrobeSlot ? 'active' : ''}" 
              onclick="window.appController.switchWardrobeTab('${s.id}')">
        ${s.label}
      </button>
    `).join('');
  }

  function renderWardrobeItems(slot) {
    if (!elements.wardrobeItems || !activeCustomizerStudent) return;
    const catalog = window.SchoolStore.getAvatarCatalog();
    const items = catalog[slot] || [];
    const currentEquipped = draftAvatar[slot];
    const studentLevel = activeCustomizerStudent.level;

    elements.wardrobeItems.innerHTML = items.map(item => {
      // Locked items: unlockLevel > currentLevel
      const isLocked = item.unlockLevel > studentLevel;
      const isEquipped = currentEquipped === item.id;

      return `
        <div class="wardrobe-item-card ${isEquipped ? 'equipped' : ''} ${isLocked ? 'locked' : ''}" 
             ${isLocked ? 'style="pointer-events: none !important; opacity: 0.45 !important; filter: grayscale(0.8) !important; cursor: not-allowed !important;"' : ''}
             onclick="window.appController.equipItem('${slot}', '${item.id}')"
             title="${item.name}${isLocked ? ` (Requires Level ${item.unlockLevel})` : ''}">
          ${isLocked ? `<span class="wardrobe-lock-tag">🔒 LVL ${item.unlockLevel}</span>` : ''}
          ${isEquipped ? `<span style="position: absolute; top: 4px; left: 4px; background: #10b981; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; font-weight: 800;">✓</span>` : ''}
          <div class="item-icon">${item.icon}</div>
          <div class="item-label">${item.name}</div>
        </div>
      `;
    }).join('');
  }

  function handleEquipItem(slot, itemId) {
    if (!activeCustomizerStudent) return;
    const catalog = window.SchoolStore.getAvatarCatalog();
    const item = (catalog[slot] || []).find(i => i.id === itemId);
    if (!item) return;

    // Strict Level Lock Enforcement
    if (item.unlockLevel > activeCustomizerStudent.level) {
      console.warn("Item is level locked:", item.name);
      return;
    }

    // Dynamic Layer Attachment: Mount corresponding SVG directly into respective layer container
    draftAvatar[slot] = itemId;
    playHarmonicChime('equip');

    const layerTargetMap = {
      glow: elements.layerGlow,
      back: elements.layerBack,
      body: elements.layerBody,
      torso: elements.layerTorso,
      face: elements.layerFace,
      eyewear: elements.layerEyewear,
      headwear: elements.layerHeadwear
    };

    const targetEl = layerTargetMap[slot];
    if (targetEl) {
      if (item.id === 'none') {
        targetEl.innerHTML = '';
      } else if (item.svg) {
        targetEl.innerHTML = item.svg;
      } else if (item.visual || item.icon) {
        targetEl.innerHTML = `<span class="layer-${slot}-content">${item.visual || item.icon}</span>`;
      }
    }

    // Keep EQUIPPED FEATURES sidebar synced with active items
    renderEquippedSpecsSidebar();
    renderWardrobeItems(slot);
  }

  function renderEquippedSpecsSidebar() {
    if (!elements.equippedSpecsList || !activeCustomizerStudent) return;
    const catalog = window.SchoolStore.getAvatarCatalog();

    const layerDefs = [
      { slot: 'headwear', tag: 'L6', z: 'z-60', label: 'Headwear' },
      { slot: 'eyewear',  tag: 'L5', z: 'z-50', label: 'Eyewear' },
      { slot: 'face',     tag: 'L4', z: 'z-40', label: 'Face' },
      { slot: 'torso',    tag: 'L3', z: 'z-30', label: 'Clothing' },
      { slot: 'body',     tag: 'L2', z: 'z-20', label: 'Body' },
      { slot: 'back',     tag: 'L1', z: 'z-10', label: 'Back Gear' },
      { slot: 'glow',     tag: 'L0', z: 'z-0',  label: 'Aura' }
    ];

    elements.equippedSpecsList.innerHTML = layerDefs.map(def => {
      const equippedId = draftAvatar[def.slot];
      const items = catalog[def.slot] || [];
      const item = items.find(i => i.id === equippedId) || { id: 'none', name: 'None', icon: '✖️' };
      const isNone = item.id === 'none';

      return `
        <div class="spec-feature-row">
          <div class="spec-feature-left">
            <span class="spec-layer-tag">${def.tag} ${def.z}</span>
            <span style="font-size: 1.1rem;">${item.icon || '✨'}</span>
            <div style="min-width: 0;">
              <div class="spec-item-name">${item.name}</div>
              <div style="font-size: 0.68rem; color: #64748b;">${def.label}</div>
            </div>
          </div>
          ${def.slot !== 'body' && !isNone ? `
            <button type="button" class="btn-sm-secondary" style="padding: 2px 7px; font-size: 0.72rem; border-radius: 6px; cursor: pointer;" 
                    onclick="window.appController.equipItem('${def.slot}', 'none')" title="Unequip">✕</button>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  function handleSaveMonster() {
    if (!activeCustomizerStudent) return;

    // Persist to SchoolStore and localStorage
    if (window.SchoolStore.saveStudentAvatar) {
      window.SchoolStore.saveStudentAvatar(activeCustomizerStudent.id, draftAvatar);
    }
    activeCustomizerStudent.avatar = { ...draftAvatar };

    // Immediately update selected student's card sprite on disk & screen
    renderClassroomGrid();

    // Harmonic celebration chime & notification
    playHarmonicChime('levelUp');
    alert(`✓ Monster successfully saved for ${activeCustomizerStudent.name}!`);

    closeCustomizerModal();
  }

  function handleSwitchWardrobeTab(slot) {
    activeWardrobeSlot = slot;
    renderWardrobeTabs();
    renderWardrobeItems(slot);
  }

  function closeCustomizerModal() {
    if (elements.avatarModal) {
      elements.avatarModal.classList.remove('open');
    }
  }

  /* =========================================================================
     DIRECTIVE 4: CONSOLIDATED BOTTOM DOCK
     Single floating glassmorphic dock housing sound, attendance, wardrobe, timer
     ========================================================================= */
  function setupBottomDock() {
    // Sound FX Toggle
    if (elements.dockSoundBtn) {
      elements.dockSoundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (window.academyAudio) {
          window.academyAudio.enabled = soundEnabled;
        }
        elements.dockSoundBtn.innerHTML = soundEnabled ? '<span>🔊</span> Sound ON' : '<span>🔇</span> Muted';
        elements.dockSoundBtn.classList.toggle('active', soundEnabled);
        if (soundEnabled) playHarmonicChime('xp');
      });
    }

    // Classroom Timer Presets
    if (elements.dockTimerBtn) {
      elements.dockTimerBtn.addEventListener('click', () => {
        const presets = [5, 10, 15, 0];
        const currentMins = Math.floor(timerSecondsLeft / 60);
        let nextMins = 5;
        if (currentMins === 5) nextMins = 10;
        else if (currentMins === 10) nextMins = 15;
        else if (currentMins === 15) nextMins = 0;

        startClassTimer(nextMins * 60);
      });
    }
  }

  function startClassTimer(seconds) {
    clearInterval(timerInterval);
    timerSecondsLeft = seconds;

    if (seconds <= 0) {
      if (elements.dockTimerBadge) elements.dockTimerBadge.innerText = '--:--';
      return;
    }

    playHarmonicChime('equip');
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      updateTimerDisplay();
      if (timerSecondsLeft <= 0) {
        clearInterval(timerInterval);
        playHarmonicChime('bell');
        alert("⏰ Classroom Timer Complete! Great focus, Wildlife Detectives!");
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!elements.dockTimerBadge) return;
    const m = Math.floor(timerSecondsLeft / 60);
    const s = timerSecondsLeft % 60;
    elements.dockTimerBadge.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  /* =========================================================================
     CURRICULUM GALLERY & FILTERS
     ========================================================================= */
  function setupFilters() {
    if (!elements.categoryFilters) return;
    elements.categoryFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const group = btn.dataset.filterType;
      elements.categoryFilters.querySelectorAll(`[data-filter-type="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filterVal;
      if (group === 'category') currentCategory = filterVal;
      else if (group === 'grade') currentGrade = filterVal;

      renderGallery();
    });
  }

  function setupSearch() {
    if (!elements.searchInput) return;
    elements.searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderGallery();
    });
  }

  function setupModals() {
    if (elements.modalClose && elements.lessonModal) {
      elements.modalClose.addEventListener('click', closeLessonPlanModal);
      elements.lessonModal.addEventListener('click', (e) => {
        if (e.target === elements.lessonModal) closeLessonPlanModal();
      });
    }

    if (elements.avatarModalClose && elements.avatarModal) {
      elements.avatarModalClose.addEventListener('click', closeCustomizerModal);
      elements.avatarModal.addEventListener('click', (e) => {
        if (e.target === elements.avatarModal) closeCustomizerModal();
      });
    }

    if (elements.btnSaveMonster) {
      elements.btnSaveMonster.addEventListener('click', handleSaveMonster);
    }

    if (elements.btnCancelCustomizer) {
      elements.btnCancelCustomizer.addEventListener('click', closeCustomizerModal);
    }

    document.addEventListener('click', () => {
      document.querySelectorAll('.overflow-dropdown').forEach(d => d.classList.remove('show'));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLessonPlanModal();
        closeCustomizerModal();
      }
    });
  }

  function openLessonPlanModal(lessonId) {
    const lesson = window.SchoolStore.getLessonById(lessonId);
    if (!lesson) return;

    const playLink = lesson.links ? lesson.links.play : lesson.route;
    const slidesLink = lesson.links ? lesson.links.slides : lesson.slidesRoute;
    const guideLink = lesson.links ? lesson.links.guide : lesson.lessonPlanRoute;
    const levelStr = lesson.level || lesson.cefrLevel || 'A1+';
    const durationStr = lesson.duration.toString().includes('min') ? lesson.duration : `${lesson.duration} min`;

    elements.modalTitle.innerText = `📋 45-Minute Lesson Protocol: ${lesson.title}`;
    
    let html = `
      <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;">
        <span class="meta-pill grade">${lesson.grade}</span>
        <span class="meta-pill cefr">CEFR ${levelStr}</span>
        <span class="meta-pill">⏱️ ${durationStr}</span>
        <span class="meta-pill xp">⭐ ${lesson.xp || 100} XP</span>
      </div>

      <p style="color: #334155; font-size: 1.05rem; line-height: 1.6; margin-bottom: 18px;">
        ${lesson.description}
      </p>
    `;

    if (lesson.targetLanguage) {
      html += `
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 14px 18px; margin-bottom: 20px;">
          <h4 style="color: var(--primary); margin-bottom: 8px;">💬 Target Language:</h4>
          ${lesson.targetLanguage.grammar ? `
            <div style="margin-bottom: 6px;">
              <strong>Key Structures:</strong>
              ${lesson.targetLanguage.grammar.map(g => `<code style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-size: 0.85rem; margin: 2px; display: inline-block;">${g}</code>`).join(' ')}
            </div>
          ` : ''}
          ${lesson.targetLanguage.vocabulary ? `
            <div>
              <strong>Vocabulary:</strong>
              ${lesson.targetLanguage.vocabulary.map(v => `<span style="background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 6px; font-size: 0.85rem; margin: 2px; display: inline-block; font-weight: 600;">${v}</span>`).join(' ')}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (lesson.objectives) {
      html += `
        <div style="background: #f8fafc; border-left: 4px solid var(--indigo); padding: 14px 18px; margin-bottom: 20px; border-radius: 0 12px 12px 0;">
          <h4 style="color: var(--primary); margin-bottom: 6px;">🎯 Core Learning Objectives:</h4>
          <ul style="padding-left: 20px; color: #334155; line-height: 1.6;">
            ${lesson.objectives.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (lesson.tprSuperpowers) {
      html += `
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--primary); margin-bottom: 10px;">🤸 Physical TPR: 3 Wild Superpowers:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            ${lesson.tprSuperpowers.map(tpr => `
              <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 12px; padding: 12px; text-align: center;">
                <div style="font-size: 2rem;">${tpr.icon}</div>
                <h5 style="color: #065f46; font-size: 1rem; margin: 4px 0;">${tpr.name}</h5>
                <p style="font-size: 0.85rem; color: #047857;">${tpr.action}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    html += `
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        ${guideLink ? `
          <a href="${guideLink}" target="_blank" class="btn-3d btn-3d-ghost" style="padding: 10px 18px;">
            📄 Open Protocol (Markdown)
          </a>
        ` : '<div></div>'}
        <div style="display: flex; gap: 10px;">
          ${slidesLink ? `<a href="${slidesLink}" class="btn-3d btn-3d-gold" style="padding: 10px 18px;">📽️ Open Slides</a>` : ''}
          <a href="${playLink}" class="btn-3d btn-3d-indigo" style="padding: 10px 22px;">🎮 Launch Game</a>
        </div>
      </div>
    `;

    elements.modalBody.innerHTML = html;
    elements.lessonModal.classList.add('open');
    playHarmonicChime('whoosh');
  }

  function closeLessonPlanModal() {
    if (elements.lessonModal) {
      elements.lessonModal.classList.remove('open');
    }
  }

  function renderGallery() {
    if (!elements.gallery || !window.SchoolStore) return;

    const lessons = window.SchoolStore.search(currentSearch, {
      category: currentCategory,
      grade: currentGrade
    });

    if (lessons.length === 0) {
      elements.gallery.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 24px; border: 3px dashed #cbd5e1;">
          <div style="font-size: 3.5rem;">🔍🐾</div>
          <h3 style="color: var(--primary); margin: 12px 0; font-size: 1.5rem; font-weight: 900;">No matching modules found</h3>
          <p style="color: var(--text-muted);">Try clearing your search query or choosing another category filter.</p>
        </div>
      `;
      return;
    }

    elements.gallery.innerHTML = lessons.map(lesson => {
      const playLink = lesson.links ? lesson.links.play : lesson.route;
      const slidesLink = lesson.links ? lesson.links.slides : lesson.slidesRoute;
      const guideLink = lesson.links ? lesson.links.guide : lesson.lessonPlanRoute;
      const avatarIcon = lesson.thumbnail || lesson.icon || '📚';
      const levelStr = lesson.level || lesson.cefrLevel || 'A1';
      const durationStr = lesson.duration.toString().includes('min') ? lesson.duration : `${lesson.duration}m`;

      return `
        <article class="module-card">
          <header class="card-header-banner" style="background: ${lesson.heroGradient || 'linear-gradient(135deg, #1b4332, #52b788)'};">
            <div class="card-badge ${lesson.isNew ? 'new' : ''}">${lesson.badge || 'MODULE'}</div>
            <div class="card-icon-title">
              <div class="card-avatar">${avatarIcon}</div>
              <div class="card-title-box">
                <h3>${lesson.title}</h3>
                <span class="card-category-tag">${lesson.category}</span>
              </div>
            </div>
          </header>

          <div class="card-body">
            <div class="pills-bar">
              <span class="meta-pill grade">🎓 ${lesson.grade}</span>
              <span class="meta-pill cefr">🌍 ${levelStr}</span>
              <span class="meta-pill">⏱️ ${durationStr}</span>
              <span class="meta-pill xp">⭐ ${lesson.xp || 100} XP</span>
            </div>

            <p class="card-desc">${lesson.description || lesson.summary}</p>

            ${lesson.targetLanguage ? `
              <div class="target-lang-box">
                <div style="font-size: 0.8rem; font-weight: 900; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                  💬 Target Language Focus
                </div>
                ${lesson.targetLanguage.grammar ? `
                  <div style="font-size: 0.85rem; color: #1e293b; margin-bottom: 4px;">
                    <strong style="color: #64748b;">Grammar:</strong>
                    ${lesson.targetLanguage.grammar.map(g => `<code style="background: #ede9fe; color: #5b21b6; padding: 2px 6px; border-radius: 6px; font-size: 0.8rem; margin: 1px;">${g}</code>`).join(' ')}
                  </div>
                ` : ''}
                ${lesson.targetLanguage.vocabulary ? `
                  <div style="font-size: 0.85rem; color: #1e293b;">
                    <strong style="color: #64748b;">Vocab:</strong>
                    ${lesson.targetLanguage.vocabulary.map(v => `<span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 6px; font-size: 0.8rem; margin: 1px; display: inline-block; font-weight: 700;">${v}</span>`).join(' ')}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Tactile 3D Action Buttons -->
            <div class="card-actions">
              <a href="${playLink}" class="btn-3d btn-3d-indigo btn-primary-launch" title="Launch Interactive Student Module">
                <span>🎮 Start Student Game</span>
                <span>➔</span>
              </a>

              <div class="secondary-actions">
                ${slidesLink ? `
                  <a href="${slidesLink}" class="btn-3d btn-3d-gold" title="Open Smartboard Presentation">
                    <span>📽️ Teacher Slides</span>
                  </a>
                ` : `
                  <button class="btn-3d btn-3d-ghost" disabled title="Smartboard Arena Built-In">
                    <span>🖥️ Smartboard</span>
                  </button>
                `}

                ${guideLink ? `
                  <button class="btn-3d btn-3d-ghost" onclick="window.appController.showProtocol('${lesson.id}')" title="View 45-Minute Lesson Script">
                    <span>📋 Lesson Protocol</span>
                  </button>
                ` : `
                  <a href="${playLink}" class="btn-3d btn-3d-ghost" title="View In-Game Guide">
                    <span>📖 Teacher Notes</span>
                  </a>
                `}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* =========================================================================
     GAMIFICATION HUB & EVOLUTION ROADMAP CONTROLLER
     ========================================================================= */
  const CLASSROOM_BADGES = [
    { id: 'badge-wild-1', name: 'Capybara Whisperer', icon: '🦫', description: 'Mastered capybara herd behavior and wetland adaptations.', xpReward: 100 },
    { id: 'badge-wild-2', name: 'Axolotl Guardian', icon: '🦎', description: 'Investigated and protected endangered Mexican axolotl habitats.', xpReward: 150 },
    { id: 'badge-wild-3', name: 'Snorkel Scout', icon: '👀', description: 'Executed high-accuracy TPR snorkel-face drills in class.', xpReward: 200 },
    { id: 'badge-wild-4', name: 'Detective Ace', icon: '🕵️', description: 'Cracked the royal palace treasure mystery with zero hints.', xpReward: 250 },
    { id: 'badge-wild-5', name: 'Myth Buster', icon: '⚡', description: 'Debunked viral exotic pet social media trends using biological facts.', xpReward: 350 },
    { id: 'badge-wild-6', name: 'Sovereign Ranger', icon: '👑', description: 'Achieved legendary CEFR speaking fluency across all missions.', xpReward: 500 }
  ];

  const CLASSROOM_ACHIEVEMENTS = [
    { id: 'ach-1', name: 'Wetland Explorer', icon: '🌊', requirement: 'Complete all 4 missions in the Wildlife Detective module.', xpReward: 150 },
    { id: 'ach-2', name: 'Alibi Decoder', icon: '📜', requirement: 'Interrogate 8 suspects and verify palace alibis.', xpReward: 250 },
    { id: 'ach-3', name: 'Living Room Escape', icon: '🚪', requirement: 'Complete the speed challenge room without disturbing the herd.', xpReward: 420 }
  ];

  const PROGRESSION_LEVELS = [
    { id: 'lvl-1', level: 1, name: 'Mystery Egg', stageKey: 'egg', xpRequired: 0, description: 'Dormant speckled egg found in the wild.' },
    { id: 'lvl-2', level: 2, name: 'Cracking Egg', stageKey: 'cracking_egg', xpRequired: 100, description: 'Glowing fissures appear with crackling energy.' },
    { id: 'lvl-3', level: 3, name: 'Baby Monster', stageKey: 'baby', xpRequired: 200, description: 'Newly hatched inquisitive baby companion.' },
    { id: 'lvl-4', level: 4, name: 'Growing Monster', stageKey: 'growing', xpRequired: 500, description: 'Sprouting taller with sharp instincts.' },
    { id: 'lvl-5', level: 5, name: 'Adventurer Monster', stageKey: 'adventurer', xpRequired: 1000, description: 'Equipped with field explorer fedora and coat.' },
    { id: 'lvl-6', level: 6, name: 'Advanced Monster', stageKey: 'advanced', xpRequired: 2000, description: 'Sweeping dragon wings and luminous horn crest.' },
    { id: 'lvl-7', level: 7, name: 'Ultimate Monster', stageKey: 'ultimate', xpRequired: 5000, description: 'Celestial sovereign beast master of nature.' }
  ];

  function openEvolutionRoadmapModal() {
    const modal = document.getElementById('evolution-modal');
    const body = document.getElementById('evolution-modal-body');
    if (!modal || !body) return;

    playHarmonicChime('whoosh');

    const students = window.SchoolStore.getStudents();
    const highestLevel = students.reduce((max, s) => Math.max(max, s.level || 1), 1);

    let html = '';

    // 1. Horizontal Interactive Evolution Journey
    if (window.GamificationMilestones && window.GamificationMilestones.renderEvolutionJourney) {
      html += window.GamificationMilestones.renderEvolutionJourney(PROGRESSION_LEVELS, highestLevel, {
        onEdit: 'window.appController.inspectLevel'
      });
    }

    // 2. Physicalized Badges & Trophy Pins
    html += `
      <div style="margin-top: 32px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:900; color:#0f172a; margin:0;">Classroom Badges (Trophy Enamel Pins)</h3>
            <p style="font-size:0.84rem; color:#64748b; margin:2px 0 0 0;">Tactile collectible trading badges with tiered rarity accents and 3D push-action.</p>
          </div>
        </div>
        <div id="badges-grid" class="badges-trading-grid">
          ${CLASSROOM_BADGES.map(b => {
            if (window.GamificationMilestones && window.GamificationMilestones.renderBadgeTradingCard) {
              return window.GamificationMilestones.renderBadgeTradingCard(b, {
                onAward: 'window.appController.awardBadge',
                onEdit: 'window.appController.inspectLevel'
              });
            }
            return '';
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:32px; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:900; color:#0f172a; margin:0;">Learning Achievements &amp; Quests</h3>
            <p style="font-size:0.84rem; color:#64748b; margin:2px 0 0 0;">Tiered challenge achievements unlockable during interactive missions.</p>
          </div>
        </div>
        <div id="achievements-grid" class="achievements-trading-grid">
          ${CLASSROOM_ACHIEVEMENTS.map(a => {
            if (window.GamificationMilestones && window.GamificationMilestones.renderAchievementTradingCard) {
              return window.GamificationMilestones.renderAchievementTradingCard(a, {
                onEdit: 'window.appController.inspectLevel'
              });
            }
            return '';
          }).join('')}
        </div>
      </div>
    `;

    body.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeEvolutionRoadmapModal() {
    const modal = document.getElementById('evolution-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleAwardBadge(badgeId) {
    const badge = CLASSROOM_BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    playHarmonicChime('xp');

    const students = window.SchoolStore.getStudents();
    if (students.length > 0) {
      const activeStudent = students[0];
      if (window.SchoolStore && window.SchoolStore.awardXP) {
        window.SchoolStore.awardXP({ studentId: activeStudent.id, amount: badge.xpReward, type: 'badge', reason: 'Badge: ' + badge.name });
      } else {
        window.SchoolStore.awardStudentXP(activeStudent.id, badge.xpReward, 'badge', 'Badge: ' + badge.name);
      }
      setupStats();
      renderClassroomGrid();
    }

    if (window.triggerEvolutionCeremony && students.length > 0) {
      window.triggerEvolutionCeremony(students[0], {
        name: badge.name + ' Badge Awarded!',
        stageKey: 'adventurer',
        description: `Awarded ${badge.name} (+${badge.xpReward} XP)! Great teamwork and detective acumen.`
      });
    }
  }

  function handleInspectLevel(lvlId) {
    playHarmonicChime('snap');
  }

  /* =========================================================================
     XP AUDIT LEDGER MODAL CONTROLLER
     ========================================================================= */
  let currentActiveHistoryStudentId = null;
  let currentLedgerFilter = 'all';

  function renderLedgerTimelineFeed(studentId, filterType = 'all') {
    const s = window.SchoolStore.getStudent(studentId);
    if (!s) return '<div style="padding:24px; text-align:center; color:#94a3b8;">No student found.</div>';

    let txs = window.SchoolStore.getStudentXPHistory(studentId);

    if (filterType === 'homework') {
      txs = txs.filter(t => t.type === 'homework');
    } else if (filterType === 'quiz') {
      txs = txs.filter(t => t.type === 'quiz');
    } else if (filterType === 'live') {
      txs = txs.filter(t => ['participation', 'behavior', 'badge', 'live'].includes(t.type));
    }

    if (!txs || txs.length === 0) {
      return '<div style="padding:32px; text-align:center; color:#94a3b8; font-size:0.86rem; background:#0f172a; border-radius:10px; border:1px solid #1e293b;">No transactions recorded for "' + filterType + '".</div>';
    }

    const typeIcons = {
      homework: '📝',
      quiz: '🧠',
      participation: '✋',
      badge: '🎖️',
      behavior: '⭐'
    };

    const typePills = {
      homework: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', label: 'HOMEWORK' },
      quiz: { bg: '#fef3c7', color: '#b45309', border: '#fde68a', label: 'QUIZ' },
      participation: { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0', label: 'CLASSROOM' },
      badge: { bg: '#faf5ff', color: '#6d28d9', border: '#ddd6fe', label: 'BADGE' },
      behavior: { bg: '#fdf2f8', color: '#be185d', border: '#fbcfe8', label: 'BEHAVIOR' }
    };

    return txs.map(tx => {
      const isVoided = !!tx.isVoided || tx.status === 'voided';
      const numAmt = parseInt(tx.amount, 10) || 0;
      const isPos = numAmt >= 0;
      const amtColor = isVoided ? '#94a3b8' : (isPos ? '#10b981' : '#ef4444');
      const amtSign = isPos ? '+' : '';
      const dateStr = (tx.date && tx.time)
        ? `${tx.date} • ${tx.time}`
        : (tx.timestamp 
            ? new Date(tx.timestamp).toLocaleString(undefined, { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' }) 
            : (tx.date || '—'));
      const tType = (tx.type || 'participation').toLowerCase();
      const icon = tx.icon || typeIcons[tType] || '⭐';
      const pill = typePills[tType] || typePills.participation;
      const balanceStr = (tx.balanceAfter !== undefined && tx.balanceAfter !== null) ? (tx.balanceAfter + ' XP') : null;

      return `
        <div class="xp-timeline-card ${isVoided ? 'is-voided' : ''}" style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; border:1px solid #334155; border-radius:10px; padding:10px 14px; transition:transform 0.18s ease; ${isVoided ? 'opacity:0.45; text-decoration:line-through;' : ''}">
          <div style="display:flex; align-items:center; gap:12px; min-width:0;">
            <div style="width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#0f172a; color:#f8fafc; font-size:1.1rem; border:1px solid #334155; flex-shrink:0;">
              ${icon}
            </div>
            <div style="min-width:0;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span style="font-size:0.88rem; font-weight:800; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${tx.reason || 'XP transaction'}</span>
                <span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; padding:2px 6px; border-radius:6px; background:${pill.bg}; color:${pill.color}; border:1px solid ${pill.border};">${pill.label}</span>
                ${isVoided ? '<span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; padding:2px 6px; border-radius:6px; background:#fee2e2; color:#dc2626; border:1px solid #fca5a5;">VOIDED</span>' : ''}
              </div>
              <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">
                <span>${dateStr}</span>
                ${balanceStr ? `<span style="margin: 0 6px;">•</span><span style="color:#cbd5e1;">Balance: <strong style="color:#f59e0b;">${balanceStr}</strong></span>` : ''}
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; margin-left:12px; flex-shrink:0;">
            <span style="font-size:1.1rem; font-weight:900; color:${amtColor};">
              ${amtSign}${numAmt} XP
            </span>
            ${!isVoided ? `
              <button type="button" onclick="window.appController.voidStudentXP('${studentId}', '${tx.id}')" style="padding:3px 8px; border-radius:6px; font-size:0.72rem; font-weight:700; background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; cursor:pointer;" title="Void this transaction">Void</button>
            ` : `
              <span style="font-size:0.72rem; color:#94a3b8; font-weight:700;">Voided</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  function filterLedger(type) {
    currentLedgerFilter = type;
    const feed = document.getElementById('xp-history-feed');
    if (feed && currentActiveHistoryStudentId) {
      feed.innerHTML = renderLedgerTimelineFeed(currentActiveHistoryStudentId, type);
    }
    const container = document.getElementById('student-xp-history-tab');
    if (container) {
      const pills = container.querySelectorAll('.filter-pill');
      pills.forEach(p => {
        const onclickAttr = p.getAttribute('onclick') || '';
        if (onclickAttr.includes("'" + type + "'") || onclickAttr.includes('"' + type + '"')) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }
  }

  window.filterLedger = filterLedger;

  function openStudentXPHistory(studentId) {
    const student = window.SchoolStore.getStudent(studentId);
    if (!student) return;

    currentActiveHistoryStudentId = studentId;
    currentLedgerFilter = 'all';

    const modal = document.getElementById('student-profile-modal') || document.getElementById('xp-history-modal');
    const titleEl = document.getElementById('xp-history-title');
    const balanceEl = document.getElementById('xp-history-balance');
    const lifetimeEl = document.getElementById('ledger-lifetime-xp');
    const avatarBadge = document.getElementById('xp-history-avatar-badge');
    const feed = document.getElementById('xp-history-feed');

    if (titleEl) titleEl.innerText = `${student.name} — Student Profile & XP Ledger`;
    if (balanceEl) balanceEl.innerText = `Active Balance: ${(Number(student.xp) || 0).toLocaleString()} XP`;
    if (lifetimeEl) lifetimeEl.innerText = `⭐ ${(Number(student.xp) || 0).toLocaleString()} XP`;
    if (avatarBadge) {
      avatarBadge.innerText = student.element === 'fire' ? '🔥' : student.element === 'thunder' ? '⚡' : student.element === 'astral' ? '✨' : '🌿';
    }

    if (feed) {
      feed.innerHTML = renderLedgerTimelineFeed(studentId, 'all');
    }

    const container = document.getElementById('student-xp-history-tab');
    if (container) {
      const pills = container.querySelectorAll('.filter-pill');
      pills.forEach((p, idx) => {
        if (idx === 0) p.classList.add('active');
        else p.classList.remove('active');
      });
    }

    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeStudentXPHistory() {
    const modal = document.getElementById('student-profile-modal') || document.getElementById('xp-history-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleVoidStudentXP(studentId, txId) {
    if (confirm('Are you sure you want to void this XP transaction?')) {
      const ok = window.SchoolStore.voidXPTransaction(studentId, txId, 'Voided by teacher');
      if (ok) {
        setupStats();
        renderClassroomGrid();
        openStudentXPHistory(studentId);
      }
    }
  }

  /* Public API exposed on window */
  window.appController = {
    showProtocol: openLessonPlanModal,
    closeProtocol: closeLessonPlanModal,
    awardXP: handleAwardXP,
    openStudentXPHistory: openStudentXPHistory,
    closeStudentXPHistory: closeStudentXPHistory,
    openStudentProfile: openStudentXPHistory,
    closeStudentProfile: closeStudentXPHistory,
    openStudentDetail: openStudentXPHistory,
    closeStudentDetail: closeStudentXPHistory,
    voidStudentXP: handleVoidStudentXP,
    toggleOverflow: toggleOverflow,
    toggleStudentAttendance: toggleStudentAttendance,
    openCustomizer: openCustomizerModal,
    closeCustomizer: closeCustomizerModal,
    openEvolutionRoadmap: openEvolutionRoadmapModal,
    closeEvolutionRoadmap: closeEvolutionRoadmapModal,
    awardBadge: handleAwardBadge,
    inspectLevel: handleInspectLevel,
    equipItem: handleEquipItem,
    saveMonster: handleSaveMonster,
    switchWardrobeTab: handleSwitchWardrobeTab,
    startTimer: startClassTimer
  };

  window.openStudentProfile = openStudentXPHistory;
  window.closeStudentProfile = closeStudentXPHistory;
  window.openStudentDetail = openStudentXPHistory;
  window.closeStudentDetail = closeStudentXPHistory;
  window.openStudentXPHistory = openStudentXPHistory;
  window.closeStudentXPHistory = closeStudentXPHistory;

  document.addEventListener('DOMContentLoaded', init);
})();
