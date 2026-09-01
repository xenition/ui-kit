"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailThreadRowV4 = EmailThreadRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 email thread row** — same props as {@link EmailThreadRow} plus
 * `unreadLabel` and `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the *subject*.** Both twins' docblocks always said
 *    "unread → bold subject"; both bolded the **sender**, so the one line a
 *    user scans an inbox for was the one line the state did not emphasise.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step that ignores the seed — against native's
 *    `withAlpha(primary, .06)`, whose rendered colour depended on whatever was
 *    behind the row. Both now take `selected`/`onSelected`, the compiler's
 *    opaque pair for exactly this.
 * 3. **The message count carries a unit.** The badge printed a bare `4`, which
 *    a reader announces as the number four and nothing else.
 * 4. **The row is only a button when it is interactive.** Native set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a read-only row announced as a **disabled button**.
 * 5. **One spoken name** carrying sender, subject, snippet, time, unread and
 *    the count (rule A), a real press layer (rule B) and `BADGE_V4` (rule C).
 *
 * **Renders nothing without a `subject`.**
 */
function EmailThreadRowV4({ subject, from, snippet, avatarUrl, timestamp, unread = false, messageCount, hasAttachment = false, unreadLabel = 'Unread', formatMessageCount, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!subject)
        return null;
    const showCount = messageCount != null && messageCount > 1;
    const countLabel = showCount
        ? (formatMessageCount ?? ((n) => `${n} messages`))(messageCount)
        : null;
    const dot = tokens.spacing.sm;
    const ground = unread ? colors.selected : colors.surface;
    const ink = unread ? colors.onSelected : colors.onSurface;
    const name = (0, crm_v4_1.spokenLine)([
        unread ? unreadLabel : null,
        from,
        subject,
        snippet,
        timestamp,
        countLabel,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                alignItems: 'center',
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: dot,
                    height: unread ? dot : undefined,
                    borderRadius: tokens.radius.full,
                    backgroundColor: unread ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: from, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", numberOfLines: 1, style: { flex: 1, color: ink }, children: from }), timestamp ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: crm_v4_1.TABULAR, children: timestamp })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: unread ? 'bold' : 'semibold', numberOfLines: 1, style: { color: ink }, children: subject }), snippet ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: snippet })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [hasAttachment ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "\uD83D\uDCCE" })) : null, showCount ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", children: `${messageCount}` })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, testID: testID, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, testID: testID, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=EmailThreadRowV4.js.map