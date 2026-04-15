import LanguageRedirect from '@/components/providers/language-redirect';
import { loadLanguagesJson } from '@/lib/models/languages';

export default async function RootPage() {
    const languages = await loadLanguagesJson();

    return (
        <>
            <div id='preloader'></div>
            <LanguageRedirect languages={languages} />
        </>
    );
}
