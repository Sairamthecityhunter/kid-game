import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Homepage category tile — links to /game?category=...
 */
export default function ThemeCategoryCard({
  categoryId,
  title,
  description,
  emoji,
  gradientClass,
  borderClass,
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border-2 bg-white/85 p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl md:p-7',
        borderClass
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity group-hover:opacity-60',
          gradientClass
        )}
      />
      <div className="relative">
        <span
          className={cn(
            'mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-4xl shadow-inner ring-4 ring-white/50 md:h-20 md:w-20 md:text-5xl',
            gradientClass
          )}
          role="img"
          aria-hidden
        >
          {emoji}
        </span>
        <h3 className="text-xl font-black text-slate-800 md:text-2xl">{title}</h3>
        <p className="mt-2 text-slate-600">{description}</p>
        <Link
          to={`/game?category=${categoryId}`}
          className={cn(
            'mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] md:text-base',
            gradientClass
          )}
        >
          Play this category
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
