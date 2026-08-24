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
exports.AutoComplete = AutoComplete;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/**
 * Inline autocomplete — a token-bound `<input>` with a filtered suggestion list
 * that drops in beneath it as you type. Filters `options` by label substring,
 * caps at `maxResults`, and reports text via `onChange` and the chosen row via
 * `onSelect`. Web parity of the native `AutoComplete`. No literal colors (kit
 * lint rule).
 */
function AutoComplete({ options, value = '', onChange, onSelect, placeholder = 'Type to search…', maxResults = 6, invalid = false, disabled = false, accessibilityLabel = 'Autocomplete', className, }) {
    const [focused, setFocused] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(focused, () => setFocused(false));
    const matches = React.useMemo(() => {
        const q = value.trim().toLowerCase();
        if (!q)
            return [];
        return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
    }, [options, value, maxResults]);
    const showList = focused && matches.length > 0;
    const choose = (opt) => {
        onChange?.(opt.label);
        onSelect?.(opt);
        setFocused(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsx)("input", { "aria-label": accessibilityLabel, "aria-expanded": showList, "aria-invalid": invalid || undefined, role: "combobox", "aria-autocomplete": "list", value: value, disabled: disabled, placeholder: placeholder, autoComplete: "off", onChange: (e) => onChange?.(e.target.value), onFocus: () => setFocused(true), className: (0, cn_1.cn)('w-full bg-surface text-on-surface placeholder:text-muted', 'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors', 'focus:outline-none focus:ring-1', invalid
                    ? 'border-danger focus:border-danger focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-primary', 'disabled:pointer-events-none disabled:opacity-50') }), showList ? ((0, jsx_runtime_1.jsx)("div", { role: "listbox", "aria-label": "Suggestions", className: "absolute z-50 mt-1 max-h-[220px] w-full overflow-auto rounded-[var(--xen-radius-md)] border border-border bg-surface py-1 shadow-lg", children: matches.map((opt) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "option", "aria-selected": opt.label === value, 
                    // Use mousedown so the input's blur doesn't close the list first.
                    onMouseDown: (e) => {
                        e.preventDefault();
                        choose(opt);
                    }, className: "block w-full px-md py-sm text-left text-base text-on-surface transition-colors hover:bg-neutral-100", children: opt.label }, opt.value))) })) : null] }));
}
//# sourceMappingURL=AutoComplete.js.map