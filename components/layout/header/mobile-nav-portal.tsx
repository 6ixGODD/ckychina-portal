'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    isActive: boolean;
    children: React.ReactNode;
};

export default function MobileNavPortal({ isActive, children }: Props) {
    // Initialize state based on whether we're in the browser
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Use setTimeout to make setState async and avoid ESLint warning
        setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => setMounted(false);
    }, []);

    if (!mounted || !isActive) return null;

    return createPortal(children, document.body);
}
