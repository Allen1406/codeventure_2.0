
import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Trophy,
  Users,
  CalendarDays,
  Mail,
  Phone,
  Menu,
  X,
  Sparkles,
  Terminal,
} from "lucide-react";
import "./styles.css";

/* =========================
   CONFIGURATION
========================= */

const registrationUrl = "https://unstop.com/";
// Replace with your actual Codeventure 2.0 Unstop event URL.

const rounds = [
  {
    number: "01",
    title: "ROUND ONE",
    subtitle: "The First Challenge",
    description:
      "Test your fundamentals, analytical thinking and coding knowledge. This stage is designed to challenge your logic and problem-solving skills.",
    tag: "QUALIFIER",
  },
  {
    number: "02",
    title: "ROUND TWO",
    subtitle: "Think Beyond the Code",
    description:
      "Move beyond the basics with a more challenging stage designed to test your creativity, technical understanding and ability to find effective solutions.",
    tag: "ADVANCED",
  },
  {
    number: "03",
    title: "ROUND THREE",
    subtitle: "Conquer the Impossible",
    description:
      "The final stage brings the strongest participants together to demonstrate their coding skills, strategic thinking and ability to perform under pressure.",
    tag: "GRAND FINALE",
  },
];

const faqs = [
  {
    question: "Who can participate in Codeventure 2.0?",
    answer:
      "Codeventure 2.0 is intended for college students. Final eligibility requirements and team rules will be announced by the organising team.",
  },
  {
    question: "Will the event be online or offline?",
    answer:
      "The event is planned in a hybrid format. Details about the format of individual rounds will be shared through official announcements.",
  },
  {
    question: "When will registrations open?",
    answer:
      "Registration dates and event details will be announced soon. Use the Register Now button to visit the registration platform.",
  },
  {
    question: "What are the prizes?",
    answer:
      "The prize details are yet to be announced. The confirmed prize pool and categories will be published on this website.",
  },
  {
    question: "Whom should I contact for help?",
    answer:
      "You can contact Dr. Akanksha Goel, Mrs. Anagha Kulkarni or student coordinator Allen Fernandez using the contact details provided on this website.",
  },
];

/* =========================
   REUSABLE COMPONENTS
========================= */

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}

/* Each round has its own scroll-linked animation.
   Hooks belong in this component, not inside a map callback. */

function RoundSlide({ round, index, progress }) {
  const start = index / 3;
  const end = (index + 1) / 3;

  const inputRange = [
    Math.max(0, start - 0.08),
    start + 0.04,
    end - 0.04,
    Math.min(1, end + 0.08),
  ];

  const outputRange =
    index === 0
      ? [1, 1, 0, 0]
      : index === 2
        ? [0, 0, 1, 1]
        : [0, 1, 1, 0];

  const opacity = useTransform(progress, inputRange, outputRange);

  const y = useTransform(
    progress,
    [
      Math.max(0, start - 0.08),
      start + 0.04,
      Math.min(1, end + 0.08),
    ],
    [60, 0, -60]
  );

  const scale = useTransform(
    progress,
    [Math.max(0, start - 0.08), start + 0.04],
    [0.96, 1]
  );

  return (
    <motion.article
      className="pinned-round-card"
      style={{ opacity, y, scale }}
      aria-label={round.title}
    >
      <div className="pinned-round-top">
        <span>CODEVENTURE / 2.0</span>
        <span>{round.tag}</span>
      </div>

      <div className="pinned-round-number">{round.number}</div>

      <div className="pinned-round-content">
        <span className="pinned-round-label">
          STAGE {round.number}
        </span>

        <h3>{round.title}</h3>
        <h4>{round.subtitle}</h4>
        <p>{round.description}</p>
      </div>

      <div className="pinned-round-bottom">
        <span>THINK. BUILD. CONQUER.</span>
        <span>{round.number} / 03</span>
      </div>
    </motion.article>
  );
}

/* =========================
   PINNED SCROLLING ROUNDS
========================= */

