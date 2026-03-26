import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ROLES = [
  { text: "DATA SCIENCE",       color: "#f97316" },
  { text: "DATA ANALYTICS",     color: "#a78bfa" },
  { text: "DATA VISUALISATION", color: "#34d399" },
];

const HERO_STATS = [
  { value: "7.48", label: "CGPA",       color: "#a78bfa" },
  { value: "2027", label: "Graduating", color: "#34d399" },
  { value: "4+",   label: "Projects",   color: "#f97316" },
  { value: "1",    label: "Internship", color: "#38bdf8" },
];

function TypewriterMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed,    setDisplayed]    = useState("");
  const [isDeleting,   setIsDeleting]   = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pause = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(pause);
    }
    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((i) => (i + 1) % ROLES.length);
        return;
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }
    if (displayed.length < ROLES[currentIndex].text.length) {
      const t = setTimeout(
        () => setDisplayed(ROLES[currentIndex].text.slice(0, displayed.length + 1)), 90
      );
      return () => clearTimeout(t);
    }
    setIsPaused(true);
  }, [displayed, isDeleting, isPaused, currentIndex]);

  return (
    <span className="typewriter-text" style={{ color: ROLES[currentIndex].color }}>
      {displayed}
      <span className="cursor-blink" style={{ color: ROLES[currentIndex].color }}>▎</span>
    </span>
  );
}

export default function Hero() {
  const targetRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Name slides left as you scroll — same as original
  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  // Whole panel fades + shrinks slightly
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeIn = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .typewriter-text {
          display: inline-block; min-width: 2ch;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          letter-spacing: 0.05em;
        }
        .cursor-blink {
          display: inline-block; margin-left: 3px;
          animation: blink 1s step-end infinite; opacity: 0.8;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .hero-stats-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:1.5rem; }
        .hero-stat-pill {
          display:flex; align-items:center; gap:8px;
          padding:7px 14px; border-radius:100px; border:1.5px solid;
          background:transparent; backdrop-filter:blur(4px);
          transition:background 0.25s, transform 0.2s;
        }
        .hero-stat-pill:hover { transform:translateY(-2px); }
        .hero-stat-value {
          font-family:'Space Grotesk',sans-serif; font-weight:900;
          font-size:clamp(0.9rem,1.4vw,1.1rem); line-height:1;
        }
        .hero-stat-sep { width:1px; height:12px; background:currentColor; opacity:0.2; }
        .hero-stat-label {
          font-family:monospace; font-size:9px;
          text-transform:uppercase; letter-spacing:0.2em; opacity:0.55;
        }
        .glow-dot {
          width:6px; height:6px; border-radius:50%;
          background:var(--accent,#f97316);
          box-shadow:0 0 10px var(--accent,#f97316);
          animation:pulse-glow 2s infinite;
        }
        @keyframes pulse-glow { 0%,100%{opacity:1} 50%{opacity:0.5} }

        .hero-marquee-wrap {
          overflow:hidden;
          border-top:1px solid rgba(255,255,255,0.06);
          padding:12px 0;
        }
        .hero-marquee-track {
          display:flex; gap:4rem; white-space:nowrap;
          animation:marquee-left 22s linear infinite;
        }
        @keyframes marquee-left { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .hero-marquee-item {
          font-family:monospace; font-size:10px;
          text-transform:uppercase; letter-spacing:0.35em; opacity:0.2; flex-shrink:0;
        }
      `}</style>

      {/*
        ✅ h-[105vh] — only 5vh of extra scroll space (was 40vh before).
        Just enough for the name to animate, barely any gap before About.
        The sticky inner panel fills the screen; the 5vh overhang is
        consumed almost instantly as the user starts scrolling.
      */}
      <section ref={targetRef} className="relative overflow-hidden" style={{ height: "105vh" }}>
        <motion.div
          style={{ opacity, scale }}
          className="sticky top-0 h-screen flex flex-col justify-between py-10 px-6 md:px-14 overflow-hidden"
        >
          {/* Mouse orb */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
          >
            <div style={{
              width:"600px", height:"600px", borderRadius:"50%",
              background:"radial-gradient(circle,rgba(167,139,250,0.05) 0%,transparent 70%)",
              filter:"blur(60px)",
            }}/>
          </motion.div>

          {/* ── Top bar ── */}
          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="flex justify-between items-start relative z-10"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-2">
              <div className="glow-dot"/>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-mono">Available for hire</span>
            </motion.div>
            <motion.span variants={fadeIn} className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-mono">
              Portfolio — 2025
            </motion.span>
          </motion.div>

          {/* ── Center content ── */}
          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="relative z-10 flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.35em] opacity-40 font-mono block mb-3">
                Specialising in
              </span>
              <TypewriterMarquee />
            </motion.div>

            {/* ✅ Scroll-linked name — original behaviour restored */}
            <div className="overflow-hidden">
              <motion.h1
                style={{ x: xTranslate }}
                className="text-[13vw] font-grotesk font-black uppercase leading-none tracking-tighter opacity-95 select-none whitespace-nowrap"
              >
                SHREYASI SAHA&nbsp;&nbsp;·&nbsp;&nbsp;SHREYASI SAHA&nbsp;&nbsp;·
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="text-base md:text-lg font-inter max-w-lg leading-relaxed opacity-70">
              Turning complex datasets into{" "}
              <em className="not-italic opacity-50 text-white">actionable visual insights</em>{" "}
              and efficient software. Based in India, working globally.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-stats-row">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="hero-stat-pill"
                  style={{ borderColor:`${s.color}35`, background:`${s.color}0c` }}>
                  <span className="hero-stat-value" style={{ color:s.color }}>{s.value}</span>
                  <span className="hero-stat-sep"   style={{ background:s.color }}/>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Bottom row ── */}
          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="flex items-end justify-between relative z-10"
          >
            <motion.button
              variants={fadeIn}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
              className="flex items-center gap-4 opacity-40 hover:opacity-70 transition-opacity cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-5 h-10">
                <div className="w-[1px] h-full bg-white absolute top-0"/>
                <motion.div
                  animate={{ y:[0,10,0] }}
                  transition={{ repeat:Infinity, duration:1.8, ease:"easeInOut" }}
                  className="w-1 h-1 rounded-full bg-white absolute top-1"
                />
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all duration-300">
                Explore Journey
              </span>
            </motion.button>

            <motion.div variants={fadeIn} className="flex gap-5 items-center">
              {[
                { label:"GitHub",   href:"https://github.com/Shreyasi-0107" },
                { label:"LinkedIn", href:"https://www.linkedin.com/in/shreyasi0104" },
                { label:"Resume",   href:"public\\Shreyasi Saha general cv.pdf" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="text-[9px] uppercase tracking-[0.3em] opacity-35 hover:opacity-80 transition-opacity font-mono">
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Bottom marquee strip ── */}
          <div className="hero-marquee-wrap relative z-10">
            <div className="hero-marquee-track">
              {Array(10).fill(null).map((_,i) => (
                <span key={i} className="hero-marquee-item">
                  Data Science · Analytics · Visualisation · Python · Power BI ·&nbsp;
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </section>
    </>
  );
}