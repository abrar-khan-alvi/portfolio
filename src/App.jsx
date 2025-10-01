import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftPane from "../src/components/LeftPane";
import TerminalView from "../src/components/TerminalView";
import CreativeGUI from "../src/components/CreatiiveGUI";

const App = () => {
  const [mode, setMode] = useState("terminal");

const MainView = () => (
    <div className="h-screen bg-gray-900 font-mono text-green-400 flex flex-col lg:flex-row">
      <LeftPane />
      <TerminalView onSwitchMode={() => setMode("creative")} />
    </div>
  );


  return (
    <AnimatePresence mode="wait">
      {mode === "terminal" ? (
        <motion.div
          key="terminal"
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