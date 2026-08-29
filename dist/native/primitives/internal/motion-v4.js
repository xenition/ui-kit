"use strict";
/**
 * The native spelling of the V4 line's motion scale.
 *
 * The scale, the reasoning and the M3 citation live in
 * `src/primitives/internal/v4-motion.ts`, which both platforms share. This
 * file is the adapter that turns an easing quadruple into a React Native
 * `Easing` function, because `Animated.timing` takes a function and CSS takes
 * a string.
 *
 * `Easing.out(Easing.cubic)` appeared at thirteen `Animated.timing` call sites
 * in the V4 line and is not any of M3's three curves; it is what the line
 * reached for when it needed "something decelerating". These are the curves
 * themselves, so a native sheet and a web sheet move on the same arc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EASING_EXIT = exports.EASING_ENTER = exports.EASING_STANDARD = exports.V4_MOTION = void 0;
exports.easingOf = easingOf;
const react_native_1 = require("react-native");
const v4_motion_1 = require("../../../primitives/internal/v4-motion");
Object.defineProperty(exports, "V4_MOTION", { enumerable: true, get: function () { return v4_motion_1.V4_MOTION; } });
/** An M3 easing quadruple as a React Native `Easing` function. */
function easingOf(easing) {
    return react_native_1.Easing.bezier(easing[0], easing[1], easing[2], easing[3]);
}
/** `cubic-bezier(0.2, 0, 0, 1)` — a state change that starts and ends in place. */
exports.EASING_STANDARD = easingOf(v4_motion_1.V4_MOTION.easingStandard);
/** `cubic-bezier(0.05, 0.7, 0.1, 1)` — M3 emphasized-decelerate. Arrivals. */
exports.EASING_ENTER = easingOf(v4_motion_1.V4_MOTION.easingEnter);
/** `cubic-bezier(0.3, 0, 1, 1)` — M3 standard-accelerate. Departures. */
exports.EASING_EXIT = easingOf(v4_motion_1.V4_MOTION.easingExit);
//# sourceMappingURL=motion-v4.js.map