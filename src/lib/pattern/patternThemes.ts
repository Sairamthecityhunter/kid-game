import type { PatternPad } from '@/lib/pattern/patternPads';

const PAD_NAMES = ['Cherry', 'Lime', 'Sunny', 'Ocean', 'Grape', 'Bubble'] as const;

export const PATTERN_COLOR_THEMES = [
  { id: 'aurora', label: 'Aurora', seed: 0 },
  { id: 'sunset', label: 'Sunset', seed: 7 },
  { id: 'ocean', label: 'Ocean', seed: 14 },
  { id: 'meadow', label: 'Meadow', seed: 21 },
  { id: 'berry', label: 'Berry', seed: 28 },
  { id: 'citrus', label: 'Citrus', seed: 35 },
  { id: 'slate', label: 'Slate', seed: 100 },
  { id: 'carnival', label: 'Carnival', seed: 137 },
] as const;

export type PatternColorThemeId = (typeof PATTERN_COLOR_THEMES)[number]['id'];

export const DEFAULT_PATTERN_COLOR_THEME_ID: PatternColorThemeId = 'aurora';

export const PATTERN_COLOR_THEME_IDS: PatternColorThemeId[] = PATTERN_COLOR_THEMES.map((t) => t.id);

export function isValidPatternColorThemeId(id: string): id is PatternColorThemeId {
  return (PATTERN_COLOR_THEME_IDS as readonly string[]).includes(id);
}

function seedForTheme(id: PatternColorThemeId): number {
  return PATTERN_COLOR_THEMES.find((t) => t.id === id)?.seed ?? 0;
}

/**
 * Six Simon pads per theme; colors shift by palette so each theme feels distinct.
 */
export function getPatternPadsForTheme(themeId: string): PatternPad[] {
  const id = isValidPatternColorThemeId(themeId) ? themeId : DEFAULT_PATTERN_COLOR_THEME_ID;
  const seed = seedForTheme(id);

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

/** Stable mapping from legacy ?category= URLs to a color theme. */
export function patternColorThemeFromLegacyCategory(categoryId: string): PatternColorThemeId {
  let h = 0;
  for (let i = 0; i < categoryId.length; i++) h = (h * 31 + categoryId.charCodeAt(i)) >>> 0;
  const idx = h % PATTERN_COLOR_THEMES.length;
  return PATTERN_COLOR_THEMES[idx].id;
}

export function patternColorThemeLabel(id: string): string {
  const t = PATTERN_COLOR_THEMES.find((x) => x.id === id);
  return t?.label ?? id;
}
