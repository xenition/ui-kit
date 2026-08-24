"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTCardV3 = NFTCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const NetworkBadge_1 = require("./NetworkBadge");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./internal/format");
/**
 * NFTCard, redesigned (v3): a **grid tile with a bottom info strip**. The artwork
 * runs flush to the top corners as a square; a flat filled strip (neutral ramp)
 * below it — separated by a hairline — carries the name and, on its own line, the
 * collection with a right-aligned floor (fixed precision — no float drift). No
 * overlay, no shadow: a clean gallery tile that tessellates in a grid. Distinct
 * at a glance from v1's outlined card and v2's full-bleed scrim. Same props;
 * handles `loading` and a missing image.
 */
function NFTCardV3({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 1, backgroundColor: tokens.ramps.neutral[100], alignItems: 'center', justifyContent: 'center' }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading artwork", style: { width: '100%', height: '100%', backgroundColor: colors.border, opacity: 0.5 } })) : image != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: image }, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No image" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: tokens.spacing.xs,
                    padding: tokens.spacing.sm,
                    backgroundColor: tokens.ramps.neutral[100],
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [network != null ? ((0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" })) : collection != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: collection })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), floorAmount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })) : null] })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: collection ? `${name}, ${collection}` : name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }) }));
}
//# sourceMappingURL=NFTCardV3.js.map