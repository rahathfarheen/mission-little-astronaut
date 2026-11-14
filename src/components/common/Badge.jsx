import React from 'react';
import { CADET_BADGES } from '../../data/badgesData';

export const Badge = ({
  badgeId,
  isUnlocked = true,
  size = 'md', // 'sm' | 'md' | 'lg'
  showDetails = true
}) => {
  const badgeInfo = CADET_BADGES.find(b => b.id === badgeId) || {
    name: 'Secret Badge',
    icon: '❓',
    description: 'Keep exploring to unlock this accomplishment!',
    rarity: 'Unknown',
    color: '#94A3B8'
  };

  const dimStyle = !isUnlocked ? { filter: 'grayscale(100%) opacity(40%)' } : {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: size === 'sm' ? 'row' : 'column',
        alignItems: 'center',
        gap: size === 'sm' ? '8px' : '10px',
        textAlign: 'center',
        padding: size === 'sm' ? '6px 12px' : '16px',
        borderRadius: '16px',
        background: isUnlocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        border: `2px solid ${isUnlocked ? badgeInfo.color + '66' : 'rgba(255, 255, 255, 0.08)'}`,
        ...dimStyle
      }}
    >
      <div
        style={{
          width: size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px',
          height: size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${badgeInfo.color}33 0%, rgba(0,0,0,0.5) 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size === 'sm' ? '1.2rem' : size === 'lg' ? '2.2rem' : '1.6rem',
          boxShadow: isUnlocked ? `0 0 16px ${badgeInfo.color}66` : 'none'
        }}
      >
        {isUnlocked ? badgeInfo.icon : '🔒'}
      </div>

      {showDetails && (
        <div>
          <div style={{ fontWeight: 700, fontSize: size === 'sm' ? '0.85rem' : '0.95rem', color: isUnlocked ? '#FFF' : '#64748B' }}>
            {badgeInfo.name}
          </div>
          {size !== 'sm' && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '160px' }}>
              {badgeInfo.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
