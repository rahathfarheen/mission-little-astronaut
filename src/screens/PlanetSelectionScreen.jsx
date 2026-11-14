import React from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CELESTIAL_DESTINATIONS } from '../data/missionsData';
import { soundFx } from '../utils/audio';

export const PlanetSelectionScreen = () => {
  const { destination, setDestination, navigateTo } = useGame();

  const handleSelect = (dest) => {
    if (!dest.unlocked) {
      soundFx.play('alert');
      return;
    }
    soundFx.play('click');
    setDestination(dest.id);
  };

  const selectedTarget = CELESTIAL_DESTINATIONS.find(d => d.id === destination) || CELESTIAL_DESTINATIONS[1];

  return (
    <div className="game-container">
      {/* Step Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge-pill" style={{ background: 'rgba(6, 214, 160, 0.15)', color: 'var(--nebula-teal)', marginBottom: '8px' }}>
          Step 3 of 4 • Target Destination
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFF' }}>
          Celestial Orbit & Landing Destination
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1rem' }}>
          Target locked on the Moon\'s South Pole! Select your landing coordinates to initiate lunar descent.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '28px', alignItems: 'center', marginBottom: '32px' }}>
        {/* Left Column: 2.5D Moon Sphere Rendering & Orbit Visual */}
        <Card style={{ padding: '36px 20px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(255, 209, 102, 0.15) 0%, rgba(14, 22, 48, 0.95) 80%)', border: '2px solid rgba(255, 209, 102, 0.4)' }}>
          {/* Animated Moon Sphere with Craters */}
          <div
            style={{
              width: '210px',
              height: '210px',
              borderRadius: '50%',
              margin: '0 auto 24px',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #D8DDE6 40%, #7B8599 75%, #3B4252 100%)',
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.35), inset -20px -20px 40px rgba(0,0,0,0.8)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Craters */}
            <div style={{ position: 'absolute', top: '25%', left: '30%', width: '38px', height: '38px', borderRadius: '50%', background: '#64748B', opacity: 0.5, boxShadow: 'inset 2px 2px 4px #000, 1px 1px 2px #fff' }} />
            <div style={{ position: 'absolute', top: '55%', left: '45%', width: '52px', height: '52px', borderRadius: '50%', background: '#64748B', opacity: 0.45, boxShadow: 'inset 3px 3px 6px #000, 1px 1px 2px #fff' }} />
            <div style={{ position: 'absolute', top: '70%', left: '20%', width: '28px', height: '28px', borderRadius: '50%', background: '#64748B', opacity: 0.5, boxShadow: 'inset 2px 2px 4px #000' }} />
            <div style={{ position: 'absolute', top: '20%', left: '65%', width: '24px', height: '24px', borderRadius: '50%', background: '#64748B', opacity: 0.4 }} />

            {/* Shackleton Crater Marker (South Pole) */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#EF476F',
                border: '2px solid #FFF',
                boxShadow: '0 0 16px #EF476F',
                animation: 'pulse-gentle 1s infinite'
              }}
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 71, 111, 0.2)', border: '1px solid #EF476F', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', color: '#FFF', fontWeight: 700 }}>
            <span>📍 Target LZ: Shackleton Crater (South Pole)</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '14px', maxWidth: '300px', margin: '14px auto 0' }}>
            Permanent shadows protect vast reservoirs of water ice, while towering crater peaks enjoy near-perpetual sunlight!
          </p>
        </Card>

        {/* Right Column: Celestial Destination Telemetry & Selector */}
        <div>
          {/* Destination Selector Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {CELESTIAL_DESTINATIONS.map((dest) => {
              const isSelected = destination === dest.id;

              return (
                <div
                  key={dest.id}
                  onClick={() => handleSelect(dest)}
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(58, 134, 255, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: `2px solid ${isSelected ? 'var(--starlight-gold)' : 'rgba(255, 255, 255, 0.1)'}`,
                    cursor: dest.unlocked ? 'pointer' : 'not-allowed',
                    opacity: dest.unlocked ? 1 : 0.45,
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.4rem' }}>
                        {dest.id === 'earth' ? '🌍' : dest.id === 'moon' ? '🌕' : dest.id === 'gateway' ? '🛰️' : '🪐'}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                        {dest.name}
                      </strong>
                    </div>
                    {dest.target && (
                      <span style={{ fontSize: '0.7rem', background: '#EF476F', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: dest.unlocked ? '#06D6A0' : 'var(--text-muted)' }}>
                    {dest.status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Telemetry Stats Card for Selected Body */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--starlight-gold)', marginBottom: '4px' }}>
              {selectedTarget.name} — Planetary Telemetry
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              {selectedTarget.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distance from Earth</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38BDF8' }} className="font-telemetry">
                  {selectedTarget.distance}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Surface Gravity</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06D6A0' }} className="font-telemetry">
                  {selectedTarget.gravity}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Atmosphere Type</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFD166' }}>
                  {selectedTarget.atmosphere}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Day/Night Period</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#EF476F' }}>
                  {selectedTarget.dayNight}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <Button
          variant="ghost"
          onClick={() => navigateTo(SCREENS.AGE_SELECTION)}
        >
          ← Back to Age Level
        </Button>

        <Button
          variant="gold"
          size="lg"
          icon="🚀"
          sound="launch"
          onClick={() => navigateTo(SCREENS.MISSION_BRIEFING)}
        >
          Confirm Destination → Mission Briefing
        </Button>
      </div>
    </div>
  );
};
