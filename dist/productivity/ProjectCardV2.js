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
exports.ProjectCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * big percent read-out over a thick progress bar, then assignees, a task-count meta
 * and a due pill on a footer row. Distinct from v1. Same props, token-only.
 */
exports.ProjectCardV2 = React.forwardRef(function ProjectCardV2({ title, description, progress, taskCount, assignees, dueLabel, dueTone, onClick, className }, ref) {
    const interactive = typeof onClick === 'function';
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-project-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null] }), pct !== null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: "Progress" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-bold text-on-surface", children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${pct}%` } }) })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [assignees && assignees.length > 0 ? (0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees }) : (0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [typeof taskCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [taskCount, " tasks"] }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] })] })] }));
});
//# sourceMappingURL=ProjectCardV2.js.map