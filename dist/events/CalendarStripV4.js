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
exports.CalendarStripV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./format");
const event_v4_1 = require("./internal/event-v4");
const DAY_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
function buildDates(startDate, count) {
    const n = Math.max(1, Math.floor(count));
    return Array.from({ length: n }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
    });
}
/**
 * **V4 calendar strip** — the web twin of the native `CalendarStripV4`, same
 * props as {@link CalendarStrip} plus `locale`, `markedLabel`,
 * `defaultSelected` and `today`.
 *
 * ## Seven changes
 *
 * 1. **A marked day never loses its dot.** The month label and the has-events
 *    marker shared one slot as an either/or, and `showMonth` is true on the 1st
 *    of any month and on the first pill — so a day with events falling on a
 *    month boundary showed no marker at all. They are two slots now.
 * 2. **The mark is announced.** It was a coloured dot and nothing else; it now
 *    joins the day's name as `markedLabel`.
 * 3. **The strip speaks the host's language.** The weekday and month came from
 *    `format.ts`'s inline `['Sun','Mon',…]` arrays, so the picker was
 *    English-only whatever locale the app ran in. `weekdayName` / `monthName` /
 *    `dayNumber` go through `Intl`, and `locale` steers them.
 * 4. **`today` replaces the bare `new Date()` in render**, so the strip can be
 *    pinned for a test or a server render instead of drifting with the clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer that passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` is the only thing that draws the fill.
 * 6. **The `tablist` role is gone.** Fourteen day pills are not tabs: nothing
 *    here shows or hides a panel, and the role promised a roving focus the base
 *    never implemented, so a screen reader announced "tab 3 of 14" over a
 *    control that behaved like fourteen ordinary buttons. They are buttons now,
 *    with `aria-pressed` for the chosen day — and the arrow keys, Home and End
 *    still walk the strip, which is a convenience rather than a contract.
 * 7. **Day numbers are tabular**, so a two-digit day does not shift the pill's
 *    centre, and `hover:bg-neutral-50` — a ramp step, near-white on a dark page
 *    — becomes the shared state layer. `font-extrabold` is off the kit's scale.
 */
exports.CalendarStripV4 = React.forwardRef(function CalendarStripV4({ startDate, days = 14, dates, selected, marks = [], onSelectDate, locale, markedLabel = 'Has events', defaultSelected, today, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [uncontrolled, setUncontrolled] = React.useState(defaultSelected);
    const pillRefs = React.useRef(new Map());
    // `selected` still wins whenever it is supplied, so a controlled caller is
    // unaffected; `defaultSelected` only fills the hole an uncontrolled one had.
    const activeDate = selected ?? uncontrolled;
    const anchor = startDate ?? today ?? new Date();
    const list = dates && dates.length > 0 ? dates : buildDates(anchor, days);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    const choose = (date) => {
        setUncontrolled(date);
        onSelectDate?.(date);
    };
    const moveFocus = (to) => {
        const next = Math.min(Math.max(0, to), list.length - 1);
        pillRefs.current.get(next)?.focus();
    };
    const onKeyDown = (e, index) => {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                moveFocus(index - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveFocus(index + 1);
                break;
            case 'Home':
                e.preventDefault();
                moveFocus(0);
                break;
            case 'End':
                e.preventDefault();
                moveFocus(list.length - 1);
                break;
            default:
                break;
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row gap-sm overflow-x-auto px-xs', className), ...rest, children: list.map((date, i) => {
            const isSelected = activeDate != null && (0, format_1.sameDay)(activeDate, date);
            const marked = isMarked(date);
            const isToday = today != null && (0, format_1.sameDay)(today, date);
            const showMonth = i === 0 || date.getDate() === 1;
            return ((0, jsx_runtime_1.jsxs)("button", { ref: (el) => {
                    if (el)
                        pillRefs.current.set(i, el);
                    else
                        pillRefs.current.delete(i);
                }, type: "button", "aria-pressed": isSelected, "aria-current": isToday ? 'date' : undefined, "aria-label": (0, event_v4_1.spokenLine)([
                    (0, event_v4_1.weekdayName)(date, locale, 'short'),
                    (0, event_v4_1.monthName)(date, locale, 'long'),
                    (0, event_v4_1.dayNumber)(date, locale),
                    marked ? markedLabel : undefined,
                ]), onClick: () => choose(date), onKeyDown: (e) => onKeyDown(e, i), "data-xen-v4-state": "", style: DAY_STATE, className: (0, cn_1.cn)('flex min-w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] flex-col items-center justify-center', 'rounded-[var(--xen-radius-md)] border px-sm py-sm', chrome_v4_1.MIN_TAP_CLASS, isSelected ? 'border-primary bg-primary' : 'border-border bg-card', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isSelected ? 'text-on-primary' : 'text-muted-text'), children: (0, event_v4_1.weekdayName)(date, locale, 'short') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold', event_v4_1.TABULAR_CLASS, isSelected ? 'text-on-primary' : 'text-on-card'), children: (0, event_v4_1.dayNumber)(date, locale) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', isSelected ? 'text-on-primary' : 'text-muted-text'), children: showMonth ? (0, event_v4_1.monthName)(date, locale, 'short') : ' ' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-xs items-center justify-center", children: marked ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-xs w-xs rounded-full', isSelected ? 'bg-on-primary' : 'bg-accent') })) : null })] }, date.toISOString()));
        }) }));
});
//# sourceMappingURL=CalendarStripV4.js.map