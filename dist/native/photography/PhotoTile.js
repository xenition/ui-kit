"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTile = PhotoTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const RATIO_VALUE = {
    square: 1,
    portrait: 3 / 4,
    landscape: 4 / 3,
};
/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * A single photo tile — the atomic unit of a grid or selection sheet. Draws the
 * image inside an aspect-ratio box (`square`/`portrait`/`landscape`), an
 * optional overlaid `caption`, a `favorite` star marker, and a `selected` ring
 * with a check badge. Selection/favourite states carry a glyph + accessibility
 * state, never color alone. `onPress` makes it a `button`; token-only colors.
 */
function PhotoTile({ url, alt, caption, ratio = 'square', selected = false, favorite = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const aspect = RATIO_VALUE[ratio];
    const frameStyle = {
        width: '100%',
        aspectRatio: aspect,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
        borderWidth: selected ? 2 : 0,
        borderColor: selected ? colors.accent : 'transparent',
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading photo", style: [{ ...frameStyle, backgroundColor: tokens.ramps.neutral[200] }, style] }));
    }
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frameStyle, style], children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, accessible: !onPress, accessibilityLabel: onPress ? undefined : alt ?? caption ?? '', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, favorite ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.xs,
                    right: tokens.spacing.xs,
                    backgroundColor: withAlpha(colors.onSurface, 0.5),
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2605", size: "sm", color: "onAccent", accessibilityLabel: "Favourite" }) })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.xs,
                    left: tokens.spacing.xs,
                    backgroundColor: colors.accent,
                    borderRadius: tokens.radius.full,
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "onAccent", accessibilityLabel: "Selected" }) })) : null, caption ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: withAlpha(colors.onSurface, 0.45),
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onAccent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: caption }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: alt ?? caption ?? 'Photo', accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
    }
    return content;
}
//# sourceMappingURL=PhotoTile.js.map