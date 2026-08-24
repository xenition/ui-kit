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
exports.MiniCalendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * A dense mini month picker for sidebars, popovers and the `EventDetailSheet`.
 * Header chevrons page the month; days are 1:1 tap-target `<button>`s with a
 * selected fill and a marked-day dot. Distinct from `MonthView` (no per-day
 * event stacks) and from the `Calendar` primitive (integrated month paging +
 * marks). Token colors only.
 */
exports.MiniCalendar = React.forwardRef(function MiniCalendar({ month, selected, today, marks = [], weekStartsOn = 0, variant = 'bordered', onSelectDate, onMonthChange, className, ...rest }, ref) {
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(format_1.WEEKDAYS_NARROW, weekStartsOn);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] p-2', variant === 'bordered' ? 'border border-border bg-surface' : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => onMonthChange?.((0, format_1.addMonths)(month, -1)), className: "rounded-[var(--xen-radius-sm)] px-1.5 py-0.5 text-base text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2039" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: `${(0, format_1.monthLongLabel)(month)} ${month.getFullYear()}` }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => onMonthChange?.((0, format_1.addMonths)(month, 1)), className: "rounded-[var(--xen-radius-sm)] px-1.5 py-0.5 text-base text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u203A" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7", children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-0.5", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7", children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)("div", { className: "aspect-square" }, col);
                    }
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const marked = isMarked(date);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${(0, format_1.monthLongLabel)(month)} ${date.getDate()}${isToday ? ', today' : ''}`, "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected || undefined, onClick: () => onSelectDate?.(date), className: "relative flex aspect-square items-center justify-center rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-6 w-6 items-center justify-center rounded-full text-xs', isSelected ? 'bg-primary text-on-primary' : 'text-on-surface', isToday && !isSelected ? 'border border-primary' : '', isSelected || isToday ? 'font-extrabold' : 'font-normal'), children: date.getDate() }), marked ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-0 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : 'bg-accent') })) : null] }, col));
                }) }, row)))] }));
});
//# sourceMappingURL=MiniCalendar.js.map