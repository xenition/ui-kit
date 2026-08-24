"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindfulnessStreakV2 = MindfulnessStreakV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
const ARC_HEIGHT = 44;
const DOT = 20;
/**
 * MindfulnessStreak — **flame hero** design (v2). A big flame in a large tinted
 * disc with a huge day count beside it and the best streak underneath, crowned
 * by the last 7 days laid out as a curved dot arc (practiced days fill the tone
 * color, missed days read as a muted track — state via fill + a11y, not color
 * alone). At `count` 0 it drops the flame for a seed and an encouraging prompt.
 * Same props as {@link MindfulnessStreakProps}; token-only colors.
 */
function MindfulnessStreakV2({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const active = count > 0;
    const last7 = (week ?? []).slice(-7);
    const summary = active
        ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
        : emptyLabel;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: summary, style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                alignItems: 'center',
            }, children: [last7.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `Last ${last7.length} days`, style: { height: ARC_HEIGHT + DOT + 14, alignSelf: 'stretch' }, children: DAY_LABELS.map((day, i) => {
                        const f = i / (DAY_LABELS.length - 1);
                        const done = last7[i] === true;
                        const top = ARC_HEIGHT * (1 - Math.sin(Math.PI * f));
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', left: `${6 + f * 88}%`, top, marginLeft: -(DOT / 2), alignItems: 'center', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${done ? 'Practiced' : 'Missed'}, day ${i + 1}`, style: {
                                        width: DOT,
                                        height: DOT,
                                        borderRadius: tokens.radius.full,
                                        borderWidth: 1,
                                        borderColor: done ? accent : colors.border,
                                        backgroundColor: done ? accent : (0, color_1.withAlpha)(colors.muted, 0.12),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: colors.onPrimary }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: day })] }, i));
                    }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 84,
                                height: 84,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(accent, active ? 0.16 : 0.08),
                                borderWidth: 2,
                                borderColor: (0, color_1.withAlpha)(accent, active ? 0.4 : 0.16),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: active ? '🔥' : '🌱' }) }), active ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: accent,
                                                fontSize: tokens.typography.scale['3xl'],
                                                fontWeight: '800',
                                                fontFamily: tokens.typography.fontHeading,
                                            }, children: count }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [unit, count === 1 ? '' : 's'] })] }), best != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["Best ", best, " ", unit, best === 1 ? '' : 's'] })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', flexShrink: 1 }, children: emptyLabel }))] })] }) }));
}
//# sourceMappingURL=MindfulnessStreakV2.js.map