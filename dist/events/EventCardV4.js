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
exports.EventCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
/** The cover band, composed from the spacing scale: 4x and 3x the 48 step. */
const COVER_FEATURED = 'h-[calc(var(--xen-space-2xl)_*_4)]';
const COVER_DEFAULT = 'h-[calc(var(--xen-space-2xl)_*_3)]';
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 event card** — the web twin of the native `EventCardV4`, same props as
 * {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's activation is a real `<button>`, and the heading survives
 *    it.** The base was a `div` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler that ended in
 *    `e.preventDefault(); currentTarget.click()` — three approximations of what
 *    a button already does. Worse, `role="button"` makes its whole subtree
 *    presentational, so the `<h3>` was erased from the accessibility tree: a
 *    screen-reader user browsing an events page by heading found none. The
 *    heading is now the button's **parent**, not its child.
 * 2. **The name carries the event.** `aria-label={title}` replaced everything
 *    the card drew, so the date, the time, the venue and the attendee count
 *    were unreachable. `spokenLine()` joins them.
 * 3. **The compact skeleton keeps its row layout.** `compact` is a row and its
 *    loading state was a column, so the card changed shape and jumped as the
 *    data landed — and the skeleton's `bg-neutral-100`/`200` are ramp steps
 *    that mirror under `[data-theme="dark"]` into pale plates on a dark page.
 * 4. **Loading announces.** The base put `aria-label` on a role-less `div`,
 *    where it is ignored; `role="status"` gives it somewhere to land.
 * 5. **Press is a state layer**, not `hover:opacity-95` — dimming a card's own
 *    content is M3's *disabled* signal — and the focus ring is `--xen-ring`,
 *    the slot corrected to 3:1 against the page, rather than `primary-300`.
 */
exports.EventCardV4 = React.forwardRef(function EventCardV4({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', loading = false, loadingLabel = 'Loading event', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A card with no event on it is the empty bordered box the line rules out.
    if (!title)
        return null;
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const interactive = typeof onClick === 'function' && !loading;
    // The base types `onClick` against the card's own `div`; the activation is
    // a real `<button>` now, and the two element types are unrelated.
    const activate = onClick;
    const container = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', isCompact ? 'flex flex-row' : 'flex flex-col', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: container, ...rest, children: [isCompact ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-2xl w-2xl shrink-0', event_v4_1.PLACEHOLDER_CLASS) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full', isFeatured ? COVER_FEATURED : COVER_DEFAULT, event_v4_1.PLACEHOLDER_CLASS) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-8/12', event_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-5/12', event_v4_1.PLACEHOLDER_CLASS) })] })] }));
    }
    const metaLine = [date, time].filter(Boolean).join(' · ');
    const attendees = typeof attendeeCount === 'number' ? `${attendeeCount} going` : undefined;
    const spoken = (0, event_v4_1.spokenLine)([title, category, date, time, location, attendees]);
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full', isFeatured ? COVER_FEATURED : COVER_DEFAULT), children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center', event_v4_1.PLACEHOLDER_CLASS), children: (0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": imageAlt ?? title, className: "text-2xl", children: "\uD83C\uDF9F\uFE0F" }) })), category ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-sm top-sm", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "primary", children: category }) })) : null] })) : null;
    const heading = ((0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-heading font-bold text-on-card', isFeatured ? 'text-xl' : 'text-base'), children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": spoken, onClick: activate, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex w-full items-center rounded-[var(--xen-radius-md)] text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: title })) : (title) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: container, ...rest, children: [cover, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [isCompact && category ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "primary", children: category }) })) : null, heading, metaLine ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-sm text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDDD3\uFE0F" }), metaLine] })) : null, location ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs truncate text-sm text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), location] })) : null, attendees ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-sm text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDC65" }), attendees] })) : null] })] }));
});
//# sourceMappingURL=EventCardV4.js.map