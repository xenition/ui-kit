"use strict";
/**
 * `@xenition/ui/charts` — inline-SVG, token-bound data-visualization components
 * for React DOM. Every fill/stroke references a `--xen-*` CSS custom property
 * (or a token class); no literal colors and no charting dependency. This is the
 * web parity of `@xenition/ui/native/charts`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonutChartV4 = exports.foldPieDataV4 = exports.PIE_OTHER_LABEL = exports.PieChartV4 = exports.RangeBarV4 = exports.StackedBarV4 = exports.HistogramV4 = exports.ColumnChartV4 = exports.BarChartV4 = exports.MiniBarV4 = exports.TrendCardV4 = exports.SparklineV4 = exports.AreaChartV4 = exports.CHART_AUTO_DOT_MAX = exports.LineChartV4 = exports.CHART_GRID_VAR = exports.CHART_AXIS_VAR = exports.useChartV4 = exports.chartVar = exports.chartSeqVar = exports.chartDivVar = exports.ChartEmptyV4 = exports.foldChartSeries = exports.CHART_SERIES_COUNT = exports.CHART_SCATTER_SERIES_CAP = exports.CHART_RAMP_STEPS = exports.CHART_OVERFLOW_LABEL = exports.CHART_MARK = exports.CHART_DIRECT_LABEL_MAX = exports.CHART_AREA_FILL_ALPHA = exports.Legend = exports.TrendCard = exports.Heatmap = exports.Histogram = exports.StackedBar = exports.Sparkline = exports.ScatterChart = exports.ProgressRing = exports.GaugeChart = exports.RadarChart = exports.DonutChart = exports.PieChart = exports.ColumnChart = exports.BarChart = exports.AreaChart = exports.LineChart = exports.SERIES = exports.seriesColor = exports.colorVar = exports.ChartEmpty = void 0;
exports.LegendV4 = exports.ProgressBarsV4 = exports.ComparisonBarsV4 = exports.ScatterChartV4 = exports.HEATMAP_V4_TAP_MIN = exports.HeatmapV4 = exports.RADAR_SERIES_CAP = exports.RadarChartV4 = exports.radialThicknessV4 = exports.ProgressRingV4 = exports.GaugeChartV4 = void 0;
var internal_1 = require("./internal");
Object.defineProperty(exports, "ChartEmpty", { enumerable: true, get: function () { return internal_1.ChartEmpty; } });
Object.defineProperty(exports, "colorVar", { enumerable: true, get: function () { return internal_1.colorVar; } });
Object.defineProperty(exports, "seriesColor", { enumerable: true, get: function () { return internal_1.seriesColor; } });
Object.defineProperty(exports, "SERIES", { enumerable: true, get: function () { return internal_1.SERIES; } });
var LineChart_1 = require("./LineChart");
Object.defineProperty(exports, "LineChart", { enumerable: true, get: function () { return LineChart_1.LineChart; } });
var AreaChart_1 = require("./AreaChart");
Object.defineProperty(exports, "AreaChart", { enumerable: true, get: function () { return AreaChart_1.AreaChart; } });
var BarChart_1 = require("./BarChart");
Object.defineProperty(exports, "BarChart", { enumerable: true, get: function () { return BarChart_1.BarChart; } });
var ColumnChart_1 = require("./ColumnChart");
Object.defineProperty(exports, "ColumnChart", { enumerable: true, get: function () { return ColumnChart_1.ColumnChart; } });
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
var Sparkline_1 = require("./Sparkline");
Object.defineProperty(exports, "Sparkline", { enumerable: true, get: function () { return Sparkline_1.Sparkline; } });
var StackedBar_1 = require("./StackedBar");
Object.defineProperty(exports, "StackedBar", { enumerable: true, get: function () { return StackedBar_1.StackedBar; } });
var Histogram_1 = require("./Histogram");
Object.defineProperty(exports, "Histogram", { enumerable: true, get: function () { return Histogram_1.Histogram; } });
var Heatmap_1 = require("./Heatmap");
Object.defineProperty(exports, "Heatmap", { enumerable: true, get: function () { return Heatmap_1.Heatmap; } });
var TrendCard_1 = require("./TrendCard");
Object.defineProperty(exports, "TrendCard", { enumerable: true, get: function () { return TrendCard_1.TrendCard; } });
var Legend_1 = require("./Legend");
Object.defineProperty(exports, "Legend", { enumerable: true, get: function () { return Legend_1.Legend; } });
/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Twenty components on the current design pattern, and the palette module
 * behind them. See `CHARTS-V4-BRIEF.md` for the pass, and
 * `primitives/internal/v4-chart.ts` for how the palette is derived and the
 * validator run that locked it.
 *
 * Exported explicitly rather than with `export *`, because several V4 files
 * legitimately re-export the same shared name (`ChartToneV4`,
 * `CHART_AREA_FILL_ALPHA`) so their own call sites keep working. A star export
 * would make those ambiguous.
 * ------------------------------------------------------------------------ */
