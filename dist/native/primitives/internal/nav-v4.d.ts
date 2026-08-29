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
import { Animated, type LayoutChangeEvent } from 'react-native';
import type { SpacingScale } from '../../../theme/types';
/**
 * Motion durations for the navigation line, in `design.md` §36.2's band for a
 * small state transition (160–240ms).
 *
 * `indicator` is the longer of the two because it travels a real distance and
 * the travel is the point; `reveal` is a floating panel appearing, which moves
 * nowhere and so takes the shortest time that still reads as a transition.
 */
export declare const NAV_MOTION: {
    /** A thumb or an underline sliding to the newly selected item. */
    readonly indicator: number;
    /** A menu, popover or tip coming into existence. */
    readonly reveal: number;
};
/**
 * The minimum comfortable tap target, composed from the spacing scale rather
 * than remembered as `44`.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` uses for
 * its default height, so a tab, a page number and a button all land on one
 * size instead of three that happen to be close.
 */
export declare function minTap(spacing: SpacingScale): number;
/**
 * How much `border` the segmented rail carries, composited into `surface`.
 *
 * Enough that the thumb sitting on it is unmistakably on top of something, not
 * so much that the rail competes with the labels for attention. The web twin's
 * injected sheet mixes the same 55% — the number lives in two files because
 * one platform mixes in JavaScript and the other in CSS, and neither can read
 * the other's.
 */
export declare const RAIL_MIX = 0.55;
/**
 * The minimum width of a floating panel — menu, popover.
 *
 * Composed from the spacing scale rather than picked (the base components had
 * a hard-coded 160 and 192, two numbers for one idea). Four times the largest
 * step is wide enough for a short label beside an icon without the panel
 * looking like a tooltip, and it scales with a seed that widens its rhythm.
 */
export declare function panelMinWidth(spacing: SpacingScale): number;
/** What {@link useMovingIndicator} hands back. */
export interface MovingIndicator {
    /** `onLayout` for the item at `index` — the measurement the slide needs. */
    onItemLayout: (index: number) => (event: LayoutChangeEvent) => void;
    /** Animated left edge of the indicator, in the row's coordinate space. */
    left: Animated.Value;
    /** Animated width of the indicator. */
    width: Animated.Value;
    /**
     * Whether the selected item has reported a layout yet. Before it has, the
     * indicator has no honest position, so callers hide it rather than parking
     * it at zero and letting it fly in from the left edge on first paint.
     */
    measured: boolean;
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
export declare function useMovingIndicator(activeIndex: number): MovingIndicator;
//# sourceMappingURL=nav-v4.d.ts.map