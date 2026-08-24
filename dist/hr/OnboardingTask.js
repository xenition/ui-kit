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
exports.OnboardingTask = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A single onboarding checklist item: a checkbox, title, category, and status
 * pill (glyph + word — `blocked` reads danger, `done` success, never color
 * alone). Overdue tasks are called out with a word. Toggling the checkbox fires
 * `onToggle(next)` for optimistic completion. When `onClick` is set the title
 * becomes a real `<button>` (kept out of the checkbox so no interactive nests in
 * another). `compact` drops the category / assignee meta. All colors are
 * `--xen-*` token classes — no literals. `forwardRef` to the root `<div>`.
 */
exports.OnboardingTask = React.forwardRef(function OnboardingTask({ title, category, status = 'todo', dueDate, overdue = false, assignee, assigneeAvatarUrl, variant = 'default', onToggle, onClick, className, }, ref) {
    const compact = variant === 'compact';
    const done = status === 'done';
    const meta = [category, dueDate ? `Due ${dueDate}` : null].filter(Boolean).join('  ·  ');
    const titleClasses = (0, cn_1.cn)('text-left text-sm font-semibold', done ? 'text-muted line-through' : 'text-on-surface');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-start gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "pt-0.5", children: (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onChange: (e) => onToggle?.(e.target.checked), "aria-label": `${done ? 'Mark incomplete' : 'Mark complete'}: ${title}` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 space-y-1", children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, className: (0, cn_1.cn)(titleClasses, 'block w-full truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), children: title })) : ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)(titleClasses, 'line-clamp-2'), children: title })), !compact && meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TASK_STATUS_META[status], size: "sm" }), overdue && !done ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT_CLASS.danger), children: "\u26A0 Overdue" })) : null, !compact && assignee ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: assignee, src: assigneeAvatarUrl }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: assignee })] })) : null] })] })] }));
});
//# sourceMappingURL=OnboardingTask.js.map