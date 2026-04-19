import {
  DEFAULT_MEMORY_CATEGORY_ID,
  getCategoryDeckItems,
} from '@/data/memoryCategoryDecks';
import {
  DEFAULT_MEMORY_DIFFICULTY_ID,
  getPairCountForDifficulty,
} from '@/data/memoryDifficulty';
import type { MemoryCard } from './types';

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildCategoryDeck(categoryId: string, difficulty: string): MemoryCard[] {
  const allItems = getCategoryDeckItems(categoryId);
  const requestedPairs = getPairCountForDifficulty(difficulty);
  const pairCount = Math.min(requestedPairs, allItems.length);
  const items = shuffle([...allItems]).slice(0, pairCount);
  const doubled = [...items, ...items];
  return shuffle(doubled).map((item, index) => ({
    id: `${item.id}-${index}-${Math.random().toString(36).slice(2, 9)}`,
    itemId: item.id,
    name: item.name,
    emoji: item.emoji,
    description: item.description,
    matched: false,
  }));
}

/**
 * Build a shuffled deck for a memory category (`animals`, `food`, `nature`, `school`)
 * and difficulty (`easy` | `medium` | `hard`).
 */
export function buildMemoryDeck(
  categoryId: string = DEFAULT_MEMORY_CATEGORY_ID,
  difficulty: string = DEFAULT_MEMORY_DIFFICULTY_ID
): MemoryCard[] {
  return buildCategoryDeck(categoryId, difficulty);
}

export function getMemoryTotalPairs(
  categoryId: string = DEFAULT_MEMORY_CATEGORY_ID,
  difficulty: string = DEFAULT_MEMORY_DIFFICULTY_ID
): number {
  const cap = getCategoryDeckItems(categoryId).length;
  return Math.min(getPairCountForDifficulty(difficulty), cap);
}

export { DEFAULT_MEMORY_CATEGORY_ID };
export { DEFAULT_MEMORY_DIFFICULTY_ID } from '@/data/memoryDifficulty';
