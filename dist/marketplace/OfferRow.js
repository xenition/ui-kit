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
exports.OfferRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS_TONE = {
    pending: 'warn',
    accepted: 'success',
    declined: 'danger',
    countered: 'primary',
    expired: 'neutral',
};
const STATUS_LABEL = {
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
    countered: 'Countered',
    expired: 'Expired',
};
/**
 * A row in an offers list on a listing — buyer, offered amount, a status chip,
 * an optional note, and Accept / Counter / Decline actions (real `<button>`s,
 * shown only while the offer is `pending`). Presentational: shaped data +
 * callbacks only. Status is carried by both the chip label and tone, never color
 * alone. Reuses `Avatar`, `Badge`, `Button`, and the shared `formatMoney`;
 * token-only colors.
 */
exports.OfferRow = React.forwardRef(function OfferRow({ party, amountCents, currency = 'USD', avatarUrl, status = 'pending', timeLabel, note, onAccept, onDecline, onCounter, className, ...rest }, ref) {
    const tone = STATUS_TONE[status] ?? 'neutral';
    const statusLabel = STATUS_LABEL[status] ?? String(status);
    const showActions = status === 'pending' && (onAccept || onDecline || onCounter);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: party, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-base font-semibold text-on-surface", children: party }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, children: statusLabel })] }), timeLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timeLabel }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, commerce_1.formatMoney)(amountCents, currency) })] }), note ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-muted", children: note }) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: onAccept, className: "flex-1", children: "Accept" })) : null, onCounter ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: onCounter, className: "flex-1", children: "Counter" })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "danger", size: "sm", onClick: onDecline, className: "flex-1", children: "Decline" })) : null] })) : null] }));
});
//# sourceMappingURL=OfferRow.js.map