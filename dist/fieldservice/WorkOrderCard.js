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
exports.WorkOrderCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const WORK_ORDER_STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
const PRIORITY = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral' },
    medium: { label: 'Medium', glyph: '=', tone: 'primary' },
    high: { label: 'High', glyph: '↑', tone: 'warn' },
    emergency: { label: 'Emergency', glyph: '!', tone: 'danger' },
};
/**
 * A summary card for a single field-service work order. A tinted leading trade
 * glyph disc, a title/number stack, a status pill (text + glyph + a color that
 * traces to a semantic token — never color alone), an optional priority pill,
 * and assignee / site / schedule meta. Becomes a `role="button"` surface
 * (click / Enter / Space) only when `onClick` is supplied. Renders a `Skeleton`
 * while `loading`. Every color traces to a `--xen-*` token — no literals.
 */
exports.WorkOrderCard = React.forwardRef(function WorkOrderCard({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onClick, className, style, }, ref) {
    const sd = WORK_ORDER_STATUS[status] ?? WORK_ORDER_STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading work order", className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 44, height: 44 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "70%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "40%", height: 10 })] })] }) }));
    }
    const interactive = onClick != null;
    const hasMeta = assignee != null || site != null || scheduledFor != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, style: style, ...(interactive
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
            : {}), className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-shadow hover:shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT.primary), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", "aria-label": "Work order" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-lg font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: workOrderNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` }), pd ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pd.tone, children: `${pd.glyph} ${pd.label}` }) : null] })] }), hasMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]", children: [site != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", site] }) : null, assignee != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDC77 ", assignee] }) : null, scheduledFor != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDD51 ", scheduledFor] }) : null] })) : null] }));
});
//# sourceMappingURL=WorkOrderCard.js.map