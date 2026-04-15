'use client';

export type CopyrightData = {
    year: number;
    holder: string;
    text: string;
};

type Props = {
    data: CopyrightData;
};

export default function Copyright({ data }: Props) {
    return (
        <p>
            © <span>{data.year}</span> <strong className='px-1 sitename'>{data.holder}</strong> <span>{data.text}</span>
        </p>
    );
}
