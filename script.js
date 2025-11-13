// Cache DOM elements once
const items = document.querySelectorAll('.slider .list .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const thumbnails = document.querySelectorAll('.thumbnail .item');

const countItem = items.length;
let itemActive = 0;
let isAnimating = false;

// Auto run slider with longer interval for better UX
let refreshInterval = setInterval(() => {
  if (!isAnimating) next.click();
}, 5000);

// Optimized showSlider function
function showSlider() {
  if (isAnimating) return;
  isAnimating = true;

  // Use cached references instead of querying DOM
  items.forEach((item, index) => {
    item.classList.toggle('active', index === itemActive);
  });

  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === itemActive);
  });

  // Reset animation lock after transition
  setTimeout(() => {
    isAnimating = false;
  }, 500);

  // Clear and restart auto-run
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    if (!isAnimating) next.click();
  }, 5000);
}

// Event next click
next.addEventListener('click', () => {
  if (isAnimating) return;
  itemActive = (itemActive + 1) % countItem;
  showSlider();
});

// Event prev click
prev.addEventListener('click', () => {
  if (isAnimating) return;
  itemActive = (itemActive - 1 + countItem) % countItem;
  showSlider();
});

// Click thumbnail event with event delegation would be better,
// but keeping your pattern with optimization
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    if (isAnimating || index === itemActive) return;
    itemActive = index;
    showSlider();
  });
});

// Pause auto-slide when user interacts
let userInteracted = false;
const resetAutoSlide = () => {
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    if (!isAnimating) next.click();
  }, 5000);
};

// Optional: Pause on hover for better UX
const sliderElement = document.querySelector('.slider');
sliderElement.addEventListener('mouseenter', () => {
  clearInterval(refreshInterval);
});

sliderElement.addEventListener('mouseleave', () => {
  resetAutoSlide();
});
