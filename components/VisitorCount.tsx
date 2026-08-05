import React, { useEffect, useState } from 'react';

/* ── Distinct device count ────────────────────────────────────────
   The browser mints a random id once and keeps it; the server folds it
   into a HyperLogLog. So the number is unique devices, and because an
   HLL only ever grows it accumulates and cannot fall.

   Two guarantees on the display side: it never renders 0, and it never
   renders lower than this device has already seen. */

const ID_KEY = 'gm:device';
const COUNTED_KEY = 'gm:counted';
const HIGH_KEY = 'gm:high';

/** localStorage throws in some privacy modes — never let that break a render. */
function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function deviceId(): string {
  const existing = readStore(ID_KEY);
  if (existing) return existing;

  const minted =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;

  writeStore(ID_KEY, minted);
  return minted;
}

export default function VisitorCount() {
  // Seed from the highest figure this device has seen, so a slow or failed
  // request can never make the number appear to drop.
  const [count, setCount] = useState<number | null>(() => {
    const stored = Number(readStore(HIGH_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : null;
  });

  useEffect(() => {
    let cancelled = false;

    const id = deviceId();
    const alreadyCounted = readStore(COUNTED_KEY) === '1';

    const request = alreadyCounted
      ? fetch('/api/views')
      : fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

    request
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data || typeof data.count !== 'number') return;

        writeStore(COUNTED_KEY, '1');

        setCount(previous => {
          const next = Math.max(data.count, previous ?? 0);
          if (next > 0) writeStore(HIGH_KEY, String(next));
          return next;
        });
      })
      .catch(() => {
        /* endpoint down — keep whatever we already had, show nothing if none */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Never render a zero.
  if (count === null || count < 1) return null;

  return (
    <span
      className="inline-flex items-baseline gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5"
      title="Distinct devices, counted without cookies or third-party analytics"
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
