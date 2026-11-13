import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { DelicateBranch } from './BotanicalDecorations';

export default function ClosingScreen({ onReopen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      {/* Soft warm halo in background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] rounded-full pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(235, 206, 198, 0.6) 0%, rgba(246, 227, 220, 0.3) 50%, rgba(251, 247, 242, 0) 75%)'
        }}
      />

      <div className="max-w-md w-full mx-auto bg-[#fffdfa]/90 backdrop-blur-md border border-[#ebd9cf] rounded-2xl p-8 sm:p-10 shadow-lg card-shadow">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#f6eae2] border border-[#e5d2c6] flex items-center justify-center text-[#9c6f65]"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <DelicateBranch className="w-24 h-8 text-[#bfa399] mx-auto opacity-70 mb-4" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-serif-elegant text-2xl sm:text-3xl text-[#3d2c28] mb-4 font-normal"
        >
          Thank you for taking a moment to read
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-sans-clean text-sm sm:text-base text-[#6b544e] font-light leading-relaxed mb-8"
        >
          I truly hope my words brought comfort rather than any weight. Wishing you peaceful days, kind moments, and the happiness you deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="pt-4 border-t border-[#f0dfd5] flex flex-col items-center gap-3"
        >
          <span className="font-handwriting text-xl text-[#8d6961]">
            Take good care of yourself.
          </span>

          {/* Gentle option to read again if she ever wants to */}
          <button
            onClick={onReopen}
            className="mt-3 inline-flex items-center gap-2 text-xs text-[#a0847c] hover:text-[#523d38] font-sans-clean transition-colors duration-200 cursor-pointer py-1.5 px-3 rounded-full hover:bg-[#f6ebe4]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Read again</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
