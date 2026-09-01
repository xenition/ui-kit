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
exports.VenueCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const RatingV4_1 = require("../primitives/RatingV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
/** The media band, composed off the spacing scale rather than a literal height. */
const MEDIA_CLASS = 'h-[calc(var(--xen-space-2xl)_*_2_+_var(--xen-space-lg))]';
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 venue card** — the web twin of the native `VenueCardV4`, same props as
 * {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Enter on "Directions" gives directions.** This is §1.2's defect and it
 *    is a live keyboard bug. The card guarded the *click* path with
 *    `e.stopPropagation()` and left the *key* path open, so the card's own
 *    `onKeyDown` caught the keydown bubbling out of the Directions button and
 *    ran `e.preventDefault(); currentTarget.click()` — cancelling Enter's
 *    default activation of the button and firing the card instead. A keyboard
 *    user pressing Enter on "Directions" **opened the venue**. The fix is
 *    structural: the card's activation is a real `<button>` around the media
 *    and the details, Directions is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone.
 * 2. **One accessible name carrying the venue.** `aria-label={name}` replaced
 *    the subtree — and `role="button"` makes a subtree presentational anyway —
 *    so the address, the rating, the capacity and the distance were all
 *    unreachable to a screen reader.
 * 3. **The photo placeholder is the shared placeholder ground**, not
 *    `bg-neutral-100`: a ramp step mirrors under `[data-theme="dark"]`, so an
 *    imageless venue drew a near-white plate across the top of a dark card.
 * 4. **Both controls clear 44.** "Directions" was a bare text button, and it is
 *    the one thing on this card somebody taps while walking.
 * 5. **Press is a state layer** — `hover:opacity-95` and `hover:opacity-70` dim
 *    the control's own content, which is the signal M3 reserves for *disabled*
 *    — and the focus ring is `--xen-ring`, not the `primary-300` ramp step.
 */
exports.VenueCardV4 = React.forwardRef(function VenueCardV4({ name, address, distance, capacity, rating, imageUrl, imageAlt, variant = 'default', onDirections, directionsLabel = 'Directions', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const isCompact = variant === 'compact';
    const interactive = typeof onClick === 'function';
    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick;
    const stars = typeof rating === 'number' ? (0, tone_v4_1.ratingParts)({ value: rating }) : undefined;
    const seats = typeof capacity === 'number' ? `Seats ${capacity}` : undefined;
    const media = !isCompact ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block w-full', MEDIA_CLASS), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center', event_v4_1.PLACEHOLDER_CLASS), children: (0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": imageAlt ?? name, className: "text-2xl", children: "\uD83D\uDDFA\uFE0F" }) })) })) : null;
    const details = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs p-md text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: name }), address ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs truncate text-sm text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate", children: address })] })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row flex-wrap items-center gap-md", children: [stars && stars.text != null ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: Number(stars.text), max: stars.total, size: "sm", showValue: true, label: stars.label })) : null, seats ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: seats }) : null, distance ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: distance }) : null] })] }));
    const bodyClass = (0, cn_1.cn)('flex w-full', isCompact ? 'flex-row' : 'flex-col');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: activate, "aria-label": (0, event_v4_1.spokenLine)([name, address, stars?.label, seats, distance]), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(bodyClass, chrome_v4_1.MIN_TAP_CLASS, 'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [media, details] })) : ((0, jsx_runtime_1.jsxs)("div", { className: bodyClass, children: [media, details] })), onDirections ? ((0, jsx_runtime_1.jsx)("div", { className: "px-md pb-md", children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, event_v4_1.spokenLine)([directionsLabel, name]), onClick: onDirections, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('inline-flex items-center rounded-[var(--xen-radius-md)] px-sm text-sm font-semibold text-primary-text', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: directionsLabel }) })) : null] }));
});
//# sourceMappingURL=VenueCardV4.js.map