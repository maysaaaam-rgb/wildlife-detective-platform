/**
 * ENGLISH ADVENTURE ACADEMY — PORTAL CONTROLLER
 * js/app.js
 * 
 * Handles gallery rendering, real-time search, category/grade filters,
 * quick lesson plan modals, and live XP state.
 */

(function() {
  'use strict';

  let currentCategory = 'all';
  let currentGrade = 'all';
  let currentSearch = '';

  const elements = {
    gallery: null,
    searchInput: null,
    categoryFilters: null,
    metricLessons: null,
    metricMissions: null,
    metricXP: null,
    userXPBadge: null,
    modalBackdrop: null,
    modalTitle: null,
    modalBody: null,
    modalClose: null
  };

  function init() {
    elements.gallery = document.getElementById('modules-gallery');
    elements.searchInput = document.getElementById('search-input');
    elements.categoryFilters = document.getElementById('category-filters');
    elements.metricLessons = document.getElementById('metric-total-lessons');
    elements.metricMissions = document.getElementById('metric-total-missions');
    elements.metricXP = document.getElementById('metric-total-xp');
    elements.userXPBadge = document.getElementById('user-xp-val');
    elements.modalBackdrop = document.getElementById('lesson-modal');
    elements.modalTitle = document.getElementById('modal-title');
    elements.modalBody = document.getElementById('modal-body');
    elements.modalClose = document.getElementById('modal-close-btn');

    setupStats();
    setupUserXP();
    setupFilters();
    setupSearch();
    setupModal();
    renderGallery();
  }

  function setupStats() {
    if (!window.SchoolStore) return;
    const stats = window.SchoolStore.getStats();
    if (elements.metricLessons) elements.metricLessons.innerText = stats.totalLessons;
    if (elements.metricMissions) elements.metricMissions.innerText = stats.totalMissions;
    if (elements.metricXP) elements.metricXP.innerText = `${stats.totalXP} XP`;
  }

  function setupUserXP() {
    let savedXP = localStorage.getItem('eaa_student_xp');
    if (!savedXP) {
      savedXP = '100'; // Initial starter bonus
      localStorage.setItem('eaa_student_xp', savedXP);
    }
    if (elements.userXPBadge) {
      elements.userXPBadge.innerText = savedXP;
    }
  }

  function setupFilters() {
    if (!elements.categoryFilters) return;
    elements.categoryFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      elements.categoryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.dataset.filterType;
      const filterVal = btn.dataset.filterVal;

      if (filterType === 'category') {
        currentCategory = filterVal;
      } else if (filterType === 'grade') {
        currentGrade = filterVal;
      }

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

  function setupModal() {
    if (!elements.modalClose || !elements.modalBackdrop) return;
    elements.modalClose.addEventListener('click', closeModal);
    elements.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === elements.modalBackdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function openLessonPlanModal(lessonId) {
    const lesson = window.SchoolStore.getLessonById(lessonId);
    if (!lesson) return;

    elements.modalTitle.innerText = `📋 45-Minute Lesson Protocol: ${lesson.shortTitle}`;
    
    let html = `
      <div style="margin-bottom: 20px;">
        <span class="meta-pill grade">${lesson.grade}</span>
        <span class="meta-pill cefr">${lesson.cefrLevel}</span>
        <span class="meta-pill">⏱️ ${lesson.duration} Minutes</span>
        <span class="meta-pill xp">⭐ ${lesson.xp} XP</span>
      </div>

      <div style="background: #f8fafc; border-left: 4px solid var(--indigo); padding: 14px 18px; margin-bottom: 20px; border-radius: 0 12px 12px 0;">
        <h4 style="color: var(--primary); margin-bottom: 6px;">🎯 Core Learning Objectives:</h4>
        <ul style="padding-left: 20px; color: #334155; line-height: 1.6;">
          ${lesson.objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `;

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
        <a href="${lesson.lessonPlanRoute}" target="_blank" class="btn-secondary plan-btn" style="padding: 10px 20px; font-size: 0.95rem;">
          📄 Open Full Protocol (Markdown)
        </a>
        <div style="display: flex; gap: 10px;">
          ${lesson.hasSlides ? `<a href="${lesson.slidesRoute}" class="btn-secondary" style="padding: 10px 18px;">📽️ Open Slides</a>` : ''}
          <a href="${lesson.route}" class="btn-primary-launch" style="padding: 10px 22px; font-size: 0.95rem;">🎮 Launch Game</a>
        </div>
      </div>
    `;

    elements.modalBody.innerHTML = html;
    elements.modalBackdrop.classList.add('open');
  }

  function closeModal() {
    if (elements.modalBackdrop) {
      elements.modalBackdrop.classList.remove('open');
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
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: var(--radius-lg); border: 2px dashed #cbd5e1;">
          <div style="font-size: 3.5rem;">🔍🐾</div>
          <h3 style="color: var(--primary); margin: 12px 0;">No matching modules found</h3>
          <p style="color: var(--text-muted);">Try clearing your search query or choosing another category filter.</p>
        </div>
      `;
      return;
    }

    elements.gallery.innerHTML = lessons.map(lesson => `
      <article class="module-card">
        <header class="card-header-banner" style="background: ${lesson.heroGradient};">
          <div class="card-badge ${lesson.isNew ? 'new' : ''}">${lesson.badge}</div>
          <div class="card-icon-title">
            <div class="card-avatar">${lesson.icon}</div>
            <div class="card-title-box">
              <h3>${lesson.title}</h3>
              <span class="card-category-tag">${lesson.category}</span>
            </div>
          </div>
        </header>

        <div class="card-body">
          <div class="pills-bar">
            <span class="meta-pill grade">🎓 ${lesson.grade}</span>
            <span class="meta-pill cefr">🌍 ${lesson.cefrLevel}</span>
            <span class="meta-pill">⏱️ ${lesson.duration}m</span>
            <span class="meta-pill xp">⭐ ${lesson.xp} XP</span>
          </div>

          <p class="card-desc">${lesson.summary}</p>

          <div class="missions-preview">
            <h5>Key Activities & Stages (${lesson.missions.length})</h5>
            <ul class="missions-list">
              ${lesson.missions.map(m => `<li>${m}</li>`).join('')}
            </ul>
          </div>

          <div class="card-actions">
            <a href="${lesson.route}" class="btn-primary-launch" title="Start Student Game">
              <span>🎮 Start Student Game</span>
              <span>➔</span>
            </a>

            <div class="secondary-actions">
              ${lesson.hasSlides ? `
                <a href="${lesson.slidesRoute}" class="btn-secondary" title="Open Smartboard Presentation">
                  <span>📽️</span>
                  <span>Teacher Slides</span>
                </a>
              ` : `
                <button class="btn-secondary" style="opacity:0.5; cursor:not-allowed;" title="Interactive Smartboard built-in">
                  <span>🖥️</span>
                  <span>Smartboard Built-in</span>
                </button>
              `}

              ${lesson.hasLessonPlan ? `
                <button class="btn-secondary plan-btn" onclick="window.appController.showProtocol('${lesson.id}')" title="View 45-Minute Lesson Script">
                  <span>📋</span>
                  <span>Lesson Protocol</span>
                </button>
              ` : `
                <a href="${lesson.route}" class="btn-secondary plan-btn" title="View In-Game Guide">
                  <span>📖</span>
                  <span>Teacher Notes</span>
                </a>
              `}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  window.appController = {
    showProtocol: openLessonPlanModal,
    closeProtocol: closeModal
  };

  document.addEventListener('DOMContentLoaded', init);
})();
