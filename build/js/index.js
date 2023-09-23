"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("nav-btn");
  const mobileMenu = document.getElementById("nav-mobile");
  const closeButton = document.getElementById("close-btn");
  const mobileLinks = document.querySelectorAll(".nav-mobile-link");
  const body = document.body;

  // Function to open the mobile menu
  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    body.style.overflowY = "hidden"; // Prevent scrolling of the body
  }

  // Function to close the mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    body.style.overflowY = "auto"; // Allow scrolling of the body
  }

  // Event listener to open the mobile menu
  toggleButton.addEventListener("click", openMobileMenu);

  // Event listener to close the mobile menu
  closeButton.addEventListener("click", closeMobileMenu);

  // Event listener for smooth scrolling (similar to your existing code)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }

      // Close the mobile menu when a link is clicked
      closeMobileMenu();
    });
  });
});

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
