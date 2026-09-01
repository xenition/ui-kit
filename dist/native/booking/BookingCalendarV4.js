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
exports.BookingCalendarV4 = BookingCalendarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const datetime_1 = require("../../booking/datetime");
const schedule_v4_1 = require("../../booking/schedule-v4");
/** The seven weekday columns, as ISO days of one known week (Sun → Sat). */
const WEEKDAY_KEYS = [
    '2023-01-01',
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07',
];
/**
 * The availability dot, as a fraction of the cell. Geometric, and a *ratio*
 * rather than the base's literal `4`: the cell is now derived from the spacing
 * scale, so a fixed 4pt dot would be a different size relative to the cell on
 * every seed.
 */
const DOT_RATIO = 0.11;
/** The ring drawn around today. 2px, the same weight a selected control takes. */
const RING = 2;
function weekdayLabels(weekStartsOn, locale) {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const labels = WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
    return [...labels.slice(weekStartsOn), ...labels.slice(0, weekStartsOn)];
}
function buildAvailability(slots, availability, timezone) {
    const map = new Map();
    if (availability) {
        for (const a of availability)
            map.set(a.date, a.count);
        return map;
    }
    for (const slot of slots ?? []) {
        if (slot.spotsLeft <= 0)
            continue;
        const key = (0, datetime_1.dayKeyInTz)(slot.startsAt, timezone);
        map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
}
/**
 * **V4 booking calendar** — same props as {@link BookingCalendar} plus
 * `markToday` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** The base's `shiftView()` moved
 *    `viewDate` by a *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen at all. V4
 *    keeps an anchor date and shifts it by a month or by seven days depending
 *    on the view, and the labels say which.
 * 2. **Every target clears 44.** Chevrons were 32×32 and day cells 36×36 —
 *    both under the minimum the rest of the kit holds, on the control a user
 *    taps most in this module.
 * 3. **Today is marked.** A ring, plus `today` in the cell's accessible name,
 *    because a ring is colour-and-shape and the name is what a screen reader
 *    gets.
 * 4. **Press is a state layer, not a ramp step.** The base filled a pressed
 *    cell with `tokens.ramps.neutral[100]` — the light end of the ramp in both
 *    schemes, so on a dark page a pressed day flashed near-white.
 * 5. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize` and
 *    `fontWeight` on raw `<Text>` five times over, with `'500'`, `'600'` and
 *    `'700'` all in play for what is two steps.
 *
 * Availability still comes in as props and nothing is fetched. Days outside the
 * visible month stay muted and disabled — navigate with the header.
 */
function BookingCalendarV4({ slots, availability, selectedDate, onSelectDate, timezone, view = 'month', weekStartsOn = 0, locale, markToday = true, previousLabel, nextLabel, availableLabel = 'available', unavailableLabel = 'no availability', todayLabel = 'today', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const availabilityMap = React.useMemo(() => buildAvailability(slots, availability, timezone), [slots, availability, timezone]);
    /*
      ONE anchor for both views, and it is the thing the chevrons move.
  
      The base kept `viewDate` (a month) and derived the week from
      `selectedDate ?? viewDate`, which is why the week view's chevrons were
      inert: they moved a value the week row was not reading.
    */
    const [anchor, setAnchor] = React.useState(() => selectedDate ?? new Date());
    const shift = (direction) => setAnchor((d) => view === 'week'
        ? (0, datetime_1.addDays)(d, direction * 7)
        : new Date(d.getFullYear(), d.getMonth() + direction, 1));
    const weeks = view === 'week' ? [(0, datetime_1.weekRow)(anchor, weekStartsOn)] : (0, datetime_1.monthMatrix)(anchor, weekStartsOn);
    const monthAnchor = view === 'week' ? (weeks[0]?.[0] ?? anchor) : (0, datetime_1.startOfMonth)(anchor);
    const labels = weekdayLabels(weekStartsOn, locale);
    const monthLabel = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
    }).format(monthAnchor);
    const longDate = new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const selectedKey = selectedDate ? (0, datetime_1.toDayKey)(selectedDate) : null;
    const unit = view === 'week' ? 'week' : 'month';
    const chevron = (direction) => {
        const label = direction < 0
            ? (previousLabel ?? `Previous ${unit}`)
            : (nextLabel ?? `Next ${unit}`);
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => shift(direction), style: ({ pressed }) => ({
                width: tap,
                height: tap,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
            }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "lg", color: "onSurface" }) }));
    };
    const dot = Math.round(tap * DOT_RATIO);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ alignSelf: 'flex-start', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [chevron(-1), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "semibold", tone: "onCard", children: monthLabel }), chevron(1)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Choose a date — ${monthLabel}`, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: labels.map((label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: "mutedText", children: label }) }, label))) }), weeks.map((row, wi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: row.map((date) => {
                            const key = (0, datetime_1.toDayKey)(date);
                            const inMonth = view === 'week' || date.getMonth() === monthAnchor.getMonth();
                            const count = availabilityMap.get(key) ?? 0;
                            const hasAvail = count > 0;
                            const isSelected = selectedKey === key;
                            const today = markToday && (0, schedule_v4_1.isToday)(date, timezone);
                            const disabled = !inMonth;
                            const name = [
                                longDate.format(date),
                                today ? todayLabel : null,
                                hasAvail ? availableLabel : unavailableLabel,
                            ]
                                .filter(Boolean)
                                .join(', ');
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', padding: tokens.spacing.xs / 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { selected: isSelected, disabled }, disabled: disabled, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                                        width: tap,
                                        height: tap,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.full,
                                        // The ring's width is reserved on every cell, so marking
                                        // today never nudges the grid by two pixels.
                                        borderWidth: RING,
                                        borderColor: today && !isSelected ? colors.primary : 'transparent',
                                        backgroundColor: isSelected
                                            ? colors.primary
                                            : pressed && !disabled
                                                ? (0, state_v4_1.pressFill)(theme)
                                                : 'transparent',
                                    }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numeric: "tabular", weight: hasAvail && !isSelected ? 'bold' : 'regular', style: {
                                                color: isSelected
                                                    ? colors.onPrimary
                                                    : disabled
                                                        ? colors.mutedText
                                                        : colors.onCard,
                                                // A disabled day keeps its box and loses its ink.
                                                opacity: disabled ? theme.state.disabledContent : 1,
                                            }, children: date.getDate() }), hasAvail ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-calendar-dot", pointerEvents: "none", style: {
                                                position: 'absolute',
                                                bottom: tokens.spacing.xs,
                                                width: dot,
                                                height: dot,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: isSelected ? colors.onPrimary : colors.primary,
                                            } })) : null] }) }, key));
                        }) }, wi)))] })] }));
}
//# sourceMappingURL=BookingCalendarV4.js.map