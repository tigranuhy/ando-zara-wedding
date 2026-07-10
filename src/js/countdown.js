/**
 * Countdown Timer
 * Counts down to August 30, 2026 at 12:00 noon Armenia time (UTC+4)
 */

const WEDDING_DATE = new Date('2026-08-30T12:00:00+04:00');

const elements = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

let previousValues = {
  days: '',
  hours: '',
  minutes: '',
  seconds: '',
};

function padZero(num) {
  return String(num).padStart(2, '0');
}

function getTimeRemaining() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total: diff };
}

function updateDisplay() {
  const time = getTimeRemaining();

  const values = {
    days: padZero(time.days),
    hours: padZero(time.hours),
    minutes: padZero(time.minutes),
    seconds: padZero(time.seconds),
  };

  Object.keys(values).forEach((key) => {
    if (elements[key] && values[key] !== previousValues[key]) {
      elements[key].textContent = values[key];
      // Trigger flip animation
      elements[key].classList.remove('flip');
      // Force reflow to restart animation
      void elements[key].offsetWidth;
      elements[key].classList.add('flip');
      previousValues[key] = values[key];
    }
  });

  if (time.total <= 0) {
    // Wedding time has arrived!
    clearInterval(intervalId);
  }
}

let intervalId = null;

export function initCountdown() {
  elements.days = document.getElementById('countdown-days');
  elements.hours = document.getElementById('countdown-hours');
  elements.minutes = document.getElementById('countdown-minutes');
  elements.seconds = document.getElementById('countdown-seconds');

  if (!elements.days) return;

  // Initial update
  updateDisplay();
  // Update every second
  intervalId = setInterval(updateDisplay, 1000);
}

