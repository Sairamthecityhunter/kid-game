import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildMemoryDeck, getMemoryTotalPairs } from './deck';
import type { MemoryCard, MemoryCardId } from './types';

/** Time to show a non-matching pair before flipping back (ms). */
export const MISMATCH_FLIP_DELAY_MS = 1000;

/** Optional hooks for UI/sound; kept out of core game logic. */
export interface MemoryGameSoundHandlers {
  onFlip?: () => void;
  onMatch?: () => void;
  onWin?: () => void;
}

export interface UseMemoryGameResult {
  cards: MemoryCard[];
  /** Ids of cards currently face-up (0, 1, or 2). */
  flippedIds: MemoryCardId[];
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  won: boolean;
  /** True while two cards are face-up and we are waiting to flip them back. */
  isCheckingMismatch: boolean;
  flipCard: (cardId: MemoryCardId) => void;
  restart: () => void;
}

/**
 * Memory game rules:
 * - Grid of shuffled pairs; click flips a card.
 * - At most two cards face-up; third clicks ignored while checking.
 * - Match → stay matched; mismatch → flip back after {@link MISMATCH_FLIP_DELAY_MS}.
 * - Moves increment when the second card of a turn is revealed.
 *
 * Changing `categoryId` or `difficulty` rebuilds and shuffles the deck.
 */
export function useMemoryGame(
  categoryId: string,
  difficulty: string,
  soundHandlers?: MemoryGameSoundHandlers
): UseMemoryGameResult {
  const [cards, setCards] = useState<MemoryCard[]>(() =>
    buildMemoryDeck(categoryId, difficulty)
  );
  const [flippedIds, setFlippedIds] = useState<MemoryCardId[]>([]);
  const [moves, setMoves] = useState(0);
  const [isCheckingMismatch, setIsCheckingMismatch] = useState(false);
  const [won, setWon] = useState(false);

  const mismatchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundHandlersRef = useRef<MemoryGameSoundHandlers | undefined>(soundHandlers);
  soundHandlersRef.current = soundHandlers;
  const winSoundPlayedRef = useRef(false);

  const totalPairs = useMemo(
    () => getMemoryTotalPairs(categoryId, difficulty),
    [categoryId, difficulty]
  );
  const matchedPairs = useMemo(
    () => cards.filter((c) => c.matched).length / 2,
    [cards]
  );

  const clearMismatchTimeout = useCallback(() => {
    if (mismatchTimeoutRef.current !== null) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearMismatchTimeout();
    setCards(buildMemoryDeck(categoryId, difficulty));
    setFlippedIds([]);
    setMoves(0);
    setIsCheckingMismatch(false);
    setWon(false);
  }, [categoryId, difficulty, clearMismatchTimeout]);

  useEffect(() => {
    return () => clearMismatchTimeout();
  }, [clearMismatchTimeout]);

  useEffect(() => {
    if (matchedPairs >= totalPairs && totalPairs > 0) {
      setWon(true);
    }
  }, [matchedPairs, totalPairs, categoryId, difficulty]);

  useEffect(() => {
    if (won && !winSoundPlayedRef.current) {
      winSoundPlayedRef.current = true;
      soundHandlersRef.current?.onWin?.();
    }
    if (!won) {
      winSoundPlayedRef.current = false;
    }
  }, [won]);

  const restart = useCallback(() => {
    clearMismatchTimeout();
    setCards(buildMemoryDeck(categoryId, difficulty));
    setFlippedIds([]);
    setMoves(0);
    setIsCheckingMismatch(false);
    setWon(false);
  }, [categoryId, difficulty, clearMismatchTimeout]);

  const flipCard = useCallback(
    (cardId: MemoryCardId) => {
      if (isCheckingMismatch) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.matched || won) return;
      if (flippedIds.includes(cardId)) return;

      if (flippedIds.length === 0) {
        soundHandlersRef.current?.onFlip?.();
        setFlippedIds([cardId]);
        return;
      }

      if (flippedIds.length === 1) {
        const firstId = flippedIds[0];
        if (firstId === cardId) return;

        const first = cards.find((c) => c.id === firstId);
        if (!first) return;

        soundHandlersRef.current?.onFlip?.();
        setFlippedIds([firstId, cardId]);
        setMoves((m) => m + 1);

        if (first.itemId === card.itemId) {
          soundHandlersRef.current?.onMatch?.();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === cardId ? { ...c, matched: true } : c
            )
          );
          setFlippedIds([]);
        } else {
          setIsCheckingMismatch(true);
          clearMismatchTimeout();
          mismatchTimeoutRef.current = setTimeout(() => {
            setFlippedIds([]);
            setIsCheckingMismatch(false);
            mismatchTimeoutRef.current = null;
          }, MISMATCH_FLIP_DELAY_MS);
        }
      }
    },
    [cards, flippedIds, isCheckingMismatch, won, clearMismatchTimeout]
  );

  return {
    cards,
    flippedIds,
    moves,
    matchedPairs,
    totalPairs,
    won,
    isCheckingMismatch,
    flipCard,
    restart,
  };
}
