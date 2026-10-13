// Simple hand-drawn-style line icons that sit alongside the logo's illustration style.
const common = { width: 56, height: 56, viewBox: '0 0 56 56', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export function Icon({ name }) {
  switch (name) {
    case 'seedhead':
      return <svg {...common}><path d="M28 52V24" /><path d="M28 34c-5-2-8-6-9-11" /><circle cx="28" cy="16" r="8" /><path d="M28 8v-3M21 11l-2-2M35 11l2-2M20 17h-3M36 17h3" /><path d="M22 52h12" /></svg>;
    case 'bird':
      return <svg {...common}><path d="M10 30c6 10 22 12 30 2l8-10-8 1c-2-5-8-7-12-4" /><path d="M28 19c-6 2-9 8-8 14" /><circle cx="36" cy="21" r="1.2" fill="currentColor" /><path d="M24 41l-3 7M31 41l1 7" /><path d="M6 48h44" /></svg>;
    case 'bee':
      return <svg {...common}><ellipse cx="28" cy="32" rx="12" ry="9" /><path d="M24 23.5v17M31 23.5v17" /><path d="M24 23c-6-10-14-8-14-3s8 6 14 3zM31 23c5-10 14-9 14-4s-8 7-14 4z" /><path d="M40 30l6-3M40 34l5 2" /><path d="M16 32h-4" /></svg>;
    case 'log':
      return <svg {...common}><ellipse cx="14" cy="38" rx="6" ry="8" /><path d="M14 30h30c4 0 6 4 6 8s-2 8-6 8H14" /><ellipse cx="14" cy="38" rx="2.4" ry="3.4" /><path d="M24 34h12M28 42h14" /><path d="M36 30c0-6 4-10 9-12-1 5-4 9-9 12z" /></svg>;
    default:
      return null;
  }
}

// A scalloped hedge-line edge used between the yellow hero and the page.
const HEDGE_PATH = (() => {
  const w = 48;
  let d = 'M0 0H1440V12';
  for (let x = 1440; x > 0; x -= w) d += `A${w / 2} 22 0 0 1 ${x - w} 12`;
  return `${d}Z`;
})();

export function HedgeEdge() {
  return (
    <svg className="hedgeEdge" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
      <path d={HEDGE_PATH} />
    </svg>
  );
}
