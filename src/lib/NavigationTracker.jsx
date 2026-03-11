import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pagesConfig } from '@/pages.config';

export default function NavigationTracker() {
    const location = useLocation();
    const { Pages, mainPage } = pagesConfig;
    const mainPageKey = mainPage ?? Object.keys(Pages)[0];

    // Track navigation (no logging needed for this standalone app)
    useEffect(() => {
        // Navigation tracking can be added here if needed in the future
        // For now, this is a no-op
    }, [location, Pages, mainPageKey]);

    return null;
}
