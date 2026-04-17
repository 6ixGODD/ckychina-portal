'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        if (document.readyState === 'complete') {
            setTimeout(() => {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 600);
            }, 0);
            return;
        }

        const handleLoad = () => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 600);
        };

        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`modern-preloader ${isAnimatingOut ? 'fade-out' : ''}`}>
            <div className='preloader-content'>
                <div className='spinner'></div>
            </div>
        </div>
    );
}
