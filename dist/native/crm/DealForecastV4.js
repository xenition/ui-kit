"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealForecastV4 = DealForecastV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const charts_1 = require("../charts");
const money_1 = require("../commerce/money");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 deal forecast** — same props as {@link DealForecast} plus
 * `formatTarget`, `targetLabel` and `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is actually shown.** `targetCents` is documented as "shown
 *    as a labelled reference" and was only ever divided into the total: a
 *    caller supplied a quota and saw a percentage and the words "vs target",
 *    never the quota itself. It now prints, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a negative percent; `attainment()` clamps to 0-100.
 * 3. **Hitting quota is a word, not a colour.** Crossing 100% swapped the
 *    figure to `success` and said nothing else — invisible in greyscale, and
 *    silent to a reader. `attainedLabel` renders beside the figure and joins
 *    the block's accessible name.
 * 4. **The figures are tabular** and the empty state carries status semantics
 *    rather than being one muted line in a blank region.
 */
function DealForecastV4({ periods, title = 'Forecast', currency = 'USD', targetCents, color = 'primary', height = 128, emptyLabel = 'No forecast data', formatTarget, targetLabel = 'vs target', attainedLabel = 'Target met', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const total = periods.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
    const pct = (0, crm_v4_1.attainment)(total, targetCents);
    const attained = pct != null && pct >= 100;
    const totalLabel = (0, money_1.formatMoney)(total, currency);
    const target = targetCents != null && targetCents > 0
        ? (formatTarget ?? ((cents) => (0, money_1.formatMoney)(cents, currency)))(targetCents)
        : undefined;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { padding: "md", style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, crm_v4_1.spokenLine)([
                    title,
                    totalLabel,
                    target ? `${targetLabel} ${target}` : null,
                    pct != null ? `${Math.round(pct)}%` : null,
                    attained ? attainedLabel : null,
                ]), style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onCard", style: crm_v4_1.TABULAR, children: totalLabel })] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: crm_v4_1.TABULAR, children: target ? `${targetLabel} ${target}` : targetLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: attained ? 'successText' : 'onCard', style: crm_v4_1.TABULAR, children: `${Math.round(pct)}%` }), attained ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "successText", children: attainedLabel })) : null] })) : null] }), periods.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel }) })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0)), labels: periods.map((p) => p.label), color: color, height: height, accessibilityLabel: (0, crm_v4_1.spokenLine)([
                    `Forecast across ${periods.length} periods`,
                    `total ${totalLabel}`,
                    target ? `${targetLabel} ${target}` : null,
                ]) }))] }));
}
//# sourceMappingURL=DealForecastV4.js.map