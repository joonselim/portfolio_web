// api/claude.js — Vercel serverless proxy to the Anthropic API.
//
// Also logs each chatbot question (best-effort) to Vercel KV / Upstash Redis
// so the /dashboard page can show what visitors asked and roughly where from.
// Logging never blocks or breaks the chat reply — if KV isn't configured,
// it silently no-ops.
//
// Env vars:
//   ANTHROPIC_API_KEY      — required, the chatbot proxy
//   KV_REST_API_URL        — optional, set automatically by the Vercel KV /
//   KV_REST_API_TOKEN        Upstash integration (UPSTASH_* names also work)

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

// Minimal Upstash Redis REST client — no npm dependency, just fetch.
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

function decodeSafe(v) {
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch (e) {
    return String(v);
  }
}

// The chatbot sends the whole prompt (bio + conversation) as one user message.
// The latest question is the last "User: ..." line before "Assistant:".
function extractQuestion(body) {
  try {
    const content = (body && body.messages && body.messages[0] && body.messages[0].content) || '';
    const matches = [...String(content).matchAll(/^User:\s?(.+)$/gm)];
    return matches.length ? matches[matches.length - 1][1].trim() : '';
  } catch (e) {
    return '';
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY env var not set' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();

    // ── Analytics: log the question + coarse geo. Best-effort only. ──────────
    try {
      const question = extractQuestion(req.body);
      if (question && upstream.ok) {
        const answer = (data && data.content && data.content[0] && data.content[0].text) || '';
        const event = {
          ts: Date.now(),
          question,
          answer: String(answer).slice(0, 600),
          country: req.headers['x-vercel-ip-country'] || '',
          city: decodeSafe(req.headers['x-vercel-ip-city']),
          region: req.headers['x-vercel-ip-country-region'] || '',
          ref: (req.headers['referer'] || '').slice(0, 200),
        };
        await kv(['LPUSH', 'chat:log', JSON.stringify(event)]);
        await kv(['LTRIM', 'chat:log', '0', '999']); // keep the latest 1000
      }
    } catch (e) {
      // logging must never break the chat reply
    }

    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
