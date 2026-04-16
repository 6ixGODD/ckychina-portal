'use client';

import Link from 'next/link';

export type LinksGroupData = {
    title: string;
    items: {
        content: string;
        href?: string;
        icon?: string;
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
                {data.items.map((item, index) => (
                    <li key={index}>
                        {item.href ? (
                            <Link href={item.href} className='d-flex align-items-start'>
                                {item.icon && <i className={`${item.icon} me-2 mt-1`}></i>}
                                <span style={{ whiteSpace: 'pre-line' }}>{item.content}</span>
                            </Link>
                        ) : (
                            <span className='d-flex align-items-start'>
                                {item.icon && <i className={`${item.icon} me-2 mt-1`}></i>}
                                <span style={{ whiteSpace: 'pre-line' }}>{item.content}</span>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
