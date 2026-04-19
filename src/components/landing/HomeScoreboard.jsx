import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Target,
  Flame,
  Brain,
  Medal,
  Shuffle,
  ListChecks,
  Zap,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getPlayerProgress } from '@/services/playerProgressService';
import { loadUnifiedStats } from '@/services/unifiedGameStatsService';
import { listMemoryBestScores } from '@/lib/memory/scores/memoryBestScores';
import { MEMORY_CATEGORY_LABELS } from '@/data/memoryItems';
import { MEMORY_DIFFICULTY_LABELS } from '@/data/memoryDifficulty';
import { createPageUrl } from '@/utils';
import { cn } from '@/lib/utils';

function StatChip({ icon: Icon, label, value, className }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-sm',
        className
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-700">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 text-left">
        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="truncate text-lg font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function GameCard({ title, emoji, href, children, borderClass, icon: Icon }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl border-2 bg-white/85 p-4 shadow-md backdrop-blur-sm md:p-5',
        borderClass
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-black text-slate-900 md:text-lg">
          {Icon ? <Icon className="h-5 w-5 shrink-0 text-violet-600" aria-hidden /> : null}
          <span className="leading-tight">
            <span aria-hidden>{emoji} </span>
            {title}
          </span>
        </h3>
        <Link
          to={href}
          className="shrink-0 text-xs font-bold text-violet-600 underline-offset-2 hover:underline"
        >
          Play
        </Link>
      </div>
      <div className="flex-1 text-sm font-medium text-slate-600">{children}</div>
    </div>
  );
}

function buildAnalysis(progress, unified, memoryRows) {
  const math =
    progress != null &&
    ((progress.total_stars || 0) > 0 ||
      (progress.games_played || 0) > 0 ||
      (progress.completed_levels || []).length > 0);
  const memory = memoryRows.length > 0;
  const words = unified.wordScramble.attempts > 0;
  const quiz = unified.quiz.roundsCompleted > 0;
  const reaction =
    unified.reaction.bestRunScore > 0 || unified.reaction.bestSingleMs != null;
  const pattern = unified.pattern.bestChain > 0;

  const played = [math, memory, words, quiz, reaction, pattern].filter(Boolean).length;
  const pct = Math.round((played / 6) * 100);

  const hints = [];
  if (!words) hints.push('Word Scramble');
  if (!quiz) hints.push('Picture Quiz');
  if (!reaction) hints.push('Reflex');
  if (!pattern) hints.push('Pattern');
  if (!memory) hints.push('Memory');
  if (!math) hints.push('Math Quest');

  let insight = '';
  if (played === 0) {
    insight = 'Pick any game below to start collecting stats—they all show up here.';
  } else if (played === 6) {
    insight = 'Nice—you have activity in every game! Keep beating your personal bests.';
  } else if (played >= 4) {
    insight = `Strong variety (${played}/6 games). Try ${hints.slice(0, 2).join(' or ')} next.`;
  } else {
    insight = `${played}/6 games so far. Explore ${hints.slice(0, 3).join(', ')} to grow your board.`;
  }

  return { played, pct, insight, math, memory, words, quiz, reaction, pattern };
}

