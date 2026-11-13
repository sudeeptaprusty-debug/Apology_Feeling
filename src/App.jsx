import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundParticles from './components/BackgroundParticles';
import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import LandingHero from './components/LandingHero';
import ApologyLetter from './components/ApologyLetter';
import ClosingScreen from './components/ClosingScreen';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'letter' | 'closed'

  const handleOpenLetter = () => {
    setView('letter');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseLetter = () => {
    setView('closed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReopen = () => {
    setView('letter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#faf7f2] relative overflow-hidden font-sans-clean select-text">
      {/* Visual Ambiance: Floating stars & dust motes */}
      <BackgroundParticles />

      {/* Visual Ambiance: Delicate falling flower petals */}
      <FallingPetals />

      {/* Soft Music / Rain Audio Controller (Off by default, user-controlled) */}
      <AudioPlayer />

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingHero key="landing" onOpenLetter={handleOpenLetter} />
        )}

        {view === 'letter' && (
          <ApologyLetter key="letter" onClose={handleCloseLetter} />
        )}

        {view === 'closed' && (
          <ClosingScreen key="closed" onReopen={handleReopen} />
        )}
      </AnimatePresence>

      {/* Subtle bottom footer copyright/credit */}
      <footer className="relative z-20 pb-6 text-center text-xs text-[#b8a29a] font-serif-elegant italic">
        A heartfelt and gentle note
      </footer>
    </main>
  );
}
