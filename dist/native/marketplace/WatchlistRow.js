"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistRow = WatchlistRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
/**
 * A row in a saved / watchlist screen — thumbnail, title, price (with optional
 * compare-at drop), a condition chip, and a ♥ watch toggle. The toggle sits
 * outside the row's press target so un-watching never also navigates.
 * Presentational: shaped data + callbacks only. `ended` dims the row and shows
 * a "Sold" badge (state via text + tone, not color alone). Reuses `PriceTag`,
 * `Badge`, and `ConditionBadge`; token-only colors via `useXenitionTheme()`.
 */
function WatchlistRow({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const thumb = 64;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, opacity: ended ? 0.6 : 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: thumb,
                    height: thumb,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: thumb, height: thumb }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No photo" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, ended ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: "Sold" })) : null] })] })] }));
    const toggle = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: watched }, accessibilityLabel: watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: ({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: content })) : (content), toggle] }));
}
//# sourceMappingURL=WatchlistRow.js.map