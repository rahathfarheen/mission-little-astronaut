// Web Audio API Synthesizer for child-friendly space sound effects
// 100% self-contained, no external MP3 dependencies required!

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  play(type = 'click') {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      switch (type) {
        case 'click':
          // Crisp soft blip
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;

        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;

        case 'success':
          // Cheerful chime: C5 -> E5 -> G5
          [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const chordOsc = this.ctx.createOscillator();
            const chordGain = this.ctx.createGain();
            chordOsc.type = 'triangle';
            chordOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
            chordGain.gain.setValueAtTime(0.15, now + idx * 0.08);
            chordGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
            chordOsc.connect(chordGain);
            chordGain.connect(this.ctx.destination);
            chordOsc.start(now + idx * 0.08);
            chordOsc.stop(now + idx * 0.08 + 0.3);
          });
          break;

        case 'powerup':
          // Sci-fi power rising
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
          break;

        case 'drill':
          // Vibrato drilling sound
          osc.type = 'square';
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.linearRampToValueAtTime(180, now + 0.2);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;

        case 'badge':
          // Fanfare for kid achievement
          [440, 554.37, 659.25, 880].forEach((freq, idx) => {
            const fanOsc = this.ctx.createOscillator();
            const fanGain = this.ctx.createGain();
            fanOsc.type = 'sine';
            fanOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
            fanGain.gain.setValueAtTime(0.18, now + idx * 0.1);
            fanGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45);
            fanOsc.connect(fanGain);
            fanGain.connect(this.ctx.destination);
            fanOsc.start(now + idx * 0.1);
            fanOsc.stop(now + idx * 0.1 + 0.45);
          });
          break;

        case 'alert':
          // Gentle warning beep
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.setValueAtTime(600, now + 0.1);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;

        case 'launch':
          // Rocket engine whoosh
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(80, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.6);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
          osc.start(now);
          osc.stop(now + 0.7);
          break;

        default:
          break;
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }
}

export const soundFx = new SoundManager();
