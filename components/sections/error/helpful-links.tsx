export type HelpfulLinkItem = {
    icon: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
};

export type HelpfulLinksData = {
    title: string;
    links: HelpfulLinkItem[];
};

type Props = {
    data: HelpfulLinksData;
};

export default function HelpfulLinks({ data }: Props) {
    return (
        <div className='helpful-links' data-aos='fade-up' data-aos-delay='500'>
            <div className='row justify-content-center'>
                <div className='col-lg-10'>
                    <h3 className='links-title'>{data.title}</h3>

                    <div className='row'>
                        {data.links.map((link, index) => (
                            <div
                                key={link.title}
                                className='col-md-4'
                                data-aos='fade-up'
                                data-aos-delay={600 + index * 100}
                            >
                                <div className='link-item'>
                                    <div className='link-icon'>
                                        <i className={link.icon}></i>
                                    </div>
                                    <h4>{link.title}</h4>
                                    <p>{link.description}</p>
                                    <a href={link.linkHref} className='link-cta'>
                                        {link.linkText} <i className='bi bi-arrow-right'></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
