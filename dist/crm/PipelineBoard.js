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
exports.PipelineBoard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const DealCard_1 = require("./DealCard");
/**
 * Horizontally scrolling sales pipeline: one column per stage, each headed by
 * the stage name, a deal-count badge, and the summed stage value (integer cents
 * via `formatMoney`). Deals render as compact {@link DealCard}s; when
 * `onMoveDeal` is set, each card gains `←/→` buttons that advance or regress it
 * a stage (disabled at the pipeline ends, so indexing is always guarded). An
 * empty stage shows a muted placeholder; a board with **no stages** shows an
 * {@link EmptyState} with `emptyLabel`. Non-drag — wire a DnD layer separately if
 * needed. All colors are `--xen-*` token classes.
 */
exports.PipelineBoard = React.forwardRef(function PipelineBoard({ stages, currency = 'USD', onDealClick, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', className, ...rest }, ref) {
    if (stages.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, role: "status", "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25A4" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full overflow-x-auto', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-[var(--xen-space-md)]", children: stages.map((stage, stageIndex) => {
                const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
                const canBack = stageIndex > 0;
                const canForward = stageIndex < stages.length - 1;
                return ((0, jsx_runtime_1.jsxs)("section", { "aria-label": stage.name, className: "flex shrink-0 flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]", style: { width: columnWidth }, children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: stage.name }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: stage.deals.length })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: (0, commerce_1.formatMoney)(total, currency) })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-[var(--xen-space-lg)] text-center text-xs text-muted", children: "No deals" })) : (stage.deals.map((deal) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(DealCard_1.DealCard, { name: deal.name, company: deal.company, valueCents: deal.valueCents, currency: currency, probability: deal.probability, outcome: deal.outcome, owner: deal.owner, variant: "compact", onClick: onDealClick ? () => onDealClick(deal, stage) : undefined }), onMoveDeal ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", disabled: !canBack, "aria-label": `Move ${deal.name} back`, onClick: () => onMoveDeal(deal, stage, 'back'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2190" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", disabled: !canForward, "aria-label": `Move ${deal.name} forward`, onClick: () => onMoveDeal(deal, stage, 'forward'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2192" }) })] })) : null] }, deal.id))))] }, stage.id));
            }) }) }));
});
//# sourceMappingURL=PipelineBoard.js.map