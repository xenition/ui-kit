"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTCardV2 = NFTCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const NetworkBadge_1 = require("./NetworkBadge");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const format_1 = require("./internal/format");
/**
 * NFTCard, redesigned (v2): **full-bleed artwork** with a scrim overlay. The
 * image fills the whole tile; a stacked translucent veil at the foot (built from
 * `onSurface` at low alpha, so it stays token-pure and adapts to both themes)
 * lets the collection, name, and floor sit over the art in the paired `surface`
 * text color, and the network chip floats top-right. Floor is fixed-precision
 * (no float drift). Distinct at a glance from v1's media-over-meta stack. Same
 * props; handles `loading` and a missing image.
 */
function NFTCardV2({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    // Scrim + on-scrim text from the base contrast pair, so it reads in both
    // themes without a literal color: a translucent `onSurface` veil, `surface` ink.
    const veil = (0, color_1.withAlpha)(colors.onSurface, 0.66);
    const veilSoft = (0, color_1.withAlpha)(colors.onSurface, 0.28);
    const ink = colors.surface;
    const inkSoft = (0, color_1.withAlpha)(colors.surface, 0.82);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                height: 220,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[100],
                justifyContent: 'flex-end',
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading artwork", style: { ...StyleFill, backgroundColor: colors.border, opacity: 0.5 } })) : image != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: image }, accessibilityLabel: name, resizeMode: "cover", style: StyleFill })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...StyleFill, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No image" }) })), network != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, backgroundColor: veilSoft } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: 2,
                    padding: tokens.spacing.md,
                    backgroundColor: veil,
                }, children: [collection != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: collection })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), floorAmount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: "Floor" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })] })) : null] })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: collection ? `${name}, ${collection}` : name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
const StyleFill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' };
//# sourceMappingURL=NFTCardV2.js.map