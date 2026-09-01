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
exports.WeekViewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const format_1 = require("./format");
const layout_v4_1 = require("./layout-v4");
const EventBlockV4_1 = require("./EventBlockV4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 week view** — the web twin of the native `WeekViewV4`, same props as
 * {@link WeekView} plus `locale`, `now`, `nowLabel` and `todayLabel`.
 *
 * ## Four changes
 *
 * 1. **Each day column lays out with the shared clustering pass**, so
 *    overlapping events in one column line up — the base carried the same
 *    inconsistent per-event overlap count `TimeGrid` did.
 * 2. **The day headers are localized and named.**
 * 3. **"Now" is drawn and announced**, and only on today's column — the base
 *    had no now rule in the week view at all.
 * 4. **Column headers clear 44.**
 */
exports.WeekViewV4 = React.forwardRef(function WeekViewV4({ week, events = [], selected, today, weekStartsOn = 0, startHour = 6, endHour = 22, hourHeight, locale, now, nowLabel = 'Current time', todayLabel = 'today', onSelectDate, onSelectEvent, selectedEventId, className, ...rest }, ref) {
    const days = React.useMemo(() => (0, format_1.weekDates)(week, weekStartsOn), [week, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: 'short' }), [weekStartsOn, locale]);
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const hourPx = hourHeight != null ? `${hourHeight}px` : grid_v4_1.GRID_HOUR;
    const y = (minutes) => `calc(${(minutes - gridTop) / 60} * ${hourPx})`;
    const nowMinutes = now != null ? (0, layout_v4_1.minutesOf)(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-week-view": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0", style: { width: grid_v4_1.GRID_GUTTER } }), days.map((date, i) => {
                        const isToday = today != null && (0, format_1.sameDay)(today, date);
                        const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !onSelectDate, "aria-label": [longDate.format(date), isToday ? todayLabel : null]
                                .filter(Boolean)
                                .join(', '), "aria-pressed": isSelected, onClick: () => onSelectDate?.(date), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)]', chrome_v4_1.MIN_TAP_CLASS, isSelected && 'bg-selected'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: headers[i] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm [font-variant-numeric:tabular-nums]', isToday ? 'font-bold text-primary-text' : 'text-on-surface'), children: date.getDate() })] }, i));
                    })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-y-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", style: { height: `calc(${to - from} * ${hourPx})` }, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative shrink-0", style: { width: grid_v4_1.GRID_GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-xs -translate-y-1/2 text-xs text-muted-text [font-variant-numeric:tabular-nums]", style: { top: `calc(${i} * ${hourPx})` }, children: (0, layout_v4_1.hourTitle)(h, locale) }, h))) }), days.map((date, dayIndex) => {
                            const timed = events.filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, date));
                            const positioned = (0, layout_v4_1.layoutEvents)(timed);
                            const isToday = today != null && (0, format_1.sameDay)(today, date);
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1 border-l border-border", children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-x-0 h-px bg-border", style: { top: `calc(${i} * ${hourPx})` } }, h))), positioned.map((p) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute pr-px", style: {
                                            top: y(p.startMin),
                                            height: `max(${grid_v4_1.GRID_MIN_BLOCK}, calc(${y(p.endMin)} - ${y(p.startMin)}))`,
                                            left: `${(100 / p.columns) * p.column}%`,
                                            width: `${100 / p.columns}%`,
                                        }, children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, size: "sm", showTime: false, selected: selectedEventId === p.event.id, onPress: onSelectEvent, className: "h-full" }) }, p.key))), showNow && isToday ? ((0, jsx_runtime_1.jsx)("span", { role: "separator", "aria-label": nowLabel, className: "absolute inset-x-0 h-0.5 bg-danger", style: { top: y(nowMinutes) } })) : null] }, dayIndex));
                        })] }) })] }));
});
//# sourceMappingURL=WeekViewV4.js.map