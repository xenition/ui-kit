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
exports.MilestoneRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DueDatePill_1 = require("./DueDatePill");
/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress underline, and the target-date pill on the right —
 * hairline-bordered for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
exports.MilestoneRowV3 = React.forwardRef(function MilestoneRowV3({ title, reached = false, progress, dateLabel, dateTone, className }, ref) {
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-milestone-row": "", className: (0, cn_1.cn)('flex items-center gap-2.5 border-b border-border py-2', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', reached ? 'text-success' : 'text-muted'), "aria-hidden": true, children: reached ? '✓' : '🏁' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm text-on-surface', reached && 'text-muted line-through'), children: title }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', reached ? 'bg-success' : 'bg-primary'), style: { width: `${pct}%` } }) })] }), dateLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dateLabel, tone: dateTone }) : null] }));
});
//# sourceMappingURL=MilestoneRowV3.js.map