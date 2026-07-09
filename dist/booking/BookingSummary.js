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
exports.BookingSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
const defaultFormatDate = (iso, timeZone) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '';
    return new Intl.DateTimeFormat(undefined, {
        timeZone,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(d);
};
/**
 * Read-only recap of a chosen resource + slot: who/what, the date, the time
 * range, and the timezone. Token-only. Pairs with a `BookingCalendar` +
 * `SlotPicker` flow as the confirmation step.
 */
exports.BookingSummary = React.forwardRef(function BookingSummary({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-[var(--xen-space-md)] text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-right text-on-surface", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [resource ? line('With', resource.name, 'resource') : null, slot ? line('Date', fmtDate(slot.startsAt), 'date') : null, slot
                        ? line('Time', `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
                        : null, resource?.slotMinutes
                        ? line('Duration', `${resource.slotMinutes} min`, 'duration')
                        : null, tz ? line('Timezone', tz, 'tz') : null, !slot && !resource ? ((0, jsx_runtime_1.jsx)("p", { "data-xen-booking-empty": "", className: "text-sm text-muted", children: "Nothing selected yet." })) : null] }), action ? (0, jsx_runtime_1.jsx)("div", { children: action }) : null] }));
});
//# sourceMappingURL=BookingSummary.js.map