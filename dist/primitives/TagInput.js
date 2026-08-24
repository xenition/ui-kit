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
exports.TagInput = TagInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Free-text token input — type and press Enter to add a chip; press a chip's ✕
 * (or Backspace on the empty field) to remove one. Web parity of the native
 * `TagInput`; the wrapper border flips to `danger` when `invalid`. No literal
 * colors (kit lint rule).
 */
function TagInput({ value = [], onChange, placeholder = 'Add a tag…', dedupe = true, invalid = false, disabled = false, accessibilityLabel = 'Add a tag', className, }) {
    const [draft, setDraft] = React.useState('');
    const add = () => {
        const t = draft.trim();
        if (!t)
            return;
        if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
            setDraft('');
            return;
        }
        onChange?.([...value, t]);
        setDraft('');
    };
    const removeAt = (index) => {
        onChange?.(value.filter((_, i) => i !== index));
    };
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            add();
        }
        else if (e.key === 'Backspace' && draft.length === 0 && value.length > 0) {
            removeAt(value.length - 1);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full flex-wrap items-center gap-xs bg-surface', 'border rounded-[var(--xen-radius-sm)] px-md py-sm transition-colors', 'focus-within:ring-1', invalid
            ? 'border-danger focus-within:border-danger focus-within:ring-danger'
            : 'border-border focus-within:border-primary focus-within:ring-primary', disabled && 'pointer-events-none opacity-50', className), children: [value.map((tag, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs rounded-[var(--xen-radius-full)] bg-accent px-sm py-0.5 text-xs text-on-accent", children: [tag, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${tag}`, disabled: disabled, onClick: () => removeAt(i), className: "text-on-accent hover:opacity-70 focus-visible:outline-none", children: "\u2715" })] }, `${tag}-${i}`))), (0, jsx_runtime_1.jsx)("input", { "aria-label": accessibilityLabel, value: draft, disabled: disabled, onChange: (e) => setDraft(e.target.value), onKeyDown: onKeyDown, placeholder: value.length === 0 ? placeholder : '', className: "min-w-[80px] flex-grow bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none" })] }));
}
//# sourceMappingURL=TagInput.js.map