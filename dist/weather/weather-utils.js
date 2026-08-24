"use strict";
/**
 * Shared internals for the web weather module: the canonical
 * {@link WeatherCondition} vocabulary with its glyph + human label maps, plus a
 * NaN-safe numeric clamp. Web parity of `native/weather/weather-utils.ts` — the
 * `withAlpha` rgba helper is intentionally dropped here (web tints resolve from
 * `--xen-*` token classes, never a computed color string).
 *
 * Weather condition is ALWAYS surfaced as a glyph **and** a text label — never
 * by color alone — so the maps here are the single source of truth every web
 * weather component composes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionGlyph = conditionGlyph;
exports.conditionLabel = conditionLabel;
exports.clamp = clamp;
/** Emoji/unicode glyph for a condition. Decorative by default; always paired with text. */
const CONDITION_GLYPH = {
    clear: '☀️',
    'partly-cloudy': '⛅',
    cloudy: '☁️',
    overcast: '☁️',
    fog: '🌫️',
    drizzle: '🌦️',
    rain: '🌧️',
    thunderstorm: '⛈️',
    snow: '❄️',
    sleet: '🌨️',
    hail: '🌨️',
    wind: '💨',
};
/** Human-readable label for a condition. */
const CONDITION_LABEL = {
    clear: 'Clear',
    'partly-cloudy': 'Partly cloudy',
    cloudy: 'Cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    rain: 'Rain',
    thunderstorm: 'Thunderstorm',
    snow: 'Snow',
    sleet: 'Sleet',
    hail: 'Hail',
    wind: 'Windy',
};
/** Glyph for a condition, falling back to a neutral cloud for unknown values. */
function conditionGlyph(condition) {
    return (condition && CONDITION_GLYPH[condition]) ?? '☁️';
}
/** Label for a condition, falling back to a dashed placeholder. */
function conditionLabel(condition) {
    return (condition && CONDITION_LABEL[condition]) ?? '—';
}
/** Clamp `n` into `[min, max]`; NaN-safe (returns `min`). */
function clamp(n, min, max) {
    if (Number.isNaN(n))
        return min;
    return Math.min(max, Math.max(min, n));
}
//# sourceMappingURL=weather-utils.js.map