/** Stable id for a card instance in the grid (not the pair identity). */
export type MemoryCardId = string;

/** Id shared by the two tiles in a pair (matches catalog `MemoryCardItem.id` or a theme key). */
export type MemoryItemId = string;

/** One tile on the board. */
export interface MemoryCard {
  id: MemoryCardId;
  itemId: MemoryItemId;
  name: string;
  emoji: string;
  description: string;
  matched: boolean;
}
