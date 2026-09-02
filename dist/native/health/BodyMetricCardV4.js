"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMetricCardV4 = BodyMetricCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Icon per metric. Identity, and nothing but identity. */
const VARIANT_GLYPH = {
    weight: '⚖️',
    bmi: '📊',
    'body-fat': '📉',
    muscle: '💪',
    waist: '📏',
    'blood-sugar': '🩸',
};
const VARIANT_LABEL = {
    weight: 'Weight',
    bmi: 'BMI',
    'body-fat': 'Body fat',
    muscle: 'Muscle mass',
    waist: 'Waist',
    'blood-sugar': 'Blood sugar',
};
const VARIANT_UNIT = {
    weight: 'kg',
    bmi: '',
    'body-fat': '%',
    muscle: 'kg',
    waist: 'cm',
    'blood-sugar': 'mg/dL',
};
/**
 * **V4 body-metric card** — same props as {@link BodyMetricCard} plus `range`,
 * `label` and `rangeLabels`.
 *
 * ## Five changes
 *
 * 1. **The drop the card exists to show now reaches everybody.** The base
 *    computed the delta, coloured it and drew it, then set the card's
 *    `accessibilityLabel` to the metric and value alone — and once the card is
 *    a button that name *replaces* its contents, so "▼ 1.2 kg" was visible to
 *    sighted users and to nobody else.
 * 2. **A fasting glucose of 260 no longer renders identically to 95.** Pass a
 *    `range` and the value takes its tone and a spoken verdict from the shared
 *    `rangeVerdict`. With no `range` the card behaves exactly as before,
 *    because a card that does not know the band must not invent one.
 * 3. **The trend chart is a *sibling* of the card's activation.** A
 *    `Pressable` is `accessible` by default and flattens its subtree, so the
 *    `Sparkline`'s own name — "Weight trend over 12 readings" — was pruned on
 *    iOS. The container is a plain `View` now, the activation wraps only the
 *    caption and the reading, and the chart sits beside it.
 * 4. **The non-pressable branch is `accessible`**, which it was not, so its
 *    label was dead on iOS.
 * 5. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1` — a value
 *    inside M3's disabled band, so a pressed card read as an unavailable one.
 *
 * **Renders nothing without a `value`.**
 */
function BodyMetricCardV4({ variant, value, unit, label, delta, lowerIsBetter = false, trend, range, rangeLabels, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (value == null || value === '')
        return null;
    const resolvedUnit = unit ?? VARIANT_UNIT[variant];
    const resolvedLabel = label ?? VARIANT_LABEL[variant];
    const numeric = typeof value === 'number' ? value : Number(value);
    const verdict = Number.isFinite(numeric) ? (0, goal_v4_1.rangeVerdict)(numeric, range) : undefined;
    const verdictWord = verdict ? (rangeLabels?.[verdict] ?? tone_v4_1.RANGE_LABEL[verdict]) : null;
    const valueInk = verdict ? (0, tone_v4_1.toneInk)(theme, (0, tone_v4_1.verdictTone)(verdict)) : colors.onSurface;
    const tone = (0, tone_v4_1.deltaTone)(delta, lowerIsBetter);
    const deltaInk = tone === 'neutral' ? colors.mutedText : (0, tone_v4_1.toneInk)(theme, tone);
    const sign = delta == null || delta === 0 ? '' : delta > 0 ? '+' : '−';
    const arrow = delta == null || delta === 0 ? '' : delta > 0 ? '▲ ' : '▼ ';
    const deltaAmount = delta != null && Number.isFinite(delta)
        ? `${Math.abs(delta)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`
        : null;
    const deltaText = deltaAmount === null ? null : `${sign}${deltaAmount}`;
    const trendName = trend && trend.length > 0 ? `${resolvedLabel} trend over ${trend.length} readings` : null;
    const name = (0, tone_v4_1.spokenLine)([
        resolvedLabel,
        `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
        verdictWord,
        deltaText,
    ]);
    const heading = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: VARIANT_GLYPH[variant] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", numeric: "tabular", style: { color: valueInk }, children: value }), resolvedUnit ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", style: { marginBottom: tokens.spacing.xs }, children: resolvedUnit })) : null] }), verdictWord ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, (0, tone_v4_1.verdictTone)(verdict)) }, children: verdictWord })) : null, deltaAmount ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: deltaInk }, children: `${arrow}${deltaAmount}` })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, children: ({ pressed }) => heading(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: heading(false) })), trend && trend.length > 0 && trendName ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: trendName, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: trend, color: tone === 'neutral' ? 'primary' : tone }) }) })) : null] }));
}
//# sourceMappingURL=BodyMetricCardV4.js.map