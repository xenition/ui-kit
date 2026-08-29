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
exports.DrawerV4 = DrawerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const chrome_v4_1 = require("./internal/chrome-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * `Drawer`, V4 — the same props, given the depth and the rhythm of a real
 * layer.
 *
 * ## What the depth is saying
 *
 * A side sheet is above the page and nothing is above it, so it takes
 * `elevation.sheet` — the same altitude as `ModalV4`, `BottomSheetV4` and
 * `MenuV4`, because all four are the same kind of object at different sizes and
 * a kit where they drift apart has four depth systems instead of one. The
 * content inside is flat: §8's "cards inside cards inside cards" is exactly
 * what a drawer becomes when every section in it gains a surface.
 *
 * The scrim is `scrimColor` — the shadow colour at a fixed alpha, shared with
 * every other V4 overlay. The base `Drawer` learned this the hard way: its
 * scrim was `colors.onSurface`, which INVERTS with the scheme (at the warm
 * seed, dark `onSurface` compiles to `#eeeded`) and painted a 50% white veil
 * over a dark page. It is fixed there now, and this keeps the fixed
 * convention rather than re-deriving it — a shadow does not invert, so a scrim
 * built from a shadow colour does not either.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`, via `panelSkin`.
 * That is the one depth check in this file and it is necessary: `flatten()`
 * neutralises gradients and elevation and stops there, so glass is live even
 * under `depth: 'flat'`. Elevation is consumed unconditionally and a flat seed
 * falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base drawer is one padded box with the title inside the scroll area, so a
 * long list scrolls its own heading off the screen. V4 splits a pinned header
 * from a scrolling body, separated by a hairline and each carrying its own
 * padding — §11: the container earns its existence by holding a structure, not
 * by drawing a box.
 *
 * The panel's measure comes off the spacing scale (`2xl × 7`) rather than the
 * base's literal 360. The point is not that 360 is wrong; it is that a number
 * written into a component cannot move when the theme's density does.
 *
 * ## Motion
 *
 * The panel travels the whole of itself, from the edge it is anchored to —
 * §36.5's spatial continuity, so the movement says where the drawer came from
 * and where dismissing it sends it back. `SURFACE_MOTION.sheet` (280ms) is
 * §36.2's band for a screen-sized transition, and the easing decelerates so the
 * sheet settles rather than stopping dead (§36.3). Under Reduce Motion the
 * travel is dropped and the scrim's fade carries the whole transition
 * (§36.10) — the panel still arrives, it simply does not slide.
 */
function DrawerV4({ open, onClose, side = 'right', title, children, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const isHorizontal = side === 'left' || side === 'right';
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
            duration: surface_v4_1.SURFACE_MOTION.sheet,
            easing: (0, chrome_v4_1.easingOf)(theme.motion.easingEnter),
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, progress, theme.motion.easingEnter]);
    // Travel the full extent of the axis the panel entered on, then clamp: the
    // panel is narrower than the screen, so over-travelling costs nothing and
    // under-travelling would leave a sliver visible before the animation starts.
    const distance = isHorizontal ? width : height;
    const sign = side === 'left' || side === 'top' ? -1 : 1;
    const travel = reduced
        ? 0
        : progress.interpolate({ inputRange: [0, 1], outputRange: [sign * distance, 0] });
    /*
      A side sheet's measure, from the spacing scale rather than a literal 360:
      seven of the largest step. `85%` remains the cap on a narrow phone, because
      a drawer that covers the page is a screen, not a drawer — the strip of
      scrim left showing is what tells the user there is something behind it.
    */
    const panelWidth = tokens.spacing['2xl'] * 7;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flex: 1,
                flexDirection: isHorizontal ? 'row' : 'column',
                justifyContent: side === 'right' || side === 'bottom' ? 'flex-end' : 'flex-start',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // Black at a fixed alpha, shared with every other V4 overlay.
                        // `onSurface` inverts and would paint a white veil over a dark page.
                        backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                        opacity: progress,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { flex: 1 } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: [
                        (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                        (0, surface_v4_1.panelSkin)(theme),
                        isHorizontal
                            ? { height: '100%', width: '85%', maxWidth: panelWidth }
                            : { width: '100%', maxHeight: '85%' },
                        {
                            overflow: 'hidden',
                            transform: isHorizontal ? [{ translateX: travel }] : [{ translateY: travel }],
                        },
                        style,
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
                                    }, children: title }) })) : (title)), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: { padding: tokens.spacing.lg }, children: children })] })] }) }));
}
//# sourceMappingURL=DrawerV4.js.map