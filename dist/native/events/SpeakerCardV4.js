"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerCardV4 = SpeakerCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;
/**
 * **V4 speaker card** — same props as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={name}` on the
 *    pressable root replaces the subtree, so the role, the company, the
 *    rating, the bio and every tag were unreachable — a conference app's
 *    speaker directory read as a list of bare names.
 * 2. **`rating` is clamped before it reaches `Rating`.** The primitive fills
 *    `Math.round(value)` glyphs out of `max`, so a `7` from an unvalidated
 *    feed drew seven stars in a five-star row and a negative one drew none
 *    while still announcing itself.
 * 3. **A press is a state layer.** `opacity: 0.9` fades the card's own
 *    content, which is the signal M3 spends on *disabled*.
 * 4. **The card is a raised surface**, so its text takes the `onCard` pair
 *    rather than being inked for the page underneath it.
 *
 * **Renders nothing without a `name`.**
 */
function SpeakerCardV4({ name, role, company, avatarUrl, bio, rating, tags = [], variant = 'row', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const stacked = variant === 'stacked';
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const stars = typeof rating === 'number' && Number.isFinite(rating)
        ? Math.max(0, Math.min(RATING_MAX, rating))
        : null;
    const containerStyle = [
        {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: stacked ? 'column' : 'row',
            alignItems: stacked ? 'center' : 'flex-start',
            gap: tokens.spacing.md,
            padding: tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: stacked ? 'lg' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: stacked ? undefined : 1,
                    minWidth: 0,
                    alignItems: stacked ? 'center' : 'flex-start',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", align: stacked ? 'center' : 'left', children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: stacked ? 'center' : 'left', children: roleLine })) : null, stars != null ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: stars, size: "sm", showValue: true }) : null, bio ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", align: stacked ? 'center' : 'left', numberOfLines: stacked ? 3 : 2, children: bio })) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.xs,
                            justifyContent: stacked ? 'center' : 'flex-start',
                        }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "neutral", children: t }, `${t}-${i}`))) })) : null] })] }));
    const spoken = (0, event_v4_1.spokenLine)([
        name,
        roleLine,
        stars != null ? `${stars} out of ${RATING_MAX}` : null,
        bio,
        ...tags,
    ]);
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: containerStyle, children: ({ pressed }) => content(pressed) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: containerStyle, children: content(false) }));
}
//# sourceMappingURL=SpeakerCardV4.js.map