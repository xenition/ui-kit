"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickLocale = pickLocale;
exports.localize = localize;
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
const locales_1 = require("./locales");
/** Pick a locale's value from a per-locale map, falling back to English then undefined. */
function pickLocale(byLocale, locale, fallback = locales_1.DEFAULT_LOCALE) {
    if (!byLocale)
        return undefined;
    return byLocale[locale] ?? byLocale[fallback];
}
/**
 * Shallow-overlay a locale's field overrides onto a base object.
 * `localize(base, base.i18n, locale)` → base with the active language's fields applied.
 * Missing locale / missing fields fall through to the base (English) values.
 */
function localize(base, i18n, locale, fallback = locales_1.DEFAULT_LOCALE) {
    const overrides = i18n ? (i18n[locale] ?? i18n[fallback]) : undefined;
    return overrides ? { ...base, ...overrides } : base;
}
//# sourceMappingURL=content.js.map