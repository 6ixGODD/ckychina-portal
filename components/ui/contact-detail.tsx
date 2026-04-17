'use client';

export type ContactDetailData = {
    icon: string;
    label: string;
    value: string;
};

type Props = {
    data: ContactDetailData;
};

export default function ContactDetail({ data }: Props) {
    return (
        <div className='detail-item'>
            <div className='detail-icon'>
                <i className={data.icon}></i>
            </div>
            <div className='detail-content'>
                <span className='detail-label'>{data.label}</span>
                <span className='detail-value'>{data.value}</span>
            </div>
        </div>
    );
}
