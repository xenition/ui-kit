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
exports.DealCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
function valueTextClass(outcome) {
    return outcome === 'won' ? 'text-success' : outcome === 'lost' ? 'text-danger' : 'text-on-surface';
}
/**
 * DealCard **design V3** — a *minimal single line*: a small outcome dot, the deal
 * name + account stacked, and the value pushed hard to the right. No card chrome,
 * no meter — a scannable roster row for long deal lists. The dot is paired with
 * an outcome word in the row's `aria-label`, so meaning never rests on color
 * alone. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
exports.DealCardV3 = React.forwardRef(function DealCardV3({ name, company, valueCents, currency = 'USD', stage, probability, outcome = 'open', loading = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.OUTCOME_META[outcome];
    // The filled-chip helper yields a token `bg-*`; take just the background for the dot.
    const dotBg = (0, internal_1.toneFillClass)(meta.tone).split(' ')[0] ?? 'bg-primary';
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-sm px-xs py-sm transition duration-200 motion-reduce:transition-none', onClick && !loading && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading deal", className: "flex flex-1 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2.5 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 flex-1 rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-16 rounded-sm bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', dotBg) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), company || stage ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [company, stage].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', valueTextClass(outcome)), children: (0, commerce_1.formatMoney)(valueCents, currency) }), probability != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [(0, internal_1.clampPct)(probability), "%"] }) : null] })] })) }));
});
//# sourceMappingURL=DealCardV3.js.map