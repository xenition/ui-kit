"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEmbed = VideoEmbed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A 16:9 video card with a poster + play affordance — the native mirror of the
 * web `VideoEmbed`. React Native has no `<iframe>`/`<video>`, so this renders a
 * token-styled poster thumbnail with a circular play button; `onPress` is the
 * hook a caller uses to launch playback. Real inline playback requires
 * `expo-av` (out of scope here); the `url`/`title` props are preserved so a
 * host app can pass them straight through. Token-only.
 */
function VideoEmbed({ url: _url, title, poster, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            aspectRatio: 16 / 9,
            width: '100%',
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: tokens.ramps.neutral[900],
            alignItems: 'center',
            justifyContent: 'center',
        }, children: [poster ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: poster }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { position: 'absolute', width: '100%', height: '100%' } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 64,
                    width: 64,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                    opacity: 0.9,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'] }, children: '▶' }) })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-video-embed", accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, style], children: content }));
}
//# sourceMappingURL=VideoEmbed.js.map