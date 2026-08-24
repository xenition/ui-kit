"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionCardV3 = AuctionCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
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
 * AuctionCard — Design V3: **minimal, with the bid figures laid out inline**. No
 * hero media and no filled band — a leading accent rule, the lot title, and an
 * inline "ledger" row that sets the current bid against the bid count and the
 * time remaining, each separated by a hairline divider. The bid action is a
 * compact text-style pressable on the trailing edge (disabled once ended). The
 * countdown derives from `endsAtMs` against the injectable `nowMs` (no
 * self-tick); ended state reads in text ("Ended") + a danger tone. Same props
 * as `AuctionCard`; token-pure with `withAlpha` tints; borderless and airy.
 */
function AuctionCardV3({ title, currentBidCents, currency = 'USD', bidCount = 0, endsAtMs, nowMs, actionLabel = 'Place bid', onPlaceBid, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const now = nowMs ?? Date.now();
    const remaining = endsAtMs - now;
    const ended = remaining <= 0;
    const divider = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, alignSelf: 'stretch', backgroundColor: (0, internal_1.withAlpha)(colors.border, 0.8) } }));
    const ledgerCell = (label, value, tone) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, paddingHorizontal: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tone, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: value })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingRight: tokens.spacing.md,
                borderLeftWidth: 3,
                borderLeftColor: ended ? colors.danger : colors.primary,
                paddingLeft: tokens.spacing.md,
                backgroundColor: 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginLeft: -tokens.spacing.md }, children: [ledgerCell('Current', (0, primitives_1.formatMoney)(currentBidCents, currency), colors.onSurface), divider, ledgerCell('Bids', bidCount.toLocaleString(), colors.onSurface), divider, ledgerCell(ended ? 'Status' : 'Ends in', ended ? 'Ended' : formatRemaining(remaining), ended ? colors.dangerText : colors.warnText)] })] }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: ended ? 'Auction ended' : actionLabel, accessibilityState: { disabled: ended }, disabled: ended, onPress: onPlaceBid, hitSlop: 8, style: ({ pressed }) => ({
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: ended ? 'transparent' : (0, internal_1.withAlpha)(colors.primary, 0.12),
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ended ? colors.muted : colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ended ? 'Ended' : actionLabel }) })) : null] }));
}
//# sourceMappingURL=AuctionCardV3.js.map