"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaFigure = MediaFigure;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single media item with its caption — the native mirror of the web
 * `MediaFigure`. An `Image` inside an aspect-ratio box (from `width`/`height`,
 * via the RN `aspectRatio` style, so no layout jump) plus a caption. When
 * `onActivate` is provided the media is a `Pressable` `button`. Token-only.
 */
function MediaFigure({ item, reserveAspect = true, onActivate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const ratio = reserveAspect && item.width && item.height ? item.width / item.height : undefined;
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: '100%',
            aspectRatio: ratio,
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.url }, 
            // When wrapped in a Pressable, that button owns accessibility.
            accessible: !onActivate, accessibilityLabel: onActivate ? undefined : item.alt ?? item.caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [onActivate ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.alt ?? item.caption ?? 'Open media', onPress: onActivate, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: media })) : (media), item.caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: 20 }, children: item.caption })) : null] }));
}
//# sourceMappingURL=MediaFigure.js.map