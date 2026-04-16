/* =============================================
   Parusha Sindhu — Portfolio Script
   Handles: scroll reveal, nav state, mobile menu,
   smooth interactions
============================================= */

(function () {
  'use strict';

  // === Nav scroll state ===
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // === Mobile menu toggle ===
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
      spans[1].style.opacity   = isOpen ? '0' : '';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  // === Scroll Reveal with Intersection Observer ===
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-character');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, stop observing
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // === Hero elements trigger on load ===
  // (CSS handles delay via animation classes, but we also
  //  trigger visible for hero elements immediately)
  function triggerHeroReveal() {
    const heroReveals = document.querySelectorAll('.hero .reveal-up, .hero .reveal-character');
    // Small stagger then mark as visible
    heroReveals.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 100 + i * 100);
    });
  }

  // Wait for fonts & layout
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerHeroReveal);
  } else {
    triggerHeroReveal();
  }

  // === Smooth active link highlighting ===
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--beige-mid)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // === Subtle parallax on hero orbs ===
  const orbs = document.querySelectorAll('.hero-orb');

  function parallaxOrbs() {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.08 + i * 0.04;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  window.addEventListener('scroll', parallaxOrbs, { passive: true });

  // === Skill tags — staggered hover glow ===
  const skillTags = document.querySelectorAll('.skill-tags span');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 0 16px rgba(139, 38, 53, 0.3)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });

  // === Project card — subtle tilt effect ===
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const tiltX  = (y / rect.height) * 3;
      const tiltY  = -(x / rect.width) * 3;
      this.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      this.style.transition = 'transform 0.1s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.transition = 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    });
  });

  // === Stat counter animation ===
  function animateCounter(el, target, suffix) {
    const isDecimal = target % 1 !== 0;
    const duration  = 1800;
    const start     = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const value    = eased * target;

      if (isDecimal) {
        el.textContent = value.toFixed(1) + suffix;
      } else {
        el.textContent = Math.round(value) + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl  = entry.target.querySelector('.stat-num');
        if (!numEl) return;
        const suffix = numEl.querySelector('span')?.textContent || '';
        const text   = numEl.textContent.replace(suffix, '').trim();
        const target = parseFloat(text);
        if (!isNaN(target)) {
          animateCounter(numEl, target, suffix ? `<span>${suffix}</span>` : '');

          // Re-inject suffix span after animation using innerHTML
          setTimeout(() => {
            const val = numEl.textContent;
            if (suffix && !numEl.querySelector('span')) {
              numEl.innerHTML = val + `<span>${suffix}</span>`;
            }
          }, 1900);
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
  });

  // === Proof cards — entrance shimmer ===
  const proofCards = document.querySelectorAll('.proof-card');
  const proofObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, i * 120);
        proofObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  proofCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.35s ease';
    proofObserver.observe(card);
  });

  // === Character SVG — subtle idle breathing animation ===
  const characterSvg = document.querySelector('.character-svg');
  if (characterSvg) {
    let breatheT = 0;
    function breathe() {
      breatheT += 0.012;
      const scale = 1 + Math.sin(breatheT) * 0.008;
      const dy    = Math.sin(breatheT * 0.7) * 2;
      characterSvg.style.transform = `scale(${scale}) translateY(${dy}px)`;
      characterSvg.style.transformOrigin = 'bottom center';
      requestAnimationFrame(breathe);
    }
    breathe();
  }

  // === Console easter egg ===
  console.log(
    '%cParusha Sindhu — Portfolio',
    'color: #8B2635; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cBuilt with care. Machine Learning · XAI · Fairness AI',
    'color: #C4956A; font-size: 12px;'
  );
  console.log(
    '%csindhuparusha225@gmail.com',
    'color: #8B5A5A; font-size: 11px;'
  );

})();
