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
exports.CurrencyInputV4 = CurrencyInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const field_v4_1 = require("./internal/field-v4");
/**
 * **V4 currency field** — the same props as {@link CurrencyInput}, a different
 * design line.
 *
 * Money is the field people check twice, so the changes are all about reading
 * it rather than decorating it:
 *
 * 1. **It is a field like the others.** It takes `FIELD_V4_SHELL` — the same
 *    height, radius and padding `InputV4` and `SelectV4` take, from the same
 *    shared constant — so an amount sitting under a text field in a form
 *    shares its edge (§13).
 * 2. **Figures of equal width.** `tabular-nums` on the amount, so a column of
 *    prices lines up on the decimal point and a digit changing does not shift
 *    the ones beside it (§33, optimize for scanning). It stays right aligned
 *    for the same reason.
 * 3. **A real focus ring.** The shell carries `data-xen-v4-shell`, so focusing
 *    the amount rings the whole field — symbol included, because the symbol is
 *    part of the control — drawn with `box-shadow` so arming it costs no
 *    layout (§36.11). The base's `focus-within:ring-1` was a hairline that read
 *    as a second border.
 *
 * The symbol is `muted` and the amount is `on-surface`: the currency is context
 * and the number is the content, and §6 asks for the hierarchy to be settled
 * before anything is styled. `invalid` turns the border and the ring `danger`
 * from one flag, so they can never disagree — the recovery copy belongs to the
 * `Field` around this control, since a primitive cannot invent the sentence
 * that says what to fix (§38).
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and an
 * amount is not a hero.
 */
function CurrencyInputV4({ value, onChange, symbol = '$', precision = 2, placeholder = '0.00', invalid = false, disabled = false, accessibilityLabel = 'Amount', className, }) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    // Local text buffer so a trailing "." or "0" survives while typing; it stays
    // in sync when the controlled value changes from outside.
    const [text, setText] = React.useState(value == null ? '' : String(value));
    React.useEffect(() => {
        const asNum = text === '' ? null : Number(text);
        if (value !== asNum && !(Number.isNaN(asNum ?? NaN) && value == null)) {
            setText(value == null ? '' : String(value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const sanitize = (raw) => {
        let cleaned = raw.replace(/[^0-9.]/g, '');
        const firstDot = cleaned.indexOf('.');
        if (firstDot !== -1) {
            const head = cleaned.slice(0, firstDot + 1);
            const tail = cleaned.slice(firstDot + 1).replace(/\./g, '');
            cleaned = head + tail.slice(0, Math.max(0, precision));
        }
        return cleaned;
    };
    const handle = (raw) => {
        const next = sanitize(raw);
        setText(next);
        if (next === '' || next === '.') {
            onChange?.(null);
            return;
        }
        const n = Number(next);
        onChange?.(Number.isNaN(n) ? null : n);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-shell": "", className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(invalid), 'flex items-center gap-sm', disabled && 'pointer-events-none opacity-[0.38]', className), style: (0, field_v4_1.fieldRingVars)(invalid), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-muted-text", children: symbol }), (0, jsx_runtime_1.jsx)("input", { type: "text", inputMode: "decimal", "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: text, disabled: disabled, placeholder: placeholder, onChange: (e) => handle(e.target.value), className: (0, cn_1.cn)('min-w-0 flex-1 bg-transparent text-right text-base text-on-surface', 'tabular-nums placeholder:text-muted-text focus:outline-none') })] }));
}
//# sourceMappingURL=CurrencyInputV4.js.map