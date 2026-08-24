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
exports.ComparableRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS_TONE = {
    active: 'success',
    pending: 'warn',
    sold: 'neutral',
};
/**
 * Web parity of the native `ComparableRow`: a comparable-sale ("comp") row for a
 * valuation table — address, price, the beds/baths/sqft facts, a derived $/sqft
 * figure, distance, and a status chip. The $/sqft is guarded against a missing or
 * zero `sqft`. Data + `onClick` only; nothing fetches. Reuses `Badge` and the
 * shared `formatMoney`; all colors come from the `--xen-*` tokens — no literal
 * colors. Pass `onClick` to make the row an activatable button.
 */
exports.ComparableRow = React.forwardRef(function ComparableRow({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onClick, className, ...rest }, ref) {
    const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const meta = [facts.join(' · '), distance].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, className: (0, cn_1.cn)('flex items-center gap-3 border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]', 'rounded-[var(--xen-radius-md)]', onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...(0, internal_1.clickableProps)(onClick, `${address}, ${(0, commerce_1.formatMoney)(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-sm font-semibold text-on-surface", children: address }), status ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: status }) : null] }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, commerce_1.formatMoney)(priceCents, currency) }), perSqft != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${(0, commerce_1.formatMoney)(perSqft, currency)}/sqft` })) : null] })] }));
});
//# sourceMappingURL=ComparableRow.js.map