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
exports.MonthViewV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * MonthView, redesigned (v3): a **mini month**. Tiny square cells with a single
 * event dot, narrow weekday initials, an outlined today and a filled selected day —
 * a compact date picker for a sidebar. The opposite of v2's spacious grid. Same
 * props, token-only.
 */
exports.MonthViewV3 = React.forwardRef(function MonthViewV3({ month, events, selected, today, weekStartsOn = 0, density, onSelectDate, className, ...rest }, ref) {
    void density;
    const cells = (0, format_1.monthGrid)(month, weekStartsOn);
    const labels = [...format_1.WEEKDAYS_NARROW.slice(weekStartsOn), ...format_1.WEEKDAYS_NARROW.slice(0, weekStartsOn)];
    const evs = events ?? [];
    const firstEvent = (d) => evs.find((e) => (0, format_1.sameDay)(e.start, d));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-month-view": "", className: (0, cn_1.cn)('inline-flex flex-col gap-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: labels.map((l, i) => (0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "text-center text-[10px] font-medium text-muted", children: l }, `${l}-${i}`)) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-7 gap-0.5", children: cells.map((date, i) => {
                    if (!date)
                        return (0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8" }, `e-${i}`);
                    const ev = firstEvent(date);
                    const isToday = today ? (0, format_1.sameDay)(date, today) : false;
                    const isSelected = selected ? (0, format_1.sameDay)(date, selected) : false;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-day-cell": "", "aria-pressed": isSelected, "aria-label": `${date.toDateString()}${isToday ? ', today' : ''}${ev ? ', has events' : ''}`, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('relative flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors', isSelected ? 'bg-primary text-on-primary' : isToday ? 'ring-1 ring-primary text-on-surface hover:bg-neutral-100' : 'text-on-surface hover:bg-neutral-100'), children: [date.getDate(), ev ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : (0, format_1.toneClasses)(ev.tone).accentBg), "aria-hidden": true }) : null] }, date.getTime()));
                }) })] }));
});
//# sourceMappingURL=MonthViewV3.js.map