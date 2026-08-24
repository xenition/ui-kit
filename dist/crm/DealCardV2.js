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
exports.DealCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/** Value/meter color by outcome — won reads success, lost reads danger. */
function valueTextClass(outcome) {
    return outcome === 'won' ? 'text-success' : outcome === 'lost' ? 'text-danger' : 'text-on-surface';
}
function meterFillClass(outcome) {
    return outcome === 'won' ? 'bg-success' : outcome === 'lost' ? 'bg-danger' : 'bg-primary';
}
const OUTCOME_PILL_TINT = {
    open: 'bg-primary/10 text-primary',
    won: 'bg-success/10 text-success',
    lost: 'bg-danger/10 text-danger',
    pending: 'bg-warn/10 text-warn',
};
/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner-avatar footer. Where the base
 * is a flat outlined summary, V2 floats on a token `shadow-md`, promotes the value
 * to a hero number colored by outcome, and turns win-probability into the card's
 * primary visual. Outcome sits in a tinted pill (glyph + word) so it never leans
 * on color. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
exports.DealCardV2 = React.forwardRef(function DealCardV2({ name, company, valueCents, currency = 'USD', stage, probability, owner, closeDate, outcome = 'open', variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const pct = (0, internal_1.clampPct)(probability);
    const showMeter = probability != null;
    const meta = internal_1.OUTCOME_META[outcome];
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "aria-label": onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-md rounded-lg shadow-md transition duration-200 motion-reduce:transition-none', compact && 'gap-sm', onClick && !loading && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading deal", className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[40%] rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-7 w-[60%] rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full rounded-full bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-bold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: company }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center gap-0.5 rounded-full px-sm py-0.5 text-xs font-bold', OUTCOME_PILL_TINT[outcome]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-extrabold', valueTextClass(outcome)), children: (0, commerce_1.formatMoney)(valueCents, currency) }), showMeter ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-semibold", children: stage ?? 'Progress' }), (0, jsx_runtime_1.jsxs)("span", { className: "font-bold", children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: "h-2 overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', meterFillClass(outcome)), style: { width: `${pct}%` } }) })] })) : stage ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-muted", children: stage })) : null, owner || closeDate ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [owner ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: owner.name, src: owner.avatarUrl }), owner.name ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: owner.name }) : null] })) : ((0, jsx_runtime_1.jsx)("span", {})), closeDate ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: closeDate }) : null] })) : null] })) }));
});
//# sourceMappingURL=DealCardV2.js.map