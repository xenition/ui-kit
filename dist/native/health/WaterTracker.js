"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterTracker = WaterTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Token-only colors.
 */
function WaterTracker({ count, goal, mlPerGlass, onChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (goal <= 0) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No hydration goal set" });
    }
    const safeGoal = Math.floor(goal);
    const filled = Math.min(Math.max(Math.floor(count), 0), safeGoal);
    const met = filled >= safeGoal;
    const handlePress = (index) => {
        if (!onChange)
            return;
        const position = index + 1;
        onChange(position === filled ? position - 1 : position);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Water: ${filled} of ${safeGoal} glasses${met ? ', goal reached' : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "\uD83D\uDCA7 Water" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: met ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [filled, " / ", safeGoal, mlPerGlass != null ? `  ·  ${filled * mlPerGlass} ml` : ''] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: Array.from({ length: safeGoal }, (_, i) => {
                    const isFilled = i < filled;
                    const glass = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, opacity: isFilled ? 1 : 0.3 }, children: isFilled ? '🥛' : '🥛' }));
                    if (!onChange) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`, children: glass }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`, onPress: () => handlePress(i), style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: glass }, i));
                }) })] }));
}
//# sourceMappingURL=WaterTracker.js.map