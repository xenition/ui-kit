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
exports.BottomSheetV4 = BottomSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const surface_v4_1 = require("./internal/surface-v4");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * `BottomSheet`, V4 — the same props, designed as a real sheet.
 *
 * ## What the depth is saying
 *
 * A bottom sheet is not a panel that happens to be at the bottom of the screen;
 * it is a layer that has come up from below and is now sitting ON the page. V4
 * spends exactly three tokens to say that, and nothing on decoration:
 *
 *   - **`elevation.sheet`** — the shadow. Its offset is *negative*: the sheet
 *     casts upward, onto the content it has covered, which is where a real
 *     object's shadow would fall. That contact shadow is the whole reason the
 *     scrim can be lighter than the base component's flat 50% black and the
 *     sheet still reads as separated.
 *   - **The scrim**, from `elevation.sheet.color`. The base overlays scrim with
 *     `onSurface`, which inverts with the scheme and paints a WHITE veil over a
 *     dark page. A shadow colour does not invert, because a shadow does not.
 *   - **`glass`**, but only when the seed asked for `depth: 'glass'`. That is
 *     the one depth check in the file, and it is necessary: the compiler's
 *     `flatten()` neutralises gradients and elevation and stops there, so glass
 *     is live even under `depth: 'flat'`. Gradient and elevation are consumed
 *     unconditionally, and flat falls out for free.
 *
 * What does NOT get depth is anything inside the sheet. §8 bans "cards inside
 * cards inside cards", and a translucent panel inside a translucent sheet is
 * that same mistake with a blur on it. The sheet is the layer; its contents are
 * flat.
 *
 * ## Motion
 *
 * The sheet rises from the bottom because that explains where it came from
 * (§36.1), over `SURFACE_MOTION.sheet` — inside §36.2's 220–320ms band for a
 * sheet transition, on a decelerating curve so it settles rather than stops.
 * The scrim fades in alongside it, and, while the user drags, tracks the finger
 * continuously (§36.4) rather than replaying a canned animation: drag halfway
 * down and the page behind is half-revealed.
 *
 * Under the OS "Reduce Motion" setting the travel is dropped and the sheet is
 * simply there — but the scrim still fades, because an overlay that appears
 * with no transition at all reads as a glitch (§36.10).
 *
 * ## Layout
 *
 * The caller passes content, not padding. The grab handle, the title row and
 * the scrollable body each carry their own rhythm from the spacing scale, and
 * the body clears the home indicator with the bottom safe-area inset.
 */
function BottomSheetV4({ open, onClose, title, children, snap = 0.5, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const { height } = (0, react_native_1.useWindowDimensions)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const sheetHeight = Math.max(tokens.spacing['2xl'] * 2, Math.min(1, snap) * height);
    const translateY = React.useRef(new react_native_1.Animated.Value(sheetHeight)).current;
    React.useEffect(() => {
        if (!open) {
            translateY.setValue(sheetHeight);
            return;
        }
        if (reduced) {
            translateY.setValue(0);
            return;
        }
        const anim = react_native_1.Animated.timing(translateY, {
            toValue: 0,
            duration: surface_v4_1.SURFACE_MOTION.sheet,
            // Decelerate into place. §36.3: a sheet should settle, not stop.
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, sheetHeight, translateY]);
    /*
      The scrim's opacity is derived from the sheet's own position rather than
      animated beside it, so the two can never disagree — including mid-drag,
      where the user is driving the sheet directly and no timing function is
      involved at all.
    */
    const scrimOpacity = translateY.interpolate({
        inputRange: [0, sheetHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const panResponder = React.useMemo(() => react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => g.dy > 4,
        onPanResponderMove: (_e, g) => {
            if (g.dy > 0)
                translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_e, g) => {
            // Past a third of the way down, or thrown downward, means dismiss.
            if (g.dy > sheetHeight * 0.3 || g.vy > 0.8) {
                onClose();
                return;
            }
            react_native_1.Animated.timing(translateY, {
                toValue: 0,
                duration: reduced ? 0 : surface_v4_1.SURFACE_MOTION.settle,
                easing: motion_v4_1.EASING_ENTER,
                useNativeDriver: true,
            }).start();
        },
    }), [onClose, reduced, sheetHeight, translateY]);
    const handleWidth = tokens.spacing.xl + tokens.spacing.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                        opacity: scrimOpacity,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { flex: 1 } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: [
                        (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                        (0, surface_v4_1.panelSkin)(theme),
                        {
                            height: sheetHeight,
                            borderTopLeftRadius: tokens.radius.lg,
                            borderTopRightRadius: tokens.radius.lg,
                            // The hairline `panelSkin` adds on glass would otherwise run
                            // around all four sides, including the one off-screen.
                            borderBottomWidth: 0,
                            overflow: 'hidden',
                            transform: [{ translateY }],
                        },
                        style,
                    ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...panResponder.panHandlers, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Drag to dismiss", style: {
                                    width: handleWidth,
                                    height: tokens.spacing.xs,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.border,
                                } }) }), title != null &&
                            (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.lg,
                                    paddingBottom: tokens.spacing.md,
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        fontFamily: tokens.typography.fontHeading,
                                        fontSize: tokens.typography.scale.xl,
                                        fontWeight: '600',
                                        // `onSurface`, never `muted` — over glass, `muted` measurably
                                        // falls below AA. See `theme/glass-legibility.spec.ts`.
                                        color: colors.onSurface,
                                    }, children: title }) })) : (title)), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { flex: 1 }, contentContainerStyle: {
                                paddingHorizontal: tokens.spacing.lg,
                                paddingTop: tokens.spacing.md,
                                paddingBottom: tokens.spacing.lg + insets.bottom,
                            }, children: children })] })] }) }));
}
//# sourceMappingURL=BottomSheetV4.js.map