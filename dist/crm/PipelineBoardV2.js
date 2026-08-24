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
exports.PipelineBoardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/** Tone bands cycled across the stage headers (band tint + left border + count-chip tint). */
const HEADER_TONES = [
    { band: 'bg-primary/10 border-primary', chip: 'bg-primary/20' },
    { band: 'bg-accent/10 border-accent', chip: 'bg-accent/20' },
    { band: 'bg-warn/10 border-warn', chip: 'bg-warn/20' },
    { band: 'bg-success/10 border-success', chip: 'bg-success/20' },
    { band: 'bg-danger/10 border-danger', chip: 'bg-danger/20' },
];
function dealDotClass(deal) {
    return (0, internal_1.toneFillClass)(internal_1.OUTCOME_META[deal.outcome ?? 'open'].tone).split(' ')[0] ?? 'bg-primary';
}
/**
 * PipelineBoard **design V2** — columns, but each stage header wears a *colored*
 * tone band (cycled across the pipeline) with the stage name, deal count and
 * summed value, and every deal renders as a *compact chip* (dot + name +
 * right-aligned value) instead of a full {@link DealCard}. Denser and more
 * colorful than the base board. Same props as {@link PipelineBoard}:
 * `onDealClick` taps a chip; `onMoveDeal` adds guarded `← →` nudges disabled at
 * the pipeline ends. Empty board shows an {@link EmptyState}; empty stages show a
 * muted placeholder. Token-pure.
 */
exports.PipelineBoardV2 = React.forwardRef(function PipelineBoardV2({ stages, currency = 'USD', onDealClick, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', className, ...rest }, ref) {
    if (stages.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, role: "status", "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25A4" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full overflow-x-auto', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-md", children: stages.map((stage, stageIndex) => {
                const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
                const tone = HEADER_TONES[stageIndex % HEADER_TONES.length];
                const canBack = stageIndex > 0;
                const canForward = stageIndex < stages.length - 1;
                return ((0, jsx_runtime_1.jsxs)("section", { "aria-label": stage.name, className: "flex shrink-0 flex-col gap-sm overflow-hidden rounded-md border border-border bg-surface pb-sm", style: { width: columnWidth }, children: [(0, jsx_runtime_1.jsxs)("header", { className: (0, cn_1.cn)('flex flex-col gap-0.5 border-l-[3px] px-sm py-sm', tone.band), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: stage.name }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-xs py-0.5 text-xs font-bold text-on-surface', tone.chip), children: stage.deals.length })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: (0, commerce_1.formatMoney)(total, currency) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-xs px-sm", children: stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-lg text-center text-xs text-muted", children: "No deals" })) : (stage.deals.map((deal) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [onDealClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Deal ${deal.name}`, onClick: () => onDealClick(deal, stage), className: "flex items-center gap-xs rounded-sm border border-border bg-surface px-sm py-xs text-left transition duration-200 hover:bg-neutral-100 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-1.5 w-1.5 shrink-0 rounded-full', dealDotClass(deal)) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs font-semibold text-on-surface", children: deal.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: (0, commerce_1.formatMoney)(deal.valueCents, currency) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs rounded-sm border border-border bg-surface px-sm py-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-1.5 w-1.5 shrink-0 rounded-full', dealDotClass(deal)) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs font-semibold text-on-surface", children: deal.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: (0, commerce_1.formatMoney)(deal.valueCents, currency) })] })), onMoveDeal ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", disabled: !canBack, "aria-label": `Move ${deal.name} back`, onClick: () => onMoveDeal(deal, stage, 'back'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2190" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", disabled: !canForward, "aria-label": `Move ${deal.name} forward`, onClick: () => onMoveDeal(deal, stage, 'forward'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2192" }) })] })) : null] }, deal.id)))) })] }, stage.id));
            }) }) }));
});
//# sourceMappingURL=PipelineBoardV2.js.map