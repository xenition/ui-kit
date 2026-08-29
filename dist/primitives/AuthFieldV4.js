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
exports.AuthFieldV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const field_v4_1 = require("./internal/field-v4");
const v4_state_1 = require("./internal/v4-state");
/*
  §10.1 permits a named 44 with a comment: it is the platform floor for an
  *incidental* tap target — the password eye, the clear ✕ — and it is geometry,
  not theme. There is no "tap target" token and inventing one would push a
  platform constant into the brand seed.

  Written out as a whole Tailwind literal rather than assembled from the number,
  because Tailwind's content scanner reads source text. `min-h-11` / `min-w-11`
  are 2.75rem — the same 44 the auth family already spells this way.

  The field's own height is NOT here: it comes from `FIELD_V4_SHELL`, which is
  the whole point of the shared module.
*/
const TAP_TARGET = 'min-h-11 min-w-11';
/** The inline eye/clear buttons: same box, same ring recipe, same state layer. */
const INLINE_ACTION = (0, cn_1.cn)('flex shrink-0 items-center justify-center', 'rounded-[var(--xen-radius-full)] focus-visible:outline-none', TAP_TARGET);
/**
 * **V4 auth input** — the web twin of the native `AuthFieldV4`, the same props
 * as the auth family's {@link AuthField} plus an optional clear affordance.
 *
 * Four things separate it from the base:
 *
 * 1. **It is a field like every other V4 field.** Height, radius, horizontal
 *    padding, border colour and ring all come from `internal/field-v4` —
 *    `spacing['2xl']` tall on `radius.md`, which the Addendum settled as the
 *    line's answer over §6's written 56/`radius.lg`. Nothing is picked here, so
 *    a sign-in field stacked above an `InputV4` or a `SelectV4` shares an edge
 *    and a `sharp` seed squares all three together.
 * 2. **A real focus ring, not a border swap.** The shell carries
 *    `data-xen-v4-shell`, so focusing anywhere inside it — the text, the eye,
 *    the ✕ — raises the border to `ring` *and* paints a translucent halo around
 *    the whole control. Drawn with `box-shadow`, so arming it costs no layout
 *    and focus never nudges the form (§36.11).
 * 3. **An error state that says something.** `error` turns the border and the
 *    ring `danger` **and** prints the message underneath in `dangerText`,
 *    wired to the input by `aria-describedby`. A red border alone is invisible
 *    to a colour-blind user, which is why the Addendum lets a field-shaped V4
 *    keep `error` at the cost of strict prop parity — and why the message is
 *    the state, not a decoration on it.
 * 4. **Affordances a thumb can actually hit.** The eye and the ✕ are 44 boxes
 *    with their own focus ring, instead of a bare glyph.
 *
 * Everything else is the base's contract, unchanged: a muted leading icon, a
 * `muted` placeholder that is never a faked label (§6), `hint` below when there
 * is no error, `trailing` for a caller's own affordance. No gradient, no glass,
 * no shadow — §16 asks that forms stay minimal, and a sign-in field is not a
 * hero.
 */
exports.AuthFieldV4 = React.forwardRef(function AuthFieldV4({ label, icon, error, hint, secure = false, trailing, disabled = false, onChangeText, onChange, inputType = 'text', className, showLabel = 'Show password', hideLabel = 'Hide password', clearable = false, clearLabel = 'Clear', onClear, id, value, defaultValue, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    const reactId = React.useId();
    const inputId = id ?? `${reactId}-field`;
    const messageId = `${reactId}-message`;
    const [visible, setVisible] = React.useState(false);
    // The error message IS the invalid state; one flag is how the border, the
    // ring and the copy can never disagree.
    const invalid = Boolean(error);
    // Whether the field has anything in it — the only thing the ✕ depends on.
    // Seeded from whichever of the controlled/uncontrolled values was given,
    // and re-synced when a controlled caller changes it from outside.
    const [filled, setFilled] = React.useState(() => String(value ?? defaultValue ?? '') !== '');
    React.useEffect(() => {
        if (value !== undefined)
            setFilled(String(value) !== '');
    }, [value]);
    const innerRef = React.useRef(null);
    const attachRef = React.useCallback((node) => {
        innerRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    const handleChange = (event) => {
        setFilled(event.target.value !== '');
        onChangeText?.(event.target.value);
        onChange?.(event);
    };
    const handleClear = () => {
        const el = innerRef.current;
        if (el !== null) {
            /*
              Write through the prototype's own value setter, then replay a real
              `input` event. That is what makes clearing indistinguishable from the
              user emptying the field by hand: React's value tracker sees the
              change, so `onChange` — and every form library bound to it — fires
              exactly once, for a controlled and an uncontrolled caller alike.
              Calling `onChangeText('')` directly would fire it for neither.
            */
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            setter?.call(el, '');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.focus();
        }
        setFilled(false);
        onClear?.();
    };
    const showClear = clearable && filled && !disabled;
    // One message slot: the error when there is one, the hint otherwise. Both
    // describe the input, so both get the same id and the input points at it.
    const message = invalid ? error : hint;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), children: [label ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: inputId, className: "w-fit", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", children: label }) })) : null, (0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-shell": "", className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(invalid), 'flex items-center gap-sm', disabled && v4_state_1.V4_DISABLED_SOFT_CLASS), style: (0, field_v4_1.fieldRingVars)(invalid), children: [icon ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)("input", { ref: attachRef, id: inputId, type: secure && !visible ? 'password' : secure ? 'text' : inputType, "aria-invalid": invalid || undefined, "aria-describedby": message ? messageId : undefined, disabled: disabled, value: value, defaultValue: defaultValue, onChange: handleChange, className: (0, cn_1.cn)('min-w-0 flex-1 bg-transparent text-base text-on-surface', 
                        // §6: the placeholder is `muted`, and it is never standing in for
                        // the label above.
                        'placeholder:text-muted focus:outline-none'), ...rest }), secure ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-inline-action": "", "aria-label": visible ? hideLabel : showLabel, "aria-pressed": visible, disabled: disabled, onClick: () => setVisible((v) => !v), className: INLINE_ACTION, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: visible ? 'eye-off' : 'eye', size: "base", color: visible ? 'primary' : 'muted' }) })) : null, showClear ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-inline-action": "", "aria-label": clearLabel, onClick: handleClear, className: INLINE_ACTION, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "sm", color: "muted" }) })) : null, trailing] }), invalid ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { id: messageId, size: "sm", tone: "dangerText", role: "alert", children: error })) : hint ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { id: messageId, size: "sm", tone: "muted", children: hint })) : null] }));
});
//# sourceMappingURL=AuthFieldV4.js.map