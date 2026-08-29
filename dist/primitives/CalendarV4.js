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
exports.CalendarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
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
 * **V4 calendar** — the web twin of `CalendarV4`, the same props as
 * {@link Calendar}, a different design line.
 *
 * ## It still looks like a calendar
 *
 * §31 asks for familiar interactions, and a month grid is about as settled a
 * pattern as software has: seven columns, a weekday header, chevrons to page.
 * Nothing here is reinvented. What changes is everything that made the base
 * grid fiddly to actually use.
 *
 * ## The three changes
 *
 * 1. **Day cells you can hit.** The base sizes its day pill at `h-8 w-8` — 32px
 *    — inside a seven-column row. That is well under the 44px floor both
 *    platform guidelines set, and on a calendar it is the difference between
 *    clicking the 14th and clicking the 15th. Every cell here is at least
 *    `--xen-space-2xl` (48px) in both axes with the visible disc just inside
 *    it, so the target is larger than the thing it looks like — which is the
 *    right way round. The chevrons get the same floor.
 * 2. **A selection you cannot miss, in either scheme.** The selected day is a
 *    filled `primary` disc with `on-primary` ink — a pair the compiler
 *    contrast-checks, so it survives a dark page where a tinted outline would
 *    dissolve. Today, when it is not the selection, is ringed in `primary`
 *    rather than the base's `border`, so "today" and "a cell edge" can never be
 *    confused. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`: the neutral ramp carries the light orientation in
 *    both schemes, so step 100 is a near-white flash on a dark page.
 * 3. **A panel that is a panel.** `--xen-elevation-card` and the `lg` radius,
 *    with the hairline kept. The base's `md` radius and flat fill made the
 *    calendar read as a fieldset rather than a surface you are choosing from.
 *
 * Glass is the one thing asked for rather than assumed: `flatten()` neutralises
 * gradients and elevation for a flat seed and stops there, so elevation is
 * consumed unconditionally and `depth: 'glass'` is checked once. No gradient —
 * §35.11 keeps those for the hero and the one primary action.
 */
exports.CalendarV4 = React.forwardRef(function CalendarV4({ className, month, selected, marks = [], onSelectDate, onMonthChange, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    const glass = (0, picker_v4_1.useDepth)() === 'glass';
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
    const label = `${MONTHS[monthIndex] ?? ''} ${year}`;
    const chevron = (text, glyph, delta) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": text, onClick: () => goMonth(delta), "data-xen-v4-hover": "", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-on-surface', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: glyph }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-pop": "card", "data-glass": glass ? 'true' : undefined, className: (0, cn_1.cn)('p-md text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-xs flex items-center justify-between", children: [chevron('Previous month', '‹', -1), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-semibold text-on-surface", children: label }), chevron('Next month', '›', 1)] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": label, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: WEEKDAYS.map((w) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "flex flex-1 items-center justify-center py-xs text-xs font-semibold text-muted-text", children: w }, w))) }), Array.from({ length: rows }).map((_, row) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                            if (day == null) {
                                return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "h-[var(--xen-space-2xl)] flex-1" }, col));
                            }
                            const cellDate = new Date(year, monthIndex, day);
                            const isSelected = selected != null && sameDay(selected, cellDate);
                            const isToday = sameDay(today, cellDate);
                            return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", className: "h-[var(--xen-space-2xl)] flex-1", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${MONTHS[monthIndex] ?? ''} ${day}, ${year}`, "aria-pressed": isSelected, "aria-current": isToday ? 'date' : undefined, onClick: () => onSelectDate?.(cellDate), className: (0, cn_1.cn)('relative flex h-full w-full items-center justify-center', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'rounded-[var(--xen-radius-full)]'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-base', 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] max-w-full', isSelected
                                                ? 'bg-primary font-bold text-on-primary'
                                                : 'text-on-surface', 
                                            // Today is ringed in `primary`, not `border` — a cell
                                            // edge and "today" must not look the same.
                                            isToday && !isSelected && 'border border-primary font-bold'), "data-xen-v4-hover": isSelected ? undefined : '', children: day }), isMarked(day) ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute bottom-0 h-xs w-xs rounded-[var(--xen-radius-full)]', isSelected ? 'bg-on-primary' : 'bg-accent') })) : null] }) }, col));
                        }) }, row)))] })] }));
});
//# sourceMappingURL=CalendarV4.js.map