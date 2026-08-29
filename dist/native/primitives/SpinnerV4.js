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
exports.SpinnerV4 = SpinnerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const color_1 = require("../../theme/color");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * How much of the brand the ring's track carries.
 *
 * The track is not grey. A spinner is one object, and a grey ring with a
 * coloured notch reads as two — the eye separates them before it reads the
 * rotation. Compositing a fifth of `primary` into `surface` keeps the whole
 * ring in one hue family, so what moves is a bright arc around a quiet one
 * rather than a chip orbiting a hoop.
 */
const TRACK_MIX = 0.2;
/**
 * **V4 spinner** — same props as {@link Spinner}, a different design line.
 *
 * ## Why it stopped being an `ActivityIndicator`
 *
 * The base spinner is the platform's `ActivityIndicator`, which spins whatever
 * the user's accessibility settings say. `design.md` §36.10 asks that motion be
 * respected as a preference, and a component that cannot switch itself off is
 * not respecting anything. V4 draws its own ring — a circle with one edge in
 * the brand — so Reduce Motion can actually stop it.
 *
 * Stopped, it is still a spinner: the ring keeps its bright arc, and a ring
 * that is brighter on one side is legible as "working" without moving at all.
 * §36.10's point is that the *information* survives the loss of the animation,
 * not that the component disappears.
 *
 * ## What the motion is allowed to say
 *
 * §36.7: loading feedback exists to reduce uncertainty, and it must not
 * fabricate precision. A spinner is what you use when the wait is short and
 * **unknown**, so this one is honestly shapeless — one continuous revolution,
 * no start, no end, no percentage. It never becomes a bar, never fills, never
 * accelerates toward a finish it cannot see. The moment a component knows the
 * fraction, the right component is `ProgressV4`.
 *
 * ## Tokens all the way down
 *
 * The three sizes are `spacing.md` / `lg` / `xl` — which happen to be the very
 * 16 / 24 / 32 the base hard-coded. The point is not that those numbers were
 * wrong; it is that a number written into a component cannot move when the
 * theme's density does. The stroke is derived from the diameter, and the bright
 * arc is held to 3:1 against its own track — WCAG's bar for a meaningful
 * graphic, which is what a spinner is.
 */
function SpinnerV4({ size = 'md', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const spacing = tokens.spacing;
    const diameter = {
        sm: spacing.md,
        md: spacing.lg,
        lg: spacing.xl,
    };
    const d = diameter[size];
    // Proportional to the ring, so it thickens with the theme instead of being
    // three numbers that happen to have been chosen together.
    const stroke = Math.max(2, Math.round(d / 10));
    const track = (0, v4_depth_1.mixToken)(colors.surface, colors.primary, TRACK_MIX);
    const head = (0, color_1.ensureContrast)(colors.primary, track, feedback_v4_1.MIN_NON_TEXT_CONTRAST);
    const turn = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (reduced) {
            turn.setValue(0);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(turn, {
            toValue: 1,
            duration: feedback_v4_1.BUSY_MOTION.spin,
            // Linear: a revolution has no beginning and no end to ease into, and
            // easing one would imply a rhythm the wait does not have (§36.3).
            easing: react_native_1.Easing.linear,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [reduced, turn]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading", testID: "xen-v4-spinner", style: [
            {
                width: d,
                height: d,
                borderRadius: d / 2,
                borderWidth: stroke,
                borderColor: track,
                borderTopColor: head,
                transform: reduced
                    ? []
                    : [
                        {
                            rotate: turn.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                            }),
                        },
                    ],
            },
            style,
        ] }));
}
//# sourceMappingURL=SpinnerV4.js.map