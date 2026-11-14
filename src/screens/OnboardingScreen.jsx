import React from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { AstronautAvatar } from '../components/common/AstronautAvatar';
import { SUIT_COLORS, VISOR_COLORS, CADET_PATCHES } from '../data/badgesData';
import { soundFx } from '../utils/audio';

export const OnboardingScreen = () => {
  const { cadetProfile, setCadetProfile, navigateTo } = useGame();

  const handleNameChange = (e) => {
    setCadetProfile({ ...cadetProfile, name: e.target.value });
  };

  const handleQuickName = (name) => {
    soundFx.play('click');
    setCadetProfile({ ...cadetProfile, name });
  };

  const handleSuitSelect = (suit) => {
    soundFx.play('click');
    setCadetProfile({ ...cadetProfile, suit });
  };

  const handleVisorSelect = (visor) => {
    soundFx.play('click');
    setCadetProfile({ ...cadetProfile, visor });
  };

  const handlePatchSelect = (patch) => {
    soundFx.play('click');
    setCadetProfile({ ...cadetProfile, patch });
  };

  return (
    <div className="game-container">
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="badge-pill" style={{ background: 'rgba(58, 134, 255, 0.15)', color: 'var(--artemis-blue)', marginBottom: '8px' }}>
          Step 1 of 4 • Cadet Identity
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#FFF' }}>
          Suit Up, Cadet! Customize Your Astronaut
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Personalize your lunar pressure suit, radiation visor, and flight patch before flight certification.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.3fr)', gap: '28px', alignItems: 'center' }}>
        {/* Left Column: Live 2.5D Astronaut Avatar Preview */}
        <Card style={{ padding: '32px 24px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(58, 134, 255, 0.15) 0%, rgba(14, 22, 48, 0.9) 70%)' }}>
          <div style={{ marginBottom: '20px' }}>
            <AstronautAvatar
              suit={cadetProfile.suit}
              visor={cadetProfile.visor}
              patch={cadetProfile.patch}
              size={210}
              animate={true}
            />
          </div>

          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: '16px', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Official NASA Flight Badge
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--starlight-gold)', marginTop: '2px' }}>
              {cadetProfile.name || 'Unnamed Cadet'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', marginTop: '4px' }}>
              Suit: {cadetProfile.suit.name}
            </div>
          </div>
        </Card>

        {/* Right Column: Customization Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Cadet Name Input */}
          <Card style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--starlight-gold)', marginBottom: '8px' }}>
              1. Cadet Call Sign / Name
            </label>
            <input
              type="text"
              value={cadetProfile.name}
              onChange={handleNameChange}
              placeholder="Enter your name..."
              maxLength={18}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(110, 142, 251, 0.4)',
                color: '#FFF',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                outline: 'none',
                marginBottom: '10px'
              }}
            />
            {/* Quick suggested names */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Quick picks:</span>
              {['Cadet Nova', 'Astro Leo', 'Stella Moon', 'Captain Orion'].map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() => handleQuickName(quick)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--text-secondary)',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {quick}
                </button>
              ))}
            </div>
          </Card>

          {/* Spacesuit Color Selection */}
          <Card style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--starlight-gold)', marginBottom: '10px' }}>
              2. Spacesuit Color Fabric
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {SUIT_COLORS.map((suit) => {
                const isSelected = cadetProfile.suit.id === suit.id;
                return (
                  <div
                    key={suit.id}
                    onClick={() => handleSuitSelect(suit)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(58, 134, 255, 0.25)' : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${isSelected ? 'var(--starlight-gold)' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: suit.hex,
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: `0 0 8px ${suit.accent}`
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                      {suit.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Visor Tint Selection */}
          <Card style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--starlight-gold)', marginBottom: '10px' }}>
              3. Helmet Visor UV Tint
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {VISOR_COLORS.map((visor) => {
                const isSelected = cadetProfile.visor.id === visor.id;
                return (
                  <div
                    key={visor.id}
                    onClick={() => handleVisorSelect(visor)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(255, 209, 102, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${isSelected ? 'var(--starlight-gold)' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        backgroundColor: visor.hex,
                        boxShadow: `0 0 10px ${visor.hex}`
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                      {visor.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Mission Patch Selection */}
          <Card style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--starlight-gold)', marginBottom: '10px' }}>
              4. Cadet Mission Patch
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {CADET_PATCHES.map((patch) => {
                const isSelected = cadetProfile.patch.id === patch.id;
                return (
                  <div
                    key={patch.id}
                    onClick={() => handlePatchSelect(patch)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(6, 214, 160, 0.25)' : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${isSelected ? '#06D6A0' : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{patch.icon}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? '#FFF' : 'var(--text-secondary)' }}>
                      {patch.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '10px' }}>
            <Button
              variant="ghost"
              onClick={() => navigateTo(SCREENS.WELCOME)}
            >
              ← Back
            </Button>

            <Button
              variant="gold"
              size="lg"
              icon="✓"
              onClick={() => navigateTo(SCREENS.AGE_SELECTION)}
              style={{ flex: 1 }}
            >
              Lock In Profile → Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
