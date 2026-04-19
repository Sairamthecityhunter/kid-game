import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import { Button } from '@/components/ui/button';
import {
  WORD_SCRAMBLE_CATEGORIES,
  resolveWordScrambleCategory,
} from '@/data/wordScrambleData';
import {
  QUIZ_QUESTIONS_PER_ROUND,
  buildQuizRound,
} from '@/lib/quiz/buildQuizQuestion';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import { cn } from '@/lib/utils';
import { ListChecks, RotateCcw, Trophy } from 'lucide-react';

export default function QuizGamePage() {
  usePageSeo({
    title: 'Picture Quiz — Kids Game',
    description:
      'Multiple-choice quiz for kids: guess the word from a picture and hint. All the same themes as memory—vehicles, space, dinosaurs, and more!',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('category') ?? searchParams.get('theme') ?? undefined;
  const category = resolveWordScrambleCategory(rawCategory);

  const categoryMeta = useMemo(
    () => WORD_SCRAMBLE_CATEGORIES.find((c) => c.id === category),
    [category]
  );

  const [questions, setQuestions] = useState(() => buildQuizRound(category));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedId, setPickedId] = useState(null);
  const [phase, setPhase] = useState('playing');

  const startFreshRound = useCallback((catId) => {
    setQuestions(buildQuizRound(catId));
    setIndex(0);
    setScore(0);
    setPickedId(null);
    setPhase('playing');
  }, []);

  useEffect(() => {
    startFreshRound(category);
  }, [category, startFreshRound]);

  useEffect(() => {
    if (searchParams.get('category') !== category) {
      const next = new URLSearchParams(searchParams);
      next.set('category', category);
      next.delete('theme');
      setSearchParams(next, { replace: true });
    }
  }, [category, searchParams, setSearchParams]);

  const current = questions[index];
  const isLast = index >= questions.length - 1;
  const answered = pickedId !== null;

  const selectCategory = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', id);
    next.delete('theme');
    setSearchParams(next, { replace: true });
  };

  const onPick = (itemId) => {
    if (answered || phase !== 'playing' || !current) return;
    setPickedId(itemId);
    if (itemId === current.subject.id) {
      setScore((s) => s + 1);
    }
  };

  const onNext = () => {
    if (!answered) return;
    if (isLast) {
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setPickedId(null);
  };

  const onPlayAgain = () => {
    startFreshRound(category);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-amber-50 to-rose-100">
      <Navbar />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 md:max-w-xl md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/85 px-4 py-2 text-sm font-bold text-indigo-800 shadow-sm">
            <ListChecks className="h-4 w-4" aria-hidden />
            Picture quiz
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            What is it?
          </h1>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600">
            Category:{' '}
            <span className="font-bold text-indigo-700">{categoryMeta?.title ?? 'Quiz'}</span>
          </p>

          <div className="mt-5">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">
              Pick a category
            </p>
            <div
              className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Quiz category"
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
                        ? 'border-indigo-500 bg-white text-indigo-900 ring-2 ring-indigo-200'
                        : 'border-slate-200/90 bg-white/90 text-slate-700 hover:border-amber-300'
                    )}
                  >
                    <span aria-hidden>{cat.emoji}</span>
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'done' ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 rounded-[1.75rem] border-4 border-white/90 bg-white/95 p-8 text-center shadow-xl shadow-indigo-200/40"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <Trophy className="h-9 w-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 sm:text-3xl">Round complete!</h2>
              <p className="mt-3 text-lg font-semibold text-slate-600">
                Your score
              </p>
              <p className="mt-2 text-5xl font-black text-indigo-600">
                {score}{' '}
                <span className="text-2xl font-bold text-slate-400">
                  / {questions.length || QUIZ_QUESTIONS_PER_ROUND}
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {questions.length
                  ? `${Math.round((score / questions.length) * 100)}% correct — nice work!`
                  : 'Play again to try more questions.'}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  type="button"
                  onClick={onPlayAgain}
                  className="h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 font-bold text-white shadow-md"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Play again
                </Button>
              </div>
            </motion.div>
          ) : current ? (
            <motion.div
              key={`q-${index}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mt-8 rounded-[1.75rem] border-4 border-white/90 bg-white/90 p-6 shadow-xl shadow-indigo-200/40 backdrop-blur-sm md:p-8"
            >
              <p className="text-center text-sm font-bold text-slate-500">
                Question {index + 1} of {questions.length}
              </p>
              <div className="mt-4 flex flex-col items-center text-center">
                <span className="text-6xl md:text-7xl" aria-hidden>
                  {current.subject.emoji}
                </span>
                <p className="mt-4 max-w-sm text-base font-medium leading-relaxed text-slate-600">
                  {current.subject.description}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Tap the right word
                </p>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.choices.map((choice) => {
                  const isCorrect = choice.id === current.subject.id;
                  const isPicked = pickedId === choice.id;
                  let choiceStyle =
                    'border-2 border-slate-200 bg-white/90 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/80';
                  if (answered) {
                    if (isCorrect) {
                      choiceStyle =
                        'border-2 border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200';
                    } else if (isPicked) {
                      choiceStyle =
                        'border-2 border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      choiceStyle =
                        'border-2 border-slate-100 bg-slate-50/80 text-slate-400';
                    }
                  }

                  return (
                    <li key={choice.id}>
                      <button
                        type="button"
                        onClick={() => onPick(choice.id)}
                        disabled={answered}
                        className={cn(
                          'w-full rounded-2xl px-4 py-4 text-left text-base font-bold shadow-sm transition-all sm:text-lg',
                          choiceStyle,
                          !answered && 'active:scale-[0.99]'
                        )}
                      >
                        {choice.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-slate-50/90 px-4 py-3">
                <p className="text-sm font-bold text-slate-600">
                  Score:{' '}
                  <span className="text-indigo-600">{score}</span>
                </p>
                <Button
                  type="button"
                  onClick={onNext}
                  disabled={!answered}
                  className="h-11 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white shadow-md disabled:opacity-40"
                >
                  {isLast ? 'See results' : 'Next question'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <p className="mt-10 text-center text-slate-600">Loading questions…</p>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
