import { useEffect, useRef, useState } from 'react';
import { getBestMoves, saveBestIfBetter } from './memoryBestScores';

/**
 * Tracks best (lowest) moves for the current category + difficulty in localStorage,
 * and updates when the player wins.
 */
export function useMemoryBestScore(
  categoryId: string,
  difficulty: string,
  won: boolean,
  moves: number
) {
  const [bestMoves, setBestMoves] = useState<number | null>(() =>
    getBestMoves(categoryId, difficulty)
  );
  const winHandledRef = useRef(false);

  useEffect(() => {
    setBestMoves(getBestMoves(categoryId, difficulty));
  }, [categoryId, difficulty]);

  useEffect(() => {
    if (won && !winHandledRef.current) {
      winHandledRef.current = true;
      const { bestMoves: next } = saveBestIfBetter(categoryId, difficulty, moves);
      setBestMoves(next);
    }
    if (!won) {
      winHandledRef.current = false;
    }
  }, [won, moves, categoryId, difficulty]);

  return bestMoves;
}
