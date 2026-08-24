"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateNavigator = DateNavigator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Segmented_1 = require("../primitives/Segmented");
const VIEW_LABEL = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
};
/**
 * The header control strip for any scheduling surface: prev/next chevrons
 * around a period `title`, an optional "Today" reset, and an optional
 * month/week/day `Segmented`. Purely presentational — the host owns the dates
 * and recomputes `title` on each change. Token colors only.
 */
function DateNavigator({ title, onPrev, onNext, onToday, view, onViewChange, views = ['month', 'week', 'day'], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const chevron = (label, symbol, onPress) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, disabled: onPress == null, onPress: onPress, style: ({ pressed }) => ({
            width: tokens.spacing.xl,
            height: tokens.spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: onPress == null ? 0.4 : pressed ? 0.7 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: symbol }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "toolbar", style: [{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexShrink: 1 }, children: [chevron('Previous', '‹', onPrev), chevron('Next', '›', onNext), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            marginLeft: tokens.spacing.xs,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '700',
                            flexShrink: 1,
                        }, children: title })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onToday ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Go to today", onPress: onToday, style: ({ pressed }) => ({
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            opacity: pressed ? 0.7 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Today" }) })) : null, view != null && onViewChange != null ? ((0, jsx_runtime_1.jsx)(Segmented_1.Segmented, { value: view, onChange: (v) => onViewChange(v), options: views.map((v) => ({ value: v, label: VIEW_LABEL[v] })) })) : null] })] }));
}
//# sourceMappingURL=DateNavigator.js.map