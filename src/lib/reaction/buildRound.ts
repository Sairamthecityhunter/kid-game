import type { ReactionTarget } from '@/data/reactionTargets';
import { getReactionTargetsForCategory } from '@/data/reactionTargets';
import { DEFAULT_MEMORY_CATEGORY_ID } from '@/data/memoryCategoryDecks';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export type ReactionRound = {
  items: ReactionTarget[];
  targetId: string;
};

/**
 * @param difficulty Rises during play; more items and tighter timing elsewhere.
 */
export function itemCountForDifficulty(difficulty: number): number {
  const n = Math.round(2 + difficulty * 0.85);
  return Math.min(12, Math.max(3, n));
}

/**
 * @param categoryId Same ids as memory / word scramble (e.g. animals, vehicles).
 */
export function buildReactionRound(
  difficulty: number,
  categoryId: string = DEFAULT_MEMORY_CATEGORY_ID
): ReactionRound {
  const count = itemCountForDifficulty(difficulty);
  const fullPool = getReactionTargetsForCategory(categoryId);
  const pool = shuffle([...fullPool]);
  const safePool = pool.length > 0 ? pool : shuffle([...getReactionTargetsForCategory(DEFAULT_MEMORY_CATEGORY_ID)]);
  const items = safePool.slice(0, Math.min(count, safePool.length));
  const target = items[Math.floor(Math.random() * items.length)];
  return { items, targetId: target.id };
}

export function timeLimitMsForDifficulty(difficulty: number): number {
  return Math.max(1100, 5200 - difficulty * 220);
}
