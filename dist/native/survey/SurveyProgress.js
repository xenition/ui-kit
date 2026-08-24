"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyProgress = SurveyProgress;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Survey completion indicator — `bar` wraps the token `Progress` primitive,
 * `steps` renders a segmented dot-per-question track, and `fraction` shows just
 * the `"X of Y"` caption. Exposes a `progressbar` role with min/max/now so
 * assistive tech can read completion. `current` is clamped into `[0, total]`.
 * No literal colors.
 */
function SurveyProgress({ current, total, variant = 'bar', showLabel = true, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const caption = label ?? `Question ${safeCurrent} of ${safeTotal}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: safeTotal, now: safeCurrent }, accessibilityLabel: caption, style: [{ gap: tokens.spacing.xs }, style], children: [showLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: caption }), variant !== 'fraction' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [Math.round((safeCurrent / safeTotal) * 100), "%"] })) : null] })) : null, variant === 'bar' ? ((0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: safeCurrent, max: safeTotal, tone: "primary", size: "md" })) : variant === 'steps' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: Array.from({ length: safeTotal }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i < safeCurrent ? colors.primary : colors.border,
                    } }, i))) })) : null] }));
}
//# sourceMappingURL=SurveyProgress.js.map