"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindfulnessStreak = MindfulnessStreak;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * A mindfulness streak card: a flame + big day count, an optional best-streak
 * stat, and a 7-day dot strip where practiced days fill in the tone color and
 * missed days read as a muted track (state via fill + a11y label, not color
 * alone). At `count` 0 it drops the flame and shows an encouraging prompt.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
function MindfulnessStreak({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const active = count > 0;
    const last7 = (week ?? []).slice(-7);
    const summary = active
        ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
        : emptyLabel;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: summary, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, active ? 0.16 : 0.08),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: active ? '🔥' : '🌱' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: active ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: accent,
                                                fontSize: tokens.typography.scale['3xl'],
                                                fontWeight: '800',
                                                fontFamily: tokens.typography.fontHeading,
                                            }, children: count }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [unit, count === 1 ? '' : 's'] })] }), best != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Best ", best, " ", unit, best === 1 ? '' : 's'] })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: emptyLabel })) })] }), last7.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: DAY_LABELS.map((day, i) => {
                    const done = last7[i] === true;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${done ? 'Practiced' : 'Missed'}, day ${i + 1}`, style: {
                                    width: 22,
                                    height: 22,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: 1,
                                    borderColor: done ? accent : colors.border,
                                    backgroundColor: done ? accent : (0, color_1.withAlpha)(colors.muted, 0.12),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: colors.onPrimary }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: day })] }, i));
                }) })) : null] }));
}
//# sourceMappingURL=MindfulnessStreak.js.map