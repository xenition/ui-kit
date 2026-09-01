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
exports.VetAppointmentCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    today: { label: 'Today', tone: 'warn' },
    completed: { label: 'Completed', tone: 'success' },
    cancelled: { label: 'Cancelled', tone: 'neutral' },
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
 * VetAppointmentCard — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a vet visit: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the reason glyph in a soft-primary
 * tinted well, a bold vet name, muted meta lines (date/time/pet/clinic), a
 * labelled status Badge, and the notes shown as a soft-primary chip. Open visits
 * (`upcoming`/`today`) keep the confirm + cancel actions. Same props/behavior as
 * {@link VetAppointmentCardProps}; status + reason both read via glyph + labelled
 * chip (never color alone). All colors from `--xen-*` token classes (no literals).
 */
exports.VetAppointmentCardV4 = React.forwardRef(function VetAppointmentCardV4({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, className, variant = 'card' }, ref) {
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    const a11y = `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`;
    const glyphWell = (size) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full bg-primary/10', size), "aria-hidden": "true", children: REASON_GLYPH[reason] }));
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(meta.tone), variant: "soft", children: meta.label }));
    // ── compact ───────────────────────────────────────────────────────────────
    if (variant === 'compact') {
        const metaLine = clinic || (petName ? `For ${petName}` : undefined);
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md', status === 'cancelled' && 'opacity-70', className), children: [glyphWell('h-9 w-9 text-lg'), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: vetName }), metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: metaLine }) : null] }), statusBadge, (0, jsx_runtime_1.jsx)("p", { className: "shrink-0 text-sm font-semibold text-on-surface", children: time ? time : date })] }));
    }
    // ── card (default) ─────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', status === 'cancelled' && 'opacity-70', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [glyphWell('h-11 w-11 text-xl'), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: vetName }), clinic ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: ["\uD83D\uDCCD ", clinic] }) : null] }), statusBadge] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-base font-semibold text-on-surface", children: ["\uD83D\uDCC5 ", date, time ? ` · ${time}` : ''] }), petName ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted", children: ["For ", petName] }) : null, notes ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex max-w-full items-center self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface", children: (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-3", children: notes }) })) : null, open && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-sm)]", children: [onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", className: "flex-1", onClick: onAction, children: actionLabel })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", onClick: onCancel, children: "Cancel" })) : null] })) : null] }));
});
//# sourceMappingURL=VetAppointmentCardV4.js.map