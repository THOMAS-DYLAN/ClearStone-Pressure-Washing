/* ============================
   CLEARSTONE PRESSURE WASHING
   script.js
   ============================ */

'use strict';

// ===========================
// STICKY HEADER
// ===========================
const header = document.getElementById('site-header');

function handleScroll() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run once on load


// ===========================
// MOBILE NAV
// ===========================
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
let navOpen = false;

function toggleNav() {
  navOpen = !navOpen;
  hamburger.classList.toggle('open', navOpen);
  mainNav.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleNav);

// Close nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navOpen) toggleNav();
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (navOpen && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
    toggleNav();
  }
});


// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // header height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent grid
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal]'));
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 100, 400);

      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// ===========================
// BEFORE / AFTER SLIDER HINT
// ===========================
// Add a visual divider line to BA cards on hover
document.querySelectorAll('.ba-card').forEach(card => {
  const images = card.querySelector('.ba-images');
  if (!images) return;

  // Create a divider line
  const divider = document.createElement('div');
  divider.style.cssText = `
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 3px;
    background: rgba(255,255,255,0.85);
    transform: translateX(-50%);
    z-index: 10;
    pointer-events: none;
    box-shadow: 0 0 8px rgba(0,0,0,0.5);
  `;
  images.style.position = 'relative';
  images.appendChild(divider);
});


// ===========================
// QUOTE FORM HANDLING
// ===========================
const quoteForm = document.getElementById('quote-form');
const formSuccess = document.getElementById('form-success');

if (quoteForm) {
  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = this.querySelector('#name').value.trim();
    const phone = this.querySelector('#phone').value.trim();

    if (!name || !phone) {
      // Shake the first empty required field
      [this.querySelector('#name'), this.querySelector('#phone')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => {
            field.style.animation = '';
            field.style.borderColor = '';
          }, 500);
        }
      });
      return;
    }

    // Simulate form submission
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      quoteForm.style.display = 'none';
      formSuccess.classList.add('active');
    }, 1200);
  });
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);


// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'rgba(255,255,255,1)'
          : 'rgba(255,255,255,0.72)';
      });
    }
  });
}, {
  threshold: 0.35,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(s => sectionObserver.observe(s));


// ===========================
// PHONE NUMBER FORMATTING
// ===========================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length >= 10) {
      v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6,10)}`;
    }
    this.value = v;
  });
}


// ===========================
// PARALLAX HERO (subtle)
// ===========================
const heroImg = document.querySelector('.hero-img');
if (heroImg && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1.04) translateY(${scrollY * 0.18}px)`;
    }
  }, { passive: true });
}
