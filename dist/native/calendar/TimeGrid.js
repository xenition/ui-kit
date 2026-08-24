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
exports.TimeGrid = TimeGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
const GUTTER = 48;
/**
 * A vertical time grid — hour rules with timed events positioned by their
 * minute offset and sized by duration. Overlapping events split the available
 * width evenly so neither is hidden. A `now` marker (danger-toned line + dot)
 * lands only when `now` is on `day`. Every color is a theme token.
 */
function TimeGrid({ day, events = [], startHour = 6, endHour = 22, hourHeight = 56, now, onSelectEvent, selectedEventId, scroll = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const totalHeight = (to - from) * hourHeight;
    const yFor = (minutes) => ((minutes - gridTop) / 60) * hourHeight;
    const timed = React.useMemo(() => events
        .filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, day))
        .sort((a, b) => a.start.getTime() - b.start.getTime()), [events, day]);
    // Naive overlap grouping: events sharing any minute go in the same column set.
    const positioned = timed.map((event, index) => {
        const startMin = (0, format_1.minutesSinceMidnight)(event.start);
        const endMin = event.end ? (0, format_1.minutesSinceMidnight)(event.end) : startMin + 30;
        const overlaps = timed.filter((o) => {
            const oStart = (0, format_1.minutesSinceMidnight)(o.start);
            const oEnd = o.end ? (0, format_1.minutesSinceMidnight)(o.end) : oStart + 30;
            return oStart < endMin && startMin < oEnd;
        });
        const col = overlaps.findIndex((o) => o.id === event.id);
        return {
            event,
            key: event.id || String(index),
            top: Math.max(0, yFor(startMin)),
            height: Math.max(hourHeight / 3, yFor(endMin) - yFor(startMin)),
            widthPct: 100 / Math.max(1, overlaps.length),
            leftPct: (100 / Math.max(1, overlaps.length)) * Math.max(0, col),
        };
    });
    const nowMinutes = now != null && (0, format_1.sameDay)(now, day) ? (0, format_1.minutesSinceMidnight)(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: totalHeight, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: i * hourHeight - tokens.typography.scale.xs / 2, right: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, format_1.hourLabel)(h) }) }, h))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: i * hourHeight,
                            left: 0,
                            right: 0,
                            height: 1,
                            backgroundColor: colors.border,
                        } }, h))), positioned.map((p) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: p.top,
                            height: p.height,
                            left: `${p.leftPct}%`,
                            width: `${p.widthPct}%`,
                            paddingRight: 2,
                            paddingLeft: tokens.spacing.xs,
                        }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: p.event, variant: "soft", size: "sm", height: p.height, selected: p.event.id === selectedEventId, onPress: onSelectEvent, style: { flex: 1 } }) }, p.key))), showNow ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Current time", accessibilityRole: "image", style: { position: 'absolute', top: yFor(nowMinutes), left: 0, right: 0, flexDirection: 'row', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.sm,
                                    height: tokens.spacing.sm,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.danger,
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, backgroundColor: colors.danger } })] })) : null] })] }));
    if (!scroll)
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: style, showsVerticalScrollIndicator: false, children: body }));
}
//# sourceMappingURL=TimeGrid.js.map