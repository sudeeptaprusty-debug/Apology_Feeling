import React from 'react';

// Delicate hand-drawn floral branch SVG
export function DelicateBranch({ className = "w-24 h-12 text-[#c2a297]" }) {
  return (
    <svg
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 25 C45 23, 85 27, 150 25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Delicate leaves */}
      <path
        d="M35 24 C38 16, 48 15, 52 23 C46 25, 39 25, 35 24 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M60 25 C63 32, 73 33, 76 25 C70 24, 63 24, 60 25 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M85 24 C89 15, 100 16, 103 23 C96 26, 89 25, 85 24 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M110 25 C113 33, 124 33, 127 25 C120 24, 114 24, 110 25 Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* Little bud */}
      <circle cx="152" cy="25" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Delicate paper corner accent
export function PaperCorner({ position = "top-left" }) {
  const rotationClass = {
    "top-left": "top-2 left-2 rotate-0",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180",
    "bottom-left": "bottom-2 left-2 -rotate-90",
  }[position] || "";

  return (
    <svg
      className={`absolute w-6 h-6 text-[#deb8ad]/40 pointer-events-none ${rotationClass}`}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 18 C2 9, 9 2, 18 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Small wax seal or gentle heart stamp
export function GentleHeartStamp({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
