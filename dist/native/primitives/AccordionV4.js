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
exports.AccordionV4 = AccordionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const icon_names_1 = require("../../primitives/icon-names");
const color_1 = require("../../theme/color");
const motion_v4_1 = require("./internal/motion-v4");
const motion_v4_2 = require("./internal/motion-v4");
/**
 * §36.2 puts an enter at 160–240ms. A disclosure is the smaller half of that:
 * long enough to read as a reveal, short enough that a reader opening three
 * sections in a row never waits for the interface.
 */
const REVEAL_MS = motion_v4_2.V4_MOTION.standard;
/** The platform minimum touch target — a property of fingers, not of the seed. */
const MIN_TAP = 44;
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * **V4 accordion** — same props as {@link Accordion}, a different design line.
 *
 * A disclosure is a motion component whose motion was an afterthought.
 *
 * 1. **The chevron turns; it does not snap.** The base rotated it by swapping
 *    a static `transform` between renders, so the panel eased open underneath a
 *    marker that had already jumped. V4 drives the rotation with the same
 *    duration and curve as the reveal, so one gesture reads as one movement
 *    (§36.1 — motion should be functional, and a marker that teleports is not
 *    telling you anything).
 * 2. **The curve matches the action.** `easeInEaseOut` accelerates into the
 *    reveal, which is the curve for something leaving. A panel arriving should
 *    decelerate (§36.3), so both the height and the chevron run on an ease-out
 *    cubic.
 * 3. **Reduced motion is respected.** `LayoutAnimation` ignores the OS Reduce
 *    Motion switch entirely — the base animated every expand regardless. V4
 *    reads {@link useReducedMotion} and, when it is on, changes state with no
 *    animation at all and sets the chevron to its final angle immediately. The
 *    interaction is identical; only the movement goes (§36.10).
 * 4. **The header is a real target.** The row was as tall as its padding made
 *    it. It now has a floor of 44pt, which is the whole control's tap area.
 *
 * The chevron comes from the kit's named icon set rather than a `▾` typed into
 * this file, so it cannot drift from the chevron on the next screen; it is
 * decorative, because `accessibilityState.expanded` already carries the state.
 * The body text is run through `ensureContrast` — `muted` is `neutral[600]`
 * and the compiler guarantees the on-pairs, not that one.
 *
 * No fill, no gradient, no shadow. An accordion is a list with rules between
 * its rows (§11), and §35.11 keeps the sweep for the hero and the one action.
 */
function AccordionV4({ items, type = 'single', defaultValue = [], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(defaultValue);
    const toggle = (v) => {
        if (!reduced) {
            // Ease-out: a panel arriving decelerates. `easeInEaseOut` was the curve
            // for something on its way out.
            react_native_1.LayoutAnimation.configureNext({
                duration: REVEAL_MS,
                update: { type: react_native_1.LayoutAnimation.Types.easeOut, property: react_native_1.LayoutAnimation.Properties.scaleY },
            });
        }
        setOpen((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]);
    };
    const bodyInk = colors.mutedText;
    // A chevron is a UI mark, judged at 3:1 rather than as text.
    const markInk = (0, color_1.ensureContrast)(colors.muted, colors.surface, 3);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((it, i) => {
            const isOpen = open.includes(it.value);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isOpen }, onPress: () => toggle(it.value), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                            minHeight: MIN_TAP,
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.lg,
                        }, children: [typeof it.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: tokens.typography.scale.sm,
                                    fontFamily: tokens.typography.fontBody,
                                    fontWeight: '600',
                                    color: colors.onSurface,
                                }, children: it.title })) : (it.title), (0, jsx_runtime_1.jsx)(Chevron, { open: isOpen, color: markInk, size: tokens.typography.scale.sm })] }), isOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.lg,
                            paddingBottom: tokens.spacing.md,
                        }, children: typeof it.content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                fontSize: tokens.typography.scale.sm,
                                fontFamily: tokens.typography.fontBody,
                                color: bodyInk,
                            }, children: it.content })) : (it.content) })) : null] }, it.value));
        }) }));
}
/**
 * The disclosure marker, turning on the same clock as the panel.
 *
 * Under reduced motion it is set to its final angle on the frame the state
 * changes — the information survives, the movement does not.
 */
function Chevron({ open, color, size, }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const progress = React.useRef(new react_native_1.Animated.Value(open ? 1 : 0)).current;
    React.useEffect(() => {
        const to = open ? 1 : 0;
        if (reduced) {
            progress.setValue(to);
            return;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: to,
            duration: REVEAL_MS,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [open, reduced, progress]);
    const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color, fontSize: size, transform: [{ rotate }] }, children: (0, icon_names_1.resolveIconGlyph)('chevron-down') }));
}
//# sourceMappingURL=AccordionV4.js.map