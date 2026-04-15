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
    const [activeSection, setActiveSection] = useState('');

    // Mobile nav toggle
    const toggleMobileNav = () => {
        setIsMobileNavActive(!isMobileNavActive);
        document.body.classList.toggle('mobile-nav-active');
    };

    // Close mobile nav when clicking on a link
    const handleNavClick = () => {
        if (isMobileNavActive) {
            setIsMobileNavActive(false);
            document.body.classList.remove('mobile-nav-active');
        }
    };

    // Navmenu Scrollspy
    useEffect(() => {
        const handleScrollSpy = () => {
            const navLinks = document.querySelectorAll('.navmenu a');

            navLinks.forEach((navLink) => {
                const link = navLink as HTMLAnchorElement;
                if (!link.hash) return;

                const section = document.querySelector(link.hash);
                if (!section) return;

                const position = window.scrollY + 200;
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = (section as HTMLElement).offsetHeight;

                if (position >= sectionTop && position <= sectionTop + sectionHeight) {
                    setActiveSection(link.hash);
                }
            });
        };

        handleScrollSpy();
        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    // Cleanup mobile nav on unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('mobile-nav-active');
        };
    }, []);

    return (
        <nav id='navmenu' className='navmenu d-flex align-items-center'>
            <ul>
                {data.elements.map((element) => (
                    <li key={element.name}>
                        <Link
                            href={element.href}
                            className={activeSection === element.href ? 'active' : ''}
                            onClick={handleNavClick}
                        >
                            {element.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <LangSwitcher languages={data.languages} />

            <i
                className={`mobile-nav-toggle d-xl-none bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}
                onClick={toggleMobileNav}
            ></i>
        </nav>
    );
}
