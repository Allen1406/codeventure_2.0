import React, { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Code2, Trophy, Users,
  BrainCircuit, Terminal, CalendarDays, MapPin, ChevronDown, Zap, ShieldCheck,
  Palette, Cpu, Phone, Mail
} from "lucide-react";
import { eventConfig } from "./config";

const rounds = [
  {
    n: "01",
    mode: "ONLINE · PPT SUBMISSION",
    title: "Problem Statement Screening",
    text: "Choose a real-world problem and submit your proposed solution using the official PowerPoint presentation format. The organising team will evaluate the submissions and shortlist participants for the next stage.",
    detail: "WHAT TO SUBMIT",
    extra: "A PPT explaining the problem, who it affects, your proposed solution, how it would work, and the impact you expect it to create. The official PPT template will be linked here once released."
  },
  {
    n: "02",
    mode: "ONLINE · VIDEO SUBMISSION",
    title: "Solution Pitch Video",
    text: "Shortlisted participants move beyond the slides and present their idea on video. Explain the problem you selected, why it matters, and how your proposed solution addresses it.",
    detail: "WHAT TO SUBMIT",
    extra: "A recorded pitch video clearly walking through the problem and your solution. Submission instructions, duration limits, and upload link will be announced with the round guidelines."
  },
  {
    n: "03",
    mode: "OFFLINE · 24-HOUR HACKATHON",
    title: "Build the Working Prototype",
    text: "Finalists come together at Dr. D. Y. Patil School of Science & Technology for an intensive 24-hour, on-campus hackathon to turn their selected idea into a working prototype.",
    detail: "WHAT TO BUILD",
    extra: "A functional solution demonstrated through a web or mobile app interface. Hardware-based and software-based prototypes are both welcome, provided the solution works and can be demonstrated."
  }
];
const faqs = [
  ["Who can participate in Codeventure 2.0?", "The event is intended for college students across institutions. Final eligibility, team-size rules, and any branch or year restrictions will be shared in the official participation guidelines."],
  ["What are the three rounds?", "Round 1 is an online screening based on a PowerPoint submission explaining your chosen problem and proposed solution. Round 2 is an online video pitch for shortlisted participants. Round 3 is an offline, 24-hour hackathon at Dr. D. Y. Patil School of Science & Technology, Tathawade, Pune."],
  ["What should I include in the Round 1 PPT?", "Explain the problem clearly, who experiences it, why it needs to be solved, your proposed solution, how the solution would work, and its expected impact. The official PPT format will be provided by the organisers."],
  ["What should the Round 2 pitching video contain?", "Your video should clearly introduce the problem you selected, explain why it matters, walk viewers through your proposed solution, and communicate how it addresses the problem. Video duration and submission instructions will be announced with the round details."],
  ["What happens in the 24-hour hackathon?", "Qualified finalists will work on campus for 24 hours to build and demonstrate a working prototype of their proposed solution."],
  ["Can we build a hardware project, or does it have to be software?", "Both are welcome. You may build a software solution, such as a website or mobile app, or a hardware-based solution. The key requirement is that you produce a functional working prototype that can be demonstrated."],
  ["Do we need to attend the final round in person?", "Yes. The third round is planned as an offline, 24-hour hackathon at Dr. D. Y. Patil School of Science & Technology, Tathawade, Pune. Finalists will need to attend on campus."],
  ["Where will participants register?", "Registration will be handled through CodeChef. The button currently links to the official CodeChef website; the dedicated event registration page will replace it once published."],
  ["When will the event take place?", "17 May 2027 is being used as a tentative date for the website countdown. The date and schedule are not confirmed and may change."],
  ["What is the prize pool?", "The prize pool and award categories are being finalised. Confirmed details will be published on this website before registration closes."],
  ["Will the PPT template and submission links be available here?", "Yes. The official presentation template, video submission instructions, and relevant submission links will be added to this website once released by the organising team."],
  ["How can I contact the organisers?", "Use the faculty and student coordinator contact details in the Coordinators or Contact section of this website."]
];

