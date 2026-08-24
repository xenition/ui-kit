"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnoozeRow = SnoozeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. Used to build the snooze picker sheet. The `selected` state tints
 * the row and shows a check, and reports `selected` to assistive tech (not by
 * color only). No literal colors.
 */
function SnoozeRow({ label, when, glyph = '⏰', selected = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Snooze ${label}${when ? `, ${when}` : ''}`, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: selected ? (0, tint_1.withAlpha)(colors.primary, 0.12) : pressed ? colors.border : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: selected ? 'primary' : 'muted' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: selected ? '700' : '500',
                }, children: label }), when ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: when })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "base", color: "primary" }) })) : null] }));
}
//# sourceMappingURL=SnoozeRow.js.map