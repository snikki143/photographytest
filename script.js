
/* =========================================
   JOSHRA PHOTOGRAPHY
   WEBSITE INTERACTIONS
========================================= */

// ADD YOUR DETAILS HERE

const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// Add your YouTube or Vimeo link here.
// Leave empty until you have a showreel.
const SHOWREEL_URL = "https://youtu.be/rrEhvZd8M3E?si=M-CrK-jX4m3oNvxA";


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

  const isOpen = navigation.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);

});

document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    navigation.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");

  });

});


/* =========================================
   HERO TEXT SLIDER
========================================= */

const slides = [

  {
    eyebrow: "PHOTOGRAPHY & FILMS",
    lineOne: "Feel the",
    lineTwo: "Moment",
    accent: "Forever",
    description:
      "Capturing real emotions, timeless moments, and stories that stay with you forever."
  },

  {
    eyebrow: "WEDDINGS & CELEBRATIONS",
    lineOne: "Your Story",
    lineTwo: "Starts",
    accent: "Here",
    description:
      "Beautifully capturing the beginning of your forever, one frame at a time."
  },

  {
    eyebrow: "CINEMATIC STORIES",
    lineOne: "Every Frame",
    lineTwo: "Holds a",
    accent: "Memory",
    description:
      "We turn fleeting moments into cinematic memories you can experience again and again."
  },

  {
    eyebrow: "EVENTS & PORTRAITS",
    lineOne: "Moments",
    lineTwo: "Made",
    accent: "Timeless",
    description:
      "Every smile, every celebration, every emotion deserves to be remembered."
  }

];

const heroEyebrow = document.getElementById("heroEyebrow");
const titleLineOne = document.getElementById("titleLineOne");
const titleLineTwo = document.getElementById("titleLineTwo");
const titleAccent = document.getElementById("titleAccent");
const heroDescription = document.getElementById("heroDescription");

const dots = document.querySelectorAll(".hero-dot");

function changeSlide(index) {

  const slide = slides[index];

  if (!slide) return;

  const heroContent = document.querySelector(".hero-content");

  heroContent.style.opacity = "0";
  heroContent.style.transform = "translateY(12px)";

  setTimeout(() => {

    heroEyebrow.textContent = slide.eyebrow;
    titleLineOne.textContent = slide.lineOne;
    titleLineTwo.textContent = slide.lineTwo;
    titleAccent.textContent = slide.accent;
    heroDescription.textContent = slide.description;

    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(0)";

  }, 250);

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

}

dots.forEach(dot => {

  dot.addEventListener("click", () => {

    const index = Number(dot.dataset.slide);

    changeSlide(index);

  });

});


/* =========================================
   SHOWREEL MODAL
========================================= */

const showreelButton = document.getElementById("showreelButton");
const videoModal = document.getElementById("videoModal");
const modalClose = document.getElementById("modalClose");
const videoContainer = document.getElementById("videoContainer");

function getEmbedUrl(url) {

  try {

    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return "https://www.youtube.com/embed/" +
        parsed.pathname.slice(1);
    }

    if (parsed.hostname.includes("youtube.com")) {

      if (parsed.pathname.includes("/embed/")) {
        return url;
      }

      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return "https://www.youtube.com/embed/" + videoId;
      }
    }

    if (parsed.hostname.includes("vimeo.com")) {

      const videoId = parsed.pathname.split("/").filter(Boolean).pop();

      if (videoId) {
        return "https://player.vimeo.com/video/" + videoId;
      }
    }

  } catch (error) {
    return "";
  }

  return "";
}

function openShowreel() {

  videoModal.classList.add("show");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const embedUrl = getEmbedUrl(SHOWREEL_URL);

  if (embedUrl) {

    videoContainer.innerHTML = `
      <iframe
        class="video-frame"
        src="${embedUrl}?autoplay=1"
        title="Joshra Photography Showreel"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;

  } else {

    videoContainer.innerHTML = `
      <div class="video-placeholder">
        <span class="play-icon large">▶</span>
        <h3>Joshra Showreel</h3>
        <p>Your cinematic story begins here.</p>
        <small>Add your YouTube or Vimeo showreel link in script.js.</small>
      </div>
    `;

  }

}

function closeShowreel() {

  videoModal.classList.remove("show");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  videoContainer.innerHTML = `
    <div class="video-placeholder">
      <span class="play-icon large">▶</span>
      <h3>Joshra Showreel</h3>
      <p>Your cinematic story begins here.</p>
    </div>
  `;

}

showreelButton.addEventListener("click", openShowreel);

modalClose.addEventListener("click", closeShowreel);

videoModal.addEventListener("click", event => {

  if (event.target === videoModal) {
    closeShowreel();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeShowreel();
  }

});


/* =========================================
   WHATSAPP ENQUIRY FORM
========================================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventType = document.getElementById("eventType").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !eventType) {

    alert("Please fill in all required fields.");

    return;

  }

  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {

    alert("Please enter a valid phone number.");

    return;

  }

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {

    alert("Please add your correct WhatsApp number in script.js first.");

    return;

  }

  const whatsappMessage =

    `Hello Joshra Photography!

    Name: ${name}

    Phone: ${phone}

    Event Type: ${eventType}

    Event Details: ${message || "Not provided"}

    I would like to enquire about your photography services.`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");

});


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-grid, .portfolio-item, .service-card, .contact-grid"
);

revealElements.forEach(element => {

  element.classList.add("reveal");

});

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const sectionId = entry.target.id;

      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${sectionId}`
        );

      });

    }

  });

}, {
  rootMargin: "-35% 0px -55% 0px"
});

pageSections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================
   MAIN CARD MOUSE MOVEMENT
   DESKTOP ONLY
========================================= */

const mainCard = document.querySelector(".main-card");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

  const visualStage = document.querySelector(".visual-stage");

  visualStage.addEventListener("mousemove", event => {

    const rect = visualStage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 5;
    const rotateX = (0.5 - y) * 5;

    mainCard.style.transform =
      `rotate(5deg) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  });

  visualStage.addEventListener("mouseleave", () => {

    mainCard.style.transform = "rotate(5deg)";

  });

}
