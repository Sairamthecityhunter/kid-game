import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlayerProgress } from '@/services/playerProgressService';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge, { BADGE_CONFIG } from '@/components/game/Badge';

export default function Badges() {
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

  const earnedBadges = playerProgress?.badges || [];
  const allBadgeIds = Object.keys(BADGE_CONFIG);

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
            <h1 className="text-3xl font-bold text-slate-800">Badges</h1>
            <p className="text-slate-500">{earnedBadges.length}/{allBadgeIds.length} earned</p>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-600">Collection Progress</span>
            <span className="text-sm font-bold text-violet-600">
              {Math.round((earnedBadges.length / allBadgeIds.length) * 100)}%
            </span>
          </div>
          <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earnedBadges.length / allBadgeIds.length) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
            />
          </div>
        </motion.div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-6"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-4">🏆 Earned Badges</h2>
            <div className="grid grid-cols-4 gap-4">
              {earnedBadges.map((badgeId, index) => (
                <motion.div
                  key={badgeId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge badgeId={badgeId} size="md" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Locked Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4">🔒 Locked Badges</h2>
          <div className="grid grid-cols-4 gap-4">
            {allBadgeIds
              .filter(id => !earnedBadges.includes(id))
              .map((badgeId, index) => (
                <motion.div
                  key={badgeId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Badge badgeId={badgeId} size="md" locked />
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Badge Descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4">📖 How to Earn</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p><span className="font-semibold">First Victory:</span> Complete your first level</p>
            <p><span className="font-semibold">5 Streak:</span> Answer 5 questions correctly in a row</p>
            <p><span className="font-semibold">10 Streak:</span> Answer 10 questions correctly in a row</p>
            <p><span className="font-semibold">Perfect Game:</span> Get 3 stars on any level</p>
            <p><span className="font-semibold">Level 5:</span> Complete 5 different levels</p>
            <p><span className="font-semibold">Level 10:</span> Complete all 10 levels</p>
            <p><span className="font-semibold">50 Stars:</span> Earn a total of 50 stars</p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}