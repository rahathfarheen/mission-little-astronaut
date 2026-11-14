import React from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { AstronautAvatar } from '../components/common/AstronautAvatar';

export const WelcomeScreen = () => {
  const { navigateTo, cadetProfile } = useGame();

  return (
    <div className="game-container" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '85vh' }}>
      {/* Floating Astronaut Hero */}
      <div style={{ marginBottom: '20px' }}>
        <AstronautAvatar
          suit={cadetProfile.suit}
          visor={cadetProfile.visor}
          patch={cadetProfile.patch}
          size={190}
          animate={true}
        />
      </div>

      {/* Main Title Banner */}
      <div style={{ maxWidth: '780px', marginBottom: '28px' }}>
        <div
          className="badge-pill"
          style={{
            background: 'rgba(255, 209, 102, 0.15)',
            border: '2px solid rgba(255, 209, 102, 0.4)',
            color: 'var(--starlight-gold)',
            marginBottom: '16px'
          }}
        >
          ✨ STEM Space Exploration For Young Cadets (Ages 7–12)
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            lineHeight: 1.15,
            marginBottom: '16px',
            textShadow: '0 8px 30px rgba(58, 134, 255, 0.4)'
          }}
        >
          Mission: <span style={{ color: 'var(--starlight-gold)', textShadow: '0 0 25px rgba(255, 209, 102, 0.6)' }}>Little Astronaut</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto'
          }}
        >
          Journey 384,400 kilometres to the Moon! Build your cadet profile, manage a futuristic lunar outpost, harvest hidden crater ice, and discover real NASA science.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        <Button
          variant="gold"
          size="lg"
          icon="🚀"
          sound="launch"
          onClick={() => navigateTo(SCREENS.ONBOARDING)}
          style={{ minWidth: '220px' }}
        >
          Blast Off!
        </Button>

        <Button
          variant="ghost"
          size="lg"
          icon="🛰️"
          onClick={() => navigateTo(SCREENS.OUTPOST)}
          style={{ minWidth: '200px' }}
        >
          Enter Outpost
        </Button>

        <Button
          variant="teal"
          size="lg"
          icon="🔬"
          onClick={() => navigateTo(SCREENS.SCIENCE)}
          style={{ minWidth: '200px' }}
        >
          NASA Science Lab
        </Button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid-3" style={{ width: '100%', maxWidth: '960px' }}>
        <Card style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧑‍🚀</div>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '6px' }}>Customize Your Cadet</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Choose your official Artemis spacesuit, UV-protective visor, and flight patch.
          </p>
        </Card>

        <Card style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌕</div>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '6px' }}>Survive on the Moon</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Balance oxygen, solar power, and water reserves at Lunar Base Alpha.
          </p>
        </Card>

        <Card style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔭</div>
          <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '6px' }}>Real NASA Science</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Learn authentic facts about the SLS rocket, Lunar Gateway, and lunar ice.
          </p>
        </Card>
      </div>
    </div>
  );
};
