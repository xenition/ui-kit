"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumCardV2 = AlbumCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/** Cover height for the full-bleed hero. */
const COVER_HEIGHT = 200;
/**
 * AlbumCard — design variant **V2**: a **full-bleed cover** tile. The cover photo
 * fills the whole card and the title, photo-count and date sit over a bottom
 * gradient-style scrim, so the image is the card rather than a thumbnail beside
 * text. A private album still shows a labelled `Badge`, floated top-right over
 * the cover. Same props as {@link AlbumCardProps}; token-only scrim from the
 * neutral ramp, guarded, with a loading skeleton.
 */
function AlbumCardV2({ title, photoCount, dateText, coverUrl, isPrivate = false, loading = false, onPress, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const containerStyle = [
        {
            height: COVER_HEIGHT,
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.ramps.neutral[100],
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading album", style: [
                {
                    height: COVER_HEIGHT,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: tokens.ramps.neutral[200],
                },
                style,
            ] }));
    }
    const metaBits = [];
    if (typeof photoCount === 'number')
        metaBits.push(`${photoCount} ${countLabel}`);
    if (dateText)
        metaBits.push(dateText);
    const scrim = (0, color_1.withAlpha)(tokens.ramps.neutral[900], 0.55);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: !onPress, accessibilityLabel: onPress ? undefined : title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, isPrivate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", variant: "soft", size: "sm", children: "Private" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: scrim,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    gap: 2,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: tokens.ramps.neutral[50],
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '700',
                        }, children: title }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: tokens.ramps.neutral[200], fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [...enter.transform, { scale: press.scale }], opacity: enter.opacity }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''}${isPrivate ? ', private' : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: containerStyle, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner }));
}
//# sourceMappingURL=AlbumCardV2.js.map