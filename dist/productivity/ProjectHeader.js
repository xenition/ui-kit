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
exports.ProjectHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_META = {
    'on-track': { glyph: '🟢', label: 'On track' },
    'at-risk': { glyph: '🟡', label: 'At risk' },
    'off-track': { glyph: '🔴', label: 'Off track' },
    done: { glyph: '✓', label: 'Done' },
};
/**
 * ProjectHeader — the project-detail hero for the productivity **V4 "flow"** line.
 * A brand-gradient panel that opens a project workspace: the near-white project
 * name + description, a near-white progress bar with its numeral, frosted stat
 * tiles (done/total, due), an overlapping member avatar stack, and a frosted
 * status pill. "Add task" (a near-white `bg-on-primary` pill) and a ghost
 * settings button each appear only when their handler is set. Presentational —
 * shaped data + callbacks, nothing fetches. Every color derives from the brand
 * ramp via `--xen-*` token classes and gradient utilities — no literals, light +
 * dark.
 */
exports.ProjectHeader = React.forwardRef(function ProjectHeader({ name, description, progressPct, taskCounts, members, dueLabel, status, onAddTask, onSettings, className, ...rest }, ref) {
    const pct = Math.max(0, Math.min(100, Math.round(progressPct || 0)));
    const shown = members?.slice(0, 5) ?? [];
    const overflow = (members?.length ?? 0) - shown.length;
    const statusMeta = status ? STATUS_META[status] : null;
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-primary-50", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "min-w-0 truncate text-2xl font-extrabold tracking-tight text-primary-50", children: name }), statusMeta ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: statusMeta.glyph, size: "xs", "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-primary-50", children: statusMeta.label })] })) : null] }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] line-clamp-2 text-sm text-primary-100", children: description })) : null] }), onSettings ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Project settings", onClick: onSettings, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2699\uFE0F", size: "lg", "aria-hidden": true }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: "Progress" }), (0, jsx_runtime_1.jsxs)("span", { "aria-hidden": true, className: "text-sm font-bold text-primary-50", children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-label": `Progress ${pct}%`, className: "mt-[var(--xen-space-xs)] h-2 w-full overflow-hidden rounded-full bg-primary-50/15", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary-50", style: { width: `${pct}%` } }) })] }), taskCounts || dueLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [taskCounts ? ((0, jsx_runtime_1.jsx)(Tile, { label: "Tasks", value: `${taskCounts.done} / ${taskCounts.total}` })) : null, dueLabel ? (0, jsx_runtime_1.jsx)(Tile, { label: "Due", value: dueLabel }) : null] })) : null, shown.length > 0 || onAddTask ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [shown.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", "aria-label": `${members?.length} members`, children: [shown.map((m, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: m.avatarUrl, name: m.name, alt: m.name, size: "sm", className: (0, cn_1.cn)('ring-2 ring-primary-600', i > 0 && '-ml-2') }, `${m.name}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "-ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-xs font-bold text-primary-50 ring-2 ring-primary-600", children: `+${overflow}` })) : null] })) : ((0, jsx_runtime_1.jsx)("span", {})), onAddTask ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Add task", onClick: onAddTask, className: "inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-on-primary px-[var(--xen-space-lg)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", size: "base", color: "primary", "aria-hidden": true }), "Add task"] })) : null] })) : null] }));
});
//# sourceMappingURL=ProjectHeader.js.map