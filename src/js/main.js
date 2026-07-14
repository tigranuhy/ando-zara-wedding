/**
 * Main Entry Point
 * Initializes all modules on DOMContentLoaded
 */

import { initCountdown } from './countdown.js';
import { initNav } from './nav.js';
import { initCalendar } from './calendar.js';
import { initAudio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNav();
  initCalendar();
  initAudio();

  const fontsLink = document.getElementById('google-fonts');
  if (fontsLink) fontsLink.media = 'all';

  // Marks the page past the envelope-seam loader (see loader.css /
  // animations.css) so the hero's entrance delay — timed to emerge
  // *during* the two pieces separating on first load — doesn't also apply
  // the next time the hero scrolls back into view. Must wait until the
  // hero's own transition (2.5s delay + 1.2s duration, see
  // animations.css) has fully finished, since changing transition-delay/
  // -duration mid-flight would jump the in-progress animation.
  window.setTimeout(() => {
    document.body.classList.add('loaded');
  }, 3800);
});

