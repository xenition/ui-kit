/**
 * `@xenition/ui/i18n` — a tiny, zero-dependency translation layer for the
 * template SPAs. No i18next, no network: seven languages are bundled at build
 * time and switched at runtime. A template wraps its root in
 * `<XenitionI18nProvider bundle={...}>`, reads strings with `useT().t('key')`,
 * and drops in `<LanguageSwitcher/>`.
 *
 * Resolution for `t(key)`: the template's own bundle wins, then the shared base
 * bundle, each tried in the active locale then English, then the raw key — so a
 * missing translation degrades to English and never to a blank.
 */
import * as React from 'react';
import { LOCALES, type Locale } from './locales';
/** A flat map of translation key → string, for one locale. */
export type Dict = Record<string, string>;
/** A set of dictionaries keyed by locale. English should always be present. */
export type Bundle = Partial<Record<Locale, Dict>>;
export interface I18nContextValue {
    /** Translate a key, interpolating `{{var}}` placeholders from `vars`. */
    t: (key: string, vars?: Record<string, string | number>) => string;
    /** The active locale. */
    locale: Locale;
    /** Switch language (persists to localStorage, updates <html lang/dir>). */
    setLocale: (locale: Locale) => void;
    /** Writing direction of the active locale. */
    dir: 'ltr' | 'rtl';
    /** All supported locales, for building a switcher. */
    locales: typeof LOCALES;
}
export interface XenitionI18nProviderProps {
    children: React.ReactNode;
    /** Template-specific translations, merged over (and winning against) the shared base. */
    bundle?: Bundle;
    /** Language used before any user choice / detection. Defaults to English. */
    defaultLocale?: Locale;
    /** localStorage key the choice is remembered under. Defaults to `xen-locale`. */
    persistKey?: string;
}
/**
 * Provides the active locale + `t()` to everything below it. Place once at the
 * app root (inside XenitionUIProvider is fine). Stamps `<html lang>`/`<html dir>`
 * so document language and direction track the choice.
 */
export declare function XenitionI18nProvider({ children, bundle, defaultLocale, persistKey, }: XenitionI18nProviderProps): React.ReactElement;
/**
 * Read translation state. Throws if used outside a provider — but templates that
 * want to be robust can use `useT`'s fallback-friendly `t` freely once wrapped.
 */
export declare function useT(): I18nContextValue;
//# sourceMappingURL=context.d.ts.map