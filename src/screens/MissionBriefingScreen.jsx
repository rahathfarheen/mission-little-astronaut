import React, { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { soundFx } from '../utils/audio';

export const MissionBriefingScreen = () => {
  const { cadetProfile, ageGroup, navigateTo } = useGame();

  const [checkedItems, setCheckedItems] = useState({
    oxygen: false,
    rover: false,
    drill: false,
    comms: false
  });

  const checklist = [
    { id: 'oxygen', label: 'Primary Life Support: Pressurize O2 & Clean Water Reserves', icon: '🫁' },
    { id: 'rover', label: 'Hop-1 Lunar Exploration Rover: 6-Wheel Suspension Check', icon: '🚜' },
    { id: 'drill', label: 'Cryogenic Thermal Drill: Calibrated for -246°C Ice Pockets', icon: '⛏️' },
    { id: 'comms', label: 'Deep Space Earth Link: Synchronized with NASA Houston Control', icon: '📡' }
  ];

  const handleToggleCheck = (id) => {
    soundFx.play('click');
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  const handleLaunchToOutpost = () => {
    soundFx.play('success');
    navigateTo(SCREENS.OUTPOST);
  };

  return (
    <div className="game-container" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge-pill" style={{ background: 'rgba(58, 134, 255, 0.15)', color: 'var(--artemis-blue)', marginBottom: '8px' }}>
          Step 4 of 4 • Flight Readiness Briefing
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFF' }}>
          Incoming Transmission: NASA CapCom
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          Flight Director Nova and Astro-Bot are transmitting your pre-mission directives.
        </p>
      </div>

      {/* Flight Director & Astro-Bot Transmission Card */}
      <Card style={{ padding: '28px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(14, 22, 48, 0.95) 0%, rgba(19, 29, 61, 0.9) 100%)', border: '2px solid rgba(110, 142, 251, 0.4)' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(58, 134, 255, 0.2)', border: '2px solid #3A86FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', boxShadow: '0 0 20px rgba(58, 134, 255, 0.4)', flexShrink: 0 }}>
            👩‍🚀
          </div>

          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--starlight-gold)' }}>
                Flight Director Nova
              </span>
              <span className="badge-pill" style={{ background: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', fontSize: '0.75rem' }}>
                LIVE FEED • HOUSTON
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', color: '#FFF', lineHeight: 1.6, marginBottom: '14px' }}>
              "Welcome to the team, <strong>{cadetProfile.name}</strong>! You have been assigned as the lead exploration specialist at <strong>Lunar Base Alpha</strong>. The Moon\'s South Pole is a wonder of science: shadowed craters conceal frozen water ice from billions of years ago, and high crater rims give us nearly continuous sunlight."
            </p>

            {/* Astro-Bot Tip Box */}
            <div style={{ background: 'rgba(255, 209, 102, 0.1)', borderLeft: '4px solid var(--starlight-gold)', padding: '12px 16px', borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem' }}>🤖</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--starlight-gold)' }}>
                  Astro-Bot Beep (Cadet Advisor):
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {ageGroup === '7-8'
                    ? 'Tip: Check all four boxes below to power up our spaceship before we touch down on the Moon!'
                    : ageGroup === '9-10'
                    ? 'Tip: Remember that lunar gravity is only 1/6th of Earth gravity. All tools and rocks will feel much lighter!'
                    : 'Tip: Cryogenic ice extraction at Shackleton Crater provides in-situ rocket fuel and water for long-duration deep space exploration.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Pre-Flight Checklist */}
      <Card style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--starlight-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋</span> Pre-Descent Systems Readiness Checklist
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {checklist.map((item) => {
            const isChecked = checkedItems[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleToggleCheck(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: isChecked ? 'rgba(6, 214, 160, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `2px solid ${isChecked ? '#06D6A0' : 'rgba(255, 255, 255, 0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    background: isChecked ? '#06D6A0' : 'transparent',
                    border: `2px solid ${isChecked ? '#06D6A0' : 'rgba(255, 255, 255, 0.4)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B1026',
                    fontWeight: 900,
                    fontSize: '1rem'
                  }}
                >
                  {isChecked ? '✓' : ''}
                </div>

                <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>

                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: isChecked ? '#FFF' : 'var(--text-secondary)' }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <Button
          variant="ghost"
          onClick={() => navigateTo(SCREENS.PLANET_SELECTION)}
        >
          ← Back to Destination
        </Button>

        <Button
          variant={allChecked ? 'gold' : 'ghost'}
          size="lg"
          icon="🚀"
          disabled={!allChecked}
          onClick={handleLaunchToOutpost}
        >
          {allChecked ? 'All Systems GO! Enter Lunar Outpost' : 'Check All 4 Items to Launch'}
        </Button>
      </div>
    </div>
  );
};
