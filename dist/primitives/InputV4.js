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
exports.InputV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_motion_1 = require("./internal/v4-motion");
const field_v4_1 = require("./internal/field-v4");
/**
 * The focus ring cannot be a utility class: it is a translucent mix of a token
 * that changes with the field's validity, so it lives here as a `color-mix`
 * over a custom property — the same recipe `GlassPanel` and `Bento` use. Its
 * width is `--xen-space-xs`, so even the ring is on the spacing scale.
 */
const INPUT_V4_CSS = `
[data-xen-v4-input] {
  transition: ${(0, v4_motion_1.transitionCss)(['border-color', 'box-shadow'])};
}
[data-xen-v4-input]:focus {
  outline: none;
  border-color: var(--xen-v4-ring-color, var(--xen-ring));
  box-shadow: 0 0 0 var(--xen-space-xs) color-mix(in srgb, var(--xen-v4-ring-color, var(--xen-ring)) ${field_v4_1.FIELD_HALO_PERCENT}%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-input] { transition: none; }
}
`;
/**
 * **V4 text input** — the web twin of the native `InputV4`, same props as
 * {@link Input} plus an optional `label` and `error`.
 *
 * Three things make it read as a considered control rather than a box:
 *
 * 1. **Height and softness.** A `2xl` minimum height and the `md` radius
 *    instead of `sm`. Both come off the scales, so a `sharp` seed still gets
 *    square corners and nothing is picked here.
 * 2. **A real focus ring.** Focus paints a translucent brand halo around the
 *    field rather than swapping the border colour — the difference between a
 *    control that responds and one that merely changes. It is drawn with
 *    `box-shadow`, so it costs no layout and focusing never nudges the page
 *    (§36.11), and it is dropped to a plain colour change under
 *    `prefers-reduced-motion` (§36.10).
 * 3. **An error state that says something.** `invalid` turns the field and its
 *    ring to `danger`; `error` adds the message underneath and points
 *    `aria-describedby` at it, so a screen reader gets the recovery copy and
 *    not just "invalid".
 *
 * No gradient, no glass, no shadow. A form field is not a hero, and depth on
 * an input is depth spent where §35.11 and §8 say it should not be.
 */
exports.InputV4 = React.forwardRef(function InputV4({ className, containerClassName, invalid = false, error, label, id, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-input-styles', INPUT_V4_CSS);
    const reactId = React.useId();
    const inputId = id ?? `${reactId}-input`;
    const errorId = `${reactId}-error`;
    // An error message IS an invalid state; one variable is how the border and
    // the copy stay in agreement.
    const isInvalid = invalid || error !== undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('grid gap-sm', containerClassName), children: [label !== undefined ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: inputId, className: "text-sm font-medium text-on-surface", children: label })) : null, (0, jsx_runtime_1.jsx)("input", { ref: ref, id: inputId, "data-xen-v4-input": "", "aria-invalid": isInvalid || undefined, "aria-describedby": error !== undefined ? errorId : undefined, className: (0, cn_1.cn)('w-full bg-surface text-on-surface placeholder:text-muted-text', 'min-h-[var(--xen-space-2xl)] px-md py-sm text-base', 'border rounded-[var(--xen-radius-md)]', isInvalid ? 'border-danger' : 'border-border', 'disabled:pointer-events-none disabled:opacity-[0.38]', className), style: {
                    '--xen-v4-ring-color': isInvalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
                    ...style,
                }, ...rest }), error !== undefined ? ((0, jsx_runtime_1.jsx)("p", { id: errorId, role: "alert", className: "text-sm text-danger-text", children: error })) : null] }));
});
//# sourceMappingURL=InputV4.js.map