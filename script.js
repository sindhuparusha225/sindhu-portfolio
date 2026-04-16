/* =========================================
   PARUSHA SINDHU — script.js
   Smooth scroll · Nav · Animations
   ========================================= */

(function () {
  "use strict";

  /* ---- NAV SCROLL EFFECT ---- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }, { passive: true });

  /* ---- MOBILE NAV TOGGLE ---- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }

  /* ---- SCROLL-TRIGGERED FADE-IN ---- */
  const fadeTargets = document.querySelectorAll(
    ".focus-card, .project-card, .proof-item, .skills-group, .ach-card, .contact-link"
  );

  fadeTargets.forEach((el) => el.classList.add("fade-in"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  fadeTargets.forEach((el) => observer.observe(el));

  /* ---- STAGGER DELAY FOR GRIDS ---- */
  const grids = [
    { selector: ".focus-grid .focus-card", base: 0 },
    { selector: ".projects-grid .project-card", base: 0 },
    { selector: ".proof-grid .proof-item", base: 0 },
    { selector: ".skills-groups .skills-group", base: 0 },
  ];

  grids.forEach(({ selector }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  /* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
  const sections = document.querySelectorAll("section[id]");
  const allNavLinks = document.querySelectorAll(".nav-links a");

  const highlightNav = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    allNavLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "var(--wine)";
      }
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

})();
