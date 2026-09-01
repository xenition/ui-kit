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
exports.ListingCardV4 = exports.LISTING_CARD_V4_CSS = exports.LISTING_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const GenerativeCoverV4_1 = require("../commerce/GenerativeCoverV4");
const money_1 = require("../commerce/money");
const ConditionBadgeV4_1 = require("./ConditionBadgeV4");
const internal_1 = require("./internal");
/** The named ratios as a CSS `aspect-ratio`. */
const ASPECT_CLASS = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '3:4': 'aspect-[3/4]',
    '16:9': 'aspect-[16/9]',
};
/**
 * The default ratio per layout, so a caller who says nothing still gets the
 * right shape: a grid tile mirrors `ProductCardV4`'s `4:5`, a featured card is
 * a banner, and a list row's thumbnail is a square because the *row* owns the
 * height.
 */
const DEFAULT_ASPECT = {
    grid: '4:5',
    list: '1:1',
    featured: '16:9',
};
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
exports.LISTING_CARD_V4_STYLE_ID = 'xen-v4-listing-card-styles';
/**
 * §4.2's headline fix, and the reason it cannot be a class.
 *
 * `CardV4` hard-codes `bg-surface text-on-surface` in its own class list and
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so passing
 * `bg-card` in `className` would put both utilities on the element and let the
 * generated stylesheet's ordering pick the winner — and Tailwind sorts
 * background utilities alphabetically, which puts `.bg-card` *before*
 * `.bg-surface` and makes the override lose. Two attributes (0-2-0) beat one
 * class (0-1-0) wherever the two sheets happen to land.
 */
exports.LISTING_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-listing-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;
/**
 * **V4 listing card** — the marketplace's product card, and deliberately
 * indistinguishable from the storefront's.
 *
 * Brief §3 Group C: "`ListingCardV4` mirrors `ProductCardV4` — same ground,
 * same image ratio — so a storefront and a marketplace read as one product."
 * The anatomy below is that card's, slot for slot, read off
 * `commerce/ProductCardV4` rather than guessed:
 *
 * ```
 * [ media at a FIXED ratio, one badge over its top-left ]   ← edge to edge
 * [ title, at most two lines                            ]   ┐
 * [ PriceTagV4                                          ]   │ padding md
 * [ condition / location line                           ]   ┘
 * ```
 *
 * The card is `padding="none"` and the body carries the inset, so the photo
 * runs to the card's corners exactly as the storefront tile's does. The one
 * slot the storefront card does not have is the **watch toggle**, top-right,
 * opposite the badge — a marketplace affordance with no catalogue equivalent.
 *
 * That anatomy settles the one thing the base got backwards. **The price moved
 * below the title.** The base led with the price and put the title under it,
 * which reads as a price list rather than a catalogue: a shopper scanning a
 * grid is looking for *what a thing is*, then what it costs. It is also the
 * order `ProductCardV4` is built in, and the whole point of this component is
 * that the two are one card.
 *
 * The rest:
 *
 * 1. **The ground is `card`** (§4.2). The base painted `surface` — the colour
 *    of the page — so a grid on a dark page was a flat sheet of same-coloured
 *    rectangles held apart by hairlines.
 * 2. **The price is `PriceTagV4`** (rule 7), which carries the tabular figures
 *    (rule 2), the display face, the step up the type scale, and the announced
 *    `Was …` on a compare-at. Nothing here draws a number.
 * 3. **The watch chip clears the tap floor.** It was a 32 square — a control a
 *    shopper taps repeatedly, drawn below the 44 HIG floor, which is the same
 *    defect §2 records against `QuantityStepper`.
 * 4. **A watched listing is not in danger.** The base painted the filled heart
 *    `danger`; rule 3 reserves that tone for *bad*, and saving something you
 *    like is the opposite. It takes the brand.
 * 5. **The accessible name says the grade in words.** The base announced the
 *    raw slug — "Vintage camera, $125.00, like-new". See
 *    {@link CONDITION_V4_LABEL}.
 * 6. **Loading is a skeleton at the card's own footprint**, not the string
 *    "Loading listing…", which is a sentence where a card should be.
 * 7. **Press feedback is the state layer** (§4.3), given the opaque
 *    `card`/`onCard` pair because the title's contrast promise is made against
 *    the fill the card actually wears.
 *
 * ## The one place it diverges from `ProductCardV4`, and why
 *
 * That card carries **no** container state layer, and its note explains why: on
 * web it is not itself a control — its anchors are — and a plain `<div>` cannot
 * take `:focus-visible`, so a layer on it would be a hover-only affordance a
 * keyboard user never meets.
 *
 * This card *is* the control. Its base contract is `onClick` **on the card**,
 * which makes it a `role="button"` with `tabIndex={0}` — focusable, so the
 * layer is reachable from the keyboard as well as the pointer, and it comes
 * with a real focus ring. Same rule, opposite answer, because the premise
 * differs. A card that is not interactive gets neither.
 *
 * Composes `CardV4`, `PriceTagV4`, `ConditionBadgeV4`, `IconV4`, `TextV4` and
 * `SkeletonV4` (rule 7). Renders **nothing** without a title (§4.5).
 */
