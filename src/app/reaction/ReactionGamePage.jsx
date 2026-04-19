import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import MemoryCategoryPicker from '@/components/memory/MemoryCategoryPicker';
import { Button } from '@/components/ui/button';
import { DEFAULT_MEMORY_CATEGORY_ID } from '@/data/memoryCategoryDecks';
import { isValidMemoryCategory, MEMORY_CATEGORY_LABELS } from '@/data/memoryItems';
import {
  buildReactionRound,
  itemCountForDifficulty,
  timeLimitMsForDifficulty,
} from '@/lib/reaction/buildRound';
import { recordReactionProgress } from '@/services/unifiedGameStatsService';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import { cn } from '@/lib/utils';
import { RotateCcw, Zap } from 'lucide-react';

export default function ReactionGamePage() {
  usePageSeo({
    title: 'Reaction Game — Tap Fast!',
    description:
      'Tap the right emoji before time runs out. Pick any memory theme—animals, space, food, and more!',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory =
    searchParams.get('category') ?? searchParams.get('theme') ?? DEFAULT_MEMORY_CATEGORY_ID;
  const category = isValidMemoryCategory(rawCategory) ? rawCategory : DEFAULT_MEMORY_CATEGORY_ID;
  const categoryLabel = MEMORY_CATEGORY_LABELS[category] ?? category;

  useEffect(() => {
    if (searchParams.get('category') !== category) {
      const next = new URLSearchParams(searchParams);
      next.set('category', category);
      next.delete('theme');
      setSearchParams(next, { replace: true });
    }
  }, [category, searchParams, setSearchParams]);

  const [difficulty, setDifficulty] = useState(1);
  const [round, setRound] = useState(() => buildReactionRound(1, category));
  const [score, setScore] = useState(0);
  const [lastMs, setLastMs] = useState(null);
  const [bestMs, setBestMs] = useState(null);
  const [avgMs, setAvgMs] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [slowBanner, setSlowBanner] = useState(false);

  const [timeLeft, setTimeLeft] = useState(1);
  const roundStartRef = useRef(performance.now());
  const recentTimesRef = useRef([]);
  const timeoutRef = useRef(null);
  const tickRef = useRef(null);
  const slowBannerTimeoutRef = useRef(null);
  const difficultyRef = useRef(difficulty);
  const categoryRef = useRef(category);

  difficultyRef.current = difficulty;
  categoryRef.current = category;

  const target = round.items.find((i) => i.id === round.targetId);

  const clearRoundTimers = useCallback(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (tickRef.current != null) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearRoundTimers();
    const d = difficultyRef.current;
    const limitMs = timeLimitMsForDifficulty(d);
    const start = performance.now();
    roundStartRef.current = start;
    setTimeLeft(1);

    tickRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      setTimeLeft(Math.max(0, 1 - elapsed / limitMs));
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (tickRef.current != null) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
      timeoutRef.current = null;
      if (slowBannerTimeoutRef.current != null) {
        clearTimeout(slowBannerTimeoutRef.current);
      }
      setSlowBanner(true);
      slowBannerTimeoutRef.current = setTimeout(() => {
        setSlowBanner(false);
        slowBannerTimeoutRef.current = null;
      }, 1600);

      const nextD = Math.min(difficultyRef.current + 0.15, 22);
      setDifficulty(nextD);
      setRound(buildReactionRound(nextD, categoryRef.current));
    }, limitMs);

    return clearRoundTimers;
  }, [round, difficulty, clearRoundTimers]);

  const onCorrect = (ms) => {
    clearRoundTimers();
    setLastMs(Math.round(ms));
    setBestMs((b) => (b == null ? ms : Math.min(b, ms)));
    recentTimesRef.current = [...recentTimesRef.current, ms].slice(-5);
    const arr = recentTimesRef.current;
    setAvgMs(arr.reduce((a, b) => a + b, 0) / arr.length);

    const bonus = ms < 450 ? 1 : 0;
    setScore((s) => {
      const next = s + 1 + bonus;
      recordReactionProgress(next, ms);
      return next;
    });

    const nextD = Math.min(difficultyRef.current + 0.35, 22);
    setDifficulty(nextD);
    setRound(buildReactionRound(nextD, categoryRef.current));
  };

  const onTap = (id) => {
    if (id === round.targetId) {
      const ms = performance.now() - roundStartRef.current;
      onCorrect(ms);
      return;
    }
    setWrongFlash(true);
    window.setTimeout(() => setWrongFlash(false), 350);
  };

  const startFresh = () => {
    clearRoundTimers();
    if (slowBannerTimeoutRef.current != null) {
      clearTimeout(slowBannerTimeoutRef.current);
      slowBannerTimeoutRef.current = null;
    }
    recentTimesRef.current = [];
    setDifficulty(1);
    difficultyRef.current = 1;
    setScore(0);
    setLastMs(null);
    setBestMs(null);
    setAvgMs(null);
    setSlowBanner(false);
    setRound(buildReactionRound(1, categoryRef.current));
  };

  const prevCategoryRef = useRef(category);
  useEffect(() => {
    if (prevCategoryRef.current === category) return;
    prevCategoryRef.current = category;
    clearRoundTimers();
    if (slowBannerTimeoutRef.current != null) {
      clearTimeout(slowBannerTimeoutRef.current);
      slowBannerTimeoutRef.current = null;
    }
    recentTimesRef.current = [];
    setDifficulty(1);
    difficultyRef.current = 1;
    setScore(0);
    setLastMs(null);
    setBestMs(null);
    setAvgMs(null);
    setSlowBanner(false);
    setWrongFlash(false);
    setRound(buildReactionRound(1, category));
  }, [category, clearRoundTimers]);

  const gridClass =
    round.items.length > 9
      ? 'grid-cols-3 sm:grid-cols-4'
      : round.items.length > 6
        ? 'grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-3';

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col transition-colors duration-300',
        wrongFlash ? 'bg-rose-100/90' : 'bg-gradient-to-br from-cyan-100 via-amber-50 to-rose-100'
      )}
    >
      <Navbar />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/85 px-4 py-2 text-sm font-bold text-cyan-900 shadow-sm">
            <Zap className="h-4 w-4 text-amber-500" aria-hidden />
            Reaction game
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tap the right one!
          </h1>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600">
            Find the glowing emoji before the bar runs out. Wrong taps flash red—stay focused!
          </p>
          <p className="mt-3 text-sm font-bold text-cyan-900">Deck: {categoryLabel}</p>
          <div className="mt-5">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">
              Category
            </p>
            <MemoryCategoryPicker currentCategory={category} />
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm">
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Score</p>
            <p className="text-2xl font-black text-teal-600">{score}</p>
          </div>
          <div className="h-10 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Level</p>
            <p className="text-2xl font-black text-violet-600">{Math.floor(difficulty)}</p>
          </div>
          <div className="h-10 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Items</p>
            <p className="text-2xl font-black text-amber-600">
              {itemCountForDifficulty(difficulty)}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Last</p>
            <p className="text-xl font-black text-slate-800">
              {lastMs != null ? `${lastMs} ms` : '—'}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Best</p>
            <p className="text-xl font-black text-emerald-600">
              {bestMs != null ? `${Math.round(bestMs)} ms` : '—'}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Avg ×5</p>
            <p className="text-xl font-black text-indigo-600">
              {avgMs != null ? `${Math.round(avgMs)} ms` : '—'}
            </p>
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-500"
            initial={false}
            animate={{ width: `${timeLeft * 100}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <p className="mt-1 text-center text-xs font-semibold text-slate-500">Time left — hurry!</p>

        <AnimatePresence mode="wait">
          {slowBanner ? (
            <motion.p
              key="slow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-lg font-bold text-rose-600"
              role="status"
            >
              Too slow! Here&apos;s a new round…
            </motion.p>
          ) : null}
          {target ? (
            <motion.div
              key={`${round.targetId}-${round.items.map((i) => i.id).join()}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border-2 border-amber-200/80 bg-amber-50/90 px-4 py-4 text-center shadow-md"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-amber-900/80">
                Tap this
              </p>
              <p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-slate-900 sm:text-3xl">
                <span aria-hidden>{target.emoji}</span>
                <span>{target.name}</span>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className={cn('mt-8 grid gap-3 sm:gap-4', gridClass)}>
          {round.items.map((item) => {
            const isTarget = item.id === round.targetId;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onTap(item.id)}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded-3xl border-4 text-4xl shadow-lg transition-shadow sm:text-5xl md:text-6xl',
                  isTarget
                    ? 'animate-pulse border-amber-400 bg-white ring-4 ring-amber-300/70 ring-offset-2 ring-offset-amber-50'
                    : 'border-white/80 bg-white/90 hover:border-cyan-300 hover:shadow-xl'
                )}
                aria-label={isTarget ? `Target: ${item.name}` : item.name}
              >
                <span aria-hidden>{item.emoji}</span>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Bonus <span className="font-bold text-amber-600">+1</span> score if you tap in under{' '}
          <span className="font-bold">450 ms</span>. Difficulty rises as your level goes up!
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={startFresh}
            className="h-12 rounded-2xl border-2 border-slate-300 font-bold"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset run
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
