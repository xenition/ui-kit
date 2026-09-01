"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListRowV4 = MessageListRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const StarButtonV4_1 = require("./StarButtonV4");
const MailLabelChipV4_1 = require("./MailLabelChipV4");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the pill shows `99+` rather than a number nobody reads. */
const COUNT_CAP = 99;
/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The spoken name contains what the row shows.** `accessibilityRole`
 *    makes a row's children presentational, so the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright —
 *    a reader got six fragments of a row whose whole job is to be skimmed.
 *    The name is built with `spokenLine` and carries all of it.
 * 2. **The star is reachable.** Nesting it inside the row's `accessible`
 *    Pressable made it presentational too, so on VoiceOver the only way to
 *    star a message was to open it. It is a sibling of the row's button now.
 * 3. **Selected and pressed are different grounds.** Both resolved to
 *    `colors.border` — a hairline token used as a fill — so in a split-view
 *    inbox the finger repainted every row it passed as "the selected one".
 * 4. **The thread count carries a unit and is the pill its prop doc
 *    promises.** It was a bare numeral in `colors.muted`, which is a ramp step
 *    with no contrast promise; it is a `BadgeV4`, and a reader hears
 *    "4 messages".
 * 5. **Unread is a word and a contrast-corrected ink.** The timestamp took
 *    `colors.primary` — the fill slot — and the state itself was carried by
 *    weight and a dot. `unreadLabel` puts it in the name.
 * 6. **Nothing renders without a sender**, rather than a row of empty boxes.
 */
function MessageListRowV4({ sender, subject, preview, timestamp, avatarUri, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, formatThreadCount = (n) => `${n} messages`, unreadLabel = 'Unread', onPress, onLongPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!sender)
        return null;
    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;
    const { padX } = (0, row_v4_1.rowMetrics)(theme);
    const spoken = (0, mail_v4_1.spokenLine)([
        unread ? unreadLabel : 'Read',
        `from ${sender}`,
        subject,
        preview,
        count > 0 ? formatThreadCount(count) : null,
        hasAttachments ? 'has attachment' : null,
        starred ? 'starred' : null,
        ...safeLabels.map((l) => l.label),
        timestamp,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                // The selected ground covers the whole row, star included; the press
                // layer belongs to whichever half the finger is actually on.
                backgroundColor: (0, row_v4_1.rowGround)(theme, { selected }),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, accessibilityState: { selected }, onPress: onPress, onLongPress: onLongPress, style: ({ pressed }) => [
                    (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
                    {
                        flex: 1,
                        alignItems: 'flex-start',
                        paddingRight: onToggleStar ? 0 : padX,
                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                    },
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            width: tokens.spacing.sm,
                            height: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            marginTop: tokens.spacing.sm,
                            backgroundColor: unread ? theme.colors.primary : 'transparent',
                        } }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: avatarUri, name: sender }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: unread ? 'bold' : 'medium', tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: sender }), count > 0 ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", count: count, max: COUNT_CAP })) : null, timestamp ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: unread ? 'bold' : 'regular', tone: unread ? 'primaryText' : 'mutedText', numeric: "tabular", children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [hasAttachments ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCCE", size: "xs", color: "mutedText" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: unread ? 'semibold' : 'regular', tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: subject })] }), preview ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: preview })) : null, safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: tokens.spacing.xs,
                                    marginTop: tokens.spacing.xs,
                                }, children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChipV4_1.MailLabelChipV4, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] })] }), onToggleStar ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingRight: padX, paddingTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(StarButtonV4_1.StarButtonV4, { starred: starred, onToggle: onToggleStar, size: "base" }) })) : starred ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingRight: padX, paddingTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2605", size: "base", color: "accentText", accessibilityLabel: "Starred" }) })) : null] }));
}
//# sourceMappingURL=MessageListRowV4.js.map