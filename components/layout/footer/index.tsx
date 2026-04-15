import About, { AboutData } from '@/components/layout/footer/about';
import Copyright, { CopyrightData } from '@/components/layout/footer/copyright';
import LinksGroup, { LinksGroupData } from '@/components/layout/footer/links-group';

export type FooterData = {
    about: AboutData;
    copyright: CopyrightData;
    linksGroups: LinksGroupData[];
};

type Props = {
    data: FooterData;
};

export default function Footer({ data }: Props) {
    return (
        <footer id='footer' className='footer dark-background'>
            <div className='container footer-top'>
                <div className='row gy-4'>
                    <About data={data.about} />
                    {data.linksGroups.map((group) => (
                        <LinksGroup key={group.title} data={group} />
                    ))}
                </div>
            </div>
            <div className='container copyright text-center mt-4'>
                <Copyright data={data.copyright} />
            </div>
        </footer>
    );
}
