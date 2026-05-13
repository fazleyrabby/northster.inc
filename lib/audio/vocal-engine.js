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
    this.masterGain.gain.value = 0;

    this.masterFilter = this.ctx.createBiquadFilter();
    this.masterFilter.type = 'lowpass';
    this.masterFilter.frequency.value = 4000;

    this.masterGain.connect(this.masterFilter);
    this.masterFilter.connect(this.ctx.destination);

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
      // Archive night — warm, formant hum, filtered
      this.masterFilter.frequency.setTargetAtTime(4000, now, 2);
      this.layers.hum.layerGain.gain.setTargetAtTime(0.03, now, 2);
      this.layers.signal.layerGain.gain.setTargetAtTime(0.015, now, 2);
      this.layers.air.layerGain.gain.setTargetAtTime(0.005, now, 2);
      this._silenceFutureLayers(now);
    } else if (mode === 'day') {
      // Archive day — same tone, slightly brighter air
      this.masterFilter.frequency.setTargetAtTime(4000, now, 2);
      this.layers.hum.layerGain.gain.setTargetAtTime(0.015, now, 2);
      this.layers.signal.layerGain.gain.setTargetAtTime(0.008, now, 2);
      this.layers.air.layerGain.gain.setTargetAtTime(0.012, now, 2);
      this._silenceFutureLayers(now);
    } else if (mode === 'future') {
      // Future era — post-digital presence.
      // Archive layers dissolve to near-zero.
      // Four new synthesis layers replace them:
      //   sub:       40Hz sine — felt, not heard. Chamber mass.
      //   resonance: 432Hz pure sine — crystalline, no drift.
      //   beat:      434Hz pure sine — 2Hz beating with resonance = room depth.
      //   carrier:   10–16kHz filtered noise — distant signal shimmer.
      // No LFO on any layer. The future does not waver.
      this.masterFilter.frequency.setTargetAtTime(14000, now, 4);
      this.layers.hum.layerGain.gain.setTargetAtTime(0.002, now, 5);
      this.layers.signal.layerGain.gain.setTargetAtTime(0.001, now, 5);
      this.layers.air.layerGain.gain.setTargetAtTime(0.0005, now, 5);
      if (!this.layers.futureSub) this._buildFutureLayers();
      const t = now + 1; // slight onset delay — future arrives, not slams
      this.layers.futureSub.layerGain.gain.setTargetAtTime(0.012, t, 3.5);
      this.layers.futureResonance.layerGain.gain.setTargetAtTime(0.007, t, 3.5);
      this.layers.futureBeat.layerGain.gain.setTargetAtTime(0.005, t, 4.0);
      this.layers.futureCarrier.layerGain.gain.setTargetAtTime(0.003, t, 4.5);
    }
  }

  _silenceFutureLayers(now) {
    if (this.layers.futureSub)       this.layers.futureSub.layerGain.gain.setTargetAtTime(0, now, 3);
    if (this.layers.futureResonance) this.layers.futureResonance.layerGain.gain.setTargetAtTime(0, now, 3);
    if (this.layers.futureBeat)      this.layers.futureBeat.layerGain.gain.setTargetAtTime(0, now, 3);
    if (this.layers.futureCarrier)   this.layers.futureCarrier.layerGain.gain.setTargetAtTime(0, now, 3);
  }

  _buildFutureLayers() {
    // Sub-harmonic presence — 40Hz pure sine, no drift
    // Felt as a chest-cavity weight rather than heard
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 40;
    const subGain = this.ctx.createGain();
    subGain.gain.value = 0;
    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 80;
    sub.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.masterGain);
    sub.start();
    this.layers.futureSub = { osc: sub, layerGain: subGain };

    // Crystalline resonance — 432Hz pure sine, no LFO
    // Clean, still, glass-like
    const res = this.ctx.createOscillator();
    res.type = 'sine';
    res.frequency.value = 432;
    const resGain = this.ctx.createGain();
    resGain.gain.value = 0;
    const resFilter = this.ctx.createBiquadFilter();
    resFilter.type = 'peaking';
    resFilter.frequency.value = 432;
    resFilter.Q.value = 18;
    resFilter.gain.value = 6;
    res.connect(resFilter);
    resFilter.connect(resGain);
    resGain.connect(this.masterGain);
    res.start();
    this.layers.futureResonance = { osc: res, layerGain: resGain };

    // Beat frequency — 434Hz creates 2Hz slow beating with 432Hz
    // Gives a sense of vast room resonance, like being inside a titanium chamber
    const beat = this.ctx.createOscillator();
    beat.type = 'sine';
    beat.frequency.value = 434;
    const beatGain = this.ctx.createGain();
    beatGain.gain.value = 0;
    beat.connect(beatGain);
    beatGain.connect(this.masterGain);
    beat.start();
    this.layers.futureBeat = { osc: beat, layerGain: beatGain };

    // High carrier shimmer — filtered noise at 10–14kHz
    // Like distant signal carriers through void glass
    const bufSize = 2 * this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const carrier = this.ctx.createBufferSource();
    carrier.buffer = buf;
    carrier.loop = true;
    const carrierGain = this.ctx.createGain();
    carrierGain.gain.value = 0;
    const carrierFilter = this.ctx.createBiquadFilter();
    carrierFilter.type = 'bandpass';
    carrierFilter.frequency.value = 11000;
    carrierFilter.Q.value = 0.8;
    carrier.connect(carrierFilter);
    carrierFilter.connect(carrierGain);
    carrierGain.connect(this.masterGain);
    carrier.start();
    this.layers.futureCarrier = { source: carrier, layerGain: carrierGain };
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
