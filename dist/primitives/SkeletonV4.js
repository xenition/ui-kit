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
exports.SkeletonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
/**
 * The two ends of the breath, both composited into `surface`.
 *
 * A placeholder has to sit clearly below real content in the hierarchy while
 * still reading as "something will be here". Eight and sixteen percent of
 * `on-surface` is the band that does that in both schemes — dark enough on a
 * light page to look like a filled shape, light enough on a dark one not to
 * look like a mistake.
 */
const REST = 0.08;
const PEAK = 0.16;
/**
 * The breath is an overlay fading in and out, not the block's own opacity —
 * see the component docstring. Both colours are `color-mix` over tokens, so the
 * placeholder follows the scheme without a `[data-theme]` rule of its own.
 */
const SKELETON_V4_CSS = `
@keyframes xen-v4-skeleton-breathe { from { opacity: 0; } to { opacity: 1; } }
[data-xen-v4-skeleton] {
  position: relative;
  overflow: hidden;
  background-color: ${(0, feedback_v4_1.mixCss)('onSurface', 'surface', REST)};
}
[data-xen-v4-skeleton]::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: ${(0, feedback_v4_1.mixCss)('onSurface', 'surface', PEAK)};
  animation: xen-v4-skeleton-breathe ${feedback_v4_1.BUSY_MOTION.pulse}ms ease-in-out infinite alternate;
}
/*
  §36.10. The fade stops and the block rests at its brighter end — still
  obviously a placeholder, just a still one.
*/
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-skeleton]::after { animation: none; opacity: 1; }
}
`;
/**
 * **V4 skeleton** — the web twin of the native `SkeletonV4`, same props as
 * {@link Skeleton}, a different design line.
 *
 * ## The animation is not allowed to claim progress
 *
 * `design.md` §36.7 says loading feedback exists to reduce uncertainty and must
 * not fabricate precision. The usual skeleton treatment — a highlight sweeping
 * left to right — fails that quietly: a sweep *travels*, and travel across a
 * placeholder reads as loading moving through the content, which is a claim
 * about a request whose state the skeleton cannot see. V4 deliberately does not
 * add one. What it has is a symmetric fade, which says only "not yet", and that
 * is the entire truth available to this component.
 *
 * ## The block is opaque, at both ends of the breath
 *
 * The base used Tailwind's `animate-pulse`, which animates the element's own
 * `opacity` down to 0.5. That makes the placeholder *translucent* for most of
 * every cycle: on a plain page it looks right, and on a filled card or a glass
 * panel it turns into a window showing whatever is behind it.
 *
 * V4 fades one opaque colour over another instead — an `::after` at 16%
 * crossing a block at 8%, both `color-mix`ed into `surface`. The visible colour
 * is always between two real theme colours, so the skeleton looks the same
 * wherever it lands.
 *
 * `bg-neutral-200` was the wrong token for a second reason: a ramp step is not
 * a semantic, so it says nothing about the relationship between a placeholder
 * and the text it replaces. `on-surface` at 8% does — it is that text, faded.
 *
 * ## Matching the layout
 *
 * §36.7 asks for a skeleton "when it matches actual layout", so the text line
 * takes its height from `--xen-text-sm` — the size of the line it is standing
 * in for — rather than from `h-3.5`, which was that size by coincidence.
 *
 * The whole tree is `aria-hidden`. A screen reader should hear the region's own
 * busy state, never a list of empty boxes.
 */
exports.SkeletonV4 = React.forwardRef(function SkeletonV4({ className, variant = 'text', width, height, lines = 1, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-skeleton-styles', SKELETON_V4_CSS);
    const shape = variant === 'circle'
        ? 'rounded-[var(--xen-radius-full)]'
        : variant === 'rect'
            ? 'rounded-[var(--xen-radius-md)]'
            : 'rounded-[var(--xen-radius-sm)]';
    // The height of the line this block stands in for, not `h-3.5`.
    const line = 'h-[var(--xen-text-sm)]';
    const block = 'h-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))]';
    if (variant === 'text' && lines > 1) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-hidden": "true", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), style: style, ...rest, children: Array.from({ length: lines }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-skeleton": "", className: (0, cn_1.cn)(shape, line), style: { width: i === lines - 1 ? '60%' : '100%' } }, i))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-skeleton": "", "aria-hidden": "true", className: (0, cn_1.cn)(shape, variant === 'text' ? line : block, className), style: { width, height, ...style }, ...rest }));
});
//# sourceMappingURL=SkeletonV4.js.map