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
exports.LegalAppointmentV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LegalAppointment, redesigned (v2): an **elevated appointment card**. A tinted
 * date/time medallion leads the type pill, client and location; a status pill sits
 * on the header, and Confirm/Cancel anchor the card when actionable. Distinct from
 * v1. Same props, token-only.
 */
exports.LegalAppointmentV2 = React.forwardRef(function LegalAppointmentV2({ type, date, time, location, client, status = 'scheduled', variant, actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const showActions = actionable && status === 'scheduled';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-legal-appointment": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${internal_1.APPOINTMENT_TYPE_META[type].label} appointment`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-20 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: date }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-on-surface", children: time }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_TYPE_META[type], variant: "soft", size: "sm" }), client ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 truncate text-sm font-semibold text-on-surface", children: client }) : null, location ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDCCD ", location] }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], size: "sm" })] }), showActions && (onConfirm || onCancel) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onConfirm ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: (e) => { e.stopPropagation(); onConfirm(); }, children: "Confirm" }) : null, onCancel ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: (e) => { e.stopPropagation(); onCancel(); }, children: "Cancel" }) : null] })) : null] }));
});
//# sourceMappingURL=LegalAppointmentV2.js.map