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
exports.BookingCalendarV3 = void 0;
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
/**
 * BookingCalendar, redesigned (v3): a **compact upcoming-days list**. Instead of a
 * month grid it lists the next 30 days as hairline rows — weekday, date, and an
 * availability count (or "Full") — that select on tap. A scannable agenda, the
 * opposite of v1/v2's grid. Same props, token-only.
 */
exports.BookingCalendarV3 = React.forwardRef(function BookingCalendarV3({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn, locale, className, ...rest }, ref) {
    void view;
    void weekStartsOn;
    const map = React.useMemo(() => availabilityMap(slots, availability, timezone), [slots, availability, timezone]);
    const today = new Date();
    const days = Array.from({ length: 30 }, (_, i) => (0, datetime_1.addDays)(new Date(today.getFullYear(), today.getMonth(), today.getDate()), i));
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    const wd = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const md = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-booking-calendar": "list", className: (0, cn_1.cn)('flex max-h-80 flex-col overflow-y-auto', className), ...rest, children: days.map((date) => {
            const key = (0, datetime_1.toDayKey)(date);
            const count = map.get(key) ?? 0;
            const selected = selectedKey === key;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-calendar-day": "", "aria-pressed": selected, "aria-label": `${date.toDateString()}${count > 0 ? `, ${count} available` : ', no availability'}`, disabled: count === 0, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors', selected ? 'bg-primary/10' : count > 0 ? 'hover:bg-neutral-50' : 'opacity-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "w-10 text-center", children: (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: wd.format(date) }) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-medium text-on-surface", children: md.format(date) }), count > 0 ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-primary", children: [count, " open"] }) : (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Full" })] }, key));
        }) }));
});
//# sourceMappingURL=BookingCalendarV3.js.map