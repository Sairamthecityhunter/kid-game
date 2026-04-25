import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Gamepad2, Home, Brain, Sparkles, Shuffle, ListChecks, Zap, Layers, Paintbrush } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinkClass =
  'rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-white/20';

const MATH_PATHS = ['/Home', '/Levels', '/Play', '/Progress', '/Badges'];

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const isLanding = path === '/' || path === '/Landing';
  const isMathSection = MATH_PATHS.some((p) => path === p || path.startsWith(`${p}?`));
  const isMemory =
    path === '/game' ||
    path.startsWith('/game?') ||
    path === '/Memory' ||
    path.startsWith('/Memory?');
  const isWordScramble =
    path === '/wordscramble' || path.startsWith('/wordscramble?');
  const isQuiz = path === '/quiz' || path.startsWith('/quiz?');
  const isReaction = path === '/reaction' || path.startsWith('/reaction?');
  const isPattern = path === '/pattern' || path.startsWith('/pattern?');
  const isColoring = path === '/coloring' || path.startsWith('/coloring?');

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-800 md:text-xl"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-pink-400 to-violet-500 text-white shadow-lg shadow-pink-200/50">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Play &amp; Learn
          </span>
        </Link>

        <nav className="flex max-w-[min(100vw-5rem,42rem)] flex-nowrap items-center justify-end gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:flex-wrap md:gap-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          <Link
            to="/"
            className={cn(
              navLinkClass,
              isLanding ? 'bg-white/80 text-violet-700 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              Home
            </span>
          </Link>
          <Link
            to={createPageUrl('Home')}
            className={cn(
              navLinkClass,
              isMathSection ? 'bg-white/80 text-violet-700 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="h-4 w-4" />
              Math Quest
            </span>
          </Link>
          <Link
            to="/game"
            className={cn(
              navLinkClass,
              isMemory ? 'bg-white/80 text-teal-700 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Brain className="h-4 w-4" />
              Memory
            </span>
          </Link>
          <Link
            to="/wordscramble"
            className={cn(
              navLinkClass,
              isWordScramble ? 'bg-white/80 text-fuchsia-700 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Shuffle className="h-4 w-4" />
              Words
            </span>
          </Link>
          <Link
            to="/quiz"
            className={cn(
              navLinkClass,
              isQuiz ? 'bg-white/80 text-indigo-700 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <ListChecks className="h-4 w-4" />
              Quiz
            </span>
          </Link>
          <Link
            to="/reaction"
            className={cn(
              navLinkClass,
              isReaction ? 'bg-white/80 text-cyan-800 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4" />
              Reflex
            </span>
          </Link>
          <Link
            to="/pattern"
            className={cn(
              navLinkClass,
              isPattern ? 'bg-white/80 text-fuchsia-800 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              Pattern
            </span>
          </Link>
          <Link
            to="/coloring"
            className={cn(
              navLinkClass,
              isColoring ? 'bg-white/80 text-rose-800 shadow-sm' : 'text-slate-700'
            )}
          >
            <span className="flex items-center gap-1.5">
              <Paintbrush className="h-4 w-4" />
              Color
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
