/**
 * `@xenition/ui/i18n` — a zero-dependency runtime i18n layer for the template
 * SPAs: a provider, a `useT()` hook with `{{var}}` interpolation and English
 * fallback, a self-theming `<LanguageSwitcher/>`, the seven bundled locales, a
 * shared base dictionary of chrome strings, and helpers for localizing
 * SDK-seeded content on the frontend.
 */
export { XenitionI18nProvider, useT, type XenitionI18nProviderProps, type I18nContextValue, type Dict, type Bundle, } from './context';
export { LanguageSwitcher, type LanguageSwitcherProps } from './LanguageSwitcher';
export { LOCALES, LOCALE_CODES, DEFAULT_LOCALE, coerceLocale, localeMeta, type Locale, type LocaleMeta, } from './locales';
export { baseBundle, baseKeys } from './base';
export { pickLocale, localize, type I18nMap } from './content';
//# sourceMappingURL=index.d.ts.map