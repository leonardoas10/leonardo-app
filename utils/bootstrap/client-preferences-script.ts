import { PWA_THEME_COLORS } from '@/utils/theme/pwa-colors';

import {
    DEFAULT_LANGUAGE,
    DEFAULT_THEME,
    LANGUAGE_STORAGE_KEY,
    LEGACY_LANGUAGE_STORAGE_KEY,
    THEME_STORAGE_KEY,
} from '@/utils/bootstrap/constants';

/** Runs synchronously before React hydration to avoid theme/language flash. */
export const CLIENT_PREFERENCES_SCRIPT = `
(function () {
  var doc = document.documentElement;
  try {
    var theme = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (theme !== 'light' && theme !== 'dark') {
      theme = '${DEFAULT_THEME}';
    }
    doc.setAttribute('data-theme', theme);
    document.cookie = '${THEME_STORAGE_KEY}=' + theme + ';path=/;max-age=31536000;SameSite=Lax';
    var themeColor = theme === 'light' ? '${PWA_THEME_COLORS.light}' : '${PWA_THEME_COLORS.dark}';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.remove();
    });
    var themeMeta = document.createElement('meta');
    themeMeta.name = 'theme-color';
    themeMeta.content = themeColor;
    document.head.appendChild(themeMeta);
  } catch (e) {
    doc.setAttribute('data-theme', '${DEFAULT_THEME}');
  }
  try {
    var lang = localStorage.getItem('${LANGUAGE_STORAGE_KEY}');
    if (lang !== 'en' && lang !== 'es') {
      lang = localStorage.getItem('${LEGACY_LANGUAGE_STORAGE_KEY}');
      if (lang === 'en' || lang === 'es') {
        localStorage.setItem('${LANGUAGE_STORAGE_KEY}', lang);
        localStorage.removeItem('${LEGACY_LANGUAGE_STORAGE_KEY}');
      }
    }
    if (lang !== 'en' && lang !== 'es') {
      lang =
        navigator.language &&
        navigator.language.toLowerCase().indexOf('es') === 0
          ? 'es'
          : '${DEFAULT_LANGUAGE}';
      localStorage.setItem('${LANGUAGE_STORAGE_KEY}', lang);
    }
    doc.lang = lang;
    document.cookie = '${LANGUAGE_STORAGE_KEY}=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
  } catch (e) {
    doc.lang = '${DEFAULT_LANGUAGE}';
  }
})();
`.trim();
