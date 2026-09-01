"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentionTextV4 = MentionTextV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MentionText_1 = require("./MentionText");
/**
 * MentionText — **V4** "feed" design. The clean, airy mention-aware body:
 * `@mentions` and `#hashtags` render in **primary** and become tappable,
 * everything else in the on-surface base color. Reuses the shared
 * {@link parseMentions} splitter. Pure `Text` composition (so it wraps/clamps
 * naturally). Same props/behavior as {@link MentionTextProps}; token-only colors
 * via `useXenitionTheme()`, `link` a11y role on tappable segments.
 */
function MentionTextV4({ text, color = 'onSurface', linkColor = 'primaryText', size = 'base', numberOfLines, onPressMention, onPressHashtag, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = tokens.typography.scale[size];
    const segments = (0, MentionText_1.parseMentions)(text);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: numberOfLines, style: [{ color: colors[color], fontSize, lineHeight: fontSize * 1.4 }, style], children: segments.map((seg, i) => {
            if (seg.kind === 'text') {
                return (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: seg.value }, i);
            }
            const bare = seg.value.slice(1);
            const onPress = seg.kind === 'mention'
                ? onPressMention
                    ? () => onPressMention(bare)
                    : undefined
                : onPressHashtag
                    ? () => onPressHashtag(bare)
                    : undefined;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: onPress ? 'link' : undefined, onPress: onPress, style: { color: colors[linkColor], fontWeight: '600' }, children: seg.value }, i));
        }) }));
}
//# sourceMappingURL=MentionTextV4.js.map