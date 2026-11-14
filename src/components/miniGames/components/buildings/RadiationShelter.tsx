import React from 'react';
import { BuildingComponentProps } from '../../types/outpost';

export const RadiationShelter: React.FC<BuildingComponentProps> = ({
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
      aria-label="Radiation-Protected Shelter - Click to learn how astronauts stay safe from solar storms"
      className={`building-interactive-node relative group select-none ${className}`}
    >
      <div 
        className={`absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-300 ${
          isSelected 
            ? 'opacity-100 ring-4 ring-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.5)]' 
            : isHovered 
              ? 'opacity-70 ring-2 ring-purple-300/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
              : 'opacity-0'
        }`}
      />

      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-all duration-200 pointer-events-none ${
        isHovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-85 translate-y-0'
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-purple-200 border border-purple-400/50 shadow-lg text-xs font-bold backdrop-blur-md">
          <span>🛡️</span>
          <span>Radiation Shelter</span>
          {hasDiscovered && <span className="text-[10px] text-emerald-400 ml-0.5">✓</span>}
        </div>
      </div>

      <svg
        viewBox="0 0 270 210"
        className="w-56 sm:w-64 md:w-72 h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bermGrad2" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="85%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>

          <linearGradient id="armorDoorGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="35%" stopColor="#94a3b8" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <filter id="shelterNeonGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="135" cy="188" rx="125" ry="16" fill="#0f172a" opacity="0.85" />
        <ellipse cx="135" cy="185" rx="118" ry="12" fill="#1e293b" />

        {/* Regolith Mound */}
        <path
          d="M 20 185 Q 50 75 135 65 Q 220 75 250 185 Z"
          fill="url(#bermGrad2)"
          stroke="#475569"
          strokeWidth="3"
        />

        {/* 3D-Printed Masonry Patterns */}
        <g stroke="#64748b" strokeWidth="1.2" opacity="0.5" fill="none">
          <path d="M 50 160 Q 135 145 220 160" />
          <path d="M 65 135 Q 135 120 205 135" />
          <path d="M 85 110 Q 135 98 185 110" />
          <path d="M 110 88 Q 135 80 160 88" />

          <line x1="75" y1="147" x2="75" y2="160" />
          <line x1="115" y1="140" x2="115" y2="153" />
          <line x1="155" y1="140" x2="155" y2="153" />
          <line x1="195" y1="147" x2="195" y2="160" />
        </g>

        {/* Cosmic Ray Sensor Mast */}
        <g transform="translate(135, 25)">
          <line x1="0" y1="40" x2="0" y2="12" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="0" cy="10" r="8" fill="#7e22ce" stroke="#c084fc" strokeWidth="2" />
          <circle cx="0" cy="10" r="4" fill="#a855f7" filter="url(#shelterNeonGlow2)" className="animate-pulse" />
        </g>

        {/* Blast Door Arch */}
        <g transform="translate(75, 95)">
          <path
            d="M 10 90 L 10 35 A 50 50 0 0 1 110 35 L 110 90 Z"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="4"
          />

          {/* Blast Door */}
          <rect
            x="24"
            y="26"
            width="72"
            height="64"
            rx="6"
            fill="url(#armorDoorGrad2)"
            stroke="#334155"
            strokeWidth="3"
          />

          {/* Locking Wheel */}
          <circle cx="60" cy="58" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="60" cy="58" r="9" fill="none" stroke="#f8fafc" strokeWidth="2.5" />
          <line x1="60" y1="46" x2="60" y2="70" stroke="#f8fafc" strokeWidth="2" />
          <line x1="48" y1="58" x2="72" y2="58" stroke="#f8fafc" strokeWidth="2" />

          {/* Shield Status */}
          <rect x="30" y="8" width="60" height="14" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
          <text
            x="60"
            y="18"
            fill="#c084fc"
            fontSize="6.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
            className="animate-pulse"
          >
            SHIELD: 100%
          </text>
        </g>

        {/* Water Shield Indicator */}
        <g transform="translate(195, 120)">
          <rect x="0" y="0" width="18" height="52" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <text
            x="9"
            y="30"
            fill="#ffffff"
            fontSize="7"
            fontWeight="bold"
            textAnchor="middle"
            transform="rotate(-90 9 30)"
            fontFamily="sans-serif"
          >
            H₂O SHIELD
          </text>
        </g>
      </svg>
    </div>
  );
};
