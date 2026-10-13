// Engraved-style line art for the garden visitors.
// Drawn to sit alongside the botanical PNG engravings: moss ink on paper,
// fine outlines, contour hatching that follows each form, and stippling.
// Every creature is an SVG string; moving parts carry data-part attributes
// that the engine animates.

export const INK = '#17331b';
export const PAPER = '#f6f6ef';

let uidCounter = 0;
const uid = (p) => `gv${p}${++uidCounter}`;

// Small seeded random so generated strokes are identical every render.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const f = (n) => Math.round(n * 10) / 10;
const pts = (arr) => arr.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L');

// Shared hatch patterns, injected once into the page.
export const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<pattern id="gv-h" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="2.6" stroke="${INK}" stroke-width=".6"/></pattern>
<pattern id="gv-hl" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><line x1="0" y1="0" x2="0" y2="3" stroke="${INK}" stroke-width=".4"/></pattern>
<pattern id="gv-hx" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 0V2.6M0 0H2.6" stroke="${INK}" stroke-width=".55"/></pattern>
<pattern id="gv-hd" width="1.9" height="1.9" patternUnits="userSpaceOnUse" patternTransform="rotate(42)"><line x1="0" y1="0" x2="0" y2="1.9" stroke="${INK}" stroke-width=".9"/></pattern>
<pattern id="gv-dot" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".42" fill="${INK}"/><circle cx="3" cy="2.8" r=".36" fill="${INK}"/></pattern>
</defs></svg>`;

const svg = (vb, inner, cls) =>
  `<svg class="gv-art ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

// Clip a set of hatch strokes to a shape.
function clipped(shape, strokes) {
  const id = uid('c');
  return `<clipPath id="${id}"><path d="${shape}"/></clipPath><g clip-path="url(#${id})">${strokes}</g>`;
}

// Concentric arcs around a highlight point: the classic engraved "dome" shading.
// Weight grows with distance from the highlight, so the form turns away into shadow.
function domeHatch({ cx, cy, r0, r1, step, a0 = 0, a1 = Math.PI * 2, w0 = 0.25, w1 = 1.1, sx = 1, sy = 1 }) {
  let out = '';
  for (let r = r0; r <= r1; r += step) {
    const t = (r - r0) / (r1 - r0);
    const p = [];
    for (let a = a0; a <= a1 + 0.001; a += 0.12) p.push([cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r * sy]);
    out += `<path d="M${pts(p)}" stroke-width="${f(w0 + (w1 - w0) * t * t)}"/>`;
  }
  return out;
}

