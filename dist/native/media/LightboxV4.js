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
exports.LightboxV4 = LightboxV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
const color_1 = require("../primitives/internal/color");
const media_v4_1 = require("./internal/media-v4");
/** How far a horizontal drag must travel to count as a swipe. Geometric. */
const SWIPE_THRESHOLD = 48;
/** Drag under this is a tap, not a gesture. */
const DRAG_SLOP = 12;
/**
 * The ink on the overlay.
 *
 * This is the one place reading a **ramp** directly is correct rather than a
 * defect. Everywhere else in this pass a ramp step was the wrong choice
 * *because* it does not invert with the scheme; here the surface underneath is
 * a scrim that is dark in both schemes by construction, so the ink on it must
 * be light in both schemes — which is exactly the property `ramps.neutral[50]`
 * has and `colors.surface` does not.
 */
const OVERLAY_INK = 50;
/**
 * **V4 lightbox** — same props as {@link Lightbox} plus `onPlay`, `playLabel`
 * and `formatCounter`.
 *
 * ## Five changes
 *
 * 1. **A video shows its poster, and can be played.** The base rendered
 *    `<Image source={{ uri: item.url }} />` for every item, so opening a clip
 *    showed a broken image at full screen.
 * 2. **The media box is not a 320×320 square.** The base pinned both
 *    dimensions, so a panorama and a portrait were letterboxed into the same
 *    square. It now fills the available space and keeps its ratio.
 * 3. **The controls clear 44 and are vertically centred properly.** They were
 *    40×40 pinned at `top: '45%'` — a magic number that lands off-centre at
 *    every aspect ratio.
 * 4. **The overlay pays the safe-area inset**, so the close button is not
 *    under the notch and the caption is not under the home indicator.
 * 5. **The scrim comes from `scrimColor()`**, the same one every V4 overlay
 *    uses, rather than this component's own ramp-and-alpha expression.
 *
 * Swipe-to-navigate, `loop`, and the reduced-motion check are the base's and
 * are kept. Needs a `SafeAreaProvider` above it, which Expo mounts by default.
 */
function LightboxV4({ items, index, onClose, onPrev, onNext, onPlay, loop = false, label = 'Media viewer', closeLabel = 'Close', prevLabel = 'Previous', nextLabel = 'Next', playLabel = 'Play video', formatCounter, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const open = index !== null && index >= 0 && index < items.length;
    const hasPrev = open && (loop || index > 0);
    const hasNext = open && (loop || index < items.length - 1);
    // Latest handlers/flags read by the PanResponder without re-creating it.
    const nav = React.useRef({ onPrev, onNext, hasPrev, hasNext });
    nav.current = { onPrev, onNext, hasPrev, hasNext };
    const panResponder = React.useMemo(() => react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, g) => Math.abs(g.dx) > DRAG_SLOP && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_evt, g) => {
            const n = nav.current;
            if (g.dx <= -SWIPE_THRESHOLD && n.hasNext)
                n.onNext?.();
            else if (g.dx >= SWIPE_THRESHOLD && n.hasPrev)
                n.onPrev?.();
        },
    }), []);
    if (!open)
        return null;
    const position = index;
    const item = items[position];
    const ink = tokens.ramps.neutral[OVERLAY_INK];
    const uri = (0, media_v4_1.posterUri)(item);
    const video = (0, media_v4_1.isVideo)(item);
    const counter = (formatCounter ?? ((n, of) => `${n} / ${of}`))(position + 1, items.length);
    const control = (name, controlLabel, onPress, position_) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: controlLabel, onPress: onPress, style: ({ pressed }) => ({
            position: 'absolute',
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            // A control floating over arbitrary artwork owns no ground, so its
            // press layer is a translucent wash rather than an opaque mix.
            backgroundColor: (0, color_1.withAlpha)(colors.surface, pressed ? 0.75 : 1),
            ...position_,
        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: name, size: "lg", color: "onSurface" }) }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: reduced ? 'none' : 'fade', onRequestClose: onClose, accessibilityViewIsModal: true, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: label, style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: tokens.spacing.lg + insets.top,
                paddingBottom: tokens.spacing.lg + insets.bottom,
                paddingHorizontal: tokens.spacing.lg + Math.max(insets.left, insets.right),
                backgroundColor: (0, surface_v4_1.scrimColor)(theme, 0.88),
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: `${closeLabel} backdrop`, onPress: onClose, style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }), control('close', closeLabel, onClose, {
                    right: tokens.spacing.lg,
                    top: tokens.spacing.lg + insets.top,
                }), hasPrev
                    ? control('chevron-left', prevLabel, onPrev, {
                        left: tokens.spacing.lg,
                        // Centred by transform rather than a `top: '45%'` guess.
                        top: '50%',
                        marginTop: -tap / 2,
                    })
                    : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { ...panResponder.panHandlers, style: {
                        flex: 1,
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: [uri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, accessible: true, accessibilityLabel: item.alt ?? item.caption ?? '', resizeMode: "contain", style: { width: '100%', height: '100%', borderRadius: tokens.radius.md } })) : null, video && onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playLabel, onPress: () => onPlay(position), style: ({ pressed }) => ({
                                        position: 'absolute',
                                        width: tap * 1.5,
                                        height: tap * 1.5,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: (0, color_1.withAlpha)(colors.surface, pressed ? 0.75 : 0.92),
                                    }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u25B6", size: "2xl", color: "onSurface" }) })) : null] }), item.caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", align: "center", style: { color: ink }, children: item.caption })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-lightbox-counter", size: "xs", numeric: "tabular", style: { color: ink }, children: counter })] }), hasNext
                    ? control('chevron-right', nextLabel, onNext, {
                        right: tokens.spacing.lg,
                        top: '50%',
                        marginTop: -tap / 2,
                    })
                    : null] }) }));
}
//# sourceMappingURL=LightboxV4.js.map