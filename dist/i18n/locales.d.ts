/**
 * The languages `@xenition/ui/i18n` ships. Deliberately a small, curated set —
 * the seven the marketing site prioritises — all left-to-right for now. The
 * `dir` field is carried through the provider so adding a right-to-left
 * language later is a data change, not a code change.
 */
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja';
export interface LocaleMeta {
    /** BCP-47 code used everywhere (localStorage, <html lang>, the switcher). */
    code: Locale;
    /** The language's own name, shown in the switcher. */
    label: string;
    /** English name, for aria-labels / accessibility. */
    english: string;
    /** Flag emoji for the switcher. */
    flag: string;
    /** Writing direction — stamped on <html dir>. All seven are ltr today. */
    dir: 'ltr' | 'rtl';
}
export declare const LOCALES: LocaleMeta[];
export declare const LOCALE_CODES: Locale[];
/** The fallback every lookup ends at, and the language source content is authored in. */
export declare const DEFAULT_LOCALE: Locale;
/** Narrow an arbitrary string (localStorage value, navigator.language) to a supported Locale. */
export declare function coerceLocale(value: string | null | undefined): Locale | null;
export declare function localeMeta(code: Locale): LocaleMeta;
//# sourceMappingURL=locales.d.ts.map