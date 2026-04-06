import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal, Cpu, Database, Network, Award, BookOpen, Camera, Music, ExternalLink, Code, Layers, Sparkles, Youtube, Download, GraduationCap, Trophy, Target, Globe, Smartphone, Microchip, X } from 'lucide-react';
import { projects, experience, education, extracurricular, awards, researchInfo, hobbies, competitiveProgramming } from '../data/terminalData';

gsap.registerPlugin(ScrollTrigger);

// ── PROJECTS TABBED SECTION ──────────────────────────────────────────────────
const PROJECT_TABS = [
  {
    id: 'website',
    label: 'Websites',
    icon: Globe,
    accent: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/50',
      bg: 'bg-emerald-950/30',
      tagBg: 'bg-emerald-950/30',
      tagBorder: 'border-emerald-900/30',
      tagText: 'text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/50',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]',
      gradFrom: 'from-emerald-500/5',
      activeBg: 'bg-emerald-500/10',
      activeBorder: 'border-emerald-500/40',
      glow: 'from-emerald-500/50',
      linkText: 'text-emerald-400',
      linkHover: 'hover:text-emerald-300',
      dot: 'bg-emerald-400',
    }
  },
  {
    id: 'app',
    label: 'Apps',
    icon: Smartphone,
    accent: {
      text: 'text-violet-400',
      border: 'border-violet-500/50',
      bg: 'bg-violet-950/30',
      tagBg: 'bg-violet-950/30',
      tagBorder: 'border-violet-900/30',
      tagText: 'text-violet-400',
      hoverBorder: 'hover:border-violet-500/50',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.1)]',
      gradFrom: 'from-violet-500/5',
      activeBg: 'bg-violet-500/10',
      activeBorder: 'border-violet-500/40',
      glow: 'from-violet-500/50',
      linkText: 'text-violet-400',
      linkHover: 'hover:text-violet-300',
      dot: 'bg-violet-400',
    }
  },
  {
    id: 'hardware',
    label: 'Hardware',
    icon: Microchip,
    accent: {
      text: 'text-orange-400',
      border: 'border-orange-500/50',
      bg: 'bg-orange-950/30',
      tagBg: 'bg-orange-950/30',
      tagBorder: 'border-orange-900/30',
      tagText: 'text-orange-400',
      hoverBorder: 'hover:border-orange-500/50',
      hoverGlow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.1)]',
      gradFrom: 'from-orange-500/5',
      activeBg: 'bg-orange-500/10',
      activeBorder: 'border-orange-500/40',
      glow: 'from-orange-500/50',
      linkText: 'text-orange-400',
      linkHover: 'hover:text-orange-300',
      dot: 'bg-orange-400',
    }
  },
];

