'use client';

export type PageTitleData = {
    breadcrumbs: {
        label: string;
        href?: string;
    }[];
    title: string;
    description: string;
};

type Props = {
    data: PageTitleData;
};

export default function PageTitle({ data }: Props) {
    return (
        <div className='page-title'>
            <div className='breadcrumbs'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>
                        {data.breadcrumbs.map((crumb, index) => {
                            const isLast = index === data.breadcrumbs.length - 1;
                            return (
                                <li
                                    key={index}
                                    className={`breadcrumb-item ${isLast ? 'active current' : ''}`}
                                    {...(isLast && { 'aria-current': 'page' })}
                                >
                                    {crumb.href ? (
                                        <a href={crumb.href}>
                                            {index === 0 && <i className='bi bi-house'></i>} {crumb.label}
                                        </a>
                                    ) : (
                                        crumb.label
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>

            <div className='title-wrapper'>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
        </div>
    );
}
