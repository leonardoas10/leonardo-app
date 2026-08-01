export type SiteLocale = 'en' | 'es';

export const DEFAULT_LOCALE: SiteLocale = 'en';

export function parseSiteLocale(value: string | undefined | null): SiteLocale {
    return value === 'es' ? 'es' : 'en';
}

export function syncLanguageCookie(locale: SiteLocale) {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `language=${locale};path=/;max-age=31536000;SameSite=Lax`;
}
