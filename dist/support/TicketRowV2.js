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
exports.TicketRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const TicketPriority_1 = require("./TicketPriority");
const internal_1 = require("./internal");
const STATUS = {
    open: { label: 'Open', tone: 'primary' },
    pending: { label: 'Pending', tone: 'warn' },
    solved: { label: 'Solved', tone: 'success' },
    closed: { label: 'Closed', tone: 'neutral' },
};
/**
 * TicketRow, redesigned (v2): an **elevated ticket card**. The requester avatar +
 * subject head the card, a status badge and priority chip sit on a meta row, and
 * the requester·updated line trails with an unread badge. Distinct from v1's row.
 * Same props, token-only.
 */
exports.TicketRowV2 = React.forwardRef(function TicketRowV2({ ticket, onClick, loading = false, selected = false, className, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-ticket-row": "", "aria-label": "Loading ticket", className: (0, cn_1.cn)('h-20 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const st = STATUS[ticket.status] ?? STATUS.open;
    const interactive = typeof onClick === 'function';
    const meta = [ticket.requester, ticket.updatedLabel].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ticket-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-selected": selected || undefined, "aria-label": `${ticket.subject}, ${st.label}`, onClick: interactive ? () => onClick?.(ticket.id) : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.(ticket.id)) : undefined, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', selected && 'ring-2 ring-primary', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: ticket.requesterAvatar, name: ticket.requester, size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 text-sm font-semibold text-on-surface", children: ticket.subject }), ticket.unread && ticket.unread > 0 ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: ticket.unread }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: st.tone, children: st.label }), ticket.priority ? (0, jsx_runtime_1.jsx)(TicketPriority_1.TicketPriority, { level: ticket.priority, size: "sm" }) : null, meta ? (0, jsx_runtime_1.jsx)("span", { className: "ml-auto truncate text-xs text-muted", children: meta }) : null] })] }));
});
//# sourceMappingURL=TicketRowV2.js.map