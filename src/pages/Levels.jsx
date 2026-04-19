import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlayerProgress } from '@/services/playerProgressService';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LevelCard from '@/components/game/LevelCard';
import { usePageSeo } from '@/lib/seo/usePageSeo';

const TOTAL_LEVELS = 10;

export default function Levels() {
  usePageSeo({
    title: 'Choose a Level — Math Quest',
    description:
      'Pick your Math Quest level. Unlock new challenges as you learn addition, subtraction, and more!',
  });

  const navigate = useNavigate();
  const [playerProgress, setPlayerProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    try {
      const progress = getPlayerProgress();
      if (progress) {
        setPlayerProgress(progress);
      } else {
        navigate(createPageUrl('Home'));
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleLevelSelect = (level) => {
    navigate(createPageUrl(`Play?level=${level}`));
  };

  const getLevelStars = (level) => {
    if (!playerProgress?.completed_levels) return 0;
    // For simplicity, returning 3 stars if completed
    return playerProgress.completed_levels.includes(level) ? 3 : 0;
  };

  const isLevelLocked = (level) => {
    if (!playerProgress) return level > 1;
    return level > (playerProgress.current_level || 1);
  };

  const isLevelCompleted = (level) => {
    return playerProgress?.completed_levels?.includes(level) || false;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(createPageUrl('Home'))}
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-md"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">Select Level</h1>
            <p className="text-slate-500">Choose your challenge</p>
          </div>
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-md">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-700">{playerProgress?.total_stars || 0}</span>
          </div>
        </div>

        {/* Level Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-3 gap-4"
        >
          {Array.from({ length: TOTAL_LEVELS }).map((_, i) => {
            const level = i + 1;
            return (
              <motion.div
                key={level}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <LevelCard
                  level={level}
                  stars={getLevelStars(level)}
                  isLocked={isLevelLocked(level)}
                  isCompleted={isLevelCompleted(level)}
                  onClick={() => handleLevelSelect(level)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Locked</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}