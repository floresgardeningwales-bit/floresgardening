// Garden visitors: occasional engraved creatures that wander onto the page and
// scurry, flutter or fly off. Purely decorative: one fixed, click-through layer,
// hidden from assistive tech, switched off for reduced-motion users.

import { ART, DEFS, beeMarkup } from './art.js';

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DEG = 180 / Math.PI;

// Smallest signed difference between two angles (radians).
const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

/* ------------------------------------------------------------------ */
/* Base creature                                                       */
/* ------------------------------------------------------------------ */
class Creature {
  constructor(world, { markup, w, h, cls }) {
    this.world = world;
    this.w = w * world.scale;
    this.h = h * world.scale;
    this.x = 0; this.y = 0; this.rot = 0; this.flip = 1; this.opacity = 1; this.lift = 1;
    this.t = 0; this.stateT = 0; this.state = 'enter'; this.dead = false;
    const el = document.createElement('div');
    el.className = `gv-c ${cls}`;
    el.style.width = `${this.w}px`;
    el.style.height = `${this.h}px`;
    el.innerHTML = markup;
    world.layer.appendChild(el);
    this.el = el;
    this.parts = {};
    el.querySelectorAll('[data-part]').forEach((n) => { this.parts[n.dataset.part] = n; });
  }
  setState(s) { this.state = s; this.stateT = 0; }
  // Distance from the visitor's pointer, if it moved recently.
  threatened(radius = 120) {
    const p = this.world.pointer;
    if (!p || performance.now() - p.t > 1500) return null;
    const d = Math.hypot(p.x - this.x, p.y - this.y);
    return d < radius * this.world.scale ? p : null;
  }
  offscreen(margin = 40) {
    const { W, H } = this.world;
    const m = Math.max(this.w, this.h) / 2 + margin;
    return this.x < -m || this.x > W + m || this.y < -m || this.y > H + m;
  }
  render() {
    const s = this.lift;
    this.el.style.transform = `translate3d(${(this.x - this.w / 2).toFixed(1)}px, ${(this.y - this.h / 2).toFixed(1)}px, 0) rotate(${(this.rot * DEG).toFixed(2)}deg) scale(${(this.flip * s).toFixed(3)}, ${s.toFixed(3)})`;
    this.el.style.opacity = this.opacity.toFixed(3);
  }
  remove() { this.dead = true; this.el.remove(); this.trail?.remove(); }
  step(dt) {
    this.t += dt; this.stateT += dt;
    this.update(dt);
    if (this.t > 90 && !this.dead) this.remove(); // safety net: never linger
    if (!this.dead) this.render();
  }
}

/* ------------------------------------------------------------------ */
/* Fliers                                                              */
/* ------------------------------------------------------------------ */
// Steering flight toward a list of waypoints, with hovering pauses.
class Flier extends Creature {
  constructor(world, opts) {
    super(world, opts);
    const { W, H } = world;
    const fromLeft = Math.random() < 0.5;
    this.x = fromLeft ? -this.w : W + this.w;
    this.y = rand(H * 0.15, H * 0.7);
    this.vx = fromLeft ? opts.speed : -opts.speed; this.vy = 0;
    this.speed = opts.speed;
    this.heading = Math.atan2(this.vy, this.vx);
    const n = Math.round(rand(2, 4));
    this.route = [];
    for (let i = 0; i < n; i++) this.route.push({ x: rand(W * 0.12, W * 0.88), y: rand(H * 0.12, H * 0.78), hover: rand(0.6, 2.2) });
    this.exit = { x: fromLeft ? W + 200 : -200, y: rand(-100, H * 0.6) };
    if (Math.random() < 0.5) this.exit = { x: rand(0, W), y: -160 };
  }
  fleeFrom(p) {
    const a = Math.atan2(this.y - p.y, this.x - p.x);
    this.route = [];
    this.exit = { x: this.x + Math.cos(a) * 3000, y: this.y + Math.sin(a) * 3000 - 600 };
    this.speed *= 2.6;
    this.setState('flee');
  }
  fly(dt, wobble) {
    const target = this.route[0] || this.exit;
    const dx = target.x - this.x, dy = target.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (this.route.length && dist < 18) {
      this.hoverLeft = this.route[0].hover;
      this.route.shift();
      this.setState('hover');
      return;
    }
    const want = Math.atan2(dy, dx);
    this.heading += clamp(angDiff(this.heading, want), -4 * dt, 4 * dt);
    const sp = this.speed * (this.route.length ? clamp(dist / 120, 0.35, 1) : 1);
    const perp = this.heading + Math.PI / 2;
    const wob = Math.sin(this.t * wobble.freq) * wobble.amp;
    this.x += (Math.cos(this.heading) * sp + Math.cos(perp) * wob) * dt;
    this.y += (Math.sin(this.heading) * sp + Math.sin(perp) * wob) * dt;
  }
}

