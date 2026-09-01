"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaFigureV4 = MediaFigureV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const media_v4_1 = require("./internal/media-v4");
/**
 * **V4 media figure** — same props as {@link MediaFigure} plus `openLabel` and
 * `videoLabel`.
 *
 * ## Four changes
 *
 * 1. **A video is a video.** The base rendered `<Image source={{ uri:
 *    item.url }} />` for every item, so a `kind: 'video'` item rendered its
 *    `.mp4` URL as an image — a broken tile. It now shows the `poster` with a
 *    play badge, and says so to a screen reader. See `internal/media-v4`.
 * 2. **The placeholder ground is `colors.muted`**, not
 *    `tokens.ramps.neutral[100]`: the ramps carry the light orientation in both
 *    schemes, so the base's ground was a pale rectangle on a dark page.
 * 3. **Press is a state layer**, not `opacity: 0.85` — which fades the
 *    content, the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The caption is `TextV4` at `mutedText`.** The base hand-wrote
 *    `lineHeight: 20` — a literal, on the one element in this component whose
 *    job is to be read.
 */
function MediaFigureV4({ item, reserveAspect = true, onActivate, openLabel = 'Open media', videoLabel = 'video', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const ratio = reserveAspect && item.width && item.height ? item.width / item.height : undefined;
    const name = [item.alt ?? item.caption ?? openLabel, (0, media_v4_1.isVideo)(item) ? videoLabel : null]
        .filter(Boolean)
        .join(', ');
    const surface = (0, jsx_runtime_1.jsx)(media_v4_1.MediaSurfaceV4, { item: item, aspectRatio: ratio, inButton: Boolean(onActivate) });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [onActivate ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onActivate, style: ({ pressed }) => ({
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                }), children: surface })) : (surface), item.caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: item.caption })) : null] }));
}
//# sourceMappingURL=MediaFigureV4.js.map