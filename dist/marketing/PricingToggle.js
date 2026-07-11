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
exports.PricingToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Monthly/yearly (or N-option) segmented switch that reports the active key
 * via `value`/`onChange`, with a per-option "save %" badge slot. Pairs with
 * `PricingTable` to swap billing periods.
 */
exports.PricingToggle = React.forwardRef(function PricingToggle({ options, value, onChange, label = 'Billing period', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-pricing-toggle": "", role: "radiogroup", "aria-label": label, className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-[var(--xen-radius-full)] border border-border bg-neutral-50 p-1', className), ...rest, children: options.map((option) => {
            const active = option.value === value;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": active, "data-active": active ? 'true' : 'false', onClick: () => onChange(option.value), className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-4 py-1.5 text-sm font-medium transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', active
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-muted hover:text-on-surface'), children: [(0, jsx_runtime_1.jsx)("span", { children: option.label }), option.badge !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-pricing-toggle-badge": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-full)] px-2 py-0.5 text-xs font-semibold', active ? 'bg-on-primary text-primary' : 'bg-primary-100 text-primary-700'), children: option.badge })) : null] }, option.value));
        }) }));
});
//# sourceMappingURL=PricingToggle.js.map