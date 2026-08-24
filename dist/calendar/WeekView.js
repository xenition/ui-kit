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
exports.WeekView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
const GUTTER = 40;
/**
 * A 7-day week view: a weekday header (each column a tappable `<button>` that
 * selects the day) over a shared, scrollable hour grid where timed events sit in
 * their day column. Today's header carries a ring + bold weight and
 * `aria-current` (never color-alone). Colors resolve from theme tokens only.
 */
exports.WeekView = React.forwardRef(function WeekView({ week, events = [], selected, today, weekStartsOn = 0, startHour = 7, endHour = 21, hourHeight = 48, onSelectDate, onSelectEvent, selectedEventId, className, ...rest }, ref) {
    const days = React.useMemo(() => (0, format_1.weekDates)(week, weekStartsOn), [week, weekStartsOn]);
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const totalHeight = (to - from) * hourHeight;
    const yFor = (minutes) => ((minutes - gridTop) / 60) * hourHeight;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] border border-border', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex bg-surface", children: [(0, jsx_runtime_1.jsx)("div", { style: { width: GUTTER } }), days.map((date) => {
                        const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                        const isToday = today != null && (0, format_1.sameDay)(today, date);
                        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${(0, format_1.weekdayLabel)(date)} ${date.getDate()}${isToday ? ', today' : ''}`, "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected || undefined, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex flex-1 flex-col items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300', isSelected ? 'bg-primary' : ''), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isSelected ? 'text-on-primary' : 'text-muted'), children: (0, format_1.weekdayLabel)(date) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-sm', isSelected ? 'text-on-primary' : 'text-on-surface', isToday && !isSelected ? 'border border-primary' : '', isToday || isSelected ? 'font-extrabold' : 'font-medium'), children: date.getDate() })] }, date.toISOString()));
                    })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-y-auto", style: { maxHeight: totalHeight }, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", style: { height: totalHeight }, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative", style: { width: GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-1 text-xs text-muted", style: { top: i * hourHeight - 6 }, children: (0, format_1.hourLabel)(h) }, h))) }), days.map((date, dIdx) => {
                            const dayEvents = events
                                .filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, date))
                                .sort((a, b) => a.start.getTime() - b.start.getTime());
                            return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex-1', dIdx === 0 ? '' : 'border-l border-border'), children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-0 right-0 h-px bg-border", style: { top: i * hourHeight } }, h))), dayEvents.map((event, i) => {
                                        const startMin = (0, format_1.minutesSinceMidnight)(event.start);
                                        const endMin = event.end ? (0, format_1.minutesSinceMidnight)(event.end) : startMin + 30;
                                        const top = Math.max(0, yFor(startMin));
                                        const height = Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin));
                                        return ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-px right-px", style: { top, height }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: "soft", size: "sm", height: height, selected: event.id === selectedEventId, onPress: onSelectEvent, className: "h-full" }) }, event.id || String(i)));
                                    })] }, date.toISOString()));
                        })] }) })] }));
});
//# sourceMappingURL=WeekView.js.map