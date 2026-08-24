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
exports.AppointmentCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
const MODE = {
    'in-person': { glyph: '🏥', label: 'In person' },
    video: { glyph: '📹', label: 'Video' },
    phone: { glyph: '📞', label: 'Phone' },
};
/**
 * AppointmentCard, redesigned (v2): an **elevated card with a date medallion**. A
 * primary-tinted date/time block leads on the left; the clinician avatar, name,
 * specialty, mode chip, and status badge sit to the right, with Book/Reschedule
 * anchoring the card. Distinct from v1's stacked row. Same props, token-only.
 */
exports.AppointmentCardV2 = React.forwardRef(function AppointmentCardV2({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-appointment-card": "", "aria-label": "Loading appointment", className: (0, cn_1.cn)('flex gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 animate-pulse rounded-md bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded-sm bg-neutral-200" })] })] }));
    }
    const st = STATUS[status];
    const md = MODE[mode];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-appointment-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: date }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: doctorAvatar, name: doctorName, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: doctorName }), specialty ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: specialty }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [md.glyph, " ", md.label] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label })] }), location ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 truncate text-xs text-muted", children: ["\uD83D\uDCCD ", location] }) : null] })] }), (onBook || onReschedule) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onBook, children: bookLabel ?? (mode === 'video' ? 'Join' : 'Book') })) : null, onReschedule ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onReschedule, children: "Reschedule" })) : null] })) : null] }));
});
//# sourceMappingURL=AppointmentCardV2.js.map