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
exports.TicketRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const TicketPriority_1 = require("./TicketPriority");
const internal_1 = require("./internal");
const STATUS_DOT = { open: 'bg-primary', pending: 'bg-warn', solved: 'bg-success', closed: 'bg-neutral-400' };
const STATUS_LABEL = { open: 'Open', pending: 'Pending', solved: 'Solved', closed: 'Closed' };
/**
 * TicketRow, redesigned (v3): a **dense queue line**. A status dot leads, the
 * subject over a requester·updated subtitle, a compact priority glyph and an
 * unread badge trail — hairline-bordered for a tight queue. The opposite of v2's
 * card. Status is dot + word, never color alone. Same props, token-only.
 */
exports.TicketRowV3 = React.forwardRef(function TicketRowV3({ ticket, onClick, loading = false, selected = false, className, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-ticket-row": "", "aria-label": "Loading ticket", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const interactive = typeof onClick === 'function';
    const sub = [STATUS_LABEL[ticket.status], ticket.requester, ticket.updatedLabel].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ticket-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-selected": selected || undefined, "aria-label": `${ticket.subject}, ${STATUS_LABEL[ticket.status]}`, onClick: interactive ? () => onClick?.(ticket.id) : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.(ticket.id)) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', selected && 'bg-primary/5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[ticket.status]), "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: ticket.subject }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), ticket.priority ? (0, jsx_runtime_1.jsx)(TicketPriority_1.TicketPriority, { level: ticket.priority, size: "sm", hideLabel: true }) : null, ticket.unread && ticket.unread > 0 ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: ticket.unread }) : null] }));
});
//# sourceMappingURL=TicketRowV3.js.map