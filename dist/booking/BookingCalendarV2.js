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
exports.BookingCalendarV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
function availabilityMap(slots, availability, timezone) {
    const map = new Map();
    if (availability) {
        for (const a of availability)
            map.set(a.date, a.count);
        return map;
    }
    for (const s of slots ?? []) {
        if (s.spotsLeft <= 0)
            continue;
        const k = (0, datetime_1.dayKeyInTz)(s.startsAt, timezone);
        map.set(k, (map.get(k) ?? 0) + 1);
    }
    return map;
}
function weekdayLabels(weekStartsOn, locale) {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const base = Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2023, 0, 1 + i))); // Jan 1 2023 = Sunday
    return [...base.slice(weekStartsOn), ...base.slice(0, weekStartsOn)];
}
/**
 * BookingCalendar, redesigned (v2): a **spacious availability calendar**. Larger
 * rounded day tiles print an "N open" count (not just a dot) beneath the date, the
 * selected day fills primary, and the month nav is chunkier. Distinct from v1's
 * compact grid. Same props, token-only.
 */
exports.BookingCalendarV2 = React.forwardRef(function BookingCalendarV2({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn = 0, locale, className, ...rest }, ref) {
    void view;
    const map = React.useMemo(() => availabilityMap(slots, availability, timezone), [slots, availability, timezone]);
    const anchor = selectedDate ?? new Date();
    const [viewDate, setViewDate] = React.useState(() => (0, datetime_1.startOfMonth)(anchor));
    const weeks = (0, datetime_1.monthMatrix)(viewDate, weekStartsOn);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate);
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    const shift = (m) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + m, 1));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-calendar": "month", className: (0, cn_1.cn)('inline-flex flex-col gap-2 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => shift(-1), className: "flex h-9 w-9 items-center justify-center rounded-full text-on-surface hover:bg-neutral-100", children: "\u2039" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: monthLabel }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => shift(1), className: "flex h-9 w-9 items-center justify-center rounded-full text-on-surface hover:bg-neutral-100", children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: labels.map((l) => (0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "py-1 text-center text-xs font-medium text-muted", children: l }, l)) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7 gap-1", children: row.map((date) => {
                            const key = (0, datetime_1.toDayKey)(date);
                            const inMonth = date.getMonth() === viewDate.getMonth();
                            const count = map.get(key) ?? 0;
                            const selected = selectedKey === key;
                            return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-calendar-day": "", "aria-pressed": selected, "aria-label": `${date.toDateString()}${count > 0 ? ', available' : ', no availability'}`, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex h-12 w-full flex-col items-center justify-center rounded-md text-sm transition-colors', !inMonth && 'text-muted', selected ? 'bg-primary text-on-primary' : count > 0 ? 'bg-primary/5 font-semibold text-on-surface hover:bg-primary/10' : 'text-on-surface hover:bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { children: date.getDate() }), count > 0 ? (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-[9px]', selected ? 'text-on-primary' : 'text-primary'), children: [count, " open"] }) : null] }) }, key));
                        }) }, wi)))] })] }));
});
//# sourceMappingURL=BookingCalendarV2.js.map