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
exports.ProjectCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ProjectCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a project summary: a clean, softly-elevated
 * {@link Card} with a legible title, one **primary** progress track (which
 * settles into a **soft-success glow** at 100%), an {@link AssigneeGroup},
 * task-count meta, and an optional {@link DueDatePill}. A hairline primary
 * accent edge is the only flourish. Same props/behavior as
 * {@link ProjectCardProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
exports.ProjectCardV4 = React.forwardRef(function ProjectCardV4({ title, description, progress, taskCount, assignees = [], dueLabel, dueTone = 'upcoming', onClick, className, }, ref) {
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    const complete = pct != null && pct >= 100;
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border-l-[3px] border-l-primary shadow-sm transition-colors', complete ? 'bg-success/[0.08]' : 'bg-surface'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold leading-snug text-on-surface", children: title }), description ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: description }) : null] }), pct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: complete ? 'success' : 'primary', size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${pct}% complete${typeof taskCount === 'number' ? ` · ${taskCount} tasks` : ''}` })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees }), dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] })] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": title, onClick: onClick, className: (0, cn_1.cn)('block w-full text-left transition-opacity hover:opacity-90', className), children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: inner }));
});
//# sourceMappingURL=ProjectCardV4.js.map