import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.to - router path
 * @param {string} props.ctaLabel
 * @param {string} props.gradientClass
 * @param {string} props.borderClass
 * @param {React.ComponentType<{ className?: string }>} props.icon
 * @param {number} [props.delay]
 */
export default function CategoryCard({
  title,
  description,
  to,
  ctaLabel,
  gradientClass,
  borderClass,
  icon: Icon,
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'flex h-full flex-col rounded-[2rem] border-2 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8',
        borderClass
      )}
    >
      <div
        className={cn(
          'mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg',
          gradientClass
        )}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-2xl font-black text-slate-800 md:text-3xl">{title}</h3>
      <p className="mt-3 flex-1 text-slate-600">{description}</p>
      <Link
        to={to}
        className={cn(
          'mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] hover:opacity-95',
          gradientClass
        )}
      >
        {ctaLabel}
        <ArrowRight className="h-5 w-5" />
      </Link>
    </motion.article>
  );
}
