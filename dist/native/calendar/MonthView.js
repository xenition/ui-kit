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
exports.MonthView = MonthView;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
const MAX_DOTS = 3;
/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (not color-alone). All colors resolve from theme tokens.
 */
function MonthView({ month, events = [], selected, today, weekStartsOn = 0, density = 'full', onSelectDate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(density === 'compact' ? format_1.WEEKDAYS_NARROW : format_1.WEEKDAYS_SHORT, weekStartsOn);
    const eventsFor = (date) => events.filter((e) => (0, format_1.sameDay)(e.start, date));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, aspectRatio: density === 'compact' ? 1 : 0.9 } }, col);
                    }
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dots = dayEvents.slice(0, density === 'compact' ? 1 : MAX_DOTS);
                    const overflow = dayEvents.length - dots.length;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${date.getDate()}${isToday ? ', today' : ''}` +
                            (dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}` : ''), accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: {
                            flex: 1,
                            aspectRatio: density === 'compact' ? 1 : 0.9,
                            alignItems: 'center',
                            paddingTop: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.xl,
                                    height: tokens.spacing.xl,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.primary : 'transparent',
                                    borderWidth: isToday && !isSelected ? 1 : 0,
                                    borderColor: colors.primary,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isSelected ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: isSelected || isToday ? '800' : '400',
                                    }, children: date.getDate() }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 }, children: [dots.map((e, i) => {
                                        const { base } = (0, format_1.resolveTone)(colors, e.tone);
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                width: tokens.spacing.xs,
                                                height: tokens.spacing.xs,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: isSelected ? colors.onPrimary : base,
                                            } }, i));
                                    }), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `+${overflow}` })) : null] })] }, col));
                }) }, row)))] }));
}
//# sourceMappingURL=MonthView.js.map