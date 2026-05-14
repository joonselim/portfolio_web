// api/dashboard.js — password-gated reader for the chatbot question log.
//
// POST { pw } -> { events: [...], count }   on correct password
// Returns 401 on a wrong/missing password, 500 if env vars are missing.
//
// Env vars:
//   DASHBOARD_PASSWORD     — required, the password the /dashboard page sends
//   KV_REST_API_URL        — set by the Vercel KV / Upstash integration
//   KV_REST_API_TOKEN        (UPSTASH_* names also accepted)

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

async function kv(command) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const r = await fetch(KV_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data.result;
  } catch (e) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return res.status(500).json({ error: 'DASHBOARD_PASSWORD env var not set' });
  }

  const pw = req.body && req.body.pw;
  if (!pw || pw !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({
      error: 'KV not configured. Add the Vercel KV / Upstash integration so KV_REST_API_URL and KV_REST_API_TOKEN are set.',
    });
  }

  try {
    const raw = await kv(['LRANGE', 'chat:log', '0', '499']);
    const events = (raw || [])
      .map((s) => {
        try {
          return JSON.parse(s);
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
    res.status(200).json({ events, count: events.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
