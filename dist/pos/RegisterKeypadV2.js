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
exports.RegisterKeypadV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DIGIT_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
];
/**
 * RegisterKeypad, redesigned (v2): a **big circular keypad**. Large round keys
 * with a filled backspace and a tall display panel — a tactile till pad. Identical
 * entry behavior to {@link RegisterKeypad}. Same props, token-only.
 */
exports.RegisterKeypadV2 = React.forwardRef(function RegisterKeypadV2({ value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', className, ...rest }, ref) {
    const applyKey = (key) => {
        switch (key) {
            case 'backspace': return value.slice(0, -1);
            case 'clear': return '';
            case 'decimal': return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
            case 'doubleZero': return value.length + 2 > maxLength ? value : `${value}00`;
            default: return value.length >= maxLength ? value : `${value}${key}`;
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
    const glyph = (k) => (k === 'decimal' ? '.' : k === 'doubleZero' ? '00' : k === 'backspace' ? '⌫' : k === 'clear' ? 'C' : k);
    const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": accessibilityLabel, "data-xen-register-keypad": "", className: (0, cn_1.cn)('flex flex-col gap-3', disabled && 'opacity-50', className), ...rest, children: [showDisplay ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `Entry ${value || placeholder}`, className: "flex items-baseline justify-end gap-1 rounded-lg bg-neutral-100 px-4 py-3", children: [displayPrefix ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg text-muted", children: displayPrefix }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-3xl font-bold tabular-nums', value ? 'text-on-surface' : 'text-muted'), children: displayText || placeholder })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-3", children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-3", children: row.map((key) => {
                        const isAction = key === 'backspace' || key === 'clear';
                        return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": glyph(key), disabled: disabled, onClick: () => press(key), className: (0, cn_1.cn)('flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50', isAction ? 'bg-neutral-100 text-muted hover:bg-neutral-200' : 'bg-surface text-on-surface shadow-sm hover:bg-neutral-50'), children: glyph(key) }, key));
                    }) }, r))) })] }));
});
//# sourceMappingURL=RegisterKeypadV2.js.map