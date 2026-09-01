"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCardV4 = SessionCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarGroupV4_1 = require("../primitives/AvatarGroupV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/** The highlight rail down a keynote. 4px — a bar, not a hairline. */
const RAIL = 4;
/**
 * **V4 session card** — same props as {@link SessionCard} plus
 * `bookmarkLabel`, `unbookmarkLabel` and `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **The bookmark is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the title as its name, so VoiceOver flattened the
 *    entire card — bookmark star included — into one leaf. There was no
 *    gesture that bookmarked a session. The card's activation now wraps only
 *    the media and text, and the star is its **sibling** inside the card, on
 *    both twins. (The web twin fails the same way through a different door:
 *    its card-level `onKeyDown` cancels Enter's default action on the nested
 *    button and navigates instead.)
 * 2. **A negative seat count stops being printed.** The base clamped the
 *    *bar* and then printed the raw number, so `seatsTaken: -5` drew an empty
 *    meter beside the words "−5 / 100 seats taken". `seatParts()` clamps both.
 * 3. **The meter is a real `progressbar` with a value**, and it sits outside
 *    the card's activation so a reader can reach it at all.
 * 4. **The card announces its content** — track, title, time, room, speakers
 *    and seats — where `accessibilityLabel={title}` replaced all of it.
 * 5. **A track is identity, so its badge holds one tone.** The base switched
 *    the badge to `primary` on a highlighted card, which made the same track
 *    two colours depending on the card it appeared in.
 * 6. **The bookmarked star is `primary` on both twins, drawn as ink** — it was
 *    `accent` here and `primary` on web, and web's `IconColor` has no `accent`
 *    member to match with. The meter's track, the last neutral-ramp index in
 *    the file, is the shared opaque placeholder.
 *
 * **Renders nothing without a `title`.**
 */
function SessionCardV4({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, bookmarkLabel = 'Bookmark session', unbookmarkLabel = 'Remove bookmark', formatSeats, onBookmark, onPress, variant = 'default', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const isHighlight = variant === 'highlight';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const seats = (0, event_v4_1.seatParts)(seatsTaken, capacity);
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const meta = [time, room].filter(Boolean).join(' · ');
    const seatCaption = seats
        ? seats.full
            ? 'Session full'
            : (formatSeats ?? ((t, c) => `${t} / ${c} seats taken`))(seats.taken, seats.capacity)
        : null;
    const containerStyle = [
        {
            overflow: 'hidden',
            flexDirection: 'row',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: isHighlight ? colors.primary : colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    const heading = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [track ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "neutral", children: track })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", children: title }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: meta })) : null] }), abstract ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numberOfLines: 3, children: abstract })) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarGroupV4_1.AvatarGroupV4, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: speakerNames })] })) : null] }));
    const name = (0, event_v4_1.spokenLine)([track, title, time, room, speakerNames, seatCaption]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [isHighlight ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { width: RAIL, backgroundColor: colors.primary } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => heading(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1, minWidth: 0 }, children: heading(false) })), onBookmark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: bookmarked }, accessibilityLabel: bookmarked ? unbookmarkLabel : bookmarkLabel, onPress: () => onBookmark(!bookmarked), style: ({ pressed }) => ({
                                    width: tap,
                                    height: tap,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: pressed
                                        ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                        : 'transparent',
                                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", style: { color: bookmarked ? (0, event_v4_1.toneInk)(theme, 'primary') : colors.mutedText }, children: bookmarked ? '★' : '☆' }) })) : null] }), seats && seatCaption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: seatCaption, accessibilityValue: { min: 0, max: seats.capacity, now: seats.taken }, style: {
                                    height: tokens.spacing.xs,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                                    overflow: 'hidden',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: `${Math.round(seats.ratio * 100)}%`,
                                        height: '100%',
                                        backgroundColor: seats.full ? colors.danger : colors.primary,
                                    } }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: seats.full ? (0, event_v4_1.toneInk)(theme, 'danger') : colors.mutedText }, children: seatCaption })] })) : null] })] }));
}
//# sourceMappingURL=SessionCardV4.js.map