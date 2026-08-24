"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastButton = CastButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GLYPH_SIZE = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
};
/**
 * A cast / AirPlay toggle — a UI shell that reports taps via `onPress` and
 * reflects the current `connected` state in its color and accessible label
 * ("Cast to a device" vs. "Casting to <device>. Disconnect"). No native cast
 * dependency; wire an app's cast framework to `onPress`. Token-only: the active
 * (connected) tint is `primary`, idle is `onSurface`.
 */
function CastButton({ connected = false, deviceName, variant = 'icon', size = 'md', onPress, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tint = connected ? 'primary' : 'onSurface';
    const label = connected
        ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
        : 'Cast to a device';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected: connected, disabled }, disabled: disabled || !onPress, onPress: onPress, hitSlop: 8, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: connected ? '📲' : '🔗', size: GLYPH_SIZE[size], color: tint }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors[tint],
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: connected && deviceName ? deviceName : 'Cast' })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {}))] }));
}
//# sourceMappingURL=CastButton.js.map