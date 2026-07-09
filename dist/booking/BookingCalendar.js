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
exports.BookingCalendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
const WEEKDAY_KEYS = [
    '2023-01-01', // Sun
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07', // Sat
];
function weekdayLabels(weekStartsOn, locale) {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const labels = WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
    return [...labels.slice(weekStartsOn), ...labels.slice(0, weekStartsOn)];
}
function buildAvailability(slots, availability, timezone) {
    const map = new Map();
    if (availability) {
        for (const a of availability)
            map.set(a.date, a.count);
        return map;
    }
    for (const slot of slots ?? []) {
        if (slot.spotsLeft <= 0)
            continue;
        const key = (0, datetime_1.dayKeyInTz)(slot.startsAt, timezone);
        map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
}
/**
 * Month- or week-view date picker that highlights days with availability. Real
 * `<button>` grid cells (roving `tabindex`) with full keyboard support — arrow
 * keys move focus (wrapping across weeks/months), Home/End jump to the week
 * ends, PageUp/PageDown change month, Enter/Space select — inside an ARIA
 * `grid`. Token-only; availability is a dot + `aria-label` suffix, never color
 * alone. Presentational: availability comes in as props (`slots` or a per-day
 * `availability` summary); nothing is fetched.
 */
exports.BookingCalendar = React.forwardRef(function BookingCalendar({ slots, availability, selectedDate, onSelectDate, timezone, view = 'month', weekStartsOn = 0, locale, className, ...rest }, ref) {
    const availabilityMap = React.useMemo(() => buildAvailability(slots, availability, timezone), [slots, availability, timezone]);
    const anchor = selectedDate ?? new Date();
    const [viewDate, setViewDate] = React.useState(() => (0, datetime_1.startOfMonth)(anchor));
    const [focusKey, setFocusKey] = React.useState(() => (0, datetime_1.toDayKey)(anchor));
    const cellRefs = React.useRef(new Map());
    const pendingFocus = React.useRef(null);
    React.useEffect(() => {
        if (pendingFocus.current) {
            cellRefs.current.get(pendingFocus.current)?.focus();
            pendingFocus.current = null;
        }
    });
    const weeks = view === 'week'
        ? [(0, datetime_1.weekRow)(selectedDate ?? viewDate, weekStartsOn)]
        : (0, datetime_1.monthMatrix)(viewDate, weekStartsOn);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
    }).format(viewDate);
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const shiftView = (months) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));
    const moveFocus = (from, delta) => {
        const target = (0, datetime_1.addDays)(from, delta);
        const key = (0, datetime_1.toDayKey)(target);
        setFocusKey(key);
        pendingFocus.current = key;
        if (view === 'month' && target.getMonth() !== viewDate.getMonth()) {
            setViewDate((0, datetime_1.startOfMonth)(target));
        }
    };
    const onKeyDown = (e, date) => {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                moveFocus(date, -1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveFocus(date, 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                moveFocus(date, -7);
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveFocus(date, 7);
                break;
            case 'Home':
                e.preventDefault();
                moveFocus(date, -((date.getDay() - weekStartsOn + 7) % 7));
                break;
            case 'End':
                e.preventDefault();
                moveFocus(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7));
                break;
            case 'PageUp':
                e.preventDefault();
                shiftView(-1);
                break;
            case 'PageDown':
                e.preventDefault();
                shiftView(1);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                onSelectDate?.(date);
                break;
            default:
                break;
        }
    };
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    // Ensure the roving-tabindex target actually exists in the rendered grid.
    const renderedKeys = new Set(weeks.flat().map(datetime_1.toDayKey));
    const activeKey = renderedKeys.has(focusKey)
        ? focusKey
        : (0, datetime_1.toDayKey)(weeks[0]?.find((d) => d.getMonth() === viewDate.getMonth()) ?? weeks[0][0]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-calendar": view, className: (0, cn_1.cn)('inline-flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => shiftView(-1), className: "inline-flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M10 3L5 8l5 5" }) }) }), (0, jsx_runtime_1.jsx)("div", { "data-xen-calendar-label": "", className: "font-heading text-sm font-semibold text-on-surface", children: monthLabel }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => shiftView(1), className: "inline-flex h-8 w-8 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M6 3l5 5-5 5" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: labels.map((label) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", "aria-label": label, className: "py-[var(--xen-space-xs)] text-center text-xs font-medium text-muted", children: label }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: row.map((date) => {
                            const key = (0, datetime_1.toDayKey)(date);
                            const inMonth = view === 'week' || date.getMonth() === viewDate.getMonth();
                            const count = availabilityMap.get(key) ?? 0;
                            const hasAvail = count > 0;
                            const isSelected = selectedKey === key;
                            const isFocusTarget = activeKey === key;
                            const ariaSuffix = hasAvail ? ', available' : ', no availability';
                            return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "p-0.5", children: (0, jsx_runtime_1.jsxs)("button", { ref: (el) => {
                                        if (el)
                                            cellRefs.current.set(key, el);
                                        else
                                            cellRefs.current.delete(key);
                                    }, type: "button", "data-xen-calendar-day": "", "data-available": hasAvail ? 'true' : 'false', "data-outside": inMonth ? 'false' : 'true', tabIndex: isFocusTarget ? 0 : -1, "aria-pressed": isSelected, "aria-label": longDate.format(date) + ariaSuffix, onClick: () => {
                                        setFocusKey(key);
                                        onSelectDate?.(date);
                                    }, onFocus: () => setFocusKey(key), onKeyDown: (e) => onKeyDown(e, date), className: (0, cn_1.cn)('relative flex h-9 w-9 flex-col items-center justify-center rounded-[var(--xen-radius-md)] text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', !inMonth && 'text-muted', isSelected
                                        ? 'bg-primary text-on-primary'
                                        : (0, cn_1.cn)('text-on-surface hover:bg-neutral-100', hasAvail && 'font-semibold')), children: [(0, jsx_runtime_1.jsx)("span", { children: date.getDate() }), hasAvail ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-calendar-dot": "", "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : 'bg-primary') })) : null] }) }, key));
                        }) }, wi)))] })] }));
});
//# sourceMappingURL=BookingCalendar.js.map