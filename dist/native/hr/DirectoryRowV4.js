"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryRowV4 = DirectoryRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 directory row** — same props as {@link DirectoryRow} plus
 * `messageLabel`.
 *
 * ## Five changes
 *
 * 1. **The message button is reachable.** It sat inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it into a single leaf carrying the row's name — so VoiceOver could
 *    open the person's profile and had no way at all to message them. The row
 *    container is a plain `View` now; the activation wraps only the avatar and
 *    the text, and the message button is its sibling.
 * 2. **The button is a target.** `hitSlop={8}` on a glyph is not a 44pt target
 *    — the conventions call that out by name — and it left the visible tap area
 *    at roughly 20pt in the corner of a scrolling list. It is `minTap` square.
 * 3. **Presence is drawn once.** The base rendered it twice: as a coloured dot
 *    on the avatar (colour alone, no word) *and* as a glyph beside a `muted`
 *    word, so the row said the same thing in two places and one of them said it
 *    in a way a colour-blind user could not read. One glyph-and-word pill
 *    remains, and `away` steps down from `warn` to neutral — stepping away from
 *    a desk is not a caution.
 * 4. **Press is a state layer.** The message glyph faded to `opacity: 0.6` on
 *    press, which is inside M3's *disabled* band, so a tapped button looked
 *    unavailable.
 * 5. **The row announces itself whole** — name, title, department, presence,
 *    email and phone as one sentence, rather than "Open Ada" followed by five
 *    text nodes the reader has to walk.
 *
 * **Renders nothing without a `name`.**
 */
function DirectoryRowV4({ name, title, department, avatarUrl, email, phone, presence, variant = 'default', messageLabel, onPress, onMessage, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const compact = variant === 'compact';
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const presenceMeta = presence ? tone_v4_1.PRESENCE_V4[presence] : undefined;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const contact = (0, tone_v4_1.metaLine)([email, phone]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const message = messageLabel ?? `Message ${name}`;
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        title,
        department,
        interactive ? presenceMeta?.label : null,
        email,
        phone,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null, !compact && contact ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: contact })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: !compact }), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), presenceMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: presenceMeta, variant: "inline", size: "sm", decorative: interactive })) : null, onMessage ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: message, onPress: onMessage, style: ({ pressed }) => ({
                    width: tap,
                    height: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }),
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", style: { color: colors.primaryText }, children: "\u2709" }) })) : null] }));
}
//# sourceMappingURL=DirectoryRowV4.js.map