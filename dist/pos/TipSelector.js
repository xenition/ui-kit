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
const internal_1 = require("./internal");
/** Compute a tip amount (integer cents) from a subtotal and a percentage. */
function tipCentsFor(subtotalCents, percent) {
    return Math.round((subtotalCents * percent) / 100);
}
function TipOption({ selected, onClick, ariaLabel, top, bottom }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": ariaLabel, onClick: onClick, className: (0, cn_1.cn)('flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5', 'rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)] transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected
            ? 'border-primary bg-primary text-on-primary shadow-md'
            : 'border-border bg-surface text-on-surface hover:bg-primary-50 active:scale-[0.98]'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold tabular-nums", children: top }), bottom != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs tabular-nums', selected ? 'text-on-primary' : 'text-muted'), children: bottom })) : null] }));
}
/**
 * TipSelector — **V4** "register" design. A `radiogroup` of big (≥44px) tip
 * options: each preset shows the **% bold** and the computed amount
 * (`subtotal × pct / 100`) in `tabular-nums` below, plus a "No tip" and an
 * optional "Custom" option. The selected option fills **solid primary** with
 * on-primary ink; the rest stay calm on `surface` with a soft-primary hover.
 * Presentational only — selection is driven by props and reported via
 * callbacks. All colors from `--xen-*` token classes (no literals), dark-mode
 * safe.
 */
exports.TipSelector = React.forwardRef(function TipSelector({ subtotalCents, currency = 'USD', percents = [15, 18, 20], selectedPercent, customCents, onSelectPercent, onNoTip, onCustom, testID, className, ...rest }, ref) {
    const customSelected = typeof customCents === 'number' && customCents != null;
    const noTipSelected = (selectedPercent === null || selectedPercent === undefined) && !customSelected;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "radiogroup", "aria-label": "Tip amount", "data-xen-tip-selector": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-wrap gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(TipOption, { selected: noTipSelected, onClick: onNoTip, ariaLabel: "No tip", top: "No tip" }), percents.map((pct) => {
                const amount = tipCentsFor(subtotalCents, pct);
                const selected = selectedPercent === pct && !customSelected;
                return ((0, jsx_runtime_1.jsx)(TipOption, { selected: selected, onClick: () => onSelectPercent?.(pct), ariaLabel: `Tip ${pct}%, ${(0, internal_1.formatMoney)(amount, currency)}`, top: `${pct}%`, bottom: (0, internal_1.formatMoney)(amount, currency) }, pct));
            }), onCustom ? ((0, jsx_runtime_1.jsx)(TipOption, { selected: customSelected, onClick: onCustom, ariaLabel: customSelected
                    ? `Custom tip, ${(0, internal_1.formatMoney)(customCents, currency)}`
                    : 'Custom tip', top: "Custom", bottom: customSelected ? (0, internal_1.formatMoney)(customCents, currency) : undefined })) : null] }));
});
//# sourceMappingURL=TipSelector.js.map