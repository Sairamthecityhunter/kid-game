import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {number} props.moves
 * @param {string} props.categoryLabel
 * @param {string} props.difficultyLabel
 * @param {() => void} props.onPlayAgain
 */
export default function WinModal({
  open,
  moves,
  categoryLabel,
  difficultyLabel,
  onPlayAgain,
}) {
  const statItems = [
    { label: 'Total moves', value: String(moves), emoji: '⭐', accent: 'from-amber-400 to-orange-500' },
    { label: 'Category', value: categoryLabel, emoji: '🃏', accent: 'from-teal-400 to-cyan-500' },
    { label: 'Difficulty', value: difficultyLabel, emoji: '🎯', accent: 'from-fuchsia-400 to-purple-500' },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="memory-win-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-violet-900/50 via-fuchsia-900/40 to-amber-900/45 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="memory-win-title"
          aria-describedby="memory-win-desc"
        >
          <motion.div
            role="presentation"
            initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="relative w-full max-w-md"
          >
            <div
              className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-amber-300 via-fuchsia-400 to-cyan-400 opacity-90 blur-sm"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-white/90 bg-gradient-to-b from-amber-50 via-white to-cyan-50/90 shadow-2xl ring-4 ring-amber-200/60">
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-yellow-300/50 to-orange-400/40 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-300/40 to-violet-300/35 blur-2xl"
                aria-hidden
              />

              <div className="relative px-6 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
                <div className="mb-2 flex justify-center gap-3">
                  <motion.span
                    className="text-3xl"
                    aria-hidden
                    animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🎉
                  </motion.span>
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 text-white shadow-lg ring-4 ring-white/80"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Trophy className="h-9 w-9 drop-shadow-md" strokeWidth={2.25} />
                  </motion.div>
                  <motion.span
                    className="text-3xl"
                    aria-hidden
                    animate={{ y: [0, -8, 0], rotate: [6, -6, 6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  >
                    ✨
                  </motion.span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-fuchsia-500" aria-hidden />
                  <h2
                    id="memory-win-title"
                    className="bg-gradient-to-r from-fuchsia-600 via-amber-600 to-teal-600 bg-clip-text text-center text-2xl font-black tracking-tight text-transparent sm:text-3xl"
                  >
                    Congratulations!
                  </h2>
                  <Sparkles className="h-5 w-5 text-amber-500" aria-hidden />
                </div>

                <p
                  id="memory-win-desc"
                  className="mt-3 text-center text-base font-semibold text-slate-600 sm:text-lg"
                >
                  You found every pair — superstar memory!
                </p>

                <motion.ul
                  className="mt-6 space-y-3"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
                    },
                  }}
                >
                  {statItems.map((item) => (
                    <motion.li
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0 },
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-2xl border-2 border-white/80 bg-white/75 px-4 py-3 shadow-md backdrop-blur-sm',
                        'ring-1 ring-slate-100/80'
                      )}
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <span
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg text-white shadow-inner',
                            item.accent
                          )}
                          aria-hidden
                        >
                          {item.emoji}
                        </span>
                        {item.label}
                      </span>
                      <span className="text-right text-base font-black text-slate-800 sm:text-lg">
                        {item.value}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-2 flex justify-center">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden
                  >
                    <PartyPopper className="h-8 w-8 text-fuchsia-400 opacity-80" />
                  </motion.div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    type="button"
                    onClick={onPlayAgain}
                    className="h-12 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-base font-black text-white shadow-lg ring-2 ring-white/50 transition-transform hover:scale-[1.02] active:scale-[0.98] sm:min-w-[11rem]"
                  >
                    Play Again
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-2xl border-2 border-fuchsia-300 bg-white/90 text-base font-black text-fuchsia-800 shadow-md hover:bg-fuchsia-50 sm:min-w-[11rem]"
                    asChild
                  >
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
