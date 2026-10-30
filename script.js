/* =========================================================
   Interactive bits: mobile menu, sticky header, scroll reveal
   ========================================================= */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  /* ---- mobile menu ---- */
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("is-open");
    header.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      header.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---- header shadow on scroll ---- */
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ---- */
  var targets = document.querySelectorAll("[data-reveal]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    targets.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* ---- current year in footer ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
