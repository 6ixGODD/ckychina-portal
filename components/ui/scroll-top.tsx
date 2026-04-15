'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 100);
        };

        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility);
        document.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            document.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <a
            href='#'
            id='scroll-top'
            className={`scroll-top d-flex align-items-center justify-content-center ${isVisible ? 'active' : ''}`}
            onClick={scrollToTop}
        >
            <i className='bi bi-arrow-up-short'></i>
        </a>
    );
}
