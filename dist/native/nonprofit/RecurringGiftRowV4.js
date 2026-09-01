"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringGiftRowV4 = RecurringGiftRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
const FREQ = {
    weekly: { label: '/week', glyph: '📅' },
    monthly: { label: '/month', glyph: '🗓️' },
    quarterly: { label: '/quarter', glyph: '📆' },
    yearly: { label: '/year', glyph: '🎂' },
};
const STATUS = {
    active: { tone: 'success', label: 'Active', glyph: '🔁' },
    paused: { tone: 'warn', label: 'Paused', glyph: '⏸️' },
    canceled: { tone: 'neutral', label: 'Canceled', glyph: '🚫' },
};
/**
 * RecurringGiftRow — **V4** "rally" design. An elevated, rounded managed
 * recurring-gift row on a clean surface (no gradient): a leading cadence glyph in
 * a soft-primary well, the bold per-cycle amount (integer cents → `formatMoney`)
 * with its cadence suffix, a glyph + labelled status {@link Badge} (never color
 * alone), a frequency chip, the supported fund, a next-charge hint, and pause /
 * resume / cancel controls appropriate to the status. Honors every `frequency`
 * (weekly/monthly/quarterly/yearly) and `status` (active/paused/canceled).
 * Identical props/behavior to {@link RecurringGiftRowProps}. Token-only colors
 * via `useXenitionTheme()`.
 */
function RecurringGiftRowV4({ amountCents, currency = 'USD', frequency, fund, nextChargeLabel, status = 'active', onPause, onResume, onCancel, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const freq = FREQ[frequency];
    const statusMeta = STATUS[status];
    const containerStyle = [
        {
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${(0, internal_1.formatMoney)(amountCents, currency)} ${freq.label} recurring gift, ${statusMeta.label}`, style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: freq.glyph, size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: freq.label })] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: statusMeta.tone, variant: "soft", children: `${statusMeta.glyph} ${statusMeta.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: freq.glyph, size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: `Every ${freq.label.replace('/', '')}` })] }), fund ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: fund }) : null] }), nextChargeLabel && status === 'active' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: nextChargeLabel })) : null, status !== 'canceled' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [status === 'active' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "default", loading: loading, onPress: onPause, children: "Pause" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "success", loading: loading, onPress: onResume, children: "Resume" })), onCancel ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", tone: "danger", loading: loading, onPress: onCancel, children: "Cancel" })) : null] })) : null] }));
}
//# sourceMappingURL=RecurringGiftRowV4.js.map