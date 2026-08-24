"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMentions = parseMentions;
exports.MentionText = MentionText;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Split a string into plain / @mention / #hashtag segments (order preserved). */
function parseMentions(text) {
    const segments = [];
    const re = /([@#][\w]+)/g;
    let lastIndex = 0;
    let match;
    while ((match = re.exec(text)) !== null) {
        const token = match[0] ?? '';
        if (match.index > lastIndex) {
            segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
        }
        segments.push({
            kind: token.charAt(0) === '@' ? 'mention' : 'hashtag',
            value: token,
        });
        lastIndex = match.index + token.length;
    }
    if (lastIndex < text.length) {
        segments.push({ kind: 'text', value: text.slice(lastIndex) });
    }
    return segments;
}
/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each tappable. Everything else renders in the base
 * color. Pure `Text` composition (so it wraps/clamps naturally); token-only.
 */
function MentionText({ text, color = 'onSurface', linkColor = 'primary', size = 'base', numberOfLines, onPressMention, onPressHashtag, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = tokens.typography.scale[size];
    const segments = parseMentions(text);
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
//# sourceMappingURL=MentionText.js.map