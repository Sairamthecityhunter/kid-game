import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlayerProgress } from '@/services/playerProgressService';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Star, Target, Zap, Trophy, Gamepad2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageSeo } from '@/lib/seo/usePageSeo';

export default function Progress() {
  usePageSeo({
    title: 'Your Progress — Math Quest',
    description:
      'See your Math Quest stars, levels, and how far you have come in the game.',
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

  const accuracy = playerProgress?.games_played > 0 
    ? Math.round((playerProgress.correct_answers / (playerProgress.games_played * 10)) * 100) 
    : 0;

  const stats = [
    { icon: Star, label: 'Total Stars', value: playerProgress?.total_stars || 0, color: 'from-amber-400 to-orange-500' },
    { icon: Target, label: 'Accuracy', value: `${accuracy}%`, color: 'from-green-400 to-emerald-500' },
    { icon: Zap, label: 'Best Streak', value: playerProgress?.best_streak || 0, color: 'from-purple-400 to-pink-500' },
    { icon: Gamepad2, label: 'Games Played', value: playerProgress?.games_played || 0, color: 'from-blue-400 to-indigo-500' },
    { icon: CheckCircle, label: 'Correct Answers', value: playerProgress?.correct_answers || 0, color: 'from-teal-400 to-cyan-500' },
    { icon: Trophy, label: 'Badges Earned', value: playerProgress?.badges?.length || 0, color: 'from-rose-400 to-red-500' }
  ];

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
            <h1 className="text-3xl font-bold text-slate-800">Progress</h1>
            <p className="text-slate-500">Your amazing journey</p>
          </div>
        </div>

        {/* Player Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 mb-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
              {playerProgress?.player_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{playerProgress?.player_name}</h2>
              <p className="text-white/80">Level {playerProgress?.current_level || 1} Explorer</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{playerProgress?.total_points || 0} points</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
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
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white rounded-2xl p-5 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Completed Levels */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Completed Levels</h3>
          <div className="flex flex-wrap gap-2">
            {playerProgress?.completed_levels?.length > 0 ? (
              playerProgress.completed_levels.sort((a, b) => a - b).map(level => (
                <div
                  key={level}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow"
                >
                  {level}
                </div>
              ))
            ) : (
              <p className="text-slate-500">No levels completed yet. Start playing!</p>
            )}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}