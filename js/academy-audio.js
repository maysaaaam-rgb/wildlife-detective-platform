/**
 * ENGLISH ADVENTURE ACADEMY — ZERO-DEPENDENCY WEB AUDIO ENGINE
 * js/academy-audio.js
 * 
 * Standalone, zero-dependency browser Web Audio synthesizer for gamified feedback:
 * - playCoin(): Positive coin chime (dual-tone sine wave 987.77Hz B5 -> 1318.51Hz E6)
 * - playFanfare(): Level-up victory arpeggio [523.25, 659.25, 783.99, 1046.50]
 * - playWhoosh(): Modal opening & transitional whoosh chord [220, 277.18, 329.63]
 * - playSnap(): Mechanical micro-click for tactile button presses
 * - playTimerTick() / playTimerAlarm(): Classroom countdown timer feedback
 */

(function(root) {
  'use strict';

  class AcademySoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    playChord(frequencies, type = "sine", duration = 0.35, gainLevel = 0.15) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      frequencies.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(gainLevel, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      });
    }

    /**
     * Trigger positive coin chime (+10 XP)
     * Dual-tone sine wave at 987Hz (B5) -> 1318Hz (E6)
     */
    playCoin() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    /**
     * Modal Opening / Traps / Transitions
     */
    playWhoosh() {
      if (!this.enabled) return;
      this.playChord([220, 277.18, 329.63], "triangle", 0.38, 0.18);
    }

    /**
     * Mechanical micro-click for active button presses
     */
    playSnap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    }

    /**
     * Leveling Up / Evolution Fanfare
     */
    playFanfare() {
      if (!this.enabled) return;
      const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      melody.forEach((freq, idx) => {
        setTimeout(() => this.playChord([freq, freq * 1.5], "triangle", 0.3, 0.16), idx * 110);
      });
    }

    playSoftFail() {
      if (!this.enabled) return;
      this.playChord([246.94, 220.00], "sine", 0.28, 0.2);
    }

    playTimerTick() {
      if (!this.enabled) return;
      this.playChord([1200], "sine", 0.04, 0.05);
    }

    playTimerAlarm() {
      if (!this.enabled) return;
      for (let i = 0; i < 3; i++) {
        setTimeout(() => this.playChord([880, 1760], "triangle", 0.2, 0.25), i * 220);
      }
    }
  }

  const engine = new AcademySoundEngine();

  if (typeof window !== "undefined") {
    window.AcademySoundEngine = AcademySoundEngine;
    window.academyAudio = engine;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { AcademySoundEngine, academyAudio: engine };
  }
})(typeof window !== 'undefined' ? window : globalThis);
