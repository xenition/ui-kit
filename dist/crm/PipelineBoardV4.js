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
exports.PipelineBoardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const DealCardV4_1 = require("./DealCardV4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 pipeline board** — the web twin of the native `PipelineBoardV4`, same
 * props as {@link PipelineBoard} plus `stageEmptyLabel` and `formatStageCount`.
 *
 * ## Five changes
 *
 * 1. **The stage count is a badge on both twins.** Native hand-rolled a chip
 *    with `colors.muted` as its **fill** — a text token spent as a ground — and
 *    `colors.surface` as its ink, which is not that fill's guaranteed pair, so
 *    whether the number was readable depended entirely on the seed.
 * 2. **The move buttons are real targets.** They were ~28px squares held
 *    together with `hitSlop`, had no pressed treatment at all, and dimmed to an
 *    invented `0.4` when disabled — below M3's 0.38 band by a rounding error
 *    and above it by nothing anyone chose. They clear 44, take the state layer,
 *    and disable at 0.38.
 * 3. **A stage says how many deals it holds, in words.** `4` alone is not a
 *    quantity of anything; the column's name carries "4 deals" so a reader
 *    learns which stage a deal is sitting in.
 * 4. **Both twins use the shared empty state.** Native drew its own bordered
 *    box despite `EmptyState` being right there in the native primitives.
 * 5. **Stage totals are tabular**, so a row of column sums lines up instead of
 *    drifting with the digit widths.
 */
exports.PipelineBoardV4 = React.forwardRef(function PipelineBoardV4({ stages, currency = 'USD', onDealClick, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', stageEmptyLabel = 'No deals', formatStageCount, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = stages ?? [];
    const spellCount = formatStageCount ?? ((n) => `${n} deals`);
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, role: "status", "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u25A4" }), title: emptyLabel, className: className, ...rest }));
    }
    // One recipe for both arrows, so the two are never nearly the same size.
    const moveClass = (0, cn_1.cn)('flex flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border border-border text-sm text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 
    // M3's disabled-content band, from the scale — not the invented 0.4 the
    // base dimmed an unreachable arrow to.
    v4_state_1.V4_DISABLED_CLASS, chrome_v4_1.MIN_TAP_CLASS);
    const moveStyle = (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full overflow-x-auto', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-md", children: list.map((stage, stageIndex) => {
                const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
                const canBack = stageIndex > 0;
                const canForward = stageIndex < list.length - 1;
                const totalText = (0, money_1.formatMoney)(total, currency);
                return ((0, jsx_runtime_1.jsxs)("section", { "aria-label": (0, crm_v4_1.spokenLine)([stage.name, spellCount(stage.deals.length), totalText]), className: "flex shrink-0 flex-col gap-sm rounded-[var(--xen-radius-md)] border border-border bg-surface p-sm", style: { width: columnWidth }, children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: stage.name }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", "aria-hidden": "true", children: stage.deals.length })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', crm_v4_1.TABULAR_CLASS), children: totalText })] }), stage.deals.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "py-lg text-center text-xs text-muted-text", children: stageEmptyLabel })) : (stage.deals.map((deal) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(DealCardV4_1.DealCardV4, { name: deal.name, company: deal.company, valueCents: deal.valueCents, currency: currency, probability: deal.probability, outcome: deal.outcome, owner: deal.owner, variant: "compact", onClick: onDealClick ? () => onDealClick(deal, stage) : undefined }), onMoveDeal ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: !canBack, "aria-label": `Move ${deal.name} back`, onClick: () => onMoveDeal(deal, stage, 'back'), "data-xen-v4-state": "", style: moveStyle, className: moveClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2190" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: !canForward, "aria-label": `Move ${deal.name} forward`, onClick: () => onMoveDeal(deal, stage, 'forward'), "data-xen-v4-state": "", style: moveStyle, className: moveClass, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2192" }) })] })) : null] }, deal.id))))] }, stage.id));
            }) }) }));
});
//# sourceMappingURL=PipelineBoardV4.js.map