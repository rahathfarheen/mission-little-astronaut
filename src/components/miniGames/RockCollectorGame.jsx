import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { soundFx } from '../../utils/audio';

export const RockCollectorGame = ({ onFinish }) => {
  const [collected, setCollected] = useState([]);
  const [activeRock, setActiveRock] = useState(null);

  const rocks = [
    {
      id: 'anorthosite',
      name: 'Genesis Anorthosite',
      badge: 'Highland Crust',
      age: '4.1 Billion Years',
      icon: '⚪',
      color: '#E2E8F0',
      description: 'Sparkling white rock made of calcium-rich plagioclase feldspar. It floated to the top when the Moon was covered in a liquid magma ocean!',
      realFact: 'Apollo 15 astronauts found a sample nicknamed the "Genesis Rock" because it dates back to the dawn of the solar system.'
    },
    {
      id: 'basalt',
      name: 'Mare Basalt Lava',
      badge: 'Lunar Sea Stone',
      age: '3.5 Billion Years',
      icon: '🌑',
      color: '#475569',
      description: 'Dark, dense volcanic stone rich in titanium and iron. It cooled from ancient lava flows that filled enormous asteroid impact basins.',
      realFact: 'The dark patches on the Moon that look like the "Man in the Moon" are made of this dark basalt rock!'
    },
    {
      id: 'orange-soil',
      name: 'Orange Pyroclastic Glass',
      badge: 'Volcanic Fountain',
      age: '3.6 Billion Years',
      icon: '🟠',
      color: '#FF6B35',
      description: 'Microscopic glass beads shot out from explosive lunar fire fountains. They contain trapped titanium and trace water molecules!',
      realFact: 'Discovered during Apollo 17 by geologist-astronaut Harrison Schmitt at Shorty Crater.'
    }
  ];

  const handleCollectRock = (rock) => {
    if (!collected.includes(rock.id)) {
      soundFx.play('success');
      const updated = [...collected, rock.id];
      setCollected(updated);
      setActiveRock(rock);

      if (updated.length === 3) {
        setTimeout(() => {
          onFinish({
            score: 980,
            stars: 3,
            extractedItems: [
              'Genesis Rock Anorthosite Specimen #15415',
              'Mare Basalt Titanium Core Sample',
              'Apollo 17 Orange Pyroclastic Glass Beads'
            ],
            resourcesEarned: { oxygen: '+15 %', water: '+10 L', battery: '+25 %' },
            message: 'Superb astro-geology, Cadet! You collected all 3 landmark lunar rock specimens.'
          });
        }, 1800);
      }
    } else {
      setActiveRock(rock);
    }
  };

  return (
    <Card style={{ padding: '24px', background: 'rgba(8, 12, 30, 0.95)', border: '2px solid rgba(239, 71, 111, 0.4)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#EF476F', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🪨</span> Lunar Rock & Regolith Explorer
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Identify and collect the 3 essential lunar rock specimens for NASA Science Lab.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Catalogued:</span>
          <span className="font-telemetry" style={{ fontWeight: 700, color: '#EF476F' }}>
            {collected.length} / 3 Rocks
          </span>
        </div>
      </div>

      {/* Rock Specimen Picker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {rocks.map((rock) => {
          const isTaken = collected.includes(rock.id);

          return (
            <div
              key={rock.id}
              onClick={() => handleCollectRock(rock)}
              style={{
                background: isTaken ? 'rgba(6, 214, 160, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                border: `2px solid ${isTaken ? '#06D6A0' : 'rgba(255, 255, 255, 0.15)'}`,
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {isTaken && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#06D6A0', color: '#0F172A', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                  ✓
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '2.4rem' }}>{rock.icon}</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#FFF' }}>{rock.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--starlight-gold)', fontWeight: 600 }}>
                    {rock.badge} • {rock.age}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                {rock.description}
              </p>

              <div style={{ fontSize: '0.8rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 10px', borderRadius: '8px' }}>
                💡 <strong>NASA Fact:</strong> {rock.realFact}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rock Examination Glovebox */}
      {activeRock && (
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2.5rem' }}>🔬</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--starlight-gold)', fontSize: '0.95rem' }}>
              Spectrometer Analysis: {activeRock.name}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Mineral Composition Verified. Sealed in sterile lunar geology canister.
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={collected.length === 3 ? 'teal' : 'coral'}
          size="lg"
          icon="📦"
          disabled={collected.length < 3}
          onClick={() => {
            handleCollectRock(rocks[0]);
          }}
        >
          {collected.length === 3
            ? 'All Rocks Collected! Return to Outpost'
            : `Click Rocks Above to Collect (${collected.length}/3)`}
        </Button>
      </div>
    </Card>
  );
};
