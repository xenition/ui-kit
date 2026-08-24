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
exports.RecurrenceRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const DEFAULT_OPTIONS = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];
/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `aria-checked`, not color-alone); `summary`
 * collapses to a single tappable row that shows the current rule and defers to a
 * host-owned picker. Token colors only.
 */
exports.RecurrenceRow = React.forwardRef(function RecurrenceRow({ value, onChange, label = 'Repeat', variant = 'inline', onPress, options = DEFAULT_OPTIONS, className, ...rest }, ref) {
    const current = options.find((o) => o.value === value) ?? options[0];
    if (variant === 'summary') {
        return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": `${label}: ${current?.label ?? 'None'}`, onClick: onPress, className: (0, cn_1.cn)('flex w-full items-center py-2 text-left transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]', className), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-base font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: current?.label ?? 'None' }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-base text-muted", children: "\u203A" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex items-center", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-base font-semibold text-on-surface", children: label })] }), (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: "flex flex-wrap gap-1", children: options.map((o) => {
                    const active = o.value === value;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-label": o.label, "aria-checked": active, onClick: () => onChange?.(o.value), className: (0, cn_1.cn)('rounded-full border px-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', active
                            ? 'border-primary bg-primary-50 font-bold text-primary'
                            : 'border-border bg-surface font-medium text-on-surface hover:bg-neutral-100'), children: o.label }, o.value));
                }) })] }));
});
//# sourceMappingURL=RecurrenceRow.js.map