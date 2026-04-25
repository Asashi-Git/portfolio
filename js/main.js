/* ═══════════════════════════════════════════════
   SAMUEL DECARNELLE — PORTFOLIO
   js/main.js
   ───────────────────────────────────────────────
   Theme toggle, burger menu, navbar scroll,
   and global scroll reveal.
   ═══════════════════════════════════════════════ */

(function () {

    /* ── THEME TOGGLE ────────────────────────── */
    const toggle     = document.getElementById('theme-toggle');
    const body       = document.body;
    const themeIcon  = toggle ? toggle.querySelector('.theme-icon') : null;

    /* Read saved preference or default to dark */
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = body.classList.contains('light') ? 'light' : 'dark';
            const next    = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light');
            body.classList.remove('dark');
            if (themeIcon) themeIcon.textContent = '[light]';
        } else {
            body.classList.add('dark');
            body.classList.remove('light');
            if (themeIcon) themeIcon.textContent = '[dark]';
        }
    }

    /* ── NAVBAR SCROLL SHADOW ────────────────── */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    /* ── BURGER MENU ─────────────────────────── */
    const burger    = document.getElementById('burger');
    const navLinks  = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            burger.setAttribute('aria-expanded', isOpen);
        });

        /* Close menu on link click */
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                burger.setAttribute('aria-expanded', false);
            });
        });
    }

    /* ── SMOOTH ACTIVE NAV LINK ──────────────── */
    const sections  = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active-link'));
                const match = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );
                if (match) match.classList.add('active-link');
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObserver.observe(s));

    /* ── GLOBAL SCROLL REVEAL ────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── APPLY REVEAL CLASS TO SECTIONS ─────── */
    document.querySelectorAll(
        '.zone-card, .skill-category, .stat-card, .about-text p'
    ).forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

})();

