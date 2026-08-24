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
exports.MiniCalendar = MiniCalendar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
/**
 * A dense mini month picker for sidebars, popovers and the `EventDetailSheet`.
 * Header chevrons page the month; days are 1:1 tap targets with a selected fill
 * and a marked-day dot. Distinct from `MonthView` (no per-day event stacks) and
 * from the `Calendar` primitive (integrated month paging + marks). Token colors
 * only.
 */
function MiniCalendar({ month, selected, today, marks = [], weekStartsOn = 0, variant = 'bordered', onSelectDate, onMonthChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(format_1.WEEKDAYS_NARROW, weekStartsOn);
    const isMarked = (d) => marks.some((m) => (0, format_1.sameDay)(m, d));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                borderWidth: variant === 'bordered' ? 1 : 0,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
                backgroundColor: variant === 'bordered' ? colors.surface : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous month", onPress: () => onMonthChange?.((0, format_1.addMonths)(month, -1)), style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base }, children: "\u2039" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${(0, format_1.monthLongLabel)(month)} ${month.getFullYear()}` }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next month", onPress: () => onMonthChange?.((0, format_1.addMonths)(month, 1)), style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base }, children: "\u203A" }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, aspectRatio: 1 } }, col);
                    }
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${(0, format_1.monthLongLabel)(month)} ${date.getDate()}${isToday ? ', today' : ''}`, accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.lg + tokens.spacing.xs,
                                    height: tokens.spacing.lg + tokens.spacing.xs,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.primary : 'transparent',
                                    borderWidth: isToday && !isSelected ? 1 : 0,
                                    borderColor: colors.primary,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isSelected ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: isSelected || isToday ? '800' : '400',
                                    }, children: date.getDate() }) }), isMarked(date) ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    bottom: 0,
                                    width: tokens.spacing.xs,
                                    height: tokens.spacing.xs,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.onPrimary : colors.accent,
                                } })) : null] }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=MiniCalendar.js.map