/* ---------------- Large white butterfly (top-down, head up) ---------------- */
function butterfly() {
  const R = rng(11);
  const fore = 'M3 -14 C14 -40 52 -62 86 -58 C94 -50 88 -30 78 -14 C66 2 40 8 5 2 Z';
  const hind = 'M5 2 C34 0 64 10 66 30 C66 48 46 62 28 58 C14 54 6 38 4 20 Z';
  const apex = 'M56 -59 C74 -63 92 -56 86 -38 C80 -40 76 -46 71 -44 C64 -49 60 -53 56 -59 Z';
  const veins = [
    'M5 -6 C30 -26 56 -44 84 -54', 'M5 -4 C32 -18 58 -30 82 -36', 'M5 -2 C34 -10 58 -16 78 -16',
    'M5 0 C30 0 50 -2 66 -2', 'M6 6 C28 12 48 20 62 30', 'M6 8 C24 20 36 36 44 54', 'M5 10 C14 26 20 42 26 56',
  ].map((d) => `<path d="${d}" stroke-width=".55"/>`).join('');
  // Short strokes radiating from the wing root: dusting of scales, dense at the base.
  let root = '';
  for (let i = 0; i < 70; i++) {
    const a = -1.25 + R() * 2.5;
    const r1 = 4 + R() * 10, r2 = r1 + 6 + R() * (14 + (1 - Math.abs(a)) * 10);
    root += `<path d="M${f(5 + Math.cos(a) * r1)} ${f(-2 + Math.sin(a) * r1)} L${f(5 + Math.cos(a) * r2)} ${f(-2 + Math.sin(a) * r2)}" stroke-width="${f(0.3 + R() * 0.35)}"/>`;
  }
  let apexLines = '';
  for (let i = 0; i < 16; i++) apexLines += `<path d="M${56 + i * 2.4} -64 L${70 + i * 1.6} -34" stroke-width=".7"/>`;
  const edge = (d) => `<path d="${d}" fill="${PAPER}" stroke-width="1.05"/>`;
  const wing = `${edge(hind)}${edge(fore)}
    ${clipped(fore, root + `<path d="${fore}" fill="url(#gv-hl)" stroke="none" opacity=".25"/>`)}
    ${clipped(hind, root.replace(/-2 /g, '4 ') + `<path d="M5 30 C20 60 50 60 66 30" stroke-width="6" stroke="url(#gv-hl)" opacity=".5"/>`)}
    ${veins}
    ${clipped(apex, apexLines)}
    <path d="${apex}" stroke-width=".6"/>
    <circle cx="54" cy="-25" r="4.6" fill="url(#gv-hd)" stroke-width=".6"/>
    <path d="M80 -52 C84 -44 82 -30 74 -18 M60 54 C52 58 38 60 28 56" stroke-width=".4"/>`;
  let fur = '';
  for (let y = -32; y < 42; y += 2.2) fur += `<path d="M-4.5 ${y} L4.5 ${f(y + 1.5)}" stroke-width=".55"/>`;
  return svg('-100 -82 200 160', `
    <g data-part="wingR">${wing}</g>
    <g data-part="wingL" transform="scale(-1 1)"><g>${wing}</g></g>
    <path d="M-2 -38 C-12 -50 -18 -62 -24 -72" stroke-width=".8"/><ellipse cx="-24.5" cy="-73.5" rx="1.6" ry="2.6" fill="${INK}" stroke="none"/>
    <path d="M2 -38 C12 -50 18 -62 24 -72" stroke-width=".8"/><ellipse cx="24.5" cy="-73.5" rx="1.6" ry="2.6" fill="${INK}" stroke="none"/>
    <ellipse cx="0" cy="4" rx="5" ry="40" fill="${PAPER}" stroke-width="1"/>
    ${clipped('M-5 4 A5 40 0 1 0 5 4 A5 40 0 1 0 -5 4 Z', fur)}
    <path d="M-1.5 -28 L-1.5 36" stroke="${PAPER}" stroke-width="1.2"/>
    <circle cx="0" cy="-38" r="5.6" fill="${INK}" stroke="none"/><circle cx="-2" cy="-40" r="1.3" fill="${PAPER}" stroke="none"/>`, 'gv-butterfly');
}

