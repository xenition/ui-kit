"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxThumbV4 = LightboxThumbV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Studio mat sizes — both stay ≥44px so a pressable thumb is a valid tap target. */
const THUMB_PX = {
    sm: 56,
    md: 80,
};
/**
 * LightboxThumb — **V4** "studio" design (native parity of the web V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`borderWidth: 1`, `border` token) over a `neutral[100]` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns `primary` and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via the
 * accessibility `selected` state. Both `sm` (56px) and `md` (80px) sizes are
 * honored and stay ≥44px so a pressable thumb is a valid tap target. Exposes a
 * `button` with an accessible label when `onPress` is set. Identical
 * props/behavior to {@link LightboxThumbProps}; token-only colors via
 * `useXenitionTheme()`, no literals.
 */
function LightboxThumbV4({ url, alt, active = false, size = 'md', index, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const px = THUMB_PX[size];
    const frame = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                width: px,
                height: px,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[100],
                borderWidth: active ? 2 : 1,
                borderColor: active ? colors.primary : colors.border,
                opacity: active ? 1 : 0.8,
            },
            style,
        ], children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 16,
                    height: 16,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: 10, fontWeight: '700' }, children: "\u2713" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo'), accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: frame }));
    }
    return frame;
}
//# sourceMappingURL=LightboxThumbV4.js.map