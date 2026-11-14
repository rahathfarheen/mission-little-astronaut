import React from 'react';

export const AstronautAvatar = ({
  suit = { hex: '#F8F9FA', accent: '#3A86FF' },
  visor = { hex: '#FFD166', reflection: '#FFF3B0' },
  patch = { icon: '🚀' },
  size = 180,
  animate = true,
  className = ''
}) => {
  const suitMain = suit?.hex || '#F8F9FA';
  const suitAccent = suit?.accent || '#3A86FF';
  const visorMain = visor?.hex || '#FFD166';
  const visorReflect = visor?.reflection || '#FFF3B0';
  const patchIcon = patch?.icon || '🚀';

  return (
    <div
      className={`${animate ? 'animate-float' : ''} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        display: 'inline-block',
        position: 'relative'
      }}
    >
      <svg
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor={suitMain} />
            <stop offset="100%" stopColor="#8A9BA8" />
          </linearGradient>

          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={visorReflect} />
            <stop offset="30%" stopColor={visorMain} />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <filter id="visorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={visorMain} floodOpacity="0.6"/>
          </filter>
        </defs>

        {/* Life Support Backpack (PLSS) */}
        <rect x="52" y="70" width="96" height="100" rx="20" fill="#334155" stroke="#475569" strokeWidth="4" />
        <rect x="62" y="80" width="20" height="40" rx="6" fill="#1E293B" />
        <circle cx="120" cy="95" r="8" fill={suitAccent} />
        <circle cx="120" cy="115" r="6" fill="#06D6A0" />

        {/* Legs and Boots */}
        {/* Left Leg */}
        <rect x="65" y="150" width="28" height="48" rx="14" fill="url(#suitGrad)" stroke="#475569" strokeWidth="3" />
        {/* Left Boot */}
        <path d="M58 190 C58 184, 95 184, 95 190 L95 204 C95 210, 52 210, 52 204 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        <line x1="58" y1="200" x2="92" y2="200" stroke={suitAccent} strokeWidth="3" strokeLinecap="round" />

        {/* Right Leg */}
        <rect x="107" y="150" width="28" height="48" rx="14" fill="url(#suitGrad)" stroke="#475569" strokeWidth="3" />
        {/* Right Boot */}
        <path d="M105 190 C105 184, 142 184, 142 190 L148 204 C148 210, 105 210, 105 204 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        <line x1="108" y1="200" x2="142" y2="200" stroke={suitAccent} strokeWidth="3" strokeLinecap="round" />

        {/* Torso & Suit Body */}
        <rect x="56" y="85" width="88" height="75" rx="26" fill="url(#suitGrad)" stroke="#64748B" strokeWidth="4" />

        {/* Chest utility pack */}
        <rect x="74" y="100" width="52" height="44" rx="10" fill="#0F172A" stroke={suitAccent} strokeWidth="2.5" />
        
        {/* Mission Patch Icon */}
        <circle cx="88" cy="118" r="10" fill="rgba(255,255,255,0.15)" />
        <text x="88" y="122" fontSize="12" textAnchor="middle" dominantBaseline="middle">{patchIcon}</text>
        
        {/* Chest buttons */}
        <circle cx="114" cy="112" r="4" fill="#EF476F" />
        <circle cx="114" cy="124" r="4" fill="#06D6A0" />

        {/* Arms & Gloves */}
        {/* Left Arm (Relaxed) */}
        <path d="M58 95 C40 105, 36 128, 42 145" stroke="url(#suitGrad)" strokeWidth="22" strokeLinecap="round" />
        <circle cx="44" cy="148" r="12" fill="#1E293B" stroke="#334155" strokeWidth="3" />

        {/* Right Arm (Waving friendly greeting) */}
        <path d="M142 95 C158 90, 168 70, 166 55" stroke="url(#suitGrad)" strokeWidth="22" strokeLinecap="round" />
        <circle cx="166" cy="52" r="13" fill="#1E293B" stroke="#334155" strokeWidth="3" />
        <rect x="156" y="38" width="8" height="14" rx="4" fill="#1E293B" transform="rotate(-15 156 38)" />
        <rect x="165" y="35" width="8" height="15" rx="4" fill="#1E293B" transform="rotate(5 165 35)" />
        <rect x="174" y="38" width="8" height="13" rx="4" fill="#1E293B" transform="rotate(25 174 38)" />

        {/* Helmet */}
        <circle cx="100" cy="58" r="44" fill="url(#suitGrad)" stroke="#64748B" strokeWidth="4" />
        
        {/* Helmet Visor */}
        <rect
          x="66"
          y="32"
          width="68"
          height="50"
          rx="22"
          fill="url(#visorGrad)"
          stroke="#0F172A"
          strokeWidth="3.5"
          filter="url(#visorGlow)"
        />

        {/* Visor Glare / Star Reflection */}
        <path
          d="M74 44 Q85 36 102 36 Q88 48 76 58 Z"
          fill="rgba(255, 255, 255, 0.75)"
        />
        <circle cx="120" cy="44" r="3" fill="#FFFFFF" opacity="0.8" />

        {/* Cute Helmet Antenna */}
        <line x1="100" y1="14" x2="100" y2="4" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="3" r="5" fill="#EF476F">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};