class Bee extends Flier {
  constructor(world) {
    super(world, { markup: beeMarkup(), w: 62, h: 62, cls: 'gv-is-bee', speed: 150 });
    this.face = -70.7 / DEG; // direction the engraving's head points
    this.rot = this.heading - this.face;
  }
  update(dt) {
    const p = this.state !== 'flee' && this.threatened(130);
    if (p) this.fleeFrom(p);
    if (this.state === 'hover') {
      // Buzz on the spot in small loops, turning to "inspect" the flower.
      this.x += Math.cos(this.t * 7) * 22 * dt;
      this.y += Math.sin(this.t * 9.5) * 18 * dt;
      this.heading += Math.sin(this.t * 2.3) * 1.2 * dt;
      if (this.stateT > this.hoverLeft) this.setState('fly');
    } else {
      this.fly(dt, { freq: 11, amp: 55 });
    }
    this.rot += angDiff(this.rot, this.heading - this.face) * Math.min(1, dt * 8);
    const flap = Math.sin(this.t * 95);
    this.parts.wingL.style.transform = `rotate(${(flap * 16).toFixed(1)}deg) scale(${(0.82 + flap * 0.18).toFixed(2)})`;
    this.parts.wingR.style.transform = `rotate(${(-flap * 16).toFixed(1)}deg) scale(${(0.82 + flap * 0.18).toFixed(2)})`;
    this.lift = 1 + Math.sin(this.t * 3) * 0.03;
    if (!this.route.length && this.offscreen(60)) this.remove();
  }
}

class Butterfly extends Flier {
  constructor(world) {
    super(world, { markup: ART.butterfly(), w: 74, h: 60, cls: 'gv-is-butterfly', speed: 85 });
    this.flapPhase = 0;
    this.rot = this.heading + Math.PI / 2;
  }
  update(dt) {
    const p = this.state !== 'flee' && this.threatened(130);
    if (p) this.fleeFrom(p);
    let open;
    if (this.state === 'hover') {
      // Settled: wings slowly open and close, the way a basking butterfly does.
      this.flapPhase += dt * 2.2;
      open = 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(this.flapPhase));
      if (this.stateT > this.hoverLeft * 1.8) this.setState('fly');
    } else {
      // Irregular flutter: bursts of flapping with short glides.
      const burst = Math.sin(this.t * 1.7) > -0.55;
      this.flapPhase += dt * (burst ? 26 : 5);
      open = burst ? 0.18 + 0.82 * Math.abs(Math.cos(this.flapPhase)) : 0.85 + 0.15 * Math.cos(this.flapPhase);
      this.fly(dt, { freq: 4.2, amp: 70 });
      this.y += Math.sin(this.t * 6.5) * 26 * dt; // bouncy flight
    }
    this.rot += angDiff(this.rot, this.heading + Math.PI / 2) * Math.min(1, dt * 3);
    this.parts.wingR.setAttribute('transform', `scale(${open.toFixed(3)} 1)`);
    this.parts.wingL.setAttribute('transform', `scale(${(-open).toFixed(3)} 1)`);
    if (!this.route.length && this.offscreen(60)) this.remove();
  }
}

/* ------------------------------------------------------------------ */
/* Ground creatures (walk along the bottom edge of the window)         */
/* ------------------------------------------------------------------ */
class Walker extends Creature {
  constructor(world, opts) {
    super(world, opts);
    const { W, H } = world;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    this.x = this.dir > 0 ? -this.w / 2 - 10 : W + this.w / 2 + 10;
    this.groundY = H - this.h / 2 + (opts.sink || 0) * this.h;
    this.y = this.groundY;
    this.flip = this.dir;
    this.pauseAt = rand(W * 0.25, W * 0.7);
  }
  get passedPause() { return this.dir > 0 ? this.x > this.pauseAt : this.x < this.pauseAt; }
  fleeDir(p) { return p.x > this.x ? -1 : 1; }
}

