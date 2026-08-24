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
exports.WeekView = WeekView;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
const GUTTER = 40;
/**
 * A 7-day week view: a sticky weekday header (each column tappable to select the
 * day) over a shared, scrollable hour grid where timed events sit in their day
 * column. Today's header carries a ring + bold weight (never color-alone).
 * Colors resolve from theme tokens only.
 */
function WeekView({ week, events = [], selected, today, weekStartsOn = 0, startHour = 7, endHour = 21, hourHeight = 48, onSelectDate, onSelectEvent, selectedEventId, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const days = React.useMemo(() => (0, format_1.weekDates)(week, weekStartsOn), [week, weekStartsOn]);
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const totalHeight = (to - from) * hourHeight;
    const yFor = (minutes) => ((minutes - gridTop) / 60) * hourHeight;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.md, overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', backgroundColor: colors.surface }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: GUTTER } }), days.map((date) => {
                        const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                        const isToday = today != null && (0, format_1.sameDay)(today, date);
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${(0, format_1.weekdayLabel)(date)} ${date.getDate()}${isToday ? ', today' : ''}`, accessibilityState: { selected: isSelected }, onPress: () => onSelectDate?.(date), style: {
                                flex: 1,
                                alignItems: 'center',
                                paddingVertical: tokens.spacing.xs,
                                backgroundColor: isSelected ? colors.primary : 'transparent',
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: (0, format_1.weekdayLabel)(date) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        marginTop: 2,
                                        width: tokens.spacing.lg,
                                        height: tokens.spacing.lg,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.full,
                                        borderWidth: isToday && !isSelected ? 1 : 0,
                                        borderColor: colors.primary,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isSelected ? colors.onPrimary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: isToday || isSelected ? '800' : '500' }, children: date.getDate() }) })] }, date.toISOString()));
                    })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { showsVerticalScrollIndicator: false, style: { maxHeight: totalHeight }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: totalHeight, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: i * hourHeight - tokens.typography.scale.xs / 2, right: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, format_1.hourLabel)(h) }) }, h))) }), days.map((date, dIdx) => {
                            const dayEvents = events
                                .filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, date))
                                .sort((a, b) => a.start.getTime() - b.start.getTime());
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, borderLeftWidth: dIdx === 0 ? 0 : 1, borderLeftColor: colors.border }, children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: i * hourHeight, left: 0, right: 0, height: 1, backgroundColor: colors.border } }, h))), dayEvents.map((event, i) => {
                                        const startMin = (0, format_1.minutesSinceMidnight)(event.start);
                                        const endMin = event.end ? (0, format_1.minutesSinceMidnight)(event.end) : startMin + 30;
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                position: 'absolute',
                                                top: Math.max(0, yFor(startMin)),
                                                height: Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin)),
                                                left: 1,
                                                right: 1,
                                            }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: "soft", size: "sm", selected: event.id === selectedEventId, onPress: onSelectEvent, style: { flex: 1 } }) }, event.id || String(i)));
                                    })] }, date.toISOString()));
                        })] }) })] }));
}
//# sourceMappingURL=WeekView.js.map