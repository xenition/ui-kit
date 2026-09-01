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
exports.MonthViewV4 = MonthViewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const format_1 = require("../../calendar/format");
const layout_v4_1 = require("../../calendar/layout-v4");
const grid_v4_1 = require("./internal/grid-v4");
/** How many event dots a full cell shows before it counts the rest. */
const MAX_DOTS = 3;
/**
 * **V4 month view** — same props as {@link MonthView} plus `locale`,
 * `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized** — see `locale`.
 * 2. **Every day cell clears 44** and carries a full accessible name: the
 *    date, whether it is today, and how many events it holds. The base named
 *    the cell with the day number alone, so a reader heard "17" with no
 *    context and no event count.
 * 3. **Today is a ring whose space is always reserved**, so marking it never
 *    nudges the grid — and the ring is drawn *and* named, never colour alone.
 * 4. **Press is a state layer**, not an opacity on the cell's content.
 */
function MonthViewV4({ month, events = [], selected, today, weekStartsOn = 0, density = 'full', locale, todayLabel = 'today', formatEventCount, onSelectDate, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const compact = density === 'compact';
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: compact ? 'narrow' : 'short' }), [weekStartsOn, locale, compact]);
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const countLabel = formatEventCount ?? ((n) => `${n} ${n === 1 ? 'event' : 'events'}`);
    const eventsFor = (date) => events.filter((e) => (0, format_1.sameDay)(e.start, date));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minHeight: tap } }, col);
                    }
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dots = dayEvents.slice(0, compact ? 1 : MAX_DOTS);
                    const overflow = dayEvents.length - dots.length;
                    const name = [
                        longDate.format(date),
                        isToday ? todayLabel : null,
                        dayEvents.length > 0 ? countLabel(dayEvents.length) : null,
                    ]
                        .filter(Boolean)
                        .join(', ');
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { selected: isSelected }, disabled: !onSelectDate, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                            flex: 1,
                            minHeight: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xs / 2,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            // The ring's space is reserved on every cell, so marking
                            // today never nudges the grid.
                            borderWidth: 2,
                            borderColor: isToday && !isSelected ? colors.primary : 'transparent',
                            backgroundColor: isSelected
                                ? colors.primary
                                : pressed
                                    ? (0, state_v4_1.pressFill)(theme)
                                    : 'transparent',
                        }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numeric: "tabular", weight: isToday || isSelected ? 'bold' : 'regular', style: { color: isSelected ? colors.onPrimary : colors.onCard }, children: date.getDate() }), dots.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { pointerEvents: "none", style: { flexDirection: 'row', gap: tokens.spacing.xs / 2 }, children: [dots.map((e) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: tokens.spacing.xs,
                                            height: tokens.spacing.xs,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: isSelected
                                                ? colors.onPrimary
                                                : (0, grid_v4_1.toneFill)(theme, (0, grid_v4_1.eventTone)(e.tone)),
                                        } }, e.id))), overflow > 0 && !compact ? ((0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: ["+", overflow] })) : null] })) : null] }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=MonthViewV4.js.map