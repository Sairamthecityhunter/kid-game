/**
 * Memory game: category metadata, homepage copy, and helpers.
 */

import { MEMORY_CATEGORY_IDS } from './memoryCategoryDecks';

/** Human-readable labels for the memory game header and picker. */
export const MEMORY_CATEGORY_LABELS = {
  animals: 'Animals',
  food: 'Food',
  nature: 'Nature',
  school: 'School',
  vehicles: 'Vehicles',
  household: 'Household',
  clothing: 'Clothing',
  sports: 'Sports',
  'colors-shapes': 'Colors & shapes',
  numbers: 'Numbers',
  alphabet: 'Alphabet',
  space: 'Space',
  jobs: 'Jobs',
  music: 'Music',
  toys: 'Toys',
  dinosaurs: 'Dinosaurs',
  bugs: 'Bugs',
  'fast-food': 'Fast food',
  weather: 'Weather',
};

export function isValidMemoryCategory(id) {
  return typeof id === 'string' && MEMORY_CATEGORY_IDS.includes(/** @type {any} */ (id));
}

/** @deprecated Use isValidMemoryCategory */
export function isValidTheme(id) {
  return isValidMemoryCategory(id);
}

/** @deprecated Use MEMORY_CATEGORY_LABELS */
export const MEMORY_THEME_LABELS = MEMORY_CATEGORY_LABELS;

/** Copy for `/game` only (not shown on the site homepage). */
export const MEMORY_GAME_BADGE = 'Flip · Match · Win';
export const MEMORY_GAME_HEADING_BEFORE = 'Kids Memory';
export const MEMORY_GAME_HEADING_ACCENT = 'Card Game';
export const MEMORY_GAME_SUBTITLE = 'Play, match, and train your brain with fun cards';
export const MEMORY_GAME_INSTRUCTIONS =
  'Flip the cards and find all the pairs. How few moves can you use?';

/** Homepage — three feature cards (emoji + lucide icon key optional). */
export const MEMORY_HOMEPAGE_FEATURES = [
  {
    title: 'Improves memory',
    text: 'Matching pairs strengthens focus and recall—the sneaky fun kind of practice.',
    emoji: '🧠',
    icon: 'Brain',
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Fun for kids',
    text: 'Big cards, bouncy colors, and silly pictures keep smiles on every turn.',
    emoji: '🎉',
    icon: 'Smile',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Easy to play',
    text: 'Tap to flip, find two that match, and celebrate—no reading required.',
    emoji: '✨',
    icon: 'Sparkles',
    color: 'from-amber-400 to-orange-500',
  },
];

