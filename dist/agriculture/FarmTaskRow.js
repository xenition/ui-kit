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
exports.FarmTaskRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PRIORITY_META = {
    low: { label: 'Low', tone: 'neutral' },
    normal: { label: 'Normal', tone: 'primary' },
    high: { label: 'High', tone: 'warn' },
    urgent: { label: 'Urgent', tone: 'danger' },
};
/**
 * A farm task row — a tappable check control (a themed checkbox `<button>` whose
 * a11y `checked` state carries completion, not color), the task title (struck +
 * muted when done), due / field / assignee meta, and a priority {@link Badge}
 * stated as text. `overdue` adds a text chip and colors the due line so urgency
 * reads without color. Toggling the check fires `onToggle(next)`; activating the
 * body fires `onClick`. Token-bound throughout — no literal colors.
 */
exports.FarmTaskRow = React.forwardRef(function FarmTaskRow({ title, done = false, due, priority = 'normal', field, assignee, icon = '✅', overdue = false, onToggle, onClick, last = false, className, ...rest }, ref) {
    const meta = PRIORITY_META[priority];
    const metaLine = [due, field, assignee].filter((s) => s != null && s !== '').join(' · ');
    const bodyInteractive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-farm-task-row": "", className: (0, cn_1.cn)('flex items-center gap-2 py-2', !last && 'border-b border-border', done && 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": `Mark ${title} ${done ? 'not done' : 'done'}`, onClick: () => onToggle?.(!done), className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2 transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', done ? 'border-success bg-success' : 'border-border bg-transparent'), children: done ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "onSuccess", "aria-label": "done" }) : null }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: bodyInteractive ? () => onClick?.() : undefined, disabled: !bodyInteractive, className: "min-w-0 flex-1 text-left disabled:cursor-default", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm font-semibold text-on-surface', done && 'line-through'), children: title })] }), metaLine !== '' ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-0.5 block truncate text-xs', overdue ? 'text-danger' : 'text-muted'), children: [overdue ? '⚠ Overdue · ' : '', metaLine] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label }), overdue ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", children: "Overdue" }) : null] })] }));
});
//# sourceMappingURL=FarmTaskRow.js.map