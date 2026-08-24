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
exports.VetAppointmentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
    today: { label: 'Today', tone: 'warn', slot: 'warn' },
    completed: { label: 'Completed', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', tone: 'neutral', slot: 'muted' },
};
const REASON_GLYPH = {
    checkup: '🩺',
    vaccination: '💉',
    surgery: '🔪',
    dental: '🦷',
    emergency: '🚑',
    grooming: '✂️',
    other: '📋',
};
/**
 * A vet-visit card: reason icon, vet + clinic, the scheduled date/time, and a
 * status chip. Open visits (`upcoming`/`today`) expose confirm + cancel actions;
 * `completed`/`cancelled` visits are read-only. Status reads via a labelled chip
 * plus a top accent bar. Token-only colors.
 */
exports.VetAppointmentCard = React.forwardRef(function VetAppointmentCard({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, className }, ref) {
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border border-t-[3px] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', _tokens_1.SLOT_BORDER_T[meta.slot], status === 'cancelled' && 'opacity-70', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": "true", children: REASON_GLYPH[reason] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: vetName }), clinic ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: clinic }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-base font-semibold text-on-surface", children: ["\uD83D\uDCC5 ", date, time ? ` · ${time}` : ''] }), petName ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted", children: ["For ", petName] }) : null, notes ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-muted", children: notes }) : null, open && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", className: "flex-1", onClick: onAction, children: actionLabel })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", onClick: onCancel, children: "Cancel" })) : null] })) : null] }));
});
//# sourceMappingURL=VetAppointmentCard.js.map