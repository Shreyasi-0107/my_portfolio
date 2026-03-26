import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Project from './components/Project';
import Contact from './components/Contact';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Internship from './components/Internship';
import MyCursor from './components/MyCursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [showMain, setShowMain] = useState(false);
  const [theme, setTheme]       = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#0A0A0A' : '#F5F3EF';
    document.body.style.color           = theme === 'dark' ? '#C7BFB2' : '#1A1A1A';
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Section snap — after scroll stops, snap to nearest section
    const SECTIONS = [
      "home", "about", "education", "skills",
      "projects", "certificates", "internship", "contact"
    ];
    let snapTimer;
    let isSnapping = false;

    const onScroll = () => {
      if (isSnapping) return;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        let closest    = null;
        let closestDist = Infinity;
        SECTIONS.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          const rect  = el.getBoundingClientRect();
          const elTop = window.scrollY + rect.top;
          const dist  = Math.abs(elTop - window.scrollY);
          if (dist < closestDist) { closestDist = dist; closest = elTop; }
        });
        if (closest !== null && Math.abs(closest - window.scrollY) > 10) {
          isSnapping = true;
          lenis.scrollTo(closest, {
            duration: 1.2,
            onComplete: () => { isSnapping = false; },
          });
        }
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: theme === 'dark' ? '#0A0A0A' : '#F5F3EF',
        color:           theme === 'dark' ? '#C7BFB2' : '#1A1A1A',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      <AnimatedBackground />

      {/* MyCursor writes --m-x, --m-y, --radius, --scroll-y every frame */}
      <MyCursor />

      <AnimatePresence mode="wait">
        {!showMain && (
          <Loader key="loader" finishLoading={() => setShowMain(true)} />
        )}
      </AnimatePresence>

      {showMain && (
        <div className="relative">
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <div className="main-wrapper">

            {/* ── Base layer — normal beige/dark content ── */}
            <div className="base-content relative z-10">
              <PortfolioContent isMask={false} />
            </div>

            {/* ── Orange mask layer ──────────────────────────────────────
                position: fixed (set in index.css)
                clip-path driven by --m-x / --m-y / --radius CSS vars
                Inner div offset by --scroll-y so content stays aligned
                aria-hidden: screen-readers skip the duplicate
                pointer-events: none (set in index.css via .mask-content)
            ─────────────────────────────────────────────────────────── */}
            <div className="mask-content" aria-hidden="true">
              <div>
                {/*
                  ✅ Fix 2: Use the SAME components as the base layer.
                  Removed ProjectMask / ContactMask — different DOM
                  structures caused text misalignment in the spotlight.
                  Images/canvas are hidden via index.css rules so they
                  don't show through the orange mask.
                */}
                <PortfolioContent isMask={true} />
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// PortfolioContent
// Renders identical JSX for both the base layer and the mask layer.
// isMask only controls whether section IDs are added (they're only
// needed on the base layer for scroll-snap / navbar links).
// ─────────────────────────────────────────────────────────────────
function PortfolioContent({ isMask = false }) {
  return (
    <div
      className="max-w-375 mx-auto px-6 md:px-20 relative"
      style={{
        borderLeft:  "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* 1. Home / Hero */}
      <div id={isMask ? undefined : "home"}>
        <Hero />
      </div>

      {/* 2. About */}
      <div id={isMask ? undefined : "about"} className="relative z-20">
        <About />
      </div>
      {/* 5. Education */}
      <div id={isMask ? undefined : "education"}>
        <Education />
      </div>

      {/* 3. Skills */}
      <div id={isMask ? undefined : "skills"}>
        <Skills />
      </div>

      {/* 4. Projects ✅ same component both layers */}
      <div id={isMask ? undefined : "projects"}>
        <Project />
      </div>

      

      {/* 6. Certificates */}
      <div id={isMask ? undefined : "certificates"}>
        <Certificates />
      </div>

      {/* 7. Internship */}
      <div id={isMask ? undefined : "internship"}>
        <Internship />
      </div>

      {/* 8. Contact ✅ same component both layers */}
      <div id={isMask ? undefined : "contact"}>
        <Contact />
      </div>
    </div>
  );
}

export default App;