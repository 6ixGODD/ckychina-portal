'use client';

import Link from 'next/link';

export type LinksGroupData = {
    title: string;
    items: {
        name: string;
        href: string;
    }[];
};

type Props = {
    data: LinksGroupData;
};

export default function LinksGroup({ data }: Props) {
    return (
        <div className='col-lg-2 col-6 footer-links'>
            <h4>{data.title}</h4>
            <ul>
                {data.items.map((item) => (
                    <li key={item.name}>
                        <Link href={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
