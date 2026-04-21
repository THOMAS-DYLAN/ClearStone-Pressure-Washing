/* ========================================
   CLEARSTONE PRESSURE WASHING — script.js
======================================== */

// ── Sticky Header ──
const header = document.getElementById('header');
const scrollThreshold = 40;

function handleScroll() {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ── Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Smooth Scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll(
  '.service-card, .why-item, .result-card, .testimonial-card, ' +
  '.area-tag, .contact-detail-item, .section-label, ' +
  '.section-title, .section-sub, .service-area-visual'
);

// Add reveal class
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger siblings inside same parent
  const siblings = el.parentElement.querySelectorAll('.reveal');
  const idx = Array.from(siblings).indexOf(el);
  if (idx > 0 && idx < 5) {
    el.classList.add(`reveal-delay-${idx}`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Quote Form ──
const form = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Basic validation
  const name  = form.querySelector('#name');
  const phone = form.querySelector('#phone');
  const email = form.querySelector('#email');
  let valid = true;

  [name, phone, email].forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#e05a5a';
      valid = false;
    }
  });

  if (!valid) return;

  // Simulate submission
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('visible');
  }, 900);
});

// ── Active Nav Highlight on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent-l)';
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
