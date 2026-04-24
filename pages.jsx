// pages.jsx — pages 2-12

function PageMark({n, label}) {
  return (
    <>
      <div className="page-mark"><span className="dot"></span>{label}</div>
      <div className="page-num">{String(n).padStart(2,'0')} / 12</div>
    </>
  );
}

// Page 2 — Title
function PageTitle() {
  return (
    <div className="title-page">
      <PageMark n={2} label="Title" />
      <div className="eyebrow muted">Portfolio · 2026</div>
      <div className="big-name mt-16">
        Joonse<br/>
        Lim<span className="amp" style={{fontSize:120, marginLeft:10, verticalAlign:"baseline"}}>.</span>
      </div>
      <div className="row between mt-48" style={{alignItems:"flex-end", maxWidth:1280}}>
        <div className="body-lg" style={{maxWidth:560}}>
          Product manager · builder · Duke MBA '27.<br/>
          Eight years shipping fintech, AI, and SaaS to millions of users.
        </div>
        <div className="stack gap-8" style={{textAlign:"right"}}>
          <div className="tag">Duke · Fuqua</div>
          <div className="mono small" style={{color:"var(--ink-2)"}}>joonse.kr · joonselim@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

// Page 3 — About
function PageAbout() {
  return (
    <div>
      <PageMark n={3} label="About" />
      <div className="about-grid">
        <div className="avatar-ph" title="Portrait placeholder">
          <div style={{alignSelf:"flex-end",padding:10,fontFamily:"var(--mono)",fontSize:10,letterSpacing:".1em",color:"var(--muted)",width:"100%",textAlign:"center",marginTop:"auto"}}>PORTRAIT · REPLACE</div>
        </div>
        <div className="stack gap-24">
          <div className="eyebrow">About</div>
          <div className="h2" style={{maxWidth:720}}>
            I'm a PM who still writes the <span style={{fontFamily:"var(--pf-serif)", fontStyle:"italic", color:"var(--navy)", fontWeight:400}}>SQL</span> when something's on fire.
          </div>
          <div className="body-lg" style={{maxWidth:680}}>
            Started as an engineer, shipped my own AI startup, then ran product at one of Korea's largest banks.
            I'm happiest at the intersection of ambiguous business problems and technical systems — translating between the two is most of the job.
          </div>
          <div className="rule mt-16"></div>
          <div className="row gap-32 mt-16">
            <div className="stack"><div className="tag">Based in</div><div className="h4 mt-8">Durham, NC</div></div>
            <div className="vrule"></div>
            <div className="stack"><div className="tag">Formerly</div><div className="h4 mt-8">Seoul, Gwangju</div></div>
            <div className="vrule"></div>
            <div className="stack"><div className="tag">Looking for</div><div className="h4 mt-8">Product · Tech / Fin / AI</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page 4 — Education
function PageEducation() {
  return (
    <div>
      <PageMark n={4} label="Education" />
      <div className="eyebrow">Education</div>
      <div className="h1 mt-16" style={{maxWidth:900}}>
        Engineer by training.<br/>
        <span style={{color:"var(--muted)"}}>Now adding the business layer.</span>
      </div>
      <div className="stack gap-16 mt-48">
        <div className="edu-card">
          <div className="crest">D</div>
          <div className="stack gap-8">
            <div className="row between center">
              <div className="h3">Duke University — The Fuqua School of Business</div>
              <div className="mono small">MAY 2027</div>
            </div>
            <div className="body" style={{color:"var(--muted)"}}>Master of Business Administration · Durham, NC</div>
            <div className="row gap-8 mt-8">
              <span className="chip soft">Tech Club · Industry Cabinet</span>
              <span className="chip soft">Merit-based Scholarship</span>
            </div>
          </div>
          <div className="tag">#01</div>
        </div>
        <div className="edu-card alt">
          <div className="crest">고</div>
          <div className="stack gap-8">
            <div className="row between center">
              <div className="h3">Korea University — College of Informatics</div>
              <div className="mono small">JUL 2021</div>
            </div>
            <div className="body" style={{color:"var(--muted)"}}>B.Eng. Computer Science and Engineering · Seoul</div>
            <div className="row gap-8 mt-8">
              <span className="chip soft">4th Place · UCPC National Algorithm Competition</span>
              <span className="chip soft">Bronze · Nexon Game Design Competition</span>
            </div>
          </div>
          <div className="tag">#02</div>
        </div>
      </div>
    </div>
  );
}

// Page 5 — Experience overview
function PageExperience() {
  const rows = [
    { yr:"2024 — 2025", co:"Shinhan Bank", ro:"Product Manager, Investment Service", loc:"Seoul" },
    { yr:"2021 — 2024", co:"Shinhan Bank", ro:"Software Developer, Financial Service", loc:"Seoul" },
    { yr:"2020 — 2021", co:"Korean Medicine AI (self-founded)", ro:"Founder, Product Owner", loc:"Gwangju" },
    { yr:"2017 — 2019", co:"FORCS", ro:"Product Manager · e-document SaaS", loc:"Seoul" },
  ];
  return (
    <div>
      <PageMark n={5} label="Experience" />
      <div className="row between" style={{alignItems:"flex-end"}}>
        <div>
          <div className="eyebrow">Experience · Overview</div>
          <div className="h1 mt-16">Eight years. Four roles.<br/>One through-line: <span style={{fontFamily:"var(--pf-serif)",fontStyle:"italic",color:"var(--navy)",fontWeight:400}}>shipping product</span>.</div>
        </div>
        <div className="mono small" style={{textAlign:"right"}}>2017 ————————— 2025<br/><span style={{color:"var(--navy)"}}>engineering → PM → founder → PM</span></div>
      </div>
      <div className="mt-48">
        {rows.map((r,i)=>(
          <div className="tl-row" key={i}>
            <div className="yr">{r.yr}</div>
            <div><div className="co">{r.co}</div><div className="ro">{r.ro}</div></div>
            <div className="loc">{r.loc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page 6 — Shinhan Bank deep dive
function PageShinhan() {
  return (
    <div>
      <PageMark n={6} label="Case · Shinhan Bank" />
      <div className="shinhan">
        <div className="stack gap-24">
          <div className="eyebrow">Case Study · 01</div>
          <div className="h2">Shinhan Bank<br/><span style={{color:"var(--muted)"}}>Product Manager · Investment Service</span></div>
          <div className="body-lg" style={{maxWidth:600}}>
            Led product across a <b>17.9M-user</b> financial platform — from a $130M crisis refund workflow as an engineer, to portfolio-wide prioritization as a PM.
          </div>
          <div className="stack mt-16">
            <div className="tag" style={{marginBottom:8}}>Selected outcomes</div>
            <div className="bullet"><div className="n">01</div><div>Led product initiatives across a 17.9M-user platform, improving system stability by <b>8%</b> and accelerating release velocity.</div></div>
            <div className="bullet"><div className="n">02</div><div>Shifted <b>40%</b> of engineering capacity to critical mobile workflows, increasing feature adoption <b>16%</b>.</div></div>
            <div className="bullet"><div className="n">03</div><div>Aligned 20+ teams on an API migration by negotiating vendor contract terms — replaced an inflated quote with a resource-based rate.</div></div>
            <div className="bullet"><div className="n">04</div><div>Resolved <b>$130M</b> in crisis transactions by engineering a SQL-based refund workflow with automated clawback — 100% regulatory compliance.</div></div>
          </div>
        </div>
        <div className="stack gap-16" style={{alignContent:"start"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="metric-card"><div className="v">17.9<span className="unit">M</span></div><div className="k">Users on the platform I owned product decisions for</div></div>
            <div className="metric-card"><div className="v">$130<span className="unit">M</span></div><div className="k">In crisis transactions resolved via an engineered SQL refund workflow</div></div>
            <div className="metric-card"><div className="v">13<span className="unit">% YoY</span></div><div className="k">Pension client asset growth from AI recommendation tuning</div></div>
            <div className="metric-card"><div className="v">50<span className="unit">%</span></div><div className="k">Fund launch cost reduction via standardized PRD templates</div></div>
          </div>
          <div className="placeholder" style={{height:180,borderRadius:6}}>CHART · FEATURE ADOPTION BEFORE/AFTER</div>
          <div className="row gap-8">
            <span className="chip">Prioritization</span>
            <span className="chip">API Migration</span>
            <span className="chip">AI Integration</span>
            <span className="chip">Cross-Functional</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page 7 — AI Startup (placeholder layout variant: full-bleed quote + metrics)
function PageStartup() {
  return (
    <div>
      <PageMark n={7} label="Case · AI Startup" />
      <div className="row" style={{height:"100%",gap:52}}>
        <div className="stack" style={{flex:"1 1 0",justifyContent:"space-between"}}>
          <div>
            <div className="eyebrow">Case Study · 02 · Founder</div>
            <div className="h2 mt-16">Korean Medicine<br/>AI Startup<span className="navy">.</span></div>
            <div className="body-lg mt-24" style={{maxWidth:540,color:"var(--muted)"}}>
              Founded and launched an AI diagnostic tool for oriental medicine — from zero to two hospital MOUs and a $50K government grant in under a year.
            </div>
          </div>
          <div className="stack gap-8">
            <div className="tag">Role</div>
            <div className="h4">Founder · Product Owner</div>
            <div className="small">Gwangju · Sep 2020 – Jul 2021 · Team of 3</div>
          </div>
        </div>
        <div className="vrule"></div>
        <div className="stack gap-24" style={{flex:"1 1 0"}}>
          <div style={{fontSize:28,lineHeight:1.35,fontFamily:"var(--pf-serif)",fontStyle:"italic",color:"var(--ink)",maxWidth:520}}>
            "Reduced patient-facing questions from <span style={{color:"var(--navy)",fontStyle:"normal",fontFamily:"var(--pf)",fontWeight:600}}>58 to 15</span> — a 70% drop — while holding 95% diagnostic accuracy."
          </div>
          <div className="rule"></div>
          <div className="stack gap-16">
            <div className="bullet"><div className="n">01</div><div>Productized the diagnostic engine into a deployable web + mobile service.</div></div>
            <div className="bullet"><div className="n">02</div><div>Presented financial models and market analysis to senior government officials — secured a $50K grant.</div></div>
            <div className="bullet"><div className="n">03</div><div>Led a three-person team to MOUs with two hospitals.</div></div>
          </div>
          <div className="placeholder" style={{height:110,borderRadius:6}}>PRODUCT SCREENSHOT · DIAGNOSTIC FLOW</div>
        </div>
      </div>
    </div>
  );
}

// Page 8 — FORCS (layout variant: 3-column story)
function PageForcs() {
  return (
    <div>
      <PageMark n={8} label="Case · FORCS" />
      <div className="eyebrow">Case Study · 03</div>
      <div className="h2 mt-16">FORCS — <span style={{color:"var(--muted)"}}>e-document SaaS, first PM role.</span></div>
      <div className="row gap-32 mt-48" style={{alignItems:"stretch"}}>
        <div className="stack gap-16" style={{flex:1}}>
          <div className="tag">Context</div>
          <div className="body-lg">Military service substitute role at a Korean enterprise SaaS company. Owned feature priority during a PaaS-to-SaaS transition.</div>
          <div className="placeholder" style={{height:120,borderRadius:6,marginTop:8}}>LOGO · FORCS</div>
        </div>
        <div className="vrule"></div>
        <div className="stack gap-16" style={{flex:1}}>
          <div className="tag">The work</div>
          <div className="body">Optimized signature pad sizing and approval workflows. Ran field interviews with bus drivers to surface UX barriers and turn them into PRDs.</div>
          <div className="row gap-8 mt-8" style={{flexWrap:"wrap"}}>
            <span className="chip soft">Feature Prioritization</span>
            <span className="chip soft">UX Research</span>
            <span className="chip soft">PaaS → SaaS</span>
          </div>
        </div>
        <div className="vrule"></div>
        <div className="stack gap-16" style={{flex:1}}>
          <div className="tag">Outcome</div>
          <div className="stack gap-12">
            <div className="metric-card"><div className="v">RWS</div><div className="k">Won Resorts World Sentosa — Singapore's largest casino — as a contract</div></div>
            <div className="metric-card"><div className="v">50<span className="unit"> subs</span></div><div className="k">Enterprise subscriptions acquired in two months post-research</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page 9 — AI / Side Projects (grid)
function PageProjects() {
  const projects = [
    { t:"MBA Buildathon — 2nd of 20", d:"Built and demoed a working Copilot-based prototype at the SEA MBA Tech Summit AI Workforce Transformation Buildathon, Microsoft Atlanta.", tags:["Copilot","Prototype","LLM"] },
    { t:"Android Phone Agent", d:"A phone agent that executes natural-language commands on Android end-to-end via the Claude API — no user input during navigation.", tags:["Claude API","Agent","Mobile"] },
    { t:"Pension AI Recommender", d:"Integrated an AI recommendation engine into a 17.9M-user bank product; tuned model parameters from behavior analysis, drove 13% YoY asset growth.", tags:["ML","Fintech","A/B"] },
    { t:"$130M Refund Workflow", d:"SQL-based refund engine with automated clawback logic; resolved $130M in crisis transactions at 100% regulatory compliance.", tags:["SQL","Ops","Compliance"] },
    { t:"Oriental Medicine Diagnostic", d:"AI-assisted diagnostic tool — cut intake questions from 58 to 15 while maintaining 95% accuracy. Productized into web + mobile.", tags:["Healthtech","ML","0→1"] },
    { t:"joonse.kr", d:"Personal site and writing, hand-built. A place to put thoughts that don't fit in a résumé bullet.", tags:["Personal","Writing"] },
  ];
  return (
    <div>
      <PageMark n={9} label="Projects" />
      <div className="row between" style={{alignItems:"flex-end"}}>
        <div>
          <div className="eyebrow">Selected Projects</div>
          <div className="h1 mt-16">Things I've shipped.</div>
        </div>
        <div className="mono small muted">06 projects · 2020 — 2026</div>
      </div>
      <div className="proj-grid mt-32">
        {projects.map((p,i)=>(
          <div className="proj" key={i}>
            <div className="idx">{String(i+1).padStart(2,'0')}</div>
            <h4>{p.t}</h4>
            <div className="desc">{p.d}</div>
            <div className="viz"></div>
            <div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page 10 — Skills matrix
function PageSkills() {
  const dots = (n) => <span className="dots">{[1,2,3,4,5].map(i=><i key={i} className={i<=n?"on":""}></i>)}</span>;
  const cols = [
    { h:"Product", items:[["Prioritization",5],["Roadmap Planning",5],["OKRs",5],["UX Review",4],["A/B Testing",4],["Product Strategy",4]]},
    { h:"Engineering", items:[["SQL",5],["Python",4],["React",4],["AWS",3],["ML / LLM",4],["System Design",3]]},
    { h:"Analytics", items:[["Tableau",4],["Power BI",4],["Advanced Excel",5],["Mixpanel",3],["SQL Analytics",5]]},
    { h:"Craft", items:[["Figma",4],["PRD Writing",5],["Stakeholder Mgmt",5],["Korean",5],["English",4],["Negotiation",4]]},
  ];
  return (
    <div>
      <PageMark n={10} label="Skills" />
      <div className="eyebrow">Capabilities</div>
      <div className="h1 mt-16">Skills <span style={{color:"var(--muted)"}}>— self-rated, honestly.</span></div>
      <div className="body-lg mt-16" style={{color:"var(--muted)",maxWidth:720}}>
        Cross-functional PM with an engineering spine. I prefer shipping working prototypes over writing decks about them.
      </div>
      <div className="skill-grid mt-48">
        {cols.map((c)=>(
          <div className="skill-col" key={c.h}>
            <h4>{c.h}</h4>
            <ul>{c.items.map(([name,n])=>(
              <li key={name}><span>{name}</span>{dots(n)}</li>
            ))}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Page 11 — Awards & Fun (heatmap + awards list)
function PageAwards() {
  // Generate a pseudo-random heatmap (deterministic) for 26×7 = 182 cells
  const seed = (i) => (Math.sin(i*12.9898)*43758.5453)%1;
  const level = (i) => {
    const v = Math.abs(seed(i));
    if (v<0.55) return "";
    if (v<0.78) return "l1";
    if (v<0.9) return "l2";
    if (v<0.97) return "l3";
    return "l4";
  };
  const awards = [
    ["2026","2nd Place · SEA MBA Tech Summit AI Buildathon","Microsoft Atlanta"],
    ["2024","Merit-based Scholarship · Duke Fuqua",""],
    ["2021","4th Place · UCPC National Algorithm Competition","Korea"],
    ["2019","Bronze · Nexon Game Design Competition",""],
  ];
  return (
    <div>
      <PageMark n={11} label="Awards & Fun" />
      <div className="eyebrow">Awards & Hobbies</div>
      <div className="h1 mt-16">Outside work.</div>
      <div className="row gap-32 mt-48" style={{alignItems:"flex-start"}}>
        <div className="stack gap-16" style={{flex:"1.1 1 0"}}>
          <div className="tag">Awards</div>
          <div className="stack">
            {awards.map(([y,t,s],i)=>(
              <div key={i} className="tl-row" style={{gridTemplateColumns:"90px 1fr auto",padding:"16px 0"}}>
                <div className="yr">{y}</div>
                <div><div className="co" style={{fontSize:18}}>{t}</div>{s&&<div className="ro">{s}</div>}</div>
                <div className="tag" style={{alignSelf:"center"}}>★</div>
              </div>
            ))}
          </div>
        </div>
        <div className="vrule"></div>
        <div className="stack gap-16" style={{flex:"1 1 0"}}>
          <div className="tag">Last 3.5 years · commits-to-side-projects</div>
          <div className="heat">
            {Array.from({length:26*7}).map((_,i)=><i key={i} className={level(i)}></i>)}
          </div>
          <div className="row between" style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--muted)",letterSpacing:".1em"}}>
            <span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span>
          </div>
          <div className="rule mt-16"></div>
          <div className="tag mt-16">Off-keyboard</div>
          <div className="body" style={{color:"var(--ink-2)"}}>
            Competitive programming (retired, mostly). Game design — the Nexon bronze was a 2-person RPG. Currently: learning American football because it's the Duke thing to do.
          </div>
        </div>
      </div>
    </div>
  );
}

// Page 12 — Contact
function PageContact() {
  return (
    <div>
      <PageMark n={12} label="Contact" />
      <div className="row between" style={{alignItems:"flex-start",height:"100%"}}>
        <div className="stack" style={{justifyContent:"space-between",height:"100%",flex:"1 1 0",paddingRight:48}}>
          <div>
            <div className="eyebrow">Let's talk</div>
            <div className="display mt-16" style={{fontSize:128}}>
              Thanks<br/><span style={{color:"var(--navy)",fontFamily:"var(--pf-serif)",fontStyle:"italic",fontWeight:400}}>for reading.</span>
            </div>
          </div>
          <div className="body-lg" style={{maxWidth:560,color:"var(--muted)"}}>
            I'm most interested in product roles in fintech, AI infrastructure, or 0→1 at venture-stage startups. Full-time Summer 2026 and beyond.
          </div>
        </div>
        <div className="stack" style={{flex:"1 1 0",paddingTop:40}}>
          <div className="contact-row"><div className="k">Email</div><div className="v"><a href="mailto:joonselim@gmail.com">joonselim@gmail.com</a></div></div>
          <div className="contact-row"><div className="k">Web</div><div className="v"><a href="https://joonse.kr" target="_blank" rel="noreferrer">joonse.kr</a></div></div>
          <div className="contact-row"><div className="k">Phone</div><div className="v">(213) 278-9295</div></div>
          <div className="contact-row"><div className="k">Based</div><div className="v">Durham, NC · open to relocation</div></div>
          <div className="contact-row"><div className="k">Status</div><div className="v">US Permanent Resident</div></div>
          <div className="contact-row"><div className="k">Currently</div><div className="v">Duke MBA '27 · seeking Summer '26 internship</div></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PageTitle, PageAbout, PageEducation, PageExperience,
  PageShinhan, PageStartup, PageForcs, PageProjects,
  PageSkills, PageAwards, PageContact,
});
