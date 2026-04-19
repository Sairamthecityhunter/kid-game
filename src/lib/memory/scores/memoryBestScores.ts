const STORAGE_KEY = 'memory-game-best-moves';

/** category + difficulty → lowest move count to win */
export type MemoryBestScoreMap = Record<string, number>;

function makeKey(categoryId: string, difficulty: string): string {
  return `${categoryId}:${difficulty}`;
}

function loadMap(): MemoryBestScoreMap {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    const out: MemoryBestScoreMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'number' && Number.isFinite(v) && v > 0) {
        out[k] = Math.floor(v);
      }
    }
    return out;
  } catch {
    return {};
  }
}

function saveMap(map: MemoryBestScoreMap): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* quota or private mode */
  }
}

/** Best (lowest) move count for this category + difficulty, or `null` if none saved. */
export function getBestMoves(categoryId: string, difficulty: string): number | null {
  const map = loadMap();
  const v = map[makeKey(categoryId, difficulty)];
  return v === undefined ? null : v;
}

/**
 * If `moves` is lower than the stored best (or no best yet), saves it.
 * Returns the current best to display and whether this win set a new record.
 */
export function saveBestIfBetter(
  categoryId: string,
  difficulty: string,
  moves: number
): { bestMoves: number; improved: boolean } {
  if (!Number.isFinite(moves) || moves < 1) {
    const existing = getBestMoves(categoryId, difficulty);
    return {
      bestMoves: existing ?? moves,
      improved: false,
    };
  }

  const key = makeKey(categoryId, difficulty);
  const map = loadMap();
  const prev = map[key];
  const nextMoves = Math.floor(moves);

  if (prev === undefined || nextMoves < prev) {
    map[key] = nextMoves;
    saveMap(map);
    return { bestMoves: nextMoves, improved: true };
  }

  return { bestMoves: prev, improved: false };
}

export type MemoryBestEntry = {
  categoryId: string;
  difficulty: string;
  moves: number;
};

/** All saved memory bests, sorted by fewest moves first (for scoreboards). */
export function listMemoryBestScores(limit = 12): MemoryBestEntry[] {
  const map = loadMap();
  return Object.entries(map)
    .map(([key, moves]) => {
      const colon = key.indexOf(':');
      const categoryId = colon >= 0 ? key.slice(0, colon) : key;
      const difficulty = colon >= 0 ? key.slice(colon + 1) : '';
      return { categoryId, difficulty, moves };
    })
    .filter((e) => e.categoryId && e.difficulty && e.moves > 0)
    .sort((a, b) => a.moves - b.moves || a.categoryId.localeCompare(b.categoryId))
    .slice(0, limit);
}