exports.ListingCardV4 = React.forwardRef(function ListingCardV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, variant = 'grid', loading = false, aspect, raised = true, formatMoney = money_1.formatMoney, badge, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.LISTING_CARD_V4_STYLE_ID, exports.LISTING_CARD_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const horizontal = variant === 'list';
    const interactive = onClick != null;
    // A listing with no headline is the blank bordered box §4.5 rules out.
    if (title === undefined || title === null || title === '')
        return null;
    const ratio = aspect ?? DEFAULT_ASPECT[variant];
    const chip = badge !== undefined ? (badge) : condition !== undefined ? ((0, jsx_runtime_1.jsx)(ConditionBadgeV4_1.ConditionBadgeV4, { condition: condition, size: "sm" })) : null;
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? `Unwatch ${title}` : `Watch ${title}`, "aria-pressed": watched, onClick: (e) => {
            e.stopPropagation();
            onToggleWatch(!watched);
        }, "data-xen-v4-listing-watch": "", "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('absolute right-sm top-sm z-10 inline-flex items-center justify-center', 
        // The HIG tap floor, not a 32 square: this is a control a shopper
        // taps repeatedly.
        nav_v4_1.MIN_TAP_SQUARE_CLASS, 'rounded-[var(--xen-radius-full)] bg-card', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: watched ? 'heart' : undefined, glyph: watched ? undefined : '♡', size: "base", color: watched ? 'primary' : 'muted' }) })) : null;
    const media = ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-listing-media": "", className: (0, cn_1.cn)('relative shrink-0 overflow-hidden', 
        /*
          `muted`, not `bg-neutral-100`. The neutral ramp carries the LIGHT
          orientation in both schemes, so the base's placeholder was a pale
          rectangle punched into a dark page. `ProductCardV4` reaches for the
          same semantic slot, which is half of why the two wells look alike.
        */
        'bg-muted', ASPECT_CLASS[ratio], horizontal ? 'h-auto w-[calc(var(--xen-space-2xl)_*_2)]' : 'w-full'), children: [imageUrl !== undefined && imageUrl !== '' ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover", loading: "lazy" })) : (
            /*
              The same plate `ProductCardV4` falls back to, from the same seed —
              so a listing with no photo and a catalogue product with no photo are
              the same picture rather than two different apologies.
  
              Deliberately unlabelled: it is a placeholder, not a picture of the
              item, and the title is printed directly beneath it. Labelling it
              would announce the listing twice.
            */
            (0, jsx_runtime_1.jsx)(GenerativeCoverV4_1.GenerativeCoverV4, { seed: title, className: "h-full w-full" })), chip !== null ? (0, jsx_runtime_1.jsx)("div", { className: "absolute left-sm top-sm", children: chip }) : null] }));
    const info = ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col justify-center gap-xs p-md", children: loading ? ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 3 })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney, size: variant === 'featured' ? 'lg' : 'md' }), subtitle !== undefined && subtitle !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] })) }));
    const shared = {
        'data-xen-v4-listing-card': variant,
        variant: (raised ? 'elevated' : 'outlined'),
        radius: 'lg',
        // The media runs to the card's corners; the body carries the inset.
        padding: 'none',
        className: (0, cn_1.cn)('relative overflow-hidden', horizontal ? 'flex flex-row' : 'flex flex-col', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className),
    };
    if (!interactive) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, ...shared, ...rest, children: [media, info, watchChip] }));
    }
    const priceLabel = formatMoney(priceCents, currency);
    const grade = condition !== undefined ? (ConditionBadgeV4_1.CONDITION_V4_LABEL[condition] ?? condition) : undefined;
    /*
      A `role="button"` container rather than a real `<button>`: the state layer
      has to sit on the element that owns the ground, and the watch chip is a
      real `<button>` *inside* it, which a `<button>` parent cannot legally
      contain.
    */
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, ...shared, ...rest, role: "button", tabIndex: 0, "aria-label": `${title}, ${priceLabel}${grade !== undefined ? `, ${grade}` : ''}`, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), onClick: onClick, onKeyDown: internal_1.activateOnKey, children: [media, info, watchChip] }));
});
//# sourceMappingURL=ListingCardV4.js.map