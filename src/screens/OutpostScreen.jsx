import React, { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { TelemetryGauge } from '../components/outpost/TelemetryGauge';
import { ModuleCard } from '../components/outpost/ModuleCard';
import { OUTPOST_MODULES } from '../data/outpostData';
import { soundFx } from '../utils/audio';

export const OutpostScreen = () => {
  const { resources, boostResource, navigateTo, cadetProfile } = useGame();
  const [selectedModule, setSelectedModule] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  const handleInspect = (mod) => {
    setSelectedModule(mod);
    setModalOpen(true);
  };

  const handleModuleAction = (mod) => {
    switch (mod.id) {
      case 'greenhouse':
        boostResource('oxygen', 6);
        setActionFeedback('🌱 Space lettuce watered! Oxygen production boosted +6%');
        break;
      case 'solar':
        boostResource('energy', 8);
        setActionFeedback('⚡ Solar arrays brushed clean of regolith! Solar power boosted +8%');
        break;
      case 'water-recycler':
        boostResource('water', 7);
        setActionFeedback('💧 Cryogenic ice filter cycled! Water reserves boosted +7%');
        break;
      case 'rover-garage':
        soundFx.play('success');
        setActionFeedback('🚜 Hop-1 Rover diagnostic complete: 100% operational for surface mission!');
        break;
      case 'comm-tower':
        soundFx.play('success');
        setActionFeedback('📡 Houston link synchronized! Science packets uploaded with 1.28s latency.');
        break;
      case 'science-lab':
        navigateTo(SCREENS.SCIENCE);
        return;
      default:
        break;
    }

    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  return (
    <div className="game-container">
      {/* Top Banner & Cadet Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="badge-pill" style={{ background: 'rgba(6, 214, 160, 0.15)', color: 'var(--nebula-teal)', marginBottom: '4px' }}>
            ● Base Operations Active
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#FFF' }}>
            Lunar Base Alpha — South Pole Command Hub
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Commander on deck: <strong>{cadetProfile.name}</strong> • Shackleton Crater Rim
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            variant="gold"
            icon="⛏️"
            sound="powerup"
            onClick={() => navigateTo(SCREENS.MISSION)}
          >
            Launch Surface Mission
          </Button>

          <Button
            variant="teal"
            icon="🔬"
            onClick={() => navigateTo(SCREENS.SCIENCE)}
          >
            NASA Science Lab
          </Button>
        </div>
      </div>

      {/* Action Notification Alert Toast */}
      {actionFeedback && (
        <div
          style={{
            background: 'rgba(6, 214, 160, 0.2)',
            border: '2px solid #06D6A0',
            color: '#FFF',
            padding: '12px 20px',
            borderRadius: '14px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            animation: 'pulse-gentle 0.3s ease'
          }}
        >
          <span>🚀</span>
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Real-time Telemetry HUD Widget */}
      <TelemetryGauge resources={resources} />

      {/* 2.5D Outpost Base Habitat Illustration Banner */}
      <div
        style={{
          position: 'relative',
          height: '180px',
          borderRadius: '20px',
          background: 'linear-gradient(180deg, #131E3D 0%, #0A0E1D 100%)',
          border: '2px solid rgba(110, 142, 251, 0.25)',
          overflow: 'hidden',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 24px 16px'
        }}
      >
        {/* Distant Earth hanging in the black sky */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #4CC9F0 0%, #3A86FF 60%, #03045E 100%)',
            boxShadow: '0 0 20px rgba(58, 134, 255, 0.6)'
          }}
          title="Earth as seen from the Moon's South Pole"
        />

        {/* Base Dome Vector Silhouette */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', zIndex: 2 }}>
          {/* Main Geodesic Dome */}
          <div
            style={{
              width: '120px',
              height: '65px',
              borderTopLeftRadius: '70px',
              borderTopRightRadius: '70px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(58, 134, 255, 0.3) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              position: 'relative',
              boxShadow: '0 0 25px rgba(58, 134, 255, 0.4)'
            }}
          >
            <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '14px', borderRadius: '4px', background: '#FFD166', opacity: 0.8 }} />
          </div>

          {/* Hydroponics Greenhouse Dome */}
          <div
            style={{
              width: '90px',
              height: '50px',
              borderTopLeftRadius: '50px',
              borderTopRightRadius: '50px',
              background: 'rgba(6, 214, 160, 0.3)',
              border: '2px solid #06D6A0',
              boxShadow: '0 0 20px rgba(6, 214, 160, 0.4)'
            }}
          />

          {/* Solar Panel Wing */}
          <div
            style={{
              width: '80px',
              height: '18px',
              background: '#1D4ED8',
              border: '2px solid #93C5FD',
              borderRadius: '4px',
              transform: 'rotate(-20deg)',
              transformOrigin: 'bottom left'
            }}
          />
        </div>

        <div style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '0.8rem', color: 'var(--text-muted)', zIndex: 2 }}>
          Coordinates: 89.9° S, 0.0° E • Shackleton Basin
        </div>
      </div>

      {/* Grid of 6 Interactive Outpost Modules */}
      <h3 style={{ fontSize: '1.25rem', color: 'var(--starlight-gold)', marginBottom: '14px' }}>
        Modular Subsystems & Maintenance Bays
      </h3>

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {OUTPOST_MODULES.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            onAction={handleModuleAction}
            onInspect={handleInspect}
          />
        ))}
      </div>

      {/* Module Inspection Dialog Modal */}
      {selectedModule && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`${selectedModule.name} Diagnostic`}
          icon={selectedModule.icon}
        >
          <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#FFF' }}>
            <p style={{ marginBottom: '14px' }}>
              {selectedModule.description}
            </p>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Subsystem Telemetry:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06D6A0' }} className="font-telemetry">
                {selectedModule.vitalStat}
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--starlight-gold)', marginBottom: '20px' }}>
              ✦ <strong>Cadet Action:</strong> {selectedModule.bonusText}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="teal"
                size="sm"
                sound="powerup"
                onClick={() => {
                  handleModuleAction(selectedModule);
                  setModalOpen(false);
                }}
              >
                {selectedModule.actionText}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
