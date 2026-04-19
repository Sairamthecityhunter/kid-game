import { useSearchParams } from 'react-router-dom';
import { PATTERN_COLOR_THEMES, getPatternPadsForTheme } from '@/lib/pattern/patternThemes';
import { cn } from '@/lib/utils';

/**
 * Color-only palettes for Pattern memory — updates `?color=` and clears legacy `category` / `theme`.
 */
export default function PatternColorThemePicker({ currentColorTheme }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectTheme = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('color', id);
    next.delete('category');
    next.delete('theme');
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      className="mx-auto mt-2 flex max-w-5xl flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Color theme"
    >
      {PATTERN_COLOR_THEMES.map((theme) => {
        const selected = currentColorTheme === theme.id;
        const preview = getPatternPadsForTheme(theme.id).slice(0, 3);
        return (
          <button
            key={theme.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => selectTheme(theme.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-xs font-bold shadow-sm transition-all sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm',
              selected
                ? 'border-fuchsia-500 bg-white text-fuchsia-900 ring-2 ring-fuchsia-300/60'
                : 'border-slate-200/90 bg-white/90 text-slate-700 hover:border-teal-300 hover:bg-teal-50/80'
            )}
          >
            <span className="flex gap-0.5" aria-hidden>
              {preview.map((p) => (
                <span
                  key={p.id}
                  className="h-4 w-4 shrink-0 rounded-full border border-black/15"
                  style={{ backgroundColor: p.style.backgroundColor }}
                />
              ))}
            </span>
            {theme.label}
          </button>
        );
      })}
    </div>
  );
}
