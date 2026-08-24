"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTileV2 = PhotoTileV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const RATIO_VALUE = {
    square: 1,
    portrait: 3 / 4,
    landscape: 4 / 3,
};
/**
 * PhotoTile — design variant **V2**: a **large, selection-first tile**. A thick
 * accent ring wraps the whole tile when selected and a big circular check floats
 * top-left; a pill-backed favourite star floats top-right; a stronger caption
 * scrim anchors the foot. Built for cull / proofing sheets where selection and
 * favouriting are the primary gestures. Selection and favourite carry a glyph +
 * a11y state, never colour alone. Same props as {@link PhotoTileProps}; token-only.
 */
function PhotoTileV2({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const aspect = RATIO_VALUE[ratio];
    const frameStyle = {
        width: '100%',
        aspectRatio: aspect,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
        borderWidth: selected ? 3 : 1,
        borderColor: selected ? colors.accent : colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading photo", style: [{ ...frameStyle, borderWidth: 0, backgroundColor: tokens.ramps.neutral[200] }, style] }));
    }
    const scrim = (0, color_1.withAlpha)(tokens.ramps.neutral[900], 0.5);
    const chipBg = (0, color_1.withAlpha)(tokens.ramps.neutral[900], 0.45);
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frameStyle, style], children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    left: tokens.spacing.sm,
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "base", color: "onAccent", accessibilityLabel: "Selected" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.full,
                    backgroundColor: chipBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: favorite ? '★' : '☆', size: "base", color: favorite ? 'accent' : 'onAccent', accessibilityLabel: favorite ? 'Favourited' : 'Not favourited' }) }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: scrim,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: caption }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? caption ?? 'Photo', accessibilityState: { selected }, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: content }) }));
    }
    return content;
}
//# sourceMappingURL=PhotoTileV2.js.map