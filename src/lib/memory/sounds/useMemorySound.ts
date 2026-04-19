import { useCallback, useMemo, useRef, useState } from 'react';
import { createMemorySoundPlayer } from './memorySoundPlayer';

const MUTE_STORAGE_KEY = 'memory-game-sound-muted';

function readInitialMuted(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(MUTE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Mute preference (persisted) + sound actions for the memory game.
 * Playback respects mute; files in `public/sounds/memory/` override soft tones when present.
 */
export function useMemorySound() {
  const [muted, setMuted] = useState(readInitialMuted);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const player = useMemo(
    () =>
      createMemorySoundPlayer({
        isMuted: () => mutedRef.current,
      }),
    []
  );

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem(MUTE_STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return {
    muted,
    toggleMuted,
    playFlip: player.playFlip,
    playMatch: player.playMatch,
    playWin: player.playWin,
  };
}
