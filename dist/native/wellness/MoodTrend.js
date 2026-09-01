"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodTrend = MoodTrend;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MOOD_BAR = {
    awful: { level: 1, color: 'danger' },
    bad: { level: 2, color: 'warn' },
    okay: { level: 3, color: 'muted' },
    good: { level: 4, color: 'primary' },
    great: { level: 5, color: 'success' },
};
const MAX_BAR_HEIGHT = 96;
/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
function MoodTrend({ data, title = 'Mood this week', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), data.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: "No mood data yet." })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.xs,
                    height: MAX_BAR_HEIGHT + tokens.spacing.md,
                }, children: data.map((point, i) => {
                    const meta = MOOD_BAR[point.mood] ?? MOOD_BAR.okay;
                    const height = Math.max(4, (meta.level / 5) * MAX_BAR_HEIGHT);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${point.label}: ${point.mood}`, style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end', alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height,
                                        borderRadius: tokens.radius.sm,
                                        backgroundColor: colors[meta.color],
                                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: point.label })] }, `${point.label}-${i}`));
                }) }))] }));
}
//# sourceMappingURL=MoodTrend.js.map