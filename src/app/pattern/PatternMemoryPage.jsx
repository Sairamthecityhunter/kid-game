import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import MemoryCategoryPicker from '@/components/memory/MemoryCategoryPicker';
import { Button } from '@/components/ui/button';
import PatternDifficultyPicker from '@/components/pattern/PatternDifficultyPicker';
import { DEFAULT_MEMORY_CATEGORY_ID } from '@/data/memoryCategoryDecks';
import {
  DEFAULT_MEMORY_DIFFICULTY_ID,
  isValidMemoryDifficulty,
  MEMORY_DIFFICULTY_LABELS,
} from '@/data/memoryDifficulty';
import {
  isValidMemoryCategory,
  MEMORY_CATEGORY_LABELS,
} from '@/data/memoryItems';
import { randomPadIndex } from '@/lib/pattern/patternPads';
import {
  patternPadCountForDifficulty,
  patternPlaybackMultiplierForDifficulty,
} from '@/lib/pattern/patternDifficulty';
import { getPatternPadsForTheme } from '@/lib/pattern/patternThemes';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import { cn } from '@/lib/utils';
import { Layers, Play, RotateCcw } from 'lucide-react';

const PAD_GAP = 'gap-3 sm:gap-4';

function gridLayoutForPadCount(n) {
  if (n <= 3) return 'grid-cols-3 max-w-md';
  if (n === 4) return 'grid-cols-2 max-w-md';
  return 'grid-cols-3 max-w-lg';
}

