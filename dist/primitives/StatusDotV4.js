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
exports.StatusDotV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
const v4_motion_1 = require("./internal/v4-motion");
/**
 * Tone → the **text** form of its slot.
 *
 * A status dot is a mark you have to be able to see, and the plain slots are
 * FILL colours: the compiler guarantees `on-warn` against `warn` and promises
 * nothing at all about `warn` against `surface`. A pale amber dot at eight
 * pixels on a white page is a dot nobody can find. The `*-text` forms are those
 * same hues walked until they clear AA on `surface`, and identical wherever the
 * plain slot already did.
 */
const MARK = {
    success: (0, feedback_v4_1.toneVar)('successText'),
    warn: (0, feedback_v4_1.toneVar)('warnText'),
    danger: (0, feedback_v4_1.toneVar)('dangerText'),
    primary: (0, feedback_v4_1.toneVar)('primaryText'),
    accent: (0, feedback_v4_1.toneVar)('accentText'),
};
const TONES = Object.keys(MARK);
/** One full echo. Slow enough to read as a heartbeat rather than a blink. */
const ECHO_MS = 2000;
/**
 * Size comes from `--xen-space-sm` — the 0.5rem the base hard-coded, now
 * following the theme's density. Colour is a custom property per tone, so the
 * dot follows the scheme with no `[data-theme]` rule of its own.
 */
const STATUS_DOT_V4_CSS = `
@keyframes xen-v4-status-echo {
  0% { transform: scale(1); opacity: 0.75; }
  70% { transform: scale(2.4); opacity: 0; }
  100% { transform: scale(2.4); opacity: 0; }
}
[data-xen-v4-status-dot] {
  position: relative;
  display: inline-flex;
  width: var(--xen-space-sm);
  height: var(--xen-space-sm);
}
[data-xen-v4-status-dot] [data-xen-v4-status-fill],
[data-xen-v4-status-dot] [data-xen-v4-status-echo] {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
}
[data-xen-v4-status-dot] [data-xen-v4-status-echo] {
  animation: xen-v4-status-echo ${ECHO_MS}ms ${v4_motion_1.EASE_EXIT} infinite;
}
${TONES.map((tone) => `[data-xen-v4-status-dot="${tone}"] [data-xen-v4-status-fill], [data-xen-v4-status-dot="${tone}"] [data-xen-v4-status-echo] { background-color: ${MARK[tone]}; }`).join('\n')}
/*
  §36.10. The solid dot still carries the state, so nothing is lost but the
  movement.
*/
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-status-dot] [data-xen-v4-status-echo] { animation: none; opacity: 0; }
}
`;
/**
 * **V4 status dot** — the web twin of the native `StatusDotV4`, same props as
 * {@link StatusDot}, a different design line.
 *
 * ## A mark this small has to be legible
 *
 * The base painted `var(--xen-{tone})` — the raw fill slot. That is the correct
 * colour to put text ON and the wrong colour to draw an eight-pixel mark IN:
 * `warn` on a light page measures barely above the background for many seeds,
 * and the "live" indicator quietly disappears. V4 takes the compiler's
 * contrast-safe `*-text` form of the same hue.
 *
 * `design.md` §35.4 is what makes this a correctness issue rather than a taste
 * one: the dot's colour *is* its meaning. A green dot that cannot be
 * distinguished from an amber one at a glance has not said anything.
 *
 * ## The echo says "live", so it is allowed to loop
 *
 * §36.1 asks motion to be functional and §36.13 warns that a permanent
 * animation is a permanent cost. This one earns it narrowly: an expanding echo
 * is how a dot says *now*, and a static dot only says *is*. It stays cheap —
 * scale and opacity, both compositor properties — it can be switched off per
 * instance with `pulse={false}`, and `prefers-reduced-motion` removes it
 * everywhere.
 */
exports.StatusDotV4 = React.forwardRef(function StatusDotV4({ tone = 'success', pulse = true, label, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-status-dot-styles', STATUS_DOT_V4_CSS);
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-v4-status-dot": tone, className: (0, cn_1.cn)(className), ...(label !== undefined
            ? { role: 'img', 'aria-label': label }
            : { 'aria-hidden': 'true' }), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-v4-status-fill": "" }), pulse ? (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-status-echo": "" }) : null] }));
});
//# sourceMappingURL=StatusDotV4.js.map