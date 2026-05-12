/**
 * NORTHSTER INC. — Vocal Infrastructure Synthesis Engine
 * Procedural environmental audio using Web Audio API and Formant Synthesis.
 * This simulates mechanical/electrical presence using organic vocal resonances.
 */

export class VocalEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.layers = {};
    this.initialized = false;
    this.volume = 1.0;
  }

  init() {
    if (this.initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0; // Start silent
    this.masterGain.connect(this.ctx.destination);
    
    // Low-pass filter for the entire master bus to keep it institutional and distant
    const masterFilter = this.ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.value = 4000;
    this.masterGain.connect(masterFilter);
    masterFilter.connect(this.ctx.destination);

    this.setupLayers();
    this.initialized = true;
  }

  setupLayers() {
    // 1. INFRASTRUCTURAL HUM (Vowel "U")
    // Deep, resonant resonance representing electrical transformers
    this.layers.hum = this.createVowelLayer({
      baseFreq: 55, // Low A/G# hum (60Hz is too clean)
      type: 'sawtooth',
      vowel: 'u',
      gain: 0.02 // Drastically reduced for subtlety
    });

    // 2. SIGNAL TEXTURE (Vowel "O")
    // Mid-range shifting texture representing data relays
    this.layers.signal = this.createVowelLayer({
      baseFreq: 110,
      type: 'sawtooth',
      vowel: 'o',
      gain: 0.01 // Drastically reduced
    });

    // 3. VENTILATION (Sibilance "Sh")
    // Filtered noise for air movement
    this.layers.air = this.createNoiseLayer({
      type: 'pink',
      low: 1500,
      high: 8000,
      gain: 0.01 // Drastically reduced
    });
  }

  createVowelLayer({ baseFreq, type, vowel, gain }) {
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = baseFreq;

    const layerGain = this.ctx.createGain();
    layerGain.gain.value = gain;

    // Formant Frequencies for male "U" and "O"
    const formants = {
      u: [300, 870, 2240],
      o: [450, 830, 2430]
    }[vowel];

    const filters = formants.map(freq => {
      const f = this.ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = freq;
      f.Q.value = 10;
      osc.connect(f);
      f.connect(layerGain);
      return f;
    });

    // Subtle drift in the oscillator to avoid static "robotic" tone
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.2; // Very slow drift
    lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    osc.start();
    layerGain.connect(this.masterGain);

    return { osc, filters, layerGain, lfo };
  }

  createNoiseLayer({ type, low, high, gain }) {
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Basic white/pink noise generation
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const layerGain = this.ctx.createGain();
    layerGain.gain.value = gain;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = (low + high) / 2;
    filter.Q.value = 0.5;

    source.connect(filter);
    filter.connect(layerGain);
    layerGain.connect(this.masterGain);

    source.start();
    return { source, filter, layerGain };
  }

  async setMode(mode) {
    if (!this.initialized) return;
    const now = this.ctx.currentTime;
    
    if (mode === 'night') {
      // Deeper, more resonant hum, more active signal
      this.layers.hum.layerGain.gain.setTargetAtTime(0.03, now, 2);
      this.layers.signal.layerGain.gain.setTargetAtTime(0.015, now, 2);
      this.layers.air.layerGain.gain.setTargetAtTime(0.005, now, 2);
    } else {
      // Day mode: More air, softer infrastructure
      this.layers.hum.layerGain.gain.setTargetAtTime(0.015, now, 2);
      this.layers.signal.layerGain.gain.setTargetAtTime(0.008, now, 2);
      this.layers.air.layerGain.gain.setTargetAtTime(0.012, now, 2);
    }
  }

  setVolume(value) {
    this.volume = value;
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setTargetAtTime(value, this.ctx.currentTime, 0.1);
  }

  fadeIn() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 1.5);
  }

  fadeOut() {
    if (!this.ctx) return;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 1.5);
  }
}

export const vocalEngine = typeof window !== 'undefined' ? new VocalEngine() : null;
