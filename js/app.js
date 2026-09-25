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
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHarmonicChime(type = 'xp') {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;

    if (type === 'xp') {
      // Dyad chime: Pure sine fundamental (523.25 Hz C5) + overtone fifth (783.99 Hz G5)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, t);
      osc1.frequency.exponentialRampToValueAtTime(659.25, t + 0.18);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(783.99, t);
      osc2.frequency.exponentialRampToValueAtTime(1046.50, t + 0.18);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.35);
      osc2.stop(t + 0.35);
    } else if (type === 'equip') {
      // Crisp equip pop
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
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
      // Resolve companion base icon
      const bodyItem = catalog.body.find(b => b.id === student.avatar.body) || catalog.body[0];
      const headItem = catalog.headwear.find(h => h.id === student.avatar.headwear);
      const isAbsent = student.attendance === 'absent';

      return `
        <article class="student-card ${isAbsent ? 'absent' : ''}" id="card-${student.id}">
          <span class="student-level-tag">⭐ LVL ${student.level}</span>

          <!-- Overflow menu (•••) for secondary actions -->
          <button class="student-overflow-btn" onclick="window.appController.toggleOverflow('${student.id}', event)" title="Student Options">•••</button>
          <div class="overflow-dropdown" id="dropdown-${student.id}">
            <button class="overflow-item" onclick="window.appController.openCustomizer('${student.id}')">🦫 Edit Wardrobe</button>
            <button class="overflow-item" onclick="window.appController.toggleStudentAttendance('${student.id}')">
              ${isAbsent ? '✅ Mark Present' : '❌ Mark Absent'}
            </button>
          </div>

          <!-- TOP 55%–60% STAGE FOR COMPANION GRAPHIC -->
          <div class="student-companion-stage">
            <!-- Isometric glowing pedestal -->
            <div class="pedestal-disc"></div>
            <!-- Companion with idleBob floating physics -->
            <div class="companion-graphic" title="${student.companionName}">
              ${bodyItem.icon}
            </div>
            ${headItem && headItem.visual ? `
              <div style="position: absolute; top: 22%; font-size: 2.4rem; z-index: 3; animation: idleBob 3s ease-in-out infinite;">
                ${headItem.visual}
              </div>
            ` : ''}
          </div>

          <!-- BOTTOM 40-45% INFO & SINGLE PRIMARY 3D ACTION -->
          <div class="student-info-plate">
            <div class="student-name-box">
              <h4>${student.name}</h4>
              <div class="student-companion-name">🐾 ${student.companionName}</div>
              <div style="font-size: 0.8rem; color: #64748b; font-weight: 700; margin-top: 2px;">
                Score: <strong style="color: var(--indigo); font-size: 0.95rem;">${student.xp} XP</strong>
                ${isAbsent ? '<span style="color: #ef4444; margin-left: 6px;">(Absent)</span>' : ''}
              </div>
            </div>

            <!-- Single Prominent 3D Button: +10 XP -->
            <button class="btn-3d btn-3d-emerald btn-xp-award" onclick="window.appController.awardXP('${student.id}', event)">
              <span>⭐ +10 XP</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function handleAwardXP(studentId, event) {
    const std = window.SchoolStore.awardStudentXP(studentId, 10);
    if (!std) return;

    // Acoustic harmonic chime
    playHarmonicChime('xp');

    // Visual floating particle effect
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.className = 'xp-float-particle';
    particle.innerText = '+10 XP ⭐';
    particle.style.left = `${rect.left + rect.width / 2 - 35}px`;
    particle.style.top = `${rect.top - 10}px`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 900);

    // Check level up milestone
    if (std.xp % 100 === 0) {
      playHarmonicChime('levelUp');
      alert(`🎉 Level Up! ${std.name} has advanced to Level ${std.level}! New wardrobe items unlocked!`);
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

  function openCustomizerModal(studentId = 'std-1') {
    const students = window.SchoolStore.getStudents();
    activeCustomizerStudent = students.find(s => s.id === studentId) || students[0];
    if (!activeCustomizerStudent) return;

    if (elements.customizerLevelTag) {
      elements.customizerLevelTag.innerText = `⭐ ${activeCustomizerStudent.name} (LVL ${activeCustomizerStudent.level})`;
    }

    renderCompositeLayers();
    renderWardrobeTabs();
    renderWardrobeItems(activeWardrobeSlot);

    if (elements.avatarModal) {
      elements.avatarModal.classList.add('open');
    }
  }

  function renderCompositeLayers() {
    if (!activeCustomizerStudent) return;
    const av = activeCustomizerStudent.avatar;
    const catalog = window.SchoolStore.getAvatarCatalog();

    // z-0: Glow
    const glowItem = catalog.glow.find(g => g.id === av.glow);
    elements.layerGlow.innerHTML = glowItem && glowItem.visual 
      ? `<span class="layer-glow-content">${glowItem.visual}</span>` : '';

    // z-10: Back Gear
    const backItem = catalog.back.find(b => b.id === av.back);
    elements.layerBack.innerHTML = backItem && backItem.visual 
      ? `<span class="layer-back-content">${backItem.visual}</span>` : '';

    // z-20: Base Body Sprite
    const bodyItem = catalog.body.find(b => b.id === av.body) || catalog.body[0];
    elements.layerBody.innerHTML = `<span class="layer-body-content">${bodyItem.icon}</span>`;

    // z-30: Torso Clothing
    const torsoItem = catalog.torso.find(t => t.id === av.torso);
    elements.layerTorso.innerHTML = torsoItem && torsoItem.visual 
      ? `<span class="layer-torso-content">${torsoItem.visual}</span>` : '';

    // z-40: Facial Features
    const faceItem = catalog.face.find(f => f.id === av.face);
    elements.layerFace.innerHTML = faceItem && faceItem.visual 
      ? `<span class="layer-face-content">${faceItem.visual}</span>` : '';

    // z-50: Eyewear
    const eyeItem = catalog.eyewear.find(e => e.id === av.eyewear);
    elements.layerEyewear.innerHTML = eyeItem && eyeItem.visual 
      ? `<span class="layer-eyewear-content">${eyeItem.visual}</span>` : '';

    // z-60: Horns & Headwear
    const headItem = catalog.headwear.find(h => h.id === av.headwear);
    elements.layerHeadwear.innerHTML = headItem && headItem.visual 
      ? `<span class="layer-headwear-content">${headItem.visual}</span>` : '';
  }

  function renderWardrobeTabs() {
    if (!elements.wardrobeTabs) return;
    const slots = [
      { id: 'headwear', label: '🎩 Headwear (z-60)' },
      { id: 'eyewear', label: '👓 Eyewear (z-50)' },
      { id: 'torso', label: '🧥 Torso (z-30)' },
      { id: 'back', label: '🪽 Back Gear (z-10)' },
      { id: 'glow', label: '✨ Aura (z-0)' },
      { id: 'body', label: '🐾 Body (z-20)' }
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
    const currentEquipped = activeCustomizerStudent.avatar[slot];
    const studentLevel = activeCustomizerStudent.level;

    elements.wardrobeItems.innerHTML = items.map(item => {
      // Locked items: unlockLevel > currentLevel
      const isLocked = item.unlockLevel > studentLevel;
      const isEquipped = currentEquipped === item.id;

      return `
        <div class="wardrobe-item-card ${isEquipped ? 'equipped' : ''} ${isLocked ? 'locked' : ''}" 
             onclick="window.appController.equipItem('${slot}', '${item.id}')">
          ${isLocked ? `<span class="wardrobe-lock-tag">🔒 LVL ${item.unlockLevel}</span>` : ''}
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

    // Enforce Level Gating (Rule #2)
    if (item.unlockLevel > activeCustomizerStudent.level) {
      alert(`🔒 Item locked! Requires Level ${item.unlockLevel}. Earn XP to unlock!`);
      return;
    }

    // Immediate Layer Stage Update
    activeCustomizerStudent.avatar[slot] = itemId;
    playHarmonicChime('equip');
    renderCompositeLayers();
    renderWardrobeItems(slot);
    renderClassroomGrid();
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
        elements.dockSoundBtn.innerHTML = soundEnabled ? '<span>🔊</span> Sound ON' : '<span>🔇</span> Muted';
        elements.dockSoundBtn.classList.toggle('active', soundEnabled);
        if (soundEnabled) playHarmonicChime('equip');
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

  /* Public API exposed on window */
  window.appController = {
    showProtocol: openLessonPlanModal,
    closeProtocol: closeLessonPlanModal,
    awardXP: handleAwardXP,
    toggleOverflow: toggleOverflow,
    toggleStudentAttendance: toggleStudentAttendance,
    openCustomizer: openCustomizerModal,
    closeCustomizer: closeCustomizerModal,
    equipItem: handleEquipItem,
    switchWardrobeTab: handleSwitchWardrobeTab,
    startTimer: startClassTimer
  };

  document.addEventListener('DOMContentLoaded', init);
})();
