"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyProgressV4 = SurveyProgressV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * SurveyProgress — **V4** "clean form / focus" design. Deliberately calm — NO
 * gradient — so it never competes with the question: a clean rounded progress bar
 * (track = soft-primary tint, fill = solid primary) under a legible "Step N of M"
 * line with a big primary percentage numeral. `steps` swaps the bar for a
 * segmented dot-per-question track; `fraction` shows just the caption. Exposes a
 * `progressbar` role with min/max/now so assistive tech can read completion.
 * `current` is clamped into `[0, total]`. Same props/behavior as
 * {@link SurveyProgressProps}; token-only colors via `useXenitionTheme()` (no
 * literals), dark-mode safe.
 */
function SurveyProgressV4({ current, total, variant = 'bar', showLabel = true, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const pct = Math.round((safeCurrent / safeTotal) * 100);
    const caption = label ?? `Step ${safeCurrent} of ${safeTotal}`;
    const track = (0, color_1.withAlpha)(colors.primary, 0.1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: safeTotal, now: safeCurrent }, accessibilityLabel: caption, style: [{ gap: tokens.spacing.sm }, style], children: [showLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: caption }), variant !== 'fraction' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: [pct, "%"] })) : null] })) : null, variant === 'bar' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${pct}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }) })) : variant === 'steps' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: Array.from({ length: safeTotal }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: 8,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i < safeCurrent ? colors.primary : track,
                    } }, i))) })) : null] }));
}
//# sourceMappingURL=SurveyProgressV4.js.map