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
exports.MonthViewV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * MonthView, redesigned (v2): a **spacious month grid**. Larger day cells show up
 * to three tone-colored event dots (or a "+N" overflow); today is outlined and the
 * selected day fills primary. Bolder than v1. Same props, token-only.
 */
exports.MonthViewV2 = React.forwardRef(function MonthViewV2({ month, events, selected, today, weekStartsOn = 0, density = 'full', onSelectDate, className, ...rest }, ref) {
    const cells = (0, format_1.monthGrid)(month, weekStartsOn);
    const labels = [...format_1.WEEKDAYS_SHORT.slice(weekStartsOn), ...format_1.WEEKDAYS_SHORT.slice(0, weekStartsOn)];
    const evs = events ?? [];
    const dotsFor = (d) => evs.filter((e) => (0, format_1.sameDay)(e.start, d));
    const maxDots = density === 'compact' ? 1 : 3;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-month-view": "", className: (0, cn_1.cn)('flex flex-col gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: labels.map((l) => (0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "py-1 text-center text-xs font-medium text-muted", children: l }, l)) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7 gap-1", children: cells.map((date, i) => {
                    if (!date)
                        return (0, jsx_runtime_1.jsx)("div", {}, `e-${i}`);
                    const dayEvents = dotsFor(date);
                    const isToday = today ? (0, format_1.sameDay)(date, today) : false;
                    const isSelected = selected ? (0, format_1.sameDay)(date, selected) : false;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-day-cell": "", "aria-pressed": isSelected, "aria-label": `${date.toDateString()}${isToday ? ', today' : ''}${dayEvents.length ? `, ${dayEvents.length} events` : ''}`, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex h-14 flex-col items-center gap-1 rounded-md p-1 text-sm transition-colors', isSelected ? 'bg-primary text-on-primary' : isToday ? 'border border-primary text-on-surface hover:bg-neutral-50' : 'text-on-surface hover:bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { children: date.getDate() }), dayEvents.length > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-0.5", children: [dayEvents.slice(0, maxDots).map((e, j) => (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', isSelected ? 'bg-on-primary' : (0, format_1.toneClasses)(e.tone).accentBg), "aria-hidden": true }, j)), dayEvents.length > maxDots ? (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-[9px]', isSelected ? 'text-on-primary' : 'text-muted'), children: ["+", dayEvents.length - maxDots] }) : null] })) : null] }, date.getTime()));
                }) })] }));
});
//# sourceMappingURL=MonthViewV2.js.map