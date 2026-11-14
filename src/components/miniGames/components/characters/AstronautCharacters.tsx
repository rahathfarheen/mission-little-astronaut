import React from 'react';
import { OutpostElementId } from '../../types/outpost';

export interface AstronautCharactersProps {
  onSelectAstronaut: (id: OutpostElementId) => void;
  selectedId?: OutpostElementId | null;
  className?: string;
}

export const AstronautCharacters: React.FC<AstronautCharactersProps> = ({
  onSelectAstronaut,
  selectedId,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* 1. Commander Leo */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectAstronaut('astronaut-leo')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectAstronaut('astronaut-leo')}
        aria-label="Commander Leo - Click to talk with the Mission Commander"
        className="absolute top-[48%] left-[12%] sm:left-[14%] pointer-events-auto cursor-pointer group select-none"
      >
        <div className={`relative transition-transform duration-300 ${
          selectedId === 'astronaut-leo' ? 'scale-110' : 'group-hover:scale-105'
        }`}>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/95 text-cyan-300 border border-cyan-400/60 shadow-md text-[11px] font-bold">
              <span>👨‍🚀</span>
              <span>Cmdr. Leo</span>
            </div>
          </div>

          <div className="animate-float-astronaut">
            <svg width="74" height="96" viewBox="0 0 74 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="22" width="22" height="36" rx="5" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <rect x="18" y="26" width="6" height="24" rx="3" fill="#38bdf8" />
              <rect x="26" y="26" width="6" height="24" rx="3" fill="#38bdf8" />

              <path d="M 32 58 L 26 78 L 18 80" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="18" cy="81" rx="7" ry="4" fill="#64748b" />
              <path d="M 44 58 L 48 76 L 56 78" stroke="#f8fafc" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="56" cy="79" rx="7" ry="4" fill="#64748b" />

              <rect x="26" y="28" width="26" height="32" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
              <rect x="31" y="34" width="8" height="5" rx="1.5" fill="#0284c7" />

              <g className="origin-bottom-left">
                <path d="M 28 34 L 14 26 L 8 16" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="14" r="5" fill="#0284c7" />
              </g>

              <path d="M 50 34 L 60 44 L 56 52" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="56" cy="53" r="5" fill="#0284c7" />

              <circle cx="39" cy="18" r="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="40" cy="18" rx="11" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              <path d="M 33 14 Q 40 12 46 14" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Specialist Maya */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectAstronaut('astronaut-maya')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectAstronaut('astronaut-maya')}
        aria-label="Specialist Maya - Click to talk with the Station Botanist"
        className="absolute top-[62%] left-[45%] sm:left-[47%] pointer-events-auto cursor-pointer group select-none"
      >
        <div className={`relative transition-transform duration-300 ${
          selectedId === 'astronaut-maya' ? 'scale-110' : 'group-hover:scale-105'
        }`}>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/95 text-emerald-300 border border-emerald-400/60 shadow-md text-[11px] font-bold">
              <span>👩‍🚀</span>
              <span>Botanist Maya</span>
            </div>
          </div>

          <div className="animate-float-gentle">
            <svg width="68" height="92" viewBox="0 0 68 92" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="24" width="18" height="32" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              <path d="M 30 58 L 28 82" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="28" cy="85" rx="6" ry="4" fill="#475569" />
              <path d="M 42 58 L 44 82" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="44" cy="85" rx="6" ry="4" fill="#475569" />

              <rect x="24" y="28" width="24" height="32" rx="7" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
              <rect x="24" y="38" width="24" height="4" fill="#10b981" />

              <rect x="10" y="40" width="14" height="18" rx="2" fill="#047857" stroke="#34d399" strokeWidth="1.2" />
              <path d="M 26 34 L 16 46" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
              <circle cx="16" cy="46" r="4" fill="#059669" />

              <path d="M 46 34 L 54 44" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
              <circle cx="54" cy="44" r="4" fill="#059669" />

              <circle cx="36" cy="18" r="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="36" cy="18" rx="10" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              <path d="M 30 15 Q 36 13 42 15" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Cadet Sam & BEEP-0 */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectAstronaut('astronaut-sam')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectAstronaut('astronaut-sam')}
        aria-label="Cadet Sam and BEEP-0 - Click to learn about lunar robotics"
        className="absolute top-[66%] right-[18%] sm:right-[20%] pointer-events-auto cursor-pointer group select-none"
      >
        <div className={`relative transition-transform duration-300 ${
          selectedId === 'astronaut-sam' ? 'scale-110' : 'group-hover:scale-105'
        }`}>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/95 text-pink-300 border border-pink-400/60 shadow-md text-[11px] font-bold">
              <span>🧑‍🚀</span>
              <span>Sam & BEEP-0</span>
            </div>
          </div>

          <div className="flex items-end gap-1">
            <div className="animate-float-gentle">
              <svg width="68" height="92" viewBox="0 0 68 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="24" width="18" height="32" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                <path d="M 28 58 L 26 84" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
                <ellipse cx="26" cy="86" rx="6" ry="4" fill="#475569" />
                <path d="M 40 58 L 44 84" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
                <ellipse cx="44" cy="86" rx="6" ry="4" fill="#475569" />

                <rect x="22" y="28" width="24" height="32" rx="7" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
                <rect x="22" y="38" width="24" height="4" fill="#ec4899" />

                <path d="M 24 34 L 14 44" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
                <circle cx="14" cy="44" r="4" fill="#db2777" />
                <path d="M 44 34 L 54 28" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
                <circle cx="54" cy="28" r="4" fill="#db2777" />

                <circle cx="34" cy="18" r="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <ellipse cx="34" cy="18" rx="10" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              </svg>
            </div>

            {/* BEEP-0 */}
            <div className="animate-float-astronaut -translate-y-4">
              <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="12" x2="20" y2="2" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="20" cy="2" r="3" fill="#38bdf8" className="animate-pulse" />
                <rect x="6" y="12" width="28" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect x="10" y="16" width="20" height="14" rx="3" fill="#0f172a" />
                <path d="M 13 22 Q 15 20 17 22" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 23 22 Q 25 20 27 22" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
                <ellipse cx="20" cy="38" rx="6" ry="2" fill="#38bdf8" opacity="0.8" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