// The shared vocabulary — one home, so a tone or a series config means the
// same thing to every chart in the module.
var v4_chart_1 = require("../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_AREA_FILL_ALPHA", { enumerable: true, get: function () { return v4_chart_1.CHART_AREA_FILL_ALPHA; } });
Object.defineProperty(exports, "CHART_DIRECT_LABEL_MAX", { enumerable: true, get: function () { return v4_chart_1.CHART_DIRECT_LABEL_MAX; } });
Object.defineProperty(exports, "CHART_MARK", { enumerable: true, get: function () { return v4_chart_1.CHART_MARK; } });
Object.defineProperty(exports, "CHART_OVERFLOW_LABEL", { enumerable: true, get: function () { return v4_chart_1.CHART_OVERFLOW_LABEL; } });
Object.defineProperty(exports, "CHART_RAMP_STEPS", { enumerable: true, get: function () { return v4_chart_1.CHART_RAMP_STEPS; } });
Object.defineProperty(exports, "CHART_SCATTER_SERIES_CAP", { enumerable: true, get: function () { return v4_chart_1.CHART_SCATTER_SERIES_CAP; } });
Object.defineProperty(exports, "CHART_SERIES_COUNT", { enumerable: true, get: function () { return v4_chart_1.CHART_SERIES_COUNT; } });
Object.defineProperty(exports, "foldChartSeries", { enumerable: true, get: function () { return v4_chart_1.foldChartSeries; } });
// The web adapter — the palette as custom properties, and the empty state.
var internal_v4_1 = require("./internal-v4");
Object.defineProperty(exports, "ChartEmptyV4", { enumerable: true, get: function () { return internal_v4_1.ChartEmptyV4; } });
Object.defineProperty(exports, "chartDivVar", { enumerable: true, get: function () { return internal_v4_1.chartDivVar; } });
Object.defineProperty(exports, "chartSeqVar", { enumerable: true, get: function () { return internal_v4_1.chartSeqVar; } });
Object.defineProperty(exports, "chartVar", { enumerable: true, get: function () { return internal_v4_1.chartVar; } });
Object.defineProperty(exports, "useChartV4", { enumerable: true, get: function () { return internal_v4_1.useChartV4; } });
var internal_v4_2 = require("./internal-v4");
Object.defineProperty(exports, "CHART_AXIS_VAR", { enumerable: true, get: function () { return internal_v4_2.CHART_AXIS_VAR; } });
Object.defineProperty(exports, "CHART_GRID_VAR", { enumerable: true, get: function () { return internal_v4_2.CHART_GRID_VAR; } });
var LineChartV4_1 = require("./LineChartV4");
Object.defineProperty(exports, "LineChartV4", { enumerable: true, get: function () { return LineChartV4_1.LineChartV4; } });
Object.defineProperty(exports, "CHART_AUTO_DOT_MAX", { enumerable: true, get: function () { return LineChartV4_1.CHART_AUTO_DOT_MAX; } });
var AreaChartV4_1 = require("./AreaChartV4");
Object.defineProperty(exports, "AreaChartV4", { enumerable: true, get: function () { return AreaChartV4_1.AreaChartV4; } });
var SparklineV4_1 = require("./SparklineV4");
Object.defineProperty(exports, "SparklineV4", { enumerable: true, get: function () { return SparklineV4_1.SparklineV4; } });
var TrendCardV4_1 = require("./TrendCardV4");
Object.defineProperty(exports, "TrendCardV4", { enumerable: true, get: function () { return TrendCardV4_1.TrendCardV4; } });
var MiniBarV4_1 = require("./MiniBarV4");
Object.defineProperty(exports, "MiniBarV4", { enumerable: true, get: function () { return MiniBarV4_1.MiniBarV4; } });
var BarChartV4_1 = require("./BarChartV4");
Object.defineProperty(exports, "BarChartV4", { enumerable: true, get: function () { return BarChartV4_1.BarChartV4; } });
var ColumnChartV4_1 = require("./ColumnChartV4");
Object.defineProperty(exports, "ColumnChartV4", { enumerable: true, get: function () { return ColumnChartV4_1.ColumnChartV4; } });
var HistogramV4_1 = require("./HistogramV4");
Object.defineProperty(exports, "HistogramV4", { enumerable: true, get: function () { return HistogramV4_1.HistogramV4; } });
var StackedBarV4_1 = require("./StackedBarV4");
Object.defineProperty(exports, "StackedBarV4", { enumerable: true, get: function () { return StackedBarV4_1.StackedBarV4; } });
var RangeBarV4_1 = require("./RangeBarV4");
Object.defineProperty(exports, "RangeBarV4", { enumerable: true, get: function () { return RangeBarV4_1.RangeBarV4; } });
var PieChartV4_1 = require("./PieChartV4");
Object.defineProperty(exports, "PieChartV4", { enumerable: true, get: function () { return PieChartV4_1.PieChartV4; } });
Object.defineProperty(exports, "PIE_OTHER_LABEL", { enumerable: true, get: function () { return PieChartV4_1.PIE_OTHER_LABEL; } });
Object.defineProperty(exports, "foldPieDataV4", { enumerable: true, get: function () { return PieChartV4_1.foldPieDataV4; } });
var DonutChartV4_1 = require("./DonutChartV4");
Object.defineProperty(exports, "DonutChartV4", { enumerable: true, get: function () { return DonutChartV4_1.DonutChartV4; } });
var GaugeChartV4_1 = require("./GaugeChartV4");
Object.defineProperty(exports, "GaugeChartV4", { enumerable: true, get: function () { return GaugeChartV4_1.GaugeChartV4; } });
var ProgressRingV4_1 = require("./ProgressRingV4");
Object.defineProperty(exports, "ProgressRingV4", { enumerable: true, get: function () { return ProgressRingV4_1.ProgressRingV4; } });
Object.defineProperty(exports, "radialThicknessV4", { enumerable: true, get: function () { return ProgressRingV4_1.radialThicknessV4; } });
var RadarChartV4_1 = require("./RadarChartV4");
Object.defineProperty(exports, "RadarChartV4", { enumerable: true, get: function () { return RadarChartV4_1.RadarChartV4; } });
Object.defineProperty(exports, "RADAR_SERIES_CAP", { enumerable: true, get: function () { return RadarChartV4_1.RADAR_SERIES_CAP; } });
var HeatmapV4_1 = require("./HeatmapV4");
Object.defineProperty(exports, "HeatmapV4", { enumerable: true, get: function () { return HeatmapV4_1.HeatmapV4; } });
Object.defineProperty(exports, "HEATMAP_V4_TAP_MIN", { enumerable: true, get: function () { return HeatmapV4_1.HEATMAP_V4_TAP_MIN; } });
var ScatterChartV4_1 = require("./ScatterChartV4");
Object.defineProperty(exports, "ScatterChartV4", { enumerable: true, get: function () { return ScatterChartV4_1.ScatterChartV4; } });
var ComparisonBarsV4_1 = require("./ComparisonBarsV4");
Object.defineProperty(exports, "ComparisonBarsV4", { enumerable: true, get: function () { return ComparisonBarsV4_1.ComparisonBarsV4; } });
var ProgressBarsV4_1 = require("./ProgressBarsV4");
Object.defineProperty(exports, "ProgressBarsV4", { enumerable: true, get: function () { return ProgressBarsV4_1.ProgressBarsV4; } });
var LegendV4_1 = require("./LegendV4");
Object.defineProperty(exports, "LegendV4", { enumerable: true, get: function () { return LegendV4_1.LegendV4; } });
//# sourceMappingURL=index.js.map