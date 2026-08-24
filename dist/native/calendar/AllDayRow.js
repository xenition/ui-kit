"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDayRow = AllDayRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
/**
 * The all-day band that sits above a day/week time grid — a labelled strip of
 * full-day event chips. Distinct from the timed `TimeGrid`: these events have no
 * clock position. Renders an empty hint unless `hideWhenEmpty`. Token colors
 * only.
 */
function AllDayRow({ day, events = [], label = 'All day', layout = 'scroll', onSelectEvent, selectedEventId, hideWhenEmpty = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const allDay = events.filter((e) => e.allDay && (0, format_1.sameDay)(e.start, day));
    if (allDay.length === 0 && hideWhenEmpty)
        return null;
    const chips = allDay.map((event) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { minWidth: tokens.spacing['2xl'] * 2, marginRight: layout === 'stack' ? tokens.spacing.xs : 0, marginBottom: layout === 'stack' ? tokens.spacing.xs : 0 }, children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: "solid", size: "sm", selected: event.id === selectedEventId, onPress: onSelectEvent }) }, event.id)));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing['2xl'] + tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: allDay.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u2014" })) : layout === 'stack' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap' }, children: chips })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.xs }, children: chips })) })] }));
}
//# sourceMappingURL=AllDayRow.js.map