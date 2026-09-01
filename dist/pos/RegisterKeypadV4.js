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
exports.RegisterKeypadV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DIGIT_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
];
const KEY_LABEL = {
    decimal: 'Decimal point',
    doubleZero: 'Double zero',
    backspace: 'Backspace',
    clear: 'Clear entry',
};
/**
 * RegisterKeypad — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a numeric pad: **big ≥44px keys** with a soft-primary
 * press, a **bold `tabular-nums` amount display**, and distinct clear / backspace
 * action keys (the primary/danger accents a busy counter reaches for). Keys are
 * emitted through `onKeyPress`, and value-mutating keys fold into a controlled
 * `value` via `onChange` (append digit, single decimal, `00`, backspace, clear);
 * `pin` masks the display. Same props/behavior as {@link RegisterKeypadProps};
 * each key is a real, labelled `<button>`, and all colors come from `--xen-*`
 * token classes (no literals).
 */
exports.RegisterKeypadV4 = React.forwardRef(function RegisterKeypadV4({ value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', className, ...rest }, ref) {
    const applyKey = (key) => {
        switch (key) {
            case 'backspace':
                return value.slice(0, -1);
            case 'clear':
                return '';
            case 'decimal':
                return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
            case 'doubleZero':
                return value.length + 2 > maxLength ? value : `${value}00`;
            default:
                return value.length >= maxLength ? value : `${value}${key}`;
        }
    };
    const press = (key) => {
        if (disabled)
            return;
        onKeyPress?.(key);
        const next = applyKey(key);
        if (next !== value)
            onChange?.(next);
    };
    const bottomLeft = variant === 'amount' ? 'decimal' : variant === 'number' ? 'doubleZero' : 'clear';
    const rows = [...DIGIT_ROWS, [bottomLeft, '0', 'backspace']];
    const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;
    const keyLabel = (key) => KEY_LABEL[key] ?? key;
    const keyGlyph = (key) => {
        switch (key) {
            case 'decimal':
                return '.';
            case 'doubleZero':
                return '00';
            case 'backspace':
                return '⌫';
            case 'clear':
                return 'C';
            default:
                return key;
        }
    };
    const keyClass = (key) => {
        const base = 'flex min-h-[56px] flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border text-2xl font-extrabold tabular-nums transition-all ' +
            'active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
            'disabled:pointer-events-none disabled:opacity-50';
        if (key === 'clear') {
            return (0, cn_1.cn)(base, 'border-danger bg-surface text-danger hover:bg-danger hover:text-on-danger');
        }
        if (key === 'backspace') {
            return (0, cn_1.cn)(base, 'border-border bg-neutral-100 text-muted hover:bg-neutral-200');
        }
        return (0, cn_1.cn)(base, 'border-border bg-surface text-on-surface hover:bg-primary-50 active:bg-primary-100');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": accessibilityLabel, "data-xen-register-keypad": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', disabled ? 'opacity-50' : '', className), ...rest, children: [showDisplay ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `Entry ${value || placeholder}`, className: "flex items-baseline justify-end gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-lg)] border-2 border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: [displayPrefix ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-muted", children: displayPrefix })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-3xl font-extrabold tabular-nums', value ? 'text-on-surface' : 'text-muted'), children: displayText || placeholder })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-[var(--xen-space-sm)]", children: row.map((key) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": keyLabel(key), disabled: disabled, onClick: () => press(key), className: keyClass(key), children: keyGlyph(key) }, key))) }, r))) })] }));
});
//# sourceMappingURL=RegisterKeypadV4.js.map