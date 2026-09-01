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
exports.SellerCardV4 = exports.SELLER_CARD_V4_CSS = exports.SELLER_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const icon_names_1 = require("../primitives/icon-names");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const internal_1 = require("./internal");
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
exports.SELLER_CARD_V4_STYLE_ID = 'xen-v4-seller-card-styles';
/**
 * §4.2's headline fix. `CardV4` hard-codes `bg-surface text-on-surface` in its
 * own class list and `cn()` is a plain string join with no `tailwind-merge`
 * behind it, so `bg-card` in `className` would put both utilities on the
 * element and let stylesheet order pick the winner — and Tailwind sorts
 * background utilities alphabetically, which puts `.bg-card` *before*
 * `.bg-surface` and makes the override lose. Two attributes (0-2-0) beat one
 * class (0-1-0) wherever the sheets land.
 */
exports.SELLER_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-seller-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;
/**
 * **V4 seller card** — half of the trust pair, with `RatingBreakdownV4`, and
 * the highest-stakes read in the kit.
 *
 * Brief §3 Group C: "rating as a number *and* stars *and* a count, never stars
 * alone", and rule 6: "a verified seller… ships an icon **and** a label".
 * Everything below is one of those two sentences.
 *
 * 1. **The rating is three channels, not one.** The base composed
 *    `Rating showValue` — glyphs with a small number tucked inside them — and
 *    a parenthesised count beside it. V4 pulls the figure out as its own
 *    tabular text at a step the eye lands on first, keeps `RatingV4` beside it
 *    as the shape, and spells the count as words (`1,204 reviews`) rather than
 *    as `(1,204)`, which reads as a footnote marker when announced.
 * 2. **A missing rating says so.** See
 *    {@link SellerCardV4Props.emptyRatingLabel}.
 * 3. **Verified is a mark and a word**, and the mark is not announced —
 *    "check Verified" is noise, so the badge carries `Verified seller` as its
 *    accessible name and the tick stays visual. Same call `PriceTagV4` makes
 *    for its struck compare-at price.
 * 4. **The ground is `card`** (§4.2) for the `card` variant; `inline` keeps no
 *    container at all, because an identity block dropped into a listing detail
 *    is a *row*, and §4.3 gives a row a transparent ground so the container
 *    owns the surface.
 * 5. **The identity block clears the tap floor** (44) and takes the state
 *    layer instead of `hover:opacity`/`pressed ? 0.85` — dimming fades the
 *    card's own content, which is the signal M3 spends `0.38` on to mean
 *    *disabled*, so a hovered seller and a suspended one looked alike.
 * 6. **The contact button stays outside the press target**, as the base
 *    already had it right, so contacting never also navigates.
 *
 * Composes `CardV4`, `AvatarV4`, `RatingV4`, `BadgeV4`, `ButtonV4` and
 * `TextV4` (rule 7). Renders **nothing** without a name (§4.5) — an identity
 * block with no identity is a blank bordered box.
 */
exports.SellerCardV4 = React.forwardRef(function SellerCardV4({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, variant = 'card', raised = true, verifiedLabel = 'Verified', emptyRatingLabel = 'No ratings yet', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.SELLER_CARD_V4_STYLE_ID, exports.SELLER_CARD_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const inline = variant === 'inline';
    const interactive = onClick != null;
    // An identity block with no identity is the blank bordered box §4.5 rules
    // out.
    if (name === undefined || name === null || name === '')
        return null;
    const word = verifiedLabel === '' ? 'Verified' : verifiedLabel;
    const rated = typeof rating === 'number';
    const counted = typeof reviewCount === 'number';
    const meta = [];
    if (typeof salesCount === 'number')
        meta.push(`${salesCount.toLocaleString()} sales`);
    if (location !== undefined && location !== '')
        meta.push(location);
    const trust = rated ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-seller-trust": "", className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: rating.toFixed(1) }), (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: counted
                    ? `${reviewCount.toLocaleString()} ${reviewCount === 1 ? 'review' : 'reviews'}`
                    : emptyRatingLabel })] })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-v4-seller-trust": "", size: "sm", tone: "mutedText", numberOfLines: 1, children: emptyRatingLabel }));
    const identity = ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: inline ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: inline ? 'onSurface' : 'onCard', numberOfLines: 1, className: "min-w-0", children: name }), verified ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", "data-xen-v4-seller-verified": "", "aria-label": `${word} seller`, className: "shrink-0", children: `${(0, icon_names_1.resolveIconGlyph)('check')} ${word}` })) : null] }), trust, meta.length > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: meta.join(' · ') })) : null] })] }));
    const a11yLabel = `${name}${verified ? `, ${word.toLowerCase()} seller` : ''}` +
        `${rated ? `, rated ${rating.toFixed(1)} of 5` : ''}` +
        `${counted ? `, ${reviewCount.toLocaleString()} reviews` : ''}`;
    const identityBlock = interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "button", tabIndex: 0, "aria-label": a11yLabel, onClick: onClick, onKeyDown: internal_1.activateOnKey, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(inline ? 'var(--xen-surface)' : 'var(--xen-card)', inline ? 'var(--xen-on-surface)' : 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)]', nav_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: identity })) : (identity);
    const action = onContact != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", onClick: onContact, className: "shrink-0", children: actionLabel })) : null;
    const row = (0, cn_1.cn)('flex w-full items-center gap-md', className);
    if (inline) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-seller-card": "inline", className: row, ...rest, children: [identityBlock, action] }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-v4-seller-card": "card", variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", className: row, ...rest, children: [identityBlock, action] }));
});
//# sourceMappingURL=SellerCardV4.js.map