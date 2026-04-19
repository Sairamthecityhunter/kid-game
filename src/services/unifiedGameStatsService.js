/**
 * Cross-game stats for the home scoreboard (localStorage).
 * Math Quest uses playerProgressService; memory uses memoryBestScores.
 */

const STORAGE_KEY = 'kids_games_unified_stats_v1';

const defaults = () => ({
  wordScramble: { attempts: 0, correct: 0 },
  quiz: { roundsCompleted: 0, bestScore: 0, bestOutOf: 0, lastTotal: 0 },
  reaction: { bestRunScore: 0, bestSingleMs: null },
  pattern: { bestChain: 0 },
});

export function loadUnifiedStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    const d = defaults();
    return {
      wordScramble: { ...d.wordScramble, ...parsed.wordScramble },
      quiz: { ...d.quiz, ...parsed.quiz },
      reaction: { ...d.reaction, ...parsed.reaction },
      pattern: { ...d.pattern, ...parsed.pattern },
    };
  } catch {
    return defaults();
  }
}

function saveUnifiedStats(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota */
  }
}

/** Call after each word check (correct or not). */
export function recordWordScrambleAttempt(wasCorrect) {
  const s = loadUnifiedStats();
  s.wordScramble.attempts += 1;
  if (wasCorrect) s.wordScramble.correct += 1;
  saveUnifiedStats(s);
}

/** Call when a quiz round finishes (phase done). */
export function recordQuizRoundComplete(score, questionCount) {
  const s = loadUnifiedStats();
  s.quiz.roundsCompleted += 1;
  s.quiz.lastTotal = questionCount;
  if (score > s.quiz.bestScore) {
    s.quiz.bestScore = score;
    s.quiz.bestOutOf = questionCount;
  }
  saveUnifiedStats(s);
}

/** Call when reaction score increases (correct tap). */
export function recordReactionProgress(currentRunScore, tapMs) {
  const s = loadUnifiedStats();
  if (currentRunScore > s.reaction.bestRunScore) {
    s.reaction.bestRunScore = currentRunScore;
  }
  if (tapMs != null && Number.isFinite(tapMs)) {
    const ms = Math.round(tapMs);
    if (s.reaction.bestSingleMs == null || ms < s.reaction.bestSingleMs) {
      s.reaction.bestSingleMs = ms;
    }
  }
  saveUnifiedStats(s);
}

/** Call when pattern longest chain improves. */
export function recordPatternBestChain(chainLength) {
  if (!Number.isFinite(chainLength) || chainLength < 1) return;
  const n = Math.floor(chainLength);
  const s = loadUnifiedStats();
  if (n > s.pattern.bestChain) {
    s.pattern.bestChain = n;
    saveUnifiedStats(s);
  }
}
