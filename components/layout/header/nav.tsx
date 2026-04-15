'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import LangSwitcher from '@/components/layout/header/lang-switcher';
import type { Language } from '@/lib/i18n';

type NavElement = {
    name: string;
    href: string;
};

export type NavData = {
    elements: NavElement[];
    languages: Language[];
};

type Props = {
    data: NavData;
};

export default function Nav({ data }: Props) {
    const [isMobileNavActive, setIsMobileNavActive] = useState(false);
    const [activeHash, setActiveHash] = useState('');

    const toggleMobileNav = () => {
        setIsMobileNavActive(!isMobileNavActive);
        document.body.classList.toggle('mobile-nav-active');
    };

    const handleNavClick = () => {
        if (isMobileNavActive) {
            setIsMobileNavActive(false);
            document.body.classList.remove('mobile-nav-active');
        }
    };

    // Navmenu Scrollspy
    useEffect(() => {
        const handleScrollSpy = () => {
            const hashLinks = data.elements
                .filter((el) => el.href.includes('#'))
                .map((el) => ({
                    ...el,
                    hash: '#' + el.href.split('#')[1], // 提取 hash 部分
                }));

            for (const element of hashLinks) {
                const section = document.querySelector(element.hash);
                if (!section) continue;

                const position = window.scrollY + 200;
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = (section as HTMLElement).offsetHeight;

                if (position >= sectionTop && position <= sectionTop + sectionHeight) {
                    setActiveHash(element.hash);
                    return;
                }
            }

            setActiveHash('');
        };

        const timer = setTimeout(handleScrollSpy, 100);

        document.addEventListener('scroll', handleScrollSpy);
        window.addEventListener('load', handleScrollSpy);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('scroll', handleScrollSpy);
            window.removeEventListener('load', handleScrollSpy);
        };
    }, [data.elements]);

    useEffect(() => {
        return () => {
            document.body.classList.remove('mobile-nav-active');
        };
    }, []);

    return (
        <nav id='navmenu' className='navmenu d-flex align-items-center'>
            <ul>
                {data.elements.map((element) => {
                    const hasHash = element.href.includes('#');
                    const hash = hasHash ? '#' + element.href.split('#')[1] : '';
                    const isActive = hasHash && activeHash === hash;

                    return (
                        <li key={element.name}>
                            <Link href={element.href} className={isActive ? 'active' : ''} onClick={handleNavClick}>
                                {element.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <LangSwitcher languages={data.languages} />
            <i
                className={`mobile-nav-toggle d-xl-none bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}
                onClick={toggleMobileNav}
            ></i>
        </nav>
    );
}
