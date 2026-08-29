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
exports.TextareaV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
/**
 * **V4 multi-line field** — the same props as {@link Textarea}, a different
 * design line.
 *
 * A textarea is the one form control whose job is reading, not just entry, so
 * the changes split between the two:
 *
 * 1. **It matches the fields around it.** `--xen-radius-md` and `px-md` from
 *    the shared field language, and a minimum height of one full control
 *    height, so a small textarea is never shorter than the `InputV4` above it
 *    in a form (§13). The base's `radius.sm` box was visibly a different
 *    component.
 * 2. **It is set to be read.** `leading-relaxed` rather than the browser's
 *    default, which is most of what separates prose from a wall (§10). `rows`
 *    still drives the height, so the caller decides how much of the answer is
 *    visible before scrolling.
 * 3. **It resizes down one axis only.** The base allows `resize-y`, and V4
 *    keeps exactly that: dragging a field wider than the form it sits in breaks
 *    the column everything else is aligned to (§9, spacing as structure), while
 *    dragging it taller is the user telling you their answer is longer than you
 *    guessed.
 *
 * Focus is the shared brand halo `InputV4` paints, drawn with `box-shadow` so
 * arming it costs no layout (§36.11), and dropped to a plain colour change
 * under `prefers-reduced-motion` (§36.10). `invalid` turns the border and the
 * ring `danger` from one flag, so they can never disagree; the recovery copy
 * belongs to the `Field` that wraps this control, because a primitive cannot
 * invent the sentence that says what to fix (§38).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal, and a
 * box someone is writing in is the last place to spend depth.
 */
exports.TextareaV4 = React.forwardRef(function TextareaV4({ className, invalid = false, rows = 4, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("textarea", { ref: ref, rows: rows, "data-xen-v4-field": "", "aria-invalid": invalid || undefined, className: (0, cn_1.cn)('w-full resize-y bg-surface text-on-surface placeholder:text-muted-text', 'min-h-[var(--xen-space-2xl)] px-md py-sm text-base leading-relaxed', 'border rounded-[var(--xen-radius-md)]', (0, field_v4_1.fieldBorderClass)(invalid), 'disabled:pointer-events-none disabled:opacity-[0.38]', className), style: { ...(0, field_v4_1.fieldRingVars)(invalid), ...style }, ...rest }));
});
//# sourceMappingURL=TextareaV4.js.map