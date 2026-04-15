'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(() => document.readyState !== 'complete');

    useEffect(() => {
        if (!isLoading) return;

        const handleLoad = () => setIsLoading(false);

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, [isLoading]);

    if (!isLoading) return null;

    return <div id='preloader'></div>;
}
