'use client';
import { useEffect } from 'react';

export default function ClientScripts({ phrases }: { phrases: string[] }) {
  useEffect(() => {
    // ─── TYPING ANIMATION ──────────────────────────
    let pi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');
    let typingTimeout: any;
    
    function type() {
      if (!el) return;
      const word = phrases[pi] || phrases[0];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; typingTimeout = setTimeout(type, 1800); return; }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; typingTimeout = setTimeout(type, 400); return; }
      }
      typingTimeout = setTimeout(type, deleting ? 45 : 75);
    }
    typingTimeout = setTimeout(type, 100);

    // ─── SCROLL REVEAL ─────────────────────────────
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ─── GITHUB ACTIVITY GRID ──────────────────────
    const grid = document.getElementById('activityGrid');
    if (grid && grid.children.length === 0) {
      const levels = [null,'l1','l2','l3','l4'];
      for (let i = 0; i < 364; i++) {
        const cell = document.createElement('div');
        const r = Math.random();
        cell.className = 'activity-cell' + (r > .65 ? ' ' + levels[Math.floor(r * 4) + 1] : '');
        grid.appendChild(cell);
      }
    }

    // ─── DARK MODE TOGGLE ──────────────────────────
    const toggle = document.getElementById('modeToggle');
    let isLight = false;
    const handleToggle = () => {
      isLight = !isLight;
      document.body.classList.toggle('light', isLight);
      if(toggle) toggle.textContent = isLight ? '🌙' : '☀️';
    };
    if(toggle) toggle.addEventListener('click', handleToggle);

    // ─── NAV ACTIVE STATE ──────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const handleScroll = () => {
      let current = '';
      sections.forEach(s => { 
        if (window.scrollY >= (s as HTMLElement).offsetTop - 80) current = s.id; 
      });
      navLinks.forEach(a => {
        (a as HTMLElement).style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(typingTimeout);
      if(toggle) toggle.removeEventListener('click', handleToggle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [phrases]);

  return null;
}
