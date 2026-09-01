"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTicketRowV4 = EventTicketRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * EventTicketRow — **V4** "rally" design. The warm, mission-driven take on a
 * selectable charity-event ticket row: an elevated rounded row (soft shadow,
 * clean surface — no gradient) with a leading ticket glyph in a soft-primary
 * well, a bold tier name, muted perks, an optional tax-deductible note, the
 * price rendered bold via `formatMoney`, and a radio indicator. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `accessibilityState.selected`
 * (plus a filled dot and a bold primary border). Honors every prop of
 * {@link EventTicketRowProps}; token-only colors via `useXenitionTheme()`.
 */
function EventTicketRowV4({ name, priceCents, currency = 'USD', description, deductibleCents, remaining, soldOut, selected = false, onSelect, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isSoldOut = soldOut === true || remaining === 0;
    const isDisabled = disabled || isSoldOut;
    const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
    const priceLabel = (0, internal_1.formatMoney)(priceCents, currency);
    const containerStyle = ({ pressed }) => [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            minHeight: 44,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: pressed && !isDisabled ? tokens.ramps.neutral[50] : colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
            opacity: isDisabled ? 0.6 : 1,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled: isDisabled }, accessibilityLabel: `${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`, disabled: isDisabled, onPress: onSelect, style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), isSoldOut ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Sold out" }) : lowStock ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", children: `${remaining} left` }) : null] }), description ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description }) : null, typeof deductibleCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(deductibleCents, currency)} tax-deductible` })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.primary } })) : null })] }));
}
//# sourceMappingURL=EventTicketRowV4.js.map