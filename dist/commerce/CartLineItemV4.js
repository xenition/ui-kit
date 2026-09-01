"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const PriceTagV4_1 = require("./PriceTagV4");
const QuantityStepperV4_1 = require("./QuantityStepperV4");
const money_v4_1 = require("./internal/money-v4");
/**
 * **V4 cart line** — the web twin of the native `CartLineItemV4`, the base
 * {@link CartLineItem}'s props plus
 * {@link CartLineItemV4Props.compareAtUnitPriceCents}, a different design line.
 *
 * A cart line is a **row**, so it takes the row metric from
 * `dashboard/internal/row-v4.ts` — M3's list-item tokens, two-line container 72
 * as a floor, 16 gutters, a 44 leading slot — rather than the ad-hoc
 * `py-md` + 64 thumbnail the base drew. The point of importing rather than
 * restating: a cart line, a settings row and the `Subtotal` line underneath it
 * are then demonstrably one family, which is what
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3 calls the decision that matters most.
 *
 * Four changes beyond the metric:
 *
 * 1. **It composes, and does not redraw.** `PriceTagV4` for the money and
 *    `QuantityStepperV4` for the control — brief §1.7, a V4 composite composes
 *    V4 children, never the base line and never a hand-rolled price. The base
 *    printed the line total itself in a `font-heading` span, which is how a
 *    cart ended up setting the same figure differently from the product card it
 *    came from.
 * 2. **The discount is carried by the price tag**, via
 *    {@link CartLineItemV4Props.compareAtUnitPriceCents} — the one component in
 *    the module that has already settled how a struck price is drawn and
 *    announced (`Was …`, an `<s>`, no red).
 * 3. **The remove control clears the tap floor.** The base's "Remove" was a
 *    bare `text-xs` link — roughly 14 points tall — sitting beside a stepper
 *    that a shopper is already tapping repeatedly. It keeps the word (a glyph
 *    alone is not a label) and gains a 44 hit area.
 * 4. **The row survives its empty case.** A line with no title and no variant
 *    renders nothing rather than an empty 72-point box with a thumbnail in it
 *    (§4.5).
 *
 * **The remove control stays `mutedText`, not `danger`.** Removing a line from
 * a cart is reversible and routine; spending the error tone on it is the same
 * mistake as painting a sale price red, one component along. The base's
 * `hover:text-danger` goes with it.
 */
exports.CartLineItemV4 = React.forwardRef(function CartLineItemV4({ title, variantTitle, quantity, unitPriceCents, compareAtUnitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // §4.5: nothing to name, so nothing to draw. A thumbnail and a stepper
    // attached to no product is not a row, it is a hole in the list.
    if (title.trim() === '' && (variantTitle === undefined || variantTitle === ''))
        return null;
    const lineTotal = unitPriceCents * quantity;
    const compareLineTotal = typeof compareAtUnitPriceCents === 'number' && compareAtUnitPriceCents > unitPriceCents
        ? compareAtUnitPriceCents * quantity
        : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line-item": "", "data-xen-v4-row": "", className: (0, cn_1.cn)(
        // `items-start` and not the row family's `items-center`: this row is
        // taller than its leading slot (it carries a stepper), and a 44
        // thumbnail floated in the middle of a 90-point row reads as
        // detached from the title it belongs to.
        'flex w-full items-start gap-md bg-transparent px-md py-sm', (0, row_v4_1.rowHeightClass)(true), className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'overflow-hidden rounded-[var(--xen-radius-md)] border border-border'), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : (
                // The seeded cover is a *fallback*, not a design-line element —
                // same art, same seed, same props as the base drew.
                (0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" })) }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: title }), variantTitle ? (
                    // `mutedText`, not `muted`. `muted` is a fill and carries no
                    // contrast promise; the whole base line used it as a text colour.
                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: variantTitle })) : null, onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepperV4_1.QuantityStepperV4, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}`, className: "mt-xs" })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `Qty ${quantity}` }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-line-total": "", children: (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: lineTotal, compareAtCents: compareLineTotal, currency: currency, size: money_v4_1.MONEY_LINE_SIZE, 
                            // Passed straight through: `PriceTagV4` already defaults it to
                            // `formatMoney`, so there is exactly one place cents become a
                            // string on this row (brief §1.1).
                            formatMoney: format }) }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onRemove, "aria-label": removeLabel ?? `Remove ${title}`, "data-xen-v4-state": "", "data-xen-cart-remove": "", className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-sm', nav_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "Remove" }) })) : null] })] }));
});
//# sourceMappingURL=CartLineItemV4.js.map