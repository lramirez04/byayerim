/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand on hoverable elements
const hoverTargets = document.querySelectorAll('a, .video-card, button');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});

/* ── IntersectionObserver: play/pause videos off-screen ── */
const videoCards = document.querySelectorAll('.video-card video');

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting
      ? entry.target.play().catch(() => {})
      : entry.target.pause();
  });
}, { threshold: 0.1 });

videoCards.forEach(v => videoObserver.observe(v));

/* ── Hero video always plays ── */
const heroVideo = document.querySelector('.hero-video');
heroVideo.play().catch(() => {});

/* ── Subtle parallax on hero name ── */
const heroName = document.querySelector('.hero-name');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroName.style.transform = `translateY(${y * 0.18}px)`;
    heroName.style.opacity   = 1 - (y / (window.innerHeight * 0.7));
  }
}, { passive: true });
