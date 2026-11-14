import React, { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { MISSIONS } from '../data/missionsData';
import { IceHarvesterGame } from '../components/miniGames/IceHarvesterGame';
import { SolarAlignGame } from '../components/miniGames/SolarAlignGame';
import { RockCollectorGame } from '../components/miniGames/RockCollectorGame';
import { soundFx } from '../utils/audio';

export const MissionScreen = () => {
  const {
    activeMissionId,
    setActiveMissionId,
    ageGroup,
    completeMission,
    navigateTo
  } = useGame();

  const activeMission = MISSIONS.find(m => m.id === activeMissionId) || MISSIONS[0];

  const handleSelectMission = (missionId) => {
    soundFx.play('click');
    setActiveMissionId(missionId);
  };

  const handleFinishMission = (results) => {
    soundFx.play('badge');
    completeMission(results);
  };

  return (
    <div className="game-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="badge-pill" style={{ background: 'rgba(255, 209, 102, 0.15)', color: 'var(--starlight-gold)', marginBottom: '4px' }}>
            ⛏️ Lunar Surface Field Mission
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#FFF' }}>
            {activeMission.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Location: {activeMission.location} • Difficulty: {activeMission.difficulty[ageGroup] || 'Cadet'}
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigateTo(SCREENS.OUTPOST)}
        >
          ← Return to Outpost
        </Button>
      </div>

      {/* Mission Picker Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {MISSIONS.map((m) => {
          const isSelected = activeMissionId === m.id;

          return (
            <div
              key={m.id}
              onClick={() => handleSelectMission(m.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '16px',
                background: isSelected ? 'rgba(58, 134, 255, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: `2px solid ${isSelected ? 'var(--starlight-gold)' : 'rgba(255, 255, 255, 0.1)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: isSelected ? 'var(--starlight-gold)' : 'var(--text-muted)' }}>
                  {m.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Age-Adapted Cadet Guidance Box */}
      <Card style={{ padding: '16px 20px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>🤖</span>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38BDF8' }}>
              Astro-Bot Mission Guidance (Age {ageGroup}):
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {activeMission.ageHints[ageGroup] || activeMission.summary}
            </div>
          </div>
        </div>
      </Card>

      {/* Dynamic Mini-Game Interactive Simulation */}
      <div>
        {activeMissionId === 'ice-extractor' && (
          <IceHarvesterGame
            onFinish={handleFinishMission}
            ageGroup={ageGroup}
          />
        )}

        {activeMissionId === 'solar-align' && (
          <SolarAlignGame
            onFinish={handleFinishMission}
            ageGroup={ageGroup}
          />
        )}

        {activeMissionId === 'rock-collector' && (
          <RockCollectorGame
            onFinish={handleFinishMission}
            ageGroup={ageGroup}
          />
        )}
      </div>
    </div>
  );
};
