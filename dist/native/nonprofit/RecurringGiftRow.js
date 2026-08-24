"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringGiftRow = RecurringGiftRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const FREQ_LABEL = {
    weekly: '/week',
    monthly: '/month',
    quarterly: '/quarter',
    yearly: '/year',
};
/**
 * A managed recurring-gift row: the per-cycle amount (integer cents →
 * `formatMoney`) with its cadence suffix, the supported fund, a next-charge
 * hint, a status badge, and pause / resume / cancel controls appropriate to the
 * status. Status is carried by badge text + `accessibilityLabel`, not color
 * alone. All colors come from the compiled theme tokens — no literal colors.
 */
function RecurringGiftRow({ amountCents, currency = 'USD', frequency, fund, nextChargeLabel, status = 'active', onPause, onResume, onCancel, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusTone = status === 'active' ? 'success' : status === 'paused' ? 'warn' : 'neutral';
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${(0, internal_1.formatMoney)(amountCents, currency)} ${FREQ_LABEL[frequency]} recurring gift, ${statusLabel}`, style: [
            { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "base", color: "muted" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: FREQ_LABEL[frequency] })] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: statusTone, children: statusLabel })] }), fund ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: fund }) : null, nextChargeLabel && status === 'active' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: nextChargeLabel })) : null, status !== 'canceled' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [status === 'active' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "default", loading: loading, onPress: onPause, children: "Pause" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "success", loading: loading, onPress: onResume, children: "Resume" })), onCancel ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", tone: "danger", loading: loading, onPress: onCancel, children: "Cancel" })) : null] })) : null] }));
}
//# sourceMappingURL=RecurringGiftRow.js.map