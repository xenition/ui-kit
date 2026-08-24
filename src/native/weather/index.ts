/**
 * `@xenition/ui/native/weather` — composed React Native blocks for weather
 * screens: a current-conditions hero, multi-day and hourly forecasts, air
 * quality / UV / wind / sunrise-sunset cards, severity-toned alerts, precip
 * bars, a dependency-free static radar placeholder, a temperature graph (built
 * on the shared `LineChart`), and a compact stat tile. Every block is styled
 * exclusively from the compiled theme tokens via `useXenitionTheme()` — colors
 * resolve from `SemanticColors` keys (severity via `warn`/`danger`, tints via
 * `tokens.ramps.*`), never literal hex — and the weather condition is always
 * conveyed by a glyph AND text, never color alone. Mobile-first, native-only.
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