class Hedgehog extends Walker {
  constructor(world) { super(world, { markup: ART.hedgehog(), w: 112, h: 66, cls: 'gv-is-hedgehog', sink: 0.04 }); this.speed = 42; }
  update(dt) {
    const p = this.state !== 'flee' && this.threatened(150);
    if (p) { this.dir = this.fleeDir(p); this.flip = this.dir; this.speed = 190; this.setState('flee'); }
    let moving = true;
    if (this.state === 'enter' && this.passedPause) this.setState('sniff');
    if (this.state === 'sniff') {
      moving = false;
      this.parts.head.setAttribute('transform', `rotate(${(Math.sin(this.stateT * 9) * 3 - 2).toFixed(2)} 130 80)`);
      if (this.stateT > rand(1.6, 2.6)) { this.parts.head.removeAttribute('transform'); this.setState('leave'); }
    }
    if (moving) {
      const cad = this.state === 'flee' ? 30 : 11;
      this.x += this.dir * this.speed * dt;
      this.y = this.groundY - Math.abs(Math.sin(this.t * cad)) * (this.state === 'flee' ? 3 : 1.6);
      const legs = Math.sin(this.t * cad) * 4;
      this.parts.legsFront.setAttribute('transform', `translate(${legs.toFixed(2)} 0)`);
      this.parts.legsBack.setAttribute('transform', `translate(${(-legs).toFixed(2)} 0)`);
      this.rot = Math.sin(this.t * cad) * 0.012;
    }
    if (this.state !== 'enter' && this.offscreen(20)) this.remove();
  }
}

class Woodlouse extends Walker {
  constructor(world) {
    super(world, { markup: ART.woodlouse(), w: 26, h: 40, cls: 'gv-is-woodlouse', sink: -0.6 });
    this.heading = this.dir > 0 ? 0 : Math.PI;
    this.flip = 1;
    this.speed = 70;
    this.groundY = world.H - rand(14, 40) * world.scale;
    this.y = this.groundY;
  }
  update(dt) {
    const p = this.state !== 'flee' && this.threatened(110);
    if (p) { this.dir = this.fleeDir(p); this.speed = 230; this.setState('flee'); }
    let moving = true;
    if (this.state === 'enter' && this.passedPause) this.setState('pause');
    if (this.state === 'pause') { moving = false; if (this.stateT > rand(0.5, 1.4)) this.setState('leave'); }
    if (moving) {
      const want = (this.dir > 0 ? 0 : Math.PI) + Math.sin(this.t * 2.1) * 0.35;
      this.heading += angDiff(this.heading, want) * Math.min(1, dt * 6);
      this.x += Math.cos(this.heading) * this.speed * dt;
      this.y = clamp(this.y + Math.sin(this.heading) * this.speed * dt, this.world.H - 60 * this.world.scale, this.world.H - 12);
      for (let i = 0; i < 7; i++) {
        const a = Math.sin(this.t * (this.state === 'flee' ? 60 : 32) - i * 0.9) * 14;
        this.parts[`leg${i}`].setAttribute('transform', `rotate(${a.toFixed(1)} 0 ${-26 + i * 9})`);
      }
    }
    this.rot = this.heading + Math.PI / 2;
    if (this.state !== 'enter' && this.offscreen(20)) this.remove();
  }
}

