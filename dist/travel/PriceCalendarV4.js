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
exports.PriceCalendarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
/**
 * PriceCalendar — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a fare grid: clean `surface` day cells with muted price
 * ink, where the cheapest available day wears a small brand-gradient disc
 * (`from-primary-400 to-primary-700`) with near-white price ink — the signature
 * V4 touch. A currently selected day is ringed in token `primary`. Same
 * props/behavior as {@link PriceCalendarProps}: each cell announces its date,
 * price and cheapest flag via `aria-label` (never color-alone), unavailable days
 * (no `cents`) are disabled, and selection is controlled via `selectedDate`. All
 * colors from `--xen-*` token classes (no literal colors).
 */
exports.PriceCalendarV4 = React.forwardRef(function PriceCalendarV4({ days, columns = 7, selectedDate, currency = 'USD', formatMoney: format = money_1.formatMoney, onSelectDay, className, ...rest }, ref) {
    const cheapest = React.useMemo(() => {
        let min = Infinity;
        let key = null;
        for (const d of days) {
            if (typeof d.cents === 'number' && d.cents < min) {
                min = d.cents;
                key = d.date;
            }
        }
        return key;
    }, [days]);
    const cols = Math.max(1, columns);
    const widthPct = `${100 / cols}%`;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-price-calendar": "", className: (0, cn_1.cn)('flex flex-wrap', className), ...rest, children: days.map((day, i) => {
            const available = typeof day.cents === 'number';
            const isSelected = day.date === selectedDate;
            const isCheapest = day.date === cheapest;
            return ((0, jsx_runtime_1.jsx)("div", { style: { width: widthPct }, className: "p-[2px]", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${day.date}${available ? `, ${format(day.cents, currency)}` : ', unavailable'}${isCheapest ? ', cheapest' : ''}`, "aria-pressed": isSelected, "aria-disabled": !available, disabled: !available, onClick: available ? () => onSelectDay?.(day) : undefined, className: (0, cn_1.cn)('flex w-full flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', isSelected ? 'border-primary ring-1 ring-primary' : 'border-border', available ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: day.label }), isCheapest ? ((0, jsx_runtime_1.jsx)("span", { className: "flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 px-[var(--xen-space-sm)] py-[1px] text-xs font-semibold text-primary-50 shadow-sm", children: available ? format(day.cents, currency) : '—' })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: available ? format(day.cents, currency) : '—' }))] }) }, day.date || `day-${i}`));
        }) }));
});
//# sourceMappingURL=PriceCalendarV4.js.map