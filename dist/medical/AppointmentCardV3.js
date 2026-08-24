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
exports.AppointmentCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_DOT = {
    upcoming: 'bg-primary',
    confirmed: 'bg-success',
    completed: 'bg-neutral-400',
    cancelled: 'bg-danger',
};
const STATUS_LABEL = {
    upcoming: 'Upcoming',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
};
const MODE_GLYPH = { 'in-person': '🏥', video: '📹', phone: '📞' };
/**
 * AppointmentCard, redesigned (v3): a **dense agenda line**. A mode glyph leads,
 * the clinician + date·time share a line over a specialty·location subtitle, a
 * status dot + word marks state (never color alone), and a compact CTA hugs the
 * right. Hairline-bordered for schedule lists. Same props, token-only.
 */
exports.AppointmentCardV3 = React.forwardRef(function AppointmentCardV3({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, className, ...rest }, ref) {
    void doctorAvatar;
    void onReschedule;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-appointment-card": "", "aria-label": "Loading appointment", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" }) }));
    }
    const sub = [specialty, location].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-appointment-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg leading-none", children: MODE_GLYPH[mode] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [doctorName, " \u00B7 ", (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [date, " ", time] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1.5 truncate text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 rounded-full', STATUS_DOT[status]), "aria-hidden": true }), STATUS_LABEL[status], sub.length > 0 ? ` · ${sub.join(' · ')}` : ''] })] }), onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onBook, children: bookLabel ?? (mode === 'video' ? 'Join' : 'Book') })) : null] }));
});
//# sourceMappingURL=AppointmentCardV3.js.map