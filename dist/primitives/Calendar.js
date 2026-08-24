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
exports.Calendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
function sameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
/**
 * Web parity of the native `Calendar`: a static month grid — a display calendar
 * distinct from a date-picker field. Header with prev/next chevrons, a weekday
 * row, and a `grid`-role 6×7 day grid; the selected day fills with the `primary`
 * token and marked days get an accent dot. All colors/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
exports.Calendar = React.forwardRef(function Calendar({ className, month, selected, marks = [], onSelectDate, onMonthChange, ...rest }, ref) {
    const base = month ?? new Date();
    const year = base.getFullYear();
    const monthIndex = base.getMonth();
    const today = new Date();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1)
        cells.push(d);
    while (cells.length % 7 !== 0)
        cells.push(null);
    const goMonth = (delta) => {
        onMonthChange?.(new Date(year, monthIndex + delta, 1));
    };
    const isMarked = (day) => marks.some((m) => sameDay(m, new Date(year, monthIndex, day)));
    const rows = Math.ceil(cells.length / 7);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface rounded-[var(--xen-radius-md)] border border-border p-3', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => goMonth(-1), className: "rounded-[var(--xen-radius-sm)] px-2 py-1 text-lg text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2039" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: `${MONTHS[monthIndex] ?? ''} ${year}` }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => goMonth(1), className: "rounded-[var(--xen-radius-sm)] px-2 py-1 text-lg text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u203A" })] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": `${MONTHS[monthIndex] ?? ''} ${year}`, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: WEEKDAYS.map((w) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "flex flex-1 items-center justify-center py-1 text-xs font-medium text-muted", children: w }, w))) }), Array.from({ length: rows }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                            if (day == null) {
                                return (0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "aspect-square flex-1" }, col);
                            }
                            const cellDate = new Date(year, monthIndex, day);
                            const isSelected = selected != null && sameDay(selected, cellDate);
                            const isToday = sameDay(today, cellDate);
                            return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "aspect-square flex-1", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${MONTHS[monthIndex] ?? ''} ${day}, ${year}`, "aria-pressed": isSelected, "aria-current": isToday ? 'date' : undefined, onClick: () => onSelectDate?.(cellDate), className: "relative flex h-full w-full items-center justify-center focus-visible:outline-none", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full text-sm', isSelected
                                                ? 'bg-primary font-bold text-on-primary'
                                                : 'text-on-surface hover:bg-neutral-100', isToday && !isSelected && 'border border-border'), children: day }), isMarked(day) ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : 'bg-accent') })) : null] }) }, col));
                        }) }, row)))] })] }));
});
//# sourceMappingURL=Calendar.js.map