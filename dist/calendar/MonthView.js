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
exports.MonthView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const MAX_DOTS = 3;
/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (never color-alone; `aria-current="date"`). Each day cell is a
 * real `<button>` for keyboard navigation. All colors resolve from theme tokens.
 */
exports.MonthView = React.forwardRef(function MonthView({ month, events = [], selected, today, weekStartsOn = 0, density = 'full', onSelectDate, className, ...rest }, ref) {
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(density === 'compact' ? format_1.WEEKDAYS_NARROW : format_1.WEEKDAYS_SHORT, weekStartsOn);
    const eventsFor = (date) => events.filter((e) => (0, format_1.sameDay)(e.start, date));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border border-border rounded-[var(--xen-radius-md)] bg-surface p-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7", children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7", children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)("div", { className: density === 'compact' ? 'aspect-square' : 'aspect-[1/1.1]' }, col);
                    }
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dots = dayEvents.slice(0, density === 'compact' ? 1 : MAX_DOTS);
                    const overflow = dayEvents.length - dots.length;
                    const label = `${date.getDate()}${isToday ? ', today' : ''}` +
                        (dayEvents.length
                            ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}`
                            : '');
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected || undefined, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex flex-col items-center pt-1', density === 'compact' ? 'aspect-square' : 'aspect-[1/1.1]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-7 w-7 items-center justify-center rounded-full text-sm', isSelected ? 'bg-primary text-on-primary' : 'text-on-surface', isToday && !isSelected ? 'border border-primary' : '', isSelected || isToday ? 'font-extrabold' : 'font-normal'), children: date.getDate() }), (0, jsx_runtime_1.jsxs)("span", { className: "mt-0.5 flex items-center gap-0.5", children: [dots.map((e, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : (0, format_1.toneClasses)(e.tone).accentBg) }, i))), overflow > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `+${overflow}` }) : null] })] }, col));
                }) }, row)))] }));
});
//# sourceMappingURL=MonthView.js.map