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
exports.CivicAppointmentV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const STATUS = {
    scheduled: { label: 'Scheduled', tone: 'primary', terminal: false }, confirmed: { label: 'Confirmed', tone: 'success', terminal: false }, 'checked-in': { label: 'Checked in', tone: 'accent', terminal: false }, completed: { label: 'Completed', tone: 'neutral', terminal: true }, cancelled: { label: 'Cancelled', tone: 'danger', terminal: true }, 'no-show': { label: 'No-show', tone: 'warn', terminal: true },
};
/**
 * CivicAppointment, redesigned (v2): an **elevated appointment card**. A primary-
 * tinted date/time medallion leads the service/office; a status badge and a
 * reference chip sit on the header, and Check in/Reschedule anchor the card.
 * Distinct from v1. Same props, token-only.
 */
exports.CivicAppointmentV2 = React.forwardRef(function CivicAppointmentV2({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, className, ...rest }, ref) {
    const st = STATUS[status];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-civic-appointment": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-20 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: date }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: service }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: office }), location ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDCCD ", location] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: st.tone, children: st.label }), reference ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface", children: reference }) : null] })] }), !st.terminal && (onCheckIn || onReschedule) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onCheckIn ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onCheckIn, children: "Check in" }) : null, onReschedule ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onReschedule, children: "Reschedule" }) : null] })) : null] }));
});
//# sourceMappingURL=CivicAppointmentV2.js.map