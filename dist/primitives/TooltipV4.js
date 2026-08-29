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
exports.TooltipV4 = TooltipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
/** Placement, in token gaps rather than a fixed 4px. */
const SIDE = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-xs',
    left: 'right-full top-1/2 -translate-y-1/2 mr-xs',
    right: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};
/**
 * **V4 tooltip** — the web twin of the native `TooltipV4`, same props as
 * {@link Tooltip}, a different design line.
 *
 * ## Why the bubble inverts, and why it stopped using the ramp
 *
 * A tip is the one floating thing in the kit that inverts, and that is how a
 * reader recognises "this is an annotation, not a surface" before reading a
 * word (§31 — prefer the established pattern). The base built the inversion
 * from `bg-neutral-900` / `text-neutral-50`, which reads correctly only because
 * the dark block re-emits the ramps mirrored: a pair by luck, not by promise.
 * V4 uses `on-surface` / `surface`, which the compiler guarantees against each
 * other in both schemes, so the inversion carries its own contrast.
 *
 * It takes `--xen-elevation-card`, the smallest of the three, because a tip has
 * barely left the page — §36.8, feedback proportional to the event. The base
 * had Tailwind's `shadow`, which cannot know a dark page needs more of it.
 *
 * At `depth: 'glass'` it joins the glass family instead: an inverted bubble
 * behind a blur is neither legible nor translucent. That is the one place this
 * component reads `depth`, and a necessary one — the compiler neutralises
 * gradients and elevation and stops there, so glass has to be asked for while
 * elevation falls flat on its own.
 *
 * ## The wrapper stays, and that is not an oversight
 *
 * `MenuV4` and `PopoverV4` had to stop wrapping their trigger and clone it
 * instead: on native a `<Button>` trigger takes the touch responder from any
 * wrapper, and on web a wrapping `<span onClick>` made a trigger's `disabled` a
 * lie. Neither applies here. This span listens for mouse-enter/leave and
 * focus/blur, none of which a nested control intercepts and none of which
 * activate anything, so there is no handler to hand the child and nothing for
 * the child's `disabled` to have an opinion about. The child stays exactly as
 * passed. The native twin has no hover to lean on, so it injects an
 * `onLongPress` — the same rule in each platform's vocabulary.
 */
function TooltipV4({ label, side = 'top', children, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const [open, setOpen] = React.useState(false);
    const glassy = (0, surface_v4_1.useDepth)() === 'glass';
    return ((0, jsx_runtime_1.jsxs)("span", { className: "relative inline-flex", onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), onFocus: () => setOpen(true), onBlur: () => setOpen(false), children: [children, open && ((0, jsx_runtime_1.jsx)("span", { role: "tooltip", "data-xen-v4-nav-tip": glassy ? 'glass' : '', className: (0, cn_1.cn)('pointer-events-none absolute z-50 whitespace-nowrap font-body text-sm', 'rounded-[var(--xen-radius-sm)] px-sm py-xs', SIDE[side], className), children: label }))] }));
}
//# sourceMappingURL=TooltipV4.js.map