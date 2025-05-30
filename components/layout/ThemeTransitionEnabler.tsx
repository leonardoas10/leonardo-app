'use client';

import { useEffect } from 'react';

export function ThemeTransitionEnabler() {
    useEffect(() => {
        // Small delay to ensure initial render is complete
        const timer = setTimeout(() => {
            document.body.classList.add('theme-transition-enabled');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // This component doesn't render anything
    return null;
}
