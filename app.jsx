// app.jsx — main app shell, keyboard nav, timeline, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryFont": "sans",
  "transition": "fade"
}/*EDITMODE-END*/;

const PAGES = [
  { key:"chat",    label:"Ask",        Cmp: () => <Chatbot /> },
  { key:"title",   label:"Title",      Cmp: PageTitle },
  { key:"about",   label:"About",      Cmp: PageAbout },
  { key:"edu",     label:"Education",  Cmp: PageEducation },
  { key:"exp",     label:"Experience", Cmp: PageExperience },
  { key:"shinhan", label:"Shinhan",    Cmp: PageShinhan },
  { key:"startup", label:"Founder",    Cmp: PageStartup },
  { key:"forcs",   label:"FORCS",      Cmp: PageForcs },
  { key:"proj",    label:"Projects",   Cmp: PageProjects },
  { key:"skills",  label:"Skills",     Cmp: PageSkills },
  { key:"awards",  label:"Awards",     Cmp: PageAwards },
  { key:"contact", label:"Contact",    Cmp: PageContact },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [idx, setIdx] = React.useState(() => {
    const h = parseInt((location.hash||"").replace("#",""), 10);
    return Number.isFinite(h) && h>=0 && h<PAGES.length ? h : 0;
  });
  const [leavingIdx, setLeavingIdx] = React.useState(null);

  // Apply font tweak
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.primaryFont === "serif") {
      root.style.setProperty("--pf", "var(--serif)");
    } else {
      root.style.setProperty("--pf", "var(--sans)");
    }
  }, [t.primaryFont]);

  // Apply transition tweak
  React.useEffect(() => {
    const stage = document.getElementById("stage");
    if (!stage) return;
    stage.classList.remove("anim-fade","anim-slide","anim-reveal","anim-none");
    stage.classList.add(`anim-${t.transition || "fade"}`);
  }, [t.transition]);

  // Keyboard nav
  React.useEffect(() => {
    const onKey = (e) => {
      // Don't intercept arrow keys inside text inputs
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(idx+1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(idx-1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End")  { e.preventDefault(); go(PAGES.length-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  React.useEffect(() => {
    history.replaceState(null, "", "#"+idx);
    window.parent?.postMessage({ slideIndexChanged: idx }, "*");
  }, [idx]);

  const go = (n) => {
    const next = Math.max(0, Math.min(PAGES.length-1, n));
    if (next === idx) return;
    setLeavingIdx(idx);
    setIdx(next);
    setTimeout(() => setLeavingIdx(null), 700);
  };

  return (
    <>
      {PAGES.map((p,i) => {
        const active = i === idx;
        const leaving = i === leavingIdx;
        return (
          <div key={p.key} className={`page${active?" active":""}${leaving?" leaving":""}`} data-screen-label={`${String(i+1).padStart(2,'0')} ${p.label}`}>
            <p.Cmp />
          </div>
        );
      })}

      {/* Right timeline */}
      <div id="timeline">
        {PAGES.map((p,i)=>(
          <button key={p.key} className={`tl-item${i===idx?" on":""}`} onClick={()=>go(i)} title={p.label}>
            <span className="lbl">{String(i+1).padStart(2,'0')} · {p.label}</span>
            <span className="bar"></span>
          </button>
        ))}
      </div>

      {/* Keyboard hint (hidden on chat page so focus stays on input) */}
      {idx !== 0 && (
        <div className="kbd-hint">
          <span className="kbd">←</span><span className="kbd">→</span><span>navigate</span>
        </div>
      )}

      <TweaksPanel>
        <TweakSection label="Typography" />
        <TweakRadio
          label="Primary font"
          value={t.primaryFont}
          options={["sans","serif"]}
          onChange={(v)=>setTweak("primaryFont", v)}
        />
        <TweakSection label="Page transition" />
        <TweakRadio
          label="Animation"
          value={t.transition}
          options={["fade","slide","reveal","none"]}
          onChange={(v)=>setTweak("transition", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
