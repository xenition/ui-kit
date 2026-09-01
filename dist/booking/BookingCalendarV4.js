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
exports.BookingCalendarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const datetime_1 = require("./datetime");
const schedule_v4_1 = require("./schedule-v4");
/** The seven weekday columns, as ISO days of one known week (Sun → Sat). */
const WEEKDAY_KEYS = [
    '2023-01-01',
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07',
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
 * **V4 booking calendar** — the web twin of the native `BookingCalendarV4`,
 * same props as {@link BookingCalendar} plus `markToday` and four copy hooks.
 *
 * The roving-tabindex keyboard model is the base's and is kept whole: arrows,
 * Home/End, PageUp/PageDown, Enter/Space, and one tab stop for the grid. It is
 * the best thing about this component and the pass does not touch it.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** `shiftView()` moved `viewDate` by a
 *    *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen. V4 keeps one
 *    anchor and shifts it by a month or by seven days, and the labels say which.
 * 2. **Every target clears 44.** `h-8 w-8` chevrons and `h-9 w-9` cells were
 *    both under the minimum the rest of the kit holds.
 * 3. **Today is marked** — a ring, plus `today` in the cell's accessible name.
 * 4. **Hover and focus are the kit's tokens.** `hover:bg-neutral-100` is a ramp
 *    step and near-white on a dark page; `ring-primary-300` is not the
 *    `--xen-ring` slot every other V4 control focuses with.
 * 5. **The chevrons are `IconV4`**, not two hand-drawn inline `<svg>` paths
 *    whose stroke width was a literal.
 */
exports.BookingCalendarV4 = React.forwardRef(function BookingCalendarV4({ slots, availability, selectedDate, onSelectDate, timezone, view = 'month', weekStartsOn = 0, locale, markToday = true, previousLabel, nextLabel, availableLabel = 'available', unavailableLabel = 'no availability', todayLabel = 'today', className, ...rest }, ref) {
    const availabilityMap = React.useMemo(() => buildAvailability(slots, availability, timezone), [slots, availability, timezone]);
    /*
      ONE anchor for both views, and it is the thing the chevrons move. The
      base kept `viewDate` (a month) and derived the week from
      `selectedDate ?? viewDate`, which is why the week view's chevrons were
      inert: they moved a value the week row was not reading.
    */
    const [anchor, setAnchor] = React.useState(() => selectedDate ?? new Date());
    const [focusKey, setFocusKey] = React.useState(() => (0, datetime_1.toDayKey)(selectedDate ?? new Date()));
    const cellRefs = React.useRef(new Map());
    const pendingFocus = React.useRef(null);
    React.useEffect(() => {
        if (pendingFocus.current) {
            cellRefs.current.get(pendingFocus.current)?.focus();
            pendingFocus.current = null;
        }
    });
    const weeks = view === 'week' ? [(0, datetime_1.weekRow)(anchor, weekStartsOn)] : (0, datetime_1.monthMatrix)(anchor, weekStartsOn);
    const monthAnchor = view === 'week' ? (weeks[0]?.[0] ?? anchor) : (0, datetime_1.startOfMonth)(anchor);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
    }).format(monthAnchor);
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const shift = (direction) => setAnchor((d) => view === 'week'
        ? (0, datetime_1.addDays)(d, direction * 7)
        : new Date(d.getFullYear(), d.getMonth() + direction, 1));
    const moveFocus = (from, delta) => {
        const target = (0, datetime_1.addDays)(from, delta);
        const key = (0, datetime_1.toDayKey)(target);
        setFocusKey(key);
        pendingFocus.current = key;
        if (view === 'month' && target.getMonth() !== monthAnchor.getMonth()) {
            setAnchor((0, datetime_1.startOfMonth)(target));
        }
        if (view === 'week')
            setAnchor(target);
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
                shift(-1);
                break;
            case 'PageDown':
                e.preventDefault();
                shift(1);
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
        : (0, datetime_1.toDayKey)(weeks[0]?.find((d) => d.getMonth() === monthAnchor.getMonth()) ?? weeks[0][0]);
    const unit = view === 'week' ? 'week' : 'month';
    const chevron = (direction) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": direction < 0 ? (previousLabel ?? `Previous ${unit}`) : (nextLabel ?? `Next ${unit}`), onClick: () => shift(direction), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-card', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "lg" }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-booking-calendar": view, className: (0, cn_1.cn)('inline-flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card shadow-[var(--xen-elevation-card)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [chevron(-1), (0, jsx_runtime_1.jsx)("div", { "data-xen-calendar-label": "", className: "font-heading text-base font-semibold", children: monthLabel }), chevron(1)] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: labels.map((label) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", "aria-label": label, className: "py-xs text-center text-xs font-medium text-muted-text", children: label }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: row.map((date) => {
                            const key = (0, datetime_1.toDayKey)(date);
                            const inMonth = view === 'week' || date.getMonth() === monthAnchor.getMonth();
                            const count = availabilityMap.get(key) ?? 0;
                            const hasAvail = count > 0;
                            const isSelected = selectedKey === key;
                            const today = markToday && (0, schedule_v4_1.isToday)(date, timezone);
                            const isFocusTarget = activeKey === key;
                            const name = [
                                longDate.format(date),
                                today ? todayLabel : null,
                                hasAvail ? availableLabel : unavailableLabel,
                            ]
                                .filter(Boolean)
                                .join(', ');
                            return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "p-0.5", children: (0, jsx_runtime_1.jsxs)("button", { ref: (el) => {
                                        if (el)
                                            cellRefs.current.set(key, el);
                                        else
                                            cellRefs.current.delete(key);
                                    }, type: "button", "data-xen-calendar-day": "", "data-available": hasAvail ? 'true' : 'false', "data-outside": inMonth ? 'false' : 'true', "data-today": today ? 'true' : undefined, "data-xen-v4-chrome": isSelected ? 'filled-primary' : 'on-surface', tabIndex: isFocusTarget ? 0 : -1, "aria-pressed": isSelected, "aria-current": today ? 'date' : undefined, "aria-label": name, onClick: () => {
                                        setFocusKey(key);
                                        onSelectDate?.(date);
                                    }, onFocus: () => setFocusKey(key), onKeyDown: (e) => onKeyDown(e, date), className: (0, cn_1.cn)('relative flex w-11 flex-col items-center justify-center rounded-full text-sm [font-variant-numeric:tabular-nums]', chrome_v4_1.MIN_TAP_CLASS, 
                                    // The ring's width is reserved on every cell, so marking
                                    // today never nudges the grid by two pixels.
                                    'border-2', today && !isSelected ? 'border-primary' : 'border-transparent', !inMonth && 'text-muted-text opacity-[0.38]', isSelected
                                        ? 'bg-primary text-on-primary'
                                        : (0, cn_1.cn)('text-on-card', hasAvail && 'font-bold')), children: [(0, jsx_runtime_1.jsx)("span", { children: date.getDate() }), hasAvail ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-calendar-dot": "", "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : 'bg-primary') })) : null] }) }, key));
                        }) }, wi)))] })] }));
});
//# sourceMappingURL=BookingCalendarV4.js.map