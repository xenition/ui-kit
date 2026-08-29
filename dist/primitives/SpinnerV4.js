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
exports.SpinnerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
/**
 * How much of the brand the ring's track carries.
 *
 * The track is not grey. A spinner is one object, and a grey ring with a
 * coloured notch reads as two — the eye separates them before it reads the
 * rotation. Compositing a fifth of `primary` into `surface` keeps the whole
 * ring in one hue family, so what moves is a bright arc around a quiet one
 * rather than a chip orbiting a hoop.
 */
const TRACK_MIX = 0.2;
/**
 * The ring lives in a sheet rather than in utility classes because
 * `border-top-color`, a keyframe and the reduced-motion switch cannot be
 * expressed as classes bound to a token. Every colour is still a `--xen-*`.
 */
const SPINNER_V4_CSS = `
@keyframes xen-v4-spin { to { transform: rotate(360deg); } }
[data-xen-v4-spinner] {
  box-sizing: border-box;
  display: inline-block;
  border-radius: 9999px;
  border-style: solid;
  border-color: ${(0, feedback_v4_1.mixCss)('primary', 'surface', TRACK_MIX)};
  border-top-color: var(--xen-primary);
  animation: xen-v4-spin ${feedback_v4_1.BUSY_MOTION.spin}ms linear infinite;
}
/*
  §36.10. Stopped, it is still a spinner: a ring brighter on one side is
  legible as "working" without moving. The information survives the loss of the
  animation, which is the whole point of the rule.
*/
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-spinner] { animation: none; }
}
`;
/** Diameter from the spacing scale — the base's 16 / 24 / 32, now as tokens. */
const SIZE = {
    sm: 'h-[var(--xen-space-md)] w-[var(--xen-space-md)] border-2',
    md: 'h-[var(--xen-space-lg)] w-[var(--xen-space-lg)] border-2',
    lg: 'h-[var(--xen-space-xl)] w-[var(--xen-space-xl)] border-[3px]',
};
/**
 * **V4 spinner** — the web twin of the native `SpinnerV4`, same props as
 * {@link Spinner}, a different design line.
 *
 * ## What the motion is allowed to say
 *
 * §36.7: loading feedback exists to reduce uncertainty, and it must not
 * fabricate precision. A spinner is what you use when the wait is short and
 * **unknown**, so this one is honestly shapeless — one continuous revolution,
 * no start, no end, no percentage. It never becomes a bar, never fills, never
 * accelerates toward a finish it cannot see. The moment a component knows the
 * fraction, the right component is `ProgressV4`.
 *
 * Linear easing, for the same reason: a revolution has no beginning to ease
 * out of, and easing one would imply a rhythm the wait does not have (§36.3).
 *
 * ## The ring is one object
 *
 * The base painted `border-neutral-300` with a `border-t-primary` notch — a
 * grey hoop with a coloured chip on it, which the eye separates into two things
 * before it reads the rotation at all. V4 mixes a fifth of `primary` into
 * `surface` for the track, so the whole ring is one hue family and what moves
 * is a bright arc around a quiet one.
 *
 * `border-neutral-300` was also a ramp step, and the ramps carry the LIGHT
 * orientation in both schemes — so the base's track was a pale hoop on a dark
 * page. `color-mix` over two scheme-aware tokens follows the scheme instead.
 */
exports.SpinnerV4 = React.forwardRef(function SpinnerV4({ className, size = 'md', ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-spinner-styles', SPINNER_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "data-xen-v4-spinner": size, role: "status", "aria-label": "Loading", className: (0, cn_1.cn)(SIZE[size], className), ...rest }));
});
//# sourceMappingURL=SpinnerV4.js.map