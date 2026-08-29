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
exports.PasswordInputV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
/**
 * **V4 password field** — the same props as {@link PasswordInput}, a different
 * design line.
 *
 * The reveal toggle is the whole design problem here: it is a word sitting
 * inside a field the user is trying to type into, so it has to be reachable
 * without being in the way. V4 keeps it a word, gives it a full-height target
 * inside the shell, and — this is the part that matters for a keyboard — lets
 * it keep its own focus ring. The shared shell rule suppresses the outline on
 * `input`, `textarea` and `select` only, never on a button living inside a
 * shell, because someone tabbing to the toggle must still see where they are
 * (§46).
 *
 * The rest is the shared field language:
 *
 * - `FIELD_V4_SHELL` — the same height, radius and padding `InputV4` and
 *   `SelectV4` take — so a password sits under an email field in a sign-up
 *   form and shares its edge (§13). The base's `radius.sm` box was visibly a
 *   different component.
 * - The same brand halo, on `:focus-within` so the whole control rings, drawn
 *   with `box-shadow` so arming it costs no layout (§36.11).
 * - The label sits above at `text-sm`, medium weight, matching `InputV4`.
 *
 * The toggle says **Show** / **Hide** rather than carrying an eye icon: §47
 * asks for copy that says what happens, an eye with a slash through it means
 * two different things depending on which product you last used, and the state
 * is then in a word rather than only in an icon (§46). It is tinted
 * `text-primary-text` when revealed — the contrast-safe text form the compiler
 * measured against `surface`, not the vivid `primary` slot, which is for fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal.
 */
exports.PasswordInputV4 = React.forwardRef(function PasswordInputV4({ value = '', onChangeText, label, placeholder = 'Password', invalid = false, disabled = false, accessibilityLabel = 'Password', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    const [visible, setVisible] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('grid gap-sm', className), children: [label ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-on-surface", children: label }) : null, (0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-shell": "", className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(invalid), 'flex items-center gap-sm', disabled && 'pointer-events-none opacity-[0.38]'), style: (0, field_v4_1.fieldRingVars)(invalid), children: [(0, jsx_runtime_1.jsx)("input", { ref: ref, type: visible ? 'text' : 'password', "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: value, disabled: disabled, placeholder: placeholder, autoCapitalize: "none", autoCorrect: "off", onChange: (e) => onChangeText?.(e.target.value), className: (0, cn_1.cn)('min-w-0 flex-1 bg-transparent text-base text-on-surface', 'placeholder:text-muted-text'), ...rest }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-inline-action": "", "aria-label": visible ? 'Hide password' : 'Show password', "aria-pressed": visible, disabled: disabled, onClick: () => setVisible((v) => !v), className: (0, cn_1.cn)('flex h-[var(--xen-space-2xl)] shrink-0 items-center px-xs', 'rounded-[var(--xen-radius-sm)] text-sm font-semibold', visible ? 'text-primary-text' : 'text-muted-text'), children: visible ? 'Hide' : 'Show' })] })] }));
});
//# sourceMappingURL=PasswordInputV4.js.map