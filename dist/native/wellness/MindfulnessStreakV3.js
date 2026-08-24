"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindfulnessStreakV3 = MindfulnessStreakV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * MindfulnessStreak — **compact line** design (v3). One slim row: a small flame,
 * the day count with its unit, the best streak as a muted trailing stat, and a
 * tight inline 7-dot strip on the right (practiced days fill the tone color,
 * missed days read as a muted track — state via fill + a11y, not color alone).
 * At `count` 0 it shows a seed and an encouraging prompt. Same props as
 * {@link MindfulnessStreakProps}; token-only colors.
 */
function MindfulnessStreakV3({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const active = count > 0;
    const last7 = (week ?? []).slice(-7);
    const summary = active
        ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
        : emptyLabel;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: summary, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: active ? '🔥' : '🌱' }), active ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4, flexShrink: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: count }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [unit, count === 1 ? '' : 's'] }), best != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 best ", best] })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }, children: emptyLabel })), last7.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `Last ${last7.length} days`, style: { flexDirection: 'row', alignItems: 'center', gap: 3, marginLeft: 'auto' }, children: last7.map((d, i) => {
                        const done = d === true;
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${done ? 'Practiced' : 'Missed'}, day ${i + 1}`, style: {
                                width: 10,
                                height: 10,
                                borderRadius: tokens.radius.full,
                                backgroundColor: done ? accent : (0, color_1.withAlpha)(colors.muted, 0.2),
                            } }, i));
                    }) })) : null] }) }));
}
//# sourceMappingURL=MindfulnessStreakV3.js.map