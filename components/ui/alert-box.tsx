'use client';

import type { ReactNode } from 'react';

type Props = {
    title?: string;
    children: ReactNode;
    icon?: string;
};

export default function AlertBox({ title, children, icon = 'bi bi-exclamation-triangle' }: Props) {
    return (
        <div className='alert-box'>
            <i className={icon}></i>
            <div className='alert-content'>
                {title && <h5>{title}</h5>}
                {children}
            </div>
        </div>
    );
}
