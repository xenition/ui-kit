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
exports.MultiSelect = MultiSelect;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
/**
 * Multi-select — like the themed `Select` but the popover lets several options
 * be checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`). Web parity of the native `MultiSelect`; `onChange` reports the
 * whole next `string[]`. No literal colors (kit lint rule).
 */
function MultiSelect({ options, value = [], onChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, className, }) {
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const selectedOptions = options.filter((o) => value.includes(o.value));
    const toggle = (v) => {
        const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
        onChange?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": accessibilityLabel, "aria-haspopup": "listbox", "aria-expanded": open, "aria-invalid": invalid || undefined, disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)('flex w-full items-center justify-between gap-sm bg-surface', 'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors', 'focus:outline-none focus:ring-1', invalid
                    ? 'border-danger focus:border-danger focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-primary', 'disabled:pointer-events-none disabled:opacity-50'), children: [selectedOptions.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: placeholder })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-1 flex-wrap gap-xs", children: selectedOptions.map((o) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-full)] bg-accent px-sm py-0.5 text-xs text-on-accent", children: o.label }, o.value))) })), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm text-muted", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsx)("div", { role: "listbox", "aria-multiselectable": true, className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[var(--xen-radius-lg)] border border-border bg-surface py-1 shadow-lg", children: options.map((opt) => {
                    const active = value.includes(opt.value);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "option", "aria-selected": active, onClick: () => toggle(opt.value), className: (0, cn_1.cn)('flex w-full items-center justify-between px-md py-sm text-left text-base transition-colors hover:bg-neutral-100', active ? 'font-semibold text-primary' : 'text-on-surface'), children: [(0, jsx_runtime_1.jsx)("span", { children: opt.label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: active ? 'text-primary' : 'text-muted', children: active ? '✓' : '' })] }, opt.value));
                }) })) : null] }));
}
//# sourceMappingURL=MultiSelect.js.map