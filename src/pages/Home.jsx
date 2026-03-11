import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getPlayerProgress, createPlayerProgress } from '@/services/playerProgressService';
import { Play, Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [playerProgress, setPlayerProgress] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    try {
      const progress = getPlayerProgress();
      if (progress) {
        setPlayerProgress(progress);
      } else {
        setShowNameInput(true);
      }
    } catch (error) {
      console.error(error);
      setShowNameInput(true);
    }
    setIsLoading(false);
  };

  const createPlayer = () => {
    if (!playerName.trim()) return;
    
    const newPlayer = createPlayerProgress({
      player_name: playerName.trim(),
      total_stars: 0,
      total_points: 0,
      current_level: 1,
      completed_levels: [],
      badges: [],
      games_played: 0,
      correct_answers: 0,
      streak: 0,
      best_streak: 0
    });
    setPlayerProgress(newPlayer);
    setShowNameInput(false);
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
      <div className="max-w-lg mx-auto pt-8">
        {/* Logo/Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Math Quest
          </h1>
          <p className="text-slate-600 text-lg">Learn math through fun! 🎮</p>
        </motion.div>

        {showNameInput ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
              What's your name? 👋
            </h2>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="h-14 text-lg rounded-xl mb-4"
              onKeyDown={(e) => e.key === 'Enter' && createPlayer()}
            />
            <Button
              onClick={createPlayer}
              disabled={!playerName.trim()}
              className="w-full h-14 text-xl rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              Let's Play! 🚀
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Welcome Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 shadow-xl mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {playerProgress?.player_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Hey, {playerProgress?.player_name}! 👋
                  </h2>
                  <p className="text-slate-500">Ready to practice math?</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <Star className="w-8 h-8 text-amber-500 fill-amber-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-slate-800">{playerProgress?.total_stars || 0}</div>
                <div className="text-xs text-slate-500">Stars</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-slate-800">{playerProgress?.total_points || 0}</div>
                <div className="text-xs text-slate-500">Points</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-slate-800">{playerProgress?.badges?.length || 0}</div>
                <div className="text-xs text-slate-500">Badges</div>
              </div>
            </motion.div>

            {/* Play Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link to={createPageUrl('Levels')}>
                <Button className="w-full h-20 text-2xl rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-xl">
                  <Play className="w-8 h-8 mr-3 fill-white" />
                  Play Now
                </Button>
              </Link>
            </motion.div>

            {/* Secondary Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              <Link to={createPageUrl('Progress')}>
                <Button variant="outline" className="w-full h-14 text-lg rounded-xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  Progress
                </Button>
              </Link>
              <Link to={createPageUrl('Badges')}>
                <Button variant="outline" className="w-full h-14 text-lg rounded-xl">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Badges
                </Button>
              </Link>
            </motion.div>
          </>
        )}

        {/* Decorative Elements */}
        <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl" />
        <div className="fixed -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
}