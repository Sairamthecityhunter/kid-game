import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import FeatureCard from '@/components/memory/FeatureCard';
import ThemeCategoryCard from '@/components/memory/ThemeCategoryCard';
import MemoryHowToPlay from '@/components/memory/MemoryHowToPlay';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import {
  MEMORY_HOMEPAGE_FEATURES,
  MEMORY_HOMEPAGE_CATEGORIES,
} from '@/data/memoryItems';
import { usePageSeo } from '@/lib/seo/usePageSeo';

function resolveIcon(name) {
  const Icon = LucideIcons[name];
  return Icon ?? LucideIcons.Sparkles;
}

const floatingEmojis = [
  { emoji: '🃏', className: 'left-[4%] top-[20%] text-4xl md:text-5xl', delay: 0 },
  { emoji: '🎯', className: 'right-[6%] top-[28%] text-3xl md:text-4xl', delay: 0.2 },
  { emoji: '🌟', className: 'left-[10%] bottom-[18%] text-3xl md:text-5xl', delay: 0.4 },
  { emoji: '🎨', className: 'right-[12%] bottom-[22%] text-4xl md:text-4xl', delay: 0.15 },
];

export default function LandingPage() {
  usePageSeo({
    title: 'Kids Memory Card Game',
    description:
      'Flip colorful cards and find matching pairs! Animals, vehicles, space, alphabet, fast food, weather, and more—fun memory practice for kids.',
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#fef7ff]">
      <Navbar />

      <main className="flex-1">
        {/* Large hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-100/90 via-amber-50 to-cyan-100/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,70,239,0.22),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(34,211,238,0.18),transparent)]" />

          {floatingEmojis.map(({ emoji, className, delay }) => (
            <motion.span
              key={emoji + className}
              className={`pointer-events-none absolute z-0 select-none opacity-80 ${className}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.85, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.3 + delay, duration: 0.5 },
                y: { delay: 0.8 + delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              aria-hidden
            >
              {emoji}
            </motion.span>
          ))}

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center md:min-h-[82vh] md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-bold text-fuchsia-700 shadow-sm backdrop-blur-sm">
                <span className="text-lg leading-none">🎮</span>
                Play &amp; Learn
              </p>
              <h1 className="text-[2.5rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-6xl md:text-7xl md:leading-[1.05]">
                Games for{' '}
                <span className="bg-gradient-to-r from-fuchsia-600 via-amber-500 to-cyan-600 bg-clip-text text-transparent">
                  curious kids
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-600 sm:text-xl md:text-2xl md:leading-relaxed">
                Match memory cards, follow color patterns, unscramble words, quiz your brain, test
                your reflexes, or try Math Quest—your adventure starts here.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="h-16 min-w-[200px] rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-500 to-amber-500 px-10 text-lg font-black text-white shadow-xl shadow-fuchsia-300/40 transition hover:scale-[1.02] hover:opacity-95"
                >
                  <Link to="/game">Memory game</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-2xl border-2 border-violet-200/90 bg-white/90 px-8 text-base font-bold text-violet-800 shadow-sm backdrop-blur-sm hover:bg-violet-50"
                >
                  <Link to="/wordscramble">Word scramble</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-2xl border-2 border-indigo-200/90 bg-white/90 px-8 text-base font-bold text-indigo-800 shadow-sm backdrop-blur-sm hover:bg-indigo-50"
                >
                  <Link to="/quiz">Picture quiz</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-2xl border-2 border-cyan-200/90 bg-white/90 px-8 text-base font-bold text-cyan-900 shadow-sm backdrop-blur-sm hover:bg-cyan-50"
                >
                  <Link to="/reaction">Reflex game</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-2xl border-2 border-fuchsia-200/90 bg-white/90 px-8 text-base font-bold text-fuchsia-900 shadow-sm backdrop-blur-sm hover:bg-fuchsia-50"
                >
                  <Link to="/pattern">Pattern memory</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-2xl border-2 border-slate-200/80 bg-white/90 px-8 text-base font-bold text-slate-700 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  <Link to="#themes">Pick a theme</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              {['🐻', '🍕', '🌈', '📚'].map((e, i) => (
                <motion.span
                  key={e}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-md ring-1 ring-white/50 backdrop-blur-sm md:h-16 md:w-16 md:text-3xl"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    delay: i * 0.12,
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-fuchsia-100/80 bg-gradient-to-b from-white to-violet-50/50 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-3xl font-black text-slate-800 md:text-4xl"
            >
              Why you&apos;ll love it
            </motion.h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-lg text-slate-600">
              Quick rounds, happy colors, and a little brain boost every time you play.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {MEMORY_HOMEPAGE_FEATURES.map((f, i) => (
                <FeatureCard
                  key={f.title}
                  title={f.title}
                  text={f.text}
                  emoji={f.emoji}
                  icon={resolveIcon(f.icon)}
                  color={f.color}
                  animationDelay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How to play */}
        <section className="border-y border-amber-100/80 bg-gradient-to-b from-cyan-50/40 via-white to-fuchsia-50/30">
          <MemoryHowToPlay variant="full" />
        </section>

        {/* Theme categories */}
        <section id="themes" className="scroll-mt-24 bg-gradient-to-b from-amber-50/80 via-white to-cyan-50/40 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-3xl font-black text-slate-800 md:text-4xl"
            >
              Pick a card category
            </motion.h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-slate-600">
              Nineteen colorful themes—vehicles, toys, dinosaurs, numbers, music, and more. Each deck
              has its own cheerful cards.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-slate-500">
              These same topics appear in Word Scramble, Picture Quiz, Reflex, and Pattern memory—open
              any game from the menu and choose a matching category.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MEMORY_HOMEPAGE_CATEGORIES.map((cat, i) => (
                <ThemeCategoryCard
                  key={cat.id}
                  categoryId={cat.id}
                  title={cat.title}
                  description={cat.description}
                  emoji={cat.emoji}
                  gradientClass={cat.gradientClass}
                  borderClass={cat.borderClass}
                  delay={i * 0.06}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button
                asChild
                size="lg"
                className="h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 font-bold text-white shadow-lg"
              >
                <Link to="/game?category=animals">Start playing</Link>
              </Button>
              <p className="mt-4 text-sm text-slate-500">
                Prefer numbers?{' '}
                <Link
                  to={createPageUrl('Home')}
                  className="font-semibold text-violet-600 underline-offset-2 hover:underline"
                >
                  Try Math Quest
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
