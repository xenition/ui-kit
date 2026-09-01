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
exports.OrderTicketV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
const NEXT_LABEL = {
    new: 'Start',
    preparing: 'Ready',
    ready: 'Serve',
    served: 'Done',
    void: 'Void',
};
/**
 * OrderTicket — **V4** "register" design (web parity of the native V4). A crisp
 * kitchen/order ticket for fast scanning: a **bold order number**, a
 * **glyph + word** status pill (state by icon + label, never color alone), the
 * item list with modifiers and notes (completed lines struck + muted), and the
 * elapsed time. When `onClick` is set the whole card is a keyboard-operable
 * `role="button"`; an optional bump button advances the ticket. Same
 * props/behavior as {@link OrderTicketProps}; composed from `Card` + `Button` +
 * `StatusPill`, all colors from `--xen-*` token classes (no literals).
 */
exports.OrderTicketV4 = React.forwardRef(function OrderTicketV4({ orderNumber, destination, server, status, elapsed, items, onBump, bumpLabel, variant = 'default', emptyLabel = 'No items on this ticket', testID, onClick, onKeyDown, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-order-ticket": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive
            ? `Ticket ${orderNumber}${status ? `, ${internal_1.TICKET_STATUS_META[status].label}` : ''}`
            : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)]', compact ? 'p-[var(--xen-space-sm)]' : 'p-[var(--xen-space-md)]', interactive
            ? 'cursor-pointer transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[0.99]'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-extrabold tabular-nums text-on-surface", children: ["#", orderNumber, destination ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-normal text-muted", children: `  ${destination}` }) : null] }), server || elapsed ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted", children: [server, elapsed].filter(Boolean).join(' · ') })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TICKET_STATUS_META[status], variant: "soft", size: "sm" }) : null] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5', item.done ? 'opacity-60' : ''), children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', item.done ? 'text-muted line-through' : 'text-on-surface'), children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.modifiers && item.modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: item.modifiers.join(' · ') })) : null, !compact && item.note ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-warn", children: ["\u26A0 ", item.note] })) : null] }, i));
                }) })), onBump ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", onClick: (e) => {
                    e.stopPropagation();
                    onBump();
                }, className: "self-start", children: bumpLabel ?? (status ? NEXT_LABEL[status] : 'Bump') })) : null] }));
});
//# sourceMappingURL=OrderTicketV4.js.map