export default function HomeScoreboard() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(null);
  const [unified, setUnified] = useState(() => loadUnifiedStats());
  const [memoryRows, setMemoryRows] = useState([]);

  const refresh = () => {
    setProgress(getPlayerProgress());
    setUnified(loadUnifiedStats());
    setMemoryRows(listMemoryBestScores(8));
  };

  useEffect(() => {
    refresh();
    setReady(true);
    const onStorage = (e) => {
      if (
        e.key === 'math_quest_player_progress' ||
        e.key === 'memory-game-best-moves' ||
        e.key === 'kids_games_unified_stats_v1'
      ) {
        refresh();
      }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const analysis = useMemo(
    () => buildAnalysis(progress, unified, memoryRows),
    [progress, unified, memoryRows]
  );

  const stars = progress?.total_stars ?? 0;
  const points = progress?.total_points ?? 0;
  const level = progress?.current_level ?? 1;
  const bestStreak = progress?.best_streak ?? 0;
  const levelsDone = progress?.completed_levels?.length ?? 0;
  const badges = progress?.badges?.length ?? 0;
  const name = progress?.player_name?.trim() || 'Player';

  const hasMathActivity = analysis.math;
  const wordAcc =
    unified.wordScramble.attempts > 0
      ? Math.round((unified.wordScramble.correct / unified.wordScramble.attempts) * 100)
      : null;
  const bestMemoryMoves =
    memoryRows.length > 0 ? Math.min(...memoryRows.map((r) => r.moves)) : null;

  return (
    <section
      className="relative z-10 border-y border-fuchsia-100/60 bg-gradient-to-r from-white/90 via-violet-50/50 to-cyan-50/40 px-4 py-10 md:py-12"
      aria-labelledby="scoreboard-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <motion.h2
            id="scoreboard-heading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-slate-900 md:text-3xl"
          >
            Your score board
          </motion.h2>
          <p className="mt-2 text-sm font-medium text-slate-600 md:text-base">
            One place for every game—saved on this device. Stats update as you play.
          </p>
        </div>

        {!ready ? (
          <div className="h-40 animate-pulse rounded-3xl bg-white/50" aria-hidden />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-3xl border-2 border-slate-200/80 bg-white/90 p-5 shadow-lg md:p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                    <TrendingUp className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-slate-500">
                      Progress snapshot
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-800 md:text-lg">
                      {analysis.played} of 6 games with saved activity
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                      {analysis.insight}
                    </p>
                  </div>
                </div>
                <div className="md:w-56">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${analysis.pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-bold text-slate-500">{analysis.pct}% explored</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-3xl border-2 border-violet-200/80 bg-white/85 p-5 shadow-lg shadow-violet-100/50 backdrop-blur-sm md:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-lg font-black text-violet-900">
                    <Trophy className="h-6 w-6 text-amber-500" aria-hidden />
                    Math Quest
                  </h3>
                  <Link
                    to={createPageUrl('Home')}
                    className="text-xs font-bold text-violet-600 underline-offset-2 hover:underline"
                  >
                    Open
                  </Link>
                </div>
                <p className="mb-4 text-sm font-semibold text-slate-600">
                  Hi, <span className="text-slate-900">{name}</span>
                  {!hasMathActivity && ' — play a level to log stars and streaks!'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatChip icon={Star} label="Total stars" value={stars} />
                  <StatChip icon={Target} label="Total points" value={points} />
                  <StatChip icon={Medal} label="Current level" value={level} />
                  <StatChip icon={Flame} label="Best streak" value={bestStreak} />
                  <StatChip icon={Trophy} label="Levels cleared" value={levelsDone} />
                  <StatChip icon={Star} label="Badges" value={badges} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="rounded-3xl border-2 border-teal-200/80 bg-white/85 p-5 shadow-lg shadow-teal-100/50 backdrop-blur-sm md:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-lg font-black text-teal-900">
                    <Brain className="h-6 w-6 text-teal-600" aria-hidden />
                    Memory cards
                  </h3>
                  <Link
                    to="/game"
                    className="text-xs font-bold text-teal-700 underline-offset-2 hover:underline"
                  >
                    Open
                  </Link>
                </div>
                {memoryRows.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/50 px-4 py-8 text-center text-sm font-medium text-teal-900/80">
                    Win a round to save your best move counts per theme and difficulty.
                  </p>
                ) : (
                  <>
                    <p className="mb-3 text-sm font-bold text-teal-900">
                      Personal best (fewest moves):{' '}
                      <span className="tabular-nums text-teal-700">{bestMemoryMoves}</span> ·{' '}
                      {memoryRows.length} saved {memoryRows.length === 1 ? 'combo' : 'combos'}
                    </p>
                    <ul className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
                      {memoryRows.map((row) => {
                        const cat =
                          MEMORY_CATEGORY_LABELS[row.categoryId] ?? row.categoryId;
                        const diff =
                          MEMORY_DIFFICULTY_LABELS[row.difficulty] ?? row.difficulty;
                        return (
                          <li
                            key={`${row.categoryId}-${row.difficulty}`}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/40 px-3 py-2.5 text-sm"
                          >
                            <span className="min-w-0 font-semibold text-slate-800">
                              <span className="block truncate">{cat}</span>
                              <span className="text-xs font-medium text-slate-500">{diff}</span>
                            </span>
                            <span className="shrink-0 font-black tabular-nums text-teal-700">
                              {row.moves} moves
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </motion.div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <GameCard
                title="Word Scramble"
                emoji="🔤"
                href="/wordscramble"
                borderClass="border-fuchsia-200/90"
                icon={Shuffle}
              >
                {unified.wordScramble.attempts === 0 ? (
                  <span className="text-slate-500">No checks yet—guess your first word!</span>
                ) : (
                  <ul className="space-y-1.5 text-slate-700">
                    <li>
                      <span className="font-bold text-slate-900">{unified.wordScramble.correct}</span>{' '}
                      correct / {unified.wordScramble.attempts} checks
                    </li>
                    <li>Accuracy: {wordAcc}%</li>
                  </ul>
                )}
              </GameCard>

              <GameCard
                title="Picture Quiz"
                emoji="🖼️"
                href="/quiz"
                borderClass="border-indigo-200/90"
                icon={ListChecks}
              >
                {unified.quiz.roundsCompleted === 0 ? (
                  <span className="text-slate-500">Finish a full round to log your best score.</span>
                ) : (
                  <ul className="space-y-1.5 text-slate-700">
                    <li>
                      Best round:{' '}
                      <span className="font-black text-indigo-700">
                        {unified.quiz.bestScore}
                        {(unified.quiz.bestOutOf || unified.quiz.lastTotal)
                          ? ` / ${unified.quiz.bestOutOf || unified.quiz.lastTotal}`
                          : ''}
                      </span>
                    </li>
                    <li>Rounds completed: {unified.quiz.roundsCompleted}</li>
                  </ul>
                )}
              </GameCard>

              <GameCard
                title="Reflex"
                emoji="⚡"
                href="/reaction"
                borderClass="border-cyan-200/90"
                icon={Zap}
              >
                {unified.reaction.bestRunScore === 0 && unified.reaction.bestSingleMs == null ? (
                  <span className="text-slate-500">Tap correct targets to log speed and high score.</span>
                ) : (
                  <ul className="space-y-1.5 text-slate-700">
                    <li>
                      Best run score:{' '}
                      <span className="font-black text-cyan-800">{unified.reaction.bestRunScore}</span>
                    </li>
                    <li>
                      Fastest tap:{' '}
                      {unified.reaction.bestSingleMs != null ? (
                        <span className="font-black text-cyan-800">
                          {unified.reaction.bestSingleMs} ms
                        </span>
                      ) : (
                        '—'
                      )}
                    </li>
                  </ul>
                )}
              </GameCard>

              <GameCard
                title="Pattern"
                emoji="🎨"
                href="/pattern"
                borderClass="border-violet-200/90"
                icon={Layers}
              >
                {unified.pattern.bestChain === 0 ? (
                  <span className="text-slate-500">
                    Complete a sequence round to save your longest chain.
                  </span>
                ) : (
                  <ul className="space-y-1.5 text-slate-700">
                    <li>
                      Longest chain cleared:{' '}
                      <span className="font-black text-violet-700">{unified.pattern.bestChain}</span>{' '}
                      steps
                    </li>
                  </ul>
                )}
              </GameCard>
            </div>

            <p className="mt-6 text-center text-xs font-medium text-slate-500">
              <Sparkles className="mb-0.5 inline h-3.5 w-3.5 text-amber-500" aria-hidden /> Tip: open
              this page in one tab and play in another—numbers refresh when storage updates.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
