/**
 * Helpers for localizing SDK-seeded content on the frontend.
 *
 * The seeded content (cms items/pages, catalog products, …) is authored in the
 * default language and its translations ride along inside the row's existing
 * jsonb — e.g. `item.data.i18n = { es: { title, excerpt }, fr: {…} }` — which the
 * SDK returns untouched. These helpers overlay the active locale's fields onto
 * the row at the point a template projects it, with English fallback. No SDK,
 * schema, or reseed change is required; a future router-level `?locale=` is an
 * optional enhancement, not a prerequisite.
 */
import { type Locale } from './locales';
/** A map of per-locale overrides, as stored inside a row's jsonb (`data.i18n`, `seo.i18n`). */
export type I18nMap<T> = Partial<Record<Locale, Partial<T>>>;
/** Pick a locale's value from a per-locale map, falling back to English then undefined. */
export declare function pickLocale<T>(byLocale: I18nMap<T> | Partial<Record<Locale, T>> | null | undefined, locale: Locale, fallback?: Locale): Partial<T> | T | undefined;
/**
 * Shallow-overlay a locale's field overrides onto a base object.
 * `localize(base, base.i18n, locale)` → base with the active language's fields applied.
 * Missing locale / missing fields fall through to the base (English) values.
 */
export declare function localize<T extends object>(base: T, i18n: I18nMap<T> | null | undefined, locale: Locale, fallback?: Locale): T;
//# sourceMappingURL=content.d.ts.map