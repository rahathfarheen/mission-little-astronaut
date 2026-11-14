import React, { useState, useEffect } from 'react';
import { BuildingInfo } from '../../types/outpost';
import { soundEffects } from './AudioEffects';

export interface BuildingInfoPanelProps {
  info: BuildingInfo | null;
  onClose: () => void;
  onCompleteMiniTask?: (buildingId: string) => void;
  isBadgeEarned?: boolean;
}

export const BuildingInfoPanel: React.FC<BuildingInfoPanelProps> = ({
  info,
  onClose,
  onCompleteMiniTask,
  isBadgeEarned = false
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'fun-fact' | 'stats'>('learn');
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    setTaskCompleted(false);
    setActiveTab('learn');
    soundEffects.stopSpeaking();
    setIsSpeaking(false);
  }, [info?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEffects.stopSpeaking();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      soundEffects.stopSpeaking();
    };
  }, [onClose]);

  if (!info) return null;

  const handleTaskClick = () => {
    soundEffects.playSuccess();
    setTaskCompleted(true);
    onCompleteMiniTask?.(info.id);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      soundEffects.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${info.name}. ${info.tagline}. ${info.kidExplanation} Here is a fun fact: ${info.funFact}`;
      soundEffects.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm"
      onClick={() => {
        soundEffects.stopSpeaking();
        onClose();
      }}
    >
      <div
        className="animate-modal-pop relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border bg-slate-900/95 text-slate-100"
        style={{
          borderColor: info.themeColor.primary,
          boxShadow: `0 20px 50px -10px ${info.themeColor.glow}, 0 0 25px rgba(15, 23, 42, 0.9)`
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="outpost-panel-title"
      >
        <div 
          className="relative px-6 py-5 flex items-start justify-between border-b border-slate-700/60"
          style={{
            background: `linear-gradient(135deg, ${info.themeColor.badgeBg} 0%, rgba(15, 23, 42, 0.95) 85%)`
          }}
        >
          <div className="flex items-center gap-3.5">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/20 select-none"
              style={{ backgroundColor: info.themeColor.primary + '33' }}
            >
              {info.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20"
                  style={{ backgroundColor: info.themeColor.badgeBg, color: info.themeColor.accent }}
                >
                  {info.category}
                </span>
                {isBadgeEarned && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-500/40 animate-badge-bounce">
                    <span>{info.badgeIcon}</span>
                    <span>Discovered!</span>
                  </span>
                )}
              </div>
              <h2 id="outpost-panel-title" className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                {info.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {info.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeak}
              className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isSpeaking 
                  ? 'bg-amber-500 text-slate-950 border-amber-300 animate-pulse' 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-sky-200 border-sky-400/30'
              }`}
              title={isSpeaking ? 'Stop voice reading' : 'Read out loud for kids!'}
              aria-label="Read description out loud"
            >
              <span>{isSpeaking ? '⏹️' : '🔊'}</span>
              <span className="hidden sm:inline">{isSpeaking ? 'Reading...' : 'Read Aloud'}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.stopSpeaking();
                soundEffects.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center text-lg font-bold transition-colors"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => { soundEffects.playClick(); setActiveTab('learn'); }}
            className={`pb-2.5 px-3 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'learn'
                ? 'border-sky-400 text-sky-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📖</span>
            <span>How It Works</span>
          </button>
          <button
            onClick={() => { soundEffects.playClick(); setActiveTab('fun-fact'); }}
            className={`pb-2.5 px-3 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'fun-fact'
                ? 'border-amber-400 text-amber-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>💡</span>
            <span>Fun Fact</span>
          </button>
          <button
            onClick={() => { soundEffects.playClick(); setActiveTab('stats'); }}
            className={`pb-2.5 px-3 rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'border-emerald-400 text-emerald-300 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📊</span>
            <span>Outpost Specs</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto lunar-custom-scroll space-y-4">
          {activeTab === 'learn' && (
            <div className="space-y-4 animate-modal-pop">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                  <span>🚀</span>
                  <h3>Why Astronauts Need This</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {info.kidExplanation}
                </p>
              </div>

              <div 
                className="p-4 rounded-2xl border space-y-1.5"
                style={{
                  backgroundColor: info.themeColor.badgeBg + '22',
                  borderColor: info.themeColor.primary + '55'
                }}
              >
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide" style={{ color: info.themeColor.accent }}>
                  <span>⚡</span>
                  <h4>Space Superpower</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {info.spaceSuperpower}
                </p>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <span className="text-base select-none">🔬</span>
                <div>
                  <span className="font-semibold text-slate-300">Mission Manual: </span>
                  {info.purpose}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fun-fact' && (
            <div className="space-y-4 animate-modal-pop">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                  <span className="text-2xl">🌟</span>
                  <h3>Did You Know? Cosmic Trivia!</h3>
                </div>
                <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
                  "{info.funFact}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <span>🎙️</span>
                  <span>Audio Transmission from Lunar Orbit:</span>
                </div>
                <p className="italic text-xs sm:text-sm text-sky-200">
                  "{info.audioVoiceLine}"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 gap-3 animate-modal-pop">
              {info.stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <span>{stat.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-white mt-1">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <span>🎮</span>
                  <span>Little Astronaut Mission Drill</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {taskCompleted ? info.miniTask.successMessage : info.miniTask.prompt}
                </p>
              </div>

              <button
                onClick={handleTaskClick}
                disabled={taskCompleted}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  taskCompleted
                    ? 'bg-emerald-600 text-white cursor-default shadow-emerald-900/40'
                    : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white hover:scale-105 active:scale-95 shadow-sky-900/50'
                }`}
              >
                <span>{taskCompleted ? '✅' : info.miniTask.actionIcon}</span>
                <span>{taskCompleted ? 'Complete!' : info.miniTask.actionText}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-base">{info.badgeIcon}</span>
            <span>Badge: <strong className="text-slate-200">{info.badgeName}</strong></span>
          </div>
          <button
            onClick={() => {
              soundEffects.stopSpeaking();
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            Back to Outpost
          </button>
        </div>
      </div>
    </div>
  );
};
