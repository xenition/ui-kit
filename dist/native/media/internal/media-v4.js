"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.playDiameter = playDiameter;
exports.posterUri = posterUri;
exports.isVideo = isVideo;
exports.MediaSurfaceV4 = MediaSurfaceV4;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * The pieces the **V4 media line** (native) shares: the placeholder ground, the
 * poster-or-image decision, and the play affordance.
 *
 * Why this file exists is the module's headline defect. `MediaItem` has carried
 * `kind: 'image' | 'video'` and `poster` since it was written, the **web** twin
 * honours both, and all three native components rendered
 * `<Image source={{ uri: item.url }} />` unconditionally — so a video item
 * rendered its `.mp4` URL as an image, which is a broken tile on every native
 * screen in the kit. That is a parity break and a bug, not a style gap.
 *
 * The kit ships no video player and must not: a dependency on
 * `expo-av`/`react-native-video` is the host's decision, not a design system's.
 * The honest native answer is therefore the **poster**, an unmistakable play
 * affordance over it, and the press handed to the caller — which is what a
 * gallery tile wants anyway, because a grid of autoplaying video is not a
 * gallery.
 *
 * Nothing here is exported from the package.
 */
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const IconV4_1 = require("../../primitives/IconV4");
const color_1 = require("../../primitives/internal/color");
/**
 * How much of the tile the play badge fills. A *ratio*, because the badge sits
 * on a box whose size the caller decides — a fixed 48pt disc is right on one
 * tile and lost on a full-bleed lightbox.
 */
const PLAY_RATIO = 0.22;
/** The badge's smallest and largest useful diameters, off the spacing scale. */
function playDiameter(box, min, max) {
    return Math.max(min, Math.min(max, Math.round(box * PLAY_RATIO)));
}
/** How solid the scrim behind a play badge sits. Dark in both schemes. */
const PLAY_SCRIM = 0.55;
/**
 * The still a video item should show.
 *
 * `poster` when there is one. When there is not, **nothing** — deliberately:
 * handing an `.mp4` URL to `<Image>` is what produced the broken tile, and a
 * placeholder that admits it has no still is better than one that looks broken.
 */
function posterUri(item) {
    if (item.kind === 'video')
        return item.poster;
    return item.url;
}
/** Is this item a video? Kept as a function so the check reads the same everywhere. */
function isVideo(item) {
    return item.kind === 'video';
}
/**
 * The media box: the still (or the honest empty ground), and — for a video —
 * a play badge over it.
 *
 * The placeholder is `colors.muted`, not `tokens.ramps.neutral[100]`. The
 * ramps carry the light orientation in both schemes, so the base's placeholder
 * was a pale rectangle on a dark page; this is the same fix `ProductCardV4`
 * settled for its media slot.
 */
function MediaSurfaceV4({ item, aspectRatio, inButton = false, playBounds, radius, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const uri = posterUri(item);
    const video = isVideo(item);
    const bounds = playBounds ?? { min: tokens.spacing.xl, max: tokens.spacing['2xl'] * 2 };
    const [box, setBox] = React.useState(0);
    const badge = playDiameter(box, bounds.min, bounds.max);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { onLayout: (e) => setBox(Math.min(e.nativeEvent.layout.width, e.nativeEvent.layout.height)), style: {
            width: '100%',
            aspectRatio,
            overflow: 'hidden',
            borderRadius: radius ?? tokens.radius.md,
            backgroundColor: colors.muted,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: [uri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, 
                // When wrapped in a Pressable, that button owns accessibility.
                accessible: !inButton, accessibilityLabel: inButton ? undefined : (item.alt ?? item.caption ?? ''), resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, video ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    width: badge,
                    height: badge,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // The scrim is built from the shadow colour, which does not invert
                    // with the scheme — a play badge has to stay dark over a bright
                    // still in dark mode too.
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, PLAY_SCRIM),
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u25B6", size: "lg", style: { color: colors.surface } }) })) : null] }));
}
//# sourceMappingURL=media-v4.js.map