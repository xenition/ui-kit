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
exports.ChildProfileCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/** Glyph and default word per mood. A mood is identity, so it takes no tone. */
const MOOD_META_V4 = {
    happy: { glyph: '😊', label: 'Happy' },
    excited: { glyph: '🤩', label: 'Excited' },
    calm: { glyph: '😌', label: 'Calm' },
    sad: { glyph: '😢', label: 'Sad' },
    tired: { glyph: '😴', label: 'Tired' },
    sick: { glyph: '🤒', label: 'Not well' },
};
/** An interest is a tag. The brand's second slot, matching the native twin. */
const INTEREST_TONE = 'accent';
/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's accessible name was being dropped on the floor.** It was an
 *    `aria-label` on a `div` with no role — which browsers ignore outright —
 *    for every card without an `onClick`, which is most of them. The name now
 *    belongs to a real `<button>` when the card is activatable, and to nothing
 *    at all when it is not, because the visible text is already the name.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does — and it wrapped the whole
 *    card, so the interest chips and the mood block were swallowed into one
 *    stop.
 * 3. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 4. **A mood is not a status and a sad child is not an error.** The mood
 *    block keeps its glyph and gains a replaceable word; nothing about it is
 *    carried by colour.
 * 5. **The interest chips match their native twin.** Native drew them
 *    `accent`/`soft`/`sm`, web drew them `primary`/`solid`/`md` — one call,
 *    two chips — because of a comment claiming the web `Badge` has no `accent`
 *    tone. It has had one for a while.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page; press is the M3 state layer;
 *    the skeleton is opaque and card-relative rather than `bg-neutral-200`; the
 *    card sits on `card`/`on-card`; the activation clears 44.
 */
exports.ChildProfileCardV4 = React.forwardRef(function ChildProfileCardV4({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, moodLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const shell = (0, cn_1.cn)('flex flex-col gap-md', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-child-profile-card": "", role: "status", "aria-live": "polite", "aria-label": name, className: shell, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-14 w-14 shrink-0 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-4 w-1/2" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" })] })] }) }));
    }
    if (!name)
        return null;
    const moodMeta = mood ? MOOD_META_V4[mood] : undefined;
    const moodWord = mood ? (moodLabels?.[mood] ?? MOOD_META_V4[mood].label) : undefined;
    const caption = (0, tone_v4_1.captionLine)([age, grade]);
    const label = (0, tone_v4_1.spokenLine)([name, age, grade, birthday, moodWord]);
    const head = ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full items-center gap-md", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "lg", src: photoUrl, name: name, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xl font-bold text-on-card", children: name }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: caption }) : null, birthday ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83C\uDF82 " }), birthday] })) : null] }), moodMeta ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none", children: moodMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: moodWord })] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-child-profile-card": "", className: shell, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => onClick(), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex items-center rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: head })) : (head), interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-wrap gap-xs", children: interests.map((interest, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: INTEREST_TONE, variant: "soft", size: "sm", children: interest }) }, `${interest}-${index}`))) })) : null] }));
});
//# sourceMappingURL=ChildProfileCardV4.js.map