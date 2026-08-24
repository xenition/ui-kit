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
exports.AppointmentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
const MODE_META = {
    'in-person': { glyph: '🏥', label: 'In person' },
    video: { glyph: '📹', label: 'Video visit' },
    phone: { glyph: '📞', label: 'Phone call' },
};
/**
 * A single appointment summary card for clinical / telehealth schedules — the
 * web (React DOM) mirror of the native `AppointmentCard`. Shows clinician
 * identity, a date-time strip, a delivery-mode chip (in-person / video /
 * phone), a status badge, and one dominant action. For a `video` appointment
 * the CTA reads "Join call"; otherwise "Book" (a completed / cancelled state
 * hides the actions). Status is carried by text + badge, never color alone.
 * Composes `Card`, `Avatar`, `Badge`, and `Button`; every color is a `--xen-*`
 * token class. Informational UI only — not a medical device.
 */
exports.AppointmentCard = React.forwardRef(function AppointmentCard({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, className, ...rest }, ref) {
    const statusMeta = STATUS_META[status] ?? STATUS_META.upcoming;
    const modeMeta = MODE_META[mode] ?? MODE_META['in-person'];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-appointment-card": "", "aria-label": "Loading appointment", "aria-busy": "true", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-10 w-full rounded-[var(--xen-radius-md)] bg-neutral-100" })] }));
    }
    const canAct = status === 'upcoming' || status === 'confirmed';
    const isVideo = mode === 'video';
    const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
    const a11y = `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-appointment-card": "", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: doctorAvatar, name: doctorName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: doctorName }), specialty ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: specialty }) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: statusMeta.tone, children: statusMeta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: modeMeta.glyph, size: "base" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: [date, " \u00B7 ", time] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: modeMeta.label })] }), location ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: ["\uD83D\uDCCD ", location] })) : null, canAct && (onBook || onReschedule) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onBook ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", className: "flex-1", onClick: () => onBook(), children: ctaLabel })) : null, onReschedule ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", className: "flex-1", onClick: () => onReschedule(), children: "Reschedule" })) : null] })) : null] }));
});
//# sourceMappingURL=AppointmentCard.js.map