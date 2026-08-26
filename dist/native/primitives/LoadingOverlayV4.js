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
exports.LoadingOverlayV4 = LoadingOverlayV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const SpinnerV4_1 = require("./SpinnerV4");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * **V4 loading overlay** — same props as {@link LoadingOverlay}, a different
 * design line.
 *
 * ## The scrim was painting a white veil over dark apps
 *
 * The base built its dim from `colors.onSurface` at 40% opacity. `onSurface`
 * **inverts with the scheme** — near-black on a light page and near-WHITE on a
 * dark one — so on a dark app this overlay covered the screen in white haze and
 * then put a dark card in the middle of it. The kit found and fixed the same
 * bug in `Modal`; this is the same fix, from the same helper.
 *
 * A scrim is built from `elevation.sheet.color`, which does not invert, because
 * a shadow does not. As `Modal` puts it: a scrim is not "a dark colour from the
 * palette", it is the absence of light, and absence does not have a brand.
 *
 * ## This is the one component here that HAS a layer
 *
 * Everything else in the V4 feedback line refuses elevation, because an alert,
 * a banner, a callout and a progress bar are all *in* the page. An overlay is
 * genuinely above it — that is the entire point of the component — so it takes
 * `elevation.sheet`, the widest and softest of the three, the same token
 * `ModalV4` uses for the same reason. Depth here is not decoration; it is the
 * only honest way to say "the page underneath is not available right now".
 *
 * Glass follows the seed through `panelSkin`, the single depth check the V4
 * surfaces make: the compiler neutralises gradients and elevation for a flat
 * seed, but `glass.tint` stays live at every depth, so it has to be asked for
 * (§8's "glassmorphism without purpose").
 *
 * ## Motion and the spinner
 *
 * The scrim fades in over `SURFACE_MOTION.dialog` — an overlay that appears
 * with no transition at all reads as a glitch rather than as a layer arriving
 * (§36.10 asks for the fade to survive even when the travel does not). Under
 * Reduce Motion it is simply there.
 *
 * The spinner is `SpinnerV4`, so the blocking state honours the user's motion
 * setting; the base used the platform indicator, which cannot. The label is
 * `onSurface`, never `muted` — over glass, `muted` measurably falls below AA.
 */
function LoadingOverlayV4({ visible, label, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const fade = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!visible) {
            fade.setValue(0);
            return;
        }
        if (reduced) {
            fade.setValue(1);
            return;
        }
        const anim = react_native_1.Animated.timing(fade, {
            toValue: 1,
            duration: surface_v4_1.SURFACE_MOTION.dialog,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [visible, reduced, fade]);
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "progressbar", accessibilityLabel: label ?? 'Loading', accessibilityLiveRegion: "polite", style: [
            {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: fade,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-overlay-scrim", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // Dark in both schemes, by construction — never `onSurface`.
                    backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-overlay-panel", style: [
                    (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                    (0, surface_v4_1.panelSkin)(theme),
                    {
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        borderRadius: tokens.radius.lg,
                        paddingVertical: tokens.spacing.lg,
                        paddingHorizontal: tokens.spacing.xl,
                    },
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "lg" }) }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.sm,
                            // `onSurface`, never `muted` — over glass, `muted` falls below AA.
                            color: colors.onSurface,
                            textAlign: 'center',
                        }, children: label })) : null] })] }));
}
//# sourceMappingURL=LoadingOverlayV4.js.map