class Snail extends Walker {
  constructor(world) {
    super(world, { markup: ART.snail(), w: 92, h: 54, cls: 'gv-is-snail', sink: 0.03 });
    // Snails are slow, so this one only creeps in from the edge for a look around.
    this.x = this.dir > 0 ? -this.w * 0.35 : world.W + this.w * 0.35;
    this.startX = this.x;
    this.travel = rand(110, 190) * world.scale;
    this.trail = document.createElement('div');
    this.trail.className = 'gv-trail';
    world.layer.appendChild(this.trail);
  }
  update(dt) {
    const p = this.state !== 'hide' && this.state !== 'fade' && this.threatened(120);
    if (p) this.setState('hide');
    const pulse = 0.5 + 0.5 * Math.sin(this.t * 2.4);
    if (this.state === 'enter') {
      this.x += this.dir * (9 + pulse * 7) * dt * this.world.scale;
      if (Math.abs(this.x - this.startX) > this.travel) this.setState('look');
    }
    if (this.state === 'look' && this.stateT > 4) this.setState('hide');
    // Tentacles sway; on hiding they shrink back and the body slides into the shell.
    const hide = this.state === 'hide' || this.state === 'fade' ? clamp((this.state === 'fade' ? 1 : this.stateT / 0.7), 0, 1) : 0;
    const sway = Math.sin(this.t * 1.8) * 4;
    const ext = 1 - hide;
    this.parts.eyeStalkA.setAttribute('transform', `rotate(${(sway).toFixed(2)} 146 51) translate(146 51) scale(${(0.2 + 0.8 * ext).toFixed(3)}) translate(-146 -51)`);
    this.parts.eyeStalkB.setAttribute('transform', `rotate(${(-sway * 0.7).toFixed(2)} 150 53) translate(150 53) scale(${(0.2 + 0.8 * ext).toFixed(3)}) translate(-150 -53)`);
    this.parts.body.setAttribute('transform', `translate(66 88) scale(${(1 - hide * 0.55 + (this.state === 'enter' ? pulse * 0.025 : 0)).toFixed(3)} ${(1 - hide * 0.3).toFixed(3)}) translate(-66 -88)`);
    if (this.state === 'hide' && this.stateT > 2.2) this.setState('fade');
    if (this.state === 'fade') { this.opacity = Math.max(0, 1 - this.stateT / 1.6); if (this.opacity <= 0) this.remove(); }
    // Slime trail behind the snail, fading with it.
    if (!this.dead) {
      const a = Math.min(this.startX, this.x), b = Math.max(this.startX, this.x);
      this.trail.style.transform = `translate3d(${a.toFixed(1)}px, ${(this.world.H - 3).toFixed(1)}px, 0)`;
      this.trail.style.width = `${(b - a).toFixed(1)}px`;
      this.trail.style.opacity = (0.55 * this.opacity).toFixed(3);
      this.trail.style.setProperty('--dir', this.dir > 0 ? '90deg' : '270deg');
    }
  }
}

class Ladybird extends Walker {
  constructor(world) {
    super(world, { markup: ART.ladybird(), w: 46, h: 46, cls: 'gv-is-ladybird' });
    const { W, H } = world;
    this.flip = 1;
    this.x = rand(W * 0.1, W * 0.9);
    this.y = H + this.h;
    this.heading = -Math.PI / 2 + rand(-0.5, 0.5);
    this.speed = 34;
    this.wanderT = 0;
    this.climb = rand(50, 120) * world.scale;
  }
  takeOff(p) {
    let a = p ? Math.atan2(this.y - p.y, this.x - p.x) : -Math.PI / 2 + rand(-0.8, 0.8);
    if (Math.sin(a) > -0.4) a = -Math.PI / 2 + (Math.cos(a) >= 0 ? 0.7 : -0.7); // always away and upwards
    this.flyDir = a;
    this.setState('open');
  }
  update(dt) {
    const p = (this.state === 'walk' || this.state === 'enter' || this.state === 'pause') && this.threatened(110);
    if (p) this.takeOff(p);
    const { H } = this.world;
    if (this.state === 'enter' || this.state === 'walk') {
      this.wanderT += dt;
      const want = this.state === 'enter' ? -Math.PI / 2 : this.heading + Math.sin(this.t * 1.3) * 0.9;
      this.heading += angDiff(this.heading, want) * Math.min(1, dt * 2);
      this.x += Math.cos(this.heading) * this.speed * dt;
      this.y += Math.sin(this.heading) * this.speed * dt;
      this.y = Math.max(this.y, H - this.climb - 40);
      if (this.state === 'enter' && this.y < H - this.climb) this.setState('walk');
      if (this.state === 'walk' && this.stateT > rand(2.5, 4)) this.setState('pause');
      for (let i = 0; i < 3; i++) {
        const a = Math.sin(this.t * 14 + i * 2.1) * 12;
        this.parts[`legL${i}`].setAttribute('transform', `rotate(${a.toFixed(1)} -20 ${-14 + i * 14})`);
        this.parts[`legR${i}`].setAttribute('transform', `rotate(${(-a).toFixed(1)} 20 ${-14 + i * 14})`);
      }
    }
    if (this.state === 'pause' && this.stateT > 1.2) this.takeOff();
    if (this.state === 'open') {
      // Wing cases lift, the hind wings unfold.
      const k = clamp(this.stateT / 0.45, 0, 1);
      this.parts.elyL.setAttribute('transform', `rotate(${(-38 * k).toFixed(1)} -2 -22) translate(${(-6 * k).toFixed(1)} 0)`);
      this.parts.elyR.setAttribute('transform', `rotate(${(38 * k).toFixed(1)} 2 -22) translate(${(6 * k).toFixed(1)} 0)`);
      this.parts.flyWings.setAttribute('opacity', k.toFixed(2));
      if (k >= 1) this.setState('fly');
    }
    if (this.state === 'open' || this.state === 'fly') {
      const flap = Math.sin(this.t * 80);
      const s = (0.45 + 0.55 * Math.abs(flap)).toFixed(3);
      this.parts.hwR.setAttribute('transform', `translate(3 -14) scale(${s} 1)`);
      this.parts.hwL.setAttribute('transform', `translate(3 -14) scale(${s} 1)`);
    }
    if (this.state === 'fly') {
      const sp = Math.min(260, 40 + this.stateT * 320);
      this.x += Math.cos(this.flyDir) * sp * dt + Math.sin(this.t * 13) * 30 * dt;
      this.y += Math.sin(this.flyDir) * sp * dt;
      this.lift = 1 + Math.min(0.35, this.stateT * 0.5); // rises toward the viewer
      if (this.offscreen(40)) this.remove();
    }
    this.rot = (this.state === 'fly' || this.state === 'open' ? (this.flyDir ?? this.heading) : this.heading) + Math.PI / 2;
  }
}

