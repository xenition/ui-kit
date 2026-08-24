"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitCard = BenefitCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const BENEFIT_TYPE = {
    food: { label: 'Food assistance', glyph: '🥫' },
    unemployment: { label: 'Unemployment', glyph: '💼' },
    housing: { label: 'Housing', glyph: '🏘️' },
    medical: { label: 'Medical', glyph: '⚕️' },
    disability: { label: 'Disability', glyph: '♿' },
    family: { label: 'Family support', glyph: '👪' },
    other: { label: 'Benefit', glyph: '🤝' },
};
const STATUS = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
    expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};
/**
 * A public-benefit / assistance case card: a tinted program glyph, an enrolment
 * status pill conveyed by **text + glyph + color** (never color alone), an
 * optional recurring amount as integer cents through `formatMoney`, and case /
 * next-payment metadata. Becomes a button only when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a token-derived tint — no
 * literals.
 */
function BenefitCard({ name, benefitType, status = 'active', amountCents, cadence = '/mo', caseNumber, nextDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const bt = BENEFIT_TYPE[benefitType] ?? BENEFIT_TYPE.other;
    const sd = STATUS[status] ?? STATUS.active;
    const body = ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: onPress ? 'interactive' : 'elevated', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: bt.glyph, size: "xl", accessibilityLabel: bt.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [bt.label, caseNumber != null ? ` · ${caseNumber}` : ''] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }), amountCents != null || nextDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }, children: [amountCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: format(Math.max(0, Math.trunc(amountCents)), currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: cadence })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), nextDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Next: ", nextDate] })) : null] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${bt.label}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=BenefitCard.js.map