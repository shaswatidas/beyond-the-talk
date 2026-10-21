/** Small inline icons. Always decorative: the adjacent text carries the meaning. */

export function CheckIcon() {
  return (
    <svg className="icon" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="8" fill="currentColor" opacity="0.14" />
      <path d="M5.2 9.3 7.8 11.8 12.8 6.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg className="icon" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="8" fill="currentColor" opacity="0.14" />
      <path d="M6.2 6.2 11.8 11.8M11.8 6.2 6.2 11.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HintIcon() {
  return (
    <svg className="icon" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path
        d="M9 2.5a4.6 4.6 0 0 0-2.7 8.3c.5.4.8 1 .8 1.6v.6h3.8v-.6c0-.6.3-1.2.8-1.6A4.6 4.6 0 0 0 9 2.5ZM7.2 15.5h3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ArrowIcon({ direction }: { direction: 'up' | 'down' | 'left' | 'right' }) {
  const rotate = { up: -90, down: 90, left: 180, right: 0 }[direction];
  return (
    <svg className="icon" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
