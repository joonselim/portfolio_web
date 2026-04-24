// config.js — defines window.claude (calls /api/claude proxy)
// Works for both local dev (server.py) and Vercel deployment

window.claude = {
  complete: async function (prompt) {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!response.ok) throw new Error(`API error ${response.status}`);
    const data = await response.json();
    return data.content[0].text;
  },
};
