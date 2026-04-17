'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
    params: { lang: string };
};

export default function LangNotFound({ params }: Props) {
    const router = useRouter();
    const lang = params?.lang || 'en';

    useEffect(() => {
        router.replace(`/${lang}/404`);
    }, [router, lang]);

    return (
        <>
            <div id='preloader'></div>
        </>
    );
}
