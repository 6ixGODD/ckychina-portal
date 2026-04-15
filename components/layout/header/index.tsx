import Nav, { NavData } from '@/components/layout/header/nav';
import Logo, { LogoData } from '@/components/ui/logo';

export type HeaderData = {
    logo: LogoData;
    nav: NavData;
};

type Props = {
    data: HeaderData;
};

export default function Header({ data }: Props) {
    return (
        <header id='header' className='header d-flex align-items-center fixed-top'>
            <div
                className='
                container-fluid
                container-xl
                position-relative
                d-flex
                align-items-center
                justify-content-between'
            >
                <Logo data={data.logo} />
            </div>
            <Nav data={data.nav} />
        </header>
    );
}
