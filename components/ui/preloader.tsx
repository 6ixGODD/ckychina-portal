'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            // Use setTimeout to avoid synchronous setState in effect (ESLint compliant)
            setTimeout(handleLoad, 0);
        } else {
            // Page still loading, add event listener
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (!isLoading) return null;

    return <div id='preloader'></div>;
}
