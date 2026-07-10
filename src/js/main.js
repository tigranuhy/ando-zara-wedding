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
});

