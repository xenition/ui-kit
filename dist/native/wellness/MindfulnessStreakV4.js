"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindfulnessStreakV4 = MindfulnessStreakV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
/**
 * MindfulnessStreakV4 — the "calm" restyle of {@link MindfulnessStreak}. Same
 * props, defaults, labels, a11y and behavior; the card becomes a soft gradient
 * hero: the streak count huge in near-white ink, the unit and best-streak stat
 * in the softer ink, and the last-7 week as frosted dots (filled vs outline).
 * The empty state (`count` 0) shows the same encouraging prompt.
 */
function MindfulnessStreakV4({ count, best, week, 
// tone retained for parity; the calm ground is single-hue.
tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, calm_1.calmInk)(r);
    const inkSoft = (0, calm_1.calmInkSoft)(r);
    const active = count > 0;
    void tone;
    const last7 = (week ?? []).slice(-7);
    const summary = active
        ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
        : emptyLabel;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: summary, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                overflow: 'hidden',
                gap: tokens.spacing.md,
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 56,
                                height: 56,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, calm_1.calmTile)(r, 0.22),
                                borderWidth: 1,
                                borderColor: (0, calm_1.calmBorder)(r),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: active ? '🔥' : '🌱' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: active ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    color: ink,
                                                    fontSize: tokens.typography.scale['3xl'],
                                                    fontWeight: '800',
                                                    fontFamily: tokens.typography.fontHeading,
                                                }, children: count }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: [unit, count === 1 ? '' : 's'] })] }), best != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: ["Best ", best, " ", unit, best === 1 ? '' : 's'] })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: emptyLabel })) })] }), last7.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: DAY_LABELS.map((day, i) => {
                        const done = last7[i] === true;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${done ? 'Practiced' : 'Missed'}, day ${i + 1}`, style: {
                                        width: 22,
                                        height: 22,
                                        borderRadius: tokens.radius.full,
                                        borderWidth: 1,
                                        borderColor: (0, calm_1.calmBorder)(r),
                                        backgroundColor: done ? (0, calm_1.calmTile)(r, 0.9) : 'transparent',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: tokens.ramps.primary[700] }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: day })] }, i));
                    }) })) : null] }) }));
}
//# sourceMappingURL=MindfulnessStreakV4.js.map