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
exports.CivicAppointment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const STATUS = {
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
    'checked-in': { label: 'Checked in', glyph: '📍', tone: 'primary' },
    completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
    'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};
const TERMINAL = ['completed', 'cancelled', 'no-show'];
/**
 * A booked civic appointment card: service, office, date/time, and a status pill
 * conveyed by **text + glyph + color** (never color alone). Optional `onCheckIn`
 * / `onReschedule` actions (real `<button>`s) appear only for non-terminal
 * appointments. Token-bound throughout — no literal colors. Web parity of the
 * native `CivicAppointment`.
 */
exports.CivicAppointment = React.forwardRef(function CivicAppointment({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, className, ...rest }, ref) {
    const sd = STATUS[status] ?? STATUS.scheduled;
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCC5", size: "lg", color: "primary", "aria-label": "Appointment" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: service }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: office }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-semibold text-on-surface", children: [date, " \u00B7 ", time] }), location != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", location] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] }), reference != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["#", reference] }) : null] })] }), showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]", children: [onReschedule != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: onReschedule, children: "Reschedule" })) : null, onCheckIn != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: onCheckIn, children: "Check in" })) : null] })) : null] }));
});
//# sourceMappingURL=CivicAppointment.js.map