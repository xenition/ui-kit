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
exports.WeekViewV4 = WeekViewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const format_1 = require("../../calendar/format");
const layout_v4_1 = require("../../calendar/layout-v4");
const EventBlockV4_1 = require("./EventBlockV4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 week view** — same props as {@link WeekView} plus `locale`, `now`,
 * `nowLabel` and `todayLabel`.
 *
 * ## Four changes
 *
 * 1. **Each day column lays out with the shared clustering pass**, so
 *    overlapping events in one column line up — the base carried the same
 *    inconsistent per-event overlap count `TimeGrid` did.
 * 2. **The day headers are localized and named.** They were frozen English
 *    initials with no accessible date behind them.
 * 3. **"Now" is drawn and announced**, and only on today's column — the base
 *    had no now rule in the week view at all.
 * 4. **Column headers clear 44** and press with a state layer.
 */
function WeekViewV4({ week, events = [], selected, today, weekStartsOn = 0, startHour = 6, endHour = 22, hourHeight, locale, now, nowLabel = 'Current time', todayLabel = 'today', onSelectDate, onSelectEvent, selectedEventId, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, grid_v4_1.gridMetrics)(theme);
    const hourPx = hourHeight ?? metrics.hour;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const days = React.useMemo(() => (0, format_1.weekDates)(week, weekStartsOn), [week, weekStartsOn]);
    const headers = React.useMemo(() => (0, layout_v4_1.weekdayNames)(weekStartsOn, { locale, width: 'short' }), [weekStartsOn, locale]);
    const longDate = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }), [locale]);
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const totalHeight = (to - from) * hourPx;
    const yFor = (minutes) => ((minutes - gridTop) / 60) * hourPx;
    const nowMinutes = now != null ? (0, layout_v4_1.minutesOf)(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: metrics.gutter } }), days.map((date, i) => {
                        const isToday = today != null && (0, format_1.sameDay)(today, date);
                        const isSelected = selected != null && (0, format_1.sameDay)(selected, date);
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [longDate.format(date), isToday ? todayLabel : null]
                                .filter(Boolean)
                                .join(', '), accessibilityState: { selected: isSelected }, disabled: !onSelectDate, onPress: () => onSelectDate?.(date), style: ({ pressed }) => ({
                                flex: 1,
                                minHeight: tap,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: tokens.spacing.xs / 2,
                                borderRadius: tokens.radius.md,
                                backgroundColor: isSelected
                                    ? colors.selected
                                    : pressed
                                        ? (0, state_v4_1.pressFill)(theme)
                                        : 'transparent',
                            }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: headers[i] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numeric: "tabular", weight: isToday ? 'bold' : 'regular', style: { color: isToday ? colors.primaryText : colors.onSurface }, children: date.getDate() })] }, i));
                    })] }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: { paddingBottom: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: totalHeight, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: metrics.gutter }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    top: i * hourPx - tokens.typography.scale.xs / 2,
                                    right: tokens.spacing.xs,
                                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: (0, layout_v4_1.hourTitle)(h, locale) }) }, h))) }), days.map((date, dayIndex) => {
                            const timed = events.filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, date));
                            const positioned = (0, layout_v4_1.layoutEvents)(timed);
                            const isToday = today != null && (0, format_1.sameDay)(today, date);
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flex: 1,
                                    borderLeftWidth: 1,
                                    borderLeftColor: colors.border,
                                }, children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                                            position: 'absolute',
                                            top: i * hourPx,
                                            left: 0,
                                            right: 0,
                                            height: 1,
                                            backgroundColor: colors.border,
                                        } }, h))), positioned.map((p) => {
                                        const height = Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin));
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                position: 'absolute',
                                                top: Math.max(0, yFor(p.startMin)),
                                                height,
                                                left: `${(100 / p.columns) * p.column}%`,
                                                width: `${100 / p.columns}%`,
                                                paddingRight: 1,
                                            }, children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, size: "sm", showTime: false, selected: selectedEventId === p.event.id, onPress: onSelectEvent, height: height }) }, p.key));
                                    }), showNow && isToday ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: nowLabel, pointerEvents: "none", style: {
                                            position: 'absolute',
                                            top: yFor(nowMinutes),
                                            left: 0,
                                            right: 0,
                                            height: 2,
                                            backgroundColor: colors.danger,
                                        } })) : null] }, dayIndex));
                        })] }) })] }));
}
//# sourceMappingURL=WeekViewV4.js.map