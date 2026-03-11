/**
 * Player Progress Service
 * Manages player progress data using localStorage
 */

const STORAGE_KEY = 'math_quest_player_progress';

const defaultProgress = {
  player_name: '',
  total_stars: 0,
  total_points: 0,
  current_level: 1,
  completed_levels: [],
  badges: [],
  games_played: 0,
  correct_answers: 0,
  streak: 0,
  best_streak: 0
};

/**
 * Get player progress from localStorage
 * @returns {Object|null} Player progress object or null if not found
 */
export const getPlayerProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Error loading player progress:', error);
    return null;
  }
};

/**
 * Save player progress to localStorage
 * @param {Object} progress - Player progress object
 * @returns {Object} Saved progress
 */
export const savePlayerProgress = (progress) => {
  try {
    const progressToSave = {
      ...defaultProgress,
      ...progress,
      // Ensure arrays are properly initialized
      completed_levels: progress.completed_levels || [],
      badges: progress.badges || []
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToSave));
    return progressToSave;
  } catch (error) {
    console.error('Error saving player progress:', error);
    throw error;
  }
};

/**
 * Create a new player progress
 * @param {Object} data - Initial player data
 * @returns {Object} Created player progress
 */
export const createPlayerProgress = (data) => {
  const newProgress = {
    ...defaultProgress,
    ...data,
    completed_levels: data.completed_levels || [],
    badges: data.badges || []
  };
  return savePlayerProgress(newProgress);
};

/**
 * Update player progress
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated player progress
 */
export const updatePlayerProgress = (updates) => {
  const current = getPlayerProgress();
  if (!current) {
    throw new Error('No player progress found. Please create a player first.');
  }
  
  const updated = {
    ...current,
    ...updates,
    // Merge arrays properly
    completed_levels: updates.completed_levels !== undefined 
      ? updates.completed_levels 
      : current.completed_levels,
    badges: updates.badges !== undefined 
      ? updates.badges 
      : current.badges
  };
  
  return savePlayerProgress(updated);
};

/**
 * List player progress
 * @returns {Array} Array containing player progress or empty array
 */
export const listPlayerProgress = () => {
  const progress = getPlayerProgress();
  return progress ? [progress] : [];
};

/**
 * Delete player progress
 */
export const deletePlayerProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting player progress:', error);
    throw error;
  }
};
