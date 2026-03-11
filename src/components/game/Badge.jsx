import { motion } from 'framer-motion';
import { Trophy, Zap, Target, Brain, Flame, Crown, Medal, Sparkles } from 'lucide-react';

const BADGE_CONFIG = {
  first_win: { icon: Trophy, color: 'from-amber-400 to-orange-500', label: 'First Victory' },
  streak_5: { icon: Flame, color: 'from-red-400 to-orange-500', label: '5 Streak' },
  streak_10: { icon: Zap, color: 'from-purple-400 to-pink-500', label: '10 Streak' },
  perfect_game: { icon: Target, color: 'from-green-400 to-emerald-500', label: 'Perfect Game' },
  math_master: { icon: Brain, color: 'from-blue-400 to-indigo-500', label: 'Math Master' },
  level_5: { icon: Medal, color: 'from-cyan-400 to-blue-500', label: 'Level 5' },
  level_10: { icon: Crown, color: 'from-yellow-400 to-amber-500', label: 'Level 10' },
  star_collector: { icon: Sparkles, color: 'from-pink-400 to-rose-500', label: '50 Stars' }
};

export default function Badge({ badgeId, size = 'md', showLabel = true, locked = false }) {
  const config = BADGE_CONFIG[badgeId] || BADGE_CONFIG.first_win;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${
          locked ? 'from-slate-300 to-slate-400' : config.color
        } flex items-center justify-center shadow-lg ${
          locked ? 'opacity-40' : ''
        }`}
      >
        <Icon className={`${iconSizes[size]} text-white drop-shadow`} />
      </div>
      {showLabel && (
        <span className={`text-xs font-medium ${locked ? 'text-slate-400' : 'text-slate-600'}`}>
          {config.label}
        </span>
      )}
    </motion.div>
  );
}

export { BADGE_CONFIG };