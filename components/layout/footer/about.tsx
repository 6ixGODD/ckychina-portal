'use client';

import Logo, { LogoData } from '@/components/ui/logo';

export type AboutData = {
    logo: LogoData;
    content: string;
};

type Props = {
    data: AboutData;
};

export default function About({ data }: Props) {
    return (
        <div className='col-lg-5 col-md-12 footer-about'>
            <Logo data={data.logo} />
            <p>{data.content}</p>
        </div>
    );
}
