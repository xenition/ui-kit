"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInRowV4 = CheckInRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/**
 * **V4 check-in row** — same props as {@link CheckInRow} plus `checkInLabel`,
 * `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** The toggle was about 34px
 *    tall, and this is a staff surface: someone works a door with one hand,
 *    at arm's length, holding a scanner in the other. It is now a full tap
 *    target.
 * 2. **The attendee region is a sibling of the toggle, not a wrapper round
 *    it.** The row's identity block names itself once — name, ticket type,
 *    state, time — and the button stays its own reachable element beside it,
 *    rather than being flattened into a single leaf.
 * 3. **A press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `opacity: 0.5`; the two were close enough
 *    that a pressed button read as an unavailable one.
 * 4. **Every word on the row is a prop.** `Check in`, `Checked in` and
 *    `Undo check-in` were hard-coded English on a component whose whole job is
 *    to be operated at speed by venue staff.
 */
function CheckInRowV4({ name, avatarUrl, ticketType, checkedInAt, checkedIn = false, checkInLabel = 'Check in', checkedInLabel = 'Checked in', undoLabel = 'Undo check-in', onToggle, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const stateWord = checkedIn
        ? checkedInAt
            ? `${checkedInLabel} · ${checkedInAt}`
            : checkedInLabel
        : 'Not in';
    const fill = checkedIn ? colors.success : colors.primary;
    const ink = (0, event_v4_1.onPair)(theme, checkedIn ? 'success' : 'primary');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tap,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, event_v4_1.spokenLine)([name, ticketType, stateWord]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.sm,
                                    flexWrap: 'wrap',
                                }, children: [ticketType ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: ticketType })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: checkedIn ? 'success' : 'neutral', children: stateWord })] })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked: checkedIn, disabled }, accessibilityLabel: (0, event_v4_1.spokenLine)([checkedIn ? undoLabel : checkInLabel, name]), disabled: disabled, onPress: () => onToggle?.(!checkedIn), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: tap,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed && !disabled ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", style: { color: ink }, children: checkedIn ? '✓' : '+' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", style: { color: ink }, children: checkedIn ? checkedInLabel : checkInLabel })] })] }));
}
//# sourceMappingURL=CheckInRowV4.js.map