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
exports.TipSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const DEFAULT_PERCENTS = [10, 15, 20, 25];
/**
 * A row of tip-percentage options rendered as a radio-style segmented control.
 * Each option is a real `<button role="radio">` (keyboard native) that shows
 * its percentage and, when `subtotalCents` is given, the computed amount. The
 * selected option fills with the `primary` token pair and carries
 * `aria-checked` so selection is not signalled by color alone. An optional
 * leading "No tip" option emits `null`. Web parity of the native `TipSelector`;
 * token-only.
 */
exports.TipSelector = React.forwardRef(function TipSelector({ percents = DEFAULT_PERCENTS, selectedPercent, onSelect, subtotalCents, currency = 'USD', title = 'Add a tip', allowNone = true, formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    const choices = [
        ...(allowNone ? [{ key: 'none', percent: null, label: 'No tip' }] : []),
        ...percents.map((p) => ({ key: String(p), percent: p, label: `${p}%` })),
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h4", { className: "font-heading text-base font-semibold text-on-surface", children: title }) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": title, className: "flex gap-[var(--xen-space-sm)]", children: choices.map((choice) => {
                    const selected = choice.percent === null
                        ? selectedPercent === null || selectedPercent === undefined
                        : selectedPercent === choice.percent;
                    const amount = choice.percent !== null && typeof subtotalCents === 'number'
                        ? Math.round((subtotalCents * choice.percent) / 100)
                        : null;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": amount !== null ? `${choice.label}, ${formatMoney(amount, currency)}` : choice.label, onClick: () => onSelect?.(choice.percent), className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)] transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: choice.label }), amount !== null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs tabular-nums', selected ? 'text-on-primary' : 'text-muted'), children: formatMoney(amount, currency) })) : null] }, choice.key));
                }) })] }));
});
//# sourceMappingURL=TipSelector.js.map