"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionLabel = exports.conditionGlyph = exports.WeatherStat = exports.TemperatureGraph = exports.RadarCard = exports.PrecipBar = exports.SunriseSunset = exports.UVIndexCard = exports.WindCompass = exports.WeatherAlert = exports.AirQualityCardV3 = exports.AirQualityCardV2 = exports.AirQualityCard = exports.HourlyRowV3 = exports.HourlyRowV2 = exports.HourlyRow = exports.ForecastStripV3 = exports.ForecastStripV2 = exports.ForecastStrip = exports.CurrentWeatherV3 = exports.CurrentWeatherV2 = exports.CurrentWeather = void 0;
var CurrentWeather_1 = require("./CurrentWeather");
Object.defineProperty(exports, "CurrentWeather", { enumerable: true, get: function () { return CurrentWeather_1.CurrentWeather; } });
var CurrentWeatherV2_1 = require("./CurrentWeatherV2");
Object.defineProperty(exports, "CurrentWeatherV2", { enumerable: true, get: function () { return CurrentWeatherV2_1.CurrentWeatherV2; } });
var CurrentWeatherV3_1 = require("./CurrentWeatherV3");
Object.defineProperty(exports, "CurrentWeatherV3", { enumerable: true, get: function () { return CurrentWeatherV3_1.CurrentWeatherV3; } });
var ForecastStrip_1 = require("./ForecastStrip");
Object.defineProperty(exports, "ForecastStrip", { enumerable: true, get: function () { return ForecastStrip_1.ForecastStrip; } });
var ForecastStripV2_1 = require("./ForecastStripV2");
Object.defineProperty(exports, "ForecastStripV2", { enumerable: true, get: function () { return ForecastStripV2_1.ForecastStripV2; } });
var ForecastStripV3_1 = require("./ForecastStripV3");
Object.defineProperty(exports, "ForecastStripV3", { enumerable: true, get: function () { return ForecastStripV3_1.ForecastStripV3; } });
var HourlyRow_1 = require("./HourlyRow");
Object.defineProperty(exports, "HourlyRow", { enumerable: true, get: function () { return HourlyRow_1.HourlyRow; } });
var HourlyRowV2_1 = require("./HourlyRowV2");
Object.defineProperty(exports, "HourlyRowV2", { enumerable: true, get: function () { return HourlyRowV2_1.HourlyRowV2; } });
var HourlyRowV3_1 = require("./HourlyRowV3");
Object.defineProperty(exports, "HourlyRowV3", { enumerable: true, get: function () { return HourlyRowV3_1.HourlyRowV3; } });
var AirQualityCard_1 = require("./AirQualityCard");
Object.defineProperty(exports, "AirQualityCard", { enumerable: true, get: function () { return AirQualityCard_1.AirQualityCard; } });
var AirQualityCardV2_1 = require("./AirQualityCardV2");
Object.defineProperty(exports, "AirQualityCardV2", { enumerable: true, get: function () { return AirQualityCardV2_1.AirQualityCardV2; } });
var AirQualityCardV3_1 = require("./AirQualityCardV3");
Object.defineProperty(exports, "AirQualityCardV3", { enumerable: true, get: function () { return AirQualityCardV3_1.AirQualityCardV3; } });
var WeatherAlert_1 = require("./WeatherAlert");
Object.defineProperty(exports, "WeatherAlert", { enumerable: true, get: function () { return WeatherAlert_1.WeatherAlert; } });
var WindCompass_1 = require("./WindCompass");
Object.defineProperty(exports, "WindCompass", { enumerable: true, get: function () { return WindCompass_1.WindCompass; } });
var UVIndexCard_1 = require("./UVIndexCard");
Object.defineProperty(exports, "UVIndexCard", { enumerable: true, get: function () { return UVIndexCard_1.UVIndexCard; } });
var SunriseSunset_1 = require("./SunriseSunset");
Object.defineProperty(exports, "SunriseSunset", { enumerable: true, get: function () { return SunriseSunset_1.SunriseSunset; } });
var PrecipBar_1 = require("./PrecipBar");
Object.defineProperty(exports, "PrecipBar", { enumerable: true, get: function () { return PrecipBar_1.PrecipBar; } });
var RadarCard_1 = require("./RadarCard");
Object.defineProperty(exports, "RadarCard", { enumerable: true, get: function () { return RadarCard_1.RadarCard; } });
var TemperatureGraph_1 = require("./TemperatureGraph");
Object.defineProperty(exports, "TemperatureGraph", { enumerable: true, get: function () { return TemperatureGraph_1.TemperatureGraph; } });
var WeatherStat_1 = require("./WeatherStat");
Object.defineProperty(exports, "WeatherStat", { enumerable: true, get: function () { return WeatherStat_1.WeatherStat; } });
var weather_utils_1 = require("./weather-utils");
Object.defineProperty(exports, "conditionGlyph", { enumerable: true, get: function () { return weather_utils_1.conditionGlyph; } });
Object.defineProperty(exports, "conditionLabel", { enumerable: true, get: function () { return weather_utils_1.conditionLabel; } });
//# sourceMappingURL=index.js.map