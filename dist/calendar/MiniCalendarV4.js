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
exports.MiniCalendarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const format_1 = require("./format");
const layout_v4_1 = require("./layout-v4");
/**
 * **V4 mini calendar** — the web twin of the native `MiniCalendarV4`, same
 * props as {@link MiniCalendar} plus `locale` and four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The header and weekday row are localized**, where the base used frozen
 *    English arrays.
 * 2. **The month chevrons clear 44 and carry names.**
 * 3. **A marked day says so.** The base drew a dot and nothing else, so the
 *    one piece of information a mini calendar carries was invisible to a
 *    screen reader and to a colour-blind user.
 * 4. **The grid is a real `role="grid"`.**
 */
exports.MiniCalendarV4 = React.forwardRef(function MiniCalendarV4({ month, selected, today, marks = [], weekStartsOn = 0, variant = 'bordered', locale, previousLabel, nextLabel, todayLabel = 'today', markedLabel = 'has events', onSelectDate, onMonthChange, className, ...rest }, ref) {
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: 'narrow' }), [weekStartsOn, locale]);
    const title = (0, layout_v4_1.monthTitle)(month, { locale, month: 'long' });
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const isMarked = (date) => marks.some((m) => (0, format_1.sameDay)(m, date));
    const chevron = (direction) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": direction < 0 ? (previousLabel ?? 'Previous month') : (nextLabel ?? 'Next month'), onClick: () => onMonthChange?.((0, format_1.addMonths)(month, direction)), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-surface', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "base" }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "grid", "data-xen-mini-calendar": variant, className: (0, cn_1.cn)('flex flex-col gap-xs', variant === 'bordered' &&
            'rounded-[var(--xen-radius-md)] border border-border bg-card p-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [onMonthChange ? chevron(-1) : null, (0, jsx_runtime_1.jsx)("h3", { className: "flex-1 text-center text-sm font-semibold text-on-card", children: title }), onMonthChange ? chevron(1) : null] }), (0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", "aria-label": w, className: "text-center text-xs text-muted-text", children: w }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "grid grid-cols-7", children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null)
                        return (0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: chrome_v4_1.MIN_TAP_CLASS }, col);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const marked = isMarked(date);
                    return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !onSelectDate, "aria-label": [
                                longDate.format(date),
                                isToday ? todayLabel : null,
                                marked ? markedLabel : null,
                            ]
                                .filter(Boolean)
                                .join(', '), "aria-pressed": isSelected, onClick: () => onSelectDate?.(date), "data-xen-v4-chrome": isSelected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('relative flex w-full items-center justify-center rounded-full border-2', chrome_v4_1.MIN_TAP_CLASS, isToday && !isSelected ? 'border-primary' : 'border-transparent', isSelected ? 'bg-primary text-on-primary' : 'text-on-card'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs [font-variant-numeric:tabular-nums]', (isSelected || isToday) && 'font-bold'), children: date.getDate() }), marked ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('absolute bottom-1 h-1 w-1 rounded-full', isSelected ? 'bg-on-primary' : 'bg-primary') })) : null] }) }, col));
                }) }, row)))] }));
});
//# sourceMappingURL=MiniCalendarV4.js.map