/* ---------------- Seven-spot ladybird (top-down, head up) ---------------- */
function ladybird() {
  const leg = (s, y, i) => {
    const k = y - 4 + i * 6;
    return `<path d="M${s * 20} ${y} L${s * 33} ${k - 3} L${s * 39} ${k + 6} L${s * 43} ${k + 7}" stroke-width="1.15"/>`;
  };
  const legs = [-14, 0, 14].map((y, i) => `<g data-part="legL${i}">${leg(-1, y, i)}</g><g data-part="legR${i}">${leg(1, y, i)}</g>`).join('');
  const half = (s) => {
    const shape = `M0 -24 C${s * 30} -26 ${s * 40} -6 ${s * 38} 14 C${s * 36} 36 ${s * 18} 46 0 46 Z`;
    const spots = s > 0 ? [[15, -6, 6.4], [19, 18, 5.4], [8, 33, 4.4]] : [[-15, -6, 6.4], [-19, 18, 5.4], [-8, 33, 4.4]];
    // Domed elytra: concentric hatching around an upper highlight.
    const shade = domeHatch({ cx: s * 16, cy: -12, r0: 11, r1: 64, step: 2.1, w0: 0.2, w1: 1.15 });
    return `<path d="${shape}" fill="${PAPER}" stroke="none"/>${clipped(shape, shade)}
      ${spots.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" stroke="none"/><path d="M${x - r * 0.5} ${y - r * 0.45} q${r * 0.4} ${-r * 0.3} ${r * 0.8} 0" stroke="${PAPER}" stroke-width=".5"/>`).join('')}
      <path d="${shape}" stroke-width="1.15"/>`;
  };
  const hw = 'M0 0 C18 -8 52 -4 64 14 C62 30 40 34 4 12 Z';
  const hwVeins = '<path d="M2 1 L60 10 M4 4 L44 26 M20 -4 C30 4 36 14 40 28" stroke-width=".4"/>';
  return svg('-70 -70 140 140', `
    <g data-part="flyWings" opacity="0">
      <g data-part="hwR" transform="translate(3 -14)"><path d="${hw}" fill="${PAPER}" fill-opacity=".85" stroke-width=".7"/>${hwVeins}</g>
      <g transform="scale(-1 1)"><g data-part="hwL" transform="translate(3 -14)"><path d="${hw}" fill="${PAPER}" fill-opacity=".85" stroke-width=".7"/>${hwVeins}</g></g>
    </g>
    ${legs}
    <path d="M-4 -40 L-9 -51 L-12 -53 M4 -40 L9 -51 L12 -53" stroke-width=".9"/>
    <ellipse cx="0" cy="-38" rx="8.5" ry="5.6" fill="${INK}" stroke="none"/>
    <circle cx="-4.6" cy="-40" r="2" fill="${PAPER}" stroke="none"/><circle cx="4.6" cy="-40" r="2" fill="${PAPER}" stroke="none"/>
    <path d="M-18 -26 C-16 -36 16 -36 18 -26 C12 -22 -12 -22 -18 -26 Z" fill="${INK}" stroke-width="1"/>
    <path d="M-15.5 -27.5 C-14 -33 -8 -34 -5 -30 Z M15.5 -27.5 C14 -33 8 -34 5 -30 Z" fill="${PAPER}" stroke="none"/>
    <g data-part="elyL">${half(-1)}</g>
    <g data-part="elyR">${half(1)}</g>
    <path d="M-4.5 -24 L0 -15 L4.5 -24 Z" fill="${INK}" stroke="none"/>`, 'gv-ladybird');
}

/* ---------------- Woodlouse (top-down, head up) ---------------- */
function woodlouse() {
  const legs = [];
  for (let i = 0; i < 7; i++) {
    const y = -26 + i * 9;
    legs.push(`<g data-part="leg${i}"><path d="M-17 ${y} L-25 ${y + 1} L-28 ${y + 5}" stroke-width=".95"/><path d="M17 ${y} L25 ${y + 1} L28 ${y + 5}" stroke-width=".95"/></g>`);
  }
  const outline = 'M0 -40 C14 -40 21 -28 21 -6 C21 20 14 42 0 46 C-14 42 -21 20 -21 -6 C-21 -28 -14 -40 0 -40 Z';
  let plates = '';
  for (let i = 0; i < 9; i++) {
    const y = -29 + i * 8;
    plates += `<path d="M-24 ${y} Q0 ${y + 7} 24 ${y}" stroke-width=".9"/>`;
    // Shadow band under each plate edge, heavier toward the flanks.
    for (let k = 1; k <= 4; k++) plates += `<path d="M-24 ${y + k * 1.15} Q0 ${y + 7 + k * 1.15} 24 ${y + k * 1.15}" stroke-width="${f(0.75 - k * 0.14)}"/>`;
  }
  let flank = '';
  for (let y = -40; y < 48; y += 1.8) flank += `<path d="M-22 ${y} L-14 ${f(y + 2)} M22 ${y} L14 ${f(y + 2)}" stroke-width=".5"/>`;
  const R = rng(5);
  let grain = '';
  for (let i = 0; i < 60; i++) grain += `<circle cx="${f(-14 + R() * 28)}" cy="${f(-34 + R() * 74)}" r=".45" fill="${INK}" stroke="none"/>`;
  return svg('-40 -62 80 124', `
    ${legs.join('')}
    <path d="M-5 -38 L-12 -48 L-20 -52 L-25 -51 M5 -38 L12 -48 L20 -52 L25 -51" stroke-width=".95"/>
    <path d="M-5 44 L-8 54 M5 44 L8 54" stroke-width="1.2"/>
    <path d="${outline}" fill="${PAPER}" stroke="none"/>
    ${clipped(outline, plates + flank + grain)}
    <path d="M0 -36 L0 42" stroke="${PAPER}" stroke-width="3.2" opacity=".85"/>
    <path d="${outline}" stroke-width="1.1"/>
    <path d="M-13 -35 C-6 -39 6 -39 13 -35" stroke-width=".8"/>
    <circle cx="-9" cy="-34" r="1.4" fill="${INK}" stroke="none"/><circle cx="9" cy="-34" r="1.4" fill="${INK}" stroke="none"/>`, 'gv-woodlouse');
}

/* ---------------- Garden snail (side view, facing right) ---------------- */
function snail() {
  const cx = 66, cy = 46;
  const spiralAt = (t, dr = 0) => {
    const r = 3 + t * 2.15 + dr;
    return [cx + Math.cos(t + 2.4) * r, cy + Math.sin(t + 2.4) * r * 0.94];
  };
  const spiral = [], band = [], band2 = [];
  for (let t = 0; t <= Math.PI * 5.2; t += 0.1) spiral.push(spiralAt(t));
  for (let t = Math.PI * 2; t <= Math.PI * 5.1; t += 0.1) band.push(spiralAt(t, -4.5));
  for (let t = Math.PI * 2.6; t <= Math.PI * 5.1; t += 0.1) band2.push(spiralAt(t, -9));
  const shellShape = `M${cx - 38} ${cy} A38 36 0 1 0 ${cx + 38} ${cy} A38 36 0 1 0 ${cx - 38} ${cy} Z`;
  // Growth lines: fine strokes across the whorl, following the spiral outward.
  const R = rng(7);
  let growth = '';
  for (let t = Math.PI * 2.2; t < Math.PI * 5.15; t += 0.085 + R() * 0.04) {
    const [x1, y1] = spiralAt(t, -12.5);
    const [x2, y2] = spiralAt(t + 0.05, -0.5);
    growth += `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" stroke-width="${f(0.3 + R() * 0.3)}"/>`;
  }
  const shade = domeHatch({ cx: cx - 14, cy: cy - 16, r0: 30, r1: 74, step: 2.2, w0: 0.2, w1: 1.2 });
  const foot = 'M8 90 C30 80 70 82 110 78 C126 70 132 56 140 50 C150 46 158 52 156 62 C154 74 146 82 138 88 C110 94 40 96 8 90 Z';
  let wrinkles = '';
  for (let i = 0; i < 34; i++) {
    const x = 20 + R() * 130, y = 78 + R() * 12 - (x > 120 ? (x - 120) * 0.6 : 0);
    wrinkles += `<path d="M${f(x)} ${f(y)} q2 -1.2 4 0" stroke-width=".45"/>`;
  }
  return svg('0 0 170 100', `
    <g data-part="body">
      <path d="${foot}" fill="${PAPER}" stroke="none"/>
      ${clipped(foot, `<rect x="0" y="40" width="170" height="60" fill="url(#gv-dot)" stroke="none"/>${wrinkles}<path d="M10 92 C50 94 100 92 140 86" stroke-width="5" stroke="url(#gv-hd)"/>`)}
      <path d="${foot}" stroke-width="1.1"/>
      <path d="M14 91 C50 93 100 92 136 87" stroke-width=".7"/>
      <g data-part="tentacles">
        <g data-part="eyeStalkA"><path d="M145 51 C147 39 150 29 152 21" stroke-width="1.5"/><path d="M146.5 50 C148 40 150.5 30 152 22" stroke="${PAPER}" stroke-width=".4"/><circle cx="152.5" cy="19.5" r="2.4" fill="${INK}" stroke="none"/></g>
        <g data-part="eyeStalkB"><path d="M150 53 C156 43 160 35 164 29" stroke-width="1.35"/><circle cx="164.5" cy="28" r="2.1" fill="${INK}" stroke="none"/></g>
        <path d="M155 63 L163 67 M153 67 L160 73" stroke-width="1.05"/>
      </g>
    </g>
    <g data-part="shell">
      <path d="${shellShape}" fill="${PAPER}" stroke="none"/>
      ${clipped(shellShape, `${shade}${growth}<path d="M${pts(band)}" stroke-width="4" stroke="url(#gv-hd)"/><path d="M${pts(band2)}" stroke-width="2" stroke="url(#gv-hd)" opacity=".7"/>`)}
      <path d="M${pts(spiral)}" stroke-width="1.15"/>
      <path d="${shellShape}" stroke-width="1.25"/>
    </g>`, 'gv-snail');
}

