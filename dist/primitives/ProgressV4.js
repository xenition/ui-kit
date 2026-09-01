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
exports.ProgressV4 = exports.PROGRESS_V4_CSS = exports.PROGRESS_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
const v4_motion_1 = require("./internal/v4-motion");
/** The one `<style>` id this component injects from. Idempotent. */
exports.PROGRESS_V4_STYLE_ID = 'xen-v4-progress-styles';
/**
 * The width ease, sourced from the scale rather than typed.
 *
 * This was `transition-[width] duration-200 motion-reduce:transition-none`.
 * The number was right — its own comment said so, "200ms is M3 `standard`" —
 * but it was a *copy* of the scale's value rather than a reference to it, and
 * a copy is the thing `internal/v4-motion.ts` exists to stop: retune
 * `standard` and this bar silently keeps the old number.
 *
 * It cannot stay a utility class and still read the scale, because a Tailwind
 * class has to be legible to a static scanner and `duration-[${…}ms]` is not.
 * So it becomes a sheet, which is what the rest of the V4 line does with any
 * declaration a class bound to a token cannot express — and which is also how
 * §36.10 is honoured here: the reduced-motion relief is a media block rather
 * than a variant class, so the two live in one place.
 */
exports.PROGRESS_V4_CSS = `
[data-xen-v4-progress] [data-xen-v4-progress-fill] {
  transition: ${(0, v4_motion_1.transitionCss)(['width'])};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-progress] [data-xen-v4-progress-fill] { transition: none; }
}
`;
/**
 * Track and fill per tone. The track is the fill's OWN tone at 10% — one colour
 * at two strengths, rather than a grey channel with a coloured liquid in it.
 */
const TONE = {
    primary: { track: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.info.fill), fill: 'bg-primary' },
    success: { track: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.success.fill), fill: 'bg-success' },
    warn: { track: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.warn.fill), fill: 'bg-warn' },
    danger: { track: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill), fill: 'bg-danger' },
};
/**
 * **V4 progress** — the web twin of the native `ProgressV4`, same props as
 * {@link Progress}, a different design line.
 *
 * ## The bar reports a number, so it may not be decorated
 *
 * A progress bar is the one component in the feedback line that carries a
 * *quantity*, and `design.md` §8's ban on meaningless charts applies to it
 * exactly: anything that makes the length harder to read has cost more than it
 * added.
 *
 * So the fill is **flat**. No gradient across it, at any depth. A bar that
 * fades toward its leading edge has no leading edge — the reader cannot say
 * where "done" stops, which is the only thing the component exists to say. And
 * no shadow: a bar is a mark on the page, not an object above it.
 *
 * ## The track belongs to the bar
 *
 * The base painted `bg-neutral-200` — a ramp step with no relationship to the
 * thing filling it. V4 mixes the fill's own tone into `surface` at 10%, so the
 * track reads as *the same quantity, unfilled*. `color-mix` over two
 * scheme-aware tokens also means the track follows the scheme by construction
 * rather than by the ramp happening to invert the right way.
 *
 * ## What this twin cannot do
 *
 * The native twin runs the fill through `ensureContrast` against the track it
 * painted, so the boundary between done and not-done always clears 3:1 — WCAG's
 * bar for a meaningful graphic. CSS has no equivalent: `color-mix` composites,
 * it does not measure, and the fill here is the raw tone token. For every seed
 * whose tone already separates from its own 10% tint the two twins are
 * identical; for a pale `warn` on a light page the native bar nudges its fill
 * and this one does not. The asymmetry is the same one `BadgeV4` carries, and
 * the native spec is where the threshold is actually proven.
 *
 * ## `warn` is `warn`
 *
 * The native base routed `warn` to `accent` — a brand colour standing in for a
 * semantic one (§35.4), and a silent disagreement with this twin. Both now read
 * the same slot table.
 *
 * ## A started task must look started
 *
 * At 1% of a 200px bar the fill rounds to two pixels and, with a radius on both
 * ends, to nothing at all — the bar reports "nothing has happened" about a task
 * that has begun. So a non-zero value paints at least the bar's own thickness.
 * It is a floor, not a scale: capped at the thickness it can never be mistaken
 * for meaningful width, and at zero the fill is genuinely zero.
 *
 * ## Motion
 *
 * The width eases at the scale's `standard` so a jump reads as movement rather
 * than as a repaint (§36.6, animate state changes). Under
 * `prefers-reduced-motion` it snaps — the number is in the DOM either way, so
 * nothing is lost (§36.10). Both live in {@link PROGRESS_V4_CSS}.
 */
exports.ProgressV4 = React.forwardRef(function ProgressV4({ className, value, max = 100, tone = 'primary', size = 'md', ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.PROGRESS_V4_STYLE_ID, exports.PROGRESS_V4_CSS);
    const t = TONE[tone];
    const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
    // Thickness from the spacing scale, so a denser theme gets a finer bar.
    const thickness = size === 'sm' ? 'var(--xen-space-xs)' : 'var(--xen-space-sm)';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-progress": tone, role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: (0, cn_1.cn)(
        // `radius-full` is 9999 on a rounded or pill brand and 0 on a sharp
        // one, so a sharp seed gets square ends instead of the capsule §8
        // lists among the tells of generic AI UI. No branch — the token knows.
        'w-full overflow-hidden rounded-[var(--xen-radius-full)]', `h-[${thickness}]`, `bg-[${t.track}]`, className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-progress-fill": "", 
            // The width ease and its reduced-motion relief are `PROGRESS_V4_CSS`,
            // so the duration is the scale's `standard` rather than a copy of it.
            className: (0, cn_1.cn)('h-full rounded-[var(--xen-radius-full)]', t.fill), 
            // A floor, not a scale — see the docstring.
            style: { width: `${pct}%`, minWidth: pct > 0 ? thickness : 0 } }) }));
});
//# sourceMappingURL=ProgressV4.js.map