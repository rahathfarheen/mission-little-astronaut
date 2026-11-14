import React, { useEffect } from 'react';
import { useGame, SCREENS } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { AstronautAvatar } from '../components/common/AstronautAvatar';
import { fireCelebration } from '../utils/confetti';
import { soundFx } from '../utils/audio';

export const ResultsScreen = () => {
  const {
    cadetProfile,
    ageGroup,
    lastMissionSummary,
    unlockedBadges,
    navigateTo,
    resetGame
  } = useGame();

  useEffect(() => {
    // Launch celebratory confetti and sound on load!
    fireCelebration();
    soundFx.play('badge');
  }, []);

  const handlePrintCertificate = () => {
    soundFx.play('click');
    window.print();
  };

  return (
    <div className="game-container" style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge-pill" style={{ background: 'rgba(255, 209, 102, 0.2)', color: 'var(--starlight-gold)', marginBottom: '8px' }}>
          🏆 Mission Accomplished!
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FFF' }}>
          Outstanding Performance, Cadet!
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
          You have safeguarded the habitat and expanded humanity\'s frontier on the Moon.
        </p>
      </div>

      {/* 3 Gold Stars Rating */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
        {[1, 2, 3].map((star) => (
          <div
            key={star}
            style={{
              fontSize: '3.2rem',
              filter: 'drop-shadow(0 0 16px #FFD166)',
              animation: `pulse-gentle ${1 + star * 0.2}s infinite`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Mission Debrief Card */}
      <Card style={{ padding: '28px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(14, 22, 48, 0.95) 0%, rgba(19, 29, 61, 0.95) 100%)', border: '2px solid rgba(255, 209, 102, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--starlight-gold)' }}>
              Mission Debriefing & Resources Safeguarded
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {lastMissionSummary.message}
            </p>
          </div>
          <div className="font-telemetry" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#06D6A0' }}>
            Score: +{lastMissionSummary.score} PTS
          </div>
        </div>

        {/* Extracted Items */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            CATALOGUED SCIENTIFIC SAMPLES:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lastMissionSummary.extractedItems?.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ color: '#06D6A0' }}>✓</span>
                <span style={{ color: '#FFF' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Gained */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ background: 'rgba(6, 214, 160, 0.1)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(6, 214, 160, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Water Added</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06D6A0' }}>{lastMissionSummary.resourcesEarned?.water || '+25 L'}</div>
          </div>
          <div style={{ background: 'rgba(58, 134, 255, 0.1)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(58, 134, 255, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oxygen Boost</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#3A86FF' }}>{lastMissionSummary.resourcesEarned?.oxygen || '+15 %'}</div>
          </div>
          <div style={{ background: 'rgba(255, 209, 102, 0.1)', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255, 209, 102, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Battery Recharge</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFD166' }}>{lastMissionSummary.resourcesEarned?.battery || '+20 %'}</div>
          </div>
        </div>
      </Card>

      {/* Official Printable NASA Cadet Certificate */}
      <div
        id="cadet-certificate"
        style={{
          background: 'linear-gradient(135deg, #0D1630 0%, #080D1F 100%)',
          border: '4px double #FFD166',
          borderRadius: '24px',
          padding: '36px',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(255, 209, 102, 0.2) 0%, transparent 70%)' }} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '2.4rem' }}>🌟</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--starlight-gold)', letterSpacing: '0.1em' }}>
            NATIONAL AERONAUTICS AND SPACE ADMINISTRATION
          </span>
          <span style={{ fontSize: '2.4rem' }}>🌟</span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#FFF', marginBottom: '8px' }}>
          CERTIFICATE OF LUNAR EXCELLENCE
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          This official credential certifies that Cadet
        </p>

        {/* Cadet Name with Glowing Ribbon */}
        <div style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', color: 'var(--starlight-gold)', fontWeight: 800, fontFamily: 'var(--font-heading)', textDecoration: 'underline wavy #3A86FF', marginBottom: '16px' }}>
          {cadetProfile.name}
        </div>

        <p style={{ fontSize: '1rem', color: '#FFF', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Has successfully completed mission operations at <strong>Lunar Base Alpha</strong>, extracted critical cryogenic resources at Shackleton Crater, and mastered the science of lunar exploration.
        </p>

        {/* Certificate Badges & Avatar Row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <div style={{ width: '60px', height: '70px' }}>
            <AstronautAvatar
              suit={cadetProfile.suit}
              visor={cadetProfile.visor}
              patch={cadetProfile.patch}
              size={60}
              animate={false}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>RANK & DIFFICULTY</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38BDF8' }}>
              Level: Age {ageGroup} Specialist
            </div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0' }}>
              Patch: {cadetProfile.patch.name}
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MISSION DATE</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
              {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--starlight-gold)' }}>
              Status: Mission Certified
            </div>
          </div>
        </div>
      </div>

      {/* Cadet Badges Showcase */}
      <Card style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--starlight-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎖️</span> Cadet Achievement Showcase ({unlockedBadges.length} Badges Unlocked)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
          {['first-step', 'ice-hunter', 'solar-engineer', 'rock-hound', 'nasa-scholar', 'commander'].map((badgeId) => (
            <Badge
              key={badgeId}
              badgeId={badgeId}
              isUnlocked={unlockedBadges.includes(badgeId)}
              size="md"
            />
          ))}
        </div>
      </Card>

      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="gold"
          size="lg"
          icon="🖨️"
          onClick={handlePrintCertificate}
        >
          Print Certificate
        </Button>

        <Button
          variant="blue"
          size="lg"
          icon="🛰️"
          onClick={() => navigateTo(SCREENS.OUTPOST)}
        >
          Return to Outpost
        </Button>

        <Button
          variant="teal"
          size="lg"
          icon="🔬"
          onClick={() => navigateTo(SCREENS.SCIENCE)}
        >
          Visit NASA Science Lab
        </Button>

        <Button
          variant="ghost"
          size="lg"
          icon="🔄"
          onClick={resetGame}
        >
          New Cadet Voyage
        </Button>
      </div>
    </div>
  );
};
