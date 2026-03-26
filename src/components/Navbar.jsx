import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RobotSVG } from "./Loader";

const LINKS = ["About", "Education", "Skills", "Projects", "Certificates", "Internship", "Contact"];
const CV_URL = "public\\Shreyasi Saha general cv.pdf";

export default function Navbar({ theme, toggleTheme }) {
  const [active,   setActive]   = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const offsets = LINKS.map(link => {
        const el = document.getElementById(link.toLowerCase());
        if (!el) return { link, top: Infinity };
        return { link, top: Math.abs(el.getBoundingClientRect().top) };
      });
      setActive(offsets.reduce((a, b) => a.top < b.top ? a : b).link);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

        /* ── Logo Container Positioning ── */
        .nav-logo-btn {
          position: fixed;
          /* Adjusted left calculation: slightly less aggressive offset (-95px) 
             to keep it snug against the 1500px border */
          left: max(10px, calc((100vw - 1500px) / 2 - 95px));
          top: 22px;
          z-index: 161;
          pointer-events: auto;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          line-height: 1;
        }

        /* ── Logo Prefix (Shreyasi's) Scaled Down ── */
        .nav-logo-prefix {
          font-family: 'Playfair Display', serif; 
          font-weight: 700;
          
          /* Reduced from 15px to 12px */
          font-size: clamp(9px, 1vw, 12px); 
          color: var(--color-text, #e8e0d8);
          opacity: 0.7;
          letter-spacing: 0.02em;
          text-transform: none;
          line-height: 1.1;
          margin-bottom: 1px; 
          white-space: nowrap;
          transition: opacity 0.3s;
        }
        
        .nav-logo-port {
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* ── Main Word (PORTFLIO) Scaled Down ── */
        .nav-logo-word {
          font-family: 'Vendura', 'Oswald', 'Barlow Condensed', sans-serif;
          font-weight: 800;
          /* Reduced from 17px to 14px */
          font-size: clamp(10px, 1.2vw, 14px);
          color: #f97316;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          line-height: 1;
          transition: opacity 0.3s;
        }

        .nav-logo-btn:hover .nav-logo-word    { opacity: 0.75; }
        .nav-logo-btn:hover .nav-logo-prefix  { opacity: 0.55; }

        /* ── Nav links container ── */
        .nav-links-wrap {
          position: fixed;
          right: max(10px, calc((100vw - 1500px) / 2 - 95px));
          top: 25px;
          z-index: 161;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        /* ── Nav link ── */
        .nav-link {
          position: relative;
          display: block;
          overflow: hidden;
          height: 1.2em;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          font-size: 8.5px; /* Slightly smaller for balance */
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: inherit;
          opacity: 0.35;
          transition: opacity 0.3s;
          padding: 0;
          text-align: right;
        }
        .nav-link:hover  { opacity: 1; }
        .nav-link.active { opacity: 1; }
        .nav-link .label-wrap {
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .nav-link:hover .label-wrap { transform: translateY(-50%); }
        .nav-link .top,
        .nav-link .bot  { display: block; line-height: 1.2em; white-space: nowrap; }
        .nav-link.active .top::before { content:'·'; margin-right:4px; color:#f0771a; }

        /* ── Resume btn ── */
        .resume-btn {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 100px;
          border: 1.2px solid rgba(249,115,22,0.55);
          background: rgba(249,115,22,0.07); color: #f97316;
          font-family: inherit; font-size: 8px; font-weight: 900;
          text-transform: uppercase; letter-spacing: 0.2em;
          cursor: pointer; text-decoration: none;
          transition: all 0.25s; white-space: nowrap; margin-top: 6px;
        }
        .resume-btn:hover { background: rgba(249,115,22,0.18); color: #fff; transform: scale(1.02); }

        .theme-btn {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 9px;
          color: inherit; transition: background 0.2s, border-color 0.2s;
        }
        .theme-btn:hover { background: rgba(240,119,26,0.12); border-color: rgba(240,119,26,0.4); }

        .hamburger-line {
          width: 14px; height: 1.2px; background: currentColor;
          border-radius: 2px; transition: transform 0.3s, opacity 0.3s; display: block;
        }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 140;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(24px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 28px;
        }
        .mobile-link {
          font-family: inherit; font-size: clamp(1.8rem,6vw,3.5rem);
          font-weight: 900; text-transform: uppercase; letter-spacing: -0.03em;
          opacity: 0.3; cursor: pointer; transition: opacity 0.2s;
          background: none; border: none; color: inherit;
        }
        .mobile-link:hover, .mobile-link.active { opacity: 1; }

        /* ── Light mode ── */
        [data-theme="light"] .nav-logo-prefix { color: #0a0a0a !important; opacity: 0.8 !important; }
        [data-theme="light"] .nav-logo-word   { color: #c94d00 !important; }
        [data-theme="light"] .nav-link        { color: #111 !important; opacity: 0.6 !important; }
        [data-theme="light"] .theme-btn { border-color: rgba(0,0,0,0.2) !important; color: #111 !important; }
        [data-theme="light"] .mobile-menu { background: rgba(237,234,228,0.98) !important; }
      `}</style>

      {/* ── Mobile Menu (Same Logic) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="mobile-menu">
            {LINKS.map((link, i) => (
              <motion.button key={link}
                initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
                onClick={() => scrollTo(link)}
                className={`mobile-link ${active===link?"active":""}`}>
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logo — Fixed Outside ── */}
      <motion.button
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
        className="nav-logo-btn"
      >
        <span className="nav-logo-prefix">Shreyasi's</span>
        <span className="nav-logo-port">
          <span className="nav-logo-word">PORTF</span>
          {/* Reduced Robot size from 16 to 13 */}
          <RobotSVG size={13} color="#f97316" animated={true} />
          <span className="nav-logo-word">LIO</span>
        </span>
      </motion.button>

      {/* ── Desktop nav links ── */}
      <motion.div className="nav-links-wrap hidden md:flex">
        {LINKS.map(link => (
          <button key={link} onClick={() => scrollTo(link)}
            className={`nav-link ${active===link?"active":""}`}>
            <span className="label-wrap">
              <span className="top">{link}</span>
              <span className="bot">{link}</span>
            </span>
          </button>
        ))}
        <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="resume-btn">
          Resume
        </a>
        <button onClick={toggleTheme} className="theme-btn mt-1">
          {theme==="dark" ? "☀" : "🌙"}
        </button>
      </motion.div>

      {/* ── Mobile: hamburger ── */}
      <div className="flex md:hidden items-center gap-2 pointer-events-auto"
        style={{
          position: "fixed",
          right: "max(10px, calc((100vw - 1500px) / 2 - 75px))",
          top: 25,
          zIndex: 161,
        }}>
        <button onClick={toggleTheme} className="theme-btn">{theme==="dark" ? "☀" : "🌙"}</button>
        <button onClick={() => setMenuOpen(o => !o)}
          className="theme-btn flex flex-col gap-[3.5px] items-center justify-center">
          <span className="hamburger-line" style={{ transform:menuOpen?"translateY(4.7px) rotate(45deg)":"none" }}/>
          <span className="hamburger-line" style={{ opacity:menuOpen?0:1 }}/>
          <span className="hamburger-line" style={{ transform:menuOpen?"translateY(-4.7px) rotate(-45deg)":"none" }}/>
        </button>
      </div>
    </>
  );
}