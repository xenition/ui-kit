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
exports.WorkOrderCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};
const PRIORITY = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral', slot: 'muted' },
    medium: { label: 'Medium', glyph: '=', tone: 'primary', slot: 'primary' },
    high: { label: 'High', glyph: '↑', tone: 'warn', slot: 'warn' },
    emergency: { label: 'Emergency', glyph: '!', tone: 'danger', slot: 'danger' },
};
/** Solid token rail color per status slot. */
const RAIL_BG = {
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    accent: 'bg-accent',
    muted: 'bg-neutral-400',
};
exports.WorkOrderCardV2 = React.forwardRef(function WorkOrderCardV2({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onClick, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, padding: "none", className: (0, cn_1.cn)('flex overflow-hidden', className), style: style, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-1.5 shrink-0 bg-neutral-300" }), (0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading work order", className: "flex flex-1 items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 48, height: 48 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "70%", height: 16 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "40%", height: 10 })] })] })] }));
    }
    const interactive = onClick != null;
    const hasMeta = assignee != null || site != null || scheduledFor != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, style: style, variant: "elevated", padding: "none", className: (0, cn_1.cn)('flex overflow-hidden', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `Work order ${workOrderNumber}, ${title}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-1.5 shrink-0', RAIL_BG[sd.slot]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[sd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", "aria-label": "Work order" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-2xl font-extrabold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold uppercase tracking-wide text-muted", children: workOrderNumber })] }), pd ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pd.tone, variant: "soft", size: "sm", children: `${pd.glyph} ${pd.label}` }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` }) }), hasMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]", children: [site != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", site] }) : null, assignee != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDC77 ", assignee] }) : null, scheduledFor != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDD51 ", scheduledFor] }) : null] })) : null] })] }));
});
//# sourceMappingURL=WorkOrderCardV2.js.map