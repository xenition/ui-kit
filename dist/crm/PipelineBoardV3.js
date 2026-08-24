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
exports.PipelineBoardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
function dealDotClass(deal) {
    return (0, internal_1.toneFillClass)(internal_1.OUTCOME_META[deal.outcome ?? 'open'].tone).split(' ')[0] ?? 'bg-primary';
}
/**
 * PipelineBoard **design V3** — no columns at all. A *horizontal stage-total
 * strip* (a token {@link BarChart} of each stage's summed value) sits above a
 * flat, vertically stacked *list* of every stage and its deals — a single-column,
 * no-horizontal-scroll layout for narrow screens. Same props as
 * {@link PipelineBoard}: `onDealClick` taps a deal line; `onMoveDeal` adds guarded
 * `← →` nudges disabled at the pipeline ends. Empty board shows an
 * {@link EmptyState}; empty stages show a muted placeholder. Token-pure.
 */
exports.PipelineBoardV3 = React.forwardRef(function PipelineBoardV3({ stages, currency = 'USD', onDealClick, onMoveDeal, emptyLabel = 'No stages in this pipeline yet', className, ...rest }, ref) {
    if (stages.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, role: "status", "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25A4" }), title: emptyLabel, className: className, ...rest }));
    }
    const totals = stages.map((s) => s.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0));
    const labels = stages.map((s) => s.name);
    const grandTotal = totals.reduce((a, b) => a + b, 0);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm rounded-md border border-border bg-surface p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: "Pipeline total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-surface", children: (0, commerce_1.formatMoney)(grandTotal, currency) })] }), (0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: totals, labels: labels, height: 80, color: "primary", "aria-label": `Stage totals across ${stages.length} stages` })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-md", children: stages.map((stage, stageIndex) => {
                    const canBack = stageIndex > 0;
                    const canForward = stageIndex < stages.length - 1;
                    return ((0, jsx_runtime_1.jsxs)("section", { "aria-label": stage.name, className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: stage.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: `${stage.deals.length} · ${(0, commerce_1.formatMoney)(totals[stageIndex] ?? 0, currency)}` })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-xs text-xs text-muted", children: "No deals" })) : (stage.deals.map((deal) => {
                                const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', dealDotClass(deal)) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: deal.name }), deal.company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: deal.company }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(deal.valueCents, currency) })] }));
                                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onDealClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Deal ${deal.name}`, onClick: () => onDealClick(deal, stage), className: "flex min-w-0 flex-1 items-center gap-sm rounded-sm border border-border bg-surface px-sm py-xs text-left transition duration-200 hover:bg-neutral-100 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: inner })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-sm rounded-sm border border-border bg-surface px-sm py-xs", children: inner })), onMoveDeal ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 gap-xs", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", disabled: !canBack, "aria-label": `Move ${deal.name} back`, onClick: () => onMoveDeal(deal, stage, 'back'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2190" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", disabled: !canForward, "aria-label": `Move ${deal.name} forward`, onClick: () => onMoveDeal(deal, stage, 'forward'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2192" }) })] })) : null] }, deal.id));
                            }))] }, stage.id));
                }) })] }));
});
//# sourceMappingURL=PipelineBoardV3.js.map