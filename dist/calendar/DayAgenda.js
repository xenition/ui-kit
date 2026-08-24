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
exports.DayAgenda = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const commerce_1 = require("../commerce");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
/**
 * A single-day agenda — a vertical, time-labelled list of the day's events.
 * Events are filtered to `day` and sorted by start; all-day items float to the
 * top. Renders an explicit `EmptyState` and a loading skeleton, and (when `now`
 * falls on `day`) a "Now" divider. Colors come from theme tokens only.
 */
exports.DayAgenda = React.forwardRef(function DayAgenda({ day, events = [], now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events scheduled', variant = 'soft', className, ...rest }, ref) {
    const dayEvents = React.useMemo(() => events
        .filter((e) => (0, format_1.sameDay)(e.start, day))
        .sort((a, b) => {
        if (a.allDay !== b.allDay)
            return a.allDay ? -1 : 1;
        return a.start.getTime() - b.start.getTime();
    }), [events, day]);
    const showNow = now != null && (0, format_1.sameDay)(now, day);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading agenda", className: className, ...rest, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "mb-2 h-10 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }, i))) }));
    }
    if (dayEvents.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: className, ...rest, children: [showNow ? ((0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-danger" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-xs font-bold text-danger", children: `Now · ${(0, format_1.clockLabel)(now)}` })] })) : null, dayEvents.map((event) => ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", className: "mb-2 flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 shrink-0 pt-1", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: event.allDay ? 'All day' : (0, format_1.clockLabel)(event.start) }) }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: variant, selected: event.id === selectedEventId, onPress: onSelectEvent }) })] }, event.id)))] }));
});
//# sourceMappingURL=DayAgenda.js.map