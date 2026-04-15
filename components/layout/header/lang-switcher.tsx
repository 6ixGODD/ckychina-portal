'use client';

import { usePathname, useRouter } from 'next/navigation';

import { buildPathWithLang, getLangFromPathname, Language, setLanguage } from '@/lib/i18n';

type Props = {
    languages: Language[];
};

export default function LangSwitcher({ languages }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const currentLang = getLangFromPathname(pathname, languages);
    const currentLanguage = languages.find((lang) => lang.code === currentLang);

    function handleSwitch(targetLang: string) {
        const nextPath = buildPathWithLang(pathname, targetLang, languages);
        setLanguage(targetLang);
        router.push(nextPath);
    }

    return (
        <div className='lang'>
            <div className='lang-current'>
                <i className='bi bi-globe2'></i>
                <span className='lang-name'>{currentLanguage?.nativeName || 'Language'}</span>
                <i className='bi bi-chevron-down'></i>
            </div>

            <div className='lang-menu'>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        type='button'
                        className={lang.code === currentLang ? 'active' : ''}
                        onClick={() => handleSwitch(lang.code)}
                    >
                        {lang.nativeName}
                    </button>
                ))}
            </div>
        </div>
    );
}
