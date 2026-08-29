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
exports.StatusDotV4 = StatusDotV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const motion_v4_1 = require("./internal/motion-v4");
/**
 * Tone → the **text** form of its slot.
 *
 * A status dot is a mark you have to be able to see, and the plain slots are
 * FILL colours: the compiler guarantees `onWarn` against `warn` and promises
 * nothing at all about `warn` against `surface`. A pale amber dot at eight
 * pixels on a white page is a dot nobody can find. The `*Text` forms are those
 * same hues walked until they clear AA on `surface`, and identical wherever the
 * plain slot already did — the same correction the native `Rating` made for its
 * filled star, for exactly the same reason.
 */
const MARK = {
    success: 'successText',
    warn: 'warnText',
    danger: 'dangerText',
    primary: 'primaryText',
    accent: 'accentText',
    // The one tone with no text form to take, and the one that needs none: it
    // means "no status". `muted` is already a text colour, held to the 3:1 a
    // non-text mark is judged at rather than to the 4.5 the five meanings clear.
    muted: 'muted',
};
/** One full echo. Slow enough to read as a heartbeat rather than a blink. */
const ECHO_MS = 2000;
/**
 * **V4 status dot** — same props as {@link StatusDot}, a different design line.
 *
 * ## A mark this small has to be legible
 *
 * The base painted `colors[tone]` — the raw fill slot. That is the correct
 * colour to put text ON and the wrong colour to draw an eight-pixel mark IN:
 * `warn` on a light page measures barely above the background for many seeds,
 * and the "live" indicator quietly disappears. V4 takes the compiler's
 * contrast-safe text form of the same hue, which clears AA against `surface`
 * and is unchanged wherever the raw slot already did.
 *
 * `design.md` §35.4 is what makes this a correctness issue rather than a taste
 * one: the dot's colour *is* its meaning. A green dot that cannot be
 * distinguished from an amber one at a glance has not said anything.
 *
 * ## The echo says "live", so it is allowed to loop
 *
 * §36.1 asks motion to be functional and §36.13 warns that a permanent
 * animation is a permanent cost. This one earns it narrowly: an expanding echo
 * is how a dot says *now*, and a static dot only says *is*. It stays cheap —
 * scale and opacity, both compositor properties, on a single view — it can be
 * switched off per instance with `pulse={false}`, and Reduce Motion removes it
 * everywhere (§36.10). The solid dot still carries the state without it, so
 * nothing is lost but the movement.
 *
 * ## Size from the scale
 *
 * The default diameter is `spacing.sm` — which is the 8 the base hard-coded.
 * The number was never wrong; a literal just cannot follow the theme's density.
 */
function StatusDotV4({ tone = 'success', pulse = true, label, size, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const color = colors[MARK[tone]];
    const d = size ?? tokens.spacing.sm;
    const animate = pulse && !reduced;
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!animate) {
            anim.setValue(0);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(anim, {
            toValue: 1,
            duration: ECHO_MS,
            easing: motion_v4_1.EASING_EXIT,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [animate, anim]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: label !== undefined, accessibilityRole: label !== undefined ? 'image' : undefined, accessibilityLabel: label, importantForAccessibility: label === undefined ? 'no-hide-descendants' : 'yes', style: [{ width: d, height: d, alignItems: 'center', justifyContent: 'center' }, style], children: [animate ? ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-v4-status-echo", pointerEvents: "none", style: {
                    position: 'absolute',
                    width: d,
                    height: d,
                    borderRadius: d / 2,
                    backgroundColor: color,
                    opacity: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.75, 0, 0] }),
                    transform: [
                        { scale: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 2.4, 2.4] }) },
                    ],
                } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-status-fill", style: { width: d, height: d, borderRadius: d / 2, backgroundColor: color } })] }));
}
//# sourceMappingURL=StatusDotV4.js.map