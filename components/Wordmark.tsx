import React from 'react';

/* ── Monogram ─────────────────────────────────────────────────────
   A small hairline-ring mark with Fraunces italic initials. Hand-set
   rather than a stock icon, so it reads as identity, not template. */
export function Monogram({ size = 30, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '1.25px solid rgba(26,20,16,0.85)',
      }}
    >
      <span
        style={{
          fontFamily: "'Fraunces', ui-serif, Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: size * 0.46,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#1A1410',
          transform: 'translateY(0.5px)',
        }}
      >
        gm
      </span>
    </span>
  );
}

/* ── Wordmark lockup: monogram + name ─────────────────────────── */
export function Wordmark({ size = 30, showName = true }: { size?: number; showName?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Monogram size={size} />
      {showName && (
        <span
          className="font-medium tracking-tight"
          style={{ color: '#1A1410', fontSize: '0.92rem' }}
        >
          Gaurav Mahale
        </span>
      )}
    </span>
  );
}

export default Wordmark;
