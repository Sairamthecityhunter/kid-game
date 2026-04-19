import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlayerProgress, updatePlayerProgress } from '@/services/playerProgressService';
import { createPageUrl } from '@/utils';
import QuestionCard from '@/components/game/QuestionCard';
import GameHeader from '@/components/game/GameHeader';
import ResultsModal from '@/components/game/ResultsModal';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import {
  generateMathQuestOptions,
  generateMathQuestQuestion,
} from '@/lib/mathQuest/generateMathQuestQuestion';

const QUESTIONS_PER_LEVEL = 10;

export default function Play() {
  usePageSeo({
    title: 'Play — Math Quest',
    description:
      'Answer math questions, earn stars, and beat your best score in Math Quest.',
  });

  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = parseInt(urlParams.get('level')) || 1;
    setLevel(levelParam);
    
    const generatedQuestions = Array.from({ length: QUESTIONS_PER_LEVEL }).map(() =>
      generateMathQuestQuestion(levelParam)
    );
    setQuestions(generatedQuestions);
    
    loadProgress();
  }, []);

  const loadProgress = () => {
    try {
      const progress = getPlayerProgress();
      if (progress) {
        setPlayerProgress(progress);
        setStreak(progress.streak || 0);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleAnswer = useCallback(async (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    let newScore = score;
    let newStreak = streak;

    if (isCorrect) {
      newScore = score + 1;
      newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);
    }

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 100);
    } else {
      // Game finished - calculate results and update progress
      const stars = newScore >= QUESTIONS_PER_LEVEL ? 3 : newScore >= QUESTIONS_PER_LEVEL * 0.7 ? 2 : newScore >= QUESTIONS_PER_LEVEL * 0.4 ? 1 : 0;
      const pointsEarned = newScore * 10 + (newStreak * 5);
      
      if (playerProgress) {
        const completedLevels = playerProgress.completed_levels || [];
        const newCompletedLevels = stars >= 1 && !completedLevels.includes(level) 
          ? [...completedLevels, level] 
          : completedLevels;
        
        const newBadges = [...(playerProgress.badges || [])];
        
        // Check for new badges
        if (newCompletedLevels.length === 1 && !newBadges.includes('first_win')) {
          newBadges.push('first_win');
        }
        if (newStreak >= 5 && !newBadges.includes('streak_5')) {
          newBadges.push('streak_5');
        }
        if (newStreak >= 10 && !newBadges.includes('streak_10')) {
          newBadges.push('streak_10');
        }
        if (stars === 3 && !newBadges.includes('perfect_game')) {
          newBadges.push('perfect_game');
        }
        if (newCompletedLevels.length >= 5 && !newBadges.includes('level_5')) {
          newBadges.push('level_5');
        }
        if (newCompletedLevels.length >= 10 && !newBadges.includes('level_10')) {
          newBadges.push('level_10');
        }
        
        const totalStars = (playerProgress.total_stars || 0) + stars;
        if (totalStars >= 50 && !newBadges.includes('star_collector')) {
          newBadges.push('star_collector');
        }

        const updatedProgress = updatePlayerProgress({
          total_stars: totalStars,
          total_points: (playerProgress.total_points || 0) + pointsEarned,
          current_level: Math.max(playerProgress.current_level || 1, level + 1),
          completed_levels: newCompletedLevels,
          badges: newBadges,
          games_played: (playerProgress.games_played || 0) + 1,
          correct_answers: (playerProgress.correct_answers || 0) + newScore,
          streak: newStreak,
          best_streak: Math.max(playerProgress.best_streak || 0, newStreak)
        });
        setPlayerProgress(updatedProgress);
      }
      
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions, score, streak, playerProgress, level]);

  const handleReplay = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setShowResults(false);
    setQuestions(
      Array.from({ length: QUESTIONS_PER_LEVEL }).map(() => generateMathQuestQuestion(level))
    );
  };

  const handleNextLevel = () => {
    navigate(createPageUrl(`Play?level=${level + 1}`));
    window.location.reload();
  };

  if (isLoading || questions.length === 0) {
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

  const currentQuestion = questions[currentQuestionIndex];
  const stars = score >= QUESTIONS_PER_LEVEL ? 3 : score >= QUESTIONS_PER_LEVEL * 0.7 ? 2 : score >= QUESTIONS_PER_LEVEL * 0.4 ? 1 : 0;
  const pointsEarned = score * 10 + (streak * 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-lg mx-auto">
        <GameHeader
          onBack={() => navigate(createPageUrl('Levels'))}
          score={score}
          streak={streak}
          level={level}
        />

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIndex}
            question={currentQuestion}
            options={generateMathQuestOptions(currentQuestion.answer)}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS_PER_LEVEL}
            timeLimit={Math.max(20 - level, 10)}
          />
        </AnimatePresence>
      </div>

      <ResultsModal
        isOpen={showResults}
        score={score}
        totalQuestions={QUESTIONS_PER_LEVEL}
        stars={stars}
        pointsEarned={pointsEarned}
        onReplay={handleReplay}
        onHome={() => navigate(createPageUrl('Home'))}
        onNextLevel={handleNextLevel}
        hasNextLevel={level < 10}
      />

      {/* Decorative Elements */}
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-violet-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}