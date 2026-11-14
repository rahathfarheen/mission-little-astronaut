import React from 'react';

export interface EarthBackgroundProps {
  className?: string;
  isNightMode?: boolean;
}

export const EarthBackground: React.FC<EarthBackgroundProps> = ({
  className = '',
  isNightMode = false
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0"
        style={{
          background: isNightMode
            ? 'radial-gradient(ellipse at 75% 20%, #1e1b4b 0%, #0f172a 45%, #020617 90%)'
            : 'radial-gradient(ellipse at 75% 18%, #1e1b4b 0%, #090d16 50%, #02040a 100%)'
        }}
      />

      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20 filter blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8 0%, #c084fc 40%, transparent 70%)' }}
      />
      <div 
        className="absolute top-12 left-1/6 w-80 h-80 rounded-full opacity-15 filter blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #3b82f6 40%, transparent 70%)' }}
      />

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="starGlow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="animate-twinkle-1">
          <circle cx="8%" cy="12%" r="2" fill="#ffffff" filter="url(#starGlow2)" />
          <circle cx="15%" cy="24%" r="1.5" fill="#bae6fd" />
          <circle cx="28%" cy="8%" r="2.5" fill="#fef08a" filter="url(#starGlow2)" />
          <circle cx="36%" cy="19%" r="1.5" fill="#ffffff" />
          <circle cx="48%" cy="11%" r="2" fill="#fed7aa" />
          <circle cx="62%" cy="7%" r="1.5" fill="#ffffff" />
          <circle cx="88%" cy="22%" r="2.5" fill="#bae6fd" filter="url(#starGlow2)" />
          <circle cx="94%" cy="9%" r="1.8" fill="#ffffff" />
        </g>

        <g className="animate-twinkle-2">
          <circle cx="5%" cy="35%" r="1.5" fill="#ffffff" />
          <circle cx="21%" cy="16%" r="2.2" fill="#c4b5fd" filter="url(#starGlow2)" />
          <circle cx="42%" cy="26%" r="1.2" fill="#ffffff" />
          <circle cx="55%" cy="18%" r="1.8" fill="#fef08a" />
          <circle cx="68%" cy="28%" r="1.4" fill="#ffffff" />
          <circle cx="82%" cy="14%" r="2" fill="#bae6fd" filter="url(#starGlow2)" />
          <circle cx="91%" cy="32%" r="1.5" fill="#ffffff" />
        </g>

        <g className="animate-twinkle-3">
          <circle cx="12%" cy="44%" r="1.2" fill="#ffffff" />
          <circle cx="25%" cy="38%" r="1.8" fill="#fed7aa" />
          <circle cx="33%" cy="48%" r="1.5" fill="#ffffff" />
          <circle cx="50%" cy="34%" r="2.5" fill="#ffffff" filter="url(#starGlow2)" />
          <circle cx="60%" cy="42%" r="1.2" fill="#c4b5fd" />
          <circle cx="76%" cy="38%" r="1.8" fill="#fef08a" />
        </g>
      </svg>

      {/* Earth */}
      <div className="absolute top-6 right-10 sm:right-20 md:right-28 pointer-events-auto">
        <div 
          className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full cursor-help transition-transform duration-500 hover:scale-105"
          title="Planet Earth! Our beautiful home world in the cosmos."
        >
          <div 
            className="absolute -inset-3 rounded-full pointer-events-none filter blur-md opacity-80"
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 50%, rgba(37, 99, 235, 0.2) 75%, transparent 100%)'
            }}
          />

          <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl border border-sky-300/40">
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #0284c7 0%, #0369a1 40%, #075985 70%, #0c4a6e 100%)'
              }}
            />

            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 200 200" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#15803d" opacity="0.92">
                <path d="M 35 45 Q 50 35 65 42 Q 80 50 75 70 Q 70 85 58 92 Q 48 95 40 85 Q 32 75 35 45 Z" />
                <path d="M 52 95 Q 60 102 56 118 Q 50 130 42 125 Q 36 118 42 105 Z" />
                <path d="M 85 30 Q 115 25 140 38 Q 155 52 135 65 Q 115 72 100 60 Q 88 48 85 30 Z" />
                <path d="M 98 70 Q 128 65 142 85 Q 138 120 115 135 Q 102 120 95 100 Q 92 82 98 70 Z" />
              </g>

              <g fill="#ffffff">
                <path d="M 45 10 Q 100 25 155 10 Q 130 2 100 2 Q 70 2 45 10 Z" opacity="0.95" />
                <path d="M 20 60 Q 55 50 90 68 Q 130 85 175 70 Q 145 78 100 75 Q 50 70 20 60 Z" opacity="0.8" />
                <path d="M 35 110 Q 75 105 120 118 Q 160 128 185 115 Q 150 125 105 122 Q 60 118 35 110 Z" opacity="0.85" />
              </g>

              <path 
                d="M 100 0 A 100 100 0 0 1 100 200 A 75 100 0 0 0 100 0 Z" 
                fill="#020617" 
                opacity="0.68"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
