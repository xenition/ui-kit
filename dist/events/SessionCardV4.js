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
exports.SessionCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarGroupV4_1 = require("../primitives/AvatarGroupV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 session card** — the web twin of the native `SessionCardV4`, same props
 * as {@link SessionCard} plus `bookmarkLabel`, `unbookmarkLabel` and
 * `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **Enter on the bookmark bookmarks the session.** This is the module's
 *    headline defect, and it is a live keyboard bug. The card guarded the
 *    *click* path with `e.stopPropagation()` and left the *key* path open, so
 *    the card's own `onKeyDown` caught the keydown bubbling out of the star and
 *    ran `e.preventDefault(); currentTarget.click()`. Enter's default action on
 *    a `<button>` is the click it had just cancelled, and Space's click fires
 *    on keyup, which is cancelled too — so a keyboard user pressed Enter on the
 *    star and **navigated to the session** without bookmarking it. The fix is
 *    structural, not another guard: the card's activation is a real `<button>`
 *    around the title, the star is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone entirely.
 * 2. **The seat meter is a real `progressbar`, and it stops printing negative
 *    seats.** It was a bare `div` with a width, invisible to a screen reader,
 *    and the base clamped the *bar* while printing the raw number — so
 *    `seatsTaken: -5` drew an empty meter beside the words "−5 / 100 seats
 *    taken". `seatParts()` clamps both. The meter is also a sibling of the
 *    activation: inside `role="button"` its value would be presentational.
 * 3. **One accessible name carrying the session.** `aria-label={title}`
 *    replaced the subtree, so the time, the room, the track, the speakers and
 *    the seat count were all unreachable.
 * 4. **The bookmarked star is the same tone on both twins.** It was `primary`
 *    here and `accent` on native, and this twin could not simply match —
 *    `IconColor` has no `accent`. Both draw the glyph as text in the
 *    contrast-corrected `primary` ink rather than through `Icon`'s fill slot.
 * 5. **A track is identity, so its badge does not change tone with the card.**
 *    The badge went `primary` on a highlighted card and `neutral` otherwise —
 *    the same track wearing two colours depending on the card around it.
 * 6. **Press is a state layer, and both controls clear 44.** `hover:opacity-95`
 *    on the card and `hover:opacity-70` on the star dim their own content,
 *    which is M3's *disabled* signal, and the star was a bare `p-xs` glyph.
 */
exports.SessionCardV4 = React.forwardRef(function SessionCardV4({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', bookmarkLabel = 'Bookmark session', unbookmarkLabel = 'Remove bookmark', formatSeats, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const isHighlight = variant === 'highlight';
    const interactive = typeof onClick === 'function';
    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick;
    const seats = (0, event_v4_1.seatParts)(seatsTaken, capacity);
    const seatText = seats
        ? seats.full
            ? 'Session full'
            : (formatSeats ?? ((t, c) => `${t} / ${c} seats taken`))(seats.taken, seats.capacity)
        : undefined;
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const metaLine = [time, room].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border bg-card text-on-card', isHighlight ? 'border-primary' : 'border-border', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row", children: [isHighlight ? (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "w-xs shrink-0 bg-primary" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-sm p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-start gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [track ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "neutral", children: track }) })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-bold text-on-card", children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: activate, "aria-label": (0, event_v4_1.spokenLine)([
                                                    title,
                                                    track,
                                                    time,
                                                    room,
                                                    speakerNames,
                                                    seatText,
                                                ]), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex w-full items-center rounded-[var(--xen-radius-md)] text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: title })) : (title) }), metaLine ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm text-muted-text', event_v4_1.TABULAR_CLASS), children: metaLine })) : null] }), onBookmark ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": bookmarked, "aria-label": bookmarked ? unbookmarkLabel : bookmarkLabel, onClick: () => onBookmark(!bookmarked), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', nav_v4_1.MIN_TAP_SQUARE_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-lg', bookmarked ? event_v4_1.TONE_INK.primary : 'text-muted-text'), children: bookmarked ? '★' : '☆' }) })) : null] }), abstract ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-on-card", children: abstract })) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarGroupV4_1.AvatarGroupV4, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-muted-text", children: speakerNames })] })) : null, seats && seatText ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: seats.taken, max: seats.capacity, tone: seats.full ? 'danger' : 'primary', size: "sm", "aria-label": seatText }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', event_v4_1.TABULAR_CLASS, seats.full ? event_v4_1.TONE_INK.danger : 'text-muted-text'), children: seatText })] })) : null] })] }) }));
});
//# sourceMappingURL=SessionCardV4.js.map