export default function PatternMemoryPage() {
  usePageSeo({
    title: 'Pattern Memory — Simon Game',
    description:
      'Watch the color pattern, then tap it back in order. Nineteen color themes like memory, plus easy, medium, or hard.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory =
    searchParams.get('category') ?? searchParams.get('theme') ?? DEFAULT_MEMORY_CATEGORY_ID;
  const category = isValidMemoryCategory(rawCategory) ? rawCategory : DEFAULT_MEMORY_CATEGORY_ID;

  const rawDifficulty = searchParams.get('difficulty') ?? DEFAULT_MEMORY_DIFFICULTY_ID;
  const difficulty = isValidMemoryDifficulty(rawDifficulty)
    ? rawDifficulty
    : DEFAULT_MEMORY_DIFFICULTY_ID;

  const padCount = patternPadCountForDifficulty(difficulty);
  const activePads = useMemo(
    () => getPatternPadsForTheme(category).slice(0, padCount),
    [category, padCount]
  );
  const difficultyLabel = MEMORY_DIFFICULTY_LABELS[difficulty] ?? difficulty;
  const categoryLabel = MEMORY_CATEGORY_LABELS[category] ?? category;

  const [sequence, setSequence] = useState([]);
  const [phase, setPhase] = useState('idle');
  const [inputIndex, setInputIndex] = useState(0);
  const [litPad, setLitPad] = useState(null);
  const [bestLevel, setBestLevel] = useState(0);

  const timeoutsRef = useRef([]);
  const phaseRef = useRef('idle');
  const sequenceRef = useRef(sequence);
  const inputIndexRef = useRef(inputIndex);
  const padCountRef = useRef(padCount);
  const difficultyRef = useRef(difficulty);

  phaseRef.current = phase;
  sequenceRef.current = sequence;
  inputIndexRef.current = inputIndex;
  padCountRef.current = padCount;
  difficultyRef.current = difficulty;

  const level = sequence.length;
  const clearPlaybackTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearPlaybackTimers(), [clearPlaybackTimers]);

  useEffect(() => {
    if (searchParams.get('category') !== category) {
      const next = new URLSearchParams(searchParams);
      next.set('category', category);
      next.delete('theme');
      setSearchParams(next, { replace: true });
    }
  }, [category, searchParams, setSearchParams]);

  useEffect(() => {
    if (searchParams.get('difficulty') !== difficulty) {
      const next = new URLSearchParams(searchParams);
      next.set('difficulty', difficulty);
      setSearchParams(next, { replace: true });
    }
  }, [difficulty, searchParams, setSearchParams]);

  useEffect(() => {
    clearPlaybackTimers();
    setSequence([]);
    setPhase('idle');
    setInputIndex(0);
    setLitPad(null);
    setBestLevel(0);
  }, [difficulty, category, clearPlaybackTimers]);

  const schedulePlayback = useCallback(
    (seq, speedMul) => {
      clearPlaybackTimers();
      setLitPad(null);
      setPhase('watch');
      setInputIndex(0);

      let t = 450 * speedMul;
      seq.forEach((padId) => {
        timeoutsRef.current.push(
          setTimeout(() => {
            setLitPad(padId);
          }, t)
        );
        t += 550 * speedMul;
        timeoutsRef.current.push(
          setTimeout(() => {
            setLitPad(null);
          }, t)
        );
        t += 160 * speedMul;
      });

      timeoutsRef.current.push(
        setTimeout(() => {
          setLitPad(null);
          setPhase('input');
          setInputIndex(0);
        }, t + 120 * speedMul)
      );
    },
    [clearPlaybackTimers]
  );

  const startNewGame = useCallback(() => {
    clearPlaybackTimers();
    setLitPad(null);
    const pc = patternPadCountForDifficulty(difficultyRef.current);
    const speed = patternPlaybackMultiplierForDifficulty(difficultyRef.current);
    const first = randomPadIndex(pc);
    const next = [first];
    setSequence(next);
    schedulePlayback(next, speed);
  }, [clearPlaybackTimers, schedulePlayback]);

  const handlePadClick = (padId) => {
    if (phaseRef.current !== 'input') return;

    const seq = sequenceRef.current;
    const idx = inputIndexRef.current;

    if (padId !== seq[idx]) {
      setPhase('gameover');
      return;
    }

    setLitPad(padId);
    window.setTimeout(() => setLitPad(null), 140);

    const nextIdx = idx + 1;
    if (nextIdx === seq.length) {
      setBestLevel((b) => Math.max(b, seq.length));
      const pc = padCountRef.current;
      const extended = [...seq, randomPadIndex(pc)];
      setSequence(extended);
      setInputIndex(0);
      const speed = patternPlaybackMultiplierForDifficulty(difficultyRef.current);
      schedulePlayback(extended, speed);
    } else {
      setInputIndex(nextIdx);
    }
  };

  const tryAgain = () => {
    clearPlaybackTimers();
    setLitPad(null);
    setSequence([]);
    setPhase('idle');
    setInputIndex(0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50">
      <Navbar />

      <main
        className={cn(
          'mx-auto w-full flex-1 px-4 py-8 md:px-6 md:py-10',
          padCount >= 6 ? 'max-w-2xl' : 'max-w-md md:max-w-lg'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/85 px-4 py-2 text-sm font-bold text-violet-800 shadow-sm">
            <Layers className="h-4 w-4" aria-hidden />
            Pattern memory
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Watch, then repeat!
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-base text-slate-600">
            The lights flash in order—tap the same pads. Each success adds a step. Harder modes use
            more colors and quicker flashes.
          </p>
          <p className="mt-3 text-sm font-bold text-violet-700">
            Theme: {categoryLabel} · Difficulty: {difficultyLabel} · {padCount} pads
          </p>
          <div className="mt-6 flex w-full max-w-5xl flex-col gap-6 sm:mx-auto">
            <div>
              <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Color theme
              </p>
              <MemoryCategoryPicker currentCategory={category} />
            </div>
            <PatternDifficultyPicker currentDifficulty={difficulty} />
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white/80 px-4 py-4 shadow-md backdrop-blur-sm">
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Level</p>
            <p className="text-3xl font-black text-violet-600">{level}</p>
            <p className="text-[0.65rem] font-semibold text-slate-400">steps this round</p>
          </div>
          <div className="h-12 w-px bg-slate-200" aria-hidden />
          <div className="text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Best</p>
            <p className="text-3xl font-black text-amber-600">{bestLevel}</p>
            <p className="text-[0.65rem] font-semibold text-slate-400">longest chain</p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-bold text-slate-600" aria-live="polite">
          {phase === 'idle' && 'Press start to play.'}
          {phase === 'watch' && 'Watch the pattern…'}
          {phase === 'input' && `Your turn — step ${inputIndex + 1} of ${level}`}
          {phase === 'gameover' && 'Oops! Wrong color. Try again?'}
        </p>

        <div
          className={cn(
            'mx-auto mt-8 grid',
            gridLayoutForPadCount(padCount),
            PAD_GAP,
            phase === 'watch' && 'pointer-events-none opacity-95'
          )}
        >
          {activePads.map((pad) => {
            const isLit = litPad === pad.id;
            return (
              <motion.button
                key={pad.id}
                type="button"
                disabled={phase === 'watch' || phase === 'idle' || phase === 'gameover'}
                onClick={() => handlePadClick(pad.id)}
                whileTap={phase === 'input' ? { scale: 0.97 } : undefined}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded-3xl border-4 text-white transition-all duration-150',
                  pad.baseClass,
                  isLit && pad.litClass,
                  (phase === 'idle' || phase === 'gameover') && 'opacity-60'
                )}
                style={pad.style}
                aria-label={`${pad.name} pad`}
              >
                <span className="text-base font-black drop-shadow-sm sm:text-lg md:text-xl">
                  {pad.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {phase === 'idle' ? (
            <Button
              type="button"
              onClick={startNewGame}
              className="h-12 min-w-[10rem] rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 font-bold text-white shadow-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start game
            </Button>
          ) : phase === 'gameover' ? (
            <>
              <Button
                type="button"
                onClick={startNewGame}
                className="h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 font-bold text-white shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                New game
              </Button>
              <Button type="button" variant="outline" onClick={tryAgain} className="h-12 rounded-2xl font-bold">
                <RotateCcw className="mr-2 h-5 w-5" />
                Back to menu
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={tryAgain}
              className="h-12 rounded-2xl border-2 border-slate-300 font-bold"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Quit to menu
            </Button>
          )}
        </div>

        <AnimatePresence>
          {phase === 'gameover' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-center text-base font-semibold text-slate-600"
            >
              Longest chain you cleared:{' '}
              <span className="font-black text-amber-600">{bestLevel}</span> steps. That pattern was{' '}
              <span className="font-black text-violet-700">{level}</span> steps long—so close!
            </motion.p>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
