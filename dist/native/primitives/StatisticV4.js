"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticV4 = StatisticV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
/**
 * **V4 statistic** — same props as {@link Statistic}, a different design line.
 *
 * This is one of the two components in the kit where a number is the hero, and
 * the base treats it as a big string. Four changes, all of them about making
 * the number behave like type rather than like text that happens to be large:
 *
 * 1. **Tabular figures.** The single most important fix here. A KPI whose
 *    value ticks — `1,204` → `1,209` — reflows on every update with
 *    proportional digits, and a column of statistics never lines up. Tabular
 *    figures cost nothing and are the difference between comparing two numbers
 *    and re-reading them (§33).
 * 2. **The brand's display face.** A hero number wears `fontHeading`; the base
 *    left it on the body face, so the loudest thing on a dashboard was the one
 *    place the brand's type never appeared.
 * 3. **A real baseline.** The value takes a line height equal to its size, and
 *    the suffix sits on its baseline instead of being nudged into place with a
 *    hand-picked bottom margin. `12` and `GB` now share a baseline the way
 *    they would in any typeset line.
 * 4. **The label is a caption.** `xs` and muted, matching `DescriptionsV4`, so
 *    the number grows relative to it without a single point being added to the
 *    number (§6 — hierarchy before styling).
 *
 * The delta's tone moves from `success`/`danger` to `successText`/`dangerText`.
 * The first pair is the *fill* colour — what a filled chip is painted with —
 * and the compiler makes no contrast promise about it as text on `surface`.
 * The `*Text` pair is exactly that promise, and the base was setting a
 * green-on-white delta with the wrong green. The arrow is hidden from the
 * accessibility tree: "▲ 12%" should be announced as "12%", not as a triangle.
 *
 * **Still not a card.** It renders bare so it can sit in a row, a header or a
 * grid — §11, and a dashboard of tiles each in its own bordered box is the
 * "cards inside cards" §8 bans, at KPI scale.
 */
function StatisticV4({ label, value, delta, trend, suffix, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const resolvedTrend = trend ?? inferTrend(delta);
    // The contrast-safe TEXT forms, not the fill colours: `success` is what a
    // filled chip is painted with and carries no promise as ink on `surface`.
    const trendColor = resolvedTrend === 'up'
        ? colors.successText
        : resolvedTrend === 'down'
            ? colors.dangerText
            : colors.mutedText;
    const arrow = resolvedTrend === 'up' ? '▲' : resolvedTrend === 'down' ? '▼' : '→';
    const heroSize = tokens.typography.scale['3xl'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: style, children: [typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '500',
                }, children: label })) : (label), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [typeof value === 'string' || typeof value === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontFamily: tokens.typography.fontHeading,
                            fontSize: heroSize,
                            lineHeight: heroSize,
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: value })) : (value), suffix != null ? (typeof suffix === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.mutedText,
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.base,
                        }, children: suffix })) : (suffix)) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text
                    // Decorative: "▲ 12%" should be announced as "12%".
                    , { 
                        // Decorative: "▲ 12%" should be announced as "12%".
                        accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: trendColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: trendColor,
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            fontVariant: ['tabular-nums'],
                        }, children: String(delta) })] })) : null] }));
}
//# sourceMappingURL=StatisticV4.js.map