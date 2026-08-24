"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTCard = NFTCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const NetworkBadge_1 = require("./NetworkBadge");
const format_1 = require("./internal/format");
/**
 * A collectible tile: artwork (or a token-bound `No image` placeholder), name,
 * collection, an optional chain {@link NetworkBadge}, and a floor price
 * (fixed-precision — no float drift). `grid` stacks the media over the meta;
 * `list` places a thumbnail beside it. Handles a `loading` skeleton and a
 * missing image gracefully. Token-bound throughout.
 */
function NFTCard({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant = 'grid', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isList = variant === 'list';
    const mediaSize = isList ? 64 : undefined;
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: mediaSize ?? '100%',
            height: mediaSize ?? 160,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
            alignItems: 'center',
            justifyContent: 'center',
        }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading artwork", style: { width: '100%', height: '100%', backgroundColor: colors.border, opacity: 0.5 } })) : image != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: image }, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No image" })) }));
    const meta = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: isList ? 1 : undefined, gap: tokens.spacing.xs, marginTop: isList ? 0 : tokens.spacing.sm }, children: [collection != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: collection })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [network != null ? (0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" }) : (0, jsx_runtime_1.jsx)(react_native_1.View, {}), floorAmount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Floor" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })] })) : null] })] }));
    const inner = isList ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [media, meta] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [media, meta] }));
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "sm", style: style, children: onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: collection ? `${name}, ${collection}` : name, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner })) : (inner) }));
}
//# sourceMappingURL=NFTCard.js.map