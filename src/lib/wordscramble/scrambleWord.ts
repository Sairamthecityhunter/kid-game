/**
 * Shuffle letters for a word scramble. Preserves spaces (e.g. "Ice cream").
 * Tries to produce a layout different from the original when possible.
 */
export function scrambleLetters(text: string): string {
  const chars = [...text];
  if (chars.length <= 1) return text;

  for (let attempt = 0; attempt < 64; attempt++) {
    const shuffled = [...chars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.join('') !== text) {
      return shuffled.join('');
    }
  }

  return [...chars].reverse().join('');
}

export function normalizeAnswer(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function answersMatch(typed: string, answer: string): boolean {
  return normalizeAnswer(typed) === normalizeAnswer(answer);
}
