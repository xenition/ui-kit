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
export type WeatherCondition = 'clear' | 'partly-cloudy' | 'cloudy' | 'overcast' | 'fog' | 'drizzle' | 'rain' | 'thunderstorm' | 'snow' | 'sleet' | 'hail' | 'wind';
/** Glyph for a condition, falling back to a neutral cloud for unknown values. */
export declare function conditionGlyph(condition: WeatherCondition | undefined): string;
/** Label for a condition, falling back to a dashed placeholder. */
export declare function conditionLabel(condition: WeatherCondition | undefined): string;
/** Clamp `n` into `[min, max]`; NaN-safe (returns `min`). */
export declare function clamp(n: number, min: number, max: number): number;
//# sourceMappingURL=weather-utils.d.ts.map