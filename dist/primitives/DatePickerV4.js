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
exports.DatePickerV4 = DatePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const date_v4_1 = require("./internal/date-v4");
const picker_v4_1 = require("./internal/picker-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## Why this stops being `<input type="date">`
 *
 * §31 says prefer familiar interactions, and the browser's own date input is
 * about as familiar as it gets — but it is a different control in every
 * browser, it cannot be themed past its border, and its calendar is the one
 * piece a design system has no reach into. A kit whose date field looks
 * nothing like the same field on iOS is not a kit. So V4 draws the same month
 * grid its native twin draws, from the same `internal/date-v4` arithmetic,
 * behind the same `--xen-*` tokens, and the two are the same control on both
 * platforms. The metaphor is untouched: seven columns, chevrons to page.
 *
 * ## The field belongs in the form
 *
 * The base is `rounded-[var(--xen-radius-sm)]` with `px-3 py-2` — visibly a
 * different control from the `InputV4` above it in the same form. This one
 * takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height (which is also the tap-target floor), the same `md` radius, and the
 * same brand halo drawn with `box-shadow`, so focusing costs no layout
 * (§36.11). While the calendar is open the field stays ringed — the popover
 * belongs to it and should look like it does.
 *
 * ## The grid
 *
 *   - **Day cells at the tap-target floor.** `--xen-space-2xl` in both axes,
 *     with the visible disc inside it, so the target is larger than the thing
 *     you are aiming at.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `on-primary` ink, both of which follow `[data-theme]`. `bg-primary-50`
 *     would keep the light orientation in both schemes and paint a near-white
 *     hole in a dark grid.
 *   - **Today, ringed** in `primary`, so "where am I" is answerable before
 *     anything is selected (§32 — recognition over recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted and
 *     genuinely `disabled`, not merely faded.
 *
 * The popover floats on `--xen-elevation-card` with its hairline kept, takes
 * glass only when the seed asked for `depth: 'glass'`, and its entrance is
 * dropped entirely under `prefers-reduced-motion` (§36.10).
 */
function DatePickerV4({ value, onChange, min, max, disabled, invalid, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    const glass = (0, picker_v4_1.useDepth)() === 'glass';
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const gridId = React.useId();
    const selected = (0, date_v4_1.toDate)(value);
    const selectedKey = selected ? (0, date_v4_1.toKey)(selected) : null;
    const [viewDate, setViewDate] = React.useState(() => (0, date_v4_1.startOfMonth)(selected ?? new Date()));
    const shiftMonth = (months) => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));
    const weeks = (0, date_v4_1.monthGrid)(viewDate);
    const labels = React.useMemo(() => (0, date_v4_1.weekdayLabels)(), []);
    const monthLabel = new Intl.DateTimeFormat(undefined, {
        month: 'long',
        year: 'numeric',
    }).format(viewDate);
    const longDate = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const todayKey = (0, date_v4_1.toKey)(new Date());
    const chevron = (label, glyph, delta) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => shiftMonth(delta), "data-xen-v4-hover": "", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-on-surface', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: glyph }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-field": invalid ? 'invalid' : '', "data-open": open ? 'true' : undefined, "aria-haspopup": "dialog", "aria-expanded": open, "aria-invalid": invalid || undefined, disabled: disabled, onClick: () => {
                    setViewDate((0, date_v4_1.startOfMonth)(selected ?? new Date()));
                    setOpen((o) => !o);
                }, className: (0, cn_1.cn)(picker_v4_1.FIELD_CLASS, 'justify-between text-left disabled:pointer-events-none disabled:opacity-[0.38]'), style: {
                    '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
                }, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate', selected ? 'text-on-surface' : 'text-muted-text'), children: selected ? longDate.format(selected) : 'Select a date' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted-text", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-label": `Choose a date — ${monthLabel}`, "data-xen-v4-pop": "card", "data-glass": glass ? 'true' : undefined, className: "absolute z-50 mt-xs p-md text-on-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [chevron('Previous month', '‹', -1), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-semibold text-on-surface", children: monthLabel }), chevron('Next month', '›', 1)] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", id: gridId, "aria-label": monthLabel, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: labels.map((label) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "flex w-[var(--xen-space-2xl)] items-center justify-center py-xs text-xs font-semibold text-muted-text", children: label }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: row.map((date) => {
                                    const key = (0, date_v4_1.toKey)(date);
                                    const inMonth = date.getMonth() === viewDate.getMonth();
                                    const isSelected = selectedKey === key;
                                    const isToday = key === todayKey;
                                    const blocked = (0, date_v4_1.outOfRange)(key, min, max);
                                    return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": longDate.format(date), "aria-pressed": isSelected, "aria-current": isToday ? 'date' : undefined, disabled: blocked, onClick: () => {
                                                onChange(key);
                                                setOpen(false);
                                            }, className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)]', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'disabled:pointer-events-none'), children: (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-hover": isSelected || blocked ? undefined : '', className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-base', 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', isSelected
                                                    ? 'bg-primary font-bold text-on-primary'
                                                    : !inMonth || blocked
                                                        ? 'text-muted-text'
                                                        : 'text-on-surface', isToday && !isSelected && 'border border-primary font-bold'), children: date.getDate() }) }) }, key));
                                }) }, wi)))] })] })) : null] }));
}
//# sourceMappingURL=DatePickerV4.js.map