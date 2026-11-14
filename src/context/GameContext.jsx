import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUIT_COLORS, VISOR_COLORS, CADET_PATCHES } from '../data/badgesData';
import { INITIAL_HUD_RESOURCES } from '../data/outpostData';
import { soundFx } from '../utils/audio';

const GameContext = createContext(null);

export const SCREENS = {
  WELCOME: 'welcome',
  ONBOARDING: 'onboarding',
  AGE_SELECTION: 'age-selection',
  PLANET_SELECTION: 'planet-selection',
  MISSION_BRIEFING: 'mission-briefing',
  OUTPOST: 'outpost',
  MISSION: 'mission',
  SCIENCE: 'science',
  RESULTS: 'results'
};

const SCREEN_FLOW = [
  SCREENS.WELCOME,
  SCREENS.ONBOARDING,
  SCREENS.AGE_SELECTION,
  SCREENS.PLANET_SELECTION,
  SCREENS.MISSION_BRIEFING,
  SCREENS.OUTPOST,
  SCREENS.MISSION,
  SCREENS.RESULTS
];

export const GameProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  
  // Cadet customization
  const [cadetProfile, setCadetProfile] = useState({
    name: 'Cadet Nova',
    suit: SUIT_COLORS[0],
    visor: VISOR_COLORS[0],
    patch: CADET_PATCHES[0]
  });

  // Age group: '7-8', '9-10', '11-12'
  const [ageGroup, setAgeGroup] = useState('9-10');

  // Celestial target
  const [destination, setDestination] = useState('moon');

  // Mission selection
  const [activeMissionId, setActiveMissionId] = useState('ice-extractor');

  // Outpost resource levels
  const [resources, setResources] = useState(INITIAL_HUD_RESOURCES);

  // Unlocked badges
  const [unlockedBadges, setUnlockedBadges] = useState(['first-step']);

  // Latest mission results
  const [lastMissionSummary, setLastMissionSummary] = useState({
    stars: 3,
    score: 850,
    extractedItems: ['Deep Core Ice Pocket', 'Crystalline Regolith', 'Cryogenic Volatile'],
    resourcesEarned: { water: '+35 L', oxygen: '+15 %', battery: '+20 %' },
    message: 'Spectacular achievement! Outpost life support levels boosted to optimal.'
  });

  // Sound mute state
  const [muted, setMuted] = useState(soundFx.isMuted());

  const toggleSound = () => {
    const nextState = soundFx.toggleMute();
    setMuted(nextState);
    if (!nextState) soundFx.play('click');
  };

  const navigateTo = (screenId) => {
    soundFx.play('click');
    setCurrentScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNextScreen = () => {
    const currentIndex = SCREEN_FLOW.indexOf(currentScreen);
    if (currentIndex >= 0 && currentIndex < SCREEN_FLOW.length - 1) {
      navigateTo(SCREEN_FLOW[currentIndex + 1]);
    } else {
      navigateTo(SCREENS.OUTPOST);
    }
  };

  const goPreviousScreen = () => {
    const currentIndex = SCREEN_FLOW.indexOf(currentScreen);
    if (currentIndex > 0) {
      navigateTo(SCREEN_FLOW[currentIndex - 1]);
    } else {
      navigateTo(SCREENS.WELCOME);
    }
  };

  const unlockBadge = (badgeId) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges(prev => [...prev, badgeId]);
      soundFx.play('badge');
    }
  };

  const boostResource = (key, amount = 5) => {
    soundFx.play('powerup');
    setResources(prev => {
      const current = prev[key] || 50;
      const updated = Math.min(100, Math.max(10, current + amount));
      return { ...prev, [key]: updated };
    });
  };

  const completeMission = (results) => {
    setLastMissionSummary(results);
    // boost resources automatically
    setResources(prev => ({
      ...prev,
      water: Math.min(100, prev.water + 15),
      oxygen: Math.min(100, prev.oxygen + 10),
      energy: Math.min(100, prev.energy + 10)
    }));
    unlockBadge('ice-hunter');
    unlockBadge('commander');
    navigateTo(SCREENS.RESULTS);
  };

  const resetGame = () => {
    soundFx.play('click');
    setResources(INITIAL_HUD_RESOURCES);
    setUnlockedBadges(['first-step']);
    setCurrentScreen(SCREENS.WELCOME);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goNextScreen,
        goPreviousScreen,
        cadetProfile,
        setCadetProfile,
        ageGroup,
        setAgeGroup,
        destination,
        setDestination,
        activeMissionId,
        setActiveMissionId,
        resources,
        boostResource,
        unlockedBadges,
        unlockBadge,
        lastMissionSummary,
        completeMission,
        resetGame,
        muted,
        toggleSound
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
