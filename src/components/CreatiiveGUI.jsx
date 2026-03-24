import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal, Cpu, Database, Network, Award, BookOpen, Camera, Music, ExternalLink, Code, Layers, Sparkles, Youtube, Download, GraduationCap } from 'lucide-react';
import { projects, experience, education, extracurricular, awards, researchInfo, hobbies } from '../data/terminalData';

gsap.registerPlugin(ScrollTrigger);

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
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#22d3ee] hidden md:block"></div>
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden md:block"></div>

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
                <Sparkles className="w-4 h-4"/> System.initialize('Abrar_Khan_Alvi')
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
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10 gsap-reveal">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Education.Dat()</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger-container">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-[#0a0f1c] border border-slate-800 p-8 rounded-xl hover:border-indigo-500/50 transition-all cursor-none relative overflow-hidden group hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <span className="text-indigo-400 font-mono text-xs whitespace-nowrap mb-6 block bg-indigo-500/10 px-3 py-1 rounded w-fit">{edu.period}</span>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{edu.degree}</h3>
                <p className="text-slate-400 text-sm mb-6">{edu.institution}</p>
                <p className="text-emerald-400 font-mono text-sm bg-slate-900 border border-slate-700 inline-block px-3 py-1.5 rounded relative z-10">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROJECTS GRID */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12 gsap-reveal">
            <Database className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl md:text-2xl font-mono text-white tracking-wider uppercase">Deployed_Nodes (Projects)</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger-container">
            {projects.map((project) => (
              <div key={project.id} className="group relative bg-[#0a0f1c] border border-slate-800 p-8 rounded-xl flex flex-col h-full hover:border-emerald-500/50 transition-all z-10 cursor-none hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-6 z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow z-10">{project.description}</p>
                
                <div className="z-10 mb-8">
                  <p className="text-xs font-mono text-emerald-400 bg-emerald-950/30 inline-block px-3 py-1.5 rounded border border-emerald-900/30">
                    {project.stack}
                  </p>
                </div>
                
                <div className="flex gap-4 mt-auto pt-6 border-t border-slate-800/80 z-10">
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-wider flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-none">
                      <Code className="w-4 h-4" /> &lt;SOURCE/&gt;
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-wider flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-none">
                      <ExternalLink className="w-4 h-4" /> [DEPLOYED]
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. RESEARCH & PUBLICATIONS */}
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
                    READ_PAPER <ExternalLink className="w-4 h-4"/>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. SKILLS MARQUEE / GRID */}
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

        {/* 6. ACHIEVEMENTS JOURNEY (TIMELINE) */}
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

        {/* 7. OTHERS: ACTIVITIES & CREATIVE */}
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
            <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors cursor-none">
              <div className="flex items-center gap-3 mb-8">
                <Camera className="w-6 h-6 text-cyan-500" />
                <h3 className="text-xl font-mono text-slate-200 uppercase tracking-widest">Visual_Data</h3>
              </div>
              <p className="text-slate-400 font-mono text-sm mb-6 leading-relaxed">{hobbies.photography.description}</p>
              <div className="flex flex-col gap-4">
                {hobbies.photography.links.map((link, i) => {
                  const isFacebook = link.includes("facebook");
                  return (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all cursor-none group ${
                        isFacebook
                          ? "border-blue-800/50 bg-blue-950/20 hover:border-blue-500/60 hover:bg-blue-950/40"
                          : "border-red-800/50 bg-red-950/20 hover:border-red-500/60 hover:bg-red-950/40"
                      }`}
                    >
                      <span className={`text-2xl`}>{isFacebook ? "📘" : "📌"}</span>
                      <div className="flex flex-col">
                        <span className={`font-mono text-sm font-bold tracking-wider ${isFacebook ? "text-blue-400" : "text-red-400"}`}>
                          {isFacebook ? "Facebook" : "Pinterest"}
                        </span>
                        <span className="text-slate-500 font-mono text-xs truncate max-w-[220px]">{link}</span>
                      </div>
                      <ExternalLink className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isFacebook ? "text-blue-400" : "text-red-400"}`} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-slate-700 transition-colors cursor-none">
              <div className="flex items-center gap-3 mb-8">
                <Music className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-mono text-slate-200 uppercase tracking-widest">Acoustic_Waves</h3>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-700 rounded-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent)]">
                <p className="mb-8 text-slate-400 leading-relaxed font-mono">Analyzing acoustic frequencies spanning multiple genres via performance tests.</p>
                <a href={hobbies.music.channel} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 text-white rounded-md transition-all font-mono text-sm cursor-none">
                  <Youtube className="w-4 h-4 text-rose-500" /> Execute Youtube.play()
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

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
             SYSTEM ARCHITECTURE FINALISED<br/>
             <span className="text-cyan-600">© 2026 ABRAR KHAN ALVI. ALL PROTOCOLS SECURED.</span>
           </p>
        </div>
      </footer>
    </div>
  );
};

export default CreativeGUI;