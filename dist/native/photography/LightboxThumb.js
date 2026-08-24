"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxThumb = LightboxThumb;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const THUMB_PX = {
    sm: 48,
    md: 64,
};
/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through the accessibility
 * `selected` state (not color alone) and exposes a `button` when pressable.
 * Meant to be laid out in a horizontal scroll strip under a `Lightbox`.
 * Token-only colors.
 */
function LightboxThumb({ url, alt, active = false, size = 'md', index, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const px = THUMB_PX[size];
    const frame = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: px,
                height: px,
                borderRadius: tokens.radius.sm,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[100],
                borderWidth: active ? 2 : 1,
                borderColor: active ? colors.accent : colors.border,
                opacity: active ? 1 : 0.7,
            },
            style,
        ], children: url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo'), accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: frame }));
    }
    return frame;
}
//# sourceMappingURL=LightboxThumb.js.map