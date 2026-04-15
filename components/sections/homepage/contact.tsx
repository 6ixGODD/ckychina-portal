import ContactDetail, { ContactDetailData } from '@/components/ui/contact-detail';
import SectionTitle, { SectionTitleData } from '@/components/ui/section-title';

export type ContactData = {
    sectionTitle: SectionTitleData;
    intro: {
        icon: string;
        title: string;
        description: string;
    };
    details: ContactDetailData[];
    cta: {
        title: string;
        description: string;
        button: {
            text: string;
            email: string;
        };
    };
};

type Props = {
    data: ContactData;
};

export default function Contact({ data }: Props) {
    return (
        <section id='contact' className='contact section light-background'>
            <SectionTitle data={data.sectionTitle} />

            <div className='container'>
                <div className='row gy-4'>
                    <div className='col-lg-5'>
                        <div className='info-item'>
                            <div className='info-icon'>
                                <i className={data.intro.icon}></i>
                            </div>
                            <div className='info-content'>
                                <h4>{data.intro.title}</h4>
                                <p>{data.intro.description}</p>
                            </div>
                        </div>

                        <div className='contact-details'>
                            {data.details.map((detail) => (
                                <ContactDetail key={detail.label} data={detail} />
                            ))}
                        </div>
                    </div>

                    <div className='col-lg-7 d-flex align-items-center justify-content-center contact-cta'>
                        <div className='text-center cta-content'>
                            <h4>{data.cta.title}</h4>
                            <p>{data.cta.description}</p>
                            <div className='cta-actions'>
                                <a href={`mailto:${data.cta.button.email}`} className='primary-action'>
                                    {data.cta.button.text}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
