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
/** A single day cell — a radio within the strip's radiogroup. */
function DayCell({ day, selected, onSelect, }) {
    const count = day.count ?? 0;
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${day.weekday} ${day.label}${count > 0 ? `, ${count} tasks` : ''}${day.today ? ', today' : ''}`, onClick: () => onSelect?.(day.date), disabled: !onSelect, className: (0, cn_1.cn)('flex min-h-[64px] min-w-[44px] shrink-0 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2 transition-colors', 'disabled:cursor-default', selected
            ? 'bg-primary text-on-primary'
            : (0, cn_1.cn)('bg-surface text-on-surface hover:bg-primary/[0.08]', day.today && 'ring-2 ring-primary')), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold uppercase', selected ? 'text-on-primary' : 'text-muted-text'), children: day.weekday }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold leading-none tabular-nums", children: day.label }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums', selected ? 'bg-on-primary/[0.24] text-on-primary' : 'bg-primary/[0.14] text-primary-text'), children: count })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-[18px]" }))] }));
}
/**
 * CalendarStrip — **V4** "flow" week strip (web parity of the native twin). A
 * horizontally-scrolling row of calm day cells: a weekday letter over a **big
 * date numeral**, with a soft-primary count badge for days that carry tasks.
 * One accent throughout — the **selected** day fills solid primary, **today**
 * wears a primary ring. Cells are ≥44px tap targets and expose a `radiogroup`
 * so a screen reader announces the chosen day. Presentational only. All colors
 * from `--xen-*` token classes — no literals.
 */
exports.CalendarStrip = React.forwardRef(function CalendarStrip({ days, selectedDate, onSelect, label = 'Select a day', className, ...rest }, ref) {
    const items = Array.isArray(days) ? days : [];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", "aria-label": label, className: (0, cn_1.cn)('flex gap-2 overflow-x-auto rounded-[var(--xen-radius-lg)] bg-card p-2', className), ...rest, children: items.map((day) => ((0, jsx_runtime_1.jsx)(DayCell, { day: day, selected: selectedDate === day.date, onSelect: onSelect }, day.date))) }));
});
//# sourceMappingURL=CalendarStrip.js.map