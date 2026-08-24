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
exports.PhoneInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits) {
    const d = digits.replace(/\D/g, '').slice(0, 10);
    if (d.length === 0)
        return '';
    if (d.length <= 3)
        return `(${d}`;
    if (d.length <= 6)
        return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
/**
 * Phone field — a token-bound `<input>` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Web parity of the native
 * `PhoneInput`; border flips to `danger` when `invalid`. No literal colors (kit
 * lint rule).
 */
exports.PhoneInput = React.forwardRef(function PhoneInput({ value = '', onChangeText, countryCode = '+1', placeholder = '(555) 123-4567', invalid = false, disabled = false, accessibilityLabel = 'Phone number', className, }, ref) {
    const handle = (text) => {
        onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm bg-surface', 'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors', 'focus-within:ring-1', invalid
            ? 'border-danger focus-within:border-danger focus-within:ring-danger'
            : 'border-border focus-within:border-primary focus-within:ring-primary', disabled && 'pointer-events-none opacity-50', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "border-r border-border pr-sm text-base text-muted", children: countryCode }), (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "tel", inputMode: "tel", "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: formatUsPhone(value), disabled: disabled, placeholder: placeholder, autoComplete: "tel", onChange: (e) => handle(e.target.value), className: "min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none" })] }));
});
//# sourceMappingURL=PhoneInput.js.map