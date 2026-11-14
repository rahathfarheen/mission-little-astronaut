import React from 'react';
import { BuildingComponentProps } from '../../types/outpost';

export const CrewHabitat: React.FC<BuildingComponentProps> = ({
  isSelected = false,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  hasDiscovered = false
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label="Crew Habitat Dome - Click to learn about living on the Moon"
      className={`building-interactive-node relative group select-none ${className}`}
    >
      {/* Selection / Discovery Glow Ring */}
      <div 
        className={`absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-300 ${
          isSelected 
            ? 'opacity-100 ring-4 ring-sky-400/80 shadow-[0_0_35px_rgba(56,189,248,0.5)]' 
            : isHovered 
              ? 'opacity-70 ring-2 ring-sky-300/60 shadow-[0_0_20px_rgba(56,189,248,0.3)]' 
              : 'opacity-0'
        }`}
      />

      {/* Floating Child-Friendly Pill Badge */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-all duration-200 pointer-events-none ${
        isHovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-85 translate-y-0'
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-sky-200 border border-sky-400/50 shadow-lg text-xs font-bold backdrop-blur-md">
          <span>🏠</span>
          <span>Crew Habitat</span>
          {hasDiscovered && <span className="text-[10px] text-emerald-400 ml-0.5">✓</span>}
        </div>
      </div>

      {/* Illustrated SVG of Crew Habitat Dome Complex */}
      <svg
        viewBox="0 0 280 200"
        className="w-56 sm:w-64 md:w-72 h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="habDomeGrad2" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="80%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          <radialGradient id="subDomeGrad2" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          <radialGradient id="cozyWindowGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          <linearGradient id="cupolaGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
          </linearGradient>

          <filter id="habNeonGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Foundation Regolith Pad */}
        <ellipse cx="140" cy="180" rx="125" ry="18" fill="#1e293b" opacity="0.8" />
        <ellipse cx="140" cy="178" rx="118" ry="14" fill="#334155" />

        {/* Left Secondary Living/Science Pod Dome */}
        <g transform="translate(10, 20)">
          <path
            d="M 50 155 A 50 48 0 0 1 150 155 Z"
            fill="url(#subDomeGrad2)"
            stroke="#475569"
            strokeWidth="2"
          />
          <path d="M 100 107 L 100 155" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 75 116 Q 100 128 125 116" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          <circle cx="85" cy="135" r="9" fill="url(#cozyWindowGlow2)" stroke="#334155" strokeWidth="2.5" />
          <circle cx="85" cy="135" r="7" fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
          <path d="M 83 138 L 87 138 L 86 141 L 84 141 Z" fill="#78350f" />
          <circle cx="85" cy="136" r="2" fill="#22c55e" />
        </g>

        {/* Pressurized Connecting Tunnel */}
        <rect x="110" y="138" width="55" height="32" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        <line x1="125" y1="138" x2="125" y2="170" stroke="#94a3b8" strokeWidth="2" />
        <line x1="140" y1="138" x2="140" y2="170" stroke="#94a3b8" strokeWidth="2" />
        <line x1="155" y1="138" x2="155" y2="170" stroke="#94a3b8" strokeWidth="2" />

        {/* Main Central Habitat Dome */}
        <path
          d="M 100 170 A 75 70 0 0 1 250 170 Z"
          fill="url(#habDomeGrad2)"
          stroke="#475569"
          strokeWidth="2.5"
        />

        {/* Structural Lines */}
        <path d="M 175 100 L 175 170" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 135 115 Q 175 130 215 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
        <path d="M 115 142 Q 175 160 235 142" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

        {/* Inscription */}
        <rect x="156" y="148" width="38" height="12" rx="3" fill="#0284c7" />
        <text x="175" y="157" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          HAB-01
        </text>

        {/* Cupola Window */}
        <g transform="translate(175, 96)">
          <path
            d="M -22 4 A 22 18 0 0 1 22 4 Z"
            fill="url(#cupolaGlass2)"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <path d="M -14 0 Q -5 -10 10 -4" fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.9" />
          <circle cx="0" cy="1" r="5" fill="#f8fafc" />
          <ellipse cx="0" cy="1" rx="4" ry="2.5" fill="#fbbf24" />
        </g>

        {/* Communications Antenna */}
        <g transform="translate(195, 75)">
          <line x1="0" y1="25" x2="0" y2="0" stroke="#cbd5e1" strokeWidth="2.5" />
          <path d="M -12 2 Q 0 -6 12 2" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="0" cy="-2" r="3" fill="#ef4444" className="animate-pulse" />
          <path
            d="M -10 -8 Q 0 -15 10 -8"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.8"
            className="animate-pulse-glow"
          />
        </g>

        {/* Airlock */}
        <g transform="translate(210, 142)">
          <rect x="0" y="0" width="36" height="34" rx="4" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          <rect x="7" y="6" width="22" height="28" rx="3" fill="#475569" />
          <circle cx="18" cy="20" r="4.5" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
          <circle cx="18" cy="10" r="2.2" fill="#22c55e" filter="url(#habNeonGlow2)" />
        </g>

        {/* Entry Stairs */}
        <path d="M 215 176 L 248 176 L 253 186 L 210 186 Z" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
        <line x1="213" y1="181" x2="250" y2="181" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
