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
exports.ProductCardV4 = exports.PRODUCT_CARD_V4_CSS = exports.PRODUCT_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const PriceTagV4_1 = require("./PriceTagV4");
const GenerativeCoverV4_1 = require("./GenerativeCoverV4");
/**
 * Static class strings so Tailwind's scanner can see every variant. `4:5` is
 * the base's ratio and stays the default — V4 changes the design line, not the
 * shape of a catalog someone already shipped.
 */
const ASPECT_CLASS = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '3:4': 'aspect-[3/4]',
    '16:9': 'aspect-[16/9]',
};
/** The one `<style>` id this component injects from. Idempotent. */
exports.PRODUCT_CARD_V4_STYLE_ID = 'xen-v4-product-card-styles';
/**
 * The card ground, and why it is a sheet rather than a class.
 *
 * §4.2's headline fix: this card paints `--xen-card`, not `--xen-surface`, so a
 * tile reads as raised on the page in **both** schemes. `CardV4` hard-codes
 * `bg-surface text-on-surface` in its own class list, and `cn()` is a plain
 * string join with no `tailwind-merge` behind it — passing `bg-card` through
 * `className` would put both utilities on the element and let the generated
 * stylesheet's ordering pick the winner. Tailwind sorts background utilities
 * alphabetically, which puts `.bg-card` *before* `.bg-surface`: the override
 * would lose, silently, and the most visible bug in the module would survive
 * the pass that exists to fix it.
 *
 * So the override is made by **specificity**: two attributes (0-2-0) against a
 * single class (0-1-0) wins wherever the sheets land. Identical to the trick
 * `StatCardV4` uses, for the identical reason.
 */
exports.PRODUCT_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-product-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;
/**
 * **V4 product card** — the flagship of the `commerce` module, and the
 * anatomy `ListingCardV4` mirrors so that a storefront and a marketplace read
 * as one product.
 *
 * Same props as {@link ProductCard} plus three, a different design line.
 *
 * ## The anatomy, top to bottom
 *
 * ```
 * [ media at a FIXED ratio, one badge over it ]
 * [ title, at most two lines                  ]
 * [ PriceTagV4                                ]
 * [ optional add button, full width           ]
 * ```
 *
 * Nothing else. Every slot a catalog tile is tempted to grow — a rating, a
 * seller, a colour swatch row, a second badge — is a thing the grid has to
 * make room for in every column, and §7 asks for subtraction first.
 *
 * ## Six changes
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible fix in
 *    the pass. Every card in this module paints the same colour as the page it
 *    sits on, which is why the border was doing all the work and why a product
 *    grid on a dark page read as a flat sheet of identical rectangles. See
 *    {@link PRODUCT_CARD_V4_CSS} for why the override is a sheet.
 * 2. **The media ratio is fixed and named.** The base pinned `aspect-[4/5]`
 *    with no way to say otherwise; `aspect` names four, and `ListingCardV4`
 *    reads the same four.
 * 3. **The title is capped at two lines.** The base let it run, so one product
 *    with a long name pushed its price down and broke the row it was in. Two
 *    lines with an ellipsis, via `TextV4`'s `numberOfLines` — the prop the
 *    native twin has always had, on both twins now.
 * 4. **The price is the price.** `PriceTagV4`, which sets it a step up the
 *    scale in tabular figures on the display face, rather than the base line's
 *    caption-sized number. A discounted price still does not turn red (§35.4).
 * 5. **The media placeholder is a semantic slot.** `bg-muted`, not
 *    `bg-neutral-100` — the neutral ramp carries the *light* orientation in
 *    both schemes, so the base's placeholder was a pale rectangle on a dark
 *    page. And the fallback art is `GenerativeCoverV4`, so a card with no
 *    photo is the same plate on both platforms (§10.5).
 * 6. **One link, one accessible name.** The base rendered two anchors to the
 *    same `href` — one round the image carrying `aria-label={title}`, one
 *    round the title — so a screen reader met the product twice and a keyboard
 *    user tabbed through it twice. V4 keeps the image clickable (a shopper
 *    expects that) but makes it `aria-hidden` and unfocusable, and lets the
 *    title anchor be the one name.
 *
 * **Renders nothing when `title` is empty.** §4.5: a component with nothing to
 * show renders nothing or an empty state, never a blank bordered box — and a
 * product tile with no product is exactly that box.
 *
 * ## What it does not do
 *
 * There is no container hover layer. On web this card is not itself a control
 * — the anchors are — and a `<div>` cannot take `:focus-visible`, so a state
 * layer on it would be a hover-only affordance that a keyboard user never
 * sees. The title anchor underlines instead. (The native twin *is* one
 * pressable, so it does get the state layer; see that file.)
 */
exports.ProductCardV4 = React.forwardRef(function ProductCardV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, href, onAdd, addLabel = 'Add to cart', formatMoney, badge, aspect = '4:5', raised = true, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.PRODUCT_CARD_V4_STYLE_ID, exports.PRODUCT_CARD_V4_CSS);
    // A tile with no product is a blank bordered box (§4.5).
    if (!title)
        return null;
    const media = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : (
    // Deliberately unlabelled: the generated plate is a placeholder, not a
    // picture of the product, and the title is printed directly beneath it.
    // Labelling it would announce the product name twice.
    (0, jsx_runtime_1.jsx)(GenerativeCoverV4_1.GenerativeCoverV4, { seed: slug ?? title, className: "h-full w-full" }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-product-card": "", "data-xen-v4-product-card": "", variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "none", className: (0, cn_1.cn)('flex flex-col overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-product-media": "", className: (0, cn_1.cn)('relative w-full overflow-hidden bg-muted', ASPECT_CLASS[aspect]), children: [href ? (
                    // Clickable, but neither focusable nor announced: the title anchor
                    // below is the one name for this destination.
                    (0, jsx_runtime_1.jsx)("a", { href: href, "aria-hidden": "true", tabIndex: -1, className: "block h-full w-full", children: media })) : (media), badge ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-product-badge": "", className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: badge })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [(0, jsx_runtime_1.jsx)("h3", { className: "m-0 min-w-0", children: href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "no-underline hover:underline focus-visible:underline", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title }) })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title })) }), (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { type: "button", size: "sm", onClick: onAdd, className: "mt-xs w-full", children: addLabel })) : null] })] }));
});
//# sourceMappingURL=ProductCardV4.js.map