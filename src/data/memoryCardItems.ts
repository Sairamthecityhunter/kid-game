/**
 * Shared shape for memory card faces. Deck contents live in `memoryCategoryDecks.ts`.
 */

export interface MemoryCardItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
}
