export function initAudio() {
  if (!new URLSearchParams(location.search).has('she')) return;

  const audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.src = '/audio/she.mp3';
  audio.volume = 0.4;

  const isActive = () => document.visibilityState === 'visible' && document.hasFocus();

  const tryPlay = () => {
    if (audio.ended || !isActive()) return;
    audio.play().catch(() => {});
  };

  const gestureEvents = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
  const unlockOnGesture = () => {
    audio.muted = false;
    tryPlay();
    gestureEvents.forEach((evt) => document.removeEventListener(evt, unlockOnGesture));
  };
  gestureEvents.forEach((evt) => document.addEventListener(evt, unlockOnGesture, { passive: true }));

  const syncPlayback = () => (isActive() ? tryPlay() : audio.pause());
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('focus', syncPlayback);
  window.addEventListener('blur', syncPlayback);

  audio.muted = true;
  audio.play().then(() => {
    audio.muted = false;
  }).catch(() => {});
}
