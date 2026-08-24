"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistRowV3 = WatchlistRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
/**
 * WatchlistRow — Design V3: an **ultra-minimal list line**. A small rounded
 * thumbnail leads, the title takes a single line, and the price is right-aligned
 * as a trailing stack with a compact ♥ toggle — separation comes from a single
 * bottom hairline, no card border or fill. Built for long, dense saved-item
 * lists. The toggle stays outside the row press target; `ended` dims the line
 * and appends a "Sold" badge (state via text + tone). Same props as
 * `WatchlistRow`; token-pure with `withAlpha` tints.
 */
function WatchlistRowV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const thumb = 44;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1, opacity: ended ? 0.6 : 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: thumb,
                    height: thumb,
                    borderRadius: tokens.radius.sm,
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: thumb, height: thumb }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u2014" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), condition && !ended ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "sm" }), ended ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: "Sold" })) : null] })] }));
    const toggle = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: watched }, accessibilityLabel: watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: ({ pressed }) => ({ paddingLeft: tokens.spacing.sm, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: (0, internal_1.withAlpha)(colors.border, 0.6),
                backgroundColor: 'transparent',
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: content })) : (content), toggle] }));
}
//# sourceMappingURL=WatchlistRowV3.js.map