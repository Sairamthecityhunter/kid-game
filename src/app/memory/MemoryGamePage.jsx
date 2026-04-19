import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import MemoryBoard from '@/components/memory/MemoryBoard';
import GameStats from '@/components/memory/GameStats';
import WinModal from '@/components/memory/WinModal';
import MemoryCategoryPicker from '@/components/memory/MemoryCategoryPicker';
import MemoryDifficultyPicker from '@/components/memory/MemoryDifficultyPicker';
import { useMemoryGame } from '@/lib/memory/useMemoryGame';
import { useMemorySound } from '@/lib/memory/sounds';
import MemorySoundToggle from '@/components/memory/MemorySoundToggle';
import MemoryHowToPlay from '@/components/memory/MemoryHowToPlay';
import { DEFAULT_MEMORY_CATEGORY_ID, DEFAULT_MEMORY_DIFFICULTY_ID } from '@/lib/memory/deck';
import {
  isValidMemoryCategory,
  MEMORY_CATEGORY_LABELS,
  MEMORY_GAME_BADGE,
  MEMORY_GAME_HEADING_BEFORE,
  MEMORY_GAME_HEADING_ACCENT,
  MEMORY_GAME_SUBTITLE,
} from '@/data/memoryItems';
import {
  isValidMemoryDifficulty,
  MEMORY_DIFFICULTY_LABELS,
} from '@/data/memoryDifficulty';
import { useMemoryBestScore } from '@/lib/memory/scores';
import { usePageSeo } from '@/lib/seo/usePageSeo';

export default function MemoryGamePage() {
  usePageSeo({
    title: 'Play Memory Game',
    description:
      'Tap cards, remember the pictures, and match every pair. Pick from 19 colorful themes and a difficulty level—kid-friendly memory practice.',
  });

  const [searchParams] = useSearchParams();
  const rawCategory =
    searchParams.get('category') ?? searchParams.get('theme') ?? DEFAULT_MEMORY_CATEGORY_ID;
  const category = isValidMemoryCategory(rawCategory) ? rawCategory : DEFAULT_MEMORY_CATEGORY_ID;

  const rawDifficulty = searchParams.get('difficulty') ?? DEFAULT_MEMORY_DIFFICULTY_ID;
  const difficulty = isValidMemoryDifficulty(rawDifficulty)
    ? rawDifficulty
    : DEFAULT_MEMORY_DIFFICULTY_ID;

  const { muted, toggleMuted, playFlip, playMatch, playWin } = useMemorySound();

  const {
    cards,
    flippedIds,
    moves,
    matchedPairs,
    totalPairs,
    won,
    isCheckingMismatch,
    flipCard,
    restart,
  } = useMemoryGame(category, difficulty, {
    onFlip: playFlip,
    onMatch: playMatch,
    onWin: playWin,
  });

  const bestMoves = useMemoryBestScore(category, difficulty, won, moves);

  const categoryLabel = MEMORY_CATEGORY_LABELS[category] ?? category;
  const difficultyLabel = MEMORY_DIFFICULTY_LABELS[difficulty] ?? difficulty;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-100 via-teal-50 to-amber-50">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200/80 bg-white/85 px-4 py-2 text-sm font-bold text-fuchsia-800 shadow-sm backdrop-blur-sm">
            <span className="text-lg leading-none">🎴</span>
            {MEMORY_GAME_BADGE}
          </p>
          <h1 className="text-[2rem] font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl md:leading-[1.05]">
            {MEMORY_GAME_HEADING_BEFORE}{' '}
            <span className="bg-gradient-to-r from-fuchsia-600 via-amber-500 to-cyan-600 bg-clip-text text-transparent">
              {MEMORY_GAME_HEADING_ACCENT}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-600 sm:text-xl md:text-2xl md:leading-relaxed">
            {MEMORY_GAME_SUBTITLE}
          </p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-4 py-1.5 text-sm font-bold text-teal-800 shadow-sm backdrop-blur-sm">
              <span className="text-base leading-none">🃏</span>
              {categoryLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-4 py-1.5 text-sm font-bold text-amber-900 shadow-sm backdrop-blur-sm">
              <span className="text-base leading-none">⚙️</span>
              {difficultyLabel}
            </span>
            <MemorySoundToggle muted={muted} onToggle={toggleMuted} />
          </p>
          <div className="mt-6 flex w-full flex-col gap-6 sm:gap-7">
            <MemoryCategoryPicker currentCategory={category} />
            <MemoryDifficultyPicker currentDifficulty={difficulty} />
          </div>
          <MemoryHowToPlay variant="compact" className="mt-8" />
        </motion.div>

        <GameStats
          moves={moves}
          bestMoves={bestMoves}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          onRestart={restart}
        />

        <MemoryBoard
          cards={cards}
          flippedIds={flippedIds}
          interactionLocked={isCheckingMismatch}
          onCardClick={flipCard}
        />

        <WinModal
          open={won}
          moves={moves}
          categoryLabel={categoryLabel}
          difficultyLabel={difficultyLabel}
          onPlayAgain={restart}
        />
      </main>

      <Footer />
    </div>
  );
}
