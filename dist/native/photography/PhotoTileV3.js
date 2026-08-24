"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTileV3 = PhotoTileV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const RATIO_VALUE = {
    square: 1,
    portrait: 3 / 4,
    landscape: 4 / 3,
};
/**
 * PhotoTile — design variant **V3**: a **compact thumbnail**. A small square-ish
 * chip with a tight radius and no caption chrome — selection is a slim accent
 * ring plus a tiny corner check, favourite a tiny star dot. Made for dense strips
 * and pickers where many thumbs share a row. Selection/favourite keep a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
function PhotoTileV3({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const aspect = RATIO_VALUE[ratio];
    const frameStyle = {
        width: '100%',
        aspectRatio: aspect,
        borderRadius: tokens.radius.sm,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
        borderWidth: selected ? 2 : 0,
        borderColor: selected ? colors.accent : 'transparent',
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading photo", style: [{ ...frameStyle, backgroundColor: tokens.ramps.neutral[200] }, style] }));
    }
    const chipBg = (0, color_1.withAlpha)(tokens.ramps.neutral[900], 0.45);
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frameStyle, style], children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, favorite ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    backgroundColor: chipBg,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: 3,
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2605", size: "xs", color: "accent", accessibilityLabel: "Favourited" }) })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 16,
                    height: 16,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "xs", color: "onAccent", accessibilityLabel: "Selected" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? caption ?? 'Photo', accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
    }
    return content;
}
//# sourceMappingURL=PhotoTileV3.js.map