import { MEMORY_CATEGORY_IDS, type MemoryCategoryId } from '@/data/memoryCategoryDecks';
import type { PatternPad } from '@/lib/pattern/patternPads';

const PAD_NAMES = ['Cherry', 'Lime', 'Sunny', 'Ocean', 'Grape', 'Bubble'] as const;

function isMemoryCategory(id: string): id is MemoryCategoryId {
  return MEMORY_CATEGORY_IDS.includes(id as MemoryCategoryId);
}

/**
 * Six Simon pads per theme; colors shift by category so each theme feels distinct.
 */
export function getPatternPadsForTheme(categoryId: string): PatternPad[] {
  const idx = isMemoryCategory(categoryId) ? MEMORY_CATEGORY_IDS.indexOf(categoryId) : 0;
  const seed = idx >= 0 ? idx : 0;

  return PAD_NAMES.map((name, i) => {
    const h = (seed * 23 + i * 55) % 360;
    const borderH = (h + 8) % 360;
    return {
      id: i,
      name,
      baseClass: 'shadow-lg',
      litClass: 'ring-4 ring-white/90 brightness-110 scale-105',
      style: {
        backgroundColor: `hsl(${h} 72% 52%)`,
        borderColor: `hsl(${borderH} 58% 36%)`,
      },
    };
  });
}
