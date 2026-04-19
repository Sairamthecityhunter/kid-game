import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

/**
 * @param {object} props
 * @param {string} props.badgeLabel
 * @param {React.ReactNode} props.title
 * @param {string} props.description
 * @param {{ label: string, href: string }} [props.primaryAction] - anchor
 * @param {{ label: string, to: string }} [props.primaryLink] - router Link (e.g. /game)
 * @param {{ label: string, to: string }} [props.secondaryAction]
 */
export default function Hero({
  badgeLabel,
  title,
  description,
  primaryAction,
  primaryLink,
  secondaryAction,
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-pink-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-violet-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            {badgeLabel}
          </span>
          <div className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl md:leading-tight">
            {title}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">{description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {primaryLink ? (
              <Button
                asChild
                size="lg"
                className="h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 text-lg font-bold shadow-lg shadow-pink-200/50 hover:opacity-95"
              >
                <Link to={primaryLink.to}>{primaryLink.label}</Link>
              </Button>
            ) : primaryAction ? (
              <Button
                asChild
                size="lg"
                className="h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 text-lg font-bold shadow-lg shadow-pink-200/50 hover:opacity-95"
              >
                <a href={primaryAction.href}>{primaryAction.label}</a>
              </Button>
            ) : null}
            {secondaryAction ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-2 border-slate-200 bg-white/80 px-8 text-lg font-bold text-slate-800 hover:bg-white"
              >
                <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
