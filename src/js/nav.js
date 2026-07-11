/**
 * Navigation
 * - IntersectionObserver to trigger per-section entrance animations
 * - Smooth scroll on arrow click
 */

export function initNav() {
  const sections = document.querySelectorAll('.section');
  const scrollContainer = document.querySelector('.scroll-container');

  // Click handler for section arrows
  document.querySelectorAll('.section__arrow').forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = arrow.getAttribute('href')?.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver to trigger per-section entrance animations
  const observerOptions = {
    root: scrollContainer,
    rootMargin: '0px',
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Trigger section animation
        entry.target.classList.add('visible');
      } else {
        // Remove visible so animation replays on next scroll
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

