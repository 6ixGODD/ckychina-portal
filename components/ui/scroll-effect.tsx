'use client';

import { useEffect } from 'react';

/**
 * Apply .scrolled class to the body as the page is scrolled down
 */
export default function ScrollEffect() {
    useEffect(() => {
        const toggleScrolled = () => {
            const selectHeader = document.querySelector('#header');
            if (
                !selectHeader?.classList.contains('scroll-up-sticky') &&
                !selectHeader?.classList.contains('sticky-top') &&
                !selectHeader?.classList.contains('fixed-top')
            ) {
                return;
            }

            if (window.scrollY > 100) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        };

        toggleScrolled();
        document.addEventListener('scroll', toggleScrolled);
        return () => document.removeEventListener('scroll', toggleScrolled);
    }, []);

    return null;
}
