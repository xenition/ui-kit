"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterMessageV4 = RecruiterMessageV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Said first, so unread is a word and not only a dot. */
const UNREAD = 'Unread';
/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Four changes
 *
 * 1. **Reply is reachable.** It was a `Pressable` inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the reply affordance was not a focus stop at all,
 *    and on the web twin Enter on it bubbled to the row and opened the thread
 *    instead of replying. It is now a sibling of the row's activation, a real
 *    button with its own name and a 44 target, where it had `hitSlop={6}` —
 *    about 26 points of target on the one control in the row a candidate
 *    actually presses.
 * 2. **The message is announced whole.** The name stopped at "Unread. Message
 *    from Dana at Acme": no preview, no age. A reader had to open a thread to
 *    find out what it was about, which is the difference between scanning an
 *    inbox and reading it.
 * 3. **`muted` stopped inking text.** The company, the age and a read
 *    message's whole preview were drawn in `muted` — a ramp step with no
 *    contrast promise — which is exactly the "read messages are unreadable"
 *    failure. `mutedText` is that colour corrected against the surface.
 * 4. **It is a row from the shared row line**, with the state layer instead of
 *    `opacity: 0.9`.
 *
 * Unread stays a dot **and** a weight **and** a word, as the base intended;
 * only the word was missing from anywhere a reader could hear it.
 *
 * **Renders nothing without a sender name** (§4.5).
 */
function RecruiterMessageV4({ message, onPress, onReply, replyLabel = 'Reply', formatRelative, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!message?.senderName)
        return null;
    const sent = (0, tone_v4_1.relativeLabel)(message.sentAt, formatRelative);
    const unread = message.unread === true;
    const name = (0, tone_v4_1.spokenName)([
        unread ? UNREAD : null,
        `Message from ${message.senderName}`,
        message.company ? `at ${message.company}` : null,
        message.preview,
        sent,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: message.senderAvatarUrl, name: message.senderName, size: "md" }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: tokens.spacing.sm,
                            height: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            borderWidth: 2,
                            borderColor: colors.card,
                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: unread ? 'bold' : 'semibold', tone: "onCard", numberOfLines: 1, style: { flex: 1 }, children: message.company
                                    ? `${message.senderName}  ·  ${message.company}`
                                    : message.senderName }), sent ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: sent })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: unread ? 'medium' : 'regular', tone: unread ? 'onCard' : 'mutedText', numberOfLines: 2, children: message.preview })] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { alignItems: 'flex-start' },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(message), style: ({ pressed }) => ({
                    flex: 1,
                    minWidth: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                }), children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: {
                    flex: 1,
                    minWidth: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: tokens.spacing.md,
                }, children: body })), onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", onPress: () => onReply(message), accessibilityLabel: (0, tone_v4_1.spokenName)([replyLabel, message.senderName]), style: { minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: replyLabel }) })) : null] }));
}
//# sourceMappingURL=RecruiterMessageV4.js.map