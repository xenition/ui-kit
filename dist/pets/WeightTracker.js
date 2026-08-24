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
exports.WeightTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const charts_1 = require("../charts");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    ideal: { label: 'Ideal weight', tone: 'success' },
    under: { label: 'Underweight', tone: 'warn' },
    over: { label: 'Overweight', tone: 'danger' },
};
function classify(current, range) {
    if (!range)
        return undefined;
    const min = range[0] ?? 0;
    const max = range[1] ?? 0;
    if (current < min)
        return 'under';
    if (current > max)
        return 'over';
    return 'ideal';
}
/**
 * A pet weight tracker: the current reading with unit, a change delta (the delta
 * tone follows the ideal range, not the sign — vets track both directions), a
 * status chip vs. the ideal band, and a {@link Sparkline} of recent history.
 * Renders a shared empty state when there is no reading. Status reads via a
 * labelled chip (not color alone). Token-only colors.
 */
exports.WeightTracker = React.forwardRef(function WeightTracker({ current, unit = 'kg', delta, history, idealRange, status, emptyLabel = 'No weight logged yet', className }, ref) {
    const safeHistory = history ?? [];
    if (current == null || Number.isNaN(current)) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\u2696\uFE0F" }), title: "Weight", description: emptyLabel, className: className }));
    }
    const resolvedStatus = status ?? classify(current, idealRange);
    const statusMeta = resolvedStatus ? STATUS_META[resolvedStatus] : undefined;
    const trendColor = statusMeta?.tone ?? 'primary';
    const deltaClass = delta == null || delta === 0 ? 'text-muted' : 'text-on-surface';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold text-on-surface", children: current }), (0, jsx_runtime_1.jsx)("span", { className: "mb-[var(--xen-space-xs)] text-base text-muted", children: unit })] }), statusMeta ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('self-start rounded-full border bg-transparent px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold', _tokens_1.SLOT_BORDER[statusMeta.tone], _tokens_1.SLOT_TEXT[statusMeta.tone]), children: statusMeta.label })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-sm font-semibold', deltaClass), children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta), " ", unit, " since last"] })) : null, idealRange ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Ideal range ", idealRange[0] ?? 0, "\u2013", idealRange[1] ?? 0, " ", unit] })) : null, safeHistory.length > 0 ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: safeHistory, color: trendColor, width: 220, "aria-label": `Weight trend over ${safeHistory.length} readings` })) : null] }));
});
//# sourceMappingURL=WeightTracker.js.map