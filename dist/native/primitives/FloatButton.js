"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatButton = FloatButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance anchored to a screen corner. Background is the `primary` token,
 * content the `onPrimary` token, with a token-derived shadow (the darkest
 * neutral ramp step as `shadowColor`). Absolutely positioned by `placement`;
 * override via `style`. No literal colors.
 */
function FloatButton({ onPress, icon, label, placement = 'bottom-right', disabled = false, accessibilityLabel, style, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const anchor = placement === 'bottom-left'
        ? { left: tokens.spacing.lg }
        : placement === 'bottom-center'
            ? { alignSelf: 'center', left: 0, right: 0 }
            : { right: tokens.spacing.lg };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel ?? label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [
            {
                position: 'absolute',
                bottom: tokens.spacing.xl,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: placement === 'bottom-center' ? 'center' : undefined,
                gap: label ? tokens.spacing.xs : 0,
                minHeight: 56,
                minWidth: 56,
                height: label ? 56 : undefined,
                width: label ? undefined : 56,
                paddingHorizontal: label ? tokens.spacing.lg : 0,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
                shadowColor: tokens.ramps.neutral[950],
                shadowOpacity: 0.3,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 6,
                opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            },
            anchor,
            style,
        ], ...rest, children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label })) : null] }));
}
//# sourceMappingURL=FloatButton.js.map