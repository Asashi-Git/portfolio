/* ═══════════════════════════════════════════════
   SAMUEL DECARNELLE — PORTFOLIO
   js/renderer.js
   ───────────────────────────────────────────────
   Reads PROJECTS from data/projects.js and
   builds all project cards automatically.
   You never need to touch this file.
   ═══════════════════════════════════════════════ */

(function () {

    /* ── DOM TARGET ─────────────────────────── */
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    /* ── BUILD A SINGLE CARD ─────────────────── */
    function buildCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.dataset.tags = project.tags.join(' ');

        /* Status label */
        const statusMap = {
            active:    '[active]',
            completed: '[completed]',
            planned:   '[planned]'
        };

        /* Tags HTML */
        const tagsHTML = project.tags
            .map(t => `<span class="project-tag">${t}</span>`)
            .join('');

        /* Link HTML */
        const linkHTML = project.link
            ? `<a href="${project.link.href}"
                  class="project-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  ${project.link.label}
               </a>`
            : '';

        card.innerHTML = `
            <div class="project-card-header">
                <span class="project-name">${project.name}</span>
                <span class="project-status status-${project.status}">
                    ${statusMap[project.status] || ''}
                </span>
            </div>
            <p class="project-summary">${project.summary}</p>
            <div class="project-tags">${tagsHTML}</div>
            ${linkHTML}
        `;

        return card;
    }

    /* ── RENDER ALL PROJECTS ─────────────────── */
    function renderProjects(filter = 'all') {
        grid.innerHTML = '';

        const filtered = filter === 'all'
            ? PROJECTS
            : PROJECTS.filter(p => p.tags.includes(filter));

        if (filtered.length === 0) {
            grid.innerHTML = `
                <p style="color:var(--text-muted);font-size:0.85rem;">
                    > no projects match this filter yet.
                </p>`;
            return;
        }

        filtered.forEach(project => {
            const card = buildCard(project);
            grid.appendChild(card);
        });

        /* Trigger scroll reveal for newly added cards */
        observeReveal();
    }

    /* ── FILTER BUTTONS ──────────────────────── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    /* ── SCROLL REVEAL OBSERVER ──────────────── */
    function observeReveal() {
        const reveals = document.querySelectorAll('.reveal:not(.visible)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    }

    /* ── INIT ────────────────────────────────── */
    renderProjects('all');

})();

