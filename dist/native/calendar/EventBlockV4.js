"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBlockV4 = EventBlockV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const format_1 = require("../../calendar/format");
const grid_v4_1 = require("./internal/grid-v4");
/** The tone rail down a soft or outlined block. 3px — a bar, not a hairline. */
const RAIL = 3;
/**
 * **V4 event block** — same props as {@link EventBlock} plus `showTime` and
 * `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink.** The base inked every
 *    solid variant `onPrimary` regardless of the event's tone, so a `success`
 *    event was a green block wearing the brand's ink.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16%-tint ground alone does not.
 * 3. **A short block drops its time rather than clipping it.** The base laid
 *    out title and time unconditionally, so a 15-minute event rendered two
 *    lines into a box with room for one.
 * 4. **The block is one announced object** — "Standup, 9:00–9:15, Room 2" —
 *    rather than three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
function EventBlockV4({ event, variant = 'soft', size = 'md', selected = false, showTime, allDayLabel = 'All day', onPress, height, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!event?.title)
        return null;
    const tone = (0, grid_v4_1.eventTone)(event.tone);
    const solid = variant === 'solid';
    const fill = solid ? (0, grid_v4_1.toneFill)(theme, tone) : (0, grid_v4_1.blockGround)(theme, tone);
    // `onPair()`, not `onPrimary`: the compiler guarantees each fill's own ink.
    const ink = solid ? (0, grid_v4_1.onPair)(theme, tone) : colors.onCard;
    const time = event.allDay ? allDayLabel : (0, format_1.timeRangeLabel)(event.start, event.end);
    // A 15-minute block has room for one line. Clipping the time is worse than
    // dropping it, and the accessible name still carries it either way.
    const room = height == null || height >= tokens.spacing['2xl'];
    const withTime = (showTime ?? true) && room;
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.xs,
                overflow: 'hidden',
                height,
                borderRadius: tokens.radius.sm,
                borderWidth: variant === 'outline' ? 1 : 0,
                borderColor: (0, grid_v4_1.toneFill)(theme, tone),
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                paddingVertical: size === 'sm' ? tokens.spacing.xs / 2 : tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.xs,
                // A selected block gains a ring, not a different fill, so it does
                // not change tone when it is chosen.
                borderTopWidth: selected ? 2 : variant === 'outline' ? 1 : 0,
            },
            style,
        ], children: [!solid ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: RAIL,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, grid_v4_1.toneFill)(theme, tone),
                } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: size === 'sm' ? 'xs' : 'sm', weight: "semibold", numberOfLines: 1, style: { color: ink }, children: event.title }), withTime && time ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", numeric: "tabular", numberOfLines: 1, style: { color: solid ? ink : (0, grid_v4_1.toneInk)(theme, tone) }, children: time })) : null] })] }));
    const name = (0, grid_v4_1.metaLine)([event.title, time, event.location, event.subtitle]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, accessibilityState: { selected }, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { selected }, onPress: () => onPress(event), children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=EventBlockV4.js.map