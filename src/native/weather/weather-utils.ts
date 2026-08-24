/**
 * Shared internals for the native weather module: the canonical
 * {@link WeatherCondition} vocabulary with its glyph + human label maps, plus a
 * token-derived translucent tint helper (mirrors the primitives' `withAlpha`).
 *
 * Weather condition is ALWAYS surfaced as a glyph **and** a text label — never
 * by color alone — so the maps here are the single source of truth every
 * weather component composes.
 */

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'sleet'
  | 'hail'
  | 'wind';

/** Emoji/unicode glyph for a condition. Decorative by default; always paired with text. */
const CONDITION_GLYPH: Record<WeatherCondition, string> = {
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
const CONDITION_LABEL: Record<WeatherCondition, string> = {
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
export function conditionGlyph(condition: WeatherCondition | undefined): string {
  return (condition && CONDITION_GLYPH[condition]) ?? '☁️';
}

/** Label for a condition, falling back to a dashed placeholder. */
export function conditionLabel(condition: WeatherCondition | undefined): string {
  return (condition && CONDITION_LABEL[condition]) ?? '—';
}

/**
 * Token-derived translucent tint — parses an already-resolved theme hex and
 * returns an `rgba()` string. The input is always a token color, so no literal
 * color is ever introduced (mirrors `Button`/`Badge`).
 */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Clamp `n` into `[min, max]`; NaN-safe (returns `min`). */
export function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}
