/**
 * Navigation / Minimap
 * - IntersectionObserver to highlight active section
 * - Smooth scroll on click
 */

export function initNav() {
  const minimap = document.querySelector('.minimap');
  if (!minimap) return;

  const dots = minimap.querySelectorAll('.minimap__dot');
  const sections = document.querySelectorAll('.section');
  const scrollContainer = document.querySelector('.scroll-container');

  // Click handler for minimap dots
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href')?.replace('#', '') || dot.dataset.section;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

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

  // IntersectionObserver to track active section
  const observerOptions = {
    root: scrollContainer,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach((dot) => {
          const dotSection = dot.getAttribute('href')?.replace('#', '') || dot.dataset.section;
          dot.classList.toggle('minimap__dot--active', dotSection === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

