import NotFoundRedirect from '@/components/providers/not-found-redirect';
import { loadLanguagesJson } from '@/lib/models/languages';

export default async function RootNotFound() {
    const languages = await loadLanguagesJson();

    return (
        <>
            <div id='preloader'></div>
            <NotFoundRedirect languages={languages} />
        </>
    );
}
