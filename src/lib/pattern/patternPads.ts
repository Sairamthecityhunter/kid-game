import type { CSSProperties } from 'react';

export type PatternPad = {
  id: number;
  name: string;
  /** Idle / base surface */
  baseClass: string;
  /** Extra classes when lit during playback or tap feedback */
  litClass: string;
  /** Optional inline colors (theme packs). */
  style?: CSSProperties;
};

export const PATTERN_PADS: PatternPad[] = [
  {
    id: 0,
    name: 'Cherry',
    baseClass: 'bg-rose-400 border-rose-600 shadow-rose-200/80',
    litClass: 'bg-rose-300 ring-4 ring-rose-100 brightness-110 scale-105',
  },
  {
    id: 1,
    name: 'Lime',
    baseClass: 'bg-lime-400 border-lime-700 shadow-lime-200/80',
    litClass: 'bg-lime-300 ring-4 ring-lime-100 brightness-110 scale-105',
  },
  {
    id: 2,
    name: 'Sunny',
    baseClass: 'bg-amber-400 border-amber-600 shadow-amber-200/80',
    litClass: 'bg-amber-300 ring-4 ring-amber-100 brightness-110 scale-105',
  },
  {
    id: 3,
    name: 'Ocean',
    baseClass: 'bg-sky-500 border-sky-700 shadow-sky-200/80',
    litClass: 'bg-sky-400 ring-4 ring-sky-100 brightness-110 scale-105',
  },
  {
    id: 4,
    name: 'Grape',
    baseClass: 'bg-violet-500 border-violet-800 shadow-violet-200/80',
    litClass: 'bg-violet-400 ring-4 ring-violet-100 brightness-110 scale-105',
  },
  {
    id: 5,
    name: 'Bubble',
    baseClass: 'bg-pink-400 border-pink-600 shadow-pink-200/80',
    litClass: 'bg-pink-300 ring-4 ring-pink-100 brightness-110 scale-105',
  },
];

export const PATTERN_PAD_COUNT = PATTERN_PADS.length;

/** Active pads are always the first `count` entries (ids 0 … count-1). */
export function getActivePads(count: number): PatternPad[] {
  const n = Math.max(1, Math.min(count, PATTERN_PADS.length));
  return PATTERN_PADS.slice(0, n);
}

export function randomPadIndex(padCount: number): number {
  const n = Math.max(1, Math.min(padCount, PATTERN_PADS.length));
  return Math.floor(Math.random() * n);
}
