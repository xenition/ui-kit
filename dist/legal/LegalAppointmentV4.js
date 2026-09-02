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
exports.LegalAppointmentV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LegalAppointment — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a scheduled appointment: an elevated rounded
 * card with a soft shadow, a leading soft-primary date-glyph block, the date +
 * time, type + status pills (each a glyph + word so state never rests on color
 * alone), and optional location / client. When `actionable` and still
 * `scheduled`, a confirm/cancel row of real `<button>`s is shown. When `onClick`
 * is set the card is a keyboard-activable `role="button"`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
exports.LegalAppointmentV4 = React.forwardRef(function LegalAppointmentV4({ type, date, time, location, client, status = 'scheduled', variant = 'default', actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const typeMeta = internal_1.APPOINTMENT_TYPE_META[type];
    const showActions = actionable && status === 'scheduled';
    const cancelled = status === 'cancelled';
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-legal-appointment": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${typeMeta.label} on ${date}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-md)]', cancelled && 'opacity-60', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: date }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: time }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], variant: "soft", size: "sm" }) : null] }), !compact && (location || client) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [location, client].filter(Boolean).join(' · ') })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]", children: [onConfirm ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                                    e.stopPropagation();
                                    onConfirm();
                                }, children: "Confirm" })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: (e) => {
                                    e.stopPropagation();
                                    onCancel();
                                }, children: "Cancel" })) : null] })) : null] })] }));
});
//# sourceMappingURL=LegalAppointmentV4.js.map