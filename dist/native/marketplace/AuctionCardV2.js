"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionCardV2 = AuctionCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
const elevation_1 = require("../primitives/internal/elevation");
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
 * AuctionCard — Design V2: an **elevated card with a bold countdown band**. The
 * hero image sits up top; directly beneath it a full-width, tinted band makes
 * the time-remaining the loudest element on the card ("⏱ 2h 30m left" — or a
 * danger-toned "Auction ended" once closed). Price and bid count follow, then
 * the bid action. The countdown derives from `endsAtMs` against the injectable
 * `nowMs` (no self-tick, deterministic in tests); ended state is carried by
 * text + tone, not color alone. Same props as `AuctionCard`; token-pure with
 * `withAlpha` tints; elevated, borderless surface.
 */
function AuctionCardV2({ title, currentBidCents, currency = 'USD', bidCount = 0, endsAtMs, nowMs, imageUrl, actionLabel = 'Place bid', onPlaceBid, variant = 'card', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const now = nowMs ?? Date.now();
    const remaining = endsAtMs - now;
    const ended = remaining <= 0;
    const compact = variant === 'compact';
    const bandTint = ended ? (0, internal_1.withAlpha)(colors.danger, 0.12) : (0, internal_1.withAlpha)(colors.warn, 0.16);
    const bandText = ended ? colors.dangerText : colors.warnText;
    const band = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            backgroundColor: bandTint,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: bandText, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ended ? 'Auction ended' : `⏱ ${formatRemaining(remaining)} left` }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            (0, elevation_1.shadow)('lg', tokens),
            style,
        ], children: [compact ? null : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 180, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" })) })), band, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Current bid" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, primitives_1.formatMoney)(currentBidCents, currency) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}` })] }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onPlaceBid, disabled: ended, children: ended ? 'Auction ended' : actionLabel })) : null] })] }));
}
//# sourceMappingURL=AuctionCardV2.js.map