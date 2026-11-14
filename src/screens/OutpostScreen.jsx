import React, { useState } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { TelemetryGauge } from '../components/outpost/TelemetryGauge';
import { LunarBase3D } from '../components/outpost/LunarBase3D';
import { ModuleCard } from '../components/outpost/ModuleCard';
import { OUTPOST_MODULES } from '../data/outpostData';
import { RESOURCE_ACTIONS, EDUCATIONAL_DISCLAIMER } from '../data/resourceData.js';
import { soundFx } from '../utils/audio';

export const OutpostScreen = () => {
  const {
    resources,
    boostResource,
    survivalStatus,
    applyEngineAction,
    advanceEngineTick,
    lastActionFeedback,
    setLastActionFeedback,
    ageGroup,
    navigateTo,
    cadetProfile
  } = useGame();

  const [selectedModule, setSelectedModule] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('3d-base'); // '3d-base' | 'actions' | 'modules'

  const handleInspect = (mod) => {
    setSelectedModule(mod);
    setModalOpen(true);
  };

  const handleModuleAction = (mod) => {
    switch (mod.id) {
      case 'greenhouse':
        applyEngineAction('hydroponic-photosynthesis');
        break;
      case 'solar':
        applyEngineAction('clean-solar-panels');
        break;
      case 'water-recycler':
        applyEngineAction('harvest-polar-ice');
        break;
      case 'rover-garage':
        soundFx.play('success');
        setLastActionFeedback({
          actionName: 'Hop-1 Rover Diagnostic',
          explanation: '🚜 Rover suspension, battery, and scoop are calibrated and ready for crater exploration!',
          scienceFact: 'NASA\'s Apollo Lunar Roving Vehicle had mesh tires made of zinc-coated piano wire because rubber would pop in the harsh lunar vacuum!'
        });
        break;
      case 'comm-tower':
        soundFx.play('success');
        setLastActionFeedback({
          actionName: 'Houston Laser Telemetry Sync',
          explanation: '📡 Deep space optical laser communication synchronized with NASA ground station at 1.28-second lunar latency!',
          scienceFact: 'NASA tested laser communication on the LADEE spacecraft, transmitting data from the Moon at 622 Megabits per second!'
        });
        break;
      case 'science-lab':
        navigateTo(SCREENS.SCIENCE);
        return;
      default:
        break;
    }
  };

  const handleEngineActionClick = (actionId) => {
    applyEngineAction(actionId);
  };

  const handleAdvanceTick = () => {
    soundFx.play('click');
    const tick = advanceEngineTick();
    if (tick.event) {
      soundFx.play('badge');
    }
  };

  return (
    <div className="game-container">
      {/* Top Banner & Cadet Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="badge-pill" style={{ background: 'rgba(6, 214, 160, 0.15)', color: 'var(--nebula-teal)', marginBottom: '4px' }}>
            ● Base Operations Active • Lunar South Pole
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#FFF' }}>
            Lunar Base Alpha — Life Support Operations
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Commander on deck: <strong>{cadetProfile.name}</strong> • Age Group: <strong>{ageGroup}</strong>
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

      {/* Real-time 4-System Telemetry HUD Widget */}
      <TelemetryGauge resources={resources} survivalStatus={survivalStatus} />

      {/* Interactive 3D Lunar Outpost Viewport */}
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🪐</span>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--starlight-gold)', margin: 0 }}>
            Interactive 3D Lunar Outpost Simulation
          </h3>
        </div>
        
        {/* Simulation Advance Tick Button */}
        <Button
          variant="ghost"
          size="sm"
          icon="⏳"
          onClick={handleAdvanceTick}
          title="Advances simulation by one cycle: burns life support and checks solar events"
        >
          Advance Lunar Sol / Cycle
        </Button>
      </div>

      {/* 3D Visualizer Component */}
      <LunarBase3D resources={resources} />

      {/* Action Notification Alert / Educational Explanation Toast */}
      {lastActionFeedback && (
        <Card
          style={{
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.15) 0%, rgba(58, 134, 255, 0.15) 100%)',
            border: '2px solid #06D6A0',
            padding: '16px 20px',
            marginBottom: '24px',
            borderRadius: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              {lastActionFeedback.error ? (
                <div style={{ color: '#EF476F', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                  ⚠️ {lastActionFeedback.error}
                  {lastActionFeedback.tip && <div style={{ fontSize: '0.85rem', color: '#FFF', marginTop: '4px' }}>Tip: {lastActionFeedback.tip}</div>}
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--starlight-gold)', fontWeight: 700, fontSize: '1rem' }}>
                      ✨ {lastActionFeedback.actionName} Executed!
                    </span>
                    {lastActionFeedback.deltas && (
                      <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
                        {Object.entries(lastActionFeedback.deltas).map(([k, v]) => (
                          <span
                            key={k}
                            style={{
                              background: v > 0 ? 'rgba(6, 214, 160, 0.3)' : 'rgba(239, 71, 111, 0.3)',
                              color: v > 0 ? '#06D6A0' : '#EF476F',
                              padding: '2px 6px',
                              borderRadius: '6px',
                              fontWeight: 700
                            }}
                          >
                            {k}: {v > 0 ? `+${v}` : v}%
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p style={{ color: '#FFF', fontSize: '0.92rem', marginBottom: '8px' }}>
                    {lastActionFeedback.explanation}
                  </p>
                  {lastActionFeedback.scienceFact && (
                    <div style={{ fontSize: '0.82rem', color: '#B8C0E0', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #FFD166' }}>
                      🚀 <strong>NASA Science Fact:</strong> {lastActionFeedback.scienceFact}
                    </div>
                  )}
                </>
              )}
            </div>
            <button
              onClick={() => setLastActionFeedback(null)}
              style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>
        </Card>
      )}

      {/* 4-System Life Support Action Bay */}
      <h3 style={{ fontSize: '1.25rem', color: 'var(--starlight-gold)', marginBottom: '14px' }}>
        Life Support Resource Action Controls (4 Systems)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {RESOURCE_ACTIONS.map(action => {
          const costEntries = Object.entries(action.cost || {});
          const benefitEntries = Object.entries(action.benefit || {});

          return (
            <Card
              key={action.id}
              style={{
                padding: '16px',
                background: 'rgba(19, 29, 61, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{action.icon}</span>
                    <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>{action.name}</strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                    {action.system.toUpperCase()}
                  </span>
                </div>

                {/* Resource Impact Preview */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px', fontSize: '0.78rem' }}>
                  {benefitEntries.map(([k, v]) => (
                    <span key={k} style={{ color: '#06D6A0', background: 'rgba(6, 214, 160, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      +{v}% {k}
                    </span>
                  ))}
                  {costEntries.map(([k, v]) => (
                    <span key={k} style={{ color: '#EF476F', background: 'rgba(239, 71, 111, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                      -{v}% {k}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="teal"
                size="sm"
                sound="powerup"
                onClick={() => handleEngineActionClick(action.id)}
              >
                Execute Action
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Grid of 6 Interactive Outpost Module Diagnostic Bays */}
      <h3 style={{ fontSize: '1.25rem', color: 'var(--starlight-gold)', marginBottom: '14px' }}>
        Outpost Subsystem Maintenance Bays
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

      {/* Educational Notice Banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px dashed rgba(255, 255, 255, 0.15)',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        ℹ️ {EDUCATIONAL_DISCLAIMER}
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
