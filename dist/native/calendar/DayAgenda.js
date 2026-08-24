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
exports.DayAgenda = DayAgenda;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
/**
 * A single-day agenda — a vertical, time-labelled list of the day's events.
 * Events are filtered to `day` and sorted by start; all-day items float to the
 * top. Renders an explicit empty state and a loading skeleton, and (when `now`
 * falls on `day`) a "Now" divider. Colors come from theme tokens only.
 */
function DayAgenda({ day, events = [], now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events scheduled', variant = 'soft', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dayEvents = React.useMemo(() => events
        .filter((e) => (0, format_1.sameDay)(e.start, day))
        .sort((a, b) => {
        if (a.allDay !== b.allDay)
            return a.allDay ? -1 : 1;
        return a.start.getTime() - b.start.getTime();
    }), [events, day]);
    const showNow = now != null && (0, format_1.sameDay)(now, day);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading agenda", style: style, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.spacing['2xl'],
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[100],
                    marginBottom: tokens.spacing.sm,
                } }, i))) }));
    }
    if (dayEvents.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: style, children: [showNow ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.sm,
                            height: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.danger,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            marginLeft: tokens.spacing.xs,
                            color: colors.danger,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                        }, children: `Now · ${(0, format_1.clockLabel)(now)}` })] })) : null, dayEvents.map((event) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: { flexDirection: 'row', marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing['2xl'] + tokens.spacing.xs, paddingTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: event.allDay ? 'All day' : (0, format_1.clockLabel)(event.start) }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: variant, selected: event.id === selectedEventId, onPress: onSelectEvent }) })] }, event.id)))] }));
}
//# sourceMappingURL=DayAgenda.js.map