import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.text
 * @param {React.ComponentType<{ className?: string }>} [props.icon]
 * @param {string} [props.emoji] - shown in the badge (large); pairs with or without icon
 * @param {string} props.color - Tailwind gradient classes
 * @param {number} [props.animationDelay]
 */
export default function FeatureCard({ title, text, icon: Icon, emoji, color, animationDelay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay }}
      className="rounded-3xl border-2 border-white/80 bg-white/90 p-6 shadow-lg shadow-slate-200/60 md:p-8"
    >
      <div
        className={cn(
          'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md md:h-16 md:w-16',
          color
        )}
      >
        {emoji ? (
          <span className="text-3xl md:text-4xl" role="img" aria-hidden>
            {emoji}
          </span>
        ) : Icon ? (
          <Icon className="h-7 w-7 md:h-8 md:w-8" />
        ) : null}
      </div>
      <h3 className="text-xl font-bold text-slate-800 md:text-2xl">{title}</h3>
      <p className="mt-2 text-slate-600 md:text-lg">{text}</p>
    </motion.div>
  );
}
