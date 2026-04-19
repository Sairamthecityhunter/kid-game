import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  WORD_SCRAMBLE_CATEGORIES,
  resolveWordScrambleCategory,
  resolveWordScrambleSubcategory,
} from '@/data/wordScrambleData';
import { pickScrambleRound } from '@/lib/wordscramble/pickWord';
import { answersMatch } from '@/lib/wordscramble/scrambleWord';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, RefreshCw, Shuffle } from 'lucide-react';

export default function WordScramblePage() {
  usePageSeo({
    title: 'Word Scramble — Kids Game',
    description:
      'Unscramble letters from every memory theme—animals, vehicles, alphabet, fast food, weather, and more. Pick a topic and group!',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory =
    searchParams.get('category') ?? searchParams.get('theme') ?? undefined;
  const rawSub =
    searchParams.get('sub') ?? searchParams.get('subcategory') ?? undefined;

  const category = resolveWordScrambleCategory(rawCategory);
  const subcategory = resolveWordScrambleSubcategory(category, rawSub);

  useEffect(() => {
    if (
      searchParams.get('category') !== category ||
      searchParams.get('sub') !== subcategory
    ) {
      const next = new URLSearchParams(searchParams);
      next.set('category', category);
      next.set('sub', subcategory);
      next.delete('theme');
      next.delete('subcategory');
      setSearchParams(next, { replace: true });
    }
  }, [category, subcategory, searchParams, setSearchParams]);

  const categoryMeta = useMemo(
    () => WORD_SCRAMBLE_CATEGORIES.find((c) => c.id === category),
    [category]
  );
  const subMeta = useMemo(
    () => categoryMeta?.subcategories.find((s) => s.id === subcategory),
    [categoryMeta, subcategory]
  );

  const [round, setRound] = useState(() => pickScrambleRound(category, subcategory));
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [wordsPlayed, setWordsPlayed] = useState(0);

  useEffect(() => {
    setRound(pickScrambleRound(category, subcategory));
    setGuess('');
    setFeedback(null);
    setScore(0);
    setWordsPlayed(0);
  }, [category, subcategory]);

  const loadNextWord = useCallback(() => {
    setRound((prev) => pickScrambleRound(category, subcategory, prev.item.id));
    setGuess('');
    setFeedback(null);
  }, [category, subcategory]);

  const syncUrl = (nextCat, nextSub) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', nextCat);
    next.set('sub', nextSub);
    next.delete('theme');
    next.delete('subcategory');
    setSearchParams(next, { replace: true });
  };

  const selectCategory = (id) => {
    const cat = WORD_SCRAMBLE_CATEGORIES.find((c) => c.id === id);
    const firstSub = cat?.subcategories[0]?.id ?? subcategory;
    syncUrl(id, firstSub);
  };

  const selectSubcategory = (id) => {
    syncUrl(category, id);
  };

  const handleCheck = (e) => {
    e?.preventDefault();
    if (!guess.trim()) return;

    const ok = answersMatch(guess, round.item.name);
    setFeedback(ok ? 'correct' : 'incorrect');
    setWordsPlayed((n) => n + 1);
    if (ok) {
      setScore((s) => s + 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-100 via-amber-50 to-cyan-100">
      <Navbar />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 md:max-w-2xl md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/85 px-4 py-2 text-sm font-bold text-violet-800 shadow-sm">
            <Shuffle className="h-4 w-4" aria-hidden />
            Word Scramble
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Unscramble the word
          </h1>
          <p className="mx-auto mt-2 max-w-md text-base font-medium text-slate-600">
            <span className="font-bold text-violet-700">{categoryMeta?.title ?? 'Pick'}</span>
            {' · '}
            <span className="font-bold text-fuchsia-700">{subMeta?.title ?? 'a topic'}</span>
          </p>

          <div className="mt-5">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">
              Category
            </p>
            <div
              className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Word category"
            >
              {WORD_SCRAMBLE_CATEGORIES.map((cat) => {
                const selected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectCategory(cat.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-2xl border-2 px-2.5 py-2 text-xs font-bold shadow-sm sm:px-3 sm:text-sm',
                      selected
                        ? cn('bg-white ring-2 ring-offset-1', cat.borderClass, 'ring-violet-300')
                        : 'border-slate-200/90 bg-white/90 text-slate-700 hover:border-amber-300',
                      selected && 'border-violet-500 text-violet-900'
                    )}
                  >
                    <span aria-hidden>{cat.emoji}</span>
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {categoryMeta ? (
            <div className="mt-4">
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">
                Subcategory
              </p>
              <div
                className="flex flex-wrap justify-center gap-2"
                role="tablist"
                aria-label="Word subcategory"
              >
                {categoryMeta.subcategories.map((sub) => {
                  const selected = subcategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => selectSubcategory(sub.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-2xl border-2 px-2.5 py-1.5 text-xs font-bold shadow-sm sm:text-sm',
                        selected
                          ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-950 ring-2 ring-fuchsia-200'
                          : 'border-slate-200/90 bg-white/85 text-slate-700 hover:border-fuchsia-200'
                      )}
                    >
                      <span aria-hidden>{sub.emoji}</span>
                      {sub.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="mt-8 rounded-[1.75rem] border-4 border-white/90 bg-white/90 p-6 shadow-xl shadow-violet-200/50 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-5xl md:text-6xl" aria-hidden>
              {round.item.emoji}
            </span>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Scrambled</p>
            <p
              className="break-all font-mono text-2xl font-black tracking-[0.2em] text-slate-800 sm:text-3xl md:text-4xl"
              aria-live="polite"
            >
              {round.scrambled.split('').join(' ')}
            </p>
          </div>

          <form onSubmit={handleCheck} className="mt-8 space-y-4">
            <label htmlFor="word-guess" className="sr-only">
              Your guess
            </label>
            <Input
              id="word-guess"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                if (feedback) setFeedback(null);
              }}
              placeholder="Type the word…"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              disabled={feedback === 'correct'}
              className="h-14 rounded-2xl border-2 border-slate-200 text-center text-lg font-semibold focus-visible:ring-violet-400"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                type="submit"
                disabled={!guess.trim() || feedback === 'correct'}
                className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 font-bold text-white shadow-md sm:flex-none sm:px-8"
              >
                <Check className="mr-2 h-5 w-5" />
                Check answer
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={loadNextWord}
                className="h-12 flex-1 rounded-2xl border-2 border-amber-300 bg-amber-50/80 font-bold text-amber-900 hover:bg-amber-100 sm:flex-none sm:px-8"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Next word
              </Button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                key={feedback}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                role="status"
                className={cn(
                  'mt-6 rounded-2xl border-2 px-4 py-4 text-center text-base font-bold',
                  feedback === 'correct'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : 'border-rose-300 bg-rose-50 text-rose-900'
                )}
              >
                {feedback === 'correct' ? (
                  <>
                    <span className="text-2xl" aria-hidden>
                      🌟
                    </span>
                    <p className="mt-1">That&apos;s right! Great job!</p>
                  </>
                ) : (
                  <>
                    <p>Not quite—the answer is:</p>
                    <p className="mt-2 text-lg font-black text-slate-800">{round.item.name}</p>
                  </>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-slate-50/90 px-4 py-4 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Score</p>
              <p className="text-2xl font-black text-violet-700">{score}</p>
              <p className="text-[0.65rem] font-semibold text-slate-400">correct words</p>
            </div>
            <div className="h-10 w-px bg-slate-200" aria-hidden />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Checked</p>
              <p className="text-2xl font-black text-slate-700">{wordsPlayed}</p>
              <p className="text-[0.65rem] font-semibold text-slate-400">answers checked</p>
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            Tip: use <strong className="text-slate-700">Next word</strong> anytime for a new puzzle.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