/* ---------------- Hedgehog (side view, facing right) ---------------- */
function hedgehog() {
  const R = rng(42);
  // Spines are laid back along the dome of the back, pointing towards the tail,
  // dark shafts with pale tips like the real banded quills.
  const dome = { cx: 78, cy: 88, rx: 66, ry: 64 };
  const spines = [];
  const samples = [];
  while (samples.length < 300) {
    const x = dome.cx - dome.rx + R() * dome.rx * 2.05, y = dome.cy - dome.ry + R() * dome.ry;
    const nx = (x - dome.cx) / dome.rx, ny = (y - dome.cy) / dome.ry;
    const d = nx * nx + ny * ny;
    if (d < 1.02 && d > 0.12 && y < 84 && !(x > 122 && y > 58)) samples.push([x, y, d]);
  }
  samples.sort((a, b) => a[0] - b[0]); // draw front-to-back so rear spines overlap
  for (const [x, y] of samples) {
    const ang = Math.atan2((y - dome.cy) / dome.ry, (x - dome.cx) / dome.rx);
    // tangent pointing backwards along the dome, tilted outwards
    const tx = Math.sin(ang), ty = -Math.cos(ang);
    const lift = 0.3 + R() * 0.22;
    const dx = tx * (1 - lift) + Math.cos(ang) * lift, dy = ty * (1 - lift) + Math.sin(ang) * lift;
    const n = Math.hypot(dx, dy) || 1;
    const len = 11 + R() * 7;
    const ex = x + (dx / n) * len, ey = y + (dy / n) * len;
    const mx = x + (dx / n) * len * 0.72, my = y + (dy / n) * len * 0.72;
    spines.push(`<path d="M${f(x)} ${f(y)} L${f(mx)} ${f(my)}" stroke-width="${f(0.9 + R() * 0.6)}"/><path d="M${f(mx)} ${f(my)} L${f(ex)} ${f(ey)}" stroke-width=".55"/>`);
  }
  let fur = '';
  for (let i = 0; i < 70; i++) {
    const x = 116 + R() * 46, y = 62 + R() * 28;
    fur += `<path d="M${f(x)} ${f(y)} l${f(-1.4 - R())} ${f(1.6 + R() * 1.2)}" stroke-width=".4"/>`;
  }
  const head = 'M118 56 C134 58 158 68 172 78 C168 86 152 92 132 92 C120 84 114 68 118 56 Z';
  const foot = (x) => `<path d="M${x} 88 L${x - 1.5} 99 L${x + 5} 100.5 M${x + 1} 99.5 l3 -1" stroke-width="2"/>`;
  return svg('-6 0 186 108', `
    <g data-part="legsBack">${foot(36)}${foot(102)}</g>
    <g data-part="legsFront">${foot(52)}${foot(122)}</g>
    <path d="M16 90 C12 60 34 30 78 28 C112 28 132 44 136 64 L134 92 Z" fill="${PAPER}" stroke="none"/><path d="M16 90 C12 60 34 30 78 28 C112 28 132 44 136 64 L134 92 Z" fill="url(#gv-hx)" stroke="none"/>
    <path d="M16 90 C40 86 80 84 134 92 L130 96 C80 96 40 96 18 94 Z" fill="${PAPER}" stroke-width=".9"/>
    <g data-part="head">
      <path d="${head}" fill="${PAPER}" stroke="none"/>
      ${clipped(head, `${fur}<path d="M122 62 C126 76 132 86 140 92" stroke-width="7" stroke="url(#gv-hl)"/>`)}
      <path d="${head}" stroke-width="1.1"/>
      <path d="M140 86 C150 89 162 87 170 82" stroke-width=".5"/>
      <ellipse cx="172.5" cy="79" rx="3.4" ry="2.9" fill="${INK}" stroke="none"/><circle cx="171.6" cy="77.8" r=".7" fill="${PAPER}" stroke="none"/>
      <circle cx="148" cy="69" r="2.5" fill="${INK}" stroke="none"/><circle cx="147.3" cy="68.2" r=".75" fill="${PAPER}" stroke="none"/>
      <path d="M130 59 C131 52 138 51 139 58" fill="${PAPER}" stroke-width=".9"/><path d="M132 58 C133 55 136 55 137 58" stroke-width=".5"/>
      <path d="M168 81 l9 2.5 M168 79 l10 -1.5 M167 80.5 l9 5" stroke-width=".3"/>
    </g>
    <g>${spines.join('')}</g>`, 'gv-hedgehog');
}

