'use client';

type Props = {
    date: string;
};

export default function LastUpdated({ date }: Props) {
    return <div className='last-updated'>Last Updated: {date}</div>;
}
