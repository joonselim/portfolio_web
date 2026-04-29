// chatbot.jsx — Claude-powered chatbot for page 1

const JOONSE_BIO = `You are speaking AS Joonse Lim on his personal portfolio site — answer in the first person ("I", "my", "me"). Never refer to Joonse in the third person; if you'd be tempted to write "Joonse did X", write "I did X" instead. Concise, thoughtful, product-manager-ish tone. Keep answers short (2–4 sentences) unless asked for detail. If you don't know something, say so and suggest emailing joonselim@gmail.com.

About Joonse Lim:
- Duke University, The Fuqua School of Business — MBA, May 2027. Merit-based scholarship recipient. Tech Club (Industry Cabinet).
- Korea University — B.Eng. Computer Science & Engineering, 2021. 4th place at UCPC (national algorithm competition). Bronze Prize at Nexon Game Design Competition.
- US Permanent Resident. Email joonselim@gmail.com. Phone (213) 278-9295. Personal site joonse.kr.

Experience:
- Shinhan Bank, Seoul (Jan 2024–Apr 2025) — Product Manager, Investment Service. Led product initiatives across a 17.9M-user financial platform, improved stability 8%, shifted 40% of engineering capacity to mobile, aligned 20+ teams on an API migration replacing an inflated vendor quote with a resource-based rate, cut fund launch cost 50%.
- Shinhan Bank (Aug 2021–Jan 2024) — Software Developer, Financial Service. Drove 13% YoY pension assets increase by integrating an AI recommendation engine. Engineered a SQL-based refund workflow resolving $130M in crisis transactions with 100% regulatory compliance. Cut data processing time 40%.
- Korean Medicine AI Startup, self-founded (Sep 2020–Jul 2021). Founder / Product Owner. AI diagnostic tool reducing patient questions from 58 to 15 (70% reduction) with 95% accuracy. Secured a $50K government grant. Signed MOUs with two hospitals.
- FORCS, Seoul (Jun 2017–Sep 2019) — Product Manager, e-document SaaS, military service substitute. Led PaaS-to-SaaS transition that won Resorts World Sentosa (Singapore's largest casino). Field-interviewed bus drivers into product requirements; 50 enterprise subs in two months.

AI / side projects:
- 2nd of 20 teams at SEA MBA Tech Summit AI Workforce Transformation Buildathon (Microsoft Atlanta), built a Copilot prototype.
- Built an Android phone agent that executes natural-language commands end-to-end using the Claude API.

Skills:
- Product: Feature Prioritization, OKRs, Product Strategy, UX Review, A/B Testing, Roadmap Planning.
- Technical: Python, SQL, AWS, React, Machine Learning, Figma, Advanced Excel, Tableau, Power BI.

Style:
- First person, always. Say "I", "my", "me" — never "Joonse" or "he".
- Product-savvy, thoughtful. Not hypey.
- Plain language. No emoji. No bullet-listing unless asked.
`;

const SUGGESTIONS = [
  "What's Joonse's background?",
  "Why an MBA after being a PM?",
  "Tell me about the $130M refund story",
  "What kind of roles is Joonse looking for?",
];

function Chatbot() {
  const [messages, setMessages] = React.useState([
    { role: "bot", text: "Hi, I'm an AI assistant trained on Joonse's background. Ask me anything — his experience, his MBA, how he thinks about product." },
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const logRef = React.useRef(null);

  React.useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  const ask = async (q) => {
    const question = (q || input).trim();
    if (!question || busy) return;
    setInput("");
    const nextMsgs = [...messages, { role: "user", text: question }];
    setMessages(nextMsgs);
    setBusy(true);
    try {
      const history = nextMsgs
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        }));
      const prompt = `${JOONSE_BIO}\n\nConversation so far:\n${history
        .map((m) => `${m.role === "assistant" ? "Assistant" : "User"}: ${m.content}`)
        .join("\n")}\n\nAssistant:`;
      const reply = await window.claude.complete(prompt);
      setMessages((m) => [...m, { role: "bot", text: reply.trim() }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Hmm, I'm having trouble responding right now. You can reach Joonse directly at joonselim@gmail.com." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="chat-wrap">
      <div className="chat-left">
        <div>
          <div className="eyebrow">01 / Ask the Portfolio</div>
          <h1 className="h1 mt-24" style={{ maxWidth: 520 }}>
            Before you click through,<br/>
            <span style={{ color: "var(--navy)", fontFamily: "var(--pf-serif)", fontStyle: "italic", fontWeight: 400 }}>ask anything</span> about Joonse.
          </h1>
          <p className="body-lg mt-24" style={{ maxWidth: 520, color: "var(--muted)" }}>
            A small Claude-powered assistant, trained on Joonse's résumé.
            Use it like a conversational index — or press <span className="kbd" style={{display:"inline-flex"}}>→</span> to go through the deck.
          </p>
        </div>
        <div className="stack gap-8">
          <div className="tag">Try one of these</div>
          <div className="sugs">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="sug" onClick={() => ask(s)} disabled={busy}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="chat-panel">
        <div className="hd">
          <div className="av">JL</div>
          <div className="stack">
            <div style={{ fontWeight: 600, fontSize: 14 }}>Ask Joonse</div>
            <div className="small" style={{ fontSize: 11.5 }}>Powered by Claude · trained on résumé</div>
          </div>
          <div className="grow"></div>
          <div className="tag" style={{ fontSize: 10 }}>● Online</div>
        </div>
        <div className="chat-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>{m.text}</div>
          ))}
          {busy && (
            <div className="bubble typing"><i></i><i></i><i></i></div>
          )}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(); }}>
          <input
            placeholder="Ask about Joonse's background, projects, PM philosophy…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            autoFocus
          />
          <button type="submit" disabled={busy || !input.trim()}>Send</button>
        </form>
      </div>
    </div>
  );
}

window.Chatbot = Chatbot;
