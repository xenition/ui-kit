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
exports.AppShellV4 = AppShellV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const Icon_1 = require("./Icon");
const chrome_v4_1 = require("./internal/chrome-v4");
const state_v4_1 = require("./internal/state-v4");
const surface_v4_1 = require("./internal/surface-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has three candidates
 * and gives depth to one of them:
 *
 * - The **top bar** is pinned, not raised. It stays flat with a hairline: a
 *   shadow under a bar is honest only once content is actually scrolling
 *   beneath it, and a shell cannot know that without owning the scroll position
 *   of a region the caller fills. A hairline is true in every state, which §14
 *   prefers to a decoration that is right half the time.
 * - The **content area** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `elevation.sheet`, the same
 *   altitude as every other V4 overlay.
 *
 * The drawer is opaque rather than following the seed's glass setting, and that
 * is deliberate: it holds an opaque `Sidebar` that paints its own surface, so a
 * translucent wrapper would frost nothing. A component should not claim a
 * treatment it cannot deliver.
 *
 * ## The scrim
 *
 * The shadow colour at a fixed alpha, shared with `ModalV4`, `DrawerV4` and the
 * rest. The base painted `colors.onSurface` at 0.5, which INVERTS with the
 * scheme and lays a white veil over a dark page.
 *
 * ## Motion
 *
 * The base opens the drawer with `animationType="slide"`, which on React Native
 * means *up from the bottom* — a left-anchored rail arriving from underneath
 * the screen, which says something false about where it lives (§36.5). V4
 * drives the travel itself: the panel moves the width of itself, from the left
 * edge, at `SURFACE_MOTION.sheet`, with `motion.easingEnter` so it settles
 * rather than stopping dead. Under Reduce Motion the travel is dropped and the
 * scrim's fade carries the transition.
 *
 * ## The menu button
 *
 * It becomes a real 44pt target composed from the spacing scale — the base's
 * `padding: xs` around a glyph put it near 28, on the control that is the only
 * way into navigation on a phone — presses with the M3 state layer, and draws
 * its glyph through the kit's own `Icon` rather than a raw `≡` in a `<Text>`,
 * so the whole kit uses one symbol for one idea.
 */
function AppShellV4({ sidebar, header, children, menuLabel = 'Toggle navigation', sidebarWidth = 280, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const { width } = (0, react_native_1.useWindowDimensions)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(false);
    // Push the top bar below the status bar / notch by adding the top safe-area
    // inset to its token padding. Needs a `SafeAreaProvider` above it.
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
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
    const travel = reduced
        ? 0
        : progress.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] });
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md + insets.top,
                    paddingBottom: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: menuLabel, accessibilityState: { expanded: open }, onPress: () => setOpen(true), style: ({ pressed }) => ({
                            minWidth: tap,
                            minHeight: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "menu", size: "xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: typeof header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontFamily: tokens.typography.fontHeading,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '600',
                            }, children: header })) : (header) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.lg }, children: children }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "none", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                // Black at a fixed alpha. `onSurface` inverts and would paint a
                                // white veil over a dark page.
                                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
                                opacity: progress,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close navigation", onPress: () => setOpen(false), style: { flex: 1 } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityViewIsModal: true, style: [
                                // The one container in this shell that is genuinely a layer.
                                (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                                {
                                    width: sidebarWidth,
                                    maxWidth: '85%',
                                    transform: [{ translateX: travel }],
                                },
                            ], children: sidebar })] }) })] }));
}
//# sourceMappingURL=AppShellV4.js.map