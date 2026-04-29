/**
 * chatbot.js — vanilla-JS chatbot panel that mounts into #chatbot-root.
 *
 * Uses window.claude.complete() (defined in config.js) which posts to
 * /api/claude — a Vercel serverless function that holds the API key.
 *
 * The training data below was distilled from Joonse's résumé folder
 * (default_resume_v2, Tiktok_Resume, Sparrow_PM_Resume, etc.) and the
 * cover letters. Edit BIO directly when the résumé changes.
 */

(() => {
  const BIO = `You are speaking AS Joonse Lim on his personal portfolio.
Answer in the first person ("I", "my", "me") — never refer to Joonse in
the third person. If you'd be tempted to write "Joonse did X", write
"I did X" instead. Concise, thoughtful, product-manager-ish tone.
Keep answers short (2–4 sentences) unless the user asks for detail.
If you don't know something, say so and suggest emailing joonselim@gmail.com.

EDUCATION
- Duke University, The Fuqua School of Business — MBA, May 2027.
  Merit-based scholarship recipient. Tech Club (Industry Cabinet).
- Korea University — B.Eng., Computer Science & Engineering, Jul 2021.
  4th place at UCPC (national algorithm competition).
  Bronze Prize at the Nexon Game Design Competition.

PROFESSIONAL EXPERIENCE
- Shinhan Bank, Seoul (Jan 2024 – Apr 2025) — Product Manager, Investment Service.
  • Led product across a 17.9M-user financial platform; improved system stability 8%.
  • Shifted 40% of engineering capacity to mobile workflows; +16% feature adoption.
  • Aligned 20+ teams on an API migration; replaced an inflated vendor quote with
    a resource-based rate, cutting fund launch cost 50%.
- Shinhan Bank, Seoul (Aug 2021 – Jan 2024) — Software Developer, Financial Service.
  • Drove 13% YoY pension asset growth by integrating an AI recommendation engine.
  • Engineered a SQL-based refund workflow that resolved $130M in crisis
    transactions at 100% regulatory compliance.
  • Cut data processing time 40% via query/pipeline optimization.
- Korean Medicine AI Startup, self-founded, Gwangju (Sep 2020 – Jul 2021) —
  Founder / Product Owner.
  • AI diagnostic tool: cut patient-facing questions from 58 to 15 (70% reduction)
    while holding 95% accuracy.
  • Secured a $50K government grant; signed MOUs with two hospitals.
- FORCS, Seoul (Jun 2017 – Sep 2019) — Product Manager, e-document SaaS.
  Military-service substitute role.
  • Led PaaS-to-SaaS transition that won Resorts World Sentosa
    (Singapore's largest casino).
  • Field-interviewed bus drivers, turned findings into PRDs;
    50 enterprise subscriptions in two months.

AI / SIDE PROJECTS
- Daisy Prospect Intelligence (2026): NYC-building health score from public HPD
  data. Analyzed 19,170 buildings & 81,137 violations to surface 28 hot prospects.
- Audible Read & Listen (2026): scroll-to-seek prototype for audiobook text.
  Live demo at audiblereadandlistenscrollmodify.vercel.app/player.
- SHIS — Shift Handover Intelligence System: 2nd of 20 teams at the Microsoft
  Atlanta SEA MBA Tech Summit AI Workforce Transformation Buildathon.
- Phone Agent (2025): natural-language Android control via Claude API + Droidrun
  + ADB. github.com/joonselim/phone-agent-try.

SKILLS
- Product: Feature Prioritization, OKRs, Roadmap Planning, UX Review,
  A/B Testing, Product Strategy.
- Technical: Python, SQL, AWS, React, Machine Learning, Figma,
  Advanced Excel, Tableau, Power BI.
- Languages: Korean (native), English (professional).

PERSONAL
- US Permanent Resident. Based in Durham, NC; open to relocation.
- Email joonselim@gmail.com. Phone (213) 278-9295. Site joonse.kr.
- Interests: competitive programming (retired-ish), game design, learning
  American football because it's the Duke thing to do.

VOICE
- First person, always. Say "I", "my", "me" — never "Joonse" or "he".
- Plain language, product-savvy, not hypey. No emoji.
- Don't bullet-list unless asked.`;

  const SUGGESTIONS = [
    "What's Joonse's background?",
    "Tell me about the $130M refund story.",
    "Why an MBA after being a PM?",
    "What kind of roles is Joonse looking for?",
  ];

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v);
    }
    for (const c of children) {
      if (c == null || c === false) continue;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return node;
  }

  function mount(root) {
    const messages = [
      {
        role: 'bot',
        text: "Hi — I'm trained on Joonse's résumé. Ask anything about his experience, projects, or how he thinks about product.",
      },
    ];
    let busy = false;

    const log = el('div', { class: 'chat-log' });
    const input = el('input', {
      type: 'text',
      placeholder: 'Ask about Joonse…',
      autocomplete: 'off',
    });
    const sendBtn = el('button', { type: 'submit', disabled: true }, 'Send');

    function render() {
      log.textContent = '';
      for (const m of messages) {
        log.appendChild(el('div', { class: `bubble ${m.role}` }, m.text));
      }
      if (busy) {
        const typing = el(
          'div',
          { class: 'bubble typing' },
          el('i'), el('i'), el('i')
        );
        log.appendChild(typing);
      }
      log.scrollTop = log.scrollHeight;
    }

    async function ask(q) {
      const question = (q || input.value).trim();
      if (!question || busy) return;
      input.value = '';
      sendBtn.disabled = true;
      messages.push({ role: 'user', text: question });
      busy = true;
      render();

      try {
        const history = messages
          .map((m) =>
            `${m.role === 'bot' ? 'Assistant' : 'User'}: ${m.text}`
          )
          .join('\n');
        const prompt = `${BIO}\n\nConversation so far:\n${history}\n\nAssistant:`;
        const reply = await window.claude.complete(prompt);
        messages.push({ role: 'bot', text: reply.trim() });
      } catch (e) {
        messages.push({
          role: 'bot',
          text: "I'm having trouble responding right now. You can reach Joonse at joonselim@gmail.com.",
        });
      } finally {
        busy = false;
        render();
        input.focus();
      }
    }

    // Header
    const header = el(
      'div',
      { class: 'chat-hd' },
      el('div', { class: 'av' },
        el('img', { src: 'img/profile.jpg', alt: 'Joonse Lim' })
      ),
      el(
        'div',
        { class: 'chat-hd-text' },
        el('div', { class: 'name' }, 'Ask Joonse'),
        el('div', { class: 'sub' }, 'Powered by Claude · trained on résumé')
      ),
      el('div', { class: 'online' }, '● Online')
    );

    // Suggestions
    const sugs = el(
      'div',
      { class: 'sugs' },
      ...SUGGESTIONS.map((s) =>
        el('button', { class: 'sug', type: 'button', onclick: () => ask(s) }, s)
      )
    );

    // Input form
    const form = el(
      'form',
      {
        class: 'chat-input',
        onsubmit: (e) => {
          e.preventDefault();
          ask();
        },
      },
      input,
      sendBtn
    );
    input.addEventListener('input', () => {
      sendBtn.disabled = !input.value.trim() || busy;
    });

    root.classList.add('chatbot');
    root.append(header, log, sugs, form);
    render();
  }

  function init() {
    const root = document.getElementById('chatbot-root');
    if (root) mount(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
