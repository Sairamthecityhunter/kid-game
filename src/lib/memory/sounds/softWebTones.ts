import { MEMORY_SOUND_TONE_VOLUME } from './memorySoundConfig';

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedCtx) {
    const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    sharedCtx = new AC();
  }
  return sharedCtx;
}

function scheduleBeep(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  peakGain: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peakGain, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Short, soft “tick” when a card flips. */
export function playSoftFlipTone(volumeScale = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  const g = MEMORY_SOUND_TONE_VOLUME * volumeScale;
  scheduleBeep(ctx, 520, t, 0.045, g * 0.9);
}

/** Two-note chime for a successful match. */
export function playSoftMatchTone(volumeScale = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  const g = MEMORY_SOUND_TONE_VOLUME * volumeScale;
  scheduleBeep(ctx, 523.25, t, 0.08, g * 0.85);
  scheduleBeep(ctx, 659.25, t + 0.07, 0.1, g * 0.75);
}

/** Tiny upward arpeggio for winning. */
export function playSoftWinTone(volumeScale = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  const g = MEMORY_SOUND_TONE_VOLUME * volumeScale;
  const freqs = [392, 493.88, 587.33];
  freqs.forEach((f, i) => {
    scheduleBeep(ctx, f, t + i * 0.09, 0.14, g * (0.7 - i * 0.08));
  });
}
