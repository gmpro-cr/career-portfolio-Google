import React, { useEffect, useRef } from 'react';

/* ── Hero dot field ────────────────────────────────────────────────
   A fine grid of ink dots behind the hero. A slow wave travels through
   it, and the cursor sends a ripple outward. The field starts just right
   of the hero text (measured from the DOM, so it never sits behind
   anything you have to read) and fades out towards the bottom edge.

   Decorative (aria-hidden). Hidden when the text leaves too little free
   space (phones). Pauses off screen and in hidden tabs. Under reduced
   motion it draws one still frame. Chosen by the owner from a live
   preview on 2026-09-24; see DESIGN.md §4. */

const GAP = 18;               // px between dots
const MIN_FREE = 0.18;        // hide unless this share of the width is free of text
const FADE_IN = 0.22;         // share of the width over which the field fades in from the text edge
const RIPPLE_EVERY_MS = 900;  // at most one new ripple per this long while the cursor moves
const RIPPLE_LIFE_MS = 2600;
const RIPPLE_SPEED = 220;     // px per second

export default function DotField({ clearOf }: { clearOf: React.RefObject<HTMLElement | null>[] }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, start = 1;            // start: where the field begins, as a share of the width
    let mx = -1, my = -1, t = 0, lastRipple = -Infinity;
    let ripples: { x: number; y: number; t0: number }[] = [];
    let visible = true;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (1 - start < MIN_FREE) return;
      for (let y = GAP / 2; y < h; y += GAP) {
        // Fade out towards the bottom edge, and under the fixed navbar at the top.
        const vMask = Math.min(1, Math.max(0, (h - y) / (h * 0.35)), Math.max(0, (y - 40) / 110));
        for (let x = GAP / 2; x < w; x += GAP) {
          const hMask = Math.min(1, Math.max(0, (x / w - start) / FADE_IN));
          const mask = hMask * vMask;
          if (mask <= 0) continue;
          let v = 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.008 - t * 0.0011);
          for (const r of ripples) {
            const age = (t - r.t0) / 1000;
            const d = Math.hypot(x - r.x, y - r.y);
            const band = Math.exp(-((d - age * RIPPLE_SPEED) ** 2) / 900);
            v += band * (1 - (t - r.t0) / RIPPLE_LIFE_MS) * 1.2;
          }
          ctx.fillStyle = `rgba(26,20,16,${(0.10 + v * 0.22) * mask})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.6 + v * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const r = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rights = clearOf.map(c => c.current?.getBoundingClientRect().right).filter((x): x is number => x !== undefined);
      start = rights.length ? (Math.max(...rights) - r.left) / w + 0.02 : 0.6;
      // Paint a frame straight away: the loop may not run yet (hidden tab, preview renderer),
      // and under reduced motion this is the only frame.
      if (reduced) t = 4000;
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    clearOf.forEach(c => { if (c.current) ro.observe(c.current); });

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -1; my = -1; };
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
        if (!visible || document.hidden) return;
        t += dt;
        if (mx >= 0 && mx / w > start && t - lastRipple > RIPPLE_EVERY_MS) {
          ripples.push({ x: mx, y: my, t0: t });
          lastRipple = t;
        }
        ripples = ripples.filter(r => t - r.t0 < RIPPLE_LIFE_MS);
        draw();
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
