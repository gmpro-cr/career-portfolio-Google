import crypto from 'node:crypto';
import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Distinct-visitor counter.
 *
 * Identity is sha256(ip + user-agent + salt), handed straight to a Redis
 * HyperLogLog. HLL keeps only probabilistic registers — the hash is discarded
 * and never written anywhere — so there is no visitor identifier at rest to
 * leak, and the count cannot be reversed into a visitor list. Cost is ~0.8%
 * error on the total, which is well inside the precision anyone reads a
 * portfolio counter at.
 *
 * POST → count this request, then return the total.
 * GET  → return the total only.
 *
 * Never surfaces an error to the page: if Redis is unreachable or unset, it
 * answers 204 and the UI simply renders nothing.
 */

// Preview and dev deploys share the same Redis instance, so they get their own
// key — otherwise browsing a preview build would inflate the public number.
const KEY =
  process.env.VERCEL_ENV === 'production'
    ? 'portfolio:visitors'
    : `portfolio:visitors:${process.env.VERCEL_ENV || 'dev'}`;

function visitorHash(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '')
    .split(',')[0]
    .trim();
  const ua = req.headers['user-agent'] || '';
  const salt = process.env.VISITOR_SALT || '';

  return crypto.createHash('sha256').update(`${ip}|${ua}|${salt}`).digest('hex');
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
      await redis.pfadd(KEY, visitorHash(req));
    }

    const count = await redis.pfcount(KEY);

    // Let the CDN absorb the reads; a portfolio counter does not need to be
    // to-the-second accurate, and this keeps us far inside the free tier.
    res.setHeader(
      'Cache-Control',
      req.method === 'POST'
        ? 'no-store'
        : 'public, s-maxage=60, stale-while-revalidate=300',
    );

    return res.status(200).json({ count });
  } catch {
    return res.status(204).end();
  }
}
