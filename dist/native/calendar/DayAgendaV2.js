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
exports.DayAgendaV2 = DayAgendaV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
/**
 * DayAgenda, redesigned (v2): a **timeline** with a fixed time gutter and a
 * continuous rule down the left. Each event is a tinted card pinned beside its
 * start time, with a node on the rule; when `now` falls on `day` a labelled
 * marker crosses the timeline. Renders empty + loading states. Same props,
 * token-pure.
 */
function DayAgendaV2({ day, events = [], now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dayEvents = React.useMemo(() => events
        .filter((e) => (0, format_1.sameDay)(e.start, day))
        .sort((a, b) => {
        if (a.allDay !== b.allDay)
            return a.allDay ? -1 : 1;
        return a.start.getTime() - b.start.getTime();
    }), [events, day]);
    const showNow = now != null && (0, format_1.sameDay)(now, day);
    const gutter = tokens.spacing['2xl'] + tokens.spacing.xs;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading agenda", style: style, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: gutter, height: 12, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: tokens.spacing['2xl'], borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }, i))) }));
    }
    if (dayEvents.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: style, children: [showNow ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: gutter, color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: (0, format_1.clockLabel)(now) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.danger } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: tokens.radius.full, backgroundColor: colors.danger } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: "Now" })] })] })) : null, dayEvents.map((event, idx) => {
                const { base } = (0, format_1.resolveTone)(colors, event.tone);
                const selected = event.id === selectedEventId;
                const isLast = idx === dayEvents.length - 1;
                const timeText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: { flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: gutter, paddingTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: event.allDay ? 'All day' : (0, format_1.clockLabel)(event.start) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: tokens.spacing.sm,
                                        height: tokens.spacing.sm,
                                        borderRadius: tokens.radius.full,
                                        marginTop: tokens.spacing.sm,
                                        backgroundColor: colors.surface,
                                        borderWidth: 2,
                                        borderColor: base,
                                    } }), !isLast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, paddingBottom: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`, accessibilityState: { selected }, onPress: () => onSelectEvent?.(event), style: ({ pressed }) => ({
                                    borderRadius: tokens.radius.md,
                                    overflow: 'hidden',
                                    flexDirection: 'row',
                                    backgroundColor: (0, format_1.withAlpha)(base, 0.16),
                                    borderWidth: selected ? 1.5 : 0,
                                    borderColor: base,
                                    opacity: pressed ? 0.85 : 1,
                                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.xs, backgroundColor: base } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.sm, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: event.title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [timeText, event.location ? ` · ${event.location}` : ''] })] })] }) })] }, event.id));
            })] }));
}
//# sourceMappingURL=DayAgendaV2.js.map