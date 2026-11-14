import React from 'react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';

export const TelemetryGauge = ({ resources }) => {
  return (
    <Card
      style={{
        padding: '18px 24px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(14, 22, 48, 0.95) 0%, rgba(19, 29, 61, 0.85) 100%)',
        border: '2px solid rgba(58, 134, 255, 0.4)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🛰️</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--starlight-gold)' }}>
            Lunar Base Alpha — Life Support Telemetry HUD
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            🌡️ Base Temp: <strong style={{ color: '#06D6A0' }}>{resources.temperature}°C</strong>
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            🛡️ Hull Shield: <strong style={{ color: '#3A86FF' }}>{resources.hullIntegrity}%</strong>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Oxygen */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span>🫁</span>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Oxygen Reserve</span>
          </div>
          <ProgressBar
            value={resources.oxygen}
            color="#06D6A0"
            showText={true}
            height="12px"
          />
        </div>

        {/* Energy / Solar Battery */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span>⚡</span>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Solar Power Grid</span>
          </div>
          <ProgressBar
            value={resources.energy}
            color="#FFD166"
            showText={true}
            height="12px"
          />
        </div>

        {/* Water Reserves */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span>💧</span>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Purified H2O</span>
          </div>
          <ProgressBar
            value={resources.water}
            color="#3A86FF"
            showText={true}
            height="12px"
          />
        </div>
      </div>
    </Card>
  );
};
