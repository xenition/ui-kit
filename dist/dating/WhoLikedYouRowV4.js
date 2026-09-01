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
exports.WhoLikedYouRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const profile_v4_1 = require("./internal/profile-v4");
/** 72 — the tile, `2xl + lg`. Wide enough for a 56 avatar and a first name. */
const TILE_CLASS = 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]';
/** 64 — a skeleton face, `2xl + md`. */
const SKELETON_FACE_CLASS = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]';
/**
 * **V4 who-liked-you row** — the web twin of the native `WhoLikedYouRowV4`,
 * same props as {@link WhoLikedYouRow} plus `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The count is not an error.** `bg-danger text-on-danger` — the most
 *    positive number in the product, painted in the slot that means something
 *    has gone wrong, at the top of the screen the whole premium tier exists to
 *    sell. It is `primary`.
 * 2. **The lock scrim stops inverting.** `bg-neutral-900` over a face, with
 *    `text-neutral-50` on it: the web ramp *mirrors* under `[data-theme="dark"]`,
 *    so in a dark theme the scrim resolved to the near-white step and the
 *    padlock on it vanished — the gate looked broken exactly when it mattered.
 *    `PHOTO_SCRIM_STRONG` and `PHOTO_INK` are fixed in both schemes.
 * 3. **A gate with no way through it is disabled.** `locked` without `onUnlock`
 *    left every tile a focusable `<button>` that did nothing: a keyboard user
 *    tabbed through twelve controls, activated them, and got no response and no
 *    explanation. Those tiles are `disabled`, and the rail itself becomes the
 *    tab stop so the strip is still reachable and scrollable.
 * 4. **The heading is a heading and the strip is a list**, so a reader hears
 *    "3 of 12" rather than twelve unanchored buttons.
 * 5. **Empty and loading are real.** Empty was a lone line of `muted` inside a
 *    dashed box; the skeleton was `bg-neutral-200`, a ramp step that is a
 *    near-white slab on a dark page.
 */
exports.WhoLikedYouRowV4 = React.forwardRef(function WhoLikedYouRowV4({ likers, total, locked = true, title = 'Liked you', onClickLiker, onUnlock, loading = false, emptyLabel = 'No likes yet — keep swiping!', formatCount, lockedLabel = 'Locked', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const list = likers ?? [];
    const count = total ?? list.length;
    const countText = (formatCount ?? ((n) => String(n)))(count);
    // Locked with nowhere to go: the tiles cannot respond, so they must not
    // claim they can — and something has to stay reachable, so the rail does.
    const gated = locked && onUnlock == null;
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "mb-sm flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-bold text-on-surface", children: title }), count > 0 ? (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "solid", count: count }) : null] }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-busy": "true", "aria-label": title, className: "flex gap-sm", children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block overflow-hidden rounded-full', SKELETON_FACE_CLASS), children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full w-full', profile_v4_1.PLACEHOLDER_CLASS) }) }, i))) })] }));
    }
    if (count === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [header, (0, jsx_runtime_1.jsx)("ul", { 
                // A scroll container whose every child is disabled is unreachable
                // without this; when the tiles are live they are the stops.
                tabIndex: gated ? 0 : undefined, "aria-label": gated ? (0, profile_v4_1.spokenLine)([title, countText]) : undefined, className: (0, cn_1.cn)('flex list-none gap-sm overflow-x-auto pb-xs', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: list.map((liker, i) => {
                    const label = locked
                        ? lockedLabel
                        : (0, profile_v4_1.spokenLine)([liker.name ?? 'Someone', liker.superLiked ? 'super liked you' : null]);
                    return ((0, jsx_runtime_1.jsx)("li", { className: (0, cn_1.cn)('shrink-0', TILE_CLASS), children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, disabled: gated, onClick: () => (locked ? onUnlock?.() : onClickLiker?.(liker.id)), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-md)] py-xs', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: locked ? undefined : liker.photoUri, name: locked ? undefined : liker.name, alt: "", size: "lg", ring: liker.superLiked }), locked ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { backgroundColor: profile_v4_1.PHOTO_SCRIM_STRONG, color: profile_v4_1.PHOTO_INK }, className: "absolute inset-0 flex items-center justify-center rounded-full text-lg", children: "\uD83D\uDD12" })) : null] }), !locked ? ((0, jsx_runtime_1.jsx)("span", { className: "w-full truncate px-xs text-xs text-muted-text", children: liker.name ?? 'Someone' })) : null] }) }, liker.id));
                }) }), locked && onUnlock ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => onUnlock(), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))', 'var(--xen-primary)'), className: (0, cn_1.cn)('mt-sm w-full rounded-full py-sm text-sm font-bold', 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] text-primary-text', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: ["See all ", countText, " likes"] })) : null] }));
});
//# sourceMappingURL=WhoLikedYouRowV4.js.map