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
exports.MilestoneRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DueDatePill_1 = require("./DueDatePill");
/**
 * MilestoneRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a milestone line, laid out on a subtle timeline
 * rail: a status marker (**success** glow when reached, else muted), a legible
 * title, an optional target {@link DueDatePill}, and a **primary** progress
 * hint. Reaching a milestone settles the row into a soft-success glow. Same
 * props/behavior as {@link MilestoneRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.MilestoneRowV4 = React.forwardRef(function MilestoneRowV4({ title, reached = false, progress, dateLabel, dateTone = 'upcoming', className }, ref) {
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-start gap-3 rounded-[var(--xen-radius-lg)] p-2 transition-colors', reached ? 'bg-success/[0.08]' : 'bg-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": reached ? 'Milestone reached' : 'Milestone pending', className: (0, cn_1.cn)('mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold', reached ? 'border-success bg-success text-on-success' : 'border-border bg-surface'), children: reached ? '✓' : '' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-sm font-semibold', reached ? 'text-muted' : 'text-on-surface'), children: title }), dateLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dateLabel, tone: dateTone }) : null] }), pct != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: reached ? 'success' : 'primary', size: "sm" }) : null] })] }));
});
//# sourceMappingURL=MilestoneRowV4.js.map