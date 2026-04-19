import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

/**
 * @param {object} props
 * @param {number} props.moves
 * @param {number | null} props.bestMoves — lowest moves for this category + difficulty (localStorage)
 * @param {number} props.matchedPairs
 * @param {number} props.totalPairs
 * @param {() => void} props.onRestart
 */
export default function GameStats({ moves, bestMoves, matchedPairs, totalPairs, onRestart }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-white/70 px-4 py-4 shadow-lg shadow-teal-100/80 backdrop-blur-sm md:justify-between md:px-6">
      <div className="flex flex-wrap justify-center gap-6 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Moves</p>
          <p className="text-2xl font-black text-teal-700">{moves}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best</p>
          <p className="text-2xl font-black text-violet-700" title="Lowest moves for this category and difficulty">
            {bestMoves == null ? '—' : bestMoves}
          </p>
          <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
            {bestMoves == null ? 'No record yet' : 'Lowest moves'}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Pairs</p>
          <p className="text-2xl font-black text-amber-600">
            {matchedPairs} / {totalPairs}
          </p>
        </div>
      </div>
      <Button
        type="button"
        onClick={onRestart}
        className="h-12 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-6 font-bold shadow-md hover:from-teal-600 hover:to-cyan-700"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Restart
      </Button>
    </div>
  );
}
