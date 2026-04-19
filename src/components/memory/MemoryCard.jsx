import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MemoryCard({ emoji, name = '', isFlipped, isMatched, disabled, onClick }) {
  const faceUp = isFlipped || isMatched;
  const ariaLabel = faceUp && name ? `${name}, ${emoji}` : 'Hidden card—tap to flip';

  const canInteract = !disabled && !isMatched;

  return (
    <motion.button
      type="button"
      disabled={disabled || isMatched}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={
        canInteract
          ? {
              scale: 1.05,
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 22 },
            }
          : undefined
      }
      whileTap={canInteract ? { scale: 0.97 } : undefined}
      className={cn(
        'group relative aspect-square w-full rounded-3xl outline-none',
        'shadow-[0_8px_0_rgb(167,139,250,0.35),0_12px_24px_-8px_rgba(139,92,246,0.45)]',
        'transition-shadow duration-300 ease-out',
        canInteract &&
          'hover:shadow-[0_12px_0_rgb(167,139,250,0.4),0_20px_32px_-6px_rgba(236,72,153,0.35)]',
        'focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50/80',
        isMatched &&
          'shadow-[0_6px_0_rgb(52,211,153,0.5),0_10px_24px_-6px_rgba(16,185,129,0.45)] ring-4 ring-emerald-300/90'
      )}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: faceUp ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
      >
        {/* Front (hidden side — ? + star) */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-3xl border-[3px] border-white/90 p-2',
            'bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400',
            'shadow-inner [backface-visibility:hidden]',
            'sm:gap-1.5 sm:p-3'
          )}
        >
          <Star
            className="h-5 w-5 fill-amber-200 text-amber-100 drop-shadow-md sm:h-6 sm:w-6"
            strokeWidth={1.5}
            aria-hidden
          />
          <span
            className="select-none text-3xl font-black tabular-nums text-white drop-shadow-sm sm:text-4xl"
            aria-hidden
          >
            ?
          </span>
        </div>

        {/* Back (face-up — emoji + name) */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-3xl border-[3px] border-white p-2 text-center',
            'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
            'shadow-inner [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'sm:gap-2 sm:p-3',
            isMatched && 'from-emerald-50 via-teal-50 to-cyan-50'
          )}
        >
          <span
            className="text-3xl leading-none drop-shadow-sm sm:text-4xl md:text-[2.75rem]"
            role="img"
            aria-hidden
          >
            {emoji}
          </span>
          {name ? (
            <span
              className={cn(
                'line-clamp-2 w-full px-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide text-violet-900/85',
                'sm:text-xs md:text-sm',
                isMatched && 'text-emerald-900/90'
              )}
            >
              {name}
            </span>
          ) : null}
        </div>
      </motion.div>
    </motion.button>
  );
}
