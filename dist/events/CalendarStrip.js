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
exports.CalendarStrip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
function buildDates(startDate, count) {
    const n = Math.max(1, Math.floor(count));
    return Array.from({ length: n }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}
/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `aria-selected`. `startDate` defaults to a
 * fresh `new Date()` only at render (never at import). Colors come from the
 * `--xen-*` tokens; no literal colors.
 */
exports.CalendarStrip = React.forwardRef(function CalendarStrip({ startDate, days = 14, dates, selected, marks = [], onSelectDate, className, ...rest }, ref) {
    const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? new Date(), days);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "tablist", className: (0, cn_1.cn)('flex flex-row gap-sm overflow-x-auto px-xs', className), ...rest, children: list.map((date, i) => {
            const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
            const showMonth = i === 0 || date.getDate() === 1;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "aria-selected": isSelected, "aria-label": `${(0, format_1.weekdayLabel)(date)} ${(0, format_1.monthLabel)(date)} ${date.getDate()}`, onClick: () => onSelectDate?.(date), className: (0, cn_1.cn)('flex min-w-[3.5rem] flex-col items-center rounded-md border px-sm py-sm transition-colors', isSelected ? 'border-primary bg-primary' : 'border-border bg-surface hover:bg-neutral-50', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isSelected ? 'text-on-primary' : 'text-muted'), children: (0, format_1.weekdayLabel)(date) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-extrabold', isSelected ? 'text-on-primary' : 'text-on-surface'), children: date.getDate() }), showMonth ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', isSelected ? 'text-on-primary' : 'text-muted'), children: (0, format_1.monthLabel)(date) })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex h-2 items-center justify-center", children: isMarked(date) ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', isSelected ? 'bg-on-primary' : 'bg-accent') })) : null }))] }, date.toISOString()));
        }) }));
});
//# sourceMappingURL=CalendarStrip.js.map