"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistRowV2 = WatchlistRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * WatchlistRow — Design V2: an **elevated media-left tile that leans into the
 * price drop**. A larger thumbnail leads; the title, condition, and price stack
 * in the middle; and when a `compareAtCents` is higher than the current price a
 * success-toned "▼ Save $X" callout announces the drop — the reason a shopper
 * saved the item. The ♥ toggle is a circular tinted button on the trailing
 * edge, kept outside the row press target. `ended` dims the tile and shows a
 * "Sold" badge (state via text + tone). Same props as `WatchlistRow`;
 * token-pure with `withAlpha` tints; elevated surface.
 */
function WatchlistRowV2({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const thumb = 88;
    const dropCents = typeof compareAtCents === 'number' && compareAtCents > priceCents ? compareAtCents - priceCents : 0;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, opacity: ended ? 0.6 : 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: thumb,
                    height: thumb,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: thumb, height: thumb }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No photo" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, ended ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: "Sold" })) : dropCents > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: `▼ Save ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(dropCents / 100)}` })) : null] })] })] }));
    const toggle = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: watched }, accessibilityLabel: watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: ({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: watched ? (0, internal_1.withAlpha)(colors.danger, 0.12) : (0, internal_1.withAlpha)(colors.muted, 0.1),
            opacity: pressed ? 0.7 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            (0, elevation_1.shadow)('md', tokens),
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: content })) : (content), toggle] }));
}
//# sourceMappingURL=WatchlistRowV2.js.map