function Countdown() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (!eventConfig.eventDateISO) return;
    const update = () => {
      const diff = new Date(eventConfig.eventDateISO).getTime() - Date.now();
      if (!Number.isFinite(diff) || diff <= 0) return setLeft(null);
      setLeft({ d: Math.floor(diff / 86400000), h: Math.floor(diff / 3600000 % 24), m: Math.floor(diff / 60000 % 60), s: Math.floor(diff / 1000 % 60) });
    };
    update(); const timer = setInterval(update, 1000); return () => clearInterval(timer);
  }, []);
  if (!left) return <span className="date-pending">DATE TO BE ANNOUNCED</span>;
  return <div className="timer">{[["d","DAYS"],["h","HRS"],["m","MIN"],["s","SEC"]].map(([k,l],i)=><React.Fragment key={k}>{i>0&&<b>:</b>}<span><strong>{String(left[k]).padStart(2,"0")}</strong><small>{l}</small></span></React.Fragment>)}</div>;
}

export default function App() {
  const [theme] = useState("burgundy");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => { const introTimer = setTimeout(() => setShowIntro(false), 2600); return () => clearTimeout(introTimer); }, []);
  const [activeFaq, setActiveFaq] = useState(0);
  const [message, setMessage] = useState("");

  const registration = () => {
    if (eventConfig.registrationUrl) window.open(eventConfig.registrationUrl, "_blank", "noopener,noreferrer");
    else {
      document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
      setMessage("The official registration link will be added here once announced.");
    }
  };
  const closeMenu = () => setMenuOpen(false);

  return <div className={`site theme-${theme}`}>
    {showIntro && <div className="intro-loader" role="status" aria-label="Loading Codeventure 2.0"><div className="intro-loader-inner"><img src="/dpu-logo.png" alt="Dr. D. Y. Patil School of Science and Technology logo" className="intro-loader-logo"/><p className="intro-loader-presents">PRESENTS</p><h1 className="intro-loader-title"><span>CODEVENTURE</span> <strong>2.0</strong></h1><div className="intro-loader-line"><span/></div></div></div>}
    <header className="header">
      <a className="brand" href="#home" onClick={closeMenu}><img className="brand-logo" src="/dpu-logo.png" alt="DPU logo"/><span className="brand-name">CODEVENTURE <small>2.0</small></span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav open" : "nav"}>
        {[["About","about"],["Rounds","rounds"],["Prizes","prizes"],["Coordinators","coordinators"],["FAQs","faqs"],["Contact","contact"]].map(([label,id])=><a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <button className="nav-cta" onClick={() => { closeMenu(); registration(); }}>Register <ArrowUpRight size={15}/></button>
      </nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-copy">
          <div className="institution-block">
            <div className="institution"><img className="institution-logo" src="/dpu-logo.png" alt="Dr. D. Y. Patil School of Science and Technology"/><span className="institution-rule"></span><div className="institution-copy"><small>DR. D. Y. PATIL VIDYAPEETH, PUNE</small><strong>DR. D. Y. PATIL SCHOOL OF SCIENCE &amp; TECHNOLOGY</strong></div></div>
            <div className="institution-meta">
              <span>Tathawade, Pune</span><span>APPROVED BY AICTE, GOVT. OF INDIA</span><span>PRESENTS</span>
            </div>
            <div className="accreditation-lines">
              <p>Accredited (3rd Cycle) by NAAC with a CGPA of 3.64 on a four-point scale at ‘A++’ Grade <i>•</i> Declared as Category I University by UGC under Graded Autonomy Regulations – 2018</p>
              <p>An ISO 9001:2015 &amp; 14001:2015 Certified University <i>•</i> Green Education Campus</p>
            </div>
          </div>
          <div className="presented"><span/> PRESENTS <span/></div>
          <div className="eyebrow"><i/> THE NEXT EVOLUTION OF CODE</div>
          <h1>CODEVENTURE <strong>2.0</strong></h1>
          <p className="tagline">THINK <em>FAST.</em> CODE <em>SMART.</em><br/>CONQUER THE <em>IMPOSSIBLE.</em></p>
          <p className="intro">A proving ground for sharp minds, bold ideas, and code that solves real problems.</p>
          <div className="actions"><button className="button primary" onClick={registration}>Register Now <ArrowUpRight size={17}/></button><a className="button secondary" href="#about">Explore the event <ArrowDown size={15}/></a></div>
          <div className="hero-details">
            <div><CalendarDays/><small>EVENT DATE</small><strong>{eventConfig.dateLabel}</strong></div>
            <div><MapPin/><small>VENUE</small><strong>DYPSST · TATHAWADE, PUNE</strong></div>
            <div><Cpu/><small>FORMAT</small><strong>HYBRID</strong></div>
            <div><Users/><small>ELIGIBILITY</small><strong>ALL COLLEGE STUDENTS</strong></div>
          </div>
          <div className="countdown-wrap"><span className="countdown-label">COUNTDOWN TO THE CHALLENGE</span><Countdown/></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-a"></div><div className="visual-orbit orbit-b"></div>
          <div className="code-window window-one"><div className="window-bar"><i/><i/><i/><span>challenge.js</span></div><pre><b>function</b> solve(input) {'{'}<br/>  <em>const</em> logic = think(input);<br/>  <em>return</em> build(logic);<br/>{'}'}<br/><br/><span>// your next move starts here</span></pre></div>
          <div className="code-window window-two"><div className="window-bar"><i/><i/><i/><span>terminal</span></div><pre><b>&gt; compile</b><br/>Success ✓<br/><b>&gt; compete</b><br/>Ready ✓</pre></div>
          <div className="hero-emblem"><Code2/><span>CV / 02</span></div>
          <div className="visual-label label-one">01 / THINK</div><div className="visual-label label-two">02 / BUILD</div><div className="visual-label label-three">03 / CONQUER</div>
        </div>
        <div className="hero-foot"><span>BUILT FOR PROBLEM SOLVERS</span><span>THINK · BUILD · CONQUER</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="quick-info">
        <div><Terminal/><span><b>REAL PROBLEMS</b><small>Logic meets application</small></span></div>
        <div><Users/><span><b>WIDER PARTICIPATION</b><small>College students across institutions</small></span></div>
        <div><Trophy/><span><b>PRIZES &amp; RECOGNITION</b><small>Details to be announced</small></span></div>
        <div><Zap/><span><b>LEARN &amp; GROW</b><small>Challenge your limits</small></span></div>
      </section>

      <section className="section" id="about">
        <div className="section-kicker">01 / THE MISSION <span/></div>
        <div className="section-heading"><h2>Think beyond<br/><em>the obvious.</em></h2><p>Codeventure 2.0 brings student coders together to test their logic, creativity, and ability to turn challenging problems into elegant solutions.</p></div>
        <div className="feature-grid">
          <article><small>A—01</small><BrainCircuit/><h3>Logic first.</h3><p>Break complex problems into clear, efficient solutions. Every line of code starts with a better question.</p></article>
          <article><small>A—02</small><Code2/><h3>Build smarter.</h3><p>Experiment with approaches, sharpen your fundamentals, and find elegance in a difficult challenge.</p></article>
          <article><small>A—03</small><Trophy/><h3>Earn your edge.</h3><p>Compete with fellow students, learn through the process, and let your work speak for itself.</p></article>
        </div>
      </section>

      <section className="coordinators-section section" id="coordinators"><div className="section-kicker">THE PEOPLE BEHIND THE EVENT <span/></div><div className="section-heading"><h2>Need a hand?<br/><em>We’ve got you.</em></h2><p>For event-related questions, registration assistance or clarification, reach out to the coordinators below.</p></div><div className="coordinator-grid"><article className="coordinator-card"><small>FACULTY CO-ORDINATOR / 01</small><h3>Dr. Akanksha Goel</h3><a href="tel:7768868212"><Phone/>7768868212</a><p>Faculty Co-ordinator</p></article><article className="coordinator-card"><small>FACULTY CO-ORDINATOR / 02</small><h3>Mrs. Anagha Kulkarni</h3><a href="tel:9096652840"><Phone/>9096652840</a><a href="mailto:anagha.kulkarni@dpu.edu.in"><Mail/>anagha.kulkarni@dpu.edu.in</a><p>Faculty Co-ordinator</p></article><article className="coordinator-card"><small>STUDENT CO-ORDINATOR / 03</small><h3>Allen Fernandez</h3><a href="tel:9054377338"><Phone/>9054377338</a><a href="mailto:fernandezallen234@gmail.com"><Mail/>fernandezallen234@gmail.com</a><p>Student Co-ordinator</p></article></div></section>
      <section className="rounds-section" id="rounds"><div className="section">
        <div className="section-kicker">02 / THE COMPETITION <span/></div>
        <div className="section-heading"><h2>Three stages.<br/><em>One ambition.</em></h2><p>The original edition used two online screening rounds and a campus final. This is a proposed structure for 2.0; final rounds and platforms must be confirmed.</p></div>
        <div className="round-list">{rounds.map(r=><article key={r.n}><strong>{r.n}</strong><div><small>{r.mode}</small><h3>{r.title}</h3><p>{r.text}</p></div><ArrowRight/></article>)}</div>
        <p className="disclaimer">Proposed structure only. Official dates, platforms, rules, team size, and qualification criteria will be announced by the organizers.</p>
      </div></section>

      <section className="prize-section section" id="prizes">
        <div><div className="section-kicker">03 / THE REWARD <span/></div><h2>Make your<br/><em>code count.</em></h2><p>Great problem-solving deserves recognition. The prize pool and winner benefits will be revealed once confirmed.</p><button className="inline-link" onClick={registration}>Get ready to compete <ArrowRight size={16}/></button></div>
        <div className="prize-art"><div className="prize-rings"></div><Trophy/><small>CODEVENTURE 2.0 / REWARDS</small><strong>{eventConfig.prizePool}</strong><span>OFFICIAL DETAILS COMING SOON</span></div>
      </section>

      <section className="register-section section" id="register">
        <div><div className="section-kicker">04 / YOUR NEXT MOVE <span/></div><h2>Your next line<br/><em>starts here.</em></h2><p>Ready to take the challenge? Registration will be managed through CodeChef. The dedicated Codeventure 2.0 event page will be linked here once it is published.</p><div className="eligibility"><ShieldCheck/><span><b>Open to college students</b><small>Final eligibility rules will be published soon.</small></span></div></div>
        <div className="register-card"><div className="card-top">CODEVENTURE / 02 <span>REGISTRATION</span></div><h3>Enter the challenge.</h3><p>Visit CodeChef for the official contest and registration information. The dedicated event page will be linked here once available.</p><button className="button primary wide" onClick={registration}>Visit CodeChef <ArrowUpRight size={16}/></button>{message&&<p className="status-message">{message}</p>}<small className="form-note">Registration is not complete until the official platform confirms your entry.</small></div>
      </section>

      <section className="contact-section section" id="contact"><div className="section-kicker">05 / GET IN TOUCH <span/></div><div className="section-heading"><h2>Let’s get<br/><em>you started.</em></h2><p>Have a question about the event, registration or participation? Contact the team for assistance.</p></div><div className="contact-grid"><article><small>FACULTY CONTACT</small><h3>Mrs. Anagha Kulkarni</h3><a href="tel:9096652840"><Phone/>9096652840</a><a href="mailto:anagha.kulkarni@dpu.edu.in"><Mail/>anagha.kulkarni@dpu.edu.in</a></article><article><small>STUDENT CONTACT</small><h3>Allen Fernandez</h3><a href="tel:9054377338"><Phone/>9054377338</a><a href="mailto:fernandezallen234@gmail.com"><Mail/>fernandezallen234@gmail.com</a></article></div></section>
      <section className="faq-section" id="faqs"><div className="section">
        <div className="section-kicker">06 / GOOD TO KNOW <span/></div><div className="section-heading"><h2>Questions?<br/><em>Start here.</em></h2><p>Find out how the PPT screening, video pitch, and 24-hour prototype-building hackathon work.</p></div>
        <div className="faq-list">{faqs.map(([q,a],i)=><article key={q}><button onClick={()=>setActiveFaq(activeFaq===i?-1:i)} aria-expanded={activeFaq===i}>{q}<ChevronDown className={activeFaq===i?"rotated":""}/></button>{activeFaq===i&&<p>{a}</p>}</article>)}</div>
      </div></section>
    </main>

    <footer className="footer"><div className="footer-main"><a className="brand" href="#home"><img className="brand-logo" src="/dpu-logo.png" alt="DPU logo"/><span className="brand-name">CODEVENTURE <small>2.0</small></span></a><p>THINK FAST. CODE SMART.<br/>CONQUER THE IMPOSSIBLE.</p><a href="#home">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} CODEVENTURE 2.0</span><span>DR. D. Y. PATIL SCHOOL OF SCIENCE &amp; TECHNOLOGY · PUNE</span></div></footer>

  </div>;
}
