import React, { useState } from 'react';
import { useGame, SCREENS } from '../../context/GameContext';
import { AudioToggle } from './AudioToggle';
import { AstronautAvatar } from './AstronautAvatar';
import { soundFx } from '../../utils/audio';

export const TopNav = () => {
  const { currentScreen, navigateTo, cadetProfile, ageGroup, resetGame } = useGame();
  const [menuOpen, setMenuOpen] = useState(false);

  const screenNames = [
    { id: SCREENS.WELCOME, label: '1. Welcome', icon: '🚀' },
    { id: SCREENS.ONBOARDING, label: '2. Cadet Profile', icon: '🧑‍🚀' },
    { id: SCREENS.AGE_SELECTION, label: '3. Age Level', icon: '🎯' },
    { id: SCREENS.PLANET_SELECTION, label: '4. Destination', icon: '🌕' },
    { id: SCREENS.MISSION_BRIEFING, label: '5. Briefing', icon: '📋' },
    { id: SCREENS.OUTPOST, label: '6. Lunar Outpost', icon: '🛰️' },
    { id: SCREENS.MISSION, label: '7. Mini-Mission', icon: '⛏️' },
    { id: SCREENS.SCIENCE, label: '8. NASA Science', icon: '🔬' },
    { id: SCREENS.RESULTS, label: '9. Debrief & Badges', icon: '🏆' }
  ];

  return (
    <header className="top-nav-hud">
      {/* Brand & Home */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => navigateTo(SCREENS.WELCOME)}
      >
        <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #FFD166)' }}>🚀</span>
        <div>
          <h1 style={{ fontSize: '1.25rem', color: '#FFF', lineHeight: 1.1 }}>
            Mission: <span style={{ color: 'var(--starlight-gold)' }}>Little Astronaut</span>
          </h1>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            NASA Lunar Explorer
          </span>
        </div>
      </div>

      {/* Screen Navigator Tabs (Desktop & Tablet) */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Quick Jump Selector for convenience */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => {
              soundFx.play('click');
              setMenuOpen(!menuOpen);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1.5px solid rgba(110, 142, 251, 0.35)',
              color: '#FFF',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🧭 Jump to Screen</span>
            <span>▼</span>
          </button>

          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '230px',
                background: '#0B132B',
                border: '2px solid rgba(110, 142, 251, 0.5)',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                zIndex: 60,
                overflow: 'hidden',
                padding: '6px'
              }}
            >
              {screenNames.map((s) => {
                const isActive = currentScreen === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      navigateTo(s.id);
                      setMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: isActive ? 'rgba(58, 134, 255, 0.25)' : 'transparent',
                      border: 'none',
                      borderRadius: '10px',
                      color: isActive ? 'var(--starlight-gold)' : '#FFF',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Cadet Status Pill */}
        {currentScreen !== SCREENS.WELCOME && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ width: '24px', height: '28px' }}>
              <AstronautAvatar
                suit={cadetProfile.suit}
                visor={cadetProfile.visor}
                patch={cadetProfile.patch}
                size={24}
                animate={false}
              />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {cadetProfile.name}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                background: 'rgba(255, 209, 102, 0.2)',
                color: 'var(--starlight-gold)',
                padding: '2px 6px',
                borderRadius: '6px',
                fontWeight: 700
              }}
            >
              Age {ageGroup}
            </span>
          </div>
        )}

        {/* Audio Toggle */}
        <AudioToggle />
      </nav>
    </header>
  );
};
