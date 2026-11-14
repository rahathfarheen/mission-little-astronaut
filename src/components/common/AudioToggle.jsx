import React from 'react';
import { useGame } from '../../context/GameContext';

export const AudioToggle = ({ className = '' }) => {
  const { muted, toggleSound } = useGame();

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={muted ? 'Unmute Space Sounds' : 'Mute Sounds'}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        background: muted ? 'rgba(239, 71, 111, 0.15)' : 'rgba(6, 214, 160, 0.15)',
        border: `2px solid ${muted ? '#EF476F' : '#06D6A0'}`,
        color: muted ? '#EF476F' : '#06D6A0',
        padding: '8px 14px',
        borderRadius: '9999px',
        fontSize: '0.9rem',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <span>{muted ? '🔇' : '🔊'}</span>
      <span>{muted ? 'Audio Off' : 'Audio On'}</span>
    </button>
  );
};
