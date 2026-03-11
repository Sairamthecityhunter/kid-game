import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StarRating({ stars, maxStars = 3, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
        >
          <Star
            className={`${sizeClasses[size]} ${
              i < stars
                ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
                : 'fill-slate-200 text-slate-300'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}