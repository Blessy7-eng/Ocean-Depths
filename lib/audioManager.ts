'use client';

// Audio Manager for Ocean Depths
class AudioManager {
  private ambientAudio: HTMLAudioElement | null = null;
  private sonarPingAudio: HTMLAudioElement | null = null;
  private isSoundEnabled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudio();
    }
  }

  private initializeAudio() {
    // Create ambient ocean wave sound using Web Audio API
    this.createAmbientSound();
    // Create sonar ping sound
    this.createSonarPing();
  }

  private createAmbientSound() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;

    // Create a looping ambient wave sound
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(40, now);
    oscillator.frequency.linearRampToValueAtTime(50, now + 2);
    oscillator.frequency.linearRampToValueAtTime(40, now + 4);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 2);
    gain.gain.linearRampToValueAtTime(0.1, now + 4);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 4);

    // Schedule next loop
    setTimeout(() => {
      if (this.isSoundEnabled) {
        this.createAmbientSound();
      }
    }, 4000);
  }

  private createSonarPing() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  enableSound() {
    this.isSoundEnabled = true;
    this.createAmbientSound();
  }

  disableSound() {
    this.isSoundEnabled = false;
  }

  playSonarPing() {
    if (this.isSoundEnabled) {
      this.createSonarPing();
    }
  }

  isEnabled() {
    return this.isSoundEnabled;
  }
}

// Create singleton instance
export const audioManager = new AudioManager();
