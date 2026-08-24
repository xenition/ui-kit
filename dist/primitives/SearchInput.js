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
exports.SearchInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Search field — a token-bound `<input>` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Web parity of the
 * native `SearchInput`; `invalid` swaps the border to `danger`. No literal
 * colors (kit lint rule).
 */
exports.SearchInput = React.forwardRef(function SearchInput({ value = '', onChangeText, onClear, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel = 'Search', className, ...rest }, ref) {
    const clear = () => {
        onChangeText?.('');
        onClear?.();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm bg-surface', 'border rounded-[var(--xen-radius-full)] px-md py-sm transition-colors', 'focus-within:ring-1', invalid
            ? 'border-danger focus-within:border-danger focus-within:ring-danger'
            : 'border-border focus-within:border-primary focus-within:ring-primary', disabled && 'pointer-events-none opacity-50', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-muted text-base", children: "\u2315" }), (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "search", "aria-label": accessibilityLabel, "aria-invalid": invalid || undefined, value: value, disabled: disabled, placeholder: placeholder, onChange: (e) => onChangeText?.(e.target.value), className: "min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:appearance-none", ...rest }), value.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear search", disabled: disabled, onClick: clear, className: "text-muted text-base hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary", children: "\u2715" })) : null] }));
});
//# sourceMappingURL=SearchInput.js.map