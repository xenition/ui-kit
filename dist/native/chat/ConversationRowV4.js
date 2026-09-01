"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRowV4 = ConversationRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const PresenceDotV4_1 = require("./PresenceDotV4");
const thread_v4_1 = require("./internal/thread-v4");
/** Above this the badge shows `99+` rather than a number nobody reads. */
const UNREAD_CAP = 99;
/**
 * **V4 conversation row** — same props as {@link ConversationRow} plus three
 * copy hooks and `last`.
 *
 * ## Four changes
 *
 * 1. **The row announces its whole state** — name, presence, last message,
 *    time, unread count, muted. The base left six fragments a reader walked
 *    one at a time, which is the difference between scanning an inbox and
 *    reading it.
 * 2. **Unread is capped**, so a badge cannot stretch the row.
 * 3. **Muted is a glyph *and* a word**, where the base dimmed the row — an
 *    opacity a colour-blind user reads as "disabled" rather than "muted".
 * 4. **It is a row from the shared row line**, with the shared press fill.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function ConversationRowV4({ name, lastMessage, timestamp, avatarUri, presence, unreadCount, muted = false, typing = false, selected = false, typingLabel = 'typing…', mutedLabel = 'Muted', formatUnread, last = false, onPress, onLongPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const unread = typeof unreadCount === 'number' && unreadCount > 0 ? unreadCount : 0;
    const badge = unread > UNREAD_CAP ? `${UNREAD_CAP}+` : String(unread);
    const preview = typing ? typingLabel : lastMessage;
    const presenceWord = presence ? thread_v4_1.PRESENCE_META[presence].label : null;
    // Commas, not `metaLine`'s middle dot: this is a spoken sentence, and a
    // reader either says "middle dot" out loud or swallows the pause entirely.
    const name_ = [
        name,
        presenceWord,
        preview,
        timestamp,
        unread > 0 ? (formatUnread ?? ((n) => `${n} unread`))(unread) : null,
        muted ? mutedLabel : null,
    ]
        .filter((part) => part != null && part !== '')
        .join(', ');
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUri, name: name, size: "md" }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: -2, bottom: -2 }, children: (0, jsx_runtime_1.jsx)(PresenceDotV4_1.PresenceDotV4, { status: presence, ring: true, scale: "sm" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: unread > 0 ? 'bold' : 'semibold', tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: name }), muted ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "mute", size: "xs", color: "mutedText" }) : null] }), preview ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: typing ? 'primaryText' : 'mutedText', numberOfLines: 1, children: preview })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [timestamp ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: timestamp })) : null, unread > 0 ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: muted ? 'neutral' : 'primary', size: "sm", children: badge })) : null] })] }));
    if (!onPress && !onLongPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name_, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name_, accessibilityState: { selected }, onPress: onPress, onLongPress: onLongPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ConversationRowV4.js.map