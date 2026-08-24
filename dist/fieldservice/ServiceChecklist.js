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
exports.ServiceChecklist = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const format_1 = require("./internal/format");
/**
 * A completion checklist for a service procedure. Each task is a checkbox row
 * whose label strikes through when done (completion reads without color alone).
 * A header progress bar summarizes `done / total`. Handles the empty state (no
 * tasks → `EmptyState`) and a `loading` skeleton. Toggling fires
 * `onToggle(id, next)`. No literal colors.
 */
exports.ServiceChecklist = React.forwardRef(function ServiceChecklist({ title, tasks, onToggle, loading = false, disabled = false, emptyLabel = 'No checklist items', className, style }, ref) {
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((t) => t.done).length;
    const pct = total > 0 ? (0, format_1.clampPct)((completed / total) * 100) : 0;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading checklist", className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "50%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", lines: 3 })] }) }));
    }
    if (total === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: emptyLabel, description: "Items will appear here once added.", className: className, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [completed, "/", total] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: completed, max: total, tone: pct === 100 ? 'success' : 'primary', size: "sm" }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: list.map((task) => ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: task.done, disabled: disabled, onChange: (e) => onToggle?.(task.id, e.target.checked), "aria-label": task.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex-1 text-sm', task.done ? 'text-muted line-through' : 'text-on-surface'), children: [task.label, task.required ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-danger", children: " *" }) : null] })] }, task.id))) })] }));
});
//# sourceMappingURL=ServiceChecklist.js.map