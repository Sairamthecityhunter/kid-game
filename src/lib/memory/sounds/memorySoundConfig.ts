/**
 * Optional custom sounds for the memory game.
 *
 * Add short, normalized audio files (MP3 or OGG) here:
 *
 *   public/sounds/memory/flip.mp3   — soft card flip / tap
 *   public/sounds/memory/match.mp3  — gentle “ding” for a correct pair
 *   public/sounds/memory/win.mp3    — short celebratory fanfare
 *
 * If a file is missing or fails to load, the game uses very quiet built-in
 * Web Audio tones instead (see `softWebTones.ts`).
 */
export const MEMORY_SOUND_FILES = {
  flip: '/sounds/memory/flip.mp3',
  match: '/sounds/memory/match.mp3',
  win: '/sounds/memory/win.mp3',
} as const;

export type MemorySoundKey = keyof typeof MEMORY_SOUND_FILES;

/** Master gain for file playback (0–1). Kept low for kid-friendly levels. */
export const MEMORY_SOUND_FILE_VOLUME = 0.2;

/** Master gain for Web Audio fallbacks (0–1); slightly lower than files. */
export const MEMORY_SOUND_TONE_VOLUME = 0.12;
