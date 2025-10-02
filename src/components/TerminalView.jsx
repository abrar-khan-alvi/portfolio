import React, { useState, useEffect, useRef } from 'react';
import { 
  projects, 
  commands, 
  researchInfo, 
  hobbies,
  education, 
  extracurricular, 
  awards 
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
        output = [{ type: "output", content: `Available commands:\n  whois                -  About Me\n  skills               -  My Technical Skillset\n  projects             -  List my major projects\n  projects <id>        -  View details...\n  education            -  My academic background\n  activities           -  My extracurricular involvement\n  awards               -  My awards and achievements\n  research             -  Details of my published paper\n  contact              -  How to Get in Touch\n  hobby                -  My hobbies and interests\n  clear                -  Clear the terminal screen` }];
        break;
      case "whois":
        output = [{ type: "output", content: `Name: Abrar Khan Alvi\nA competitive programmer by passion and a full-stack engineer by practice. I thrive on solving new and difficult problems, whether it's building a decentralized AI application from scratch or architecting an efficient system. I am driven by a need to learn and build.` }];
        break;
      case "skills":
        output = [{ type: "output", content: `Competitive Programming:
  - Codeforces: https://codeforces.com/profile/alvi_saheb
  - CodeChef:   https://www.codechef.com/users/alvi_saaheb
  - LeetCode:   https://leetcode.com/u/abrar1khan2
Languages:    JavaScript, TypeScript, Python, C, C++, Solidity
Frontend:     React, Next.js, Tailwind CSS
Backend:      Node.js, Express.js
Database:     MongoDB, Firebase, MySQL
Tools:        Git, Adobe Illustrator, Adobe Photoshop, Canva Pro, IPFS` }];
        break;
      case "projects":
        if (args.length === 0) {
          const allProjectsDetails = projects.map(p => 
            `[${p.id}] TITLE:       ${p.title}\nTECH STACK:  ${p.stack}`
          ).join('\n----------------------------------------\n');
          output = [{ type: "output", content: allProjectsDetails }];
        } else {
          const project = projects.find((p) => p.id === parseInt(args[0]));
          if (project) {
            output = [{ type: "output", content: `TITLE:       ${project.title}\nDESCRIPTION: ${project.description}\nTECH STACK:  ${project.stack}\nLINKS:       Github: ${project.github} Live Demo: ${project.demo}` }];
          } else {
            output = [{ type: "error", content: `Error: Project ID '${args[0]}' not found.` }];
          }
        }
        break;
      case "education":
        output = [{ type: "output", content: education.map(e => `DEGREE:      ${e.degree}\nINSTITUTION: ${e.institution}\nPERIOD:      ${e.period}\nDETAILS:     ${e.details}`).join('\n\n') }];
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
        output = [{ type: "output", content: `TITLE: ${researchInfo.title} \nPUBLICATION: ${researchInfo.publication}\nDESCRIPTION: ${researchInfo.description}\nView Paper: ${researchInfo.link}` }];
        break;
      case "contact":
        output = [{ type: "output", content: `Email:    abrar1khan2@gmail.com\nGitHub:   github.com/abrar-khan-alvi\nLinkedIn: linkedin.com/in/abrar-khan-alvi` }];
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
    <div className="flex-1 p-4 overflow-hidden bg-gray-900" onClick={() => inputRef.current?.focus()}>
      <div ref={terminalRef} className="h-full overflow-y-auto">
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TerminalView;