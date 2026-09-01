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
exports.SpeakerCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const RatingV4_1 = require("../primitives/RatingV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 speaker card** — the web twin of the native `SpeakerCardV4`, same props
 * as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card's activation is a real `<button>`.** The base was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler that
 *    ended in `e.preventDefault(); currentTarget.click()` — a synthesised click
 *    standing in for the one a real button dispatches for free.
 * 2. **The name carries the speaker.** `aria-label={name}` replaced the
 *    subtree, and `role="button"` makes a subtree presentational anyway — so
 *    the role, the company, the rating and every topic tag were unreachable to
 *    a screen reader. `spokenLine()` joins them.
 * 3. **`rating` is clamped before it reaches `Rating`.** A caller passing a
 *    0–10 score, or a `-1` from an unrated speaker, drew more or fewer than the
 *    five glyphs the component promises; `ratingParts()` bounds it and gives
 *    the stars the numeral a low-vision reader actually compares.
 * 4. **Press is a state layer and the tags are drawn the same way on both
 *    twins.** `hover:opacity-95` dims the card's own content, which is M3's
 *    *disabled* signal; the badges take the module's one `soft`/`sm` shape
 *    rather than this twin's solid `md` and native's soft `sm`.
 */
exports.SpeakerCardV4 = React.forwardRef(function SpeakerCardV4({ name, role, company, avatarUrl, bio, rating, tags = [], variant = 'row', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const stacked = variant === 'stacked';
    const interactive = typeof onClick === 'function';
    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick;
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const stars = typeof rating === 'number' ? (0, tone_v4_1.ratingParts)({ value: rating }) : undefined;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, alt: "", size: stacked ? 'lg' : 'md' }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-xs', stacked ? 'items-center text-center' : 'min-w-0 flex-1 items-start text-left'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold text-on-card", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: roleLine }) : null, stars && stars.text != null ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: Number(stars.text), max: stars.total, size: "sm", showValue: true, label: stars.label })) : null, bio ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-card', stacked ? 'line-clamp-3' : 'line-clamp-2'), children: bio })) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex flex-row flex-wrap gap-xs', stacked ? 'justify-center' : 'justify-start'), children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "neutral", children: t }, `${t}-${i}`))) })) : null] })] }));
    const inner = (0, cn_1.cn)('flex w-full gap-md p-lg', stacked ? 'flex-col items-center' : 'flex-row items-start');
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card', className), ...rest, children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: activate, "aria-label": (0, event_v4_1.spokenLine)([name, role, company, stars?.label, ...tags]), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(inner, chrome_v4_1.MIN_TAP_CLASS, 'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: inner, children: body })) }));
});
//# sourceMappingURL=SpeakerCardV4.js.map