'use client';

import Image from 'next/image';
import Link from 'next/link';

export type LogoData = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type Props = {
    href?: string;
    data: LogoData;
};

export default function Logo({ href = '/', data }: Props) {
    return (
        <Link href={href} className='logo d-flex align-items-center'>
            <Image src={data.src} alt={data.alt} width={data.width} height={data.height} loading={'eager'} />
        </Link>
    );
}
