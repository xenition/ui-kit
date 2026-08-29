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
exports.ModalV4 = ModalV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const surface_v4_1 = require("./internal/surface-v4");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * `Modal`, V4 — the same props, lifted off the page and given its own rhythm.
 *
 * ## What the depth is saying
 *
 * A dialog is the one layer with nothing underneath it: it floats in the middle
 * of the screen, over a page that has been pushed back. So it takes
 * `elevation.sheet` — the widest, softest of the three — and the token's
 * negative offset turns out to be exactly right here. A drop shadow implies a
 * surface below to receive it; a dialog has none, so what it wants is a halo,
 * and a large radius with a near-zero offset is a halo.
 *
 * The scrim comes from the shadow colour rather than from `onSurface`, which
 * inverts with the scheme and paints a near-WHITE veil over a dark page — the
 * bug the base `Modal` has today (it reaches for `ramps.neutral[950]`, and the
 * ramps carry the LIGHT orientation in both schemes, so in dark mode that step
 * is the lightest one there is).
 *
 * Glass is applied only when the seed asked for `depth: 'glass'` — the single
 * depth check, and a necessary one: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 * Elevation is consumed unconditionally and flat falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base modal is one padded box: a title, then whatever you passed, with any
 * structure left to you. V4 has a header and a body, separated by a hairline
 * and each carrying its own padding — so a dialog reads as a dialog whether the
 * caller wrapped its content or not. The body scrolls at 80% of the viewport
 * height, which keeps the title pinned instead of pushing it off-screen when
 * the content is long. §11: the container earns its existence by holding a
 * structure, not by drawing a box.
 *
 * ## Motion
 *
 * A dialog has no origin to fly in from — it is not a tapped card expanding
 * (§36.5) — so it scales up very slightly and fades, over 200ms, which is
 * §36.2's band for a small transition. It is deliberately not a big travel:
 * distance should be proportional to how far the thing actually moved, and this
 * moved nowhere. Under Reduce Motion the scale is dropped and only the fade
 * remains (§36.10).
 */
function ModalV4({ open, onClose, title, children }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const { height } = (0, react_native_1.useWindowDimensions)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const progress = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!open) {
            progress.setValue(0);
            return;
        }
        if (reduced) {
            progress.setValue(1);
            return;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration: surface_v4_1.SURFACE_MOTION.dialog,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, progress]);
    // Under Reduce Motion the scale never leaves 1 — the dialog simply fades.
    const scale = reduced
        ? 1
        : progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });
    /*
      A dialog's measure, from the spacing scale rather than a fixed 480: ten of
      the largest step. The point is not that 480 is wrong, it is that a number
      written into a component cannot move when the theme's density does.
    */
    const maxWidth = tokens.spacing['2xl'] * 10;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.lg,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                        opacity: progress,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { flex: 1 } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityRole: "alert", style: [
                        (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                        (0, surface_v4_1.panelSkin)(theme),
                        {
                            width: '100%',
                            maxWidth,
                            maxHeight: height * 0.8,
                            borderRadius: tokens.radius.lg,
                            overflow: 'hidden',
                            opacity: progress,
                            transform: [{ scale }],
                        },
                    ], children: [title != null &&
                            (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.lg,
                                    paddingTop: tokens.spacing.lg,
                                    paddingBottom: tokens.spacing.md,
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        fontFamily: tokens.typography.fontHeading,
                                        fontSize: tokens.typography.scale.xl,
                                        fontWeight: '600',
                                        // `onSurface`, never `muted` — over glass, `muted`
                                        // measurably falls below AA.
                                        color: colors.onSurface,
                                    }, children: title }) })) : (title)), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: {
                                padding: tokens.spacing.lg,
                            }, children: children })] })] }) }));
}
//# sourceMappingURL=ModalV4.js.map