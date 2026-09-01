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
exports.RestaurantCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const RatingV4_1 = require("../primitives/RatingV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/** Availability IS a status, so a status tone is what it is entitled to. */
const OPEN_TONE = {
    open: 'success',
    busy: 'warn',
    closed: 'neutral',
};
const MEDIA_LIST = 'h-[calc(var(--xen-space-2xl)_*_2)] w-[calc(var(--xen-space-2xl)_*_2)] shrink-0';
const MEDIA_GRID = 'h-[calc(var(--xen-space-2xl)_*_2_+_var(--xen-space-lg))] w-full';
const MEDIA_HERO = 'h-[calc(var(--xen-space-2xl)_*_4)] w-full';
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/** The maximum the base's `$`…`$$$$` scale runs to. */
const PRICE_LEVELS = 4;
/**
 * **V4 restaurant card** — the web twin of the native `RestaurantCardV4`, same
 * props as {@link RestaurantCard} plus `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The name carries the card.** `aria-label` was name, cuisine and the
 *    open state on a `role="button"` root, and that role is
 *    children-presentational — so the rating, the rating count, the price
 *    level, the ETA and the delivery fee were drawn and then pruned. Choosing
 *    a restaurant on those five figures is the entire task this card exists
 *    for.
 * 2. **`$$$` says what it means.** Three currency glyphs announce as three
 *    currency glyphs; `formatPriceLevel` gives the reader a sentence and the
 *    glyphs become decorative.
 * 3. **A closed restaurant stops getting brighter when you point at it — and
 *    the badge saying so stays legible.** The base compounded `opacity-70` on
 *    the photo inside `opacity-75` on the card — 0.525, most of the way to
 *    invisible — with `hover:opacity-90` on the same node, so hovering
 *    *un-dimmed* it. One dim now, on the photo alone; the name and the
 *    availability badge are at full strength, and press is the M3 state layer.
 * 4. **`busy` is not the same as `closed`.** Both resolved to a `neutral`
 *    badge, so a restaurant that is open and slammed looked exactly like one
 *    that is shut.
 * 5. **The card is a real button on the card tokens.** A `div` with
 *    `role="button"` and a hand-written Enter/Space handler, ringed in
 *    `primary-300` and painted on `surface`, becomes a `<button>` on
 *    `card`/`on-card` ringed in `ring`.
 */
exports.RestaurantCardV4 = React.forwardRef(function RestaurantCardV4({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', variant = 'list', openLabels, formatPriceLevel, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';
    const openWord = openLabels?.[openState] ?? OPEN_LABEL[openState];
    const level = priceLevel ? Math.min(PRICE_LEVELS, Math.max(1, priceLevel)) : undefined;
    const priceGlyphs = level ? '$'.repeat(level) : undefined;
    const priceSpoken = level !== undefined
        ? (formatPriceLevel ?? ((l) => `Price level ${l} of ${PRICE_LEVELS}`))(level)
        : undefined;
    const rated = typeof rating === 'number' ? (0, tone_v4_1.ratingParts)({ value: rating, count: ratingCount }) : undefined;
    const spoken = (0, menu_v4_1.spokenLine)([
        name,
        cuisine,
        priceSpoken,
        rated?.label,
        etaText,
        feeText,
        openWord,
    ]);
    const media = ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('relative block overflow-hidden rounded-[var(--xen-radius-md)]', horizontal ? MEDIA_LIST : variant === 'hero' ? MEDIA_HERO : MEDIA_GRID, 
        /*
          One dim, on the decorative element and nothing else — it has no
          hover of its own, and the badge that explains the state keeps full
          contrast. 0.6 rather than M3's 0.38: a closed restaurant is still
          openable, so the *disabled* band would be a lie. Same value as the
          native twin, and as `DishCardV4`.
        */
        dimmed && 'opacity-60'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute inset-0', menu_v4_1.PLACEHOLDER_CLASS) }), imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "relative h-full w-full object-cover" })) : null] }));
    const meta = (0, tone_v4_1.metaLine)([priceGlyphs, cuisine]);
    const body = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-xs', !horizontal && 'p-md'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate font-heading font-bold text-on-card", children: name }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...menu_v4_1.BADGE_V4, tone: OPEN_TONE[openState], children: openWord })] }), meta !== '' ? (
            // The `$$$` half of this line is a glyph; the sentence is in the name.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "truncate text-sm text-muted-text", children: meta })) : null, rated ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true, label: rated.label }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["(", ratingCount, ")"] })) : null] })) : null, etaText || feeText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: (0, tone_v4_1.metaLine)([etaText, feeText]) })) : null] }));
    const containerClass = (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', className);
    const layoutClass = horizontal ? 'flex flex-row items-start gap-md p-md' : 'flex flex-col';
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: containerClass, ...rest, children: interactive ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('text-left', layoutClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [media, body] })) : ((0, jsx_runtime_1.jsxs)("div", { className: layoutClass, children: [media, body] })) }));
});
//# sourceMappingURL=RestaurantCardV4.js.map