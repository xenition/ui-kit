"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneRowV4 = TimezoneRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const grid_v4_1 = require("./internal/grid-v4");
/** The zone's current short offset, from `Intl`. `undefined` if it cannot say. */
function defaultOffset(timezone) {
    try {
        const parts = new Intl.DateTimeFormat(undefined, {
            timeZone: timezone,
            timeZoneName: 'shortOffset',
        }).formatToParts(new Date());
        return parts.find((p) => p.type === 'timeZoneName')?.value;
    }
    catch {
        // An unknown IANA name is a host bug, not a reason to crash a settings row.
        return undefined;
    }
}
/**
 * **V4 timezone row** — same props as {@link TimezoneRow} plus
 * `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.** Every platform ships an
 *    IANA database; the base made the host restate what `Intl` already knows,
 *    and showed nothing when they did not.
 * 2. **It is a row from the shared row line**, with the shared press fill —
 *    the base drew its own container and pressed with an opacity.
 * 3. **An unknown zone degrades rather than throwing.** `Intl` throws on an
 *    invalid IANA name, and a settings row is not the place to take the screen
 *    down.
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
function TimezoneRowV4({ timezone, label, offsetLabel, title, variant = 'row', formatOffset, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!timezone)
        return null;
    const offset = offsetLabel ?? (formatOffset ?? defaultOffset)(timezone);
    const caption = (0, grid_v4_1.metaLine)([label ?? timezone, offset]);
    const inline = variant === 'inline';
    if (inline) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, grid_v4_1.metaLine)([title, caption]), style: [
                { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "globe", size: "sm", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })] }));
    }
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(title) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "globe", size: "lg", color: "mutedText" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: title })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: title ? 'xs' : 'base', tone: title ? 'mutedText' : 'onCard', numberOfLines: 1, children: caption })] }), onPress ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "lg", color: "mutedText" }) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, grid_v4_1.metaLine)([title, caption]), children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, grid_v4_1.metaLine)([title, caption]), onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=TimezoneRowV4.js.map