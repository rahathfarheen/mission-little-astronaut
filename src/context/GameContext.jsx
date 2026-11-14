import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { SUIT_COLORS, VISOR_COLORS, CADET_PATCHES } from '../data/badgesData';
import { INITIAL_HUD_RESOURCES } from '../data/outpostData';
import { ResourceEngine } from '../services/resourceEngine.js';
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

  // Modular Resource Engine instance (pure JS logic decoupled from React rendering)
  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = new ResourceEngine({
      oxygen: INITIAL_HUD_RESOURCES.oxygen || 92,
      water: INITIAL_HUD_RESOURCES.water || 78,
      energy: INITIAL_HUD_RESOURCES.energy || 85,
      radiationShield: INITIAL_HUD_RESOURCES.hullIntegrity || 95
    });
  }

  // Outpost resource levels synced with the engine
  const [resources, setResources] = useState(() => ({
    ...INITIAL_HUD_RESOURCES,
    radiationShield: INITIAL_HUD_RESOURCES.hullIntegrity || 95,
    ...engineRef.current.getResources()
  }));

  const [survivalStatus, setSurvivalStatus] = useState(() => engineRef.current.checkSurvivalStatus());
  const [lastActionFeedback, setLastActionFeedback] = useState(null);

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
    const engineKey = key === 'hullIntegrity' ? 'radiationShield' : key;
    if (engineRef.current.configs[engineKey]) {
      engineRef.current.recoverResource(engineKey, amount, 'Cadet boost');
    }
    const updated = engineRef.current.getResources();
    setResources(prev => ({
      ...prev,
      ...updated,
      hullIntegrity: updated.radiationShield
    }));
    setSurvivalStatus(engineRef.current.checkSurvivalStatus());
  };

  const applyEngineAction = (actionId) => {
    const result = engineRef.current.applyAction(actionId, ageGroup);
    if (result.success) {
      soundFx.play('powerup');
      setResources(prev => ({
        ...prev,
        ...result.currentLevels,
        hullIntegrity: result.currentLevels.radiationShield
      }));
      setSurvivalStatus(result.survivalStatus);
      setLastActionFeedback({
        actionName: result.actionName,
        explanation: result.explanation,
        scienceFact: result.scienceFact,
        deltas: result.deltas
      });
    } else {
      soundFx.play('click');
      setLastActionFeedback({
        error: result.error,
        tip: result.tip
      });
    }
    return result;
  };

  const advanceEngineTick = () => {
    const tickResult = engineRef.current.tick({ triggerRandomEvent: true });
    setResources(prev => ({
      ...prev,
      ...tickResult.currentLevels,
      hullIntegrity: tickResult.currentLevels.radiationShield
    }));
    setSurvivalStatus(tickResult.survivalStatus);
    return tickResult;
  };

  const completeMission = (results) => {
    setLastMissionSummary(results);
    // boost resources automatically in engine
    engineRef.current.recoverResource('water', 15, 'Mission Harvest');
    engineRef.current.recoverResource('oxygen', 10, 'Mission Harvest');
    engineRef.current.recoverResource('energy', 10, 'Mission Harvest');
    const updated = engineRef.current.getResources();
    setResources(prev => ({
      ...prev,
      ...updated,
      hullIntegrity: updated.radiationShield
    }));
    setSurvivalStatus(engineRef.current.checkSurvivalStatus());
    unlockBadge('ice-hunter');
    unlockBadge('commander');
    navigateTo(SCREENS.RESULTS);
  };

  const resetGame = () => {
    soundFx.play('click');
    engineRef.current.reset();
    const updated = engineRef.current.getResources();
    setResources({
      ...INITIAL_HUD_RESOURCES,
      ...updated,
      hullIntegrity: updated.radiationShield
    });
    setSurvivalStatus(engineRef.current.checkSurvivalStatus());
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
        resourceEngine: engineRef.current,
        applyEngineAction,
        advanceEngineTick,
        survivalStatus,
        lastActionFeedback,
        setLastActionFeedback,
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
