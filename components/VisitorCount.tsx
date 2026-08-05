import React, { useEffect, useState } from 'react';

/* ── Distinct visitor count ───────────────────────────────────────
   Counts once per browser session; every other mount just reads. The
   server dedupes properly by hashed IP, so the session guard is only
   there to keep writes off the free-tier command budget.

   Renders nothing until a real number arrives — a cold endpoint should
   leave no empty affordance sitting in the footer. */

const SESSION_KEY = 'gm:counted';

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    // sessionStorage throws in some privacy modes; a failure here should
    // only mean "count it again", never a broken render.
    let counted = false;
    try {
      counted = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* ignore */
    }

    fetch('/api/views', { method: counted ? 'GET' : 'POST' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data || typeof data.count !== 'number') return;
        setCount(data.count);
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* endpoint down or not provisioned — stay silent */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span
      className="inline-flex items-baseline gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5"
      title="Distinct visitors, counted without cookies or third-party analytics"
    >
      <span className="tabular text-ink" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
        {count.toLocaleString('en-IN')}
      </span>
      <span
        className="uppercase tracking-[0.16em]"
        style={{ fontSize: '9px', color: 'rgba(26,20,16,0.45)' }}
      >
        visitors
      </span>
    </span>
  );
}
