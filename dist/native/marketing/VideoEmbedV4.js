"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEmbedV4 = VideoEmbedV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * VideoEmbed — **V4** "showcase" design (native mirror of the web V4). A rounded,
 * elevated 16:9 media frame: a `poster` thumbnail under a refined circular play
 * affordance, seated in a soft-bordered card with a subtle shadow. React Native
 * has no `<iframe>`/`<video>`, so `url`/`title` are preserved for a host player
 * and `onPress` is the hook to launch playback (real inline playback needs
 * `expo-av`, out of scope). The correct 16:9 aspect ratio is kept. NOT a
 * brand-gradient surface. Same props/behavior as {@link VideoEmbedProps};
 * token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
function VideoEmbedV4({ url: _url, title, poster, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            aspectRatio: 16 / 9,
            width: '100%',
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        }, children: [poster ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: poster }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { position: 'absolute', width: '100%', height: '100%' } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 64,
                    width: 64,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], marginLeft: 2 }, children: '▶' }) })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "xen-video-embed", accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, style], children: content }));
}
//# sourceMappingURL=VideoEmbedV4.js.map