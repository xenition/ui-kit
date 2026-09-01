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
exports.SwipeCardV4 = exports.OVERLAY_DECISION = void 0;
exports.SwipeStampV4 = SwipeStampV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const profile_v4_1 = require("./internal/profile-v4");
const DistanceBadgeV4_1 = require("./DistanceBadgeV4");
/**
 * A drag overlay named as a *decision*, so `decisionLabels` is keyed by the
 * thing the deck emits rather than by the thing the card draws. `'nope'` and
 * `'pass'` were two names for one outcome across the two files.
 */
exports.OVERLAY_DECISION = {
    like: 'like',
    nope: 'pass',
    superlike: 'superlike',
};
/**
 * Where each stamp lands and which way it leans.
 *
 * Per overlay, and that is the point: native positioned all three at
 * `left: spacing.lg` unconditionally, so **NOPE was drawn in the LIKE corner**
 * — the one place a user glances at to check they are about to do the thing
 * they meant to. The lean is mirrored with the side (a stamp on the right
 * leans right) and `superlike` sits square in the middle, so the three read as
 * one set on both platforms.
 */
const STAMP_PLACE = {
    like: { position: 'left-lg', rotate: -12 },
    nope: { position: 'right-lg', rotate: 12 },
    superlike: { position: 'left-1/2 -translate-x-1/2', rotate: 0 },
};
const STAMP_TEXT = {
    like: 'LIKE',
    nope: 'NOPE',
    superlike: 'SUPER',
};
/**
 * A decision stamp, on its own.
 *
 * It is a separate export because `SwipeDeckV4` renders it as a **sibling** of
 * whatever `renderCard` returned: the base computed the overlay and its
 * progress and then threw both away in that branch, so a caller who supplied
 * their own card lost the LIKE/NOPE feedback entirely and had no way to draw
 * it. Native already stacked them as siblings; this is what lets web do the
 * same.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
function SwipeStampV4({ overlay, opacity = 1, labels }) {
    const decision = exports.OVERLAY_DECISION[overlay];
    const tone = profile_v4_1.ACTION_TONE[decision] ?? 'neutral';
    const place = STAMP_PLACE[overlay];
    return ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", style: {
            opacity: Math.max(0, Math.min(1, opacity)),
            transform: `rotate(${place.rotate}deg)`,
        }, className: (0, cn_1.cn)('pointer-events-none absolute top-lg rounded-[var(--xen-radius-md)]', 'border-[length:var(--xen-space-xs)] px-sm py-xs', 'text-xl font-bold tracking-widest', LikePassButtonsV4_1.ACTION_SKIN[tone].fill, LikePassButtonsV4_1.ACTION_SKIN[tone].ring, profile_v4_1.TONE_INK[tone], place.position), children: labels?.[decision] ?? STAMP_TEXT[overlay] }));
}
/**
 * **V4 swipe card** — the web twin of the native `SwipeCardV4`, same props as
 * {@link SwipeCard} plus `aspectRatio`, `verifiedLabel` and `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The photo's scrim stops inverting.** `from-neutral-950` reads as "the
 *    darkest step", but the web ramp *mirrors* under `[data-theme="dark"]`, so
 *    in a dark theme it resolved to the **lightest** step: the bottom of every
 *    profile photo washed near-white and took the white name, tagline and
 *    distance on it with it. A photograph does not follow the scheme, so its
 *    scrim must not either — `PHOTO_SCRIM` and `PHOTO_INK` are fixed in both.
 * 2. **The card is not a picture.** It reported `role="img"` with a name of
 *    `"Ada, 29. Loves ferries"` — so the verified mark, the online state and
 *    the distance, all drawn on the card, were removed from the accessibility
 *    tree by that role and absent from the name that replaced them. It is a
 *    `group`; the name carries the marks the glyphs stand for, and the distance
 *    badge keeps its own correctly formatted label rather than being flattened
 *    into a number without a unit.
 * 3. **Liking and passing are not success and failure.** See
 *    {@link SwipeStampV4}.
 * 4. **NOPE is drawn in the NOPE corner** — see {@link STAMP_PLACE} — and the
 *    stamp is a shared component, so the two twins cannot drift on its fill,
 *    its lean or its side.
 * 5. **The frame is the caller's.** See `aspectRatio`.
 */
exports.SwipeCardV4 = React.forwardRef(function SwipeCardV4({ profile, variant = 'photo', overlay = null, overlayOpacity, aspectRatio, verifiedLabel = 'Verified', decisionLabels, className, style, ...rest }, ref) {
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    // One name that CONTAINS what the glyphs mean, rather than a name that
    // silently replaced them.
    const label = (0, profile_v4_1.spokenLine)([
        title,
        profile.tagline,
        profile.verified ? verifiedLabel : null,
        profile.online ? 'Active now' : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": label, className: (0, cn_1.cn)('relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border', aspectRatio == null && (variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]'), className), style: aspectRatio != null ? { aspectRatio: String(aspectRatio), ...style } : style, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute inset-0', profile_v4_1.PLACEHOLDER_CLASS) }), profile.photoUri ? ((0, jsx_runtime_1.jsx)("img", { src: profile.photoUri, alt: "", className: "relative h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "relative flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)("div", { style: { backgroundImage: `linear-gradient(to top, ${profile_v4_1.PHOTO_SCRIM}, transparent)` }, className: "absolute inset-x-0 bottom-0 flex flex-col gap-xs p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { style: { color: profile_v4_1.PHOTO_INK }, className: "text-xl font-bold", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2714", size: "sm", style: { color: profile_v4_1.PHOTO_INK } }) : null, profile.online ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-sm w-sm rounded-full bg-success" })) : null] }), profile.tagline ? ((0, jsx_runtime_1.jsx)("span", { style: { color: profile_v4_1.PHOTO_INK }, className: "line-clamp-2 text-sm", children: profile.tagline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm, unit: "km" }) })) : null] }), overlay ? ((0, jsx_runtime_1.jsx)(SwipeStampV4, { overlay: overlay, opacity: overlayOpacity ?? 1, labels: decisionLabels })) : null] }));
});
//# sourceMappingURL=SwipeCardV4.js.map