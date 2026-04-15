'use client';

/**
 * Initialize AOS (Animate On Scroll)
 */
export function initAOS() {
    if (typeof window !== 'undefined' && (window as any).AOS) {
        (window as any).AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }
}

/**
 * Initialize GLightbox
 */
export function initGLightbox() {
    if (typeof window !== 'undefined' && (window as any).GLightbox) {
        (window as any).GLightbox({
            selector: '.glightbox',
        });
    }
}

/**
 * Initialize PureCounter
 */
export function initPureCounter() {
    if (typeof window !== 'undefined' && (window as any).PureCounter) {
        new (window as any).PureCounter();
    }
}

/**
 * Initialize Isotope layout and filters
 */
export function initIsotope() {
    if (typeof window === 'undefined') return;

    const isotopeLayouts = document.querySelectorAll('.isotope-layout');

    isotopeLayouts.forEach((isotopeItem) => {
        const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope: any;

        const container = isotopeItem.querySelector('.isotope-container');
        if (!container) return;

        // Wait for images to load
        if ((window as any).imagesLoaded && (window as any).Isotope) {
            (window as any).imagesLoaded(container, function () {
                initIsotope = new (window as any).Isotope(container, {
                    itemSelector: '.isotope-item',
                    layoutMode: layout,
                    filter: filter,
                    sortBy: sort,
                });
            });

            // Setup filters
            isotopeItem.querySelectorAll('.isotope-filters li').forEach((filterBtn) => {
                filterBtn.addEventListener('click', function () {
                    const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
                    if (activeFilter) {
                        activeFilter.classList.remove('filter-active');
                    }

                    filterBtn.classList.add('filter-active');

                    if (initIsotope) {
                        initIsotope.arrange({
                            filter: filterBtn.getAttribute('data-filter'),
                        });
                    }

                    // Reinit AOS after filter
                    if ((window as any).AOS && typeof (window as any).AOS.init === 'function') {
                        (window as any).AOS.init();
                    }
                });
            });
        }
    });
}

/**
 * Initialize Swiper sliders
 */
export function initSwiper() {
    if (typeof window === 'undefined' || !(window as any).Swiper) return;

    document.querySelectorAll('.init-swiper').forEach((swiperElement) => {
        const configElement = swiperElement.querySelector('.swiper-config');
        if (!configElement) return;

        try {
            const config = JSON.parse(configElement.innerHTML.trim());
            new (window as any).Swiper(swiperElement, config);
        } catch (e) {
            console.error('Failed to initialize Swiper:', e);
        }
    });
}

/**
 * Initialize all client-side libraries
 */
export function initAllClientLibs() {
    initAOS();
    initGLightbox();
    initPureCounter();
    initIsotope();
    initSwiper();
}
