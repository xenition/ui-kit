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
exports.ChoreCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_META = {
    todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
    'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
    done: { glyph: '✅', label: 'Done', tone: 'success' },
    skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};
/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). The action stops propagation so it never
 * triggers the card's `onClick`. Renders a muted skeleton while `loading`.
 * Token-bound throughout — no literal colors.
 */
exports.ChoreCard = React.forwardRef(function ChoreCard({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.todo;
    const isDone = status === 'done';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-chore-card": "", "aria-label": "Loading chore", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" })] }) }));
    }
    const subParts = [assignee, due].filter((s) => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-chore-card": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "2xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-base font-bold text-on-surface', isDone && 'line-through'), children: title }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subParts.join(' · ') })) : null] }), typeof points === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `⭐ ${points}` }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex items-center justify-between gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: `${meta.glyph} ${meta.label}` }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                            e.stopPropagation();
                            onComplete();
                        }, children: "Mark done" })) : null] })] }));
});
//# sourceMappingURL=ChoreCard.js.map