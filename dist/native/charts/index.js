"use strict";
/**
 * `@xenition/ui/native/charts` — token-bound data-visualization components for
 * React Native. Two families live here: View/flex-based charts (bars, cells,
 * stacked rectangles) built from `View`/`Text` primitives, and SVG charts
 * (line/area/pie/donut/radar/gauge/ring/scatter) built on `react-native-svg`
 * (an optional peer dep). Both express series/intensity via theme colors +
 * opacity and never hardcode a hex.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterChart = exports.ProgressRing = exports.GaugeChart = exports.RadarChart = exports.DonutChart = exports.PieChart = exports.AreaChart = exports.LineChart = exports.ComparisonBars = exports.ProgressBars = exports.Legend = exports.TrendCard = exports.RangeBar = exports.Heatmap = exports.Histogram = exports.StackedBar = exports.Sparkline = exports.MiniBar = exports.ColumnChart = exports.BarChart = void 0;
var BarChart_1 = require("./BarChart");
Object.defineProperty(exports, "BarChart", { enumerable: true, get: function () { return BarChart_1.BarChart; } });
var ColumnChart_1 = require("./ColumnChart");
Object.defineProperty(exports, "ColumnChart", { enumerable: true, get: function () { return ColumnChart_1.ColumnChart; } });
var MiniBar_1 = require("./MiniBar");
Object.defineProperty(exports, "MiniBar", { enumerable: true, get: function () { return MiniBar_1.MiniBar; } });
var Sparkline_1 = require("./Sparkline");
Object.defineProperty(exports, "Sparkline", { enumerable: true, get: function () { return Sparkline_1.Sparkline; } });
var StackedBar_1 = require("./StackedBar");
Object.defineProperty(exports, "StackedBar", { enumerable: true, get: function () { return StackedBar_1.StackedBar; } });
var Histogram_1 = require("./Histogram");
Object.defineProperty(exports, "Histogram", { enumerable: true, get: function () { return Histogram_1.Histogram; } });
var Heatmap_1 = require("./Heatmap");
Object.defineProperty(exports, "Heatmap", { enumerable: true, get: function () { return Heatmap_1.Heatmap; } });
var RangeBar_1 = require("./RangeBar");
Object.defineProperty(exports, "RangeBar", { enumerable: true, get: function () { return RangeBar_1.RangeBar; } });
var TrendCard_1 = require("./TrendCard");
Object.defineProperty(exports, "TrendCard", { enumerable: true, get: function () { return TrendCard_1.TrendCard; } });
var Legend_1 = require("./Legend");
Object.defineProperty(exports, "Legend", { enumerable: true, get: function () { return Legend_1.Legend; } });
var ProgressBars_1 = require("./ProgressBars");
Object.defineProperty(exports, "ProgressBars", { enumerable: true, get: function () { return ProgressBars_1.ProgressBars; } });
var ComparisonBars_1 = require("./ComparisonBars");
Object.defineProperty(exports, "ComparisonBars", { enumerable: true, get: function () { return ComparisonBars_1.ComparisonBars; } });
// SVG-based charts (require the optional `react-native-svg` peer dep).
var LineChart_1 = require("./LineChart");
Object.defineProperty(exports, "LineChart", { enumerable: true, get: function () { return LineChart_1.LineChart; } });
var AreaChart_1 = require("./AreaChart");
Object.defineProperty(exports, "AreaChart", { enumerable: true, get: function () { return AreaChart_1.AreaChart; } });
var PieChart_1 = require("./PieChart");
Object.defineProperty(exports, "PieChart", { enumerable: true, get: function () { return PieChart_1.PieChart; } });
var DonutChart_1 = require("./DonutChart");
Object.defineProperty(exports, "DonutChart", { enumerable: true, get: function () { return DonutChart_1.DonutChart; } });
var RadarChart_1 = require("./RadarChart");
Object.defineProperty(exports, "RadarChart", { enumerable: true, get: function () { return RadarChart_1.RadarChart; } });
var GaugeChart_1 = require("./GaugeChart");
Object.defineProperty(exports, "GaugeChart", { enumerable: true, get: function () { return GaugeChart_1.GaugeChart; } });
var ProgressRing_1 = require("./ProgressRing");
Object.defineProperty(exports, "ProgressRing", { enumerable: true, get: function () { return ProgressRing_1.ProgressRing; } });
var ScatterChart_1 = require("./ScatterChart");
Object.defineProperty(exports, "ScatterChart", { enumerable: true, get: function () { return ScatterChart_1.ScatterChart; } });
//# sourceMappingURL=index.js.map