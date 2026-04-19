/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Landing from './pages/Landing';
import Home from './pages/Home';
import Levels from './pages/Levels';
import Memory from './pages/Memory';
import Game from './pages/Game';
import Play from './pages/Play';
import Progress from './pages/Progress';
import Badges from './pages/Badges';
import WordScramble from './pages/WordScramble';
import Quiz from './pages/Quiz';
import Reaction from './pages/Reaction';
import Pattern from './pages/Pattern';


export const PAGES = {
    "Landing": Landing,
    "Home": Home,
    "Levels": Levels,
    "Memory": Memory,
    "game": Game,
    "wordscramble": WordScramble,
    "quiz": Quiz,
    "reaction": Reaction,
    "pattern": Pattern,
    "Play": Play,
    "Progress": Progress,
    "Badges": Badges,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
};