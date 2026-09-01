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
exports.MonthViewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const format_1 = require("./format");
const layout_v4_1 = require("./layout-v4");
const grid_v4_1 = require("./internal/grid-v4");
/** How many event dots a full cell shows before it counts the rest. */
const MAX_DOTS = 3;
/**
 * **V4 month view** — the web twin of the native `MonthViewV4`, same props as
 * {@link MonthView} plus `locale`, `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized.**
 * 2. **Every day cell clears 44** and carries a full name: the date, whether
 *    it is today, and how many events it holds — the base named it with the
 *    day number alone.
 * 3. **The grid is a real `role="grid"`** with rows, column headers and cells,
 *    so a screen reader can navigate it as a table rather than a wall of
 *    buttons.
 * 4. **Today's ring space is always reserved**, so marking it never nudges the
 *    grid, and it is named as well as drawn.
 */
exports.MonthViewV4 = React.forwardRef(function MonthViewV4({ month, events = [], selected, today, weekStartsOn = 0, density = 'full', locale, todayLabel = 'today', formatEventCount, onSelectDate, className, ...rest }, ref) {
    const compact = density === 'compact';
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: compact ? 'narrow' : 'short' }), [weekStartsOn, locale, compact]);
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const countLabel = formatEventCount ?? ((n) => `${n} ${n === 1 ? 'event' : 'events'}`);
    const eventsFor = (date) => events.filter((e) => (0, format_1.sameDay)(e.start, date));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "grid", "data-xen-month-view": density, className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border border-border bg-card p-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", "aria-label": w, className: "py-xs text-center text-xs font-semibold text-muted-text", children: w }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null)
                        return (0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: chrome_v4_1.MIN_TAP_CLASS }, col);
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dots = dayEvents.slice(0, compact ? 1 : MAX_DOTS);
                    const overflow = dayEvents.length - dots.length;
                    const name = [
                        longDate.format(date),
                        isToday ? todayLabel : null,
                        dayEvents.length > 0 ? countLabel(dayEvents.length) : null,
                    ]
                        .filter(Boolean)
                        .join(', ');
                    return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "p-0.5", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !onSelectDate, "aria-label": name, "aria-pressed": isSelected, "aria-current": isToday ? 'date' : undefined, onClick: () => onSelectDate?.(date), "data-xen-v4-chrome": isSelected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex w-full flex-col items-center justify-center gap-0.5 rounded-full py-xs', chrome_v4_1.MIN_TAP_CLASS, 
                            // The ring's space is reserved on every cell.
                            'border-2', isToday && !isSelected ? 'border-primary' : 'border-transparent', isSelected ? 'bg-primary text-on-primary' : 'text-on-card'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm [font-variant-numeric:tabular-nums]', (isToday || isSelected) && 'font-bold'), children: date.getDate() }), dots.length > 0 ? ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": true, className: "flex items-center gap-0.5", children: [dots.map((e) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : grid_v4_1.TONE_BG[(0, grid_v4_1.eventTone)(e.tone)]) }, e.id))), overflow > 0 && !compact ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: ["+", overflow] })) : null] })) : null] }) }, col));
                }) }, row)))] }));
});
//# sourceMappingURL=MonthViewV4.js.map