import React, { useEffect, useRef } from 'react';

/* ── Hero ink field ────────────────────────────────────────────────
   Hair-thin ink lines drifting like ink spreading in still water, bending
   away from the cursor. Particles follow a slowly changing flow field made
   of layered sines; each frame fades the old strokes towards transparent,
   so every particle leaves a fine trail.

   The field starts just right of the hero text (measured from the DOM, so
   nothing you read sits on top of it), and fades out under the navbar and
   towards the bottom edge. Decorative (aria-hidden). Hidden when the text
   leaves too little free space (phones). Pauses off screen and in hidden
   tabs. A first frame is painted straight away; under reduced motion it is
   the only frame. Chosen by the owner on 2026-09-24; see DESIGN.md §4. */

const MIN_FREE = 0.18;       // hide unless this share of the width is free of text
const FADE_IN = 0.16;        // share of the width over which the field fades in from the text edge
const AREA_PER_LINE = 1400;  // px² of free area per particle
const TRAIL_FADE = 0.025;    // how much of the old ink disappears each frame
const REPEL_R2 = 14000;      // cursor influence radius, squared (about 118px)
const SPEED = 0.7;

type P = { x: number; y: number; life: number };

export default function InkField({ clearOf }: { clearOf: React.RefObject<HTMLElement | null>[] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, x0 = 0;             // x0: left edge of the free area, in px
    let mx = -9999, my = -9999, t = 0;
    let particles: P[] = [];
    let visible = true;
    let active = false;                    // false when there is too little free space

    const spawn = (p: P) => {
      p.x = x0 + Math.random() * (w - x0);
      p.y = Math.random() * h;
      p.life = 200 + Math.random() * 400;
    };

    /* Erase the masked zones: left of the free area (with a soft edge), under
       the navbar, and towards the bottom. destination-out keeps the canvas
       transparent, so the page's paper and grain show through as normal. */
    const mask = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const fadeW = w * FADE_IN;
      const gx = ctx.createLinearGradient(x0, 0, x0 + fadeW, 0);
      gx.addColorStop(0, 'rgba(0,0,0,1)');
      gx.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, x0, h);
      ctx.fillStyle = gx;
      ctx.fillRect(x0, 0, fadeW, h);
      const gTop = ctx.createLinearGradient(0, 40, 0, 150);
      gTop.addColorStop(0, 'rgba(0,0,0,1)');
      gTop.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gTop;
      ctx.fillRect(0, 0, w, 150);
      const gBot = ctx.createLinearGradient(0, h * 0.65, 0, h);
      gBot.addColorStop(0, 'rgba(0,0,0,0)');
      gBot.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = gBot;
      ctx.fillRect(0, h * 0.65, w, h * 0.35);
      ctx.restore();
    };

    const step = () => {
      // Fade what is already drawn, then add this frame's short strokes.
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      const tt = t * 0.00006;
      ctx.strokeStyle = 'rgba(26,20,16,0.35)';
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
        if (q.life < 0 || q.x < x0 - 20 || q.y < -5 || q.x > w + 5 || q.y > h + 5) spawn(q);
      }
      ctx.stroke();
      mask();
    };

    const resize = () => {
      const r = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rights = clearOf.map(c => c.current?.getBoundingClientRect().right).filter((x): x is number => x !== undefined);
      const start = rights.length ? (Math.max(...rights) - r.left) / w + 0.02 : 0.6;
      x0 = start * w;
      active = 1 - start >= MIN_FREE;
      ctx.clearRect(0, 0, w, h);
      if (!active) { particles = []; return; }

      const n = Math.round(((w - x0) * h) / AREA_PER_LINE);
      particles = Array.from({ length: n }, () => { const p = { x: 0, y: 0, life: 0 }; spawn(p); p.life = Math.random() * 600; return p; });
      // Pre-run the flow so the first painted frame already shows ink, not an empty field.
      for (let i = 0; i < 180; i++) { t += 16; step(); }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    clearOf.forEach(c => { if (c.current) ro.observe(c.current); });

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(section);

    let raf = 0;
    if (!reduced) {
      let last = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(50, now - last);
        last = now;
        if (!active || !visible || document.hidden) return;
        t += dt;
        step();
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [clearOf]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
