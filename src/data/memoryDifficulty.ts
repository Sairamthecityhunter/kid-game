export const MEMORY_DIFFICULTY_IDS = ['easy', 'medium', 'hard'] as const;
export type MemoryDifficultyId = (typeof MEMORY_DIFFICULTY_IDS)[number];

/** Distinct pairs per difficulty (each category must define at least this many items). */
export const MEMORY_DIFFICULTY_PAIR_COUNT: Record<MemoryDifficultyId, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

export const DEFAULT_MEMORY_DIFFICULTY_ID: MemoryDifficultyId = 'medium';

export const MEMORY_DIFFICULTY_LABELS: Record<MemoryDifficultyId, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const MEMORY_DIFFICULTY_ORDER: MemoryDifficultyId[] = [
  'easy',
  'medium',
  'hard',
];

export function isValidMemoryDifficulty(id: string): id is MemoryDifficultyId {
  return MEMORY_DIFFICULTY_IDS.includes(id as MemoryDifficultyId);
}

export function getPairCountForDifficulty(difficulty: string): number {
  if (isValidMemoryDifficulty(difficulty)) {
    return MEMORY_DIFFICULTY_PAIR_COUNT[difficulty];
  }
  return MEMORY_DIFFICULTY_PAIR_COUNT[DEFAULT_MEMORY_DIFFICULTY_ID];
}
