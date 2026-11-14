import React from 'react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';

export const TelemetryGauge = ({ resources, survivalStatus = null }) => {
  const o2 = resources.oxygen ?? 90;
  const energy = resources.energy ?? 80;
  const water = resources.water ?? 85;
  const shield = resources.radiationShield ?? resources.hullIntegrity ?? 95;

  const getStatusBadge = () => {
    if (!survivalStatus) return { label: 'Nominal Operations', color: '#06D6A0', bg: 'rgba(6, 214, 160, 0.15)' };
    switch (survivalStatus.state) {
      case 'OPTIMAL':
        return { label: '● Status: Optimal', color: '#06D6A0', bg: 'rgba(6, 214, 160, 0.15)' };
      case 'STABLE':
        return { label: '● Status: Stable', color: '#3A86FF', bg: 'rgba(58, 134, 255, 0.15)' };
      case 'WARNING':
        return { label: '⚠️ Status: Attention Needed', color: '#FFD166', bg: 'rgba(255, 209, 102, 0.15)' };
      case 'CRITICAL':
        return { label: '🚨 Status: Critical Low', color: '#EF476F', bg: 'rgba(239, 71, 111, 0.15)' };
      case 'FAILED':
        return { label: '☠️ Status: Life Support Depleted', color: '#FF0055', bg: 'rgba(255, 0, 85, 0.25)' };
      default:
        return { label: '● Status: Active', color: '#06D6A0', bg: 'rgba(6, 214, 160, 0.15)' };
    }
  };

  const statusBadge = getStatusBadge();

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
            Lunar Base Alpha — 4-System Life Support Telemetry HUD
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '8px',
              background: statusBadge.bg,
              color: statusBadge.color,
              fontWeight: 700,
              border: `1px solid ${statusBadge.color}`
            }}
          >
            {statusBadge.label}
          </div>
          <span style={{ color: 'var(--text-secondary)' }}>
            🌡️ Temp: <strong style={{ color: '#06D6A0' }}>21.5°C</strong>
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        {/* 1. Oxygen */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🫁</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Oxygen Reserve</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: o2 < 25 ? '#EF476F' : '#06D6A0', fontWeight: 700 }}>{o2}%</span>
          </div>
          <ProgressBar
            value={o2}
            color={o2 < 25 ? '#EF476F' : '#06D6A0'}
            showText={false}
            height="10px"
          />
        </div>

        {/* 2. Water */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💧</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Purified H₂O</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: water < 25 ? '#EF476F' : '#3A86FF', fontWeight: 700 }}>{water}%</span>
          </div>
          <ProgressBar
            value={water}
            color={water < 25 ? '#EF476F' : '#3A86FF'}
            showText={false}
            height="10px"
          />
        </div>

        {/* 3. Energy / Solar Battery */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚡</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Solar & Battery</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: energy < 25 ? '#EF476F' : '#FFD166', fontWeight: 700 }}>{energy}%</span>
          </div>
          <ProgressBar
            value={energy}
            color={energy < 25 ? '#EF476F' : '#FFD166'}
            showText={false}
            height="10px"
          />
        </div>

        {/* 4. Radiation Shield */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🛡️</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Radiation Shield</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: shield < 30 ? '#EF476F' : '#9D4EDD', fontWeight: 700 }}>{shield}%</span>
          </div>
          <ProgressBar
            value={shield}
            color={shield < 30 ? '#EF476F' : '#9D4EDD'}
            showText={false}
            height="10px"
          />
        </div>
      </div>
    </Card>
  );
};
