/**
 * Calendar Builder
 * Renders August 2026 calendar grid with day 30 highlighted
 */

export function initCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  const year = 2026;
  const month = 7; // August (0-indexed)
  const highlightDay = 30;

  // Get the first day of August 2026
  const firstDay = new Date(year, month, 1);
  // Day of week: 0=Sunday, we want Monday-first
  // Convert: Mon=0, Tue=1, ..., Sun=6
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  // Total days in August
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the 1st
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('div');
    empty.classList.add('calendar__day', 'calendar__day--empty');
    grid.appendChild(empty);
  }

  // Add day cells
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar__day');
    cell.textContent = day;

    if (day === highlightDay) {
      cell.classList.add('calendar__day--highlight');
    }

    grid.appendChild(cell);
  }
}

