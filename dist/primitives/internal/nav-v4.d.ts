/**
 * Shared plumbing for the **V4 navigation line** on the web — `TabsV4`,
 * `ScrollableTabsV4`, `SegmentedV4`, `BottomNavV4`, `BreadcrumbV4`, `MenuV4`,
 * `PopoverV4`, `TooltipV4`, `ToolbarV4`, `PaginationV4`, `StepsV4`.
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
 * 2. **Grounds and edges that are not utility classes.** A hover ground, a
 *    focus ring and a floating panel's shadow all have to be `var(--xen-*)`
 *    expressions, and `color-mix()` cannot be written as a Tailwind colour
 *    bound to a token. They live in {@link NAV_V4_CSS}.
 *
 * ## Why the grounds are a stylesheet and not inline styles
 *
 * Every value here is a `var()` or a `color-mix()`. A CSSOM that does not parse
 * custom properties — jsdom, and any SSR style extractor built on one — drops
 * such a value from an inline `style` outright, silently leaving the control
 * unstyled. In a stylesheet the declaration is never parsed by that layer at
 * all: it is a string handed to the browser. `GlassPanel` and the V4 surfaces
 * already work this way; the navigation line follows them.
 *
 * Depth for the floating members (`Menu`, `Popover`, `Tooltip`) is deliberately
 * NOT re-derived here: the panel skins reuse `--xen-elevation-*` and
 * `--xen-glass-*` exactly as `internal/surface-v4` does, because a menu and a
 * bottom sheet are the same kind of object at different sizes and should not
 * drift apart.
 */
import * as React from 'react';
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
    /**
     * A menu, popover or tip coming into existence.
     *
     * Was 160 here, 180 in the picker line and 140 in the input — three numbers
     * for one idea. All three are now M3's `standard`.
     */
    readonly reveal: number;
};
/**
 * The minimum comfortable tap target, composed from the spacing scale rather
 * than hard-coded as `44px`.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4` uses for
 * its default height, so a tab, a page number and a button land on one size
 * instead of three that happen to be close.
 */
export declare const MIN_TAP = "calc(var(--xen-space-2xl) - var(--xen-space-xs))";
/** {@link MIN_TAP} as a Tailwind arbitrary value (spaces are underscores). */
export declare const MIN_TAP_CLASS = "min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]";
/** {@link MIN_TAP} applied to both axes — for a square target like a page number. */
export declare const MIN_TAP_SQUARE_CLASS = "min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]";
/**
 * The minimum width of a floating panel — menu, popover — as a Tailwind
 * arbitrary value.
 *
 * Composed from the spacing scale rather than picked (the base components had
 * a hard-coded `10rem` and `12rem`, two numbers for one idea). Four times the
 * largest step is wide enough for a short label beside an icon without the
 * panel looking like a tooltip, and it scales with a seed that widens its
 * rhythm.
 */
export declare const PANEL_MIN_WIDTH_CLASS = "min-w-[calc(var(--xen-space-2xl)_*_4)]";
/**
 * Every ground, edge and panel skin the V4 navigation line paints, as one
 * injected stylesheet.
 *
 * The grounds are mixed from `--xen-border` rather than from a neutral ramp
 * step: `border` is re-derived per scheme by the compiler, so a hover ground
 * built from it is a hairline's worth of contrast in both schemes instead of a
 * fixed grey that disappears in one of them.
 */
export declare const NAV_V4_CSS: string;
/** What {@link useMovingIndicator} hands back. */
export interface MovingIndicator<T extends HTMLElement> {
    /** Ref callback for the item identified by `key`. */
    itemRef: (key: string) => (node: T | null) => void;
    /**
     * Inline geometry for the indicator element. Absent until the selected item
     * has a measurable box — before then the indicator has no honest position,
     * so callers hide it rather than parking it at zero and letting it fly in
     * from the left edge on first paint.
     */
    style: React.CSSProperties | null;
}
/**
 * Track the selected item with an indicator that **travels**.
 *
 * §36.5: a transition should preserve continuity of position between related
 * states. Two tabs are related states of one thing — "which section am I in" —
 * so the underline that answers that question is one object that moves, not two
 * that blink. The movement is also what makes the change readable at a glance
 * without the control having to shout (§32), which is the whole brief for
 * navigation.
 *
 * The geometry is `offsetLeft` / `offsetWidth` against the positioned ancestor
 * — which is the track itself — rather than `getBoundingClientRect`, so the
 * numbers are already in the coordinate space the indicator is absolutely
 * positioned in and no scroll offset has to be subtracted. That matters for
 * `ScrollableTabsV4`, whose track scrolls under the indicator.
 *
 * Measuring returns nothing in an environment with no layout engine (jsdom,
 * SSR), and that is the same state as "not measured yet": the indicator is
 * simply not rendered, and the selected tab still says it is selected through
 * its colour and weight. Nothing about knowing where you are depends on this
 * hook succeeding.
 */
export declare function useMovingIndicator<T extends HTMLElement>(activeKey: string, itemCount: number): MovingIndicator<T>;
//# sourceMappingURL=nav-v4.d.ts.map