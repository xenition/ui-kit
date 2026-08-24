"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShootBookingCard = ShootBookingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PriceTag_1 = require("../commerce/PriceTag");
const STATUS = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'primary' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * A photo-shoot booking summary — client, shoot type, a date/time/location
 * block, a status `Badge`, an optional quoted {@link PriceTag}, and a confirm
 * action for pending requests. Composes `Card`, `Badge`, `Button`, `Icon`, and
 * `PriceTag`. Status is conveyed with a labelled badge (not color alone).
 * Token-only colors.
 */
function ShootBookingCard({ clientName, shootType, dateText, timeText, location, status = 'requested', priceCents, currency = 'USD', onConfirm, confirmLabel = 'Confirm', onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS[status];
    const line = (glyph, text) => text ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: text })] })) : null;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: onPress ? 'interactive' : 'outlined', padding: "md", onTouchEnd: onPress, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: onPress ? `${clientName}, ${meta.label}` : undefined, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: clientName }), shootType ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: shootType })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [line('📅', dateText), line('🕐', timeText), line('📍', location)] }), typeof priceCents === 'number' || (onConfirm && status === 'requested') ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onConfirm && status === 'requested' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", tone: "success", onPress: onConfirm, children: confirmLabel })) : null] })) : null] }));
}
//# sourceMappingURL=ShootBookingCard.js.map