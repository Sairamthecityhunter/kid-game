import { motion } from 'framer-motion';
import { Lock, Play } from 'lucide-react';
import StarRating from './StarRating';

const LEVEL_THEMES = [
  { bg: 'from-violet-400 to-purple-500', emoji: '🌟' },
  { bg: 'from-cyan-400 to-blue-500', emoji: '🚀' },
  { bg: 'from-emerald-400 to-green-500', emoji: '🌿' },
  { bg: 'from-amber-400 to-orange-500', emoji: '🔥' },
  { bg: 'from-pink-400 to-rose-500', emoji: '💖' },
  { bg: 'from-indigo-400 to-blue-600', emoji: '⭐' },
  { bg: 'from-teal-400 to-cyan-500', emoji: '🌊' },
  { bg: 'from-red-400 to-pink-500', emoji: '❤️' },
  { bg: 'from-yellow-400 to-amber-500', emoji: '☀️' },
  { bg: 'from-purple-500 to-indigo-600', emoji: '👑' }
];

export default function LevelCard({ level, stars = 0, isLocked, isCompleted, onClick }) {
  const theme = LEVEL_THEMES[(level - 1) % LEVEL_THEMES.length];

  return (
    <motion.button
      onClick={() => !isLocked && onClick()}
      disabled={isLocked}
      className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl ${
        isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.bg} ${
          isLocked ? 'opacity-30 grayscale' : ''
        }`}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {isLocked ? (
          <Lock className="w-10 h-10 text-white/80" />
        ) : (
          <>
            <span className="text-4xl mb-2">{theme.emoji}</span>
            <span className="text-2xl font-bold text-white drop-shadow-lg">{level}</span>
            {isCompleted && (
              <div className="mt-2">
                <StarRating stars={stars} size="sm" />
              </div>
            )}
            {!isCompleted && (
              <div className="mt-2 bg-white/30 rounded-full p-2">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            )}
          </>
        )}
      </div>

      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}