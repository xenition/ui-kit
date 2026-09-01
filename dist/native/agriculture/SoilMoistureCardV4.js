"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilMoistureCardV4 = SoilMoistureCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
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
 * **V4 soil moisture card** — same props as {@link SoilMoistureCard} plus
 * `statusLabels`, `unknownLabel` and `trendLabel`.
 *
 * ## Five changes
 *
 * 1. **The trend is `LineChartV4`**, on the validated chart palette, and it is
 *    given a status tone **only** where the band genuinely is one. The base
 *    passed `color: keyof SemanticColors` straight through as an identity,
 *    which is what `CHARTS-V4-BRIEF.md` §2/§3 retired.
 * 2. **The reading takes contrast-corrected ink.** A `3xl` number painted in
 *    the `warn` *fill* slot was the largest low-contrast element on the card.
 * 3. **The soil temperature carries an icon, not an emoji glued into the
 *    string** — `'🌡️ ' + soilTemp` cannot be tinted and is read aloud as the
 *    emoji's name.
 * 4. **The reading is tabular**, so a dashboard of sensors lines up.
 * 5. **Type comes from `TextV4`** and every caption moves to `mutedText`.
 *
 * With no `moisture` the card still composes: the badge, the label and the
 * trend all stand on their own.
 */
function SoilMoistureCardV4({ moisture, label, status, trend, soilTemp, title = 'Soil moisture', chartHeight = 90, statusLabels, unknownLabel = '—', trendLabel = 'Trend', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const pct = (0, farm_v4_1.clampPercent)(moisture);
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const bandLabel = statusLabels?.[band] ?? meta.label;
    const ink = (0, farm_v4_1.toneInk)(theme, meta.tone);
    const series = Array.isArray(trend) ? trend : [];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCA7", size: "base", style: { color: ink } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", style: { flex: 1 }, children: title }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: bandLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "3xl", weight: "bold", numeric: "tabular", style: { color: ink }, children: pct != null ? String(pct) : unknownLabel }), pct != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: "%" })) : null, soilTemp != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            marginLeft: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDF21\uFE0F", size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: soilTemp })] })) : null] }), label != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: label })) : null, pct != null ? (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.tone }) : null, series.length > 1 ? ((0, jsx_runtime_1.jsx)(LineChartV4_1.LineChartV4, { data: series, height: chartHeight, 
                // `LineChartV4` carries tone on the SERIES, not the chart: a chart
                // has no single meaning, a series does. One series, named, and given
                // a status tone only where the band genuinely is one.
                series: [{ key: 'moisture', label: trendLabel, tone: meta.chart }], caption: trendLabel, accessibilityLabel: `${title} ${trendLabel}, ${series.length} samples` })) : null] }));
}
//# sourceMappingURL=SoilMoistureCardV4.js.map