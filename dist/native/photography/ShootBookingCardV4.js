"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShootBookingCardV4 = ShootBookingCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
const STATUS = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'primary' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * ShootBookingCard — **V4** "studio" design. A booking summary on a clean,
 * elevated studio surface: an elevated card (soft shadow, hairline border), a
 * bold client name, muted shoot type, and a date/time/location block with muted
 * glyphs. The lifecycle `status` is a labelled `Badge` with the correct tone per
 * status — `requested` (warn), `confirmed` (success), `completed` (primary),
 * `cancelled` (danger) — never color alone. The confirm `Button` only shows for
 * `requested`; its `onPress` stops propagation so it never fires the card press.
 * Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onPress` makes the whole card a button.
 * Token-only colors via `useXenitionTheme()`.
 */
function ShootBookingCardV4({ clientName, shootType, dateText, timeText, location, status = 'requested', priceCents, currency = 'USD', onConfirm, confirmLabel = 'Confirm', onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS[status];
    const containerStyle = [
        {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.md,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const line = (glyph, text) => text ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: text })] })) : null;
    const showFooter = typeof priceCents === 'number' || (onConfirm && status === 'requested');
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: clientName }), shootType ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: shootType })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [line('📅', dateText), line('🕐', timeText), line('📍', location)] }), showFooter ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onConfirm && status === 'requested' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: "success", onPress: onConfirm, style: { minHeight: 44, justifyContent: 'center' }, children: confirmLabel })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${clientName}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=ShootBookingCardV4.js.map