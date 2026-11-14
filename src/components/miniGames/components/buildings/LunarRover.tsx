import React from 'react';
import { BuildingComponentProps } from '../../types/outpost';

export const LunarRover: React.FC<BuildingComponentProps> = ({
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
      aria-label="Lunar Scout Rover - Click to explore the Moon buggy"
      className={`building-interactive-node relative group select-none ${className}`}
    >
      <div 
        className={`absolute -inset-3 rounded-2xl pointer-events-none transition-all duration-300 ${
          isSelected 
            ? 'opacity-100 ring-4 ring-orange-400/80 shadow-[0_0_30px_rgba(249,115,22,0.5)]' 
            : isHovered 
              ? 'opacity-70 ring-2 ring-orange-300/60 shadow-[0_0_18px_rgba(249,115,22,0.3)]' 
              : 'opacity-0'
        }`}
      />

      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-all duration-200 pointer-events-none ${
        isHovered || isSelected ? 'opacity-100 -translate-y-1' : 'opacity-85 translate-y-0'
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-orange-200 border border-orange-400/50 shadow-lg text-xs font-bold backdrop-blur-md">
          <span>🚙</span>
          <span>Lunar Rover</span>
          {hasDiscovered && <span className="text-[10px] text-emerald-400 ml-0.5">✓</span>}
        </div>
      </div>

      <svg
        viewBox="0 0 170 120"
        className="w-40 sm:w-44 md:w-48 h-auto drop-shadow-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="roverBodyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="meshWheelGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <ellipse cx="85" cy="112" rx="70" ry="8" fill="#0f172a" opacity="0.65" />

        <g id="camera-mast">
          <line x1="45" y1="65" x2="45" y2="25" stroke="#94a3b8" strokeWidth="3" />
          <rect x="38" y="20" width="14" height="10" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="1.2" />
          <circle cx="45" cy="25" r="3" fill="#38bdf8" />
        </g>

        <path
          d="M 32 65 L 140 65 L 145 88 L 26 88 Z"
          fill="url(#roverBodyGrad2)"
          stroke="#475569"
          strokeWidth="2"
        />

        <path d="M 30 74 L 142 74 L 144 79 L 28 79 Z" fill="#f97316" />

        <path
          d="M 50 65 L 65 48 L 105 48 L 115 65 Z"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="68" y="52" width="14" height="13" rx="2" fill="#334155" />
        <rect x="88" y="52" width="14" height="13" rx="2" fill="#334155" />

        <g transform="translate(42, 92)">
          <circle cx="0" cy="0" r="16" fill="url(#meshWheelGrad2)" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="0" cy="0" r="6" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        <g transform="translate(126, 92)">
          <circle cx="0" cy="0" r="16" fill="url(#meshWheelGrad2)" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="0" cy="0" r="6" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
