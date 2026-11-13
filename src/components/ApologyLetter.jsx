import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperCorner, DelicateBranch, GentleHeartStamp } from './BotanicalDecorations';

export default function ApologyLetter({ onClose }) {
  const [useHandwriting, setUseHandwriting] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20"
    >
      {/* Warm ambient candle/dusk glow behind the letter card */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[480px] sm:h-[820px] rounded-full pointer-events-none opacity-50 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(240, 215, 207, 0.65) 0%, rgba(247, 233, 226, 0.35) 45%, rgba(250, 247, 242, 0) 75%)'
        }}
      />

      {/* Font readability switcher pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-5 flex items-center gap-2 bg-[#fffaf5]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#ebd8ce] shadow-xs text-xs text-[#7d645d]"
      >
        <span className="text-[11px] font-sans-clean text-[#998078] tracking-wider uppercase">Style:</span>
        <button
          onClick={() => setUseHandwriting(true)}
          className={`px-2.5 py-0.5 rounded-full text-xs font-serif-elegant italic transition-all cursor-pointer ${
            useHandwriting 
              ? 'bg-[#e8d2c7] text-[#42312d] font-medium shadow-xs' 
              : 'text-[#876e66] hover:text-[#42312d]'
          }`}
          aria-label="Handwritten font style"
        >
          Handwritten
        </button>
        <button
          onClick={() => setUseHandwriting(false)}
          className={`px-2.5 py-0.5 rounded-full text-xs font-serif-elegant transition-all cursor-pointer ${
            !useHandwriting 
              ? 'bg-[#e8d2c7] text-[#42312d] font-medium shadow-xs' 
              : 'text-[#876e66] hover:text-[#42312d]'
          }`}
          aria-label="Classic serif font style"
        >
          Classic Serif
        </button>
      </motion.div>

      {/* Main Letter Card */}
      <div className="relative max-w-2xl w-full mx-auto paper-card paper-grain rounded-2xl sm:rounded-3xl border border-[#ecd9cf] card-shadow subtle-glow p-7 sm:p-12 md:p-14 overflow-hidden">
        
        {/* Paper texture corner flourishes */}
        <PaperCorner position="top-left" />
        <PaperCorner position="top-right" />
        <PaperCorner position="bottom-left" />
        <PaperCorner position="bottom-right" />

        {/* Top Botanical Header */}
        <div className="text-center mb-8 relative">
          <DelicateBranch className="w-24 sm:w-28 h-8 text-[#bfa399] mx-auto opacity-75 mb-3" />
          
          <h2 className="font-serif-elegant text-2xl sm:text-3xl md:text-4xl font-normal text-[#3b2b27] tracking-wide">
            A small apology, from the heart.
          </h2>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-[#d9c4bc]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a69b]"></span>
            <span className="w-12 h-[1px] bg-[#d9c4bc]"></span>
          </div>
        </div>

        {/* The Apology Letter Body */}
        <div 
          className={`space-y-6 text-[#3a2a26] transition-all duration-300 ${
            useHandwriting 
              ? 'font-handwriting text-xl sm:text-2xl leading-[1.75] tracking-wide' 
              : 'font-serif-elegant text-lg sm:text-xl leading-[1.85] tracking-normal font-light'
          }`}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hey, I genuinely want to apologise if what I said made you uncomfortable or put you in an awkward position. I know you're already going through a lot, and maybe it wasn't the right time for me to express what I felt. I never intended to make things difficult for you or add anything to what you're already dealing with.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I told you that I liked you because those were my genuine feelings, not because I expected you to feel the same way or wanted you to get into a relationship. I completely understand and respect your decision, and I'm sorry if I crossed a line without realising it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            You don't owe me any explanation, response, or anything in return. I genuinely wish you happiness and peace, and I hope things get better for you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-2 text-[#5c4038] font-medium"
          >
            Please take care of yourself.
          </motion.p>
        </div>

        {/* Delicate stationery divider */}
        <div className="my-10 pt-4 border-t border-[#ebdad0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GentleHeartStamp className="w-4 h-4 text-[#deb8ad]" />
            <span className="font-serif-elegant italic text-xs text-[#a0867d]">
              With respect and sincerity
            </span>
          </div>

          <span className="text-[11px] font-sans-clean text-[#b8a098] tracking-widest uppercase">
            A quiet thought
          </span>
        </div>

        {/* Section 5: Final Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="text-center pt-2 pb-2"
        >
          {/* Quote 1 */}
          <p className="font-serif-elegant italic text-lg sm:text-xl text-[#58413b] mb-3">
            "Some feelings are genuine, even when they don't lead anywhere."
          </p>

          {/* Quote 2 */}
          <p className="font-sans-clean text-sm sm:text-base text-[#755d56] font-light leading-relaxed mb-8">
            I hope life brings you beautiful reasons to smile. Take care. ♡
          </p>

          {/* Button: "Close this little letter" */}
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#f4ece5] hover:bg-[#ebdcd3] border border-[#e2d0c5] text-[#5e4741] hover:text-[#3d2b27] font-sans-clean text-xs sm:text-sm font-medium tracking-wide shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer"
            aria-label="Close this little letter"
          >
            <span>Close this little letter</span>
            <span className="text-[#a88a81] group-hover:translate-x-0.5 transition-transform duration-200">
              ✕
            </span>
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}
