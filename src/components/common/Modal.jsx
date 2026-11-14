import React, { useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { soundFx } from '../../utils/audio';

export const Modal = ({
  isOpen,
  onClose,
  title,
  icon = '🚀',
  children,
  maxWidth = '560px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(5, 8, 20, 0.85)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.play('click');
          onClose();
        }
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth,
          padding: '28px',
          border: '2px solid rgba(110, 142, 251, 0.4)',
          position: 'relative',
          animation: 'pulse-gentle 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>{icon}</span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--starlight-gold)' }}>{title}</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFx.play('click');
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
          {children}
        </div>
      </Card>
    </div>
  );
};
