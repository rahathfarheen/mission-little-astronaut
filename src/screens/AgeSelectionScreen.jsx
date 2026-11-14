import React from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { soundFx } from '../utils/audio';

export const AgeSelectionScreen = () => {
  const { ageGroup, setAgeGroup, navigateTo } = useGame();

  const brackets = [
    {
      id: '7-8',
      title: 'Junior Space Cadet',
      ageLabel: 'Ages 7–8',
      icon: '🌱',
      accentColor: '#06D6A0',
      difficultyBadge: 'Gentle & Visual',
      description: 'Ideal for early readers and first-time astronauts! Features large visual buttons, friendly audio cues, and simplified fun science concepts.',
      features: [
        'Large, chunky touch buttons',
        'Extra visual hints from Astro-Bot',
        'Simplified space terms & stories',
        'Forgiving mission challenges'
      ]
    },
    {
      id: '9-10',
      title: 'Lunar Specialist',
      ageLabel: 'Ages 9–10',
      icon: '🚀',
      accentColor: '#3A86FF',
      difficultyBadge: 'Recommended • Balanced',
      description: 'The standard Artemis experience! Explore authentic lunar geology, solar array alignments, and real NASA engineering facts.',
      features: [
        'Real-world NASA Artemis data',
        'Interactive angle sliders & drill gauges',
        'Curated Apollo vs Artemis trivia',
        'Outpost resource balancing'
      ]
    },
    {
      id: '11-12',
      title: 'Mission Commander',
      ageLabel: 'Ages 11–12',
      icon: '⭐',
      accentColor: '#FFD166',
      difficultyBadge: 'STEM Deep Dive',
      description: 'For older cadets who want authentic challenges! Master cryogenic in-situ resource utilization (ISRU) and orbital mechanics concepts.',
      features: [
        'Advanced planetary telemetry',
        'Technical mineral classification',
        'Orbital transfer physics concepts',
        'Full mission mastery badges'
      ]
    }
  ];

  const handleSelectBracket = (id) => {
    soundFx.play('click');
    setAgeGroup(id);
  };

  return (
    <div className="game-container" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="badge-pill" style={{ background: 'rgba(255, 209, 102, 0.15)', color: 'var(--starlight-gold)', marginBottom: '8px' }}>
          Step 2 of 4 • Cadet Age Level
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFF' }}>
          Choose Your Mission Difficulty
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          We tailor all reading levels, mission hints, and science depth to make your space voyage fun and empowering!
        </p>
      </div>

      {/* Age Cards Grid */}
      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {brackets.map((b) => {
          const isSelected = ageGroup === b.id;

          return (
            <Card
              key={b.id}
              interactive
              onClick={() => handleSelectBracket(b.id)}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `3px solid ${isSelected ? b.accentColor : 'rgba(255, 255, 255, 0.1)'}`,
                background: isSelected ? 'rgba(19, 29, 61, 0.95)' : 'rgba(14, 22, 48, 0.7)',
                boxShadow: isSelected ? `0 0 28px ${b.accentColor}44` : 'none',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '16px',
                    background: b.accentColor,
                    color: '#0B1026',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}
                >
                  ✓ SELECTED
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{b.icon}</span>
                  <span
                    className="badge-pill"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: b.accentColor,
                      fontSize: '0.75rem'
                    }}
                  >
                    {b.difficultyBadge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '4px' }}>
                  {b.title}
                </h3>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: b.accentColor, marginBottom: '12px' }}>
                  {b.ageLabel}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', minHeight: '54px' }}>
                  {b.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    INCLUDES:
                  </div>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {b.features.map((feat, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: b.accentColor }}>✦</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button
                  variant={isSelected ? 'gold' : 'ghost'}
                  size="sm"
                  onClick={() => handleSelectBracket(b.id)}
                  style={{ width: '100%' }}
                >
                  {isSelected ? 'Level Selected' : 'Choose This Level'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <Button
          variant="ghost"
          onClick={() => navigateTo(SCREENS.ONBOARDING)}
        >
          ← Back to Profile
        </Button>

        <Button
          variant="gold"
          size="lg"
          icon="🚀"
          onClick={() => navigateTo(SCREENS.PLANET_SELECTION)}
        >
          Confirm Level → Planet Destination
        </Button>
      </div>
    </div>
  );
};
