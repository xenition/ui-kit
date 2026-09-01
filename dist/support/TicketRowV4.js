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
exports.TicketRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const TicketPriority_1 = require("./TicketPriority");
const internal_1 = require("./internal");
// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is never color-only.
const STATUS = {
    open: { glyph: '◉', label: 'Open', bar: 'bg-primary', pill: 'bg-primary/10 text-primary' },
    pending: { glyph: '◐', label: 'Pending', bar: 'bg-warn', pill: 'bg-warn/10 text-warn' },
    solved: { glyph: '✓', label: 'Solved', bar: 'bg-success', pill: 'bg-success/10 text-success' },
    closed: { glyph: '✕', label: 'Closed', bar: 'bg-muted', pill: 'bg-muted/10 text-muted' },
};
/**
 * TicketRow — **V4** "console" design (web parity of the native V4). The
 * calm-workspace take on a queue row: an elevated rounded card with a left
 * status-accent bar (the signature at-a-glance cue) and a soft-tint status pill
 * carrying glyph + label. Requester avatar, subject, optional priority chip,
 * updated hint, and an unread badge. Status is encoded by glyph **and** color
 * (never color alone). Same props/behavior as {@link TicketRowProps}; all colors
 * from `--xen-*` token classes (no literal hex). Supports a `loading` skeleton
 * and a `selected` state.
 */
exports.TicketRowV4 = React.forwardRef(function TicketRowV4({ ticket, onClick, loading = false, selected = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading ticket", "aria-busy": "true", className: (0, cn_1.cn)('flex animate-pulse overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-1 shrink-0 bg-on-surface/10" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 items-center gap-3 p-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-10 w-10 shrink-0 rounded-full bg-on-surface/10" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-3 w-[70%] rounded bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-[40%] rounded bg-on-surface/10" })] })] })] }));
    }
    const spec = STATUS[ticket.status] ?? STATUS.open;
    const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick(ticket.id) : undefined;
    const a11y = `Ticket: ${ticket.subject}, ${spec.label}${ticket.requester ? `, from ${ticket.requester}` : ''}${unread ? `, ${unread} unread` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? a11y : undefined, "aria-selected": selected, onClick: activate, onKeyDown: activate ? (0, internal_1.activateOnKey)(activate) : undefined, className: (0, cn_1.cn)('flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-left shadow-sm', interactive && 'cursor-pointer hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected && 'bg-primary/10', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-1 shrink-0', spec.bar), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 items-center gap-3 p-3", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "md", name: ticket.requester, src: ticket.requesterAvatar }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: ticket.subject }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold', spec.pill), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }), spec.label] }), ticket.priority ? (0, jsx_runtime_1.jsx)(TicketPriority_1.TicketPriority, { level: ticket.priority, size: "sm" }) : null, ticket.updatedLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: ticket.updatedLabel }) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", "aria-hidden": "true", children: unread > 99 ? '99+' : unread })) : null] })] }));
});
//# sourceMappingURL=TicketRowV4.js.map