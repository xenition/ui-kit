"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingChecklist = OnboardingChecklist;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A getting-started checklist with a completion meter (design.md §42): a
 * progress bar + "N of M" count over a list of steps, each showing a check when
 * done. Completed steps are struck-through and muted. Token-only.
 */
function OnboardingChecklist({ steps, title = 'Get started', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = steps.length;
    const doneCount = steps.filter((s) => s.done).length;
    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '700',
                                }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [doneCount, " of ", total] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, style: {
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.border,
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: `${pct}%`,
                                height: '100%',
                                backgroundColor: colors.primary,
                            } }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: steps.map((step, i) => {
                    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 22,
                                    height: 22,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: step.done ? 0 : 1,
                                    borderColor: colors.border,
                                    backgroundColor: step.done ? colors.success : colors.surface,
                                }, children: step.done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSuccess,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '700',
                                    }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: step.done ? colors.muted : colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                            textDecorationLine: step.done ? 'line-through' : 'none',
                                        }, children: step.label }), step.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: step.description })) : null] })] }));
                    if (!step.onPress) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${step.label}, ${step.done ? 'completed' : 'not completed'}`, children: row }, `${step.label}-${i}`));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${step.label}, ${step.done ? 'completed' : 'not completed'}`, onPress: step.onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }, `${step.label}-${i}`));
                }) })] }));
}
//# sourceMappingURL=OnboardingChecklist.js.map