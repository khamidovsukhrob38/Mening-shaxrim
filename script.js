
const slides = [...document.querySelectorAll(".slide")];
const current = document.getElementById("current");
const progress = document.getElementById("progress");
const slideName = document.getElementById("slide-name");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");

let activeIndex = 0;
let touchStartX = 0;

function showSlide(index) {
  // Slayd raqamini chegarada saqlash
  activeIndex = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === activeIndex);
    slide.setAttribute("aria-hidden", i !== activeIndex);

    // Slayd qayta ochilganda kirish animatsiyasini takrorlash
    if (i === activeIndex) {
      slide.querySelectorAll(".reveal").forEach((element) => {
        element.style.animation = "none";
        void element.offsetWidth;
        element.style.animation = "";
      });
    }
  });

  const number = String(activeIndex + 1).padStart(2, "0");

  current.textContent = number;
  progress.style.width =
    `${((activeIndex + 1) / slides.length) * 100}%`;

  slideName.textContent = slides[activeIndex].dataset.title;

  prevButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === slides.length - 1;
}

function nextSlide() {
  if (activeIndex < slides.length - 1) {
    showSlide(activeIndex + 1);
  }
}

function previousSlide() {
  if (activeIndex > 0) {
    showSlide(activeIndex - 1);
  }
}

// Tugmalar
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", previousSlide);

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showSlide(Number(button.dataset.go));
  });
});

// Klaviatura orqali boshqarish
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    nextSlide();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    previousSlide();
  }

  if (event.key === "Home") {
    showSlide(0);
  }

  if (event.key === "End") {
    showSlide(slides.length - 1);
  }
});

// Telefon ekranida surish orqali slayd almashtirish
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 70) return;

  if (distance < 0) {
    nextSlide();
  } else {
    previousSlide();
  }
}, { passive: true });

// Taqdimotni qaytadan boshlash
restartButton.addEventListener("click", () => {
  showSlide(0);
});

// Dastlab birinchi slaydni ko‘rsatish
showSlide(0);
