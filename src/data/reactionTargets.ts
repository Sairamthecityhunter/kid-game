import { DEFAULT_MEMORY_CATEGORY_ID, getCategoryDeckItems } from '@/data/memoryCategoryDecks';

export interface ReactionTarget {
  id: string;
  emoji: string;
  name: string;
}

/** Tap targets for the reaction game, built from the same decks as memory (per category). */
export function getReactionTargetsForCategory(categoryId: string): ReactionTarget[] {
  return getCategoryDeckItems(categoryId).map((item) => ({
    id: item.id,
    emoji: item.emoji,
    name: item.name,
  }));
}

/** @deprecated Use getReactionTargetsForCategory with a category id; default pool for tests. */
export const REACTION_TARGETS: ReactionTarget[] =
  getReactionTargetsForCategory(DEFAULT_MEMORY_CATEGORY_ID);
