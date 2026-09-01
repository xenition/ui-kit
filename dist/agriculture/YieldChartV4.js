"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.YieldChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const BarChartV4_1 = require("../charts/BarChartV4");
const LineChartV4_1 = require("../charts/LineChartV4");
/**
 * **V4 yield chart** — the web twin of the native `YieldChartV4`:
 * {@link YieldChart}'s props with `color` replaced by `tone`, plus
 * `emptyLabel` and `seriesLabel`.
 *
 * ## Four changes
 *
 * 1. **The palette does identity; status does meaning.** See `tone`. This is
 *    the one prop change in the whole pass that is not purely additive, and the
 *    reason is in the note there.
 * 2. **It composes `BarChartV4` / `LineChartV4`**, so it inherits the
 *    validated palette, the tooltip, the direct labels and the derived
 *    accessible summary — including the rule that a chart must state its value
 *    in words, not only draw it.
 * 3. **The headline is tabular** and its unit is a separate muted element
 *    rather than part of the same string, so `12.4 t/ha` aligns down a column.
 * 4. **The empty state is the chart's own**, not a bare muted sentence: the
 *    chart keeps its height, so a dashboard does not reflow when data arrives.
 */
exports.YieldChartV4 = React.forwardRef(function YieldChartV4({ data, labels, title = 'Yield', headline, unit, variant = 'bars', tone, seriesLabel, emptyLabel = 'No yield data yet', height = 140, className, ...rest }, ref) {
    const series = Array.isArray(data) ? data : [];
    const name = seriesLabel ?? title;
    const summary = `${title}, ${series.length} periods`;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-yield-chart": variant, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chart", size: "base" }), (0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 text-base font-semibold text-on-card", children: title })] }), headline != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-2xl font-bold text-on-card [font-variant-numeric:tabular-nums]", children: headline }), unit != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: unit }) : null] })) : null, variant === 'line' ? ((0, jsx_runtime_1.jsx)(LineChartV4_1.LineChartV4, { data: series, height: height, showDots: true, series: [{ key: 'yield', label: name, tone }], emptyLabel: emptyLabel, "aria-label": summary })) : ((0, jsx_runtime_1.jsx)(BarChartV4_1.BarChartV4, { data: series, labels: labels, height: height, tone: tone, emptyLabel: emptyLabel, "aria-label": summary }))] }));
});
//# sourceMappingURL=YieldChartV4.js.map