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
exports.NextStepRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const PRIORITY_META = {
    low: { glyph: '↓', label: 'Low' },
    normal: { glyph: '•', label: 'Normal' },
    high: { glyph: '↑', label: 'High' },
};
/**
 * A single "next step" / task row for a deal or contact: a toggleable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `text-danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are `--xen-*` token
 * classes.
 */
exports.NextStepRow = React.forwardRef(function NextStepRow({ title, dueDate, overdue = false, done = false, assignee, priority, onToggle, onClick, className, ...rest }, ref) {
    const prio = priority ? PRIORITY_META[priority] : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": `${done ? 'Completed' : 'Mark complete'}: ${title}`, disabled: !onToggle, onClick: () => onToggle?.(!done), className: (0, cn_1.cn)('flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none', done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'), children: done ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-black", children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, disabled: !onClick, onClick: onClick, className: "min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold', done ? 'text-muted line-through' : 'text-on-surface'), children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [prio ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: `${prio.glyph} ${prio.label}` })) : null, assignee ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: assignee }) : null, overdue ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger", children: `⚠ Overdue${dueDate ? ` · ${dueDate}` : ''}` })) : dueDate ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: dueDate })) : null] })] })] }));
});
//# sourceMappingURL=NextStepRow.js.map