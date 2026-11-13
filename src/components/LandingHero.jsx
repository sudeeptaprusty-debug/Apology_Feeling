import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { DelicateBranch } from './BotanicalDecorations';

export default function LandingHero({ onOpenLetter }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -20 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      {/* Decorative ambient halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(237, 210, 202, 0.55) 0%, rgba(247, 229, 223, 0.25) 50%, rgba(251, 247, 242, 0) 75%)'
        }}
      />

      {/* Gentle Botanical Motif at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.4 }}
        className="mb-8"
      >
        <DelicateBranch className="w-28 sm:w-36 h-12 text-[#bfa399] mx-auto opacity-70" />
      </motion.div>

      {/* Main Container Card (A sealed minimalist stationery envelope teaser) */}
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        
        {/* Gentle tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebe3]/80 border border-[#e5d3c8] text-[#826962] text-xs tracking-widest uppercase font-sans-clean mb-6"
        >
          <Sparkles className="w-3 h-3 text-[#b58c82]" />
          <span>A Quiet Note</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1 }}
          className="font-serif-elegant text-3xl sm:text-4xl md:text-5xl font-normal text-[#3e2e2a] leading-tight sm:leading-snug tracking-wide mb-6 max-w-lg"
        >
          Some words deserve to be said properly...
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1 }}
          className="font-sans-clean text-[#6e5852] text-base sm:text-lg font-light leading-relaxed max-w-md mb-10 px-2"
        >
          This is not an attempt to change anything. Just something I genuinely wanted to say.
        </motion.p>

        {/* Action Button: "Read my words ♡" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="relative"
        >
          <button
            onClick={onOpenLetter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#463430] hover:bg-[#382825] text-[#fbf6f0] font-sans-clean text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
            aria-label="Read my words"
          >
            {/* Soft inner glow on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <Mail className="w-4 h-4 text-[#e8cdc4] group-hover:rotate-6 transition-transform duration-300" />
            <span className="font-medium tracking-wide">Read my words ♡</span>
          </button>

          {/* Understated caption */}
          <p className="mt-4 text-xs text-[#9d847c] font-serif-elegant italic tracking-wider">
            Take your time, whenever you feel comfortable
          </p>
        </motion.div>
      </div>

      {/* Gentle bottom cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-[#aa948c] tracking-widest uppercase font-sans-clean flex items-center gap-2"
      >
        <span className="w-6 h-[1px] bg-[#d9c4bc]"></span>
        <span>Peace & Respect</span>
        <span className="w-6 h-[1px] bg-[#d9c4bc]"></span>
      </motion.div>
    </motion.section>
  );
}
