import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftPane from "../src/components/LeftPane";
import TerminalView from "../src/components/TerminalView";
import CreativeGUI from "../src/components/CreatiiveGUI";

const App = () => {
  const [mode, setMode] = useState("creative");

  const MainView = () => (
    <div className="h-screen w-full bg-[#020617] font-mono text-green-400 flex flex-col lg:flex-row overflow-hidden">
      <LeftPane onSwitchMode={() => setMode("creative")} />
      <TerminalView onSwitchMode={() => setMode("creative")} />
    </div>
  );


  return (
    <AnimatePresence mode="wait">
      {mode === "terminal" ? (
        <motion.div
          key="terminal"
          className="h-screen w-full bg-[#020617]"
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <MainView />
        </motion.div>
      ) : (
        <motion.div key="creative">
          <CreativeGUI onSwitchMode={() => setMode("terminal")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;