"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidRow = BidRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone). Reuses `Avatar`,
 * `Badge`, and the shared `formatMoney`; token-only colors via
 * `useXenitionTheme()`.
 */
function BidRow({ bidder, amountCents, currency = 'USD', avatarUrl, timeLabel, leading = false, isYou = false, rank, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const name = isYou ? 'You' : bidder;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${leading ? 'Leading bid, ' : ''}${name}, ${(0, primitives_1.formatMoney)(amountCents, currency)}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: leading ? colors.success : colors.border,
                backgroundColor: leading ? (0, internal_1.withAlpha)(colors.success, 0.1) : colors.surface,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 20, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: rank })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xs" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), leading ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "Leading" })) : null] }), timeLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timeLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: leading ? colors.success : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                }, children: (0, primitives_1.formatMoney)(amountCents, currency) })] }));
}
//# sourceMappingURL=BidRow.js.map