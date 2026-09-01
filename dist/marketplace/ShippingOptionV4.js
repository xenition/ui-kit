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
exports.ShippingOptionV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const commerce_1 = require("../commerce");
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
 * radio dot and tinted the border, so the only durable signal that Express was
 * selected was a colour — which brief rule 6 and §46 both rule out, and which a
 * colour-blind buyer choosing how to spend money cannot see at all.
 *
 * V4 ships both halves. The row wears the family's `selected` pair (the
 * compiler's slot for a chosen row, with its guaranteed `onSelected` ink) and a
 * `check` `IconV4` at the trailing edge, after the price. `role="radio"` and
 * `aria-checked` are unchanged — the semantics were never the problem.
 *
 * The radio dot goes. Two marks for one fact is one more than the row needs,
 * and the checkmark is the one HIG names.
 *
 * ## Everything else
 *
 * 1. **The row metric**, from `dashboard/internal/row-v4.ts` — 56 with a label
 *    alone, 72 with an `eta`, `md` gutters, a 44 leading slot. The base used
 *    `px-lg py-md`, a gutter of its own that agreed with nothing.
 * 2. **Tabular money** (rule 2) through `formatMoney` (rule 1), so a stack of
 *    shipping prices has an edge to compare down. `Free` is not an amount and
 *    is not run through the formatter.
 * 3. **The state layer, and only the state layer.** `opacity-50` for disabled
 *    becomes `V4_DISABLED_CLASS` (M3's 0.38 for disabled *content*); press and
 *    hover are the shared layer over the pair the row actually wears, so a
 *    pressed row is tinted rather than faded — a faded row reads as dead.
 * 4. **The leading glyph is an `IconV4` badge**, not a bare `Icon` sitting
 *    between the radio and the text.
 *
 * Renders `null` for an option with no name (§4.5).
 */
exports.ShippingOptionV4 = React.forwardRef(function ShippingOptionV4({ label, priceCents, currency = 'USD', eta, glyph, icon, freeLabel = 'Free', selected = false, disabled = false, onSelect, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    // §4.5: an option with no name is a blank band with a price on it.
    if (label.trim() === '')
        return null;
    const priceText = priceCents === undefined ? undefined : priceCents === 0 ? freeLabel : (0, commerce_1.formatMoney)(priceCents, currency);
    const supporting = eta !== undefined && eta !== '';
    const ink = selected ? 'onSelected' : 'onSurface';
    const leadingNode = icon !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, badge: "soft", size: "base", color: selected ? 'primary' : 'muted' })) : glyph !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, badge: "soft", size: "base", color: selected ? 'primary' : 'muted' })) : null;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "radio", "data-xen-v4-row": "", "data-xen-shipping-option": "", "data-xen-v4-state": "", "aria-checked": selected, "aria-label": `${label}${priceText ? `, ${priceText}` : ''}${supporting ? `, ${eta}` : ''}`, disabled: disabled || onSelect === undefined, onClick: onSelect, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(supporting), (0, row_v4_1.rowGroundClass)(selected), 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, className), 
        // The opaque state layer, mixed from the pair this row is actually
        // drawn on — so the promise its text makes stays checkable whichever
        // ground it is wearing.
        style: selected
            ? (0, row_v4_1.rowStateVars)('var(--xen-selected)', 'var(--xen-on-selected)')
            : (0, row_v4_1.rowStateVars)(), ...rest, children: [leadingNode != null ? (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: leadingNode }) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: ink, numberOfLines: 1, children: label }), supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: selected ? 'onSelected' : 'mutedText', numberOfLines: 1, children: eta })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [priceText !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: ink, numeric: "tabular", children: priceText })) : null, selected ? (
                    // HIG's option-list confirmation. Decorative to a screen reader —
                    // `aria-checked` on the row already says it, and saying it twice is
                    // noise.
                    (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "base", color: "primary", "data-xen-shipping-check": "" })) : null] })] }));
});
//# sourceMappingURL=ShippingOptionV4.js.map