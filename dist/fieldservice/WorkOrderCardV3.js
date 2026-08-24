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
exports.WorkOrderCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};
const PRIORITY_GLYPH = {
    low: { glyph: '↓', label: 'Low' },
    medium: { glyph: '=', label: 'Medium' },
    high: { glyph: '↑', label: 'High' },
    emergency: { glyph: '!', label: 'Emergency' },
};
/** Solid token dot color per status slot. */
const DOT_BG = {
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    accent: 'bg-accent',
    muted: 'bg-neutral-400',
};
exports.WorkOrderCardV3 = React.forwardRef(function WorkOrderCardV3({ workOrderNumber, title, status, priority, assignee, site, glyph = '🔧', loading = false, onClick, className, style }, ref) {
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY_GLYPH[priority] : undefined;
    const rowBase = 'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, "aria-label": "Loading work order", className: (0, cn_1.cn)(rowBase, className), children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("span", { className: "h-3 flex-1 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    const interactive = onClick != null;
    const subtitle = [workOrderNumber, pd ? `${pd.glyph} ${pd.label}` : null, site, assignee]
        .filter(Boolean)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
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
            : {}), className: (0, cn_1.cn)(rowBase, interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-base", "aria-hidden": "true", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', DOT_BG[sd.slot]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
});
//# sourceMappingURL=WorkOrderCardV3.js.map