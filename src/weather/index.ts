/**
 * `@xenition/ui/weather` — composed React DOM blocks for weather screens: a
 * current-conditions hero, multi-day and hourly forecasts, air quality / UV /
 * wind / sunrise-sunset cards, severity-toned alerts, precip bars, a
 * dependency-free static radar placeholder, a temperature graph (built on the
 * shared web `LineChart`), and a compact stat tile. This is the web parity of
 * `@xenition/ui/native/weather`.
 *
 * Every block is styled exclusively from the `--xen-*` theme tokens via Tailwind
 * classes — no literal colors — and the weather condition/severity is always
 * conveyed by a glyph AND text (never color alone). Components reuse the web
 * primitives (`Card`, `Icon`, `Badge`, `Statistic`), the web charts
 * (`LineChart`), and the `EmptyState` block; DOM roots forward refs and native
 * `onPress` handlers map to DOM `onClick`.
 */

export { CurrentWeather } from './CurrentWeather';
export type { CurrentWeatherProps, CurrentWeatherVariant } from './CurrentWeather';

export { ForecastStrip } from './ForecastStrip';
export type { ForecastStripProps, ForecastStripVariant, ForecastDay } from './ForecastStrip';

export { HourlyRow } from './HourlyRow';
export type { HourlyRowProps, HourlyPoint } from './HourlyRow';

export { AirQualityCard } from './AirQualityCard';
export type { AirQualityCardProps, AqiBand } from './AirQualityCard';

export { WeatherAlert } from './WeatherAlert';
export type { WeatherAlertProps, WeatherAlertSeverity } from './WeatherAlert';

export { WindCompass } from './WindCompass';
export type { WindCompassProps } from './WindCompass';

export { UVIndexCard } from './UVIndexCard';
export type { UVIndexCardProps, UvBand } from './UVIndexCard';

export { SunriseSunset } from './SunriseSunset';
export type { SunriseSunsetProps } from './SunriseSunset';

export { PrecipBar } from './PrecipBar';
export type { PrecipBarProps, PrecipSlot } from './PrecipBar';

export { RadarCard } from './RadarCard';
export type { RadarCardProps } from './RadarCard';

export { TemperatureGraph } from './TemperatureGraph';
export type { TemperatureGraphProps } from './TemperatureGraph';

export { WeatherStat } from './WeatherStat';
export type { WeatherStatProps, WeatherStatVariant } from './WeatherStat';

// Shared condition vocabulary (glyph + label maps) used across the module.
export type { WeatherCondition } from './weather-utils';
export { conditionGlyph, conditionLabel } from './weather-utils';