const ProjectsSection = ({ projects }) => {
  const [activeTab, setActiveTab] = useState('website');
  const filteredProjects = projects.filter(p => p.category === activeTab);
  const tab = PROJECT_TABS.find(t => t.id === activeTab);
  const a = tab.accent;

  return (
    <section className="mb-32">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10 gsap-reveal">
        <Database className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Deployed_Nodes (Projects)</h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 mb-10 p-1.5 bg-[#0a0f1c] border border-slate-800 rounded-xl w-fit">
        {PROJECT_TABS.map((t) => {
          const isActive = t.id === activeTab;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`
                relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-mono text-sm
                tracking-wider transition-all duration-300 cursor-none
                ${isActive
                  ? `${t.accent.activeBg} ${t.accent.text} border ${t.accent.activeBorder} shadow-lg`
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'}
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
              {isActive && (
                <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${t.accent.dot} shadow-lg animate-pulse`}></span>
              )}
              {/* count badge */}
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? `${t.accent.tagBg} ${t.accent.text}` : 'bg-slate-800 text-slate-500'}`}>
                {projects.filter(p => p.category === t.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active tab glow rule */}
      <div className={`h-[1px] w-full mb-10 bg-gradient-to-r ${a.glow} to-transparent`}></div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group relative bg-[#0a0f1c] border border-slate-800 p-8 rounded-xl flex flex-col h-full transition-all duration-300 z-10 cursor-none hover:-translate-y-2 ${a.hoverBorder} ${a.hoverGlow}`}
          >
            {/* Hover glow overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${a.gradFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none`}></div>
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${a.glow} to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

            <div className="flex justify-between items-start mb-5 z-10">
              <h3 className={`text-xl md:text-2xl font-bold text-white group-hover:${a.text.replace('text-', 'text-')} transition-colors leading-tight pr-4`}>
                {project.title}
              </h3>
              <ExternalLink className={`w-5 h-5 text-slate-600 group-hover:${a.text} transition-colors shrink-0`} />
            </div>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow z-10">{project.description}</p>

            <div className="z-10 mb-6">
              <p className={`text-xs font-mono ${a.tagText} ${a.tagBg} inline-block px-3 py-1.5 rounded border ${a.tagBorder}`}>
                {project.stack}
              </p>
            </div>

            <div className={`flex gap-5 mt-auto pt-5 border-t border-slate-800/80 z-10`}>
              {project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="text-xs font-mono tracking-wider flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-none">
                  <Code className="w-4 h-4" /> &lt;SOURCE/&gt;
                </a>
              )}
              {project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                   className={`text-xs font-mono tracking-wider flex items-center gap-2 ${a.linkText} ${a.linkHover} transition-colors cursor-none`}>
                  <ExternalLink className="w-4 h-4" /> [LIVE]
                </a>
              )}
              {project.github === "#" && project.demo === "#" && (
                <span className="text-xs font-mono text-slate-600 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Private / In Progress
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-slate-600 font-mono text-sm">
          No projects in this category yet.
        </div>
      )}
    </section>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const CreativeGUI = ({ onSwitchMode }) => {
  const container = useRef();
  const cursorRef = useRef();
  const cursorFollowerRef = useRef();

  const photos = [
    { id: 1, src: "/photo1.jpg", alt: "A photo of a scenic landscape" },
    { id: 2, src: "/photo2.jpg", alt: "A close-up nature shot" },
    { id: 3, src: "/photo3.jpg", alt: "An architectural detail" },
    { id: 4, src: "/photo4.jpg", alt: "A vibrant street scene" },
  ];

  const youtubeChannelUrl = hobbies.music.channel;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Custom Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let fx = cx, fy = cy;

    const onMouseMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      gsap.to(cursor, { x: cx, y: cy, duration: 0.1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      fx += (cx - fx) * 0.1;
      fy += (cy - fy) * 0.1;
      gsap.set(follower, { x: fx, y: fy });
      requestAnimationFrame(render);
    };
    render();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useGSAP(() => {
    // Hero Animations
    const tl = gsap.timeline();
    tl.fromTo(".hero-line",
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.2 }
    ).to(".hero-glow", { opacity: 0.5, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }, "-=1");

    // Fix for ScrollTrigger sometimes calculating wrong heights on load
    setTimeout(() => {
      ScrollTrigger.refresh();

      // Scroll Animations using fromTo to ensure visibility
      gsap.utils.toArray('.gsap-reveal').forEach((elem) => {
        gsap.fromTo(elem,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Staggered Cards
      gsap.utils.toArray('.gsap-stagger-container').forEach((cont) => {
        gsap.fromTo(cont.children,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cont,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Universal Timeline Line Drawing
      gsap.utils.toArray('.timeline-container').forEach((cont) => {
        const line = cont.querySelector('.timeline-line');
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: cont,
                start: "top 60%",
                end: "bottom 40%",
                scrub: 1
              }
            }
          );
        }
      });

      // Education Scrolling Perspective FX
      gsap.utils.toArray('.edu-card').forEach((card) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            scale: 0.8,
            rotationX: -45,
            y: 50,
            transformPerspective: 1000,
            transformOrigin: "top center"
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      gsap.utils.toArray('.cp-platform-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, 100);

  }, { scope: container });

  const skills = [
    "JavaScript", "TypeScript", "Python", "C++", "Java", "Solidity",
    "React.js", "Next.js", "Node.js", "Tailwind CSS",
    "RAG", "LangChain", "LLM Agents", "NLP",
    "MongoDB", "PostgreSQL", "Firebase", "Docker", "IPFS"
  ];

  return (
    <div ref={container} className="min-h-screen w-full bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 cursor-none relative">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#22d3ee] hidden md:block"></div>
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden md:block"></div>

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,112,184,0.15),rgba(2,6,23,1))] pointer-events-none"></div>

      {/* Floating Terminal Button */}
      <button
        onClick={onSwitchMode}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center p-3 md:p-4 bg-[#082f49]/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:bg-[#0c4a6e] transition-all hover:scale-105 group cursor-none"
      >
        <Terminal className="w-5 h-5 md:mr-3 group-hover:animate-pulse" />
        <span className="hidden md:inline-block font-mono text-sm tracking-wider">INIT_TERMINAL</span>
      </button>

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32 max-w-6xl">

        {/* HERO SECTION */}
        <header className="min-h-[80vh] flex flex-col md:flex-row justify-center md:items-center items-start mb-20 relative gap-12">
          <div className="hero-glow absolute top-10 -left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none hidden md:block"></div>

          <div className="flex-1 order-2 md:order-1">
            <div className="overflow-hidden mb-6">
              <span className="hero-line block font-mono text-cyan-500 tracking-wider text-xs md:text-sm uppercase items-center flex gap-3">
                <Sparkles className="w-4 h-4" /> System.initialize('Abrar_Khan_Alvi')
              </span>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-none mb-2">
                Architecting
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight pb-2">
                Intelligence.
              </h1>
            </div>

            <div className="overflow-hidden mb-12">
              <p className="hero-line text-lg md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6">
                AI Full-Stack Developer integrating <span className="text-cyan-300 font-medium tracking-wide">Large Language Models</span>, decentralized networks, and scalable architectures to solve complex computational problems.
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="hero-line flex flex-wrap gap-4">
                <a href="/Abrar%20Khan%20Alvi.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-md font-bold font-mono text-sm tracking-wide transition-colors cursor-none">
                  <Download className="w-4 h-4" /> CV.download()
                </a>
                <a href="https://github.com/abrar-khan-alvi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-6 py-3 rounded-md font-bold font-mono text-sm hover:!bg-slate-800 hover:text-white transition-colors cursor-none">
                  <Code className="w-4 h-4" /> GitHub.open()
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end w-full mt-10 md:mt-0">
            <div className="hero-line relative w-full max-w-[16rem] md:max-w-[20rem] lg:max-w-[24rem] shrink-0">
              <div className="absolute -inset-4 md:-inset-6 border border-cyan-500/30 bg-cyan-950/20 rounded-2xl transform rotate-3 transition-transform duration-700 hover:rotate-6"></div>
              <div className="absolute -inset-4 md:-inset-6 border border-purple-500/30 bg-purple-950/20 rounded-2xl transform -rotate-2 transition-transform duration-700 hover:-rotate-4"></div>

              <div className="relative rounded-2xl border border-slate-700 bg-[#0a0f1c] shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden group">
                <img
                  src="/profile.png"
                  alt="Abrar Khan Alvi"
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </header>

        {/* 1. EXPERIENCE TIMELINE */}
        <section className="mb-32 timeline-container relative">
          <div className="flex items-center gap-4 mb-16 gsap-reveal">
            <Network className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Execution_Context (Experience)</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          </div>

          <div className="relative pl-8 md:pl-16 border-l-2 border-slate-800/50 ml-4 md:ml-8">
            <div className="timeline-line absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent origin-top z-0"></div>

            {experience.map((exp, idx) => (
              <div key={idx} className="mb-16 relative gsap-reveal group">
                <div className="absolute top-1/2 -translate-y-1/2 left-[-41px] md:left-[-73px] w-4 h-4 rounded-full bg-[#020617] border-[2px] border-cyan-400 z-10 shadow-[0_0_10px_#22d3ee] transition-all duration-300 group-hover:scale-[1.3] group-hover:bg-cyan-500/20"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[-25px] md:left-[-57px] w-[25px] md:w-[57px] h-[2px] bg-slate-800 group-hover:bg-cyan-500/50 transition-colors duration-300 z-0"></div>

                <div className="bg-[#0a0f1c] border border-slate-800 p-8 rounded-xl hover:border-cyan-500/40 transition-all overflow-hidden relative cursor-none hover:-translate-y-1 w-full shadow-lg">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                  <span className="text-xs font-mono text-cyan-400 mb-4 block bg-cyan-950/40 w-fit px-3 py-1 rounded border border-cyan-900/30">{exp.period}</span>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">{exp.role}</h3>
                  <p className="text-purple-400 font-mono text-sm tracking-wide mb-5">{exp.company}</p>
                  <p className="text-slate-400 leading-relaxed text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. EDUCATION */}
        <section className="mb-32 perspective-1000">
          <div className="flex items-center gap-4 mb-16 gsap-reveal">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Education.Dat()</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {education.map((edu, idx) => (
              <div key={idx} className="edu-card relative bg-gradient-to-r from-indigo-950/30 to-[#0a0f1c] border border-indigo-900/40 rounded-2xl p-8 lg:p-10 overflow-hidden shadow-xl hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all group cursor-none hover:-translate-y-1">
                <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 z-10 relative">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-block px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        {edu.period}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{edu.degree}</h3>
                    <p className="text-slate-400 text-sm md:text-base">{edu.institution}</p>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <p className="inline-flex items-center justify-center px-5 py-3 border border-emerald-900/50 bg-emerald-950/20 text-emerald-400 font-mono text-sm rounded relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(52,211,153,0.15)] transition-all">
                      <span className="relative z-10 font-bold">{edu.details}</span>
                      <span className="absolute inset-0 bg-emerald-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></span>
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. COMPETITIVE PROGRAMMING */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12 gsap-reveal">
            <Trophy className="w-6 h-6 text-amber-400" />
            <div className="bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full">
               <h2 className="text-sm md:text-base font-mono text-amber-400 tracking-widest uppercase font-bold">Competitive Programming</h2>
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/50 to-transparent"></div>
            <a href={competitiveProgramming.github} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-none">
              Github <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mb-12 gsap-reveal">
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl">
              {competitiveProgramming.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {competitiveProgramming.platforms.map((p, i) => (
              <a 
                key={i} 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cp-platform-card bg-[#0a0f1c] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group cursor-none hover:-translate-y-1 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                   <Target className={`w-12 h-12 ${p.color}`} />
                </div>
                <h4 className={`font-mono text-xs uppercase tracking-widest mb-2 ${p.color}`}>{p.name}</h4>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-white tracking-tight">{p.handle}</span>
                </div>
                {p.rating && (
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                       <div className={`h-full ${p.color.replace('text-', 'bg-')} opacity-60`} style={{ width: '65%' }}></div>
                    </div>
                    <span className={`text-xs font-mono font-bold ${p.color}`}>MAX: {p.rating}</span>
                  </div>
                )}
              </a>
            ))}
          </div>

          <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 gsap-reveal relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent"></div>
            <div className="space-y-8">
              {competitiveProgramming.contests.map((c, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-amber-400 font-bold text-lg">{c.rank}</span>
                      <span className="text-slate-200 font-bold md:text-lg">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-500 italic">
                      Team: <span className="text-slate-400">{c.team}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROJECTS — TABBED */}
        <ProjectsSection projects={projects} />

        {/* 5. RESEARCH & PUBLICATIONS */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10 gsap-reveal">
            <BookOpen className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Publications.Log()</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-pink-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger-container">
            {researchInfo.map((res, i) => (
              <div key={i} className="bg-[#0a0f1c] border border-slate-800 border-l-2 border-l-pink-500 p-8 rounded-r-xl hover:bg-slate-900 transition-colors cursor-none flex flex-col h-full hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                <h3 className="text-xl font-bold text-slate-200 mb-3 leading-tight">{res.title}</h3>
                <p className="text-pink-400 font-mono text-xs mb-6 inline-block bg-pink-500/10 px-3 py-1 rounded w-fit">{res.publication}</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{res.description}</p>
                {res.link !== "#" && (
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold text-pink-400 hover:text-pink-300 flex items-center gap-2 cursor-none w-fit">
                    READ_PAPER <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>



        {/* 6. SKILLS MARQUEE / GRID */}
        <section className="mb-32 gsap-reveal">
          <div className="flex items-center gap-4 mb-10">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Neural_Weights (Skills)</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4 gsap-stagger-container">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 border border-slate-800 bg-[#0a0f1c] hover:bg-cyan-950/40 rounded-md text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all font-mono text-sm cursor-none shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 7. ACHIEVEMENTS JOURNEY (TIMELINE) */}
        <section className="mb-32 timeline-container relative">
          <div className="flex items-center gap-4 mb-16 gsap-reveal">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Evolution_Log (Achievements)</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/50 to-transparent"></div>
          </div>

          <div className="relative pl-8 md:pl-16 border-l-2 border-slate-800/50 ml-4 md:ml-8">
            <div className="timeline-line absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-orange-500 to-transparent origin-top z-0"></div>

            {awards.map((award, idx) => (
              <div key={idx} className="mb-12 relative gsap-reveal group">
                <div className="absolute top-1/2 -translate-y-1/2 left-[-41px] md:left-[-73px] w-4 h-4 rounded-full bg-[#020617] border-[2px] border-amber-400 z-10 shadow-[0_0_15px_#fbbf24] transition-all duration-300 group-hover:scale-[1.3] group-hover:bg-amber-500/20">
                  <div className="absolute inset-[3px] bg-amber-400/80 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[-25px] md:left-[-57px] w-[25px] md:w-[57px] h-[2px] bg-slate-800 group-hover:bg-amber-500/50 transition-colors duration-300 z-0"></div>

                <div className="bg-[#0a0f1c] border border-slate-800 p-8 rounded-xl hover:border-amber-500/40 transition-all overflow-hidden relative cursor-none hover:-translate-y-1 w-full shadow-lg">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                  <span className="text-xs font-mono text-amber-400 mb-4 block bg-amber-950/40 w-fit px-3 py-1 rounded border border-amber-900/30">{award.year}</span>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{award.title}</h3>
                  <p className="text-amber-500/80 font-mono text-sm tracking-wide">{award.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. OTHERS: ACTIVITIES & CREATIVE */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10 gsap-reveal">
            <Layers className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Activities.Dat()</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-rose-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger-container">
            {extracurricular.map((act, i) => (
              <div key={i} className="border-l-[2px] border-slate-800 hover:border-rose-500/50 pl-6 pb-2 transition-colors cursor-none group">
                <h3 className="text-slate-200 font-bold mb-2 text-xl group-hover:text-rose-400 transition-colors">{act.role}</h3>
                <p className="text-rose-400/80 font-mono text-sm mb-4">{act.organization}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{act.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="gsap-reveal pt-20 border-t border-slate-800/80">
          <div className="text-center mb-16">
            <span className="font-mono text-cyan-500 text-sm tracking-widest uppercase mb-4 block">// System.idle()</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter">
              Organic_Subroutines
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors cursor-none flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-cyan-500" />
                <h3 className="text-xl font-mono text-slate-200 uppercase tracking-widest">Visual_Data</h3>
              </div>
              <p className="text-slate-400 font-mono text-sm mb-6 leading-relaxed">{hobbies.photography.description}</p>
              
              {/* Photo Display Grid */}
              <div className="grid grid-cols-2 gap-4 flex-grow">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="relative group overflow-hidden rounded-xl border border-slate-700/50 aspect-square border-l-2 border-l-cyan-500/30 cursor-none"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img 
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-slate-700 transition-colors cursor-none">
              <div className="flex items-center gap-3 mb-6">
                <Music className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-mono text-slate-200 uppercase tracking-widest">Acoustic_Waves</h3>
              </div>
              <p className="text-slate-400 font-mono text-sm mb-6 leading-relaxed">{hobbies.music.description}</p>
              
              {/* Video Embedding */}
              <div className="flex-grow w-full relative rounded-xl overflow-hidden border border-slate-700 aspect-video group border-l-2 border-l-purple-500/50">
                <div className="absolute inset-0 bg-slate-900 animate-pulse -z-10"></div>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full pointer-events-auto"
                  src={youtubeChannelUrl.replace("watch?v=", "embed/")} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-sm cursor-none"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain rounded-xl border border-slate-700/50 shadow-[0_0_50px_rgba(34,211,238,0.15)]"
            />
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-0 right-0 md:top-4 md:right-4 bg-[#0a0f1c] hover:bg-slate-800 text-slate-400 hover:text-white p-3 rounded-full border border-slate-700 transition-colors z-[1010] cursor-none shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* TECH FOOTER */}
      <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-20 relative overflow-hidden gsap-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter mb-4">
            [ EOF ]
          </h2>
          <div className="inline-flex items-center justify-center gap-4 mb-12 flex-wrap">
            <a href="mailto:abrarkhanalvi27@gmail.com" className="font-mono text-sm text-cyan-400 hover:text-white transition-colors border border-cyan-800 bg-cyan-950/30 px-6 py-3 rounded hover:bg-cyan-900/50 cursor-none">
              INITIATE_CONTACT
            </a>
            <a href="https://linkedin.com/in/abrar-khan-alvi" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-blue-400 hover:text-white transition-colors border border-blue-800 bg-blue-950/30 px-6 py-3 rounded hover:bg-blue-900/50 cursor-none">
              LINKEDIN
            </a>
            <a href="https://github.com/abrar-khan-alvi" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-slate-300 hover:text-white transition-colors border border-slate-700 bg-slate-800/50 px-6 py-3 rounded hover:bg-slate-700/80 cursor-none">
              GITHUB
            </a>
          </div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-8 max-w-md mx-auto">
            SYSTEM ARCHITECTURE FINALISED<br />
            <span className="text-cyan-600">© 2026 ABRAR KHAN ALVI. ALL PROTOCOLS SECURED.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreativeGUI;