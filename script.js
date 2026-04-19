/* =========================================
   PARUSHA SINDHU — script.js
   Professional interactions
   ========================================= */

(function () {
  "use strict";

  /* ---- NAV SCROLL ---- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }, { passive: true });

  /* ---- MOBILE NAV ---- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }

  /* ---- SCROLL ANIMATIONS ---- */
  const fadeTargets = document.querySelectorAll(
    ".value-prop, .project-item, .skill-category, .contact-method"
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
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  fadeTargets.forEach((el) => observer.observe(el));

  /* ---- STAGGER ---- */
  document.querySelectorAll(".project-item").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
  });

})();
