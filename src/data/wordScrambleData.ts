import type { MemoryCardItem } from './memoryCardItems';
import { getCategoryDeckItems } from './memoryCategoryDecks';
import { MEMORY_HOMEPAGE_CATEGORIES } from './memoryItems';

export interface WordScrambleSubcategory {
  id: string;
  title: string;
  emoji: string;
  words: MemoryCardItem[];
}

export interface WordScrambleCategory {
  id: string;
  title: string;
  emoji: string;
  gradientClass: string;
  borderClass: string;
  subcategories: WordScrambleSubcategory[];
}

const SUB_EMOJIS = ['🔹', '🔸', '🔶'] as const;

function splitIntoSubs(categoryId: string, items: MemoryCardItem[]): WordScrambleSubcategory[] {
  if (items.length === 0) {
    return [
      {
        id: `${categoryId}-part-1`,
        title: 'Words',
        emoji: '✨',
        words: [],
      },
    ];
  }
  const groupCount = Math.min(3, items.length);
  const chunk = Math.ceil(items.length / groupCount);
  const subs: WordScrambleSubcategory[] = [];
  for (let i = 0; i < groupCount; i++) {
    const slice = items.slice(i * chunk, (i + 1) * chunk);
    if (slice.length === 0) break;
    subs.push({
      id: `${categoryId}-part-${i + 1}`,
      title: `Group ${i + 1}`,
      emoji: SUB_EMOJIS[i] ?? '✨',
      words: slice,
    });
  }
  return subs;
}

/** Word lists mirror each memory card deck (same categories as the memory game). */
export const WORD_SCRAMBLE_CATEGORIES: WordScrambleCategory[] = MEMORY_HOMEPAGE_CATEGORIES.map(
  (meta) => {
    const words = getCategoryDeckItems(meta.id);
    return {
      id: meta.id,
      title: meta.title,
      emoji: meta.emoji,
      gradientClass: meta.gradientClass,
      borderClass: meta.borderClass,
      subcategories: splitIntoSubs(meta.id, words),
    };
  }
);

export const WORD_SCRAMBLE_CATEGORY_IDS = WORD_SCRAMBLE_CATEGORIES.map((c) => c.id);

export const DEFAULT_WORD_SCRAMBLE_CATEGORY_ID = WORD_SCRAMBLE_CATEGORIES[0].id;
export const DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID =
  WORD_SCRAMBLE_CATEGORIES[0].subcategories[0].id;

/** Old URLs used `colors`; memory uses `colors-shapes`. */
const LEGACY_WORD_SCRAMBLE_CATEGORY_ALIASES: Record<string, string> = {
  colors: 'colors-shapes',
};

export function findWordScrambleCategory(categoryId: string): WordScrambleCategory | undefined {
  return WORD_SCRAMBLE_CATEGORIES.find((c) => c.id === categoryId);
}

export function getWordScrambleWords(categoryId: string, subcategoryId: string): MemoryCardItem[] {
  const cat = findWordScrambleCategory(categoryId);
  const sub = cat?.subcategories.find((s) => s.id === subcategoryId);
  return sub?.words ?? [];
}

export function isValidWordScrambleCategory(categoryId: string): boolean {
  return WORD_SCRAMBLE_CATEGORY_IDS.includes(categoryId);
}

export function isValidWordScrambleSubcategory(categoryId: string, subcategoryId: string): boolean {
  const cat = findWordScrambleCategory(categoryId);
  return !!cat?.subcategories.some((s) => s.id === subcategoryId);
}

/** If sub is missing or invalid, returns the first subcategory id for the category (or default). */
export function resolveWordScrambleSubcategory(
  categoryId: string,
  subcategoryId: string | null | undefined
): string {
  const cat = findWordScrambleCategory(categoryId);
  if (!cat) return DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID;
  if (subcategoryId && cat.subcategories.some((s) => s.id === subcategoryId)) {
    return subcategoryId;
  }
  return cat.subcategories[0]?.id ?? DEFAULT_WORD_SCRAMBLE_SUBCATEGORY_ID;
}

export function resolveWordScrambleCategory(categoryId: string | null | undefined): string {
  const raw = categoryId?.trim();
  const mapped = raw && LEGACY_WORD_SCRAMBLE_CATEGORY_ALIASES[raw];
  const candidate = mapped ?? raw;
  if (candidate && isValidWordScrambleCategory(candidate)) {
    return candidate;
  }
  return DEFAULT_WORD_SCRAMBLE_CATEGORY_ID;
}

/** All words in a parent category (every subcategory), for quiz / other games. */
export function getAllWordsInWordScrambleCategory(categoryId: string): MemoryCardItem[] {
  const cat = findWordScrambleCategory(categoryId);
  if (!cat) return [];
  return cat.subcategories.flatMap((s) => s.words);
}