/** Homepage — category tiles (link to ?category=...). */
export const MEMORY_HOMEPAGE_CATEGORIES = [
  {
    id: 'animals',
    title: 'Animals',
    description: 'Cuddly creatures and wild friends—roar, meow, and match!',
    emoji: '🦁',
    gradientClass: 'from-amber-400 via-orange-400 to-rose-500',
    borderClass: 'border-amber-200/90',
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Yummy snacks and treats—flip for a delicious match.',
    emoji: '🍕',
    gradientClass: 'from-lime-400 via-emerald-400 to-teal-500',
    borderClass: 'border-emerald-200/90',
  },
  {
    id: 'nature',
    title: 'Nature',
    description: 'Sunshine, plants, and sky—explore the outdoors on every card.',
    emoji: '🌿',
    gradientClass: 'from-sky-400 via-cyan-400 to-teal-500',
    borderClass: 'border-sky-200/90',
  },
  {
    id: 'school',
    title: 'School',
    description: 'Books, pencils, and backpacks—learning looks this good.',
    emoji: '🎒',
    gradientClass: 'from-indigo-400 via-violet-500 to-fuchsia-500',
    borderClass: 'border-violet-200/90',
  },
  {
    id: 'vehicles',
    title: 'Vehicles',
    description: 'Cars, trains, planes—vroom and chug to a perfect pair.',
    emoji: '🚗',
    gradientClass: 'from-slate-500 via-blue-500 to-cyan-400',
    borderClass: 'border-blue-200/90',
  },
  {
    id: 'household',
    title: 'Household',
    description: 'Sofas, lamps, and cozy rooms—match what lives at home.',
    emoji: '🛋️',
    gradientClass: 'from-amber-500 via-orange-400 to-rose-400',
    borderClass: 'border-orange-200/90',
  },
  {
    id: 'clothing',
    title: 'Clothing',
    description: 'Hats, shoes, and snazzy outfits—fashion memory fun.',
    emoji: '👕',
    gradientClass: 'from-fuchsia-500 via-pink-400 to-rose-400',
    borderClass: 'border-pink-200/90',
  },
  {
    id: 'sports',
    title: 'Sports',
    description: 'Balls, rackets, and trophies—score a matching win!',
    emoji: '⚽',
    gradientClass: 'from-green-500 via-lime-400 to-emerald-500',
    borderClass: 'border-lime-200/90',
  },
  {
    id: 'colors-shapes',
    title: 'Colors & shapes',
    description: 'Hearts, squares, and rainbow blocks—spot the twin design.',
    emoji: '🎨',
    gradientClass: 'from-violet-500 via-fuchsia-400 to-pink-500',
    borderClass: 'border-fuchsia-200/90',
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Digits and keycaps—count your way to every match.',
    emoji: '🔢',
    gradientClass: 'from-cyan-500 via-sky-400 to-indigo-500',
    borderClass: 'border-cyan-200/90',
  },
  {
    id: 'alphabet',
    title: 'Alphabet',
    description: 'Letter circles from A to L—ABC memory power!',
    emoji: '🔤',
    gradientClass: 'from-yellow-400 via-amber-400 to-orange-500',
    borderClass: 'border-amber-200/90',
  },
  {
    id: 'space',
    title: 'Space',
    description: 'Rockets, moons, and aliens—blast off to matching pairs.',
    emoji: '🚀',
    gradientClass: 'from-indigo-600 via-purple-600 to-slate-800',
    borderClass: 'border-indigo-200/90',
  },
  {
    id: 'jobs',
    title: 'Jobs',
    description: 'Doctors, chefs, builders—thank-you heroes on every card.',
    emoji: '👩‍⚕️',
    gradientClass: 'from-teal-500 via-emerald-500 to-green-600',
    borderClass: 'border-teal-200/90',
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Guitars, drums, and dancing notes—tap the same tune twice.',
    emoji: '🎵',
    gradientClass: 'from-purple-500 via-violet-400 to-fuchsia-500',
    borderClass: 'border-purple-200/90',
  },
  {
    id: 'toys',
    title: 'Toys',
    description: 'Teddies, dice, and games—playroom pairs for big smiles.',
    emoji: '🧸',
    gradientClass: 'from-pink-500 via-rose-400 to-orange-400',
    borderClass: 'border-rose-200/90',
  },
  {
    id: 'dinosaurs',
    title: 'Dinosaurs',
    description: 'T-Rex, long-necks, fossils—prehistoric matching adventure.',
    emoji: '🦖',
    gradientClass: 'from-lime-600 via-green-600 to-emerald-700',
    borderClass: 'border-green-200/90',
  },
  {
    id: 'bugs',
    title: 'Bugs',
    description: 'Beetles, bees, and butterflies—creepy-crawly cute pairs.',
    emoji: '🐞',
    gradientClass: 'from-lime-400 via-green-500 to-teal-500',
    borderClass: 'border-teal-200/90',
  },
  {
    id: 'fast-food',
    title: 'Fast food',
    description: 'Burgers, fries, and shakes—quick bites, lasting matches.',
    emoji: '🍔',
    gradientClass: 'from-red-500 via-orange-500 to-amber-500',
    borderClass: 'border-orange-200/90',
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'Sun, rain, snow, and wind—forecast says “match!”',
    emoji: '⛅',
    gradientClass: 'from-sky-400 via-blue-400 to-indigo-500',
    borderClass: 'border-blue-200/90',
  },
];
