import React from 'react';

export interface LunarLandscapeProps {
  className?: string;
  hasDiscoveredFlag?: boolean;
  onFlagClick?: () => void;
}

export const LunarLandscape: React.FC<LunarLandscapeProps> = ({
  className = '',
  hasDiscoveredFlag: _hasDiscoveredFlag = false,
  onFlagClick
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1440 800" 
        preserveAspectRatio="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="distantRimGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="midRimGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="surfaceGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <path
          d="M 0 460 Q 180 390 380 430 Q 560 470 740 410 Q 920 360 1120 420 Q 1300 480 1440 430 L 1440 800 L 0 800 Z"
          fill="url(#distantRimGrad2)"
          opacity="0.85"
        />

        <path
          d="M 0 520 Q 220 460 480 500 Q 720 540 960 480 Q 1200 440 1440 510 L 1440 800 L 0 800 Z"
          fill="url(#midRimGrad2)"
        />

        <path
          d="M 0 570 Q 240 540 500 565 Q 780 590 1050 560 Q 1280 535 1440 565 L 1440 800 L 0 800 Z"
          fill="url(#surfaceGrad2)"
        />

        {/* Craters */}
        <ellipse cx="140" cy="680" rx="90" ry="26" fill="#0f172a" opacity="0.8" />
        <path d="M 50 680 Q 140 662 230 680" stroke="#94a3b8" strokeWidth="2.5" fill="none" opacity="0.75" />
        <ellipse cx="820" cy="710" rx="65" ry="18" fill="#0f172a" opacity="0.8" />
        <path d="M 755 710 Q 820 696 885 710" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.7" />

        {/* Power conduits */}
        <path d="M 440 630 Q 350 635 280 645" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.9" />
        <path d="M 440 630 Q 350 635 280 645" stroke="#fef08a" strokeWidth="2" fill="none" className="animate-energy-line" />
        <path d="M 520 630 Q 600 625 670 632" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.85" />
        <path d="M 520 630 Q 600 625 670 632" stroke="#a7f3d0" strokeWidth="2" fill="none" className="animate-energy-line" />
        <path d="M 760 635 Q 860 630 960 640" stroke="#a855f7" strokeWidth="3" fill="none" opacity="0.85" />
        <path d="M 760 635 Q 860 630 960 640" stroke="#e9d5ff" strokeWidth="2" fill="none" className="animate-energy-line" />
      </svg>

      {/* Flag */}
      <div 
        className="absolute bottom-[28%] left-[22%] pointer-events-auto cursor-pointer group"
        onClick={onFlagClick}
        title="Little Astronaut Mission Flag! Click to salute!"
      >
        <div className="relative">
          <div className="w-1.5 h-16 bg-gradient-to-b from-slate-200 to-slate-400 rounded-full shadow-md" />
          <div className="absolute top-1 left-1.5 animate-flag-wave origin-left">
            <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="30" rx="3" fill="#0284c7" />
              <circle cx="15" cy="15" r="7" fill="#fbbf24" />
              <path d="M 12 18 L 18 10 L 22 17 L 16 17 Z" fill="#ffffff" />
              <path d="M 24 12 L 42 12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
