'use client';

import { useEffect } from 'react';

/**
 * Correct scrolling position upon page load for URLs containing hash links
 */
export default function HashScroll() {
    useEffect(() => {
        const handleHashScroll = () => {
            if (window.location.hash) {
                const section = document.querySelector(window.location.hash);
                if (section) {
                    setTimeout(() => {
                        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                        window.scrollTo({
                            top: section.getBoundingClientRect().top + window.scrollY - parseInt(scrollMarginTop),
                            behavior: 'smooth',
                        });
                    }, 100);
                }
            }
        };

        handleHashScroll();
        window.addEventListener('load', handleHashScroll);
        return () => window.removeEventListener('load', handleHashScroll);
    }, []);

    return null;
}
