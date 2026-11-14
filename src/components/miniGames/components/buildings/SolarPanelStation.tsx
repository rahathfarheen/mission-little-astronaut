import React from 'react';
import { BuildingComponentProps } from '../../types/outpost';

export const SolarPanelStation: React.FC<BuildingComponentProps> = ({
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
      aria-label="Solar Panel Station - Click to learn how sunlight powers the Moon Base"
      className={`building-interactive-node relative group select-none ${className}`}
    >
      <div 
        className={`absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-300 ${
          isSelected 
            ? 'opacity-100 ring-4 ring-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.5)]' 
            : isHovered 
              ? 'opacity-70 ring-2 ring-amber-300/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
              : 'opacity-0'
        }`}
      />

      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-all duration-200 pointer-events-none ${
        isHovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-85 translate-y-0'
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-amber-200 border border-amber-400/50 shadow-lg text-xs font-bold backdrop-blur-md">
          <span>☀️</span>
          <span>Solar Power Station</span>
          {hasDiscovered && <span className="text-[10px] text-emerald-400 ml-0.5">✓</span>}
        </div>
      </div>

      <svg
        viewBox="0 0 260 210"
        className="w-52 sm:w-60 md:w-68 h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="solarCellGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="45%" stopColor="#1d4ed8" />
            <stop offset="80%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="sunSheen2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="solarFrameGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="batteryGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <filter id="solarGlowFilter2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="130" cy="195" rx="100" ry="14" fill="#1e293b" opacity="0.8" />
        <ellipse cx="130" cy="192" rx="90" ry="10" fill="#334155" />

        <g id="central-mast">
          <line x1="90" y1="192" x2="130" y2="135" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <line x1="170" y1="192" x2="130" y2="135" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <line x1="130" y1="192" x2="130" y2="135" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          
          <circle cx="130" cy="135" r="14" fill="#475569" stroke="#fbbf24" strokeWidth="2.5" />
          <circle cx="130" cy="135" r="7" fill="#fbbf24" />
          <circle cx="130" cy="135" r="3" fill="#ffffff" />

          <line x1="130" y1="135" x2="130" y2="70" stroke="#cbd5e1" strokeWidth="6" />
          <line x1="20" y1="70" x2="240" y2="70" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Left Wing */}
        <g transform="translate(18, 20)">
          <rect x="0" y="0" width="100" height="90" rx="6" fill="#0f172a" stroke="url(#solarFrameGrad2)" strokeWidth="3" />
          <rect x="4" y="4" width="92" height="82" rx="4" fill="url(#solarCellGrad2)" />
          
          <line x1="4" y1="24" x2="96" y2="24" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="4" y1="45" x2="96" y2="45" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="4" y1="66" x2="96" y2="66" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          
          <line x1="27" y1="4" x2="27" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="4" x2="50" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="73" y1="4" x2="73" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />

          <path d="M 4 4 L 55 4 L 4 55 Z" fill="url(#sunSheen2)" />
          <path d="M 40 4 L 95 4 L 4 90 L 4 70 Z" fill="url(#sunSheen2)" opacity="0.5" />
          <circle cx="90" cy="12" r="3" fill="#fef08a" filter="url(#solarGlowFilter2)" className="animate-pulse" />
        </g>

        {/* Right Wing */}
        <g transform="translate(142, 20)">
          <rect x="0" y="0" width="100" height="90" rx="6" fill="#0f172a" stroke="url(#solarFrameGrad2)" strokeWidth="3" />
          <rect x="4" y="4" width="92" height="82" rx="4" fill="url(#solarCellGrad2)" />

          <line x1="4" y1="24" x2="96" y2="24" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="4" y1="45" x2="96" y2="45" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="4" y1="66" x2="96" y2="66" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />

          <line x1="27" y1="4" x2="27" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="50" y1="4" x2="50" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          <line x1="73" y1="4" x2="73" y2="86" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />

          <path d="M 4 4 L 55 4 L 4 55 Z" fill="url(#sunSheen2)" />
          <path d="M 40 4 L 95 4 L 4 90 L 4 70 Z" fill="url(#sunSheen2)" opacity="0.5" />
          <circle cx="10" cy="12" r="3" fill="#fef08a" filter="url(#solarGlowFilter2)" className="animate-pulse" />
        </g>

        {/* Battery Vault */}
        <g transform="translate(85, 148)">
          <rect x="0" y="0" width="90" height="42" rx="5" fill="url(#batteryGrad2)" stroke="#64748b" strokeWidth="2" />
          <rect x="12" y="10" width="66" height="8" rx="3" fill="#0f172a" />
          <rect x="14" y="12" width="62" height="4" rx="2" fill="#22c55e" filter="url(#solarGlowFilter2)" className="animate-pulse-glow" />

          <circle cx="20" cy="28" r="3" fill="#22c55e" />
          <circle cx="32" cy="28" r="3" fill="#22c55e" />
          <circle cx="44" cy="28" r="3" fill="#22c55e" />
          <circle cx="56" cy="28" r="3" fill="#fbbf24" />
          <circle cx="68" cy="28" r="3" fill="#38bdf8" />
        </g>

        {/* Base Energy Conduits */}
        <path d="M 85 178 Q 45 185 0 190" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="4 4" />
        <path d="M 175 178 Q 215 185 260 190" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="4 4" />
      </svg>
    </div>
  );
};
