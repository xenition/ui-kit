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
exports.ParallaxV4 = exports.PARALLAX_MAX_SPEED = void 0;
exports.clampParallaxSpeed = clampParallaxSpeed;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("./internal/reduced-motion");
/**
 * The clamp, kept from the base with its reason intact.
 *
 * At `|speed| > 0.5` the layer moves more than half as far as the page does,
 * and the eye stops reading it as *depth* and starts reading it as *detached* —
 * the content visibly slides out of the section it belongs to, and on a long
 * page it can leave its container entirely. Half the page's travel is the point
 * where "behind the page" turns into "not on the page".
 */
exports.PARALLAX_MAX_SPEED = 0.5;
/** `speed`, clamped to ±{@link PARALLAX_MAX_SPEED}. */
function clampParallaxSpeed(speed) {
    return Math.max(-exports.PARALLAX_MAX_SPEED, Math.min(exports.PARALLAX_MAX_SPEED, speed));
}
/**
 * The custom property the scroll handler writes. The transform is declared once
 * in the inline style and only this number changes, so a caller-supplied
 * `style.transform` is not silently overwritten sixty times a second — see
 * "What this fixes" below.
 */
const OFFSET_VAR = '--xen-parallax-v4-y';
/**
 * `Parallax`, V4 — scroll-linked depth, and the one component in this module
 * that takes nothing at all from the motion scale.
 *
 * ## Why there is no duration and no easing here
 *
 * Brief §2 splits the module into *transitions* (which take `V4_MOTION`
 * outright) and *playback* (which derives its own duration and says why).
 * Parallax is **neither**. It is a continuous mapping from scroll position to
 * offset — the user's finger is the clock. There is no duration to pick, and
 * an easing would be a lie: the curve is whatever the reader's scroll does.
 *
 * This is worth stating because the absence looks like an omission. A future
 * pass adding a `transition: transform 200ms` here would not be tightening the
 * component onto the scale; it would be adding 200ms of lag between the scroll
 * and the layer, which is the exact defect `design.md` §36.4 names — a
 * direct-manipulation gesture must track the input, not replay an animation
 * about it.
 *
 * ## Why reduced motion removes it rather than fading it
 *
 * §3.3 says reduced motion replaces a large spatial move with a fade instead of
 * removing it. That rule is about *transitions*, and it exists because an
 * element that pops into place with no transition reads as a glitch. Parallax
 * has no transition to replace and no arrival to soften: switching the mapping
 * off leaves the layer exactly where the page's own layout put it, which is a
 * correct, complete, un-glitchy frame. Scroll-linked movement is also squarely
 * what the setting is for.
 *
 * So, like `MarqueeV4` and for a different reason, this is one of the two
 * places in the module where reduced motion legitimately means *off*. Under the
 * setting no listener is attached at all — not a listener that computes zero.
 *
 * ## What this fixes over the base
 *
 *   - **The clamp is a named constant with its reason** ({@link
 *     PARALLAX_MAX_SPEED}) instead of two bare `0.5`s inside a `Math.min`.
 *   - **A caller's `transform` survives.** The base wrote
 *     `el.style.transform = 'translate3d(…)'` on every frame, so any transform
 *     the caller passed in `style` was live until the first scroll event and
 *     gone after it. V4 declares the transform once and animates a custom
 *     property inside it; `style` is spread last, so a caller who genuinely
 *     wants to override the transform still can, deliberately, and one who does
 *     not is no longer surprised.
 *   - **Resize is handled.** The offset is a function of viewport height, so a
 *     rotation or a window resize changes it with no scroll event to notice.
 *     The base only listened to `scroll` and drifted until the next one.
 *   - **`will-change` is scoped to the active case**, so a reduced-motion or
 *     server-rendered page does not pay for a compositing layer it never uses.
 *
 * ## SSR
 *
 * Dependency-free and server-safe: the effect is the only thing that touches
 * `window`, so the server renders the layer at its natural position with the
 * custom property unset (`var(…, 0px)` supplies the fallback), and the first
 * client frame is identical.
 *
 * ## The native twin
 *
 * There now is one — `native/motion/ParallaxV4.tsx`, which the native barrel
 * previously declared impossible. Same `speed` prop, same `0.2` default, same
 * clamp; it takes the scroll offset as an `Animated.Value` because on native
 * the caller owns the `ScrollView`.
 */
exports.ParallaxV4 = React.forwardRef(function ParallaxV4({ speed = 0.2, style, children, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    React.useEffect(() => {
        // Reduced motion attaches nothing at all, rather than attaching a listener
        // that computes zero.
        if (reduced || typeof window === 'undefined')
            return undefined;
        const el = localRef.current;
        if (el === null)
            return undefined;
        const factor = clampParallaxSpeed(speed);
        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            /*
             * The measurement has to be UNDONE before it is used again.
             *
             * `getBoundingClientRect()` reports the element where it is painted —
             * which already includes the translate this function wrote on the
             * previous frame. Feeding that straight back in makes the mapping
             * recursive: `next = (centre − rect − previous) × f`, which converges on
             * `f / (1 + f)` rather than `f`. Measured on a real page: a layer asked
             * for `speed 0.2` settled at 0.167 and one asked for `-0.2` at -0.25 —
             * and because it converges over several scroll events rather than in
             * one, a jump-scroll left a layer visibly off its mark (+180px on a
             * layer that should have been near zero) until enough events arrived.
             *
             * The ±0.5 clamp is what kept this convergent instead of divergent,
             * which is why it never looked broken enough to notice — at `speed 1`
             * the same feedback would oscillate.
             *
             * So the current offset is subtracted back out to recover the layer's
             * untransformed position, and the new offset is computed from that.
             */
            const applied = Number.parseFloat(el.style.getPropertyValue(OFFSET_VAR)) || 0;
            const restingCenter = rect.top - applied + rect.height / 2;
            // Zero when the layer is centred in the viewport, so the design's
            // resting position is the one the layout describes.
            const offset = (viewportCenter - restingCenter) * factor;
            el.style.setProperty(OFFSET_VAR, `${offset.toFixed(2)}px`);
        };
        const schedule = () => {
            if (frame === 0)
                frame = window.requestAnimationFrame(update);
        };
        window.addEventListener('scroll', schedule, { passive: true });
        // The offset depends on viewport height, which changes with no scroll event.
        window.addEventListener('resize', schedule, { passive: true });
        schedule();
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (frame !== 0)
                window.cancelAnimationFrame(frame);
            el.style.removeProperty(OFFSET_VAR);
        };
    }, [speed, reduced]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-parallax-v4": "", style: {
            // Declared once; only the custom property moves. `style` is spread
            // after, so an explicit caller transform still wins.
            transform: reduced ? undefined : `translate3d(0, var(${OFFSET_VAR}, 0px), 0)`,
            willChange: reduced ? undefined : 'transform',
            ...style,
        }, ...rest, children: children }));
});
//# sourceMappingURL=ParallaxV4.js.map