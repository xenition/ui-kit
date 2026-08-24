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
exports.CurrencyInput = CurrencyInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Currency field — a token-bound `<input>` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Web parity of the native
 * `CurrencyInput`; border flips to `danger` when `invalid`. No literal colors
 * (kit lint rule).
 */
function CurrencyInput({ value, onChange, symbol = '$', precision = 2, placeholder = '0.00', invalid = false, disabled = false, accessibilityLabel = 'Amount', className, }) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm bg-surface', 'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors', 'focus-within:ring-1', invalid
            ? 'border-danger focus-within:border-danger focus-within:ring-danger'
            : 'border-border focus-within:border-primary focus-within:ring-primary', disabled && 'pointer-events-none opacity-50', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-muted", children: symbol }), (0, jsx_runtime_1.jsx)("input", { type: "text", inputMode: "decimal", "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: text, disabled: disabled, placeholder: placeholder, onChange: (e) => handle(e.target.value), className: "min-w-0 flex-1 bg-transparent text-right text-base text-on-surface placeholder:text-muted focus:outline-none" })] }));
}
//# sourceMappingURL=CurrencyInput.js.map