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
exports.DateRangePickerV4 = DateRangePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const date_v4_1 = require("./internal/date-v4");
const picker_v4_1 = require("./internal/picker-v4");
const useDismiss_1 = require("./useDismiss");
/**
 * **V4 date range** — the web twin of `DateRangePickerV4`, the same props as
 * {@link DateRangePicker}, a different design line.
 *
 * ## One range, one calendar
 *
 * The base composes two independent `DatePicker`s and keeps them from crossing.
 * That is correct and it is not a range: the user picks a date, closes a
 * calendar, opens a second calendar, and has to hold the first date in their
 * head while doing it — §32's "recognition over recall", failed twice over.
 * Worse, at no point do they ever see the span they are choosing.
 *
 * V4 is the pattern every booking flow has settled on, which is exactly why
 * §31 points at it: **one field with two segments, one calendar, click start
 * then click end.** The span fills in as you go, so the thing being chosen is
 * the thing on screen. A caption under the grid says which end the next click
 * sets, so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `on-primary` ink — the pair the
 * compiler contrast-checks. The days between them get the shared range fill, a
 * `color-mix` of the brand into `--xen-surface`.
 *
 * That is deliberate and not decoration. `bg-primary-50` — the obvious "lighter
 * primary" — is a ramp step, and the ramps carry the light orientation in BOTH
 * schemes, so under `[data-theme="dark"]` the band is near-white and the range
 * reads as a hole punched through the calendar. Mixing against the panel's own
 * surface is right in both.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width under each
 * cap, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and focus ring, day cells sit at the
 * `--xen-space-2xl` tap-target floor, and the popover floats on
 * `--xen-elevation-card` — glass only when the seed asked for it, motion
 * dropped under `prefers-reduced-motion`.
 */
function DateRangePickerV4({ value = { start: null, end: null }, onChange, min, max, startLabel = 'Start', endLabel = 'End', invalid = false, disabled = false, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    const glass = (0, picker_v4_1.useDepth)() === 'glass';
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState('start');
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const startDate = (0, date_v4_1.toDate)(value.start);
    const endDate = (0, date_v4_1.toDate)(value.end);
    const [viewDate, setViewDate] = React.useState(() => (0, date_v4_1.startOfMonth)(startDate ?? new Date()));
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
    const shortDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
    const openAt = (which) => {
        setEditing(which);
        setViewDate((0, date_v4_1.startOfMonth)((which === 'end' ? endDate : startDate) ?? new Date()));
        setOpen(true);
    };
    /**
     * Click-to-click range building. Starting over is always allowed and never
     * an error: a click before the current start, or a click when the range is
     * already complete, begins a new range rather than refusing (§24 — make
     * experimentation safe). The only thing that can never happen is a crossed
     * range.
     */
    const pick = (key) => {
        if (editing === 'start' || !value.start || value.end || key < value.start) {
            onChange?.({ start: key, end: null });
            setEditing('end');
            return;
        }
        onChange?.({ start: value.start, end: key });
        setEditing('start');
        setOpen(false);
    };
    const segment = (label, date, which) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, "aria-haspopup": "dialog", "aria-expanded": open && editing === which, disabled: disabled, onClick: () => openAt(which), className: "flex min-h-[var(--xen-space-2xl)] flex-1 flex-col justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base', date ? 'text-on-surface' : 'text-muted-text'), children: date ? shortDate.format(date) : 'Add date' })] }));
    const chevron = (label, glyph, delta) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => shiftMonth(delta), "data-xen-v4-hover": "", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-on-surface', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: glyph }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-field": invalid ? 'invalid' : '', "data-open": open ? 'true' : undefined, className: (0, cn_1.cn)(picker_v4_1.FIELD_CLASS, disabled && 'pointer-events-none opacity-[0.38]'), style: {
                    '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
                }, children: [segment(startLabel, startDate, 'start'), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted-text", children: "\u2192" }), segment(endLabel, endDate, 'end')] }), open ? ((0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-label": `Choose a date range — ${monthLabel}`, "data-xen-v4-pop": "card", "data-glass": glass ? 'true' : undefined, className: "absolute z-50 mt-xs p-md text-on-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [chevron('Previous month', '‹', -1), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-semibold text-on-surface", children: monthLabel }), chevron('Next month', '›', 1)] }), (0, jsx_runtime_1.jsxs)("div", { role: "grid", "aria-label": monthLabel, children: [(0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: labels.map((label) => ((0, jsx_runtime_1.jsx)("div", { role: "columnheader", className: "flex w-[var(--xen-space-2xl)] items-center justify-center py-xs text-xs font-semibold text-muted-text", children: label }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)("div", { role: "row", className: "flex", children: row.map((date) => {
                                    const key = (0, date_v4_1.toKey)(date);
                                    const inMonth = date.getMonth() === viewDate.getMonth();
                                    const blocked = (0, date_v4_1.outOfRange)(key, min, max);
                                    const pos = (0, date_v4_1.rangePosition)(key, value.start, value.end);
                                    const capped = pos === 'start' || pos === 'end' || pos === 'only';
                                    const banded = pos === 'middle' || pos === 'start' || pos === 'end';
                                    return ((0, jsx_runtime_1.jsx)("div", { role: "gridcell", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": longDate.format(date), "aria-pressed": pos !== 'none', disabled: blocked, onClick: () => pick(key), className: (0, cn_1.cn)('relative flex items-center justify-center', 'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'disabled:pointer-events-none'), children: [banded ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-band": "", className: "absolute inset-y-xs", style: {
                                                        left: pos === 'start' ? '50%' : 0,
                                                        right: pos === 'end' ? '50%' : 0,
                                                    } })) : null, (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-hover": capped || blocked ? undefined : '', className: (0, cn_1.cn)('relative flex items-center justify-center rounded-[var(--xen-radius-full)] text-base', 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', capped
                                                        ? 'bg-primary font-bold text-on-primary'
                                                        : !inMonth || blocked
                                                            ? 'text-muted-text'
                                                            : 'text-on-surface'), children: date.getDate() })] }) }, key));
                                }) }, wi)))] }), (0, jsx_runtime_1.jsx)("p", { "aria-live": "polite", className: "pt-xs text-sm text-muted-text", children: editing === 'start' || !value.start
                            ? `Choose the ${startLabel.toLowerCase()} date`
                            : `Choose the ${endLabel.toLowerCase()} date` })] })) : null] }));
}
//# sourceMappingURL=DateRangePickerV4.js.map