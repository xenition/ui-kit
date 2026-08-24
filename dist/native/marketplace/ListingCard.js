"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingCard = ListingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only,
 * nothing fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the compiled theme via `useXenitionTheme()`; tints use a token-derived alpha.
 * Pass `loading` for a recap.
 */
function ListingCard({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, onPress, variant = 'grid', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const horizontal = variant === 'list';
    const mediaSize = variant === 'featured' ? 220 : horizontal ? 96 : 160;
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: watched ? `Unwatch ${title}` : `Watch ${title}`, accessibilityState: { selected: watched }, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: {
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, internal_1.withAlpha)(colors.surface, 0.85),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    const media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: horizontal ? mediaSize : '100%',
            height: mediaSize,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" })), horizontal ? null : watchChip] }));
    const info = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: 2, justifyContent: 'center' }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: variant === 'featured' ? 'lg' : 'md' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }, children: subtitle })) : null] })] })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: horizontal ? 'row' : 'column',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [media, info, horizontal ? watchChip : null] }));
    if (!onPress)
        return body;
    const priceLabel = (0, primitives_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=ListingCard.js.map