import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    icon?: string;
};

export default function InfoBox({ children, icon }: Props) {
    return (
        <div className='info-box'>
            {icon && <i className={icon}></i>}
            <div>{children}</div>
        </div>
    );
}
