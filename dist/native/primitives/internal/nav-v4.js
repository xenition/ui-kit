"use strict";
/**
 * Shared plumbing for the **V4 navigation line** — `TabsV4`, `ScrollableTabsV4`,
 * `SegmentedV4`, `BottomNavV4`, `BreadcrumbV4`, `MenuV4`, `PopoverV4`,
 * `TooltipV4`, `ToolbarV4`, `PaginationV4`, `StepsV4`.
 *
 * Navigation has one job that outranks every other: say where the user is
 * (`design.md` §29) and let them recognise it rather than recall it (§32). So
 * the two things this file owns are the two things a navigation control cannot
 * express honestly on its own:
 *
 * 1. **A selected state that moves.** §36.5 asks that related states keep
 *    continuity of position. A tab underline that vanishes here and reappears
 *    there is two events; the same underline sliding is one, and the eye
 *    follows it. That needs measurement, so it needs a hook — see
 *    {@link useMovingIndicator}.
 * 2. **A tap target that is actually tappable.** 44 is not a number to
 *    remember per component; it is composed from the spacing scale once, in
 *    {@link minTap}, exactly as `ButtonV4` composes its `md` height.
 *
 * Depth is deliberately NOT here. The floating members of this family (`Menu`,
 * `Popover`, `Tooltip`) take it from `internal/surface-v4`, which the V4 sheets
 * and dialogs already share — a menu and a bottom sheet are the same kind of
 * object at different sizes, and they should not drift apart.
 */
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
exports.RAIL_MIX = exports.NAV_MOTION = void 0;
exports.minTap = minTap;
exports.panelMinWidth = panelMinWidth;
exports.useMovingIndicator = useMovingIndicator;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const useReducedMotion_1 = require("./useReducedMotion");
const motion_v4_1 = require("./motion-v4");
/**
 * Motion durations for the navigation line, in `design.md` §36.2's band for a
 * small state transition (160–240ms).
 *
 * `indicator` is the longer of the two because it travels a real distance and
 * the travel is the point; `reveal` is a floating panel appearing, which moves
 * nowhere and so takes the shortest time that still reads as a transition.
 */
exports.NAV_MOTION = {
    /** A thumb or an underline sliding to the newly selected item. */
    indicator: motion_v4_1.V4_MOTION.standard,
    /** A menu, popover or tip coming into existence. */
    reveal: motion_v4_1.V4_MOTION.standard,
};
/**
 * The minimum comfortable tap target, composed from the spacing scale rather
 * than remembered as `44`.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` uses for
 * its default height, so a tab, a page number and a button all land on one
 * size instead of three that happen to be close.
 */
function minTap(spacing) {
    return spacing['2xl'] - spacing.xs;
}
/**
 * How much `border` the segmented rail carries, composited into `surface`.
 *
 * Enough that the thumb sitting on it is unmistakably on top of something, not
 * so much that the rail competes with the labels for attention. The web twin's
 * injected sheet mixes the same 55% — the number lives in two files because
 * one platform mixes in JavaScript and the other in CSS, and neither can read
 * the other's.
 */
exports.RAIL_MIX = 0.55;
/**
 * The minimum width of a floating panel — menu, popover.
 *
 * Composed from the spacing scale rather than picked (the base components had
 * a hard-coded 160 and 192, two numbers for one idea). Four times the largest
 * step is wide enough for a short label beside an icon without the panel
 * looking like a tooltip, and it scales with a seed that widens its rhythm.
 */
function panelMinWidth(spacing) {
    return spacing['2xl'] * 4;
}
/**
 * Track the selected item with an indicator that **travels**.
 *
 * §36.5: a transition should preserve continuity of position between related
 * states. Two tabs are related states of one thing — "which section am I in" —
 * so the underline that answers that question is one object that moves, not
 * two that blink. The movement is also what makes the change readable at a
 * glance without the control having to shout (§32), which is the whole brief
 * for navigation.
 *
 * Three details that are easy to get wrong:
 *
 * - **The first placement is not a movement.** There was nowhere to move from,
 *   so the indicator is set, not animated. Animating it would open every
 *   screen with a slide from the left edge, which says something false.
 * - **`useNativeDriver: false` is required.** `left` and `width` are layout
 *   properties; the native driver handles transform and opacity only. The
 *   alternative — a `scaleX` on a fixed-width bar — distorts nothing here
 *   because the bar is a plain rectangle, but it makes the maths a component's
 *   problem instead of this file's, and a distorted label would be next.
 * - **Reduce Motion snaps.** §36.10: the indicator still arrives, it simply
 *   does not travel, so nothing about knowing where you are depends on an
 *   animation the user has switched off.
 */
function useMovingIndicator(activeIndex) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const slots = React.useRef({});
    // Bumped when a measurement actually changes, so the placement effect re-runs
    // when a layout arrives after the selection did (the usual order on mount).
    const [revision, setRevision] = React.useState(0);
    const [measured, setMeasured] = React.useState(false);
    const placed = React.useRef(false);
    const left = React.useRef(new react_native_1.Animated.Value(0)).current;
    const width = React.useRef(new react_native_1.Animated.Value(0)).current;
    const onItemLayout = React.useCallback((index) => (event) => {
        const { x, width: w } = event.nativeEvent.layout;
        const previous = slots.current[index];
        if (previous !== undefined && previous.x === x && previous.w === w)
            return;
        slots.current[index] = { x, w };
        setRevision((r) => r + 1);
    }, []);
    React.useEffect(() => {
        const slot = slots.current[activeIndex];
        if (slot === undefined)
            return;
        setMeasured(true);
        if (!placed.current || reduced) {
            placed.current = true;
            left.setValue(slot.x);
            width.setValue(slot.w);
            return;
        }
        const anim = react_native_1.Animated.parallel([
            react_native_1.Animated.timing(left, {
                toValue: slot.x,
                duration: exports.NAV_MOTION.indicator,
                // Decelerating — the indicator settles into the new tab rather than
                // stopping dead on it (§36.3).
                easing: motion_v4_1.EASING_ENTER,
                useNativeDriver: false,
            }),
            react_native_1.Animated.timing(width, {
                toValue: slot.w,
                duration: exports.NAV_MOTION.indicator,
                easing: motion_v4_1.EASING_ENTER,
                useNativeDriver: false,
            }),
        ]);
        anim.start();
        // Stop mid-flight on unmount so the timer never fires into a torn-down tree.
        return () => anim.stop();
    }, [activeIndex, revision, reduced, left, width]);
    return { onItemLayout, left, width, measured };
}
//# sourceMappingURL=nav-v4.js.map