"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCardV4 = DriverCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 driver card** — same props as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number.** The base drew five glyphs and stopped;
 *    `RatingV4 showValue` puts `4.9` beside them, which is what a low-vision
 *    user reads and what everyone actually compares.
 * 2. **Presence is not a coloured dot alone.** `online` was a green circle and
 *    nothing else — invisible to a colour-blind user and to a screen reader.
 *    It is now a dot **and** a word.
 * 3. **Press is a state layer**, not `opacity` on the card's content, which is
 *    the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque.** The base used a translucent wash of `muted`,
 *    which borrows whatever is behind it.
 * 5. **The message and call actions are named.** They were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function DriverCardV4({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant = 'default', messageLabel = 'Message driver', callLabel = 'Call driver', onlineLabel = 'Online', offlineLabel = 'Offline', formatTripCount, onMessage, onCall, onPress, loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ flexDirection: 'row', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing['2xl'],
                        height: tokens.spacing['2xl'],
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.base,
                                width: '50%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.sm,
                                width: '70%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                            } })] })] }));
    }
    if (!name)
        return null;
    const compact = variant === 'compact';
    const trips = typeof tripCount === 'number'
        ? (formatTripCount ?? ((n) => `${n.toLocaleString()} trips`))(tripCount)
        : null;
    const caption = (0, fleet_v4_1.metaLine)([vehicle, plate, trips]);
    const presence = online == null ? null : online ? onlineLabel : offlineLabel;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: name }), presence ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    width: tokens.spacing.sm,
                                                    height: tokens.spacing.sm,
                                                    borderRadius: tokens.radius.full,
                                                    backgroundColor: online ? colors.success : colors.muted,
                                                } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: online ? 'successText' : 'mutedText', children: presence })] })) : null] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), etaLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: etaLabel })) : null] }), !compact && (onMessage || onCall) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: [onMessage ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onMessage, accessibilityLabel: messageLabel, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "mail", size: "sm" }) })) : null, onCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onPress: onCall, accessibilityLabel: callLabel, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "phone", size: "sm" }) })) : null] })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, fleet_v4_1.metaLine)([name, presence, caption, etaLabel]), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=DriverCardV4.js.map