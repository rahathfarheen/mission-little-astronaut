import React from 'react';

export const ProgressBar = ({
  value = 50,
  max = 100,
  label = '',
  unit = '%',
  color = '#06D6A0',
  showText = true,
  height = '16px'
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: '100%' }}>
      {(label || showText) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
          <span className="font-telemetry" style={{ color: color }}>
            {value}{unit}
          </span>
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}88`
          }}
        />
      </div>
    </div>
  );
};
