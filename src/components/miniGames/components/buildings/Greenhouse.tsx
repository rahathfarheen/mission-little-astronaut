import React from 'react';
import { BuildingComponentProps } from '../../types/outpost';

export const Greenhouse: React.FC<BuildingComponentProps> = ({
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
      aria-label="Lunar Greenhouse Dome - Click to learn how plants grow on the Moon"
      className={`building-interactive-node relative group select-none ${className}`}
    >
      <div 
        className={`absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-300 ${
          isSelected 
            ? 'opacity-100 ring-4 ring-emerald-400/80 shadow-[0_0_35px_rgba(52,211,153,0.5)]' 
            : isHovered 
              ? 'opacity-70 ring-2 ring-emerald-300/60 shadow-[0_0_20px_rgba(52,211,153,0.3)]' 
              : 'opacity-0'
        }`}
      />

      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-all duration-200 pointer-events-none ${
        isHovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-85 translate-y-0'
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-emerald-200 border border-emerald-400/50 shadow-lg text-xs font-bold backdrop-blur-md">
          <span>🌱</span>
          <span>Lunar Bio-Dome</span>
          {hasDiscovered && <span className="text-[10px] text-emerald-400 ml-0.5">✓</span>}
        </div>
      </div>

      <svg
        viewBox="0 0 250 200"
        className="w-52 sm:w-60 md:w-68 h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glassDomeGrad2" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#6ee7b7" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#059669" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.7" />
          </radialGradient>

          <radialGradient id="growLightGlow2" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.45" />
            <stop offset="90%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="baseGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <filter id="plantGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="125" cy="180" rx="110" ry="16" fill="#1e293b" opacity="0.8" />
        <ellipse cx="125" cy="176" rx="102" ry="12" fill="url(#baseGrad2)" stroke="#475569" strokeWidth="2" />

        <g id="greenhouse-interior">
          <path d="M 35 174 A 90 85 0 0 1 215 174 Z" fill="url(#growLightGlow2)" />

          {/* Tier 1 Shelves */}
          <rect x="55" y="148" width="140" height="8" rx="2" fill="#475569" />
          <rect x="60" y="142" width="130" height="6" rx="2" fill="#047857" />
          
          <g fill="#22c55e">
            <circle cx="68" cy="138" r="6" />
            <circle cx="76" cy="136" r="7" />
            <circle cx="86" cy="139" r="6" />
            <circle cx="96" cy="136" r="8" fill="#4ade80" />
            <circle cx="108" cy="138" r="7" />
            <circle cx="120" cy="135" r="9" />
            <circle cx="132" cy="138" r="8" fill="#4ade80" />
            <circle cx="145" cy="136" r="7" />
            <circle cx="158" cy="139" r="8" />
            <circle cx="170" cy="136" r="7" />
            <circle cx="182" cy="138" r="6" fill="#4ade80" />
          </g>

          {/* Tier 2 Shelves */}
          <rect x="70" y="118" width="110" height="7" rx="2" fill="#475569" />
          <rect x="75" y="113" width="100" height="5" rx="2" fill="#065f46" />

          <g fill="#16a34a">
            <circle cx="82" cy="108" r="6" />
            <circle cx="94" cy="105" r="7" />
            <circle cx="106" cy="107" r="6" />
            <circle cx="118" cy="104" r="8" fill="#4ade80" />
            <circle cx="130" cy="107" r="7" />
            <circle cx="142" cy="105" r="6" />
            <circle cx="154" cy="108" r="7" />
            <circle cx="166" cy="106" r="6" />
          </g>

          {/* Strawberries */}
          <g fill="#ef4444" filter="url(#plantGlow2)">
            <circle cx="90" cy="116" r="3.5" />
            <circle cx="115" cy="117" r="4" />
            <circle cx="138" cy="116" r="3.5" />
            <circle cx="160" cy="117" r="3.5" />
          </g>

          <rect x="120" y="65" width="10" height="50" rx="3" fill="#94a3b8" />
          <rect x="105" y="58" width="40" height="7" rx="3" fill="#a855f7" />
          <line x1="125" y1="58" x2="125" y2="40" stroke="#cbd5e1" strokeWidth="2" />
          <polygon points="105,65 145,65 175,115 75,115" fill="#f472b6" opacity="0.25" />

          {/* Bubbles */}
          <g fill="#ffffff" opacity="0.75" className="animate-pulse">
            <circle cx="95" cy="90" r="2.5" />
            <circle cx="148" cy="82" r="3" />
            <circle cx="132" cy="68" r="2" />
            <circle cx="108" cy="52" r="2.8" />
          </g>
        </g>

        {/* Outer Dome */}
        <path d="M 35 174 A 90 85 0 0 1 215 174 Z" fill="url(#glassDomeGrad2)" stroke="#059669" strokeWidth="3" />

        <g stroke="#34d399" strokeWidth="1.6" opacity="0.8" fill="none">
          <line x1="125" y1="42" x2="125" y2="174" />
          <path d="M 80 58 Q 125 75 170 58" />
          <path d="M 55 98 Q 125 125 195 98" />
          <path d="M 40 142 Q 125 170 210 142" />
        </g>

        <path d="M 50 140 A 82 78 0 0 1 125 50" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

        {/* Side Oxygen Tube */}
        <g transform="translate(195, 125)">
          <rect x="0" y="0" width="16" height="50" rx="4" fill="#0284c7" opacity="0.8" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="8" cy="15" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="8" cy="28" r="3" fill="#ffffff" opacity="0.9" />
          <path d="M 8 50 L 8 58 L -20 58" stroke="#38bdf8" strokeWidth="3" fill="none" />
        </g>

        {/* Side Airlock */}
        <g transform="translate(25, 148)">
          <rect x="0" y="0" width="22" height="28" rx="3" fill="#334155" stroke="#059669" strokeWidth="2" />
          <circle cx="11" cy="14" r="3" fill="#34d399" />
        </g>
      </svg>
    </div>
  );
};
