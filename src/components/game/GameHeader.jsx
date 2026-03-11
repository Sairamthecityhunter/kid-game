import { motion } from 'framer-motion';
import { ArrowLeft, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GameHeader({ onBack, score, streak, level }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        onClick={onBack}
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-md"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <div className="flex items-center gap-4">
        {/* Streak */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full shadow-lg"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span className="font-bold">{streak}</span>
          </motion.div>
        )}

        {/* Score */}
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-md">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-slate-700">{score}</span>
        </div>
      </div>

      {/* Level Badge */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
        <span className="font-bold">Level {level}</span>
      </div>
    </div>
  );
}