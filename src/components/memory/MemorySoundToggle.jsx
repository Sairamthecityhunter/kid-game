import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Mute / unmute memory game sounds (persists via `useMemorySound`).
 *
 * @param {object} props
 * @param {boolean} props.muted
 * @param {() => void} props.onToggle
 */
export default function MemorySoundToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-sm font-bold shadow-sm transition-all',
        muted
          ? 'border-slate-300 bg-slate-100/90 text-slate-600 hover:bg-slate-200/80'
          : 'border-cyan-300 bg-white/95 text-cyan-900 ring-1 ring-cyan-200/70 hover:bg-cyan-50'
      )}
      aria-pressed={!muted}
      aria-label={muted ? 'Unmute game sounds' : 'Mute game sounds'}
    >
      {muted ? (
        <VolumeX className="h-5 w-5 shrink-0" aria-hidden />
      ) : (
        <Volume2 className="h-5 w-5 shrink-0" aria-hidden />
      )}
      <span className="hidden sm:inline">{muted ? 'Sound off' : 'Sound on'}</span>
    </button>
  );
}
