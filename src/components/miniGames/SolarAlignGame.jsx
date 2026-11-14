import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { soundFx } from '../../utils/audio';

export const SolarAlignGame = ({ onFinish }) => {
  const [angle, setAngle] = useState(25);
  const targetAngle = 68; // Sweet spot
  const tolerance = 6;
  const isAligned = Math.abs(angle - targetAngle) <= tolerance;
  const efficiency = Math.max(10, Math.round(100 - Math.abs(angle - targetAngle) * 2.2));

  const [lockedIn, setLockedIn] = useState(false);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setAngle(val);
    if (Math.abs(val - targetAngle) <= tolerance) {
      soundFx.play('click');
    }
  };

  const handleLockIn = () => {
    if (!isAligned) {
      soundFx.play('alert');
      return;
    }
    setLockedIn(true);
    soundFx.play('powerup');

    setTimeout(() => {
      onFinish({
        score: 920,
        stars: 3,
        extractedItems: [
          'Photovoltaic Wing Alpha Optimized',
          'Peak Light Tracking Azimuth Locked at 68°',
          'Lunar Regolith Dust Cleared'
        ],
        resourcesEarned: { battery: '+35 %', oxygen: '+10 %', water: '+5 L' },
        message: 'Magnificent engineering! The solar arrays are capturing 98% sunlight on the Peak of Eternal Light.'
      });
    }, 1000);
  };

  return (
    <Card style={{ padding: '24px', background: 'rgba(8, 12, 30, 0.95)', border: '2px solid rgba(255, 209, 102, 0.4)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#FFD166', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>☀️</span> Solar Wing Alignment Array
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Rotate the solar panel angle to match the low polar sun heading (Target: ~68°).
          </p>
        </div>
        <div className="badge-pill" style={{ background: isAligned ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 71, 111, 0.2)', color: isAligned ? '#06D6A0' : '#EF476F' }}>
          {isAligned ? '⚡ Optimal Sun Alignment!' : '⚠️ Seeking Sun Vector'}
        </div>
      </div>

      {/* Visual Alignment Simulator */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          borderRadius: '16px',
          background: 'radial-gradient(circle at 80% 20%, rgba(255, 209, 102, 0.25) 0%, #0B132B 70%)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '20px'
        }}
      >
        {/* Sun source */}
        <div
          style={{
            position: 'absolute',
            top: '25px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#FFD166',
            boxShadow: '0 0 40px #FFD166',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem'
          }}
        >
          ☀️
        </div>

        {/* Light beam */}
        <div
          style={{
            position: 'absolute',
            top: '55px',
            right: '70px',
            width: '320px',
            height: '4px',
            background: isAligned ? 'linear-gradient(270deg, #FFD166 0%, #06D6A0 100%)' : 'linear-gradient(270deg, #FFD166 0%, transparent 100%)',
            transform: 'rotate(25deg)',
            transformOrigin: 'right center',
            boxShadow: isAligned ? '0 0 16px #FFD166' : 'none',
            opacity: efficiency / 100
          }}
        />

        {/* Rotatable Solar Panel */}
        <div
          style={{
            width: '180px',
            height: '34px',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 50%, #1D4ED8 100%)',
            border: '2px solid #93C5FD',
            transform: `rotate(${-angle}deg)`,
            transition: 'transform 0.1s ease-out',
            boxShadow: isAligned ? '0 0 30px rgba(6, 214, 160, 0.8)' : '0 4px 12px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '2px'
          }}
        >
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ width: '22px', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }} />
          ))}
        </div>

        {/* Angle Readout */}
        <div style={{ position: 'absolute', bottom: '15px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Panel Angle: </span>
          <span className="font-telemetry" style={{ fontWeight: 700, color: isAligned ? '#06D6A0' : '#FFD166' }}>
            {angle}°
          </span>
        </div>
      </div>

      {/* Angle Slider & Efficiency Meter */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Adjust Angle Azimuth:</span>
          <span style={{ fontSize: '0.9rem', color: '#FFD166' }}>{angle}° / 90°</span>
        </div>
        <input
          type="range"
          min="0"
          max="90"
          value={angle}
          onChange={handleSliderChange}
          style={{
            width: '100%',
            height: '14px',
            borderRadius: '8px',
            accentColor: isAligned ? '#06D6A0' : '#FFD166',
            cursor: 'pointer'
          }}
        />

        <div style={{ marginTop: '16px' }}>
          <ProgressBar
            value={efficiency}
            label="Photovoltaic Solar Absorption Efficiency"
            color={isAligned ? '#06D6A0' : '#FFD166'}
            unit="%"
          />
        </div>
      </div>

      {/* Lock Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={isAligned ? 'gold' : 'ghost'}
          size="lg"
          icon="⚡"
          disabled={!isAligned || lockedIn}
          onClick={handleLockIn}
        >
          {lockedIn ? 'Power Grid Synced!' : isAligned ? 'Lock Solar Angle & Charge Base' : 'Align Panel to Sunlight (~68°)'}
        </Button>
      </div>
    </Card>
  );
};
