import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';

const LeftPane = () => {
  const imageUrl = "/profile.png";
  const cvUrl = "/Abrar_Khan_Alvi_CV.pdf";

  return (
    <div className="hidden lg:flex flex-col w-full lg:w-1/3 bg-gray-900/50 border-r border-green-900/50 p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative group w-2/3 mx-auto"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <img
          src={imageUrl}
          alt="Abrar Khan Alvi"
          className="relative w-full h-auto object-cover rounded-lg grayscale hover:grayscale-0 transition duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <h1 className="text-3xl font-bold font-sans text-gray-100">
          ABRAR KHAN ALVI
        </h1>
        <p className="text-green-400">
          Full-Stack Developer | Problem Solver
        </p>
        <a
          href={cvUrl}
          download
          className="mt-2 inline-flex items-center gap-2 text-sm border border-gray-600 hover:border-green-400 hover:text-green-400 text-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="text-sm space-y-2 text-gray-400"
      >
        <p>
          <span className="text-green-400 mr-2">STATUS:</span>[ Available for
          Hire ]
        </p>
        <p>
          <span className="text-green-400 mr-2">LOCATION:</span>[ Dhaka, BD ]
        </p>
        <p>
          <span className="text-green-400 mr-2">FOCUS:</span>[ Development &
          Decentralized Systems ]
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="flex space-x-4"
      >
        <a
          href="https://github.com/abrar-khan-alvi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-400 transition-colors"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/abrarkhanalvi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-400 transition-colors"
        >
          <Linkedin />
        </a>
      </motion.div>
    </div>
  );
};

export default LeftPane;