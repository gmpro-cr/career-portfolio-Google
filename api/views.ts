import crypto from 'node:crypto';
import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Distinct-device counter.
 *
 * Identity is a random id the browser mints once and keeps in localStorage —
 * not an IP, which identifies a network rather than a device (the same phone
 * on wifi and on mobile data is one device but two IPs; two laptops behind one
 * router can be two devices on one IP).
 *
 * The id is hashed with a server-side salt and handed to a Redis HyperLogLog,
 * which keeps only probabilistic registers. The hash is discarded and never
 * written, so there is no device identifier at rest and the count cannot be
 * reversed into a visitor list. A HyperLogLog also only ever grows — there is
 * no decrement, so the total cannot regress.
 *
 * POST { id } → count this device, then return the total.
 * GET          → return the total only.
 *
 * Never surfaces an error to the page: on any failure it answers 204 and the
 * UI renders nothing rather than a zero.
 */

// Preview and dev deploys share the same Redis instance, so they get their own
// key — otherwise browsing a preview build would inflate the public number.
const KEY =
  process.env.VERCEL_ENV === 'production'
    ? 'portfolio:visitors'
    : `portfolio:visitors:${process.env.VERCEL_ENV || 'dev'}`;

// A client-supplied id is inherently forgeable, so cap counting POSTs per IP
// per hour. A normal visitor sends exactly one, ever; going over the cap only
// skips the PFADD, the count is still returned, so nothing visibly breaks.
const RATE_LIMIT = 10;
const RATE_WINDOW_SECONDS = 3600;

/** Device ids we minted are UUIDs; accept only that shape. */
function isValidId(id: unknown): id is string {
  return typeof id === 'string' && /^[a-zA-Z0-9-]{8,64}$/.test(id);
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded || '')
    .split(',')[0]
    .trim();
}

function hash(value: string): string {
  const salt = process.env.VISITOR_SALT || '';
  return crypto.createHash('sha256').update(`${value}|${salt}`).digest('hex');
}

/** True when this IP still has budget to register a new device. */
async function withinRateLimit(redis: Redis, req: VercelRequest): Promise<boolean> {
  const key = `portfolio:rate:${hash(clientIp(req)).slice(0, 32)}`;
  const hits = await redis.incr(key);
  if (hits === 1) await redis.expire(key, RATE_WINDOW_SECONDS);
  return hits <= RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return res.status(204).end();
  }

  try {
    const redis = Redis.fromEnv();

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const id = body?.id;

      if (isValidId(id) && (await withinRateLimit(redis, req))) {
        await redis.pfadd(KEY, hash(id));
      }
    }

    const count = await redis.pfcount(KEY);

    // Deliberately uncached. A single PFCOUNT is cheap, and edge-caching the
    // read is what previously let a returning visitor be served an older,
    // lower number — the count appearing to reset.
    res.setHeader('Cache-Control', 'no-store');

    return res.status(200).json({ count });
  } catch {
    return res.status(204).end();
  }
}
