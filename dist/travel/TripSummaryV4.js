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
exports.TripSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
/**
 * TripSummary — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass recap: a brand-gradient hero total up top (the grand total in
 * near-white `text-primary-50` ink — the signature V4 lift), then the itemized
 * line items on the clean surface below, split from the hero by a dashed
 * boarding-pass tear line. When `totalCents` is omitted the total is summed from
 * `items`. Money is integer cents formatted through {@link formatMoney}. Same
 * props/behavior as {@link TripSummaryProps}; all colors from `--xen-*` token
 * classes (no literal colors).
 */
exports.TripSummaryV4 = React.forwardRef(function TripSummaryV4({ destination, dates, travelers, items = [], totalCents, currency = 'USD', formatMoney: format = money_1.formatMoney, title = 'Trip summary', action, className, ...rest }, ref) {
    const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
    const total = typeof totalCents === 'number' ? totalCents : derived;
    const metaLine = [
        dates,
        typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-trip-summary": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xs font-semibold text-primary-100", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary-50", children: destination }), metaLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-primary-100", children: metaLine }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-primary-50", children: format(total, currency) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)] border-t border-dashed border-border p-[var(--xen-space-lg)]", children: [items.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: it.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', it.cents < 0 ? 'text-success' : 'text-on-surface'), children: format(it.cents, currency) })] }, `${it.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No items" })), action ? (0, jsx_runtime_1.jsx)("div", { children: action }) : null] })] }));
});
//# sourceMappingURL=TripSummaryV4.js.map