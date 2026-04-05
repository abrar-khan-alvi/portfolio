import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { 
  projects, 
  commands, 
  researchInfo, 
  hobbies,
  education, 
  experience,
  extracurricular, 
  awards,
  competitiveProgramming
} from '../data/terminalData';

// Helper components can be in this file or their own
const Linkify = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/[^\s]+|[\w.-]+@[\w.-]+\.[\w.-]+)/g;
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          let href = part;
          if (part.includes("@")) {
            href = `mailto:${part}`;
          } else if (!part.startsWith("http")) {
            href = `https://${part}`;
          }
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

const TerminalOutputStatic = ({ text }) => {
  return (
    <pre className="text-gray-300 whitespace-pre-wrap">
      <Linkify text={text} />
    </pre>
  );
};

const TerminalView = ({ onSwitchMode }) => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const bootSequence = [
      { type: "system", content: "[OK] Initializing core modules..." },
      { type: "system", content: "[OK] Loading user profile..." },
      { type: "system", content: "[OK] Establishing connection..." },
      {
        type: "ascii",
        content: `
    █████╗ ██╗     ██╗   ██╗ ███████╗
   ██╔══██╗██║     ██║   ██║ ╚═██║══╝
   ███████║██║     ██║   ██║   ██║
   ██╔══██║██║     ╚██╗ ██╔╝   ██║
   ██║  ██║███████╗ ╚████╔╝  ███████╗
   ╚═╝  ╚═╝╚══════╝  ╚═══╝   ╚══════╝`,
      },
      { type: "system", content: "[Abrar Khan Alvi OS v1.0 initialised.]" },
      { type: "system", content: "Welcome, guest. Type 'help' to see available commands." },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setTerminalHistory(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTerminalHistory(prev => [...prev, { type: "prompt" }]);
        setIsBooting(false);
        inputRef.current?.focus();
      }
    }, 200); // Adjust delay as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [terminalHistory]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) {
        setTerminalHistory(prev => [
            ...prev.slice(0, -1),
            { type: "command", content: `> ${cmd}` },
            { type: "prompt" }
        ]);
        return;
    }

    setCommandHistory((prev) => [trimmedCmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    const parts = trimmedCmd.split(" ");
    const command = parts[0];
    const args = parts.slice(1);
    let output = [];

    switch (command) {
           case "help":
        output = [{ type: "output", content: `Available commands:
  whois                -  About Me
  skills               -  My Technical Skillset
  cp                   -  Competitive Programming Profile
  experience           -  My Work Experience
  projects             -  List my major projects
  projects <id>        -  View details...
  education            -  My academic background
  activities           -  My extracurricular involvement
  awards               -  My awards and achievements
  research             -  Details of my published papers
  contact              -  How to Get in Touch
  hobby                -  My hobbies and interests
  clear                -  Clear the terminal screen` }];
        break;
      case "whois":
        output = [{ type: "output", content: `Name: Abrar Khan Alvi\nA competitive programmer by passion and a full-stack engineer by practice. I thrive on solving new and difficult problems, whether it's building a decentralized AI application from scratch or architecting an efficient system. I am driven by a need to learn and build.` }];
        break;
      case "skills":
        output = [{ type: "output", content: `Competitive Programming:
  - Codeforces: https://codeforces.com/profile/alvi_saheb
  - CodeChef:   https://www.codechef.com/users/alvi_saaheb
  - LeetCode:   https://leetcode.com/u/abrar1khan2
Languages:    JavaScript, TypeScript, Python, C++, Java, PHP
Frontend:     React.js, Node.js, Next.js, Tailwind CSS
AI:           RAG, LangChain, LLM Agents, NLP
Database:     MongoDB, Firebase, PostgreSQL
Tools:        Git, Docker` }];
        break;
      case "projects":
        if (args.length === 0) {
          const categories = [
            { key: 'website', label: '── WEBSITES ──────────────────────────────' },
            { key: 'app',     label: '── APPS ──────────────────────────────────' },
            { key: 'hardware',label: '── HARDWARE ──────────────────────────────' },
          ];
          const grouped = categories.map(cat => {
            const catProjects = projects.filter(p => p.category === cat.key);
            if (catProjects.length === 0) return '';
            const lines = catProjects.map(p => `  [${p.id}] ${p.title}\n       Stack: ${p.stack}`).join('\n');
            return `${cat.label}\n${lines}`;
          }).filter(Boolean).join('\n\n');
          output = [{ type: "output", content: `${grouped}\n\nType 'projects <id>' for full project details.` }];
        } else {
          const project = projects.find((p) => p.id === parseInt(args[0]));
          if (project) {
            output = [{ type: "output", content: `TITLE:       ${project.title}\nCATEGORY:    ${project.category.toUpperCase()}\nDESCRIPTION: ${project.description}\nTECH STACK:  ${project.stack}\nGITHUB:      ${project.github}\nLIVE DEMO:   ${project.demo}` }];
          } else {
            output = [{ type: "error", content: `Error: Project ID '${args[0]}' not found.` }];
          }
        }
        break;
      case "education":
        output = [{ type: "output", content: education.map(e => `DEGREE:      ${e.degree}\nINSTITUTION: ${e.institution}\nPERIOD:      ${e.period}\nDETAILS:     ${e.details}`).join('\n\n') }];
        break;
      case "experience":
        output = [{ type: "output", content: experience.map(e => `ROLE:        ${e.role}\nCOMPANY:     ${e.company}\nPERIOD:      ${e.period}\nDESCRIPTION: ${e.description}`).join('\n\n') }];
        break;
      case "activities":
        output = [{ type: "output", content: extracurricular.map(e => `ROLE:         ${e.role}\nORGANIZATION: ${e.organization}\nDESCRIPTION:  ${e.description}`).join('\n\n') }];
        break;
      case "awards":
        output = [{ type: "output", content: awards.map(a => `AWARD:  ${a.title}\nISSUER: ${a.issuer}\nYEAR:   ${a.year}`).join('\n\n') }];
        break;
      case "hobby":
        const photoLinks = hobbies.photography.links.map((link, i) => `  - Post ${i + 1}: ${link}`).join('\n');
        const hobbyOutput = `PHOTOGRAPHY\n-----------\n${hobbies.photography.description}\n${photoLinks}\n\nMUSIC\n-----\n${hobbies.music.description}\n- Channel: ${hobbies.music.channel}`;
        output = [{ type: "output", content: hobbyOutput }];
        break;
      case "research":
        output = [{ type: "output", content: researchInfo.map(r => `TITLE:       ${r.title}\nPUBLICATION: ${r.publication}\nDESCRIPTION: ${r.description}\nLINK:        ${r.link}`).join('\n\n') }];
        break;
      case "contact":
        output = [{ type: "output", content: `Email:    abrar1khan2@gmail.com\nGitHub:   github.com/abrar-khan-alvi\nLinkedIn: linkedin.com/in/abrar-khan-alvi` }];
        break;
      case "cp":
        const platformDetails = competitiveProgramming.platforms.map(p => 
          `${p.name.padEnd(12)}: Handle: ${p.link}${p.rating ? ` (Max Rating: ${p.rating})` : ''}`
        ).join('\n');
        const contestDetails = competitiveProgramming.contests.map(c => 
          `- ${c.rank} in ${c.name}\n  Team: ${c.team}`
        ).join('\n');
        output = [{ type: "output", content: `${competitiveProgramming.summary}\n\nPLATFORMS\n---------\n${platformDetails}\n\nCONTESTS\n--------\n${contestDetails}\n\nGitHub: ${competitiveProgramming.github}` }];
        break;
      case "clear":
        setTerminalHistory([{ type: "prompt" }]);
        return;
      case "init":
        if (args.join(" ") === "--mode=creative") {
          output = [{ type: "system", content: "Initializing Creative GUI module..." }];
          setTimeout(onSwitchMode, 1000);
        } else {
          output = [{ type: "error", content: `Unknown flag. Use 'init --mode=creative'` }];
        }
        break;
      case "whoami":
        output = [{ type: "output", content: "The next great developer to join your team." }];
        break;
      case "sudo":
        output = [{ type: "error", content: "User is not in the sudoers file. This incident will be reported." }];
        break;
      default:
        output = [{ type: "error", content: `Command not found: '${command}'. Type 'help'.` }];
    }
    
    setTerminalHistory(prev => [
        ...prev.slice(0, -1),
        { type: "command", content: `> ${cmd}` },
        ...output,
        { type: "prompt" }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matching = commands.filter((c) => c.startsWith(currentInput.toLowerCase()));
      if (matching.length === 1) setCurrentInput(matching[0]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || "");
      } else if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
      {/* Windows-Style Terminal Header */}
      <div className="h-10 bg-[#0a0f1c] border-b border-gray-800 flex items-center justify-between pl-4 pr-0 sticky top-0 z-50 select-none shadow-md">
        <div className="text-xs font-mono text-gray-400 flex items-center gap-2 font-bold tracking-wide">
          <Terminal className="w-4 h-4 text-green-500" /> C:\alvi-os\system32\cmd.exe
        </div>
        <div className="flex items-center h-full">
           <button className="h-full px-5 text-gray-500 hover:bg-gray-800 transition-colors flex items-center justify-center cursor-default">—</button>
           <button className="h-full px-5 text-gray-500 hover:bg-gray-800 transition-colors flex items-center justify-center cursor-default">□</button>
           <button 
              onClick={(e) => { e.stopPropagation(); onSwitchMode(); }}
              className="h-full px-5 text-gray-500 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              title="Close Terminal"
           >
              ✕
           </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden bg-transparent" onClick={() => inputRef.current?.focus()}>
        <div ref={terminalRef} className="h-full overflow-y-auto pb-4 pr-2">
        {terminalHistory.map((line, index) => {
          if (!line) return null;
          return (
            <div key={index} className="mb-1">
              {line.type === "ascii" && <pre className="text-green-500 text-xs sm:text-base">{line.content}</pre>}
              {line.type === "system" && <div className="text-cyan-400">{line.content}</div>}
              {line.type === "command" && <div className="text-green-400">{line.content}</div>}
              {line.type === "output" && <TerminalOutputStatic text={line.content} />}
              {line.type === "error" && <div className="text-red-400">{line.content}</div>}
              {line.type === "prompt" && (
                <div className="flex flex-col mb-1">
                  <div className="flex flex-wrap gap-2 mb-3 mt-1">
                    {['whois', 'experience', 'projects', 'skills', 'cp', 'education', 'research', 'activities', 'awards', 'contact'].map(cmd => (
                      <button 
                        key={cmd} 
                        onClick={() => executeCommand(cmd)} 
                        className="text-xs px-3 py-1 border border-green-500/30 text-green-400 rounded-full hover:bg-green-500/20 transition-colors"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">guest@alvi-os:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none text-white"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default TerminalView;