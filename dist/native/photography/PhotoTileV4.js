"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTileV4 = PhotoTileV4;
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
 * PhotoTile — **V4** "studio" design. The matted, image-forward take on a photo
 * tile: an elevated card whose photo floats inside a thin neutral **mat** ring,
 * honoring all three `ratio` presets — `square`, `portrait` (3/4), and
 * `landscape` (4/3). `selected` and `favorite` are shown by a glyph + token
 * color (never color alone), the `caption` reads as a small soft-primary chip,
 * and `loading` draws a token skeleton. Identical props/behavior to
 * {@link PhotoTileProps}; `onPress` makes the whole tile a button. Token-only
 * colors via `useXenitionTheme()`.
 */
function PhotoTileV4({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const aspect = RATIO_VALUE[ratio];
    const containerStyle = [
        {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.sm,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading photo", style: containerStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: '100%',
                    aspectRatio: aspect,
                    borderRadius: tokens.radius.md,
                    backgroundColor: tokens.ramps.neutral[200],
                } }) }));
    }
    // The matted photo: the image floats inside a thin inset mat ring on a neutral ground.
    const media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: '100%',
            aspectRatio: aspect,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: tokens.ramps.neutral[100],
            alignItems: 'center',
            justifyContent: 'center',
        }, children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDDBC" })), favorite ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.xs,
                    right: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2605", size: "sm", color: "primary", accessibilityLabel: "Favourite" }) })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.xs,
                    left: tokens.spacing.xs,
                    backgroundColor: colors.accent,
                    borderRadius: tokens.radius.full,
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "onAccent", accessibilityLabel: "Selected" }) })) : null] }));
    const chip = caption ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                alignSelf: 'flex-start',
                maxWidth: '100%',
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: caption }) }) })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, chip] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? caption ?? 'Photo', accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=PhotoTileV4.js.map