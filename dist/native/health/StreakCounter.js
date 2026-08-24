"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakCounter = StreakCounter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TONE_COLOR = {
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    accent: 'accent',
};
/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. All colors trace to `SemanticColors` tokens — no literals.
 */
function StreakCounter({ count, unit = 'day', label = 'streak', tone = 'warn', best, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safe = Math.max(Math.floor(count), 0);
    const accent = colors[TONE_COLOR[tone]];
    const unitLabel = safe === 1 ? unit : `${unit}s`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: safe === 0 ? 'No active streak' : `${safe} ${unitLabel} ${label}`, style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: safe === 0 ? '🌱' : '🔥' }), safe === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Start your streak" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: safe }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: unitLabel })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label })] })), best != null && best > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Best: ", Math.max(Math.floor(best), 0)] })) : null] }));
}
//# sourceMappingURL=StreakCounter.js.map