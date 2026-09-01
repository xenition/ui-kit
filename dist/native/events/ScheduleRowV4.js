"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRowV4 = ScheduleRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
const STATUS_LABEL = {
    scheduled: '',
    live: 'Live now',
    ended: 'Ended',
    cancelled: 'Cancelled',
};
/** A cancelled slot is genuinely a failed state; the other three are not. */
const STATUS_TONE = {
    scheduled: 'neutral',
    live: 'success',
    ended: 'neutral',
    cancelled: 'danger',
};
/** The track rail. 3px — a bar, not a hairline. */
const RAIL = 3;
/**
 * **V4 schedule row** — same props as {@link ScheduleRow} plus `statusLabels`,
 * `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as a range**, which its own prop doc has always
 *    promised. The base stacked two bare times in the gutter with nothing
 *    between them, so "10:30" over "11:15" read as two separate start times on
 *    a printed-looking timetable — the one place that misreading costs someone
 *    a session.
 * 2. **A cancelled slot no longer announces identically to a live one.** The
 *    strike-through was visual only and the row spoke `"10:30 Keynote"`, so a
 *    screen-reader user was told to turn up to a cancelled talk.
 * 3. **A track carries identity.** The rail was `primary` for every track, so
 *    the colour distinguished nothing, and a row with no track filled the rail
 *    with `colors.border` — a hairline token used as a fill. `trackTone` lets
 *    the caller give a track its own tone; a row with no track draws no rail
 *    and keeps the gutter, so titles stay on one vertical line.
 * 4. **The status caption takes the contrast-corrected ink**, not the fill
 *    slot — `colors.muted` as text carries no contrast promise at all.
 * 5. **The row clears 44, the gutter is tabular, and a press is a state
 *    layer** rather than `opacity: 0.7`.
 *
 * **Renders nothing without a `title`.**
 */
function ScheduleRowV4({ time, endTime, title, room, track, status = 'scheduled', statusLabels, formatRange, trackTone = 'neutral', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!title)
        return null;
    const statusLabel = statusLabels?.[status] ?? STATUS_LABEL[status];
    const isCancelled = status === 'cancelled';
    const range = endTime ? (formatRange ?? ((a, b) => `${a}–${b}`))(time, endTime) : time;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: tokens.spacing.md,
            minHeight: tap,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing['2xl'] + tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onSurface", numeric: "tabular", children: range }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: RAIL,
                    borderRadius: tokens.radius.full,
                    backgroundColor: track ? (0, event_v4_1.toneFill)(theme, trackTone) : 'transparent',
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 2, style: { textDecorationLine: isCancelled ? 'line-through' : 'none' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            flexWrap: 'wrap',
                        }, children: [track ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, event_v4_1.toneInk)(theme, trackTone) }, children: track })) : null, room ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: room })) : null, statusLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: (0, event_v4_1.toneInk)(theme, STATUS_TONE[status]) }, children: statusLabel })) : null] })] })] }));
    const name = (0, event_v4_1.spokenLine)([range, title, track, room, statusLabel]);
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: style, children: ({ pressed }) => content(pressed) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: style, children: content(false) }));
}
//# sourceMappingURL=ScheduleRowV4.js.map