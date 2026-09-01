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
exports.RevealV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Stagger_1 = require("./Stagger");
const reduced_motion_1 = require("./internal/reduced-motion");
const use_in_view_1 = require("./internal/use-in-view");
const v4_motion_1 = require("../primitives/internal/v4-motion");
/**
 * The zoom's start scale and the blur's start radius.
 *
 * Brief §3 rule 2 exempts exactly these two: a scale factor is a ratio, not a
 * distance, and a blur radius is an optical amount — neither has a cell on the
 * spacing scale to come from. Everything that *is* a distance below is
 * `var(--xen-space-*)`, which is the same `SPACING` object the native twin
 * reads as `tokens.spacing`, so the two twins travel the same number of pixels.
 */
const ZOOM_FROM_SCALE = 0.92;
const BLUR_FROM_PX = 8;
/**
 * Where each effect starts, in spacing-scale units.
 *
 * The base typed `24px`, `32px` and `-32px` into this table. They are now
 * `lg` and `xl` off the scale, spelled as the CSS custom properties the web
 * layer already uses everywhere else (`p-[var(--xen-space-lg)]` and friends) —
 * the compile-time `SPACING` object is not exported, and a `24` copied out of
 * it would be the same literal with a nicer comment.
 */
const HIDDEN_STYLES = {
    'fade-up': { transform: 'translate3d(0, var(--xen-space-lg), 0)' },
    fade: {},
    'slide-left': { transform: 'translate3d(calc(-1 * var(--xen-space-xl)), 0, 0)' },
    'slide-right': { transform: 'translate3d(var(--xen-space-xl), 0, 0)' },
    zoom: { transform: `scale(${ZOOM_FROM_SCALE})` },
    'blur-in': { filter: `blur(${BLUR_FROM_PX}px)` },
};
/** Reduced motion travels no distance at all — it only fades. */
const REDUCED_HIDDEN = {};
/**
 * **V4 reveal** — same props as {@link Reveal}, on the kit's motion scale.
 *
 * Three things the base got wrong, in the order they matter.
 *
 * 1. **The two twins disagreed about how long an entrance takes.** Web ran
 *    `600ms`, native ran `500ms`, and neither file admitted the other existed
 *    (brief §1 — "the loud one"). A reveal is *something arriving*, which the
 *    scale already has a name for: `V4_MOTION.enter` (400ms) with
 *    {@link EASE_ENTER}, M3's emphasized-decelerate. Both twins default to that
 *    number now, so a marketing page and its app screen animate alike.
 * 2. **The distances were five literals.** `24px` up, `32px` sideways: real
 *    measurements typed into a motion file rather than taken from the spacing
 *    scale (brief §3 rule 2). They are `lg` and `xl` now, and the native twin
 *    reads the same two cells.
 * 3. **Reduced motion removed the transition instead of replacing it.** The
 *    base rendered instantly with no inline motion styles at all — which
 *    `design.md` §36.10 and brief §3 rule 3 both call out as *worse* than the
 *    animation: an element that pops into existence with no transition reads as
 *    a glitch, not as calm. V4 keeps the transition and drops the travel: a
 *    pure opacity fade at `V4_MOTION.standard` (200ms) with
 *    {@link EASE_STANDARD}, because a fade starts and ends in place.
 *
 * A consequence of (3) worth stating out loud: **the observer keeps running
 * under reduced motion.** The base disabled it, because with nothing to animate
 * there was nothing to trigger. Here there is. `v4-motion.ts` puts it exactly
 * right — a preference decides *how* a thing moves, not *whether* it happens —
 * so the trigger is unchanged and only the movement is swapped.
 *
 * Everything else is the base, on purpose: `effect`, `once`, `threshold`, the
 * additive `delay`, and the `Stagger` context it reads for a cascade offset.
 * The context is the one from {@link Stagger}, not a V4 copy, so a `RevealV4`
 * cascades correctly inside either `Stagger` or `StaggerV4`.
 *
 * SSR-safe and dependency-free: CSS transitions plus one `IntersectionObserver`
 * (brief §3 rule 6). With no `IntersectionObserver` — server render, an ancient
 * browser — `useInView` reports visible immediately, so content is never hidden
 * forever; there is simply no entrance to see.
 */
exports.RevealV4 = React.forwardRef(function RevealV4({ effect = 'fade-up', delay = 0, duration = v4_motion_1.V4_MOTION.enter, once = true, threshold = 0.15, style, children, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    // Not `disabled: reduced` — see the note on the observer above.
    const visible = (0, use_in_view_1.useInView)(localRef, { threshold, once });
    const staggerConfig = React.useContext(Stagger_1.StaggerConfigContext);
    const staggerIndex = React.useContext(Stagger_1.StaggerIndexContext);
    const totalDelay = delay +
        (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);
    const hidden = reduced ? REDUCED_HIDDEN : HIDDEN_STYLES[effect];
    const activeDuration = reduced ? v4_motion_1.V4_MOTION.standard : duration;
    const activeEasing = reduced ? v4_motion_1.EASE_STANDARD : v4_motion_1.EASE_ENTER;
    const motionStyle = {
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hidden.transform,
        filter: visible ? undefined : hidden.filter,
        transition: (0, v4_motion_1.transitionCss)(['opacity', 'transform', 'filter'], activeDuration, activeEasing),
        transitionDelay: `${totalDelay}ms`,
        willChange: visible ? undefined : 'opacity, transform',
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-v4-reveal": effect, "data-state": visible ? 'visible' : 'hidden', "data-reduced": reduced ? 'true' : 'false', style: { ...motionStyle, ...style }, ...rest, children: children }));
});
//# sourceMappingURL=RevealV4.js.map