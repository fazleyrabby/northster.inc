/**
 * NORTHSTER INC. — Temporal Transition SFX
 * Pure Web Audio synthesis. No files. Direction-aware.
 * Archive → Future: low rumble → upward sweep → crystalline apex → high shimmer
 * Future → Archive: high shimmer → downward sweep → sub thud → warm hum
 */

function buildCtx() {
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    return null;
  }
}

export function playTemporalTransition(direction) {
  if (typeof window === "undefined") return;
  const ctx = buildCtx();
  if (!ctx) return;

  const master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(ctx.destination);

  const now = ctx.currentTime;

  if (direction === "to-future") {
    // ── 1. Sub thud — physical jolt at departure ──────────────────
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.value = 38;
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    sub.connect(subGain);
    subGain.connect(master);
    sub.start(now);
    sub.stop(now + 1.0);

    // ── 2. Upward frequency sweep — time acceleration ─────────────
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.type = "sine";
    sweep.frequency.setValueAtTime(90, now + 0.15);
    sweep.frequency.exponentialRampToValueAtTime(3800, now + 1.55);
    sweepGain.gain.setValueAtTime(0, now + 0.15);
    sweepGain.gain.linearRampToValueAtTime(0.09, now + 0.35);
    sweepGain.gain.linearRampToValueAtTime(0.12, now + 1.1);
    sweepGain.gain.linearRampToValueAtTime(0, now + 1.6);
    sweep.connect(sweepGain);
    sweepGain.connect(master);
    sweep.start(now + 0.15);
    sweep.stop(now + 1.7);

    // ── 3. Apex crystalline ping — moment of arrival ──────────────
    const ping = ctx.createOscillator();
    const pingFilter = ctx.createBiquadFilter();
    const pingGain = ctx.createGain();
    ping.type = "sine";
    ping.frequency.value = 432;
    pingFilter.type = "peaking";
    pingFilter.frequency.value = 432;
    pingFilter.Q.value = 20;
    pingFilter.gain.value = 8;
    pingGain.gain.setValueAtTime(0, now + 1.4);
    pingGain.gain.linearRampToValueAtTime(0.14, now + 1.52);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    ping.connect(pingFilter);
    pingFilter.connect(pingGain);
    pingGain.connect(master);
    ping.start(now + 1.4);
    ping.stop(now + 3.3);

    // ── 4. High shimmer tail — future carrier presence ────────────
    const bufSize = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const shimmer = ctx.createBufferSource();
    shimmer.buffer = buf;
    const shimFilter = ctx.createBiquadFilter();
    const shimGain = ctx.createGain();
    shimFilter.type = "bandpass";
    shimFilter.frequency.value = 9500;
    shimFilter.Q.value = 1.2;
    shimGain.gain.setValueAtTime(0, now + 1.5);
    shimGain.gain.linearRampToValueAtTime(0.06, now + 2.0);
    shimGain.gain.linearRampToValueAtTime(0, now + 3.5);
    shimmer.connect(shimFilter);
    shimFilter.connect(shimGain);
    shimGain.connect(master);
    shimmer.start(now + 1.5);

  } else {
    // ── 1. High shimmer onset — future dispersing ─────────────────
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const shimmer = ctx.createBufferSource();
    shimmer.buffer = buf;
    const shimFilter = ctx.createBiquadFilter();
    const shimGain = ctx.createGain();
    shimFilter.type = "bandpass";
    shimFilter.frequency.value = 9500;
    shimFilter.Q.value = 1.2;
    shimGain.gain.setValueAtTime(0.06, now);
    shimGain.gain.linearRampToValueAtTime(0, now + 0.9);
    shimmer.connect(shimFilter);
    shimFilter.connect(shimGain);
    shimGain.connect(master);
    shimmer.start(now);

    // ── 2. Downward sweep — deceleration into archive ─────────────
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.type = "sine";
    sweep.frequency.setValueAtTime(3600, now + 0.1);
    sweep.frequency.exponentialRampToValueAtTime(85, now + 1.55);
    sweepGain.gain.setValueAtTime(0, now + 0.1);
    sweepGain.gain.linearRampToValueAtTime(0.11, now + 0.4);
    sweepGain.gain.linearRampToValueAtTime(0.08, now + 1.3);
    sweepGain.gain.linearRampToValueAtTime(0, now + 1.65);
    sweep.connect(sweepGain);
    sweepGain.connect(master);
    sweep.start(now + 0.1);
    sweep.stop(now + 1.7);

    // ── 3. Sub land — weight of archive returning ─────────────────
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.value = 42;
    subGain.gain.setValueAtTime(0, now + 1.4);
    subGain.gain.linearRampToValueAtTime(0.15, now + 1.52);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    sub.connect(subGain);
    subGain.connect(master);
    sub.start(now + 1.4);
    sub.stop(now + 2.3);

    // ── 4. Warm noise tail — archive hum settling in ──────────────
    const wBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const wData = wBuf.getChannelData(0);
    for (let i = 0; i < wBuf.length; i++) wData[i] = Math.random() * 2 - 1;
    const warmth = ctx.createBufferSource();
    warmth.buffer = wBuf;
    const warmFilter = ctx.createBiquadFilter();
    const warmGain = ctx.createGain();
    warmFilter.type = "bandpass";
    warmFilter.frequency.value = 320;
    warmFilter.Q.value = 0.6;
    warmGain.gain.setValueAtTime(0, now + 1.6);
    warmGain.gain.linearRampToValueAtTime(0.05, now + 2.2);
    warmGain.gain.linearRampToValueAtTime(0, now + 3.5);
    warmth.connect(warmFilter);
    warmFilter.connect(warmGain);
    warmGain.connect(master);
    warmth.start(now + 1.6);
  }

  // Auto-close context after transition ends
  setTimeout(() => ctx.close(), 4000);
}
