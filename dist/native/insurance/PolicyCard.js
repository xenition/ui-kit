"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyCard = PolicyCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const POLICY_STATUS = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
const CADENCE_SUFFIX = {
    monthly: '/mo',
    quarterly: '/qtr',
    annual: '/yr',
};
/**
 * A summary card for a single insurance policy. The `variant` (auto/home/life/
 * health) picks a tinted leading glyph disc; a status pill conveys the policy
 * lifecycle by **text + glyph + color** (never color alone). Coverage and
 * premium are integer cents funnelled through `formatMoney`, so printed values
 * never drift. Becomes a pressable button only when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a `ramps`-derived tint — no
 * literals.
 */
function PolicyCard({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const vd = (0, status_1.policyVariant)(variant);
    const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
    const body = ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: onPress ? 'interactive' : 'elevated', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: vd.glyph, size: "xl", accessibilityLabel: `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [vd.label, " \u00B7 ", policyNumber] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), holder != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Insured: ", holder] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Coverage" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: format(Math.max(0, Math.trunc(coverageCents || 0)), currency) })] }), premiumCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Premium" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: format(Math.max(0, Math.trunc(premiumCents)), currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }, children: CADENCE_SUFFIX[cadence] })] })] })) : null] }), renewalDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Renews ", renewalDate] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${vd.label} policy, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=PolicyCard.js.map