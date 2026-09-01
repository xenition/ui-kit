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
exports.ProgressDotsV4 = exports.PROGRESS_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const compile_1 = require("../theme/compile");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const inject_1 = require("../motion/internal/inject");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * Segment thickness, off the spacing scale rather than pinned.
 *
 * The base used `h-1.5` / `h-2` — right on the default scale and wrong on any
 * other, and a progress bar that stays 6px while every control around it grows
 * is how a header stops looking designed.
 */
const THICKNESS = {
    sm: {
        bar: 'h-[var(--xen-space-xs)]',
        dot: 'h-[var(--xen-space-xs)] w-[var(--xen-space-xs)]',
        wide: 'h-[var(--xen-space-xs)] w-[calc(var(--xen-space-xs)_*_2.5)]',
    },
    md: {
        bar: 'h-[calc(var(--xen-space-xs)_*_1.5)]',
        dot: 'h-[calc(var(--xen-space-xs)_*_1.5)] w-[calc(var(--xen-space-xs)_*_1.5)]',
        wide: 'h-[calc(var(--xen-space-xs)_*_1.5)] w-[calc(var(--xen-space-xs)_*_3.75)]',
    },
};
/** The `<style>` id this indicator's transition shares. Injection is idempotent. */
exports.PROGRESS_V4_STYLE_ID = 'xen-v4-onboarding-progress';
/**
 * The track is an M3 state mix of `on-surface` over `surface`, **not**
 * `--xen-border`.
 *
 * The base filled upcoming segments with the border token — a *divider* colour
 * asked to act as a *fill*. On a dark seed that is a near-invisible rail; on a
 * high-contrast one it is a row of hard black bars competing with the steps
 * that are actually complete.
 */
const PROGRESS_V4_CSS = `
[data-xen-progress-seg] {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-surface)', 'var(--xen-surface)', 'focus')};
}
[data-xen-progress-seg][data-filled] { background-color: var(--flow-fill); }
[data-xen-progress-anim] [data-xen-progress-seg] {
  transition: background-color ${compile_1.MOTION.standard}ms ${chrome_v4_1.EASE_STANDARD};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-progress-anim] [data-xen-progress-seg] { transition: none; }
}
`;
/**
 * **V4 paged-progress indicator** — the web twin of the native
 * `ProgressDotsV4`, same props as {@link ProgressDots} plus `accent` and
 * `animated`.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline** (see {@link PROGRESS_V4_CSS}).
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment transitions in**, on the `standard` duration —
 *    colour only, because a bar that slides implies the *content* slid, and in
 *    a stepped flow it did not.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `aria-valuemin=0 / valuemax=count-1 / valuenow=activeIndex`, so a screen
 *    reader on step one of three announced "0 of 2".
 *
 * A `count` of zero renders an empty row rather than throwing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotClick` is supplied, in which case each step becomes a labelled button.
 */
exports.ProgressDotsV4 = React.forwardRef(function ProgressDotsV4({ count, activeIndex, size = 'md', variant = 'dots', accent = 'primary', animated = true, onDotClick, className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.PROGRESS_V4_STYLE_ID, PROGRESS_V4_CSS);
    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const step = THICKNESS[size];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": Math.max(1, total), "aria-valuenow": Math.min(activeIndex + 1, total), "aria-label": `Step ${Math.min(activeIndex + 1, total)} of ${total}`, "data-xen-progress-anim": animated ? '' : undefined, 
        // The indicator can be dropped anywhere, so it carries its own accent
        // vars rather than assuming a `FlowScreenV4` above it.
        style: { ...(0, flow_v4_1.flowGroundVars)('plain', accent), ...style }, className: (0, cn_1.cn)('flex items-center gap-xs', bars && 'w-full', className), ...rest, children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            // In `'bars'` a step already walked past stays filled — the bar reads
            // as "how far through am I", not "which one is selected".
            const filled = bars ? i <= activeIndex : active;
            const segment = ((0, jsx_runtime_1.jsx)("span", { "data-xen-progress-seg": "", "data-filled": filled ? '' : undefined, className: (0, cn_1.cn)('block rounded-full', bars ? (0, cn_1.cn)('w-full', step.bar) : active ? step.wide : step.dot) }));
            if (!onDotClick) {
                return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(bars && 'min-w-0 flex-1'), children: segment }, i));
            }
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Go to step ${i + 1}`, "aria-current": active || undefined, onClick: () => onDotClick(i), className: (0, cn_1.cn)('flex items-center', bars && 'min-w-0 flex-1'), children: segment }, i));
        }) }));
});
//# sourceMappingURL=ProgressDotsV4.js.map