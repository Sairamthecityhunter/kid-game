import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function QuestionCard({ 
  question, 
  options, 
  onAnswer, 
  questionNumber, 
  totalQuestions,
  timeLimit = 15 
}) {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setIsAnswered(false);
    setTimeLeft(timeLimit);
  }, [question, timeLimit]);

  useEffect(() => {
    if (isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, isAnswered]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setSelected(answer);
    setIsAnswered(true);
    setTimeout(() => onAnswer(answer), 800);
  };

  const getButtonStyle = (option) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-violet-50 border-2 border-slate-200 hover:border-violet-400 text-slate-700';
    }
    if (option === question.answer) {
      return 'bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-green-500 text-white';
    }
    if (option === selected && option !== question.answer) {
      return 'bg-gradient-to-r from-red-400 to-rose-500 border-2 border-red-500 text-white';
    }
    return 'bg-slate-100 border-2 border-slate-200 text-slate-400';
  };

  const timerPercent = (timeLeft / timeLimit) * 100;
  const timerColor = timeLeft > 5 ? 'bg-violet-500' : 'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-slate-500">
          {questionNumber}/{totalQuestions}
        </span>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${timerColor} transition-colors`}
            animate={{ width: `${timerPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-end mt-1">
          <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-slate-500'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-8 mb-8 shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
          {question.text}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`py-6 px-4 rounded-2xl text-2xl font-bold transition-all shadow-lg ${getButtonStyle(option)}`}
              whileHover={!isAnswered ? { scale: 1.05 } : {}}
              whileTap={!isAnswered ? { scale: 0.95 } : {}}
            >
              {option}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}