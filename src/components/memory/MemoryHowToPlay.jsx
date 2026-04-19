import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    emoji: '👆',
    title: 'Tap to flip',
    text: 'Touch a card to peek at the picture hiding on the other side.',
    borderClass: 'border-cyan-200/90',
    blobClass: 'from-cyan-300/50 to-sky-400/40',
    badgeClass: 'from-cyan-400 to-blue-500',
  },
  {
    emoji: '🤝',
    title: 'Find a match',
    text: 'Pick two that look the same. Match? They stay! No match? They flip back—remember what you saw!',
    borderClass: 'border-fuchsia-200/90',
    blobClass: 'from-fuchsia-300/45 to-pink-400/35',
    badgeClass: 'from-fuchsia-500 to-pink-500',
  },
  {
    emoji: '🏆',
    title: 'Win the round',
    text: 'Match every pair to clear the board. Try to use as few moves as you can!',
    borderClass: 'border-amber-200/90',
    blobClass: 'from-amber-300/50 to-orange-400/40',
    badgeClass: 'from-amber-400 to-orange-500',
  },
];

/**
 * Kid-friendly “How to play” steps as colorful instruction cards.
 *
 * @param {object} props
 * @param {'full' | 'compact'} [props.variant]
 * @param {string} [props.className]
 */
export default function MemoryHowToPlay({ variant = 'full', className }) {
  const compact = variant === 'compact';

  return (
    <section
      id={compact ? undefined : 'how-to-play'}
      className={cn(compact ? '' : 'scroll-mt-24 px-4 py-16 md:py-20', className)}
      aria-labelledby="memory-how-to-play-heading"
    >
      <div className={cn(!compact && 'mx-auto max-w-6xl')}>
        <motion.h2
          id="memory-how-to-play-heading"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'text-center font-black text-slate-800',
            compact ? 'text-lg sm:text-xl' : 'text-3xl md:text-4xl'
          )}
        >
          <span className="mr-2 inline-block" aria-hidden>
            📖
          </span>
          How to play
        </motion.h2>
        {!compact && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-2 max-w-lg text-center text-base text-slate-600 md:text-lg"
          >
            Super simple—flip, remember, and match!
          </motion.p>
        )}

        <div
          className={cn(
            'mt-6 grid gap-4',
            compact ? 'sm:grid-cols-3 sm:gap-3' : 'md:mt-10 md:grid-cols-3 md:gap-6'
          )}
        >
          {STEPS.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: compact ? i * 0.05 : i * 0.08 }}
              className={cn(
                'relative overflow-hidden rounded-3xl border-2 bg-white/90 shadow-lg backdrop-blur-sm',
                step.borderClass,
                compact ? 'p-4 sm:p-4' : 'p-6 md:p-7'
              )}
            >
              <div
                className={cn(
                  'pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-60 blur-2xl',
                  step.blobClass
                )}
                aria-hidden
              />
              <div className="relative flex gap-3">
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md ring-2 ring-white/70',
                    step.badgeClass,
                    !compact && 'h-14 w-14 text-3xl md:h-16 md:w-16 md:text-4xl'
                  )}
                  aria-hidden
                >
                  {step.emoji}
                </div>
                <div className="min-w-0 text-left">
                  <p
                    className={cn(
                      'font-black text-slate-800',
                      compact ? 'text-sm sm:text-base' : 'text-lg md:text-xl'
                    )}
                  >
                    <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">
                      {i + 1}
                    </span>
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'mt-1.5 font-medium leading-snug text-slate-600',
                      compact ? 'text-xs sm:text-sm' : 'text-sm md:text-base'
                    )}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
