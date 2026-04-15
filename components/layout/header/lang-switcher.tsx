'use client';

import { usePathname, useRouter } from 'next/navigation';

import { buildPathWithLang, extractLangFromPath, Language } from '@/lib/i18n';

type Props = {
    languages: Language[];
    onSwitchAction?: (lang: string) => void;
};

export default function LangSwitcher({ languages, onSwitchAction }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const currentLang = extractLangFromPath(pathname);

    function handleSwitch(lang: string) {
        const nextPath = buildPathWithLang(pathname, lang);
        onSwitchAction?.(lang);
        router.push(nextPath);
    }

    const currentLanguage = languages.find((lang) => lang.code === currentLang)?.name || 'Language';

    return (
        <div className='lang'>
            <div className='lang-current'>
                <i className='bi bi-globe2'></i>
                <span>{currentLanguage}</span>
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
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
