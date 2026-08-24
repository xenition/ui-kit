"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionCard = AuctionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** Format a positive ms duration as the two most-significant units. */
function formatRemaining(ms) {
    if (ms <= 0)
        return 'Ended';
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (d > 0)
        return `${d}d ${h}h`;
    if (h > 0)
        return `${h}h ${m}m`;
    if (m > 0)
        return `${m}m ${s}s`;
    return `${s}s`;
}
/**
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors, tints via a
 * token-derived alpha.
 */
function AuctionCard({ title, currentBidCents, currency = 'USD', bidCount = 0, endsAtMs, nowMs, imageUrl, actionLabel = 'Place bid', onPlaceBid, variant = 'card', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const now = nowMs ?? Date.now();
    const remaining = endsAtMs - now;
    const ended = remaining <= 0;
    const compact = variant === 'compact';
    const timer = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: ended ? 'danger' : 'warn', variant: "soft", size: "sm", children: ended ? 'Ended' : `⏱ ${formatRemaining(remaining)}` }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [compact ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: 180,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }, children: timer })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), compact ? timer : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Current bid" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, primitives_1.formatMoney)(currentBidCents, currency) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}` })] }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onPlaceBid, disabled: ended, children: ended ? 'Auction ended' : actionLabel })) : null] })] }));
}
//# sourceMappingURL=AuctionCard.js.map