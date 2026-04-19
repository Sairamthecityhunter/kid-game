import type { MemoryCardItem } from '@/data/memoryCardItems';
import {
  DEFAULT_WORD_SCRAMBLE_CATEGORY_ID,
  DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID,
  getWordScrambleWords,
} from '@/data/wordScrambleData';
import { scrambleLetters } from './scrambleWord';

export type ScrambleRound = {
  item: MemoryCardItem;
  scrambled: string;
};

function randomIndex(max: number, avoid?: number): number {
  if (max <= 1) return 0;
  let idx = Math.floor(Math.random() * max);
  let guard = 0;
  while (idx === avoid && guard++ < 32) {
    idx = Math.floor(Math.random() * max);
  }
  return idx;
}

export function pickScrambleRound(
  categoryId: string,
  subcategoryId: string,
  lastItemId?: string
): ScrambleRound {
  const cat = categoryId || DEFAULT_WORD_SCRAMBLE_CATEGORY_ID;
  const sub = subcategoryId || DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID;
  const items = getWordScrambleWords(cat, sub);
  const fallback = getWordScrambleWords(
    DEFAULT_WORD_SCRAMBLE_CATEGORY_ID,
    DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID
  );
  const pool = items.length > 0 ? items : fallback;
  const lastIdx = lastItemId ? pool.findIndex((i) => i.id === lastItemId) : -1;
  const idx = randomIndex(pool.length, lastIdx >= 0 ? lastIdx : undefined);
  const item = pool[idx];
  return {
    item,
    scrambled: scrambleLetters(item.name),
  };
}
