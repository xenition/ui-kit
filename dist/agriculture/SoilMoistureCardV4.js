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
exports.SoilMoistureCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const LineChartV4_1 = require("../charts/LineChartV4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * Band → tone and default label.
 *
 * `dry` and `optimal` are genuinely a caution and a good outcome, so they keep
 * `warn` and `success`. **`wet` does not get one**: saturated soil is a
 * *reading*, not a verdict — whether it is bad depends on the crop — and §5 of
 * the brief reserves the status colours for things that really mean good or
 * bad. It takes the brand slot, as the base did.
 */
const STATUS_META = {
    dry: { label: 'Dry', tone: 'warn', chart: 'warn' },
    optimal: { label: 'Optimal', tone: 'success', chart: 'success' },
    wet: { label: 'Saturated', tone: 'primary' },
};
/** Where the bands sit, when `status` is not supplied. */
function deriveStatus(pct) {
    if (pct < 30)
        return 'dry';
    if (pct > 70)
        return 'wet';
    return 'optimal';
}
/**
 * **V4 soil moisture card** — the web twin of the native
 * `SoilMoistureCardV4`, same props as {@link SoilMoistureCard} plus
 * `statusLabels`, `unknownLabel` and `trendLabel`.
 *
 * ## Five changes
 *
 * 1. **The trend is `LineChartV4`**, on the validated chart palette, and it is
 *    given a status tone **only** where the band genuinely is one. The base
 *    passed a semantic colour straight through as an identity, which is what
 *    `CHARTS-V4-BRIEF.md` §2/§3 retired.
 * 2. **The reading takes contrast-corrected ink.** A `3xl` number painted in
 *    the `warn` *fill* slot was the largest low-contrast element on the card.
 * 3. **The soil temperature carries an icon, not an emoji glued into the
 *    string.**
 * 4. **The reading is tabular**, so a dashboard of sensors lines up.
 * 5. **Every caption moves to `muted-text`.**
 *
 * With no `moisture` the card still composes: the badge, the label and the
 * trend all stand on their own.
 */
exports.SoilMoistureCardV4 = React.forwardRef(function SoilMoistureCardV4({ moisture, label, status, trend, soilTemp, title = 'Soil moisture', chartHeight = 90, statusLabels, unknownLabel = '—', trendLabel = 'Trend', className, ...rest }, ref) {
    const pct = (0, farm_v4_1.clampPercent)(moisture);
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const bandLabel = statusLabels?.[band] ?? meta.label;
    const series = Array.isArray(trend) ? trend : [];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-soil-moisture": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCA7", size: "base", className: farm_v4_1.TONE_INK[meta.tone] }), (0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 text-base font-semibold text-on-card", children: title }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: bandLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-bold [font-variant-numeric:tabular-nums]', farm_v4_1.TONE_INK[meta.tone]), children: pct != null ? String(pct) : unknownLabel }), pct != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted-text", children: "%" }) : null, soilTemp != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "ml-sm flex items-center gap-xs text-sm text-muted-text [font-variant-numeric:tabular-nums]", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDF21\uFE0F", size: "sm" }), soilTemp] })) : null] }), label != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: label }) : null, pct != null ? (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.tone }) : null, series.length > 1 ? ((0, jsx_runtime_1.jsx)(LineChartV4_1.LineChartV4, { data: series, height: chartHeight, 
                // `LineChartV4` carries tone on the SERIES, not the chart: a chart
                // has no single meaning, a series does.
                series: [{ key: 'moisture', label: trendLabel, tone: meta.chart }], caption: trendLabel, "aria-label": `${title} ${trendLabel}, ${series.length} samples` })) : null] }));
});
//# sourceMappingURL=SoilMoistureCardV4.js.map