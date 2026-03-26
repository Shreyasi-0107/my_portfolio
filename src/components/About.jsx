import { motion } from "framer-motion";
import { Eye, Download, Mail, MapPin, GraduationCap, Briefcase } from "lucide-react";

const cvPath = "/Shreyasi_Saha_general_cv.pdf";

const STATS = [
  { value: "7.48", label: "B.Tech CGPA",    color: "#a78bfa" },
  { value: "4+",   label: "Projects done",  color: "#f97316" },
  { value: "1",    label: "Internship",     color: "#34d399" },
  { value: "10+",  label: "Tools mastered", color: "#38bdf8" },
];

const TIMELINE = [
  {
    year: "Aug 2023 – Present",
    icon: GraduationCap,
    title: "B.Tech — Computer Science",
    sub: "Lovely Professional University, Punjab · CGPA 7.48",
    color: "#a78bfa",
  },
  {
    year: "Jun – Jul 2025",
    icon: Briefcase,
    title: "Data Science Intern",
    sub: "Skillcraft Technology · Python, Pandas, Scikit-learn",
    color: "#34d399",
  },
];

const PHOTO_TAGS = [
  { label: "Data Enthusiast",   color: "#a78bfa" },
  { label: "Python Dev",        color: "#f97316" },
  { label: "Visual Storyteller",color: "#34d399" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } 
  }),
};

function StatCard({ value, label, color, delay }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay} initial="hidden" whileInView="visible" viewport={{ once: true }}
      whileHover={{ y: -3, transition: { duration: 0.22 } }}
      className="p-5 border border-white/10 rounded-[20px] flex flex-col justify-between gap-2 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >
      <span className="text-2xl font-grotesk font-black leading-none" style={{ color }}>{value}</span>
      <p className="text-[9px] uppercase tracking-[0.3em] opacity-35 font-mono leading-relaxed">{label}</p>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: color, transformOrigin: "left" }}
        className="h-[1.5px] w-full rounded-full opacity-40"
      />
    </motion.div>
  );
}

