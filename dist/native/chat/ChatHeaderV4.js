"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHeaderV4 = ChatHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const appearance_1 = require("../primitives/internal/appearance");
const PresenceDotV4_1 = require("./PresenceDotV4");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 chat header** — same props as {@link ChatHeader} plus `backLabel` and
 * `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word, not only a dot.** The dot was the entire signal in
 *    a header; it now carries its label in the subtitle line and in the
 *    header's accessible name.
 * 2. **Back and the actions clear 44 and are named.** They were glyphs at
 *    text size — and `ChatHeaderAction` already carries a `label` the base
 *    never rendered or announced.
 * 3. **Typing replaces the subtitle rather than stacking under it**, so the
 *    header does not change height every time the other person starts and
 *    stops typing.
 * 4. **The title row is one press target** with one name, not a title and a
 *    subtitle a reader walks separately.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function ChatHeaderV4({ title, subtitle, avatarUri, presence, typing = false, backLabel = 'Back', typingLabel = 'typing…', onBack, onPressTitle, actions = [], appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const presenceWord = presence ? thread_v4_1.PRESENCE_META[presence].label : null;
    // Typing REPLACES the subtitle. Stacking it changes the header's height
    // every time the other person pauses.
    const caption = typing ? typingLabel : (subtitle ?? presenceWord);
    const titleBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUri, name: title, size: "sm" }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: -2, bottom: -2 }, children: (0, jsx_runtime_1.jsx)(PresenceDotV4_1.PresenceDotV4, { status: presence, ring: true, scale: "sm" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: typing ? 'primaryText' : 'mutedText', numberOfLines: 1, accessibilityLiveRegion: typing ? 'polite' : 'none', children: caption })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: backLabel, onPress: onBack, style: ({ pressed }) => ({
                    width: tap,
                    height: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-left", size: "lg", color: "onSurface" }) })) : null, onPressTitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, thread_v4_1.metaLine)([title, caption]), onPress: onPressTitle, style: ({ pressed }) => ({
                    flex: 1,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                }), children: titleBlock })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, thread_v4_1.metaLine)([title, caption]), style: { flex: 1 }, children: titleBlock })), actions.map((action) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", 
                // `ChatHeaderAction` has always carried a `label`; the base never
                // rendered or announced it.
                accessibilityLabel: action.label, onPress: action.onPress, style: ({ pressed }) => ({
                    width: tap,
                    height: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: action.glyph, size: "lg" }) }, action.id)))] }));
}
//# sourceMappingURL=ChatHeaderV4.js.map