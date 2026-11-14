import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { soundFx } from '../../utils/audio';

export const IceHarvesterGame = ({ onFinish, ageGroup }) => {
  const [extractedCount, setExtractedCount] = useState(0);
  const [drillProgress, setDrillProgress] = useState(0);
  const [isDrilling, setIsDrilling] = useState(false);
  const [activeSite, setActiveSite] = useState(0);
  const [drillTemperature, setDrillTemperature] = useState(-180); // in C

  const sites = [
    { id: 0, name: 'Crater Shadow Pocket Alpha', depth: '1.2m', icePurity: '98%', x: '25%', y: '40%' },
    { id: 1, name: 'Permanent Cold Trap Beta', depth: '2.5m', icePurity: '94%', x: '55%', y: '65%' },
    { id: 2, name: 'Shackleton Floor Cryo-Well', depth: '3.1m', icePurity: '99%', x: '78%', y: '35%' }
  ];

  const handleStartDrill = () => {
    if (isDrilling) return;
    setIsDrilling(true);
    soundFx.play('drill');

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setDrillProgress(current);
      setDrillTemperature(prev => prev + 12);

      if (current >= 100) {
        clearInterval(interval);
        setIsDrilling(false);
        setDrillProgress(0);
        soundFx.play('success');

        const newCount = extractedCount + 1;
        setExtractedCount(newCount);

        if (newCount < 3) {
          setActiveSite(newCount);
          setDrillTemperature(-180);
        } else {
          // Mission completed!
          setTimeout(() => {
            onFinish({
              score: 950,
              stars: 3,
              extractedItems: [
                'Shackleton Cryogenic Ice Core #1 (98% Pure)',
                'Sub-surface Volatile Frozen Pocket #2',
                'Ancient Cometary Ice Block #3'
              ],
              resourcesEarned: { water: '+45 L', oxygen: '+20 %', battery: '+15 %' },
              message: 'Outstanding drilling, Cadet! You harvested 3 cryogenic ice cores from the permanently shadowed lunar crater.'
            });
          }, 800);
        }
      }
    }, 250);
  };

  return (
    <Card style={{ padding: '24px', background: 'rgba(8, 12, 30, 0.95)', border: '2px solid rgba(6, 214, 160, 0.4)' }}>
      {/* Game Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#06D6A0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>❄️</span> Lunar Ice Extraction Drill
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Target: Shackleton Crater Cold Trap (-246°C). Harvest 3 water-ice pockets!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cores Collected:</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3].map(num => (
              <span
                key={num}
                style={{
                  fontSize: '1.5rem',
                  filter: num <= extractedCount ? 'none' : 'grayscale(100%) opacity(30%)',
                  transition: 'all 0.3s ease'
                }}
              >
                🧊
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5D Interactive Crater Canvas Area */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          borderRadius: '16px',
          background: 'radial-gradient(ellipse at 50% 80%, #151F38 0%, #080D1D 70%, #03060F 100%)',
          border: '2px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Shadowed Crater Texture */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px', background: 'radial-gradient(circle at 50% 120%, #111B33 120px, transparent 121px)', opacity: 0.8 }} />

        {/* Ice Targets */}
        {sites.map((site, index) => {
          const isCollected = index < extractedCount;
          const isCurrent = index === activeSite;

          return (
            <div
              key={site.id}
              onClick={() => {
                if (isCurrent && !isDrilling) handleStartDrill();
              }}
              style={{
                position: 'absolute',
                left: site.x,
                top: site.y,
                transform: 'translate(-50%, -50%)',
                cursor: isCurrent && !isDrilling ? 'pointer' : 'default',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: isCollected
                    ? '#06D6A0'
                    : isCurrent
                    ? 'rgba(6, 214, 160, 0.35)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: `3px dashed ${isCurrent ? '#06D6A0' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  boxShadow: isCurrent ? '0 0 24px rgba(6, 214, 160, 0.6)' : 'none',
                  animation: isCurrent && !isDrilling ? 'pulse-gentle 1.5s infinite' : 'none'
                }}
              >
                {isCollected ? '✅' : '🧊'}
              </div>
              <div style={{ marginTop: '6px', fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? '#06D6A0' : 'var(--text-muted)' }}>
                {site.name}
              </div>
            </div>
          );
        })}

        {/* Rover Drill Graphic Indicator */}
        {isDrilling && (
          <div
            style={{
              position: 'absolute',
              left: sites[activeSite].x,
              top: `calc(${sites[activeSite].y} - 35px)`,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              animation: 'pulse-gentle 0.15s infinite'
            }}
          >
            <span style={{ fontSize: '2.4rem' }}>🚜</span>
            <div style={{ fontSize: '0.75rem', color: '#FFD166', fontWeight: 700, background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '6px' }}>
              DRILLING IN PROGRESS...
            </div>
          </div>
        )}
      </div>

      {/* Drill Telemetry & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px' }}>
          <ProgressBar
            value={drillProgress}
            label="Drill Depth Penetration"
            color="#06D6A0"
            unit="%"
          />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drill Bit Temperature</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: drillTemperature > -50 ? '#EF476F' : '#4CC9F0' }} className="font-telemetry">
              {drillTemperature}°C
            </div>
          </div>
          <span style={{ fontSize: '1.5rem' }}>🌡️</span>
        </div>
      </div>

      {/* Action CTA */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={isDrilling ? 'ghost' : 'teal'}
          size="lg"
          icon="⛏️"
          disabled={isDrilling || extractedCount >= 3}
          onClick={handleStartDrill}
        >
          {isDrilling
            ? 'Drilling Cryogenic Core...'
            : extractedCount >= 3
            ? 'All Cores Harvested!'
            : `Engage Drill on Site ${activeSite + 1}`}
        </Button>
      </div>
    </Card>
  );
};
