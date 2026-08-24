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
exports.MilestoneRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DueDatePill_1 = require("./DueDatePill");
/**
 * MilestoneRow, redesigned (v2): an **elevated milestone card**. A flag/✓ medallion
 * leads the title; a thick progress bar with a percent read-out and a target-date
 * pill follow. Reached milestones tint success. Distinct from v1. Same props,
 * token-only.
 */
exports.MilestoneRowV2 = React.forwardRef(function MilestoneRowV2({ title, reached = false, progress, dateLabel, dateTone, className }, ref) {
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-milestone-row": "", className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base', reached ? 'bg-success/10 text-success' : 'bg-primary/10'), "aria-hidden": true, children: reached ? '✓' : '🏁' }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm font-semibold text-on-surface', reached && 'text-muted line-through'), children: title }), dateLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dateLabel, tone: dateTone }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', reached ? 'bg-success' : 'bg-primary'), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [pct, "%"] })] })] }));
});
//# sourceMappingURL=MilestoneRowV2.js.map