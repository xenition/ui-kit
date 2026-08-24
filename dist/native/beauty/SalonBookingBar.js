"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalonBookingBar = SalonBookingBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner. Prices are integer cents via
 * {@link formatMoney}. Token-only colors; the bar reads the `surface`/`border`
 * slots so it restyles with the theme (dark mode included).
 */
function SalonBookingBar({ serviceName, totalCents, currency = 'USD', detail, formatMoney: format = money_1.formatMoney, ctaLabel = 'Book now', disabled = false, loading = false, emptyLabel = 'Select a service to book', onBook, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasSelection = !!serviceName;
    const priceText = totalCents != null ? format(totalCents, currency) : undefined;
    const isDisabled = disabled || loading || !hasSelection;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: hasSelection ? `${serviceName}${priceText ? `, ${priceText}` : ''}${detail ? `, ${detail}` : ''}` : emptyLabel, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                paddingHorizontal: tokens.spacing.lg,
                paddingVertical: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: hasSelection ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: serviceName }), priceText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: priceText })) : null] }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detail })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, disabled: isDisabled, loading: loading, children: ctaLabel })] }));
}
//# sourceMappingURL=SalonBookingBar.js.map