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
exports.MarqueeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const inject_1 = require("./internal/inject");
/**
 * The keyframes and the two rules that cannot be expressed inline: `:hover`,
 * and the reduced-motion stop. No colors — transforms only.
 *
 * `animation-timing-function: linear` is **not** an oversight and must not be
 * "corrected" onto `EASE_STANDARD`. See the playback note in the doc comment
 * below: an eased loop visibly restarts at the seam.
 */
const MARQUEE_V4_CSS = `
@keyframes xen-marquee-v4 {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
[data-xen-marquee-v4] { overflow: hidden; }
[data-xen-marquee-v4-track] {
  display: flex;
  width: max-content;
  align-items: center;
  gap: var(--xen-marquee-v4-gap, var(--xen-space-lg));
  animation-name: xen-marquee-v4;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
[data-xen-marquee-v4-row] {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--xen-marquee-v4-gap, var(--xen-space-lg));
}
[data-xen-marquee-v4][data-pause-on-hover="true"]:hover [data-xen-marquee-v4-track] {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-marquee-v4-track] { animation: none !important; }
}
`;
/**
 * The duration used until the track has been measured. It is only ever on
 * screen for the frame between mount and the first layout effect, and it is
 * a *duration*, not a design decision — the real number is content ÷ speed.
 */
const FALLBACK_DURATION_S = 24;
/**
 * `Marquee`, V4 — the same loop, with the two twin gaps closed and the reason
 * its numbers are off the motion scale written down.
 *
 * ## Why this component does not take `V4_MOTION`
 *
 * The brief (§2) draws the line the rest of this pass depends on: **the M3
 * scale governs a *transition* — a thing moving from one state to another. It
 * does not govern *playback* — content that runs for as long as the content
 * takes.** `RevealV4` and `TiltCardV4` are transitions and take the scale,
 * duration and easing, no exceptions. A marquee is playback:
 *
 *   - **The duration stays derived** (`contentWidth / speed`). A row of four
 *     logos and a row of forty are not the same event, and a 400ms marquee is
 *     not a marquee. The caller sets a *speed*, in px/s, which is the property
 *     a reader actually perceives; the duration falls out of it.
 *   - **The easing stays `linear`.** This is the one that gets "fixed" by
 *     mistake, so: an infinite loop that eases decelerates into its seam and
 *     accelerates out of it, which makes the seam visible — the loop reads as
 *     stopping and restarting several times a minute instead of running. Every
 *     easing on the scale starts or ends at zero velocity; none of them can be
 *     used here. `linear` is the correct curve for playback, not a placeholder.
 *
 * Both literals carry that reasoning at their definition, per §3.1.
 *
 * ## Reduced motion stops it rather than fading it
 *
 * The house rule (§3.3, `design.md` §36.10) is that reduced motion replaces a
 * large spatial move with a fade instead of removing it, because an element
 * that appears with no transition reads as a glitch. **A marquee is the
 * documented exception**, for two reasons:
 *
 *   1. A fade is a substitute for a transition, and a transition has a still
 *      frame at each end to fade between. A loop has neither end. There is
 *      nothing to fade *to*.
 *   2. Continuous, unstoppable, auto-advancing motion is not incidental to
 *      this component — it is the entire component, and it is precisely what
 *      `prefers-reduced-motion` and WCAG 2.2.2 (Pause, Stop, Hide) are asking
 *      about. Stopping is the correct answer, not a degraded one.
 *
 * So the reduced-motion block sets `animation: none` and the row sits still.
 * That is a deliberate divergence from the house rule; `RevealV4` fades.
 *
 * ## The gap this closes against the native twin
 *
 * The content is rendered twice so the track can translate by exactly one copy
 * and land back where it started. That means every string in a marquee is in
 * the accessibility tree twice — so the second copy is `aria-hidden`, and a
 * screen reader hears the content once. **The native `Marquee` renders the
 * same two copies and hides neither**, which is the same defect without the
 * fix; `native/motion/MarqueeV4.tsx` corrects it with
 * `accessibilityElementsHidden` / `importantForAccessibility`.
 *
 * `pauseOnHover` has no touch analogue at all — there is no hover on a phone —
 * so the native twin takes `pauseOnPress` instead. That is the one place the
 * two twins deliberately disagree on a prop *name*; both default to `true`,
 * and every other prop and default matches (§3.4).
 */
exports.MarqueeV4 = React.forwardRef(function MarqueeV4({ speed = 40, gap, pauseOnHover = true, className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-marquee-v4-styles', MARQUEE_V4_CSS);
    const trackRef = React.useRef(null);
    const [durationS, setDurationS] = React.useState(FALLBACK_DURATION_S);
    React.useEffect(() => {
        const track = trackRef.current;
        if (track === null)
            return;
        // The track holds both copies, so one copy is half its scroll width.
        const contentWidth = track.scrollWidth / 2;
        if (contentWidth > 0 && speed > 0) {
            setDurationS(contentWidth / speed);
        }
    }, [speed, gap, children]);
    // Unset means "the theme's `lg`", which the sheet's `var()` fallback supplies
    // — the same default the native twin reads off `tokens.spacing.lg`.
    const rootStyle = {
        ...(gap === undefined ? null : { '--xen-marquee-v4-gap': `${gap}px` }),
        ...style,
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-marquee-v4": "", "data-pause-on-hover": pauseOnHover ? 'true' : 'false', className: (0, cn_1.cn)('overflow-hidden', className), style: rootStyle, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { ref: trackRef, "data-xen-marquee-v4-track": "", 
            // Playback, not a transition: derived from content ÷ speed (§2).
            style: { animationDuration: `${durationS}s` }, children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-marquee-v4-row": "", children: children }), (0, jsx_runtime_1.jsx)("div", { "data-xen-marquee-v4-row": "", "aria-hidden": "true", children: children })] }) }));
});
//# sourceMappingURL=MarqueeV4.js.map