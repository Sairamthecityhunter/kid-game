import {
  MEMORY_SOUND_FILES,
  MEMORY_SOUND_FILE_VOLUME,
  type MemorySoundKey,
} from './memorySoundConfig';
import { playSoftFlipTone, playSoftMatchTone, playSoftWinTone } from './softWebTones';

export interface MemorySoundPlayerOptions {
  /** When true, all playback is skipped. */
  isMuted: () => boolean;
}

const fallbackFor: Record<MemorySoundKey, () => void> = {
  flip: () => playSoftFlipTone(),
  match: () => playSoftMatchTone(),
  win: () => playSoftWinTone(),
};

/**
 * Plays optional files from `public/sounds/memory/`; on failure, uses soft Web Audio tones.
 */
export function createMemorySoundPlayer(options: MemorySoundPlayerOptions) {
  const cache = new Map<MemorySoundKey, HTMLAudioElement>();
  const broken = new Set<MemorySoundKey>();

  function getAudio(key: MemorySoundKey): HTMLAudioElement {
    let el = cache.get(key);
    if (!el) {
      el = new Audio(MEMORY_SOUND_FILES[key]);
      el.preload = 'auto';
      el.volume = MEMORY_SOUND_FILE_VOLUME;
      el.addEventListener('error', () => {
        broken.add(key);
      });
      cache.set(key, el);
    }
    return el;
  }

  function play(key: MemorySoundKey) {
    if (options.isMuted()) return;
    if (broken.has(key)) {
      fallbackFor[key]();
      return;
    }
    const audio = getAudio(key);
    audio.volume = MEMORY_SOUND_FILE_VOLUME;
    audio.currentTime = 0;
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => {
        broken.add(key);
        fallbackFor[key]();
      });
    }
  }

  return {
    playFlip: () => play('flip'),
    playMatch: () => play('match'),
    playWin: () => play('win'),
  };
}

export type MemorySoundPlayer = ReturnType<typeof createMemorySoundPlayer>;
