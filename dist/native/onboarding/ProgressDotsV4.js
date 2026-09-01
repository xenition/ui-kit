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
exports.ProgressDotsV4 = ProgressDotsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const v4_state_1 = require("../../primitives/internal/v4-state");
const v4_motion_1 = require("../../primitives/internal/v4-motion");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * How thick a segment is, as a fraction of the spacing step it is derived
 * from. The base pinned `6` and `8`; those are the right numbers on the
 * default scale and wrong on any other, and a progress bar that stays 6pt
 * while every control around it grows is how a header stops looking designed.
 */
const THICKNESS = {
    sm: (xs) => xs,
    md: (xs) => xs * 1.5,
};
/** How much wider the active dot grows in `'dots'`. Geometric. */
const ACTIVE_DOT_STRETCH = 2.5;
/**
 * **V4 paged-progress indicator** — same props as {@link ProgressDots} plus
 * `accent` and `animated`, both optional.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline.** The base filled upcoming
 *    segments with `colors.border` — a *divider* colour asked to act as a
 *    *fill*. On a dark seed that is a near-invisible rail; on a high-contrast
 *    one it is a row of hard black bars competing with the filled steps. The
 *    track is now an M3 state mix of `onSurface` over `surface`, which is a
 *    quiet neutral in both schemes by construction.
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment animates in.** On the `standard` duration, which is
 *    what a state change between two positions takes. It fades rather than
 *    slides: a bar that slides implies the *content* slid, and in a stepped
 *    flow it did not. Collapses to nothing under `useReducedMotion()`.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `{min: 0, max: total - 1, now: activeIndex}` — a screen reader on step
 *    one of three announced "0 of 2". It now reports 1-based positions, which
 *    is what the visible label says.
 *
 * A `count` of zero renders an empty row rather than crashing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotPress` is supplied, in which case each step becomes a labelled button.
 */
function ProgressDotsV4({ count, activeIndex, size = 'md', variant = 'dots', accent = 'primary', animated = true, onDotPress, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, state } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const thickness = THICKNESS[size](tokens.spacing.xs) * (bars ? 1 : 1.35);
    const track = (0, v4_state_1.stateMix)(colors.surface, colors.onSurface, 'focus', state);
    // One driver for the whole row: every segment reads the same progress value,
    // so a step change is one animation rather than `count` of them.
    const moving = animated && !reduced;
    const progress = React.useRef(new react_native_1.Animated.Value(activeIndex)).current;
    React.useEffect(() => {
        if (!moving) {
            progress.setValue(activeIndex);
            return;
        }
        const animation = react_native_1.Animated.timing(progress, {
            toValue: activeIndex,
            duration: v4_motion_1.V4_MOTION.standard,
            easing: motion_v4_1.EASING_STANDARD,
            // Colour is not a native-driver property.
            useNativeDriver: false,
        });
        animation.start();
        return () => animation.stop();
    }, [progress, activeIndex, moving]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 1, max: Math.max(1, total), now: Math.min(activeIndex + 1, total) }, accessibilityLabel: accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            bars ? { alignSelf: 'stretch' } : null,
            style,
        ], children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            // In `'bars'` a step already walked past stays filled — the bar reads
            // as "how far through am I", not "which one is selected".
            const filled = bars ? i <= activeIndex : active;
            const fill = moving
                ? progress.interpolate({
                    // The segment crosses from track to fill as the active index
                    // passes it. Clamped, so segments far from the change do not
                    // interpolate at all.
                    inputRange: bars ? [i - 1, i] : [i - 0.5, i, i + 0.5],
                    outputRange: bars ? [track, grounds.fill] : [track, grounds.fill, track],
                    extrapolate: 'clamp',
                })
                : filled
                    ? grounds.fill
                    : track;
            const segment = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                    // Bars share the row equally; dots keep their diameter and the
                    // active one stretches into a pill.
                    width: bars ? undefined : active ? thickness * ACTIVE_DOT_STRETCH : thickness,
                    alignSelf: bars ? 'stretch' : undefined,
                    height: thickness,
                    borderRadius: tokens.radius.full,
                    backgroundColor: fill,
                } }));
            if (!onDotPress) {
                return bars ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: segment }, i)) : ((0, jsx_runtime_1.jsx)(React.Fragment, { children: segment }, i));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to step ${i + 1}`, accessibilityState: { selected: active }, hitSlop: tokens.spacing.sm, onPress: () => onDotPress(i), style: bars ? { flex: 1 } : undefined, children: segment }, i));
        }) }));
}
//# sourceMappingURL=ProgressDotsV4.js.map