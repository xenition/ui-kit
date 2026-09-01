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
exports.CalendarStripV4 = CalendarStripV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
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
 * **V4 calendar strip** — same props as {@link CalendarStrip} plus `locale`,
 * `markedLabel`, `defaultSelected` and `today`.
 *
 * ## Six changes
 *
 * 1. **A marked day keeps its dot on the 1st of the month.** The month caption
 *    and the has-events marker shared one slot as an either/or, and the base
 *    showed the month on the first pill and on every 1st — so the day most
 *    likely to open a month of a schedule was the one day whose events were
 *    silently unmarked. The two now have a slot each.
 * 2. **The mark is announced.** It was drawn and never spoken, on either
 *    twin, so a screen-reader user had no way to tell a day with sessions from
 *    an empty one.
 * 3. **The names come from `Intl`.** `format.ts` holds `WEEKDAYS_SHORT` and
 *    `MONTHS_SHORT` as inline English arrays, so the strip was English-only
 *    whatever locale the app ran in. `locale` steers all three fields, day
 *    numerals included.
 * 4. **`today` replaces the bare `new Date()`**, so a strip can be pinned for
 *    a test, a story or a server-rendered screenshot instead of drifting with
 *    the wall clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer who passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` was the only source of truth.
 * 6. **The pills are buttons, not a tablist.** Fourteen tab stops with no
 *    roving focus is not a tablist on either platform; each pill is a real
 *    button that clears 44, and a press is a state layer rather than a
 *    hand-picked ramp step.
 */
function CalendarStripV4({ startDate, days = 14, dates, selected, marks = [], locale, markedLabel = 'Has events', defaultSelected, today, onSelectDate, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [uncontrolled, setUncontrolled] = React.useState(defaultSelected);
    // `selected` still wins whenever it is supplied, so a controlled strip
    // behaves exactly as it does today.
    const active = selected ?? uncontrolled;
    const list = dates && dates.length > 0 ? dates : buildDates(startDate ?? today ?? new Date(), days);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }, style: style, children: list.map((date, i) => {
            const isSelected = active != null && (0, format_1.sameDay)(active, date);
            const marked = isMarked(date);
            const showMonth = i === 0 || date.getDate() === 1;
            const ink = isSelected ? colors.onPrimary : colors.onSurface;
            const meta = isSelected ? colors.onPrimary : colors.mutedText;
            const ground = isSelected ? colors.primary : colors.surface;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: isSelected }, accessibilityLabel: (0, event_v4_1.spokenLine)([
                    (0, event_v4_1.weekdayName)(date, locale),
                    (0, event_v4_1.monthName)(date, locale),
                    (0, event_v4_1.dayNumber)(date, locale),
                    marked ? markedLabel : null,
                ]), onPress: () => {
                    setUncontrolled(date);
                    onSelectDate?.(date);
                }, style: ({ pressed }) => ({
                    alignItems: 'center',
                    minWidth: tap,
                    minHeight: tap,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: pressed && !isSelected ? (0, state_v4_1.pressFill)(theme) : ground,
                }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: meta }, children: (0, event_v4_1.weekdayName)(date, locale) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", numeric: "tabular", style: { color: ink }, children: (0, event_v4_1.dayNumber)(date, locale) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, justifyContent: 'center' }, children: showMonth ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: meta }, children: (0, event_v4_1.monthName)(date, locale) })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { height: tokens.spacing.sm, justifyContent: 'center' }, children: marked ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tokens.spacing.xs,
                                height: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: isSelected ? colors.onPrimary : colors.accent,
                            } })) : null })] }, date.toISOString()));
        }) }));
}
//# sourceMappingURL=CalendarStripV4.js.map