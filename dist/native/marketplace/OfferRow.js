"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferRow = OfferRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_TONE = {
    pending: 'warn',
    accepted: 'success',
    declined: 'danger',
    countered: 'primary',
    expired: 'neutral',
};
const STATUS_LABEL = {
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
    countered: 'Countered',
    expired: 'Expired',
};
/**
 * A row in an offers list on a listing — buyer, offered amount, a status chip,
 * an optional note, and Accept / Counter / Decline actions (shown only while
 * the offer is `pending`). Presentational: shaped data + callbacks only. Status
 * is carried by both the chip label and tone, never color alone. Reuses
 * `Avatar`, `Badge`, `Button`, and the shared `formatMoney`; token-only colors.
 */
function OfferRow({ party, amountCents, currency = 'USD', avatarUrl, status = 'pending', timeLabel, note, onAccept, onDecline, onCounter, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tone = STATUS_TONE[status] ?? 'neutral';
    const statusLabel = STATUS_LABEL[status] ?? String(status);
    const showActions = status === 'pending' && (onAccept || onDecline || onCounter);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: party, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: party }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, variant: "soft", size: "sm", children: statusLabel })] }), timeLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timeLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(amountCents, currency) })] }), note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: note })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: "success", size: "sm", onPress: onAccept, style: { flex: 1 }, children: "Accept" })) : null, onCounter ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onCounter, style: { flex: 1 }, children: "Counter" })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", tone: "danger", size: "sm", onPress: onDecline, style: { flex: 1 }, children: "Decline" })) : null] })) : null] }));
}
//# sourceMappingURL=OfferRow.js.map