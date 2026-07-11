/**
 * Main Entry Point
 * Initializes all modules on DOMContentLoaded
 */

import { initCountdown } from './countdown.js';
import { initNav } from './nav.js';
import { initCalendar } from './calendar.js';

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNav();
  initCalendar();

  // Marks the page past the envelope-seam loader (see loader.css /
  // animations.css) so the hero's entrance delay — timed to emerge
  // *during* the two pieces separating on first load — doesn't also apply
  // the next time the hero scrolls back into view.
  window.setTimeout(() => {
    document.body.classList.add('loaded');
  }, 2350);
});

