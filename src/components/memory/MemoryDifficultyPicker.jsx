import { useSearchParams } from 'react-router-dom';
import {
  MEMORY_DIFFICULTY_LABELS,
  MEMORY_DIFFICULTY_ORDER,
  MEMORY_DIFFICULTY_PAIR_COUNT,
} from '@/data/memoryDifficulty';
import { cn } from '@/lib/utils';

/**
 * Difficulty tabs — updates `?difficulty=` so pair count and layout update via URL.
 */
export default function MemoryDifficultyPicker({ currentDifficulty }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectDifficulty = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('difficulty', id);
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      className="flex w-full max-w-xl flex-col gap-2 sm:mx-auto"
      role="tablist"
      aria-label="Difficulty"
    >
      <p className="text-center text-xs font-bold uppercase tracking-wide text-slate-500">
        Difficulty
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {MEMORY_DIFFICULTY_ORDER.map((id) => {
          const selected = currentDifficulty === id;
          const pairs = MEMORY_DIFFICULTY_PAIR_COUNT[id];
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectDifficulty(id)}
              className={cn(
                'min-w-[5.5rem] flex-1 rounded-2xl border-2 px-3 py-2.5 text-sm font-bold shadow-sm transition-all sm:min-w-0 sm:flex-none sm:px-4 md:text-base',
                selected
                  ? 'border-amber-500 bg-white text-amber-950 ring-2 ring-amber-300/60'
                  : 'border-slate-200/90 bg-white/90 text-slate-700 hover:border-amber-300 hover:bg-amber-50/80'
              )}
            >
              <span className="block leading-tight">{MEMORY_DIFFICULTY_LABELS[id]}</span>
              <span className="mt-0.5 block text-[0.7rem] font-semibold text-slate-500 sm:text-xs">
                {pairs} pairs
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
