'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMascot } from '@/context/MascotContext';
import { useState, useEffect, useRef } from 'react';

type Sparkle = { id: number; x: number; y: number; scale: number; angle: number };

export default function KiroHero() {
  const { mascotState, setMascotState } = useMascot();
  const [isJumping, setIsJumping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showHeart, setShowHeart] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const sparkleId = useRef(0);

  const isThinking = mascotState === 'thinking';
  const isHappy = mascotState === 'happy' || mascotState === 'excited' || isJumping;
  const isExcited = mascotState === 'excited' || isJumping;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ratio = Math.min(dist, 200) / 200;
      const maxPx = 4;
      setMousePos({ x: (dx / dist) * maxPx * ratio, y: (dy / dist) * maxPx * ratio });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spawnSparkles = () => {
    const newSparkles: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
      id: sparkleId.current++,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 40 + (Math.random() - 0.5) * 60,
      scale: 0.5 + Math.random() * 0.8,
      angle: (i / 6) * 360,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(n => n.id === s.id)));
    }, 700);
  };

  const handleTap = () => {
    if (isJumping) return;
    setIsJumping(true);
    setMascotState('excited');
    spawnSparkles();
    setShowHeart(true);
    setTimeout(() => { setShowHeart(false); }, 1200);
    setTimeout(() => { setIsJumping(false); setMascotState('idle'); }, 800);
  };

  useEffect(() => {
    if (mascotState === 'excited') {
      spawnSparkles();
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mascotState]);

  const breathDur = isThinking ? '2s' : isHappy ? '2.5s' : '3.5s';
  const breathValues = isThinking ? '1 1; 1.005 0.995; 1 1' : isHappy ? '1 1; 1.025 0.975; 1 1' : '1 1; 1.015 0.985; 1 1';
  const tailDur = isThinking ? '2s' : isHappy ? '1.2s' : '4s';
  const tailValues = isThinking ? '0; 3; -1; 0' : isHappy ? '0; 28; -18; 5; 0' : '0; 12; -6; 0';
  const earDur = isThinking ? '2s' : isHappy ? '2s' : '4s';
  const earObjL = isThinking ? '0; -3; 1; 0' : isHappy ? '0; -12; 5; 0' : '0; -8; 2; 0';
  const earObjR = isThinking ? '0; 3; -1; 0' : isHappy ? '0; 12; -5; 0' : '0; 8; -2; 0';

  return (
    <div className="relative h-[250px] w-[250px] sm:h-[320px] sm:w-[320px]">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-4 rounded-full pointer-events-none"
        animate={{
          background: isExcited
            ? ['radial-gradient(circle, rgba(242,139,50,0.35) 0%, transparent 70%)', 'radial-gradient(circle, rgba(242,139,50,0.15) 0%, transparent 70%)']
            : isHappy
            ? 'radial-gradient(circle, rgba(242,139,50,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(242,139,50,0.08) 0%, transparent 70%)',
          scale: isExcited ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: isExcited ? 0.6 : 0.5, repeat: isExcited ? Infinity : 0, repeatType: 'reverse' }}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Floating hearts */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            key="heart"
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl pointer-events-none z-20"
          >
            🧡
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle burst particles */}
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: s.scale * 0.3, x: `calc(${s.x}% - 8px)`, y: `calc(${s.y}% - 8px)` }}
            animate={{
              opacity: 0,
              scale: s.scale * 1.4,
              x: `calc(${s.x + Math.cos(s.angle * Math.PI / 180) * 45}% - 8px)`,
              y: `calc(${s.y + Math.sin(s.angle * Math.PI / 180) * 45}% - 8px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute pointer-events-none text-base z-20"
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating bob animation wrapper */}
      <motion.div
        className="relative h-full w-full cursor-pointer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: isJumping ? -28 : [0, -6, 0],
        }}
        transition={
          isJumping
            ? { opacity: { duration: 0.8 }, scale: { duration: 0.8, type: 'spring', bounce: 0.4 }, y: { type: 'spring', bounce: 0.55, duration: 0.6 } }
            : { opacity: { duration: 0.8 }, scale: { duration: 0.8, type: 'spring', bounce: 0.4 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } }
        }
        onClick={handleTap}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Thinking dots above head */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 z-10"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Breathing wrapper */}
          <g>
            <animateTransform attributeName="transform" type="scale" values={breathValues}
              keyTimes="0; 0.5; 1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
              dur={breathDur} repeatCount="indefinite" />

            {/* TAIL */}
            <g style={{ transformOrigin: '110px 160px' }}>
              <animateTransform attributeName="transform" type="rotate" values={tailValues}
                keyTimes={isHappy ? "0; 0.25; 0.5; 0.75; 1" : "0; 0.33; 0.66; 1"}
                calcMode="spline"
                keySplines={isHappy ? "0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" : "0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"}
                dur={tailDur} repeatCount="indefinite" />
              <path d="M 110,160 C 150,190 190,150 185,110 C 180,70 160,80 150,105 C 145,120 135,145 110,160 Z" fill="#F28B32" />
              <path d="M 185,110 C 180,70 160,80 150,105 C 145,120 148,125 155,125 C 170,125 180,120 185,110 Z" fill="#FDF0DD" />
            </g>

            {/* BACK LEGS */}
            <path d="M 60,150 C 45,150 45,175 60,185 C 70,190 80,185 80,185" fill="#E07925" />
            <path d="M 140,150 C 155,150 155,175 140,185 C 130,190 120,185 120,185" fill="#E07925" />
            <ellipse cx="55" cy="183" rx="12" ry="7" fill="#372822" />
            <ellipse cx="145" cy="183" rx="12" ry="7" fill="#372822" />

            {/* BODY */}
            <path d="M 85,90 C 70,120 65,150 75,180 L 125,180 C 135,150 130,120 115,90 Z" fill="#F28B32" />
            <path d="M 100,100 C 85,120 80,140 85,160 C 90,170 100,175 100,175 C 100,175 110,170 115,160 C 120,140 115,120 100,100 Z" fill="#FDF0DD" />

            {/* FRONT LEGS */}
            <rect x="80" y="140" width="16" height="40" rx="6" fill="#F28B32" />
            <rect x="104" y="140" width="16" height="40" rx="6" fill="#F28B32" />
            <path d="M 78,170 L 98,170 L 96,182 C 96,186 80,186 80,182 Z" fill="#372822" />
            <path d="M 102,170 L 122,170 L 120,182 C 120,186 104,186 104,182 Z" fill="#372822" />

            {/* HEAD GROUP */}
            <g>
              {/* Left Ear */}
              <g style={{ transformOrigin: '60px 60px' }}>
                <animateTransform attributeName="transform" type="rotate" values={earObjL}
                  keyTimes="0; 0.33; 0.66; 1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  dur={earDur} repeatCount="indefinite" />
                <path d="M 65,70 L 35,20 L 85,45 Z" fill="#372822" />
                <path d="M 62,65 L 42,25 L 80,45 Z" fill="#F28B32" />
                <path d="M 60,60 L 48,32 L 72,48 Z" fill="#FDF0DD" />
              </g>

              {/* Right Ear */}
              <g style={{ transformOrigin: '140px 60px' }}>
                <animateTransform attributeName="transform" type="rotate" values={earObjR}
                  keyTimes="0; 0.33; 0.66; 1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  dur={earDur} repeatCount="indefinite" />
                <path d="M 135,70 L 165,20 L 115,45 Z" fill="#372822" />
                <path d="M 138,65 L 158,25 L 120,45 Z" fill="#F28B32" />
                <path d="M 140,60 L 152,32 L 128,48 Z" fill="#FDF0DD" />
              </g>

              {/* Head Base */}
              <ellipse cx="100" cy="75" rx="55" ry="45" fill="#F28B32" />

              {/* Cheek Fluff */}
              <path d="M 45,75 C 30,85 20,105 50,115 C 70,120 100,125 100,125 C 100,125 130,120 150,115 C 180,105 170,85 155,75 C 145,95 125,100 100,100 C 75,100 55,95 45,75 Z" fill="#FDF0DD" />
              <path d="M 100,100 C 75,100 55,95 45,75 C 45,75 55,70 70,80 C 85,90 100,90 100,90 C 100,90 115,90 130,80 C 145,70 155,75 155,75 C 145,95 125,100 100,100 Z" fill="#F28B32" />

              {/* EYES */}
              <g style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.1s ease-out' }}>
                {isExcited ? (
                  /* Star eyes when excited */
                  <>
                    <text x="63" y="82" fontSize="18" textAnchor="middle" fill="#372822">★</text>
                    <text x="137" y="82" fontSize="18" textAnchor="middle" fill="#372822">★</text>
                  </>
                ) : (
                  <>
                    {/* Left Eye */}
                    <ellipse cx={isThinking ? '65' : '70'} cy="75" rx="7" ry="10" fill="#372822" className="transition-all duration-300">
                      <animate attributeName="ry"
                        values={isThinking ? '10; 10; 2; 10; 10; 2; 10; 10' : '10; 10; 1; 10; 10'}
                        keyTimes={isThinking ? '0; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 1' : '0; 0.94; 0.96; 0.98; 1'}
                        dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    <circle cx={isThinking ? '67' : '72'} cy="70" r="2.5" fill="#ffffff" className="transition-all duration-300" />
                    <circle cx={isThinking ? '63' : '68'} cy="79" r="1" fill="#ffffff" opacity="0.6" className="transition-all duration-300" />
                    {/* Right Eye */}
                    <ellipse cx={isThinking ? '125' : '130'} cy="75" rx="7" ry="10" fill="#372822" className="transition-all duration-300">
                      <animate attributeName="ry"
                        values={isThinking ? '10; 10; 2; 10; 10; 2; 10; 10' : '10; 10; 1; 10; 10'}
                        keyTimes={isThinking ? '0; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 1' : '0; 0.94; 0.96; 0.98; 1'}
                        dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    <circle cx={isThinking ? '127' : '132'} cy="70" r="2.5" fill="#ffffff" className="transition-all duration-300" />
                    <circle cx={isThinking ? '123' : '128'} cy="79" r="1" fill="#ffffff" opacity="0.6" className="transition-all duration-300" />
                  </>
                )}
              </g>

              {/* EYEBROWS */}
              <path d={isThinking ? 'M 60,65 Q 70,60 80,67' : 'M 55,60 Q 70,52 85,60'}
                fill="none" stroke="#372822" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-300" />
              <path d={isThinking ? 'M 140,65 Q 130,60 120,67' : 'M 145,60 Q 130,52 115,60'}
                fill="none" stroke="#372822" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-300" />

              {/* NOSE */}
              <ellipse cx="100" cy="92" rx="6" ry="4" fill="#372822" />
              <ellipse cx="98" cy="90" rx="2" ry="1" fill="#ffffff" opacity="0.5" />

              {/* MOUTH */}
              {isExcited ? (
                <path d="M 82,100 C 91,118 109,118 118,100" fill="none" stroke="#372822" strokeWidth="2.5" strokeLinecap="round" />
              ) : isHappy ? (
                <path d="M 85,100 C 100,115 115,100 115,100" fill="none" stroke="#372822" strokeWidth="2.5" strokeLinecap="round" />
              ) : isThinking ? (
                <path d="M 90,102 Q 100,100 110,102" fill="none" stroke="#372822" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M 85,100 Q 100,108 115,100" fill="none" stroke="#372822" strokeWidth="2" strokeLinecap="round" />
              )}

              {/* CHEEK BLUSH DOTS */}
              <g fill="#D47754" opacity={isHappy ? '0.5' : '0.2'} className="transition-opacity duration-300">
                <circle cx="55" cy="85" r="1.5" />
                <circle cx="50" cy="90" r="1.5" />
                <circle cx="60" cy="92" r="1.5" />
                <circle cx="145" cy="85" r="1.5" />
                <circle cx="150" cy="90" r="1.5" />
                <circle cx="140" cy="92" r="1.5" />
              </g>

              {/* ROSY CHEEK ELLIPSES */}
              <ellipse cx="52" cy="88" rx="10" ry="6" fill="#D47754" opacity={isHappy ? '0.18' : '0.07'} className="transition-opacity duration-300" />
              <ellipse cx="148" cy="88" rx="10" ry="6" fill="#D47754" opacity={isHappy ? '0.18' : '0.07'} className="transition-opacity duration-300" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-foreground/5 pointer-events-none"
        animate={{ scaleX: isJumping ? 0.5 : 1, opacity: isJumping ? 0.3 : 0.7 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
