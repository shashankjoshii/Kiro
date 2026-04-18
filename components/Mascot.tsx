'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMascot, MascotState } from '@/context/MascotContext';

const messages = [
  "Hey! I'm KIRO 🦊",
  "I know 16+ awesome AI tools!",
  "Try searching for 'image' or 'code'!",
  "Click me for more tips! ✨",
  "Explore tools by category!",
  "I love helping you discover AI! 🧡",
];

function KiroFaceSVG({ state, mousePos }: { state: MascotState, mousePos: { x: number, y: number } }) {
  const isHappy = state === 'happy' || state === 'excited';
  const isThinking = state === 'thinking';

  // Faster animations when thinking or excited
  const earDur = isThinking ? '2s' : isHappy ? '3s' : '5s';
  const earValuesL = isThinking ? '0; -3; 1; 0' : isHappy ? '0; -10; 4; 0' : '0; -6; 2; 0';
  const earValuesR = isThinking ? '0; 3; -1; 0' : isHappy ? '0; 10; -4; 0' : '0; 6; -2; 0';

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
      {/* EARS */}
      {/* Left Ear */}
      <g style={{ transformOrigin: "60px 60px" }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={earValuesL}
          keyTimes="0; 0.33; 0.66; 1"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          dur={earDur}
          repeatCount="indefinite"
        />
        <path d="M 65,70 L 35,20 L 85,45 Z" fill="#372822" />
        <path d="M 62,65 L 42,25 L 80,45 Z" fill="#F28B32" />
        <path d="M 60,60 L 48,32 L 72,48 Z" fill="#FDF0DD" />
      </g>

      {/* Right Ear */}
      <g style={{ transformOrigin: "140px 60px" }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={earValuesR}
          keyTimes="0; 0.33; 0.66; 1"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          dur={earDur}
          repeatCount="indefinite"
        />
        <path d="M 135,70 L 165,20 L 115,45 Z" fill="#372822" />
        <path d="M 138,65 L 158,25 L 120,45 Z" fill="#F28B32" />
        <path d="M 140,60 L 152,32 L 128,48 Z" fill="#FDF0DD" />
      </g>

      {/* HEAD BASE */}
      <ellipse cx="100" cy="95" rx="75" ry="60" fill="#F28B32" />

      {/* CHEEK FLUFF (Cream) */}
      <path
        d="M 25,95 C 10,110 0,135 40,150 C 70,160 100,165 100,165 C 100,165 130,160 160,150 C 200,135 190,110 175,95 C 160,120 135,130 100,130 C 65,130 40,120 25,95 Z"
        fill="#FDF0DD"
      />
      <path
        d="M 100,130 C 65,130 40,120 25,95 C 25,95 40,90 60,105 C 80,120 100,120 100,120 C 100,120 120,120 140,105 C 160,90 175,95 175,95 C 160,120 135,130 100,130 Z"
        fill="#F28B32"
      />

      {/* EYES */}
      <g style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}>
        {isHappy ? (
          <>
            <path d="M 50,100 C 60,85 80,85 90,100" fill="none" stroke="#372822" strokeWidth="6" strokeLinecap="round" />
            <path d="M 110,100 C 120,85 140,85 150,100" fill="none" stroke="#372822" strokeWidth="6" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <ellipse cx={isThinking ? "60" : "65"} cy="95" rx="10" ry="14" fill="#372822" className="transition-all duration-300">
              <animate
                attributeName="ry"
                values={isThinking ? "14; 14; 2; 14; 14; 2; 14; 14" : "14; 14; 1; 14; 14"}
                keyTimes={isThinking ? "0; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 1" : "0; 0.94; 0.96; 0.98; 1"}
                dur={isThinking ? "2s" : "4s"}
                repeatCount="indefinite"
              />
            </ellipse>
            <circle cx={isThinking ? "63" : "68"} cy="88" r="4" fill="#ffffff" className="transition-all duration-300" />
            <circle cx={isThinking ? "57" : "62"} cy="100" r="2" fill="#ffffff" opacity="0.6" className="transition-all duration-300" />

            {/* Right Eye */}
            <ellipse cx={isThinking ? "130" : "135"} cy="95" rx="10" ry="14" fill="#372822" className="transition-all duration-300">
              <animate
                attributeName="ry"
                values={isThinking ? "14; 14; 2; 14; 14; 2; 14; 14" : "14; 14; 1; 14; 14"}
                keyTimes={isThinking ? "0; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 1" : "0; 0.94; 0.96; 0.98; 1"}
                dur={isThinking ? "2s" : "4s"}
                repeatCount="indefinite"
              />
            </ellipse>
            <circle cx={isThinking ? "133" : "138"} cy="88" r="4" fill="#ffffff" className="transition-all duration-300" />
            <circle cx={isThinking ? "127" : "132"} cy="100" r="2" fill="#ffffff" opacity="0.6" className="transition-all duration-300" />
          </>
        )}
      </g>

      {/* EYEBROWS */}
      <path
        d={isThinking ? "M 50,80 C 65,75 80,75 80,75" : "M 45,75 C 60,67 75,75 75,75"}
        fill="none"
        stroke="#372822"
        strokeWidth="4"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <path
        d={isThinking ? "M 150,75 C 135,70 120,65 120,65" : "M 155,75 C 140,67 125,75 125,75"}
        fill="none"
        stroke="#372822"
        strokeWidth="4"
        strokeLinecap="round"
        className="transition-all duration-300"
      />

      {/* NOSE */}
      <ellipse cx="100" cy="118" rx="8" ry="6" fill="#372822" />
      <ellipse cx="97" cy="115" rx="3" ry="1.5" fill="#ffffff" opacity="0.5" />

      {/* MOUTH */}
      {isHappy ? (
        <path
          d="M 85,130 C 100,150 115,130 115,130"
          fill="none"
          stroke="#372822"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : isThinking ? (
        <path
          d="M 90,130 C 95,128 105,128 110,130"
          fill="none"
          stroke="#372822"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M 85,130 Q 100,138 115,130"
          fill="none"
          stroke="#372822"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      {/* CHEEK BLUSH */}
      <g fill="#D47754" opacity={isHappy ? "0.4" : "0.2"} className="transition-opacity duration-300">
        <ellipse cx="40" cy="115" rx="12" ry="8" />
        <ellipse cx="160" cy="115" rx="12" ry="8" />
      </g>
    </svg>
  );
}

export default function Mascot() {
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const { mascotState, setMascotState } = useMascot();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      const maxDist = 3; 
      const dist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const ratio = dist > 0 ? Math.min(dist, 300) / 300 : 0;
      
      const moveX = (offsetX / (dist || 1)) * (maxDist * ratio);
      const moveY = (offsetY / (dist || 1)) * (maxDist * ratio);

      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
      setMascotState('happy');
      setTimeout(() => { setShowBubble(false); setMascotState('idle'); }, 4000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClick() {
    setMascotState('happy');
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    setShowBubble(true);
    setTimeout(() => { setShowBubble(false); setMascotState('idle'); }, 4000);
  }

  // Also open the bubble when mascot gets 'excited' from other context updates
  useEffect(() => {
    if (mascotState === 'excited' && !showBubble) {
       setShowBubble(true);
       setCurrentMessage(1); // "I know 16+ awesome AI tools!"
       const t = setTimeout(() => setShowBubble(false), 3000);
       return () => clearTimeout(t);
    }
  }, [mascotState, showBubble]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="mr-2 max-w-[200px] rounded-2xl rounded-br-sm border border-border bg-card px-4 py-3 text-sm font-serif leading-relaxed text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-accent/20"
          >
            {messages[currentMessage]}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full border border-border bg-card shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_8px_30px_rgba(212,119,84,0.25)] hover:border-accent/30 flex items-center justify-center p-1"
        aria-label="KIRO the fox mascot"
      >
        <div className="absolute inset-0 bg-accent/5 rounded-full" />
        <KiroFaceSVG state={mascotState} mousePos={mousePos} />
      </motion.button>
    </div>
  );
}

