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
exports.TripSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
/**
 * Web parity of the native `TripSummary`: a read-only recap of a trip —
 * destination, dates, traveler count, an itemized cost breakdown, and a grand
 * total. When `totalCents` is omitted the total is summed from `items` (guarded
 * against an empty list). Money is integer cents formatted through
 * {@link formatMoney}. Token-only colors.
 */
exports.TripSummary = React.forwardRef(function TripSummary({ destination, dates, travelers, items = [], totalCents, currency = 'USD', formatMoney: format = money_1.formatMoney, title = 'Trip summary', action, className, ...rest }, ref) {
    const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
    const total = typeof totalCents === 'number' ? totalCents : derived;
    const metaLine = [
        dates,
        typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-trip-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xs font-semibold text-muted", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: destination }), metaLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: metaLine }) : null] }), items.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: it.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', it.cents < 0 ? 'text-success' : 'text-on-surface'), children: format(it.cents, currency) })] }, `${it.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: format(total, currency) })] }), action ? (0, jsx_runtime_1.jsx)("div", { children: action }) : null] }));
});
//# sourceMappingURL=TripSummary.js.map