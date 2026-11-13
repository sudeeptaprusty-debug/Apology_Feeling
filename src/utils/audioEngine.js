// Peaceful ambient audio synthesizer using Web Audio API
// Generates soft piano-like warm tones and subtle evening rain ambiance
// Completely self-contained, no external mp3 assets needed, zero network failure risk.

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isRainPlaying = false;
    this.masterGain = null;
    this.rainGain = null;
    this.musicInterval = null;
    this.rainSource = null;
    this.rainFilter = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pentatonic warm, soothing chords & notes (Ludovico Einaudi / Yiruma / Satie vibe)
  // Key of Db major / Bb minor (Db, Eb, F, Ab, Bb, C, Db5, Eb5, F5)
  playPianoNote(freq, duration = 3.5, volume = 0.28) {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;

    // Dual oscillator for rich, warm acoustic feel
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft lowpass filter to mimic warm felt piano hammers
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    // Warm waveforms
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight warm detune

    // Gentle velocity envelope (soft attack, sustained, slow dreamy decay)
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.linearRampToValueAtTime(volume, now + 0.12);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Subtle stereo panning for immersive space
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      const panVal = (Math.random() - 0.5) * 0.45;
      panner.pan.setValueAtTime(panVal, now);
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain);
    }

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.2);
    osc2.stop(now + duration + 0.2);
  }

  startRain() {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Pink / brown filtered noise for soft gentle rain
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.035; // quiet soft rain
        b6 = white * 0.115926;
      }

      this.rainSource = this.ctx.createBufferSource();
      this.rainSource.buffer = buffer;
      this.rainSource.loop = true;

      this.rainFilter = this.ctx.createBiquadFilter();
      this.rainFilter.type = 'lowpass';
      this.rainFilter.frequency.setValueAtTime(650, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.rainGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 3);

      this.rainSource.connect(this.rainFilter);
      this.rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      this.rainSource.start();
      this.isRainPlaying = true;
    } catch {
      // Graceful fallback
    }
  }

  stopRain() {
    if (this.rainGain && this.ctx) {
      try {
        this.rainGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          if (this.rainSource) {
            this.rainSource.stop();
            this.rainSource.disconnect();
            this.rainSource = null;
          }
          this.isRainPlaying = false;
        }, 1600);
      } catch {
        this.isRainPlaying = false;
      }
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.startRain();

    // Gentle musical phrases
    // Notes frequencies (Hz):
    // C4=261.63, Db4=277.18, Eb4=311.13, F4=349.23, Ab4=415.30, Bb4=466.16, C5=523.25, Db5=554.37, Eb5=622.25, F5=698.46, Ab5=830.61
    const chordProgressions = [
      // Phrase 1: Soft reflective opening (Db maj9)
      [
        { f: 277.18, t: 0, v: 0.22 },     // Db4 bass
        { f: 415.30, t: 300, v: 0.18 },   // Ab4
        { f: 523.25, t: 900, v: 0.15 },   // C5
        { f: 554.37, t: 1600, v: 0.20 },  // Db5
        { f: 622.25, t: 2400, v: 0.14 },  // Eb5
      ],
      // Phrase 2: Tender understanding (Fm7)
      [
        { f: 349.23, t: 0, v: 0.20 },     // F4
        { f: 415.30, t: 400, v: 0.16 },   // Ab4
        { f: 523.25, t: 1100, v: 0.16 },  // C5
        { f: 698.46, t: 1900, v: 0.18 },  // F5
        { f: 523.25, t: 2700, v: 0.12 },  // C5
      ],
      // Phrase 3: Quiet sincerity (Bbm7)
      [
        { f: 233.08, t: 0, v: 0.19 },     // Bb3
        { f: 349.23, t: 450, v: 0.15 },   // F4
        { f: 466.16, t: 1200, v: 0.16 },  // Bb4
        { f: 554.37, t: 1800, v: 0.17 },  // Db5
        { f: 415.30, t: 2600, v: 0.14 },  // Ab4
      ],
      // Phrase 4: Peaceful release & wish of warmth (Gb maj7 / Ab add9)
      [
        { f: 369.99, t: 0, v: 0.20 },     // Gb4
        { f: 466.16, t: 400, v: 0.16 },   // Bb4
        { f: 554.37, t: 1000, v: 0.15 },  // Db5
        { f: 622.25, t: 1700, v: 0.18 },  // Eb5
        { f: 554.37, t: 2500, v: 0.13 },  // Db5
      ]
    ];

    let phraseIndex = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying) return;
      const phrase = chordProgressions[phraseIndex];
      phrase.forEach(note => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playPianoNote(note.f, 4.2, note.v);
          }
        }, note.t);
      });

      phraseIndex = (phraseIndex + 1) % chordProgressions.length;
    };

    // Play initial note immediately with soft fade
    playNextPhrase();

    // Schedule subsequent phrases with quiet pauses in between like a peaceful evening
    this.musicInterval = setInterval(playNextPhrase, 4200);
  }

  stop() {
    this.isPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.stopRain();
  }

  setVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
