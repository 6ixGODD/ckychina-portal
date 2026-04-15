import PortfolioCard, { PortfolioCardData } from '@/components/ui/portfolio-card';
import SectionTitle, { SectionTitleData } from '@/components/ui/section-title';

export type PortfolioData = {
    sectionTitle: SectionTitleData;
    filters: {
        label: string;
        value: string;
    }[];
    items: (PortfolioCardData & {
        filterClass: string;
    })[];
    conclusion: {
        title: string;
        description: string;
        primaryAction: {
            text: string;
            href: string;
        };
        secondaryAction: {
            text: string;
            href: string;
        };
    };
};

type Props = {
    data: PortfolioData;
};

export default function Portfolio({ data }: Props) {
    return (
        <section id='portfolio' className='portfolio section'>
            <SectionTitle data={data.sectionTitle} />

            <div className='container' data-aos='fade-up' data-aos-delay='100'>
                <div
                    className='isotope-layout'
                    data-default-filter='*'
                    data-layout='masonry'
                    data-sort='original-order'
                >
                    {/* Filters */}
                    <ul className='portfolio-filters isotope-filters' data-aos='fade-up' data-aos-delay='200'>
                        {data.filters.map((filter) => (
                            <li
                                key={filter.value}
                                data-filter={filter.value}
                                className={filter.value === '*' ? 'filter-active' : ''}
                            >
                                {filter.label}
                            </li>
                        ))}
                    </ul>

                    {/* Portfolio Items */}
                    <div className='row gy-5 isotope-container' data-aos='fade-up' data-aos-delay='300'>
                        {data.items.map((item) => (
                            <div
                                key={item.title}
                                className={`col-lg-12 portfolio-item isotope-item ${item.filterClass}`}
                            >
                                <PortfolioCard data={item} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conclusion */}
                <div className='portfolio-conclusion' data-aos='fade-up' data-aos-delay='400'>
                    <div className='conclusion-content'>
                        <h4>{data.conclusion.title}</h4>
                        <p>{data.conclusion.description}</p>
                        <div className='conclusion-actions'>
                            <a href={data.conclusion.primaryAction.href} className='primary-action'>
                                {data.conclusion.primaryAction.text}
                                <i className='bi bi-arrow-right'></i>
                            </a>
                            <a href={data.conclusion.secondaryAction.href} className='secondary-action'>
                                {data.conclusion.secondaryAction.text}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
