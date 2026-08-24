"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyCardV3 = PolicyCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/** Decorative per-line category hue for the leading dot (not a status signal). */
const VARIANT_TONE = {
    auto: 'primary',
    home: 'accent',
    life: 'success',
    health: 'warn',
};
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', slot: 'successText' },
    pending: { label: 'Pending', glyph: '⋯', slot: 'warnText' },
    lapsed: { label: 'Lapsed', glyph: '!', slot: 'dangerText' },
    cancelled: { label: 'Cancelled', glyph: '✕', slot: 'muted' },
};
/**
 * PolicyCard, alternate design **V3** — a minimal single line. A colored type
 * dot (a category hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly
 * on the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Same `PolicyCardProps`; drops in for
 * dense lists. Token-pure.
 */
function PolicyCardV3({ variant, name, policyNumber, coverageCents, status = 'active', currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const colorRec = colors;
    const vd = (0, status_1.policyVariant)(variant);
    const toneSlot = VARIANT_TONE[variant] ?? 'primary';
    const dotColor = colorRec[toneSlot] ?? colors.primary;
    const sm = STATUS_META[status] ?? STATUS_META.active;
    const statusColor = colorRec[sm.slot] ?? colors.muted;
    const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(dotColor, 0.16),
                    borderWidth: 1,
                    borderColor: (0, format_1.withAlpha)(dotColor, 0.4),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: vd.glyph, size: "sm", accessibilityLabel: `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: policyNumber }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [sm.glyph, " ", sm.label] })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Coverage ${coverage}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: coverage })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${vd.label} policy, ${sm.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=PolicyCardV3.js.map