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
exports.TimeGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
const GUTTER = 48;
/**
 * A vertical time grid — hour rules with timed events positioned by their
 * minute offset and sized by duration. Overlapping events split the available
 * width evenly so neither is hidden. A `now` marker (danger-toned line + dot)
 * lands only when `now` is on `day`. Every color is a theme token.
 */
exports.TimeGrid = React.forwardRef(function TimeGrid({ day, events = [], startHour = 6, endHour = 22, hourHeight = 56, now, onSelectEvent, selectedEventId, scroll = true, className, ...rest }, ref) {
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
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex", style: { height: totalHeight }, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative", style: { width: GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-1 text-xs text-muted", style: { top: i * hourHeight - 6 }, children: (0, format_1.hourLabel)(h) }, h))) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-0 right-0 h-px bg-border", style: { top: i * hourHeight } }, h))), positioned.map((p) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute pl-1 pr-0.5", style: { top: p.top, height: p.height, left: `${p.leftPct}%`, width: `${p.widthPct}%` }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: p.event, variant: "soft", size: "sm", height: p.height, selected: p.event.id === selectedEventId, onPress: onSelectEvent, className: "h-full" }) }, p.key))), showNow ? ((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": "Current time", className: "absolute left-0 right-0 flex items-center", style: { top: yFor(nowMinutes) }, children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-full bg-danger" }), (0, jsx_runtime_1.jsx)("span", { className: "h-0.5 flex-1 bg-danger" })] })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(scroll ? 'overflow-y-auto' : '', className), ...rest, children: body }));
});
//# sourceMappingURL=TimeGrid.js.map