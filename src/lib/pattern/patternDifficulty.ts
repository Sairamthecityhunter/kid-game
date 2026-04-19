import {
  DEFAULT_MEMORY_DIFFICULTY_ID,
  isValidMemoryDifficulty,
  type MemoryDifficultyId,
} from '@/data/memoryDifficulty';

/** How many color pads are in play (like “more tiles” on harder modes). */
export const PATTERN_PAD_COUNT_BY_DIFFICULTY: Record<MemoryDifficultyId, number> = {
  easy: 3,
  medium: 4,
  hard: 6,
};

/**
 * Timing multiplier for the light sequence (higher = slower, easier to follow).
 */
export const PATTERN_PLAYBACK_MULTIPLIER: Record<MemoryDifficultyId, number> = {
  easy: 1.32,
  medium: 1,
  hard: 0.76,
};

export function patternPadCountForDifficulty(difficulty: string): number {
  if (isValidMemoryDifficulty(difficulty)) {
    return PATTERN_PAD_COUNT_BY_DIFFICULTY[difficulty];
  }
  return PATTERN_PAD_COUNT_BY_DIFFICULTY[DEFAULT_MEMORY_DIFFICULTY_ID];
}

export function patternPlaybackMultiplierForDifficulty(difficulty: string): number {
  if (isValidMemoryDifficulty(difficulty)) {
    return PATTERN_PLAYBACK_MULTIPLIER[difficulty];
  }
  return PATTERN_PLAYBACK_MULTIPLIER[DEFAULT_MEMORY_DIFFICULTY_ID];
}
