export type SectionTitleData = {
    subtitle: string;
    title: string;
    description: string;
};

type Props = {
    data: SectionTitleData;
};

export default function SectionTitle({ data }: Props) {
    return (
        <div className='container section-title' data-aos='fade-up'>
            <span className='subtitle'>{data.subtitle}</span>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    );
}
