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
exports.ChoreCardV2 = void 0;
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
 * ChoreCard, redesigned (v2): a **big tappable quest card**. The icon rides in a
 * large primary-tinted disc up top, the title is oversized, the reward points
 * are a hero star chip, and "Mark done" is a full-width primary button anchoring
 * the card. Elevated with a shadow that lifts on hover. Same props as
 * {@link ChoreCard}, token-only.
 */
exports.ChoreCardV2 = React.forwardRef(function ChoreCardV2({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.todo;
    const isDone = status === 'done';
    const interactive = typeof onClick === 'function';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-chore-card": "", "aria-label": "Loading chore", className: (0, cn_1.cn)('flex flex-col items-center gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-9 w-full animate-pulse rounded-md bg-neutral-200" })] }));
    }
    const subParts = [assignee, due].filter((s) => !!s);
    const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-chore-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-lg bg-surface p-md text-center shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "2xl" }), typeof points === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-xs font-bold text-on-primary", children: `⭐${points}` })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-lg font-bold text-on-surface', isDone && 'line-through'), children: title }), subParts.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: subParts.join(' · ') }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: `${meta.glyph} ${meta.label}` }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", onClick: (e) => {
                    e.stopPropagation();
                    onComplete();
                }, children: "Mark done" })) : null] }));
});
//# sourceMappingURL=ChoreCardV2.js.map