class Robin extends Walker {
  constructor(world) {
    super(world, { markup: ART.robin(), w: 64, h: 55, cls: 'gv-is-robin', sink: 0.02 });
    this.hops = 0;
    this.hopsBeforePause = Math.round(rand(3, 6));
    this.pauses = 0;
    this.maxPauses = Math.round(rand(1, 3));
  }
  takeOff(p) {
    if (p) { this.dir = this.fleeDir(p); this.flip = this.dir; }
    this.parts.wingFolded.setAttribute('opacity', '0');
    this.parts.wingRaised.setAttribute('opacity', '1');
    this.parts.legs.setAttribute('opacity', '0');
    this.vx = this.dir * rand(190, 240); this.vy = -rand(170, 220);
    this.setState('fly');
  }
  update(dt) {
    const p = this.state !== 'fly' && this.threatened(150);
    if (p) this.takeOff(p);
    const hopDur = 0.26;
    if (this.state === 'enter' || this.state === 'hop') {
      const k = this.stateT / hopDur;
      this.x += this.dir * 120 * dt;
      this.y = this.groundY - Math.sin(Math.min(k, 1) * Math.PI) * 13 * this.world.scale;
      this.rot = -this.dir * 0.08 * Math.sin(Math.min(k, 1) * Math.PI);
      if (k >= 1) {
        this.hops++;
        this.y = this.groundY; this.rot = 0;
        const inside = this.x > this.w && this.x < this.world.W - this.w;
        if (inside && (this.pauses > 0 || this.passedPause) && this.hops >= this.hopsBeforePause) { this.hops = 0; this.setState('perch'); }
        else this.setState('hop');
        if (this.pauses > 0 && this.offscreen(10)) this.remove();
      }
    }
    if (this.state === 'perch') {
      // Bob, tilt the head, flick the tail.
      const tilt = Math.sin(this.stateT * 5) > 0.6 ? -0.12 : 0.04 * Math.sin(this.stateT * 3);
      this.rot = this.dir * tilt;
      this.y = this.groundY + (Math.sin(this.stateT * 14) > 0.92 ? 1.5 : 0);
      if (this.stateT > rand(1.4, 2.4)) {
        this.pauses++;
        if (this.pauses >= this.maxPauses) this.takeOff();
        else {
          if (Math.random() < 0.35) { this.dir *= -1; this.flip = this.dir; }
          this.hopsBeforePause = Math.round(rand(2, 5));
          this.setState('hop');
        }
      }
    }
    if (this.state === 'fly') {
      const flap = Math.sin(this.t * 34);
      this.parts.wingRaised.setAttribute('transform', `translate(52 54) scale(1 ${Math.max(-0.55, 0.2 + 0.8 * flap).toFixed(3)}) translate(-52 -54)`);
      this.x += this.vx * dt; this.y += this.vy * dt;
      this.vy += 60 * dt;
      this.rot = this.dir * -0.35;
      if (this.offscreen(40)) this.remove();
    }
  }
}

