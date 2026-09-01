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
exports.PhotoCarouselV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const profile_v4_1 = require("./internal/profile-v4");
const RATIO = {
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    landscape: 'aspect-[3/2]',
};
/**
 * **V4 photo carousel** — the web twin of the native `PhotoCarouselV4`, same
 * props as {@link PhotoCarousel} plus `previousLabel`, `nextLabel`,
 * `formatPosition` and `showControls`.
 *
 * ## Four changes
 *
 * 1. **The frame looks steppable.** Both twins rendered two `<button>`s with
 *    **no children** — invisible halves of the photo, with no focus ring on
 *    web. Nothing told a sighted user that tapping the picture did anything,
 *    and a keyboard user tabbed onto a control with no visible location. The
 *    halves are kept, because a thumb-sized tap zone is the right target on a
 *    phone, and each one now carries a visible chevron.
 * 2. **The position is exposed, and re-announced when it moves.** The base
 *    built `Photo 2 of 5` and hung it on a role-less `<div>`, where a reader
 *    ignored it. It names the pager group *and* rides a polite live region, so
 *    stepping a photo says so.
 * 3. **The chevrons and the rail are pinned to the photo, not to the theme.**
 *    The indicator rail was `bg-surface` over `bg-neutral-500` — a themed slot
 *    and a ramp step, both of which invert under `[data-theme="dark"]` while
 *    the photograph underneath does not. They are `PHOTO_INK` on `PHOTO_SCRIM`.
 * 4. **Empty and loading are real.** The empty frame was an emoji over a line
 *    of `muted` (a decorative slot, used as text); loading was an undecorated
 *    `bg-neutral-200` block announced to nobody.
 */
exports.PhotoCarouselV4 = React.forwardRef(function PhotoCarouselV4({ photos, index, onIndexChange, ratio = 'portrait', rounded = true, loading = false, emptyLabel = 'No photos yet', previousLabel = 'Previous photo', nextLabel = 'Next photo', formatPosition, showControls = true, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? index : internal));
    const go = (next) => {
        const clamped = Math.max(0, Math.min(list.length - 1, next));
        if (!controlled)
            setInternal(clamped);
        if (clamped !== active)
            onIndexChange?.(clamped);
    };
    const frame = (0, cn_1.cn)('relative w-full overflow-hidden', RATIO[ratio], rounded ? 'rounded-[var(--xen-radius-lg)]' : 'rounded-none', className);
    /**
     * The ground behind an unloaded photo. It is a child rather than a class on
     * the frame because {@link PLACEHOLDER_CLASS} carries its own radius, and
     * two arbitrary `rounded-[…]` values on one element resolve by stylesheet
     * order — which nothing here controls.
     */
    const ground = (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute inset-0', profile_v4_1.PLACEHOLDER_CLASS) });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-busy": "true", "aria-label": emptyLabel, className: frame, ...rest, children: ground }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(frame, 'flex items-center justify-center bg-surface'), ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCF7" }), title: emptyLabel }) }));
    }
    const current = list[active] ?? list[0];
    const position = (formatPosition ?? ((i, n) => `Photo ${i + 1} of ${n}`))(active, list.length);
    const control = (label, name, target, disabled, align) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, disabled: disabled, onClick: () => go(target), "data-xen-v4-state": "", 
        // The hover veil is white over the photograph — the scrim's own ink —
        // rather than the theme's, which would be dark on a dark page.
        style: (0, v4_state_1.stateGroundVars)('transparent', profile_v4_1.PHOTO_INK), className: (0, cn_1.cn)('flex flex-1 cursor-pointer items-center px-sm', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, align), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", style: { backgroundColor: profile_v4_1.PHOTO_SCRIM, color: profile_v4_1.PHOTO_INK }, className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full', nav_v4_1.MIN_TAP_SQUARE_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: name, size: "xl" }) }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": position, className: frame, ...rest, children: [ground, (0, jsx_runtime_1.jsx)("img", { src: current.uri, alt: current.alt ?? '', className: "relative h-full w-full object-cover" }), showControls ? ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex", children: [control(previousLabel, 'chevron-left', active - 1, active === 0, 'justify-start'), control(nextLabel, 'chevron-right', active + 1, active >= list.length - 1, 'justify-end')] })) : null, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-x-sm top-sm flex gap-xs", children: list.map((photo, i) => ((0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: profile_v4_1.PHOTO_INK, opacity: i <= active ? 1 : 0.4 }, className: "h-xs flex-1 rounded-full" }, `${photo.uri}-${i}`))) }), (0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: position })] }));
});
//# sourceMappingURL=PhotoCarouselV4.js.map