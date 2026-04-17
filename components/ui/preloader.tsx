'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const minDisplayTime = 800;
        let isPageLoaded = false;
        let hasMinTimePassed = false;

        const tryHide = () => {
            if (isPageLoaded && hasMinTimePassed) {
                setIsLoading(false);
            }
        };

        const minTimer = setTimeout(() => {
            hasMinTimePassed = true;
            tryHide();
        }, minDisplayTime);

        const handleLoad = () => {
            isPageLoaded = true;
            tryHide();
        };

        if (document.readyState === 'complete') {
            isPageLoaded = true;
            tryHide();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearTimeout(minTimer);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    if (!isLoading) return null;

    return <div id='preloader'></div>;
}
