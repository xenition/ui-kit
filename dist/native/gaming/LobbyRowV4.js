"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRowV4 = LobbyRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Five changes
 *
 * 1. **A lobby with no capacity stops calling itself full.** The base computed
 *    `clamp(players, 0, capacity || players)` and printed
 *    `` `${filled}/${capacity || players}` ``, so a room with `capacity: 0`
 *    showed **5/5** — apparently full — while `isFull` required `capacity > 0`
 *    and so left Join **enabled**. The badge and the button read the same zero
 *    and disagreed about it. `slotParts()` reads it once: no capacity is an
 *    unknown room, not a full one, and an unknown room is not joinable.
 * 2. **A full room is a capacity fact, not an error.** The badge was `danger`
 *    — the tone this kit spends on failures — for a room that is simply
 *    popular. It is a neutral chip, and the word in the button says which
 *    state it is in.
 * 3. **The slot meter is a real `progressbar` with a value.** It was a row of
 *    coloured pips under one flattened label, so a reader was told "3 of 10
 *    slots filled" but could not get the meter itself, and a screen at 200%
 *    got ten one-pixel slivers. The track is the module's opaque placeholder
 *    ground rather than the `border` hairline used as a fill.
 * 4. **The row is one spoken name**, built from the lock, the name, the host,
 *    the mode and the slots — the base left the title, the meta line, the
 *    padlock and the badge as four separate stops, and drew a blank
 *    `' '` caption when a lobby had neither host nor mode.
 * 5. **Join clears 44** and its label is a prop on both twins.
 */
function LobbyRowV4({ lobby, variant = 'default', joining = false, joinLabel = 'Join', fullLabel = 'Full', inProgressLabel = 'In progress', formatSlots = (filled, capacity) => `${filled} / ${capacity}`, onJoin, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const compact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const slots = (0, arcade_v4_1.slotParts)(lobby.players, lobby.capacity);
    // With no capacity there is no fraction to be part of, so the bare count is
    // the honest readout — inventing a denominator is what produced "5/5".
    const slotText = slots.capacity > 0 ? formatSlots(slots.filled, slots.capacity) : String(slots.filled);
    const canJoin = slots.joinable && lobby.inProgress !== true;
    const buttonLabel = lobby.inProgress === true ? inProgressLabel : slots.full ? fullLabel : joinLabel;
    const caption = (0, tone_v4_1.metaLine)([
        lobby.host ? `Host ${lobby.host}` : undefined,
        !compact ? lobby.mode : undefined,
    ]);
    const name = (0, arcade_v4_1.spokenLine)([
        lobby.locked ? 'Locked' : null,
        lobby.name,
        lobby.host ? `Host ${lobby.host}` : null,
        lobby.mode,
        slotText,
        lobby.inProgress === true ? inProgressLabel : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [lobby.locked ? (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "\uD83D\uDD12" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: lobby.name })] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: slotText }) }), onJoin ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: canJoin ? 'primary' : 'secondary', size: "sm", loading: joining, disabled: !canJoin, onPress: () => onJoin(lobby), accessibilityLabel: (0, arcade_v4_1.spokenLine)([buttonLabel, lobby.name]), style: { minHeight: tap }, children: buttonLabel })) : null] }), !compact && slots.ratio != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: slotText, accessibilityValue: { min: 0, max: slots.capacity, now: slots.filled }, style: {
                    height: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${Math.round(slots.ratio * 100)}%`,
                        height: '100%',
                        backgroundColor: colors.primary,
                    } }) })) : null] }));
}
//# sourceMappingURL=LobbyRowV4.js.map