function PinnedRounds() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      className="pinned-rounds"
      id="rounds"
      ref={sectionRef}
    >
      <div className="pinned-rounds-stage">
        <div className="pinned-rounds-heading">
          <SectionLabel>02 / THE JOURNEY</SectionLabel>

          <h2>
            Three rounds.
            <br />
            <span>One bold mindset.</span>
          </h2>

          <p>KEEP SCROLLING TO DISCOVER EACH STAGE ↓</p>
        </div>

        <div className="pinned-rounds-visual">
          <div className="round-progress">
            <motion.div
              className="round-progress-fill"
              style={{ scaleX: scrollYProgress }}
            />
          </div>

          {rounds.map((round, index) => (
            <RoundSlide
              key={round.number}
              round={round}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <div className="pinned-rounds-hint">
          <ArrowDown size={16} />
          <span>SCROLL TO CONTINUE</span>
        </div>
      </div>
    </section>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  const navLinks = [
    ["About", "#about"],
    ["Rounds", "#rounds"],
    ["Prizes", "#prizes"],
    ["FAQs", "#faqs"],
    ["Contact", "#contact"],
  ];

  const closeIntro = () => {
    setIntroVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {/* =========================
          OPENING COLLEGE SCREEN
      ========================= */}

      <AnimatePresence>
        {introVisible && (
          <motion.section
            className="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.025 }}
            transition={{ duration: 0.7 }}
          >
            <div className="intro-grain" />

            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                className="college-logo"
                src="/dpu-logo.png"
                alt="Dr. D. Y. Patil School of Science and Technology"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <p className="university-name">
                DR. D. Y. PATIL VIDYAPEETH, PUNE
              </p>

              <p className="accreditation">
                Accredited (3rd Cycle) by NAAC with a CGPA of 3.64
                on a four-point scale at ‘A++’ Grade
              </p>

              <p className="accreditation">
                Declared as Category I University by UGC under
                Graded Autonomy Regulations – 2018
              </p>

              <p className="accreditation">
                An ISO 9001:2015 &amp; 14001:2015 Certified University
              </p>

              <p className="accreditation">
                Green Education Campus
              </p>

              <div className="intro-rule" />

              <h1 className="college-title">
                DR. D. Y. PATIL SCHOOL OF
                <br />
                SCIENCE &amp; TECHNOLOGY
              </h1>

              <p className="college-location">Tathawade, Pune</p>

              <p className="presents">
                APPROVED BY AICTE, GOVT. OF INDIA
              </p>

              <p className="presents">PRESENTS</p>

              <motion.div
                className="intro-event-title"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                <span className="intro-overline">
                  THE NEXT LEVEL STARTS HERE
                </span>

                <h2>
                  CODEVENTURE <span>2.0</span>
                </h2>

                <p>
                  THINK <em>FAST.</em> CODE <em>SMART.</em>
                </p>

                <p className="intro-impossible">
                  CONQUER THE <em>IMPOSSIBLE.</em>
                </p>
              </motion.div>

              <motion.button
                className="enter-button"
                onClick={closeIntro}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                ENTER THE EXPERIENCE
                <ArrowDown size={17} />
              </motion.button>
            </motion.div>

            <span className="intro-index">
              01 / CODEVENTURE 2.0
            </span>
          </motion.section>
        )}
      </AnimatePresence>

      {/* =========================
          NAVIGATION
      ========================= */}

      <header className="navbar">
        <a
          className="brand"
          href="#home"
          aria-label="Codeventure home"
        >
          <span className="brand-mark">
            C<span>.</span>
          </span>

          <span className="brand-text">
            CODEVENTURE <small>2.0</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {navLinks.map(([name, href]) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}

          <a
            className="nav-register"
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Register Now <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-content">
          <Reveal>
            <div className="eyebrow">
              <span className="live-dot" />
              DR. D. Y. PATIL SCHOOL OF SCIENCE &amp; TECHNOLOGY
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="hero-title">
              CODE
              <br />
              <span>VENTURE</span>
              <sup>2.0</sup>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="hero-tagline">
              THINK <em>FAST.</em> CODE <em>SMART.</em>
              <br />
              CONQUER THE <em>IMPOSSIBLE.</em>
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="hero-description">
              One challenge. Three rounds. Endless possibilities.
              <br />
              Bring your logic, sharpen your skills and make every line count.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="hero-actions">
              <a
                className="button-primary"
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                REGISTER NOW <ArrowUpRight size={18} />
              </a>

              <a className="button-secondary" href="#about">
                EXPLORE THE EVENT <ArrowDown size={17} />
              </a>
            </div>
          </Reveal>

          <div className="hero-bottom">
            <span>
              <Terminal size={15} />
              CODE. CREATE. CONQUER.
            </span>

            <span>AN INTER-COLLEGIATE TECHNICAL EXPERIENCE</span>
          </div>
        </div>

        <div className="hero-side-text">
          THINK DIFFERENTLY / BUILD BOLDLY
        </div>
      </section>

      {/* =========================
          MOVING TAGLINE
      ========================= */}

      <section className="ticker" aria-label="Event tagline">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index}>
              THINK FAST <b>✳</b> CODE SMART <b>✳</b>
              CONQUER THE IMPOSSIBLE <b>✳</b>
            </span>
          ))}
        </div>
      </section>

      {/* =========================
          EVENT HIGHLIGHTS
      ========================= */}

      <section className="stats-strip">
        <Reveal className="stat-item">
          <Code2 />
          <div>
            <strong>03</strong>
            <span>CHALLENGE ROUNDS</span>
          </div>
        </Reveal>

        <Reveal className="stat-item" delay={0.08}>
          <Users />
          <div>
            <strong>HYBRID</strong>
            <span>EVENT FORMAT</span>
          </div>
        </Reveal>

        <Reveal className="stat-item" delay={0.16}>
          <Trophy />
          <div>
            <strong>COMING SOON</strong>
            <span>PRIZE ANNOUNCEMENT</span>
          </div>
        </Reveal>

        <Reveal className="stat-item" delay={0.24}>
          <CalendarDays />
          <div>
            <strong>STAY TUNED</strong>
            <span>EVENT DATE</span>
          </div>
        </Reveal>
      </section>

      {/* =========================
          ABOUT
      ========================= */}

      <section className="about section-pad" id="about">
        <div className="about-left">
          <Reveal>
            <SectionLabel>01 / ABOUT THE EVENT</SectionLabel>

            <h2 className="section-title">
              Not just a competition.
              <br />
              <span>A test of how you think.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-copy">
              Codeventure 2.0 is a coding-focused technical event
              presented by Dr. D. Y. Patil School of Science &amp;
              Technology, Pune. Built around logical reasoning,
              problem-solving and technical creativity, it invites
              college students to challenge themselves and push
              beyond the obvious solution.
            </p>

            <p className="body-copy">
              The event is planned around a three-round journey
              and a hybrid format. Final round descriptions,
              eligibility rules, dates and participation guidelines
              will be announced by the organisers.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="about-quote">
              <span>“</span>
              <p>Great code begins with a better question.</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="about-visual" delay={0.15}>
          <div className="visual-card">
            <div className="visual-top">
              <span>CV_2.0 / SYSTEM</span>
              <span className="live-dot" />
            </div>

            <div className="code-window">
              <p><i>01</i> <span className="code-muted">// Your next challenge</span></p>
              <p><i>02</i> <span className="code-purple">function</span> <span className="code-yellow">conquer</span>() {"{"}</p>
              <p><i>03</i> &nbsp; <span className="code-purple">const</span> skills = <span className="code-green">"ready"</span>;</p>
              <p><i>04</i> &nbsp; <span className="code-purple">while</span> (challenge) {"{"}</p>
              <p><i>05</i> &nbsp;&nbsp; think();</p>
              <p><i>06</i> &nbsp;&nbsp; code();</p>
              <p><i>07</i> &nbsp; {"}"}</p>
              <p><i>08</i> &nbsp; <span className="code-purple">return</span> impossible;</p>
              <p><i>09</i> {"}"}</p>
            </div>

            <div className="visual-bottom">
              <Sparkles size={16} />
              THINKING IS YOUR SUPERPOWER.
            </div>
          </div>

          <div className="visual-stamp">
            THINK
            <br />
            / BUILD
            <br />
            / WIN
          </div>
        </Reveal>
      </section>

      {/* =========================
          COORDINATORS
      ========================= */}

      <section className="coordinators section-pad">
        <Reveal>
          <SectionLabel>THE PEOPLE BEHIND THE EVENT</SectionLabel>

          <h2 className="section-title">
            Need a hand? <span>We've got you.</span>
          </h2>

          <p className="body-copy coordinator-intro">
            For event-related questions, registration assistance or
            clarification, reach out to the coordinators below.
          </p>
        </Reveal>

        <div className="coordinator-grid">
          <Reveal className="coordinator-card">
            <span className="coordinator-type">
              FACULTY CO-ORDINATOR / 01
            </span>

            <h3>Dr. Akanksha Goel</h3>

            <a href="tel:7768868212">
              <Phone size={16} /> 7768868212
            </a>

            <span className="coordinator-role">
              Faculty Co-ordinator
            </span>
          </Reveal>

          <Reveal className="coordinator-card" delay={0.1}>
            <span className="coordinator-type">
              FACULTY CO-ORDINATOR / 02
            </span>

            <h3>Mrs. Anagha Kulkarni</h3>

            <a href="tel:9096652840">
              <Phone size={16} /> 9096652840
            </a>

            <a href="mailto:anagha.kulkarni@dpu.edu.in">
              <Mail size={16} /> anagha.kulkarni@dpu.edu.in
            </a>

            <span className="coordinator-role">
              Faculty Co-ordinator
            </span>
          </Reveal>

          <Reveal
            className="coordinator-card coordinator-student"
            delay={0.2}
          >
            <span className="coordinator-type">
              STUDENT CO-ORDINATOR / 03
            </span>

            <h3>Allen Fernandez</h3>

            <a href="tel:9054377338">
              <Phone size={16} /> 9054377338
            </a>

            <a href="mailto:fernandezallen234@gmail.com">
              <Mail size={16} /> fernandezallen234@gmail.com
            </a>

            <span className="coordinator-role">
              Student Co-ordinator
            </span>
          </Reveal>
        </div>
      </section>

      {/* =========================
          PINNED SCROLL ROUNDS
      ========================= */}

      <PinnedRounds />

      <p className="editorial-note rounds-note">
        Round structure and descriptions are provisional placeholders.
        Confirm the actual round formats before publishing.
      </p>

      {/* =========================
          PRIZES
      ========================= */}

      <section className="prizes section-pad" id="prizes">
        <div className="prize-glow" />

        <Reveal>
          <SectionLabel>03 / THE REWARD</SectionLabel>

          <Trophy className="prize-icon" size={45} />

          <h2 className="prize-title">
            Your skills.
            <br />
            <span>Your moment.</span>
          </h2>

          <p className="prize-description">
            The challenge comes first. The rewards are next.
            <br />
            Prize details are being finalised by the organising team.
          </p>

          <div className="prize-placeholder">
            <Sparkles size={18} />
            <span>PRIZE POOL TO BE ANNOUNCED</span>
          </div>

          <p className="prize-footnote">
            Official prize amounts and categories will be published
            here once confirmed.
          </p>
        </Reveal>
      </section>

      {/* =========================
          PREVIOUS EDITION
      ========================= */}

      <section className="legacy section-pad">
        <Reveal>
          <SectionLabel>THE LEGACY / PREVIOUS EDITION</SectionLabel>

          <h2 className="section-title">
            Built on a history
            <br />
            <span>of ambitious thinking.</span>
          </h2>

          <p className="body-copy">
            The original Codeventure: Game of Code in 2023 featured
            two online screening rounds followed by an on-campus final.
          </p>
        </Reveal>

        <div className="legacy-stats">
          <Reveal className="legacy-number">
            <strong>6,337</strong>
            <span>REGISTERED PARTICIPANTS IN 2023</span>
          </Reveal>

          <Reveal className="legacy-detail" delay={0.15}>
            <span>01 / ONLINE SCREENING</span>
            <span>02 / ONLINE SCREENING</span>
            <span>03 / ON-CAMPUS FINAL</span>
          </Reveal>
        </div>

        <p className="editorial-note">
          Historical figures relate to the 2023 edition, not Codeventure 2.0.
        </p>
      </section>

      {/* =========================
          FAQ
      ========================= */}

      <section className="faqs section-pad" id="faqs">
        <div className="faq-heading">
          <Reveal>
            <SectionLabel>04 / QUICK ANSWERS</SectionLabel>

            <h2 className="section-title">
              Questions?
              <br />
              <span>We've got answers.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-copy">
              Need to know something before registering? Start here,
              or contact our coordinators for further assistance.
            </p>
          </Reveal>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${
                openFaq === index ? "faq-active" : ""
              }`}
              key={faq.question}
            >
              <button
                className="faq-question"
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                aria-expanded={openFaq === index}
              >
                <span>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  {faq.question}
                </span>

                <ChevronDown
                  className={
                    openFaq === index ? "chevron-open" : ""
                  }
                />
              </button>

              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    className="faq-answer-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          REGISTRATION CTA
      ========================= */}

      <section className="register-cta section-pad">
        <Reveal>
          <span className="cta-overline">
            YOUR NEXT CHALLENGE AWAITS
          </span>

          <h2>
            READY TO
            <br />
            <span>CONQUER?</span>
          </h2>

          <p>Think fast. Code smart. Take the challenge.</p>

          <motion.a
            className="button-light"
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            REGISTER NOW <ArrowUpRight size={19} />
          </motion.a>

          <span className="cta-small">
            REGISTRATION DETAILS WILL BE UPDATED HERE
          </span>
        </Reveal>
      </section>

      {/* =========================
          CONTACT
      ========================= */}

      <section className="contact section-pad" id="contact">
        <div className="contact-heading">
          <Reveal>
            <SectionLabel>05 / GET IN TOUCH</SectionLabel>

            <h2 className="section-title">
              Let's get
              <br />
              <span>you started.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-copy">
              Have a question about the event, registration or participation?
              Contact the team for assistance.
            </p>
          </Reveal>
        </div>

        <div className="contact-grid">
          <Reveal className="contact-card">
            <span className="contact-label">FACULTY CONTACT</span>

            <h3>Mrs. Anagha Kulkarni</h3>

            <a href="tel:9096652840">
              <Phone size={16} /> 9096652840
            </a>

            <a href="mailto:anagha.kulkarni@dpu.edu.in">
              <Mail size={16} /> anagha.kulkarni@dpu.edu.in
            </a>
          </Reveal>

          <Reveal className="contact-card" delay={0.12}>
            <span className="contact-label">STUDENT CONTACT</span>

            <h3>Allen Fernandez</h3>

            <a href="tel:9054377338">
              <Phone size={16} /> 9054377338
            </a>

            <a href="mailto:fernandezallen234@gmail.com">
              <Mail size={16} /> fernandezallen234@gmail.com
            </a>
          </Reveal>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">
            C<span>.</span>
          </span>

          <span className="brand-text">
            CODEVENTURE <small>2.0</small>
          </span>
        </a>

        <p>THINK FAST. CODE SMART. CONQUER THE IMPOSSIBLE.</p>

        <a href="#home" className="back-top">
          BACK TO TOP ↑
        </a>

        <div className="footer-bottom">
          <span>
            DR. D. Y. PATIL SCHOOL OF SCIENCE &amp; TECHNOLOGY, PUNE
          </span>
          <span>CODEVENTURE 2.0</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
