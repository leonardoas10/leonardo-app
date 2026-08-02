export const CLIENT_THEME_COLOR_META_ID = 'client-theme-color';

/** Upsert a client-owned theme-color meta without touching Next.js head nodes. */
export function setClientThemeColor(content: string): void {
    const existing = document.getElementById(CLIENT_THEME_COLOR_META_ID);
    if (existing instanceof HTMLMetaElement) {
        existing.content = content;
        return;
    }
    const meta = document.createElement('meta');
    meta.id = CLIENT_THEME_COLOR_META_ID;
    meta.name = 'theme-color';
    meta.content = content;
    document.head.appendChild(meta);
}
