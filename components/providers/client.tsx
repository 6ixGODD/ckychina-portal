'use client';

// @ts-expect-error `@srexi/purecounterjs` does not provide types :(
import PureCounter from '@srexi/purecounterjs';
import AOS from 'aos';
import GLightbox from 'glightbox';
import imagesLoaded from 'imagesloaded';
import Isotope, { LayoutModes } from 'isotope-layout';
import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import CookieConsent from '@/components/providers/cookie-consent';
import HashScroll from '@/components/ui/hash-scroll';
import Preloader from '@/components/ui/preloader';
import ScrollEffect from '@/components/ui/scroll-effect';
import ScrollTop from '@/components/ui/scroll-top';
import type { Language } from '@/lib/i18n';

type Props = {
    languages: Language[];
};

export default function ClientProviders({ languages }: Props) {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });

        GLightbox({
            selector: '.glightbox',
        });

        new PureCounter();

        const isotopeLayouts = document.querySelectorAll('.isotope-layout');
        isotopeLayouts.forEach((isotopeItem) => {
            const layout = (isotopeItem.getAttribute('data-layout') ?? 'masonry') as LayoutModes;
            const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
            const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

            const container = isotopeItem.querySelector('.isotope-container');
            if (!container) return;

            imagesLoaded(container, function () {
                const iso = new Isotope(container as HTMLElement, {
                    itemSelector: '.isotope-item',
                    layoutMode: layout,
                    filter: filter,
                    sortBy: sort,
                });

                isotopeItem.querySelectorAll('.isotope-filters li').forEach((filterBtn) => {
                    filterBtn.addEventListener('click', function () {
                        const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
                        activeFilter?.classList.remove('filter-active');

                        filterBtn.classList.add('filter-active');

                        iso.arrange({
                            filter: filterBtn.getAttribute('data-filter') ?? '*',
                        });

                        AOS.refresh();
                    });
                });
            });
        });

        document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
            const configElement = swiperElement.querySelector('.swiper-config');
            if (!configElement) return;

            try {
                const config = JSON.parse(configElement.innerHTML.trim());
                new Swiper(swiperElement as HTMLElement, {
                    modules: [Navigation, Pagination, Autoplay],
                    ...config,
                });
            } catch (error) {
                console.error('Failed to initialize Swiper:', error);
            }
        });
    }, []);

    return (
        <>
            <ScrollTop />
            <Preloader />
            <ScrollEffect />
            <HashScroll />
            <CookieConsent languages={languages} />
        </>
    );
}
