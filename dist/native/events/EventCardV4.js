"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCardV4 = EventCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/**
 * **V4 event card** — same props as {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={title}` on the
 *    pressable root replaces the whole subtree, so the date, the time, the
 *    venue, the category and the attendee count were all unreachable — the
 *    card said "Summer Fest, button" and stopped.
 * 2. **`imageAlt` reaches the placeholder path.** It was applied only to a
 *    real `<Image>`, so a card with no cover threw the caller's alt text away
 *    and drew an unnamed emoji.
 * 3. **The compact loading state keeps its row layout.** The skeleton ignored
 *    `variant`, so a `compact` card loaded as a column and then snapped
 *    sideways into a row when the data arrived.
 * 4. **The skeleton survives dark mode.** It was `tokens.ramps.neutral[100]`
 *    and `[200]`, and the native ramps keep their light orientation in both
 *    schemes — the theme's own comment says so — so every loading card was a
 *    pair of near-white slabs on a dark page.
 * 5. **A press is a state layer**, not `opacity: 0.9` — a dimmed card is how
 *    M3 spells *unavailable*.
 *
 * **Renders nothing without a `title`.**
 */
function EventCardV4({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', onPress, loading = false, loadingLabel = 'Loading event', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            flexDirection: isCompact ? 'row' : 'column',
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: containerStyle, children: [!isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: isFeatured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3,
                        backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                    } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.spacing.lg,
                                width: '70%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.spacing.md,
                                width: '45%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, event_v4_1.placeholderGround)(theme),
                            } })] })] }));
    }
    if (!title)
        return null;
    const meta = [date, time].filter(Boolean).join(' · ');
    const goingLabel = typeof attendeeCount === 'number' ? `${attendeeCount} going` : null;
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            height: isFeatured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3,
            width: '100%',
            backgroundColor: (0, event_v4_1.placeholderGround)(theme),
        }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : (
            // Change 2: the caller's alt text names the placeholder too, instead
            // of being dropped along with the missing image.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: imageAlt != null, accessibilityLabel: imageAlt, style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDF9F\uFE0F", size: "2xl" }) })), category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "primary", children: category }) })) : null] })) : null;
    const line = (glyph, text) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "sm", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: text })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [isCompact && category ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "primary", children: category })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: isFeatured ? 'xl' : 'base', weight: "bold", tone: "onCard", numberOfLines: 2, children: title }), meta ? line('🗓️', meta) : null, location ? line('📍', location) : null, goingLabel ? line('👥', goingLabel) : null] }));
    const inner = isCompact ? (body) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cover, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, event_v4_1.spokenLine)([title, category, date, time, location, goingLabel]), onPress: onPress, style: ({ pressed }) => [
                containerStyle,
                pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) } : null,
            ], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=EventCardV4.js.map