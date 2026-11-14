import React from 'react';
import { GameProvider, useGame, SCREENS } from './context/GameContext';
import { TopNav } from './components/common/TopNav';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AgeSelectionScreen } from './screens/AgeSelectionScreen';
import { PlanetSelectionScreen } from './screens/PlanetSelectionScreen';
import { MissionBriefingScreen } from './screens/MissionBriefingScreen';
import { OutpostScreen } from './screens/OutpostScreen';
import { MissionScreen } from './screens/MissionScreen';
import { ScienceCentreScreen } from './screens/ScienceCentreScreen';
import { ResultsScreen } from './screens/ResultsScreen';

const ScreenRouter = () => {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case SCREENS.WELCOME:
      return <WelcomeScreen />;
    case SCREENS.ONBOARDING:
      return <OnboardingScreen />;
    case SCREENS.AGE_SELECTION:
      return <AgeSelectionScreen />;
    case SCREENS.PLANET_SELECTION:
      return <PlanetSelectionScreen />;
    case SCREENS.MISSION_BRIEFING:
      return <MissionBriefingScreen />;
    case SCREENS.OUTPOST:
      return <OutpostScreen />;
    case SCREENS.MISSION:
      return <MissionScreen />;
    case SCREENS.SCIENCE:
      return <ScienceCentreScreen />;
    case SCREENS.RESULTS:
      return <ResultsScreen />;
    default:
      return <WelcomeScreen />;
  }
};

export const App = () => {
  return (
    <GameProvider>
      {/* 2.5D Cosmic Space Environment Background */}
      <div className="space-background">
        <div className="stars-twinkle" />
        <div className="nebula-glow nebula-blue" />
        <div className="nebula-glow nebula-purple" />
        <div className="nebula-glow nebula-gold" />
        <div className="lunar-horizon">
          <div className="lunar-crater-layer" />
        </div>
      </div>

      {/* Persistent Mission HUD Bar */}
      <TopNav />

      {/* Screen Router Viewport */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <ScreenRouter />
      </main>
    </GameProvider>
  );
};

export default App;
