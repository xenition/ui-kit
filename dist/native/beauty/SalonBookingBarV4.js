"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalonBookingBarV4 = SalonBookingBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthStickyFooterV4_1 = require("../primitives/AuthStickyFooterV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 salon booking bar** — same props as {@link SalonBookingBar} plus
 * `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the home indicator.** Built on `AuthStickyFooterV4`, which
 *    pays `insets.bottom` — the same band every other pinned CTA in the kit
 *    uses. The base drew its own bar and read no inset.
 * 2. **The price stops being `colors.primary` at `fontWeight: '800'`.** A fill
 *    slot used as ink, at a weight the scale does not have. It is now
 *    `onSurface` in the display face, which is what a total should be.
 * 3. **The CTA is the §5 shape** — full width, `radius.full`, and the one
 *    loud thing in the band.
 * 4. **The empty state is the bar's own copy**, announced, rather than a
 *    disabled button with nothing beside it.
 *
 * Composition note: this is a *band*, so it renders even with no selection —
 * that is the point of it. The empty case is copy, not absence.
 */
function SalonBookingBarV4({ serviceName, totalCents, currency = 'USD', detail, formatMoney = money_1.formatMoney, ctaLabel = 'Book now', disabled = false, loading = false, emptyLabel = 'Select a service to book', safeArea = true, onBook, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const hasSelection = Boolean(serviceName);
    const price = typeof totalCents === 'number' && Number.isFinite(totalCents)
        ? formatMoney(totalCents, currency)
        : null;
    const blocked = disabled || loading || !hasSelection;
    return ((0, jsx_runtime_1.jsx)(AuthStickyFooterV4_1.AuthStickyFooterV4, { safeArea: safeArea, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: hasSelection ? (0, salon_v4_1.metaLine)([serviceName, price, detail]) : emptyLabel, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: hasSelection ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, style: { flexShrink: 1 }, children: serviceName }), price ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onSurface", numeric: "tabular", children: price })) : null] }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: detail })) : null] })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel })) }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", disabled: blocked, loading: loading, onPress: onBook, accessibilityLabel: ctaLabel, style: { borderRadius: tokens.radius.full }, children: ctaLabel })] }) }));
}
//# sourceMappingURL=SalonBookingBarV4.js.map