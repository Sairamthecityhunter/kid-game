import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import Confetti from './Confetti';

export default function ResultsModal({ 
  isOpen, 
  score, 
  totalQuestions, 
  stars, 
  pointsEarned,
  onReplay, 
  onHome,
  onNextLevel,
  hasNextLevel
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return { text: "PERFECT! 🎉", color: "text-amber-500" };
    if (percentage >= 80) return { text: "Amazing! 🌟", color: "text-green-500" };
    if (percentage >= 60) return { text: "Good Job! 👍", color: "text-blue-500" };
    if (percentage >= 40) return { text: "Nice Try! 💪", color: "text-purple-500" };
    return { text: "Keep Practicing! 📚", color: "text-slate-500" };
  };

  const message = getMessage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          {stars === 3 && <Confetti />}
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              {/* Trophy Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>

              {/* Message */}
              <h2 className={`text-3xl font-bold mb-2 ${message.color}`}>
                {message.text}
              </h2>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                <StarRating stars={stars} size="lg" />
              </div>

              {/* Score */}
              <div className="bg-slate-100 rounded-2xl p-4 mb-6">
                <div className="text-5xl font-bold text-slate-800 mb-1">
                  {score}/{totalQuestions}
                </div>
                <div className="text-slate-500">Questions Correct</div>
              </div>

              {/* Points Earned */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-lg font-semibold text-slate-700">
                  +{pointsEarned} points earned!
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={onHome}
                  variant="outline"
                  className="h-14 text-lg rounded-xl"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Button>
                <Button
                  onClick={onReplay}
                  variant="outline"
                  className="h-14 text-lg rounded-xl"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Replay
                </Button>
              </div>
              
              {hasNextLevel && stars >= 1 && (
                <Button
                  onClick={onNextLevel}
                  className="w-full h-14 text-lg rounded-xl mt-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                >
                  Next Level →
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}