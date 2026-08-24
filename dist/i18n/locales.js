"use strict";
/**
 * The languages `@xenition/ui/i18n` ships. Deliberately a small, curated set —
 * the seven the marketing site prioritises — all left-to-right for now. The
 * `dir` field is carried through the provider so adding a right-to-left
 * language later is a data change, not a code change.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOCALE = exports.LOCALE_CODES = exports.LOCALES = void 0;
exports.coerceLocale = coerceLocale;
exports.localeMeta = localeMeta;
exports.LOCALES = [
    { code: 'en', label: 'English', english: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'es', label: 'Español', english: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
    { code: 'fr', label: 'Français', english: 'French', flag: '🇫🇷', dir: 'ltr' },
    { code: 'de', label: 'Deutsch', english: 'German', flag: '🇩🇪', dir: 'ltr' },
    { code: 'pt', label: 'Português', english: 'Portuguese', flag: '🇧🇷', dir: 'ltr' },
    { code: 'it', label: 'Italiano', english: 'Italian', flag: '🇮🇹', dir: 'ltr' },
    { code: 'ja', label: '日本語', english: 'Japanese', flag: '🇯🇵', dir: 'ltr' },
];
exports.LOCALE_CODES = exports.LOCALES.map((l) => l.code);
/** The fallback every lookup ends at, and the language source content is authored in. */
exports.DEFAULT_LOCALE = 'en';
/** Narrow an arbitrary string (localStorage value, navigator.language) to a supported Locale. */
function coerceLocale(value) {
    if (!value)
        return null;
    const lower = value.toLowerCase();
    // exact, then primary subtag (en-US -> en)
    const exact = exports.LOCALE_CODES.find((c) => c === lower);
    if (exact)
        return exact;
    const primary = lower.split('-')[0];
    return exports.LOCALE_CODES.find((c) => c === primary) ?? null;
}
function localeMeta(code) {
    return exports.LOCALES.find((l) => l.code === code) ?? exports.LOCALES[0];
}
//# sourceMappingURL=locales.js.map