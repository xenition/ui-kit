import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SpaceKey } from '../layout/BleedV4';
import type { FilterChipOption, FilterChipsProps } from './FilterChips';
export type { FilterChipOption };
export interface FilterChipsV4Props extends FilterChipsProps {
    /**
     * Let a `scroll` strip run off the **trailing** screen edge by the given
     * gutter, so the last option can be scrolled fully into reach.
     *
     * `ONBOARDING-DESIGN-SPEC.md` §7 is blunt about why this matters: *a user
     * cannot choose what they cannot see*. A horizontal strip inside a padded
     * screen stops at the gutter, so the last chip sits half under the fold with
     * nothing to suggest there is more — the exact failure §7 names.
     * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 asks for it to be paired with `Bleed
     * edge`, which is what this does: `BleedV4 edge="end"` escapes one side
     * only, so the strip's *leading* edge stays on the page gutter (§4.1,
     * `spacing.lg`) and only the tail runs out.
     *
     * Pass the page gutter the parent is paying — normally `'lg'`. Undefined by
     * default, which renders exactly what the base renders (§1.4), and ignored
     * entirely when `scroll` is off, because a wrapping strip has no edge to
     * escape through.
     */
    bleed?: SpaceKey;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 filter chips** — a wrapping strip of single- or multi-select chips, on
 * the V4 design line. Same props as {@link FilterChips} plus `bleed`, and the
 * exact twin of the web `FilterChipsV4`.
 *
 * ## Chips wrap, and the last one is always reachable
 *
 * `ONBOARDING-DESIGN-SPEC.md` §7 governs this component and it opens with the
 * rule: **chips wrap**, `spacing.sm` gaps, never a horizontal scroll that
 * clips the last option, *because a user cannot choose what they cannot see*.
 * Wrapping is the default here exactly as it was in the base, and it is now
 * `FlexV4` doing it rather than a hand-rolled `flexWrap` — the web twin
 * composes `ClusterV4`, which has no native counterpart by design (see that
 * file), so this is the same shape said in the vocabulary the platform has.
 *
 * `scroll` survives because removing a prop is not additive, but it is no
 * longer allowed to clip: the scroller keeps a trailing pad, and the new
 * `bleed` prop pairs it with `BleedV4 edge="end"` so the strip runs to the
 * screen edge instead of stopping short of it (§5). The bleed's *vertical*
 * component is zeroed — a chip strip escapes one horizontal edge, and pulling
 * it up out of the screen's vertical rhythm as well would be a second,
 * unasked-for change.
 *
 * ## 44, not 48
 *
 * §5: *"Chips are control-shaped but not fields: they take min-height 44 (the
 * HIG floor, and the house §7 minimum) with `radius.full`, not the 48 field
 * metric."* The floor comes from {@link minTap} — `spacing['2xl'] -
 * spacing.xs`, composed from the scale rather than typed as `44` — the same
 * expression `ButtonV4` and every V4 tab already stand on. The base chip was
 * `paddingVertical: spacing.xs` around a 14pt label: about 22, half a target,
 * on a control whose entire job is to be tapped.
 *
 * ## Selected, unselected, and pressed
 *
 * Selected is `primary` fill with an `onPrimary` label at `semibold`;
 * unselected is a hairline `border` over the **card** ground. §4.2 is the
 * reason it is `card` and not `surface`: `colors.card` was split out precisely
 * so a raised element reads as raised on the warm page ground, and §5's note
 * for this component names `colors.card` explicitly. §7's older wording says
 * `surface`, which is what a chip was before the card slot existed — the brief
 * settles it, the same way its Addendum settles the 48/56 contradiction. The
 * label rides `onCard`, the slot whose contrast against `card` the compiler
 * actually guarantees.
 *
 * Press is the **state layer**, never `opacity: pressed ? 0.8 : 1` — which is
 * what the base carried, and which fades the *label*, the signal M3 spends on
 * *disabled*. {@link pressOver} composites the layer against the chip's own
 * fill and returns an opaque hex, because a chip's label carries a measured
 * contrast promise against that fill and a translucent layer would make the
 * promise depend on whatever happens to be behind the strip.
 *
 * ## Behaviour is untouched
 *
 * A chip is a toggle in both modes and the active one turns itself off,
 * clearing single-select to `''`. That is the base's documented contract and
 * V4 does not touch it — see {@link FilterChipsProps.onChange}.
 *
 * `options: []` renders **nothing at all** (§4.5): a filter row with no
 * filters is not an empty state worth explaining, and a bordered empty box is
 * the thing §4.5 rules out.
 */
export declare function FilterChipsV4({ options, selected, onChange, multi, scroll, bleed, style, }: FilterChipsV4Props): React.ReactElement | null;
//# sourceMappingURL=FilterChipsV4.d.ts.map