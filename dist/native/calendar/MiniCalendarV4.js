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
exports.MiniCalendarV4 = MiniCalendarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const format_1 = require("../../calendar/format");
const layout_v4_1 = require("../../calendar/layout-v4");
/**
 * **V4 mini calendar** — same props as {@link MiniCalendar} plus `locale` and
 * four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The header and weekday row are localized**, where the base used frozen
 *    English `MONTHS_SHORT` and `WEEKDAYS_NARROW` arrays.
 * 2. **The month chevrons clear 44 and carry names.** They were unlabelled
 *    glyphs.
 * 3. **A marked day says so.** The base drew a dot and nothing else, so the
 *    one piece of information a mini calendar carries was invisible to a
 *    screen reader and to a colour-blind user.
 * 4. **Press is a state layer**, and today's ring space is reserved so the
 *    grid does not shift.
 */
function MiniCalendarV4({ month, selected, today, marks = [], weekStartsOn = 0, variant = 'bordered', locale, previousLabel, nextLabel, todayLabel = 'today', markedLabel = 'has events', onSelectDate, onMonthChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: 'narrow' }), [weekStartsOn, locale]);
    const title = (0, layout_v4_1.monthTitle)(month, { locale, month: 'long' });
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const isMarked = (date) => marks.some((m) => (0, format_1.sameDay)(m, date));
    const chevron = (direction) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: direction < 0 ? (previousLabel ?? 'Previous month') : (nextLabel ?? 'Next month'), onPress: () => onMonthChange?.((0, format_1.addMonths)(month, direction)), style: ({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "base", color: "onSurface" }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            variant === 'bordered'
                ? {
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.card,
                    padding: tokens.spacing.sm,
                }
                : null,
            { gap: tokens.spacing.xs },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: [onMonthChange ? chevron(-1) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "sm", weight: "semibold", tone: "onCard", align: "center", style: { flex: 1 }, children: title }), onMonthChange ? chevron(1) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null)
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: tap } }, col);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const marked = isMarked(date);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [
                            longDate.format(date),
                            isToday ? todayLabel : null,
                            marked ? markedLabel : null,
                        ]
                            .filter(Boolean)
                            .join(', '), accessibilityState: { selected: isSelected }, disabled: !onSelectDate, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                            flex: 1,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: isToday && !isSelected ? colors.primary : 'transparent',
                            backgroundColor: isSelected
                                ? colors.primary
                                : pressed
                                    ? (0, state_v4_1.pressFill)(theme)
                                    : 'transparent',
                        }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", numeric: "tabular", weight: isSelected || isToday ? 'bold' : 'regular', style: { color: isSelected ? colors.onPrimary : colors.onCard }, children: date.getDate() }), marked ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                                    position: 'absolute',
                                    bottom: tokens.spacing.xs / 2,
                                    width: tokens.spacing.xs / 1.5,
                                    height: tokens.spacing.xs / 1.5,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.onPrimary : colors.primary,
                                } })) : null] }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=MiniCalendarV4.js.map