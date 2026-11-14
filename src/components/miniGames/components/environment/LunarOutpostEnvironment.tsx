import React, { useState } from 'react';
import { OutpostElementId, LunarOutpostProps } from '../../types/outpost';
import { OUTPOST_ELEMENTS } from '../../data/outpostData';
import { EarthBackground } from './EarthBackground';
import { LunarLandscape } from './LunarLandscape';
import { CrewHabitat } from '../buildings/CrewHabitat';
import { SolarPanelStation } from '../buildings/SolarPanelStation';
import { Greenhouse } from '../buildings/Greenhouse';
import { RadiationShelter } from '../buildings/RadiationShelter';
import { LunarRover } from '../buildings/LunarRover';
import { AstronautCharacters } from '../characters/AstronautCharacters';
import { BuildingInfoPanel } from '../panels/BuildingInfoPanel';
import { soundEffects } from '../panels/AudioEffects';

export const LunarOutpostEnvironment: React.FC<LunarOutpostProps> = ({
  selectedElementId: controlledSelectedId,
  onSelectElement: controlledOnSelect,
  discoveredElements: controlledDiscovered,
  onDiscoverElement,
  soundEnabled = true,
  onToggleSound,
  className = '',
  showInspectorPanel = true,
  showDayNightShift = true
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<OutpostElementId | null>(null);
  const [internalDiscovered, setInternalDiscovered] = useState<OutpostElementId[]>([]);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [hasSalutedFlag, setHasSalutedFlag] = useState<boolean>(false);

  const activeSelectedId = controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId;
  const activeDiscovered = controlledDiscovered !== undefined ? controlledDiscovered : internalDiscovered;

  const handleSelectElement = (id: OutpostElementId | null) => {
    if (id) {
      soundEffects.playBuildingOpen(id);
      if (!activeDiscovered.includes(id)) {
        if (onDiscoverElement) {
          onDiscoverElement(id);
        } else {
          setInternalDiscovered(prev => [...prev, id]);
        }
      }
    } else {
      soundEffects.playClick();
    }

    if (controlledOnSelect) {
      controlledOnSelect(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  const handleFlagClick = () => {
    soundEffects.playSuccess();
    setHasSalutedFlag(true);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    soundEffects.setEnabled(newState);
    onToggleSound?.(newState);
  };

  const activeElementInfo = activeSelectedId ? OUTPOST_ELEMENTS[activeSelectedId] : null;

  return (
    <div className={`relative w-full overflow-hidden select-none bg-slate-950 font-sans rounded-3xl border border-slate-800 shadow-2xl ${className}`}>
      {/* 1. Deep Space Cosmic Sky & Earth */}
      <EarthBackground isNightMode={isNightMode} />

      {/* 2. Top Exploration HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center gap-2.5">
            <span className="text-xl">🚀</span>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white tracking-wide leading-none">
                Mission: Little Astronaut
              </h1>
              <p className="text-[10px] text-sky-300 font-semibold mt-0.5">
                Member 2 Deliverable: Visual Outpost Environment
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-xs font-bold text-slate-300">
            <span className="text-amber-400">🏅</span>
            <span>Explored:</span>
            <span className="text-sky-300 font-black">
              {activeDiscovered.length} / {Object.keys(OUTPOST_ELEMENTS).length}
            </span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {showDayNightShift && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsNightMode(!isNightMode);
              }}
              className="px-3 py-1.5 rounded-2xl bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg"
              title="Toggle Lunar Starfield Ambiance"
            >
              <span>{isNightMode ? '✨' : '🌌'}</span>
              <span className="hidden md:inline">{isNightMode ? 'Star Glow' : 'Cosmic Sky'}</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-2xl border backdrop-blur-md text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg ${
              soundEnabled
                ? 'bg-slate-900/85 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
                : 'bg-slate-900/85 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Mute sound effects' : 'Enable kid sound effects'}
          >
            <span>{soundEnabled ? '🔊' : '🔇'}</span>
            <span className="hidden md:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Illustrated Outpost Interactive Canvas */}
      <div className="relative w-full aspect-[16/10] min-h-[520px] max-h-[850px] overflow-hidden">
        <LunarLandscape
          hasDiscoveredFlag={hasSalutedFlag}
          onFlagClick={handleFlagClick}
        />

        {/* 1. Crew Habitat */}
        <div className="absolute bottom-[20%] left-[2%] sm:left-[5%] md:left-[7%] z-10">
          <CrewHabitat
            isSelected={activeSelectedId === 'habitat'}
            hasDiscovered={activeDiscovered.includes('habitat')}
            onClick={() => handleSelectElement('habitat')}
          />
        </div>

        {/* 2. Solar Panel Station */}
        <div className="absolute bottom-[28%] left-[28%] sm:left-[30%] md:left-[32%] z-10">
          <SolarPanelStation
            isSelected={activeSelectedId === 'solar-station'}
            hasDiscovered={activeDiscovered.includes('solar-station')}
            onClick={() => handleSelectElement('solar-station')}
          />
        </div>

        {/* 3. Greenhouse */}
        <div className="absolute bottom-[22%] left-[46%] sm:left-[48%] md:left-[50%] z-10">
          <Greenhouse
            isSelected={activeSelectedId === 'greenhouse'}
            hasDiscovered={activeDiscovered.includes('greenhouse')}
            onClick={() => handleSelectElement('greenhouse')}
          />
        </div>

        {/* 4. Radiation Shelter */}
        <div className="absolute bottom-[24%] right-[16%] sm:right-[18%] md:right-[20%] z-10">
          <RadiationShelter
            isSelected={activeSelectedId === 'radiation-shelter'}
            hasDiscovered={activeDiscovered.includes('radiation-shelter')}
            onClick={() => handleSelectElement('radiation-shelter')}
          />
        </div>

        {/* 5. Lunar Scout Rover */}
        <div className="absolute bottom-[16%] right-[2%] sm:right-[4%] md:right-[5%] z-10">
          <LunarRover
            isSelected={activeSelectedId === 'rover'}
            hasDiscovered={activeDiscovered.includes('rover')}
            onClick={() => handleSelectElement('rover')}
          />
        </div>

        {/* Astronauts */}
        <AstronautCharacters
          onSelectAstronaut={(id) => handleSelectElement(id)}
          selectedId={activeSelectedId}
        />
      </div>

      {/* 4. Bottom Quick Selector Ribbon */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto lunar-custom-scroll">
        <div className="text-xs font-bold text-slate-400 whitespace-nowrap pl-2 flex items-center gap-1.5">
          <span>👇</span>
          <span>Click any structure or astronaut:</span>
        </div>

        <div className="flex items-center gap-2">
          {Object.values(OUTPOST_ELEMENTS).map((item) => {
            const isDiscovered = activeDiscovered.includes(item.id);
            const isSelected = activeSelectedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectElement(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-300 shadow-md scale-105'
                    : isDiscovered
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.name.replace(' Dome', '').replace(' Station', '')}</span>
                {isDiscovered && <span className="text-[10px] text-emerald-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Child-Friendly Information Panel Modal */}
      {showInspectorPanel && activeElementInfo && (
        <BuildingInfoPanel
          info={activeElementInfo}
          onClose={() => handleSelectElement(null)}
          onCompleteMiniTask={(id) => {
            if (!activeDiscovered.includes(id as OutpostElementId)) {
              if (onDiscoverElement) {
                onDiscoverElement(id as OutpostElementId);
              } else {
                setInternalDiscovered(prev => [...prev, id as OutpostElementId]);
              }
            }
          }}
          isBadgeEarned={activeDiscovered.includes(activeElementInfo.id)}
        />
      )}
    </div>
  );
};