function TimelineItem({ item, i }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp} custom={i * 0.1 + 0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="flex gap-4 items-start">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}>
          <Icon size={14} style={{ color: item.color }} />
        </div>
        {i < TIMELINE.length - 1 && (
          <div className="w-[1px] flex-1 min-h-[32px] mt-1" style={{ background: `${item.color}20` }} />
        )}
      </div>
      <div className="pb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-30 block mb-1">{item.year}</span>
        <p className="font-grotesk font-black text-base uppercase tracking-tight leading-snug">{item.title}</p>
        <p className="text-xs opacity-35 font-mono mt-0.5">{item.sub}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <style>{`
        .cv-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 11px 24px; border-radius: 100px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.4);
          font-size: 11px; font-family: inherit;
          text-transform: uppercase; letter-spacing: 0.25em; font-weight: 700;
          cursor: pointer; text-decoration: none; color: #f97316;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .cv-btn-outline:hover { background: rgba(249,115,22,0.18); border-color: rgba(249,115,22,0.7); color: #fff; }

        .cv-btn-filled {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 11px 24px; border-radius: 100px;
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.35);
          font-size: 11px; font-family: inherit;
          text-transform: uppercase; letter-spacing: 0.25em; font-weight: 700;
          cursor: pointer; text-decoration: none; color: #a78bfa;
          transition: background 0.2s, border-color 0.2s;
        }
        .cv-btn-filled:hover { background: rgba(167,139,250,0.22); border-color: rgba(167,139,250,0.6); }

        .meta-row { display: flex; align-items: center; gap: 10px; opacity: 0.45; }
        .meta-row span { font-size: 13px; font-family: inherit; }

        /* ── PHOTO WRAP: Increased size and negative margin ── */
        .about-photo-wrap {
          width: 100%; 
          max-width: 240px; /* Increased from 180px */
          margin-top: -45px; /* Pulls photo UPWARDS */
          aspect-ratio: 3/4;
          border-radius: 120px 120px 25px 25px;
          overflow: hidden;
          border: 1.5px solid rgba(167,139,250,0.35);
          box-shadow: 0 0 0 5px rgba(167,139,250,0.07), 0 0 40px rgba(167,139,250,0.18), 0 20px 56px rgba(0,0,0,0.5);
          background: #111;
          transition: box-shadow 0.4s, border-color 0.4s;
          flex-shrink: 0;
          position: relative;
        }
        .about-photo-wrap::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }
        .about-photo-wrap:hover {
          border-color: rgba(167,139,250,0.7);
          box-shadow: 0 0 0 8px rgba(167,139,250,0.1), 0 0 60px rgba(167,139,250,0.28), 0 20px 56px rgba(0,0,0,0.6);
        }
        .about-photo-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 10%;
          transition: transform 0.5s ease;
        }
        .about-photo-wrap:hover img { transform: scale(1.04); }

        .photo-tag-wrap { display: flex; flex-direction: column; gap: 6px; padding-top: 10px; }
        .photo-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 11px; border-radius: 100px;
          font-family: monospace; font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          border: 1px solid; width: fit-content;
        }
        .photo-tag-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        [data-theme="light"] .cv-btn-outline { background: rgba(249,115,22,0.06); border-color: rgba(249,115,22,0.5); color: #d4580a; }
        [data-theme="light"] .cv-btn-outline:hover { background: rgba(249,115,22,0.14); color: #111; }
        [data-theme="light"] .about-photo-wrap { border-color: rgba(167,139,250,0.5); background: #e8e4df; }
        [data-theme="light"] .photo-tag { background: rgba(0,0,0,0.03) !important; }
      `}</style>

      <section id="about" className="py-32 border-t border-white/10 px-6 md:px-12 relative z-20">

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.35em] opacity-25 mb-6">
          Who I am
        </motion.p>

        <motion.h2 variants={fadeUp} custom={0.05} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="section-heading mb-14">
          About <span className="opacity-25">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-10">
            <motion.p variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-base md:text-lg opacity-60 leading-relaxed max-w-xl">
              I'm a passionate{" "}
              <span className="text-[#a78bfa] font-bold opacity-100">Data Science & Computer Science student</span>{" "}
              with a strong foundation in Python, C++, and Web Technologies. I love building clean,
              functional, user-centric applications — and I'm currently exploring the depths of Data
              Analytics and AI integration to solve real-world problems.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-3">
              <div className="meta-row"><Mail size={15} color="#a78bfa" /><span>shreyasisaha0107@gmail.com</span></div>
              <div className="meta-row"><MapPin size={15} color="#a78bfa" /><span>Phagwara, Punjab, India</span></div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.25} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-wrap gap-4">
              <a href={cvPath} target="_blank" rel="noreferrer" className="cv-btn-outline">
                <Eye size={13} /> View CV
              </a>
              <a href={cvPath} download className="cv-btn-filled">
                <Download size={13} /> Download CV
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-25 mb-6">Timeline</p>
              {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} i={i} />)}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeUp} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex items-start gap-8">

              <div className="flex flex-col items-center">
                {/* Frame is now larger (240px) and moved up via CSS margin */}
                <div className="about-photo-wrap">
                  <img src="/Profile.jpeg" alt="Shreyasi Saha" />
                </div>
                {/* Labels stretched to match new frame width */}
                <div className="photo-tag-wrap" style={{ width: "100%", maxWidth: 240 }}>
                  {PHOTO_TAGS.map((tag, i) => (
                    <motion.div
                      key={tag.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="photo-tag"
                      style={{ borderColor: `${tag.color}35`, background: `${tag.color}0d`, color: tag.color }}
                    >
                      <span className="photo-tag-dot" style={{ background: tag.color }} />
                      {tag.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stat cards on the right of the photo */}
              <div className="flex flex-col gap-3 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-25 mb-1">By the numbers</p>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08 + 0.15} />)}
                </div>
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div variants={fadeUp} custom={0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="p-8 rounded-[28px] border border-white/10 bg-white/[0.02]">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-25 mb-4">Currently</p>
              <p className="font-grotesk font-black text-xl uppercase tracking-tight leading-snug opacity-85">
                Open to internships, data science roles &amp; freelance projects.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 opacity-70">
                  Available now
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}