/* ---------------- Robin (side view, facing right) ---------------- */
function robin() {
  const R = rng(3);
  const body = 'M28 64 C28 46 44 36 64 34 C70 22 84 16 98 18 C110 20 117 30 116 40 C115 50 109 56 104 60 C107 76 98 89 78 92 C54 94 30 84 28 64 Z';
  const breast = 'M106 32 C114 40 112 54 103 62 C106 76 96 88 78 91 C66 78 66 58 80 46 C88 38 98 34 106 32 Z';
  const back = 'M28 64 C28 46 44 36 64 34 C70 22 84 16 98 18 C108 19 114 26 115 33 C100 26 86 34 80 46 C62 50 42 56 28 64 Z';
  // Contour hatch for the red breast: arcs bulging forward, densest at the edge.
  const breastHatch = domeHatch({ cx: 52, cy: 58, r0: 26, r1: 66, step: 1.6, w0: 0.25, w1: 1.0, sx: 1, sy: 1.25 });
  let backHatch = '';
  backHatch += '<rect x="0" y="0" width="140" height="120" fill="url(#gv-hl)"/>';
  for (let i = 0; i < 40; i++) {
    const x = 40 + R() * 70, y = 22 + R() * 30;
    backHatch += `<path d="M${f(x)} ${f(y)} q-2 1.4 -4 1" stroke-width=".45"/>`;
  }
  let belly = '';
  for (let i = 0; i < 30; i++) {
    const x = 46 + R() * 34, y = 78 + R() * 12;
    belly += `<path d="M${f(x)} ${f(y)} l1.4 1.6" stroke-width=".4"/>`;
  }
  const folded = 'M32 54 C46 44 70 46 80 58 C79 72 60 82 30 77 C25 70 26 60 32 54 Z';
  let wingLines = '';
  for (let i = 0; i < 6; i++) wingLines += `<path d="M${38 + i * 7.5} ${55 - i * 0.6} C${34 + i * 7} 62 ${31 + i * 7} 70 ${30 + i * 6.4} ${77 - i * 0.3}" stroke-width=".7"/>`;
  for (let i = 0; i < 4; i++) wingLines += `<path d="M${46 + i * 8} ${50 + i} q4 2 7 -1" stroke-width=".5"/>`;
  const raised = 'M56 52 C42 30 26 12 8 4 C14 14 18 22 22 26 C14 24 10 26 6 28 C20 36 34 46 46 58 Z';
  let raisedLines = '';
  for (let i = 0; i < 6; i++) raisedLines += `<path d="M${52 - i * 2} ${52 - i * 1.5} L${10 + i * 3} ${6 + i * 4.4}" stroke-width=".55"/>`;
  return svg('0 0 140 120', `
    <g data-part="legs">
      <path d="M62 86 L58 104 M58 104 L49 106 M58 104 L65 107 M58 104 L56 108" stroke-width="1.15"/>
      <path d="M72 86 L72 104 M72 104 L63 106 M72 104 L80 106 M72 104 L71 108" stroke-width="1.15"/>
    </g>
    <path d="M32 60 L6 45 L2 52 L4 58 L30 72 Z" fill="${PAPER}" stroke="none"/>
    ${clipped('M32 60 L6 45 L2 52 L4 58 L30 72 Z', '<rect x="0" y="40" width="40" height="40" fill="url(#gv-hx)"/>')}
    <path d="M32 60 L6 45 L2 52 L4 58 L30 72 Z" stroke-width="1"/><path d="M6 49 L30 64 M5 55 L30 68" stroke-width=".5" stroke="${PAPER}"/>
    <path d="${body}" fill="${PAPER}" stroke="none"/>
    ${clipped(back, backHatch)}
    ${clipped(body, belly)}
    <path d="${breast}" fill="${PAPER}" stroke="none"/>
    ${clipped(breast, breastHatch)}
    <path d="M106 32 C98 34 88 38 80 46 C68 58 68 78 78 91" stroke-width=".9"/>
    <path d="M104 29 C95 31 85 36 77 44 C65 56 65 76 74 90" stroke-width=".4"/>
    <path d="${body}" stroke-width="1.2"/>
    <path d="M114 35.5 L128 38.5 L114 42 Z" fill="${INK}" stroke-width=".8"/><path d="M114 38.6 L126 38.6" stroke="${PAPER}" stroke-width=".4"/>
    <circle cx="103" cy="31" r="3.4" fill="${INK}" stroke="none"/><circle cx="102" cy="30" r="1" fill="${PAPER}" stroke="none"/>
    <g data-part="wingFolded"><path d="${folded}" fill="${PAPER}" stroke="none"/>${clipped(folded, `<rect x="20" y="40" width="70" height="45" fill="url(#gv-h)" opacity=".7"/>`)}${wingLines}<path d="${folded}" stroke-width="1"/></g>
    <g data-part="wingRaised" opacity="0"><path d="${raised}" fill="${PAPER}" stroke="none"/>${clipped(raised, `<rect x="0" y="0" width="60" height="60" fill="url(#gv-h)" opacity=".6"/>`)}${raisedLines}<path d="${raised}" stroke-width="1"/></g>`, 'gv-robin');
}

export const ART = { butterfly, ladybird, woodlouse, snail, hedgehog, robin };

export function beeMarkup() {
  return `<div class="gv-art gv-bee"><img src="/visitors/bee-wing-l.webp" data-part="wingL" alt="" draggable="false"><img src="/visitors/bee-wing-r.webp" data-part="wingR" alt="" draggable="false"><img src="/visitors/bee-body.webp" alt="" draggable="false"></div>`;
}
