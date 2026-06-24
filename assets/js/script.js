// ============================================================
// CLOSE TOP EVENT BAR
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const closeBtn = document.getElementById("closeEventBtn");
  const topBar = document.getElementById("topEventBar");

  if (closeBtn && topBar) {
    closeBtn.addEventListener("click", function () {
      topBar.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      topBar.style.opacity = "0";
      topBar.style.transform = "translateY(-100%)";
      setTimeout(function () {
        topBar.style.display = "none";
      }, 400);
    });
  }
});

// ============================================================
// SWIPER HERO SLIDER
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 800,
  });
});

// ============================================================
// SCROLLREVEAL ANIMATIONS
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
      distance: "40px",
      duration: 800,
      easing: "ease-out",
      reset: false,
    });

    ScrollReveal().reveal("[data-scroll-reveal]", {
      interval: 100,
      origin: "bottom",
    });

    ScrollReveal().reveal(".president-card", {
      origin: "left",
      distance: "60px",
    });

    ScrollReveal().reveal(".message-content", {
      origin: "right",
      distance: "60px",
      delay: 200,
    });
  }
});

// ============================================================
// NAVBAR ACTIVE LINK
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(
    ".navbar-custom .nav-link:not(.dropdown-toggle)",
  );

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (l) {
        l.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });
});

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// ============================================================
// MOBILE MENU - Hamburger to Close Icon & Scroll Fix
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#mainNav");
  const body = document.body;

  if (navbarToggler && navbarCollapse) {
    // Toggle icon change is handled by CSS via [aria-expanded]

    // Fix scrolling: when menu is open on mobile, prevent body scroll
    navbarToggler.addEventListener("click", function () {
      const isOpen = navbarCollapse.classList.contains("show");
      if (isOpen) {
        // Menu is closing
        body.style.overflow = "";
        body.style.position = "";
        body.style.width = "";
        body.style.height = "";
      } else {
        // Menu is opening
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.width = "100%";
        body.style.height = "100%";
      }
    });

    // Also handle when menu is closed by clicking outside or other means
    document.addEventListener("click", function (e) {
      const isClickInside =
        navbarToggler.contains(e.target) || navbarCollapse.contains(e.target);
      if (!isClickInside && navbarCollapse.classList.contains("show")) {
        // Menu is being closed by clicking outside
        body.style.overflow = "";
        body.style.position = "";
        body.style.width = "";
        body.style.height = "";
        // Close the menu via Bootstrap
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });

    // Listen for collapse hide event
    navbarCollapse.addEventListener("hidden.bs.collapse", function () {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      body.style.height = "";
    });
  }
});

// ============================================================
// BOOTSTRAP DROPDOWN FOR MOBILE (click with smooth toggle)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".mega-dropdown");

  dropdowns.forEach(function (dropdown) {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
      // Click handler for mobile
      toggle.addEventListener("click", function (e) {
        // Only handle on mobile (screen width <= 992px)
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();

          const isOpen = menu.classList.contains("show");

          // Close all other dropdowns
          document
            .querySelectorAll(".mega-dropdown .dropdown-menu")
            .forEach(function (m) {
              if (m !== menu) {
                m.classList.remove("show");
                m.style.display = "";
                m.style.opacity = "";
                m.style.transform = "";
              }
            });

          // Toggle this menu with smooth transition
          if (!isOpen) {
            menu.classList.add("show");
            menu.style.display = "block";
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";

            // Trigger reflow for animation
            void menu.offsetHeight;

            menu.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
          } else {
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";
            setTimeout(function () {
              menu.classList.remove("show");
              menu.style.display = "";
              menu.style.opacity = "";
              menu.style.transform = "";
            }, 300);
          }
        }
      });

      // Close when clicking outside
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          if (menu.classList.contains("show")) {
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";
            setTimeout(function () {
              menu.classList.remove("show");
              menu.style.display = "";
              menu.style.opacity = "";
              menu.style.transform = "";
            }, 300);
          }
        }
      });
    }
  });

  // Handle window resize - ensure dropdown state is reset
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      document
        .querySelectorAll(".mega-dropdown .dropdown-menu.show")
        .forEach(function (menu) {
          menu.classList.remove("show");
          menu.style.display = "";
          menu.style.opacity = "";
          menu.style.transform = "";
        });

      // Reset body styles
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }
  });
});

// document.querySelectorAll("*").forEach((el) => {
//   if (el.scrollWidth > document.documentElement.clientWidth) {
//     console.log(el);
//   }
// });

// [...document.querySelectorAll("*")]
//   .filter((el) => el.getBoundingClientRect().right > window.innerWidth)
//   .forEach((el) => {
//     console.log(
//       el,
//       "overflow:",
//       el.getBoundingClientRect().right - window.innerWidth,
//     );
//   });

// document.querySelectorAll("*").forEach((el) => {
//   const rect = el.getBoundingClientRect();

//   if (rect.right > window.innerWidth) {
//     console.log({
//       element: el,
//       class: el.className,
//       right: rect.right,
//       viewport: window.innerWidth,
//       overflow: rect.right - window.innerWidth,
//     });
//   }
// });

// console.log({
//   innerWidth: window.innerWidth,
//   clientWidth: document.documentElement.clientWidth,
//   scrollWidth: document.documentElement.scrollWidth
// });

// Width issue for small devices
// The problem is on footer and in section 2,3 and 4
