"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxHeaderV4 = InboxHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the numeral shows `999+` rather than a number nobody reads. */
const COUNT_CAP = 999;
/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The count says what it counts.** A reader heard "Inbox" and then "42",
 *    with nothing between them to say what 42 was. The title and the numeral
 *    are now one accessible name — "Inbox, 42 unread" — with the numeral
 *    itself drawn tabular so it does not shift as it counts down.
 * 2. **Syncing is announced.** The caption appeared and disappeared silently;
 *    it is a polite live region now, and `polite` rather than `assertive`
 *    because a background refresh is not worth interrupting a sentence for.
 * 3. **The heading role sits on the heading.** The base put
 *    `accessibilityRole="header"` on the whole bar, back button and actions
 *    included, so the row of icons was part of the heading. It sits on the
 *    title group — the same element the web twin marks up — and the bar itself
 *    is just a bar.
 * 4. **Every button clears 44** and answers a press with M3's state layer.
 *    `padding: spacing.xs` around a glyph plus `hitSlop={8}` is roughly 28
 *    points of real target, and `opacity: 0.6` reads as unavailable.
 */
function InboxHeaderV4({ title, unreadCount = 0, onBack, actions, syncing = false, formatUnread = (n) => `${n} unread`, syncingLabel = 'Syncing…', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const safeActions = actions ?? [];
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const count = unreadCount > 0 ? unreadCount : 0;
    const tapStyle = ({ pressed }) => ({
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: tapStyle, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2039", size: "2xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: (0, mail_v4_1.spokenLine)([title, count > 0 ? formatUnread(count) : null]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title }), count > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "mutedText", numeric: "tabular", children: count > COUNT_CAP ? `${COUNT_CAP}+` : String(count) })) : null] }), syncing ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", accessibilityLiveRegion: "polite", children: syncingLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: safeActions.map((a) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.label, onPress: a.onPress, style: tapStyle, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: a.glyph, size: "xl", color: "onSurface" }) }, a.id))) })] }));
}
//# sourceMappingURL=InboxHeaderV4.js.map