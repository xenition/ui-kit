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
exports.MonthViewV3 = MonthViewV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
const PREVIEW_MAX = 4;
/**
 * MonthView, redesigned (v3): a **compact month with a mini agenda preview**.
 * The grid is small and dense (single tone dot per day), and beneath it a short
 * agenda lists the focused day's events (the `selected` day, else `today`) as
 * time + tone-rail + title rows. Selected fills; today rings + bolds (never
 * color-alone). Same props, token-pure.
 */
function MonthViewV3({ month, events = [], selected, today, weekStartsOn = 0, density = 'compact', onSelectDate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cells = React.useMemo(() => (0, format_1.monthGrid)(month, weekStartsOn), [month, weekStartsOn]);
    const headers = (0, format_1.weekdayHeader)(format_1.WEEKDAYS_NARROW, weekStartsOn);
    const eventsFor = (date) => events
        .filter((e) => (0, format_1.sameDay)(e.start, date))
        .sort((a, b) => {
        if (a.allDay !== b.allDay)
            return a.allDay ? -1 : 1;
        return a.start.getTime() - b.start.getTime();
    });
    const focus = selected ?? today ?? null;
    const focusEvents = focus ? eventsFor(focus) : [];
    const focusLabel = focus ? `${(0, format_1.monthLongLabel)(focus)} ${focus.getDate()}` : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                padding: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: headers.map((w, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: w }) }, i))) }), Array.from({ length: cells.length / 7 }).map((_, row) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: cells.slice(row * 7, row * 7 + 7).map((date, col) => {
                    if (date == null) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, aspectRatio: 1 } }, col);
                    }
                    const dayEvents = eventsFor(date);
                    const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                    const isToday = today != null && (0, format_1.sameDay)(today, date);
                    const dot = dayEvents[0];
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${date.getDate()}${isToday ? ', today' : ''}` +
                            (dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}` : ''), accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.lg,
                                    height: tokens.spacing.lg,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: isSelected ? colors.primary : 'transparent',
                                    borderWidth: isToday && !isSelected ? 1.5 : 0,
                                    borderColor: colors.primary,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isSelected ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: isSelected || isToday ? '800' : '400',
                                    }, children: date.getDate() }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xs, justifyContent: 'center' }, children: dot != null && !isSelected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 4,
                                        height: 4,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, format_1.resolveTone)(colors, dot.tone).base,
                                    } })) : null })] }, col));
                }) }, row))), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.sm,
                    paddingTop: tokens.spacing.sm,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: tokens.spacing.xs,
                }, children: [focusLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: focusLabel })) : null, focus == null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Select a day" })) : focusEvents.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No events" })) : (focusEvents.slice(0, PREVIEW_MAX).map((event) => {
                        const { base } = (0, format_1.resolveTone)(colors, event.tone);
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${event.title}, ${event.allDay ? 'All day' : (0, format_1.clockLabel)(event.start)}`, onPress: () => onSelectDate?.(event.start), style: ({ pressed }) => ({
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                                opacity: pressed ? 0.7 : 1,
                            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, alignSelf: 'stretch', borderRadius: tokens.radius.full, backgroundColor: base } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 44, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: event.allDay ? 'All day' : (0, format_1.clockLabel)(event.start) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: event.title })] }, event.id));
                    }))] })] }));
}
//# sourceMappingURL=MonthViewV3.js.map