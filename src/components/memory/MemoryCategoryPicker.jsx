import { useSearchParams } from 'react-router-dom';
import { MEMORY_HOMEPAGE_CATEGORIES } from '@/data/memoryItems';
import { cn } from '@/lib/utils';

/**
 * Category tabs — updates `?category=` (and clears legacy `theme`) so the board resets via URL.
 */
export default function MemoryCategoryPicker({ currentCategory }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectCategory = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', id);
    next.delete('theme');
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Card category"
    >
      {MEMORY_HOMEPAGE_CATEGORIES.map((cat) => {
        const selected = currentCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => selectCategory(cat.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-2xl border-2 px-3 py-2 text-xs font-bold shadow-sm transition-all sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:text-base',
              selected
                ? 'border-fuchsia-500 bg-white text-fuchsia-900 ring-2 ring-fuchsia-300/60'
                : 'border-slate-200/90 bg-white/90 text-slate-700 hover:border-teal-300 hover:bg-teal-50/80'
            )}
          >
            <span className="text-lg leading-none" aria-hidden>
              {cat.emoji}
            </span>
            {cat.title}
          </button>
        );
      })}
    </div>
  );
}
