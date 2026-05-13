// Lightweight event emitter for R3F ↔ React era sync.
// R3F components can't use React context without causing full scene re-renders,
// so we publish era changes here and R3F hooks subscribe directly.
const listeners = new Set();

export const eraBus = {
  emit(era) {
    listeners.forEach(fn => fn(era));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
