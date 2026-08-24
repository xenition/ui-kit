"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyCardV2 = PolicyCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
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
 * PolicyCard, alternate design **V2** — an elevated hero card. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted "coverage band" makes the benefit amount the visual anchor,
 * with the premium and renewal as a quiet footer. Same `PolicyCardProps`, same
 * data contract (integer cents via `formatMoney`, status by glyph + text +
 * color), so it drops in wherever `PolicyCard` is used. Token-pure.
 */
function PolicyCardV2({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const vd = (0, status_1.policyVariant)(variant);
    const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const press = (0, motion_1.usePressScale)();
    const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);
    const body = ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: "elevated", padding: "none", radius: "lg", style: [{ overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 60,
                                height: 60,
                                borderRadius: tokens.radius.lg,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                                ...(0, elevation_1.shadow)('sm', tokens),
                            }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: vd.glyph, size: "3xl", accessibilityLabel: `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [vd.label, " \u00B7 ", policyNumber] }), holder != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Insured: ", holder] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.08),
                        paddingVertical: tokens.spacing.md,
                        paddingHorizontal: tokens.spacing.md,
                        gap: 2,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Total coverage" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Coverage ${coverage}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: coverage })] }), premiumCents != null || renewalDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }, children: [premiumCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: format(Math.max(0, Math.trunc(premiumCents)), currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: CADENCE_SUFFIX[cadence] })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), renewalDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Renews ", renewalDate] })) : null] })) : null] }) }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${vd.label} policy, ${sd.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=PolicyCardV2.js.map