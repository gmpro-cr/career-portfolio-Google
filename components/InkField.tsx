import React, { useEffect, useRef } from 'react';

/* ── Homepage ink field ────────────────────────────────────────────
   Hair-thin ink lines drifting like ink spreading in still water, bending
   away from the cursor. Particles follow a slowly changing flow field made
   of layered sines; each frame fades the old strokes towards transparent,
   so every particle leaves a fine trail.

   A fixed, full-viewport layer behind the whole homepage. It is sparse and
   light on purpose, because body text sits on top of it. Decorative
   (aria-hidden, no pointer events). Pauses in hidden tabs. A first frame is
   painted straight away; under reduced motion it is the only frame.
   Chosen by the owner on 2026-09-24; see DESIGN.md §4. */

const AREA_PER_LINE = 3200;  // px² of screen per particle (higher = sparser)
const TRAIL_FADE = 0.025;    // how much of the old ink disappears each frame
const INK = 'rgba(26,20,16,0.28)';
const REPEL_R2 = 14000;      // cursor influence radius, squared (about 118px)
const SPEED = 0.7;

type P = { x: number; y: number; life: number };

export default function InkField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, t = 0;
    let mx = -9999, my = -9999;
    let particles: P[] = [];

    const spawn = (p: P) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.life = 200 + Math.random() * 400;
    };

    const step = () => {
      // Fade what is already drawn, then add this frame's short strokes.
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      const tt = t * 0.00006;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (const q of particles) {
        const a = Math.sin(q.x * 0.004 + tt * 3) + Math.cos(q.y * 0.005 - tt * 2) + Math.sin((q.x + q.y) * 0.002 + tt);
        let vx = Math.cos(a * 1.3) * SPEED;
        let vy = Math.sin(a * 1.3) * SPEED;
        const dx = q.x - mx, dy = q.y - my, d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R2) {
          const f = (1 - d2 / REPEL_R2) * 2.2;
          const d = Math.sqrt(d2) || 1;
          vx += (dx / d) * f; vy += (dy / d) * f;
        }
        ctx.moveTo(q.x, q.y);
        q.x += vx; q.y += vy; q.life -= 1;
        ctx.lineTo(q.x, q.y);
        if (q.life < 0 || q.x < -5 || q.y < -5 || q.x > w + 5 || q.y > h + 5) spawn(q);
      }
      ctx.stroke();
    };

    const resize = () => {
      // Phones fire resize when the address bar slides in or out; only a
      // width change (rotation, window resize) is worth restarting the ink for.
      if (w && window.innerWidth === w) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = Math.max(window.innerHeight, window.screen?.height || 0);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = Math.round((w * h) / AREA_PER_LINE);
      particles = Array.from({ length: n }, () => { const p = { x: 0, y: 0, life: 0 }; spawn(p); p.life = Math.random() * 600; return p; });
      // Pre-run the flow so the first painted frame already shows ink, not an empty screen.
      for (let i = 0; i < 180; i++) { t += 16; step(); }
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    let raf = 0;
    if (!reduced) {
      let last = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(50, now - last);
        last = now;
        if (document.hidden) return;
        t += dt;
        step();
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0" />;
}
