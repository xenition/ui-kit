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
exports.DishCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const RatingV4_1 = require("../primitives/RatingV4");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const commerce_1 = require("../commerce");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
/**
 * The photo, per variant — composed off the spacing scale rather than typed as
 * `88`/`140`/`180`, so a denser seed re-scales the card with the rest of the
 * product. `2xl * 3` and `2xl * 4` are the same two covers `EventCardV4` uses.
 */
const MEDIA_LIST = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))] shrink-0';
const MEDIA_GRID = 'h-[calc(var(--xen-space-2xl)_*_3)] w-full';
const MEDIA_FEATURED = 'h-[calc(var(--xen-space-2xl)_*_4)] w-full';
/** The card's own pair, so its state layer is opaque against the card. */
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/** The add button's pair — the layer is computed against `primary`, not the card. */
const PRIMARY_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)');
/**
 * **V4 dish card** — the web twin of the native `DishCardV4`, same props as
 * {@link DishCard} plus `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **A screen reader hears more than the dish's name.** `aria-label={name}`
 *    sat on a `role="button"` root, and that role is children-presentational —
 *    so the price, the rating and, worst of all, the allergen and dietary
 *    badges were pruned out of the accessibility tree. Someone with a coeliac
 *    or nut allergy got a bare list of dish names while the sighted view beside
 *    them showed every marker. The price and the rating are now folded into the
 *    activation's name through `spokenLine`, and the badges are lifted **out**
 *    of the activation so their own text is reached — `badges` is an opaque
 *    `ReactNode`, and no string could honestly carry it.
 * 2. **The add button is a sibling of the card's activation, not a child.**
 *    Nesting it inside `role="button"` was invalid ARIA and it double-fired:
 *    0.8.0 landed `stopPropagation` in the V2/V3 variants and left the classic
 *    unguarded, and the key path could not be guarded that way at all — the
 *    card's `onKeyDown` ran `preventDefault()`, which cancels the very click
 *    Enter was about to perform on the button. A keyboard user added nothing
 *    and navigated away instead.
 * 3. **`soldOut` genuinely blocks activation.** The base set `aria-disabled`
 *    and then called `onClick` anyway, so the user who could not hear that a
 *    dish contains gluten could also add a sold-out one to their cart.
 * 4. **Sold-out and hover stop fighting, and the words stay legible.** The dim
 *    and `hover:opacity-90` sat on one element, so a sold-out dish got
 *    *brighter* under the pointer — and the dim covered the whole card, which
 *    made "Sold out", the text that *explains* the state, the least readable
 *    thing on it. The photo dims; the name, the price and `soldOutLabel` are at
 *    full strength. Not 0.38: that is M3's *disabled* band, and a sold-out dish
 *    is a dish you can still open and read.
 * 5. **The skeleton is the shared opaque placeholder**, not `bg-neutral-200` —
 *    a neutral ramp step mirrors under `[data-theme="dark"]`, so the loading
 *    card was a near-white slab on a dark menu.
 * 6. **The card is inked with the contrast-corrected slots.** The body ran on
 *    `text-muted` — a *fill* — over `surface`, under a raised card.
 */
exports.DishCardV4 = React.forwardRef(function DishCardV4({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, variant = 'list', soldOut = false, loading = false, onClick, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', loadingLabel = 'Loading dish', formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const horizontal = variant === 'list';
    const containerClass = (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', className);
    const layoutClass = horizontal ? 'flex flex-row items-start gap-md p-md' : 'flex flex-col';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-busy": "true", "aria-label": loadingLabel, className: containerClass, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: layoutClass, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(menu_v4_1.PLACEHOLDER_CLASS, horizontal ? MEDIA_LIST : MEDIA_GRID) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-sm', !horizontal && 'p-md'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[var(--xen-text-lg)] w-3/5', menu_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[var(--xen-text-sm)] w-11/12', menu_v4_1.PLACEHOLDER_CLASS) })] })] }) }));
    }
    if (!name)
        return null;
    const money = formatMoney ?? commerce_1.formatMoney;
    const priceText = typeof priceCents === 'number' ? money(priceCents, currency) : undefined;
    const rated = typeof rating === 'number' ? (0, tone_v4_1.ratingParts)({ value: rating }) : undefined;
    /*
      Everything a sighted user can read off the card, in one name. The badges
      cannot join it — there is no honest way to turn an arbitrary element into a
      string — so they are rendered outside the activation instead, where a
      reader reaches their own text.
    */
    const spoken = (0, menu_v4_1.spokenLine)([
        name,
        description,
        priceText,
        rated?.label,
        soldOut ? soldOutLabel : undefined,
    ]);
    const media = ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('relative block overflow-hidden rounded-[var(--xen-radius-md)]', horizontal ? MEDIA_LIST : variant === 'featured' ? MEDIA_FEATURED : MEDIA_GRID, 
        /*
          The one dim, on the decorative element and nothing else: it has no
          hover of its own, so no opacity ever shares a node with a `hover:`
          variant again, and the copy explaining the state keeps full contrast.
          0.6 rather than M3's 0.38 — that band means *disabled*, and this dish
          is unavailable, not inoperable. The native twin dims by the same
          amount.
        */
        soldOut && 'opacity-60'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute inset-0', menu_v4_1.PLACEHOLDER_CLASS) }), imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "relative h-full w-full object-cover" })) : null] }));
    const text = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-xs', !horizontal && 'p-md'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading font-semibold text-on-card', horizontal ? 'truncate' : 'line-clamp-2'), children: name }), description ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted-text", children: description })) : null, rated ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true, label: rated.label }) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-xs', menu_v4_1.TABULAR_CLASS), children: (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, formatMoney: formatMoney }) })) : null] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: containerClass, ...rest, children: [interactive ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", 
                // Rule E: sold out means the handler does not fire, and the card
                // leaves the tab order rather than lying about being disabled.
                disabled: soldOut, "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('text-left', layoutClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [media, text] })) : ((0, jsx_runtime_1.jsxs)("div", { className: layoutClass, children: [media, text] })), badges || soldOut || onAdd ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-sm px-md pb-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-wrap items-center gap-xs", children: badges }), soldOut ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-danger-text", children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, menu_v4_1.spokenLine)([addLabel, name]), onClick: onAdd, "data-xen-v4-state": "", style: PRIMARY_STATE, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center px-md', chrome_v4_1.MIN_TAP_CLASS, 'rounded-[var(--xen-radius-md)] bg-primary text-sm font-semibold text-on-primary', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: addLabel })) : null] })) : null] }));
});
//# sourceMappingURL=DishCardV4.js.map