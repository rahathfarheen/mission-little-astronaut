import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

export const ModuleCard = ({
  module,
  onAction,
  onInspect
}) => {
  const getStatusColor = (health) => {
    if (health >= 85) return '#06D6A0';
    if (health >= 60) return '#FFD166';
    return '#EF476F';
  };

  const statusColor = getStatusColor(module.health);

  return (
    <Card
      interactive
      onClick={() => onInspect(module)}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle, ${statusColor}22 0%, transparent 70%)` }} />

      <div>
        {/* Module Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>{module.icon}</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>{module.name}</h3>
              <span style={{ fontSize: '0.75rem', color: statusColor, fontWeight: 700 }}>
                ● {module.status}
              </span>
            </div>
          </div>
        </div>

        {/* Vital Telemetry */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', minHeight: '38px' }}>
          {module.description}
        </p>

        {/* Health / Efficiency Bar */}
        <div style={{ marginBottom: '16px' }}>
          <ProgressBar
            value={module.health}
            label={module.vitalStat}
            color={statusColor}
            unit="%"
            height="10px"
          />
        </div>
      </div>

      {/* Action Button */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onInspect(module);
          }}
          style={{ flex: 1 }}
        >
          Inspect
        </Button>

        <Button
          variant="teal"
          size="sm"
          sound="powerup"
          onClick={(e) => {
            e.stopPropagation();
            onAction(module);
          }}
          style={{ flex: 1 }}
        >
          {module.actionText}
        </Button>
      </div>
    </Card>
  );
};
