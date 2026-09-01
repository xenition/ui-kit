"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingOptionV4 = ShippingOptionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const row_v4_1 = require("../dashboard/internal/row-v4");
/**
 * **V4 shipping option** — a selectable delivery method, on the row metric, and
 * the component where HIG's option-list rule lands.
 *
 * ## Selection is a highlight *and* a mark
 *
 * HIG draws a line between two kinds of list. A **navigation** list keeps the
 * chosen row persistently highlighted, because the highlight is saying "this is
 * where you are". An **option** list highlights briefly and then confirms with
 * a **checkmark**, because the mark is saying "this is what you chose". A
 * shipping list is an option list, and the base gave it neither: it drew a
 * radio dot and tinted the border and ground, so the only durable signal that
 * Express was selected was a colour — which brief rule 6 and §46 both rule out,
 * and which a colour-blind buyer choosing how to spend money cannot see at all.
 *
 * V4 ships both halves. The row wears the family's `selected` pair (the
 * compiler's slot for a chosen row, with its guaranteed `onSelected` ink) and a
 * `check` `IconV4` at the trailing edge, after the price.
 * `accessibilityRole="radio"` and the `selected` a11y state are unchanged — the
 * semantics were never the problem.
 *
 * The radio dot goes. Two marks for one fact is one more than the row needs,
 * and the checkmark is the one HIG names. So does the hand-mixed
 * `withAlpha(primary, 0.08)` ground, whose contrast nobody had measured.
 *
 * ## Everything else
 *
 * 1. **The row metric**, from `dashboard/internal/row-v4.ts` — 56 with a label
 *    alone, 72 with an `eta`, `md` gutters, a 44 leading slot. The base used a
 *    `lg`/`md` gutter of its own that agreed with nothing.
 * 2. **Tabular money** (rule 2) through `formatMoney` (rule 1), so a stack of
 *    shipping prices has an edge to compare down. `Free` is not an amount and
 *    is not run through the formatter.
 * 3. **The state layer, and only the state layer.** `opacity: pressed ? 0.9`
 *    and `opacity: disabled ? 0.5` both go: press is the shared layer over the
 *    pair the row actually wears (so a pressed row is tinted rather than faded
 *    — a faded row reads as *dead*, which is what M3 spends 0.38 to mean), and
 *    disabled is that 0.38 on the content.
 * 4. **The leading glyph is an `IconV4` badge**, not a bare `Icon` sitting
 *    between the radio and the text.
 *
 * Renders `null` for an option with no name (§4.5).
 */
function ShippingOptionV4({ label, priceCents, currency = 'USD', eta, glyph, icon, freeLabel = 'Free', selected = false, disabled = false, onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    // §4.5: an option with no name is a blank band with a price on it.
    if (label.trim() === '')
        return null;
    const inert = disabled || onSelect === undefined;
    const priceText = priceCents === undefined
        ? undefined
        : priceCents === 0
            ? freeLabel
            : (0, money_1.formatMoney)(priceCents, currency);
    const supporting = eta !== undefined && eta !== '';
    const ink = selected ? 'onSelected' : 'onSurface';
    const leadingNode = icon !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, badge: "soft", size: "base", color: selected ? 'primary' : 'muted' })) : glyph !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, badge: "soft", size: "base", color: selected ? 'primary' : 'muted' })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled: inert }, accessibilityLabel: `${label}${priceText ? `, ${priceText}` : ''}${supporting ? `, ${eta}` : ''}`, disabled: inert, onPress: onSelect, style: ({ pressed }) => [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: supporting }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed: pressed && !inert, selected }) },
            // M3 disables CONTENT at 0.38 — the same number `V4_DISABLED_CLASS`
            // writes on the web twin, read off the theme's resolved state scale
            // rather than retyped.
            inert ? { opacity: theme.state.disabledContent } : null,
            style,
        ], children: [leadingNode != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: leadingNode }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: ink, numberOfLines: 1, children: label }), supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: selected ? 'onSelected' : 'mutedText', numberOfLines: 1, children: eta })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: [priceText !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: ink, numeric: "tabular", children: priceText })) : null, selected ? (
                    // HIG's option-list confirmation. Decorative to a screen reader — the
                    // row's `selected` a11y state already says it, and saying it twice is
                    // noise.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-shipping-check", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "base", color: "primary" }) })) : null] })] }));
}
//# sourceMappingURL=ShippingOptionV4.js.map