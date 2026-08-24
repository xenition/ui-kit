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
exports.VetAppointmentCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    today: { label: 'Today', tone: 'warn' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
const REASON_GLYPH = {
    checkup: '🩺', vaccination: '💉', surgery: '🔪', dental: '🦷', emergency: '🚑', grooming: '✂️', other: '🐾',
};
/**
 * VetAppointmentCard, redesigned (v2): an **elevated visit card**. A reason glyph
 * tile leads; the vet/clinic + pet name head the body next to a date/time block;
 * a status badge sits top-right; notes and confirm/cancel actions anchor the
 * card. Distinct from v1's row. Same props, token-only.
 */
exports.VetAppointmentCardV2 = React.forwardRef(function VetAppointmentCardV2({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel, onAction, onCancel, className }, ref) {
    const st = STATUS[status];
    const closed = status === 'completed' || status === 'cancelled';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vet-appointment-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl", children: REASON_GLYPH[reason] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: vetName }), clinic ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: clinic }) : null, petName ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["For ", petName] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs font-semibold text-on-surface", children: date }), time ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: time }) : null] })] }), notes ? (0, jsx_runtime_1.jsx)("p", { className: "rounded-md bg-neutral-100 px-3 py-2 text-xs text-on-surface", children: notes }) : null, !closed && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onAction, children: actionLabel ?? 'Confirm' })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onCancel, children: "Cancel" })) : null] })) : null] }));
});
//# sourceMappingURL=VetAppointmentCardV2.js.map