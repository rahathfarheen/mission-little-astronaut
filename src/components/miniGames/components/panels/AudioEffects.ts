/**
 * Member 2 - Synthesized Audio Effects & Speech Engine
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  public playBuildingOpen(type: string = 'default') {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreq = type === 'solar-station' ? 659.25 : type === 'greenhouse' ? 523.25 : type === 'radiation-shelter' ? 392.00 : 440;

      const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.09, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } catch {}
  }

  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.38);
      });
    } catch {}
  }

  public speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.15;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEffects = new SoundManager();
