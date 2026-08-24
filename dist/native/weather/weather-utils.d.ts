/**
 * Shared internals for the native weather module: the canonical
 * {@link WeatherCondition} vocabulary with its glyph + human label maps, plus a
 * token-derived translucent tint helper (mirrors the primitives' `withAlpha`).
 *
 * Weather condition is ALWAYS surfaced as a glyph **and** a text label — never
 * by color alone — so the maps here are the single source of truth every
 * weather component composes.
 */
export type WeatherCondition = 'clear' | 'partly-cloudy' | 'cloudy' | 'overcast' | 'fog' | 'drizzle' | 'rain' | 'thunderstorm' | 'snow' | 'sleet' | 'hail' | 'wind';
/** Glyph for a condition, falling back to a neutral cloud for unknown values. */
export declare function conditionGlyph(condition: WeatherCondition | undefined): string;
/** Label for a condition, falling back to a dashed placeholder. */
export declare function conditionLabel(condition: WeatherCondition | undefined): string;
/**
 * Token-derived translucent tint — parses an already-resolved theme hex and
 * returns an `rgba()` string. The input is always a token color, so no literal
 * color is ever introduced (mirrors `Button`/`Badge`).
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Clamp `n` into `[min, max]`; NaN-safe (returns `min`). */
export declare function clamp(n: number, min: number, max: number): number;
//# sourceMappingURL=weather-utils.d.ts.map