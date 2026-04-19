import type { MemoryCardItem } from '@/data/memoryCardItems';
import { getAllWordsInWordScrambleCategory } from '@/data/wordScrambleData';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export type QuizMcQuestion = {
  /** The answer / clue (emoji + description shown). */
  subject: MemoryCardItem;
  /** Four choices including `subject`, order shuffled. */
  choices: MemoryCardItem[];
};

export function buildQuizQuestion(
  categoryId: string,
  usedItemIds: ReadonlySet<string>
): QuizMcQuestion | null {
  const pool = getAllWordsInWordScrambleCategory(categoryId);
  if (pool.length < 4) return null;

  const unused = pool.filter((x) => !usedItemIds.has(x.id));
  const subjectSource = unused.length > 0 ? unused : pool;
  const subject = subjectSource[Math.floor(Math.random() * subjectSource.length)];

  const wrongPool = shuffle(pool.filter((x) => x.id !== subject.id));
  const wrong = wrongPool.slice(0, 3);
  if (wrong.length < 3) return null;

  const choices = shuffle([subject, ...wrong]);
  return { subject, choices };
}

export const QUIZ_QUESTIONS_PER_ROUND = 10;

export function buildQuizRound(categoryId: string, count = QUIZ_QUESTIONS_PER_ROUND): QuizMcQuestion[] {
  const used = new Set<string>();
  const round: QuizMcQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const q = buildQuizQuestion(categoryId, used);
    if (!q) break;
    used.add(q.subject.id);
    round.push(q);
  }
  return round;
}
