"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastButtonV4 = CastButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GLYPH_SIZE = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
};
/**
 * CastButton — **V4** "spotlight" design. A polished cast control: the glyph
 * (plus a "Cast" / device-name label in the `labeled` variant) sits in a ≥44px
 * rounded tap target that lights up with a soft `withAlpha(primary, 0.12)` tint
 * and a `primary` accent when **connected**, staying plain otherwise. Keeps the
 * base's variants (`icon` / `labeled`) and sizes, and reports taps via
 * `onPress`. The `connected` state is reflected in the color, accessibility
 * state, and accessible label ("Cast to a device" vs. "Casting to <device>.
 * Disconnect"). Token-only colors via `useXenitionTheme()` + `withAlpha` — no
 * literal hex.
 */
function CastButtonV4({ connected = false, deviceName, variant = 'icon', size = 'md', onPress, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tint = connected ? 'primary' : 'onSurface';
    const label = connected
        ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
        : 'Cast to a device';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected: connected, disabled }, disabled: disabled || !onPress, onPress: onPress, hitSlop: 8, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // ≥44px rounded tap target with 8-pt padding.
                minHeight: 44,
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                // V4 spotlight: soft-primary tint + accent when connected, plain otherwise.
                backgroundColor: connected ? (0, color_1.withAlpha)(colors.primary, 0.12) : 'transparent',
                opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: connected ? '📲' : '🔗', size: GLYPH_SIZE[size], color: tint }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors[tint],
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: connected && deviceName ? deviceName : 'Cast' })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {}))] }));
}
//# sourceMappingURL=CastButtonV4.js.map