const SPECIES = {
  bee: { make: (w) => new Bee(w), weight: 3 },
  butterfly: { make: (w) => new Butterfly(w), weight: 3 },
  ladybird: { make: (w) => new Ladybird(w), weight: 2 },
  robin: { make: (w) => new Robin(w), weight: 2 },
  hedgehog: { make: (w) => new Hedgehog(w), weight: 1.5 },
  snail: { make: (w) => new Snail(w), weight: 1.5 },
  woodlouse: { make: (w) => new Woodlouse(w), weight: 1.5 },
};

/* ------------------------------------------------------------------ */
/* World                                                               */
/* ------------------------------------------------------------------ */
export function startGardenVisitors(options = {}) {
  const opts = {
    firstDelay: [7000, 14000], // ms before the first visitor
    gap: [22000, 48000],       // ms between visitors
    maxAtOnce: 1,
    ...options,
  };
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const layer = document.createElement('div');
  layer.className = 'gv-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = DEFS;
  document.body.appendChild(layer);

  const world = { layer, creatures: [], pointer: null, W: 0, H: 0, scale: 1 };
  const measure = () => {
    world.W = window.innerWidth; world.H = window.innerHeight;
    world.scale = world.W < 650 ? 0.8 : 1;
  };
  measure();

  const onPointer = (e) => { world.pointer = { x: e.clientX, y: e.clientY, t: performance.now() }; };
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerdown', onPointer, { passive: true });
  window.addEventListener('resize', measure, { passive: true });

  let last = null;
  const choose = () => {
    const names = Object.keys(SPECIES).filter((n) => n !== last);
    let total = names.reduce((s, n) => s + SPECIES[n].weight, 0);
    let r = Math.random() * total;
    for (const n of names) { r -= SPECIES[n].weight; if (r <= 0) return n; }
    return names[0];
  };
  const spawn = (name = choose()) => {
    if (!SPECIES[name]) return;
    last = name;
    world.creatures.push(SPECIES[name].make(world));
    ensureLoop();
  };

  // Timer that only counts down while the tab is visible.
  let timer = null;
  const schedule = (range) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (document.hidden) return schedule([2000, 4000]);
      if (world.creatures.length < opts.maxAtOnce) spawn();
      schedule(opts.gap);
    }, rand(range[0], range[1]));
  };

  let raf = null, prev = 0;
  const frame = (now) => {
    const dt = Math.min(0.05, (now - prev) / 1000 || 0.016);
    prev = now;
    for (const c of world.creatures) c.step(dt);
    world.creatures = world.creatures.filter((c) => !c.dead);
    raf = world.creatures.length ? requestAnimationFrame(frame) : null;
  };
  function ensureLoop() {
    if (raf) return;
    prev = performance.now();
    raf = requestAnimationFrame(frame);
  }

  // ?visitors=hedgehog (or =all) shows one straight away: handy for previewing.
  const preview = new URLSearchParams(location.search).get('visitors');
  if (preview) {
    const names = Object.keys(SPECIES);
    let i = 0;
    const next = () => spawn(preview === 'all' ? names[i++ % names.length] : preview);
    setTimeout(next, 600);
    if (preview === 'all') timer = setInterval(() => { if (!world.creatures.length) next(); }, 1000);
  } else {
    schedule(opts.firstDelay);
  }

  const api = { spawn, species: Object.keys(SPECIES) };
  window.gardenVisitors = api;

  return function stop() {
    clearTimeout(timer); clearInterval(timer);
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('pointerdown', onPointer);
    window.removeEventListener('resize', measure);
    world.creatures.forEach((c) => c.remove());
    layer.remove();
    if (window.gardenVisitors === api) delete window.gardenVisitors;
  };
}
