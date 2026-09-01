"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListRowV4 = PriceListRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 price list row** — same props as {@link PriceListRow} plus
 * `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now a
 *    struck figure beside the price, **announced** as `Was …` so a reader
 *    handed two numbers knows which is which — and a compare-at that is not
 *    higher than the price is refused rather than drawn, because a fabricated
 *    discount is a dark pattern.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component
 *    in the kit; with proportional figures it has no edge to scan down, which
 *    is the entire job.
 * 3. **The leader is a real dotted rule**, not the space between two
 *    right-floated strings, so the eye can travel from a service to its price.
 * 4. **The `section` variant is a heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
function PriceListRowV4({ label, priceCents, currency = 'USD', fromPrice = false, note, durationMin, compareAtCents: compareAt, variant = 'default', formatMoney = money_1.formatMoney, fromLabel = 'from', formatDuration, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!label)
        return null;
    if (variant === 'section') {
        return ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "sm", weight: "bold", tone: "mutedText", style: [{ paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.xs }, style], children: label }));
    }
    const hasPrice = typeof priceCents === 'number' && Number.isFinite(priceCents);
    const price = hasPrice ? formatMoney(priceCents, currency) : null;
    const wasCents = (0, salon_v4_1.compareAtCents)(priceCents, compareAt);
    const was = wasCents != null ? formatMoney(wasCents, currency) : null;
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const caption = (0, salon_v4_1.metaLine)([duration, note]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, salon_v4_1.metaLine)([
            label,
            caption,
            was ? `was ${was}` : null,
            price ? (fromPrice ? `${fromLabel} ${price}` : price) : null,
        ]), style: [
            {
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
            },
            !last ? (0, row_v4_1.rowSeparatorStyle)(theme, {}) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 2, children: label }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: caption })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { "aria-hidden": true, style: {
                    flex: 1,
                    minWidth: tokens.spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    borderStyle: 'dotted',
                    transform: [{ translateY: -tokens.spacing.xs / 2 }],
                } }), price ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [was ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", accessibilityLabel: `Was ${was}`, style: { textDecorationLine: 'line-through' }, children: was })) : null, fromPrice ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: fromLabel })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numeric: "tabular", children: price })] })) : null] }));
}
//# sourceMappingURL=PriceListRowV4.js.map