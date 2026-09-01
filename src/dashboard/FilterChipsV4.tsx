import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { BleedV4 } from '../layout/BleedV4';
import { ClusterV4 } from '../layout/ClusterV4';
import type { SpaceKey } from '../layout/_tokens';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { FilterChipOption, FilterChipsProps } from './FilterChips';

export type { FilterChipOption };

export interface FilterChipsV4Props extends FilterChipsProps {
  /**
   * Let a `scroll` strip run off the **trailing** screen edge by the given
   * gutter, so the last option can be scrolled fully into reach.
   *
   * `ONBOARDING-DESIGN-SPEC.md` §7 is blunt about why this matters: *a user
   * cannot choose what they cannot see*. A horizontal strip inside a padded
   * page stops at the gutter, so the last chip sits half under the fold with
   * nothing to suggest there is more — the exact failure §7 names.
   * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 asks for it to be paired with `Bleed
   * edge`, which is what this does: `BleedV4 edge="end"` escapes one side
   * only, so the strip's *leading* edge stays on the page gutter (§4.1,
   * `spacing.lg`) and only the tail runs out.
   *
   * Pass the page gutter the parent is paying — normally `'lg'`. Undefined by
   * default, which renders exactly what the base renders (§1.4), and ignored
   * entirely when `scroll` is off, because a wrapping cluster has no edge to
   * escape through.
   */
  bleed?: SpaceKey;
}

/**
 * Trailing padding inside the scroller, written out in full so Tailwind's
 * content scanner can find each class in the source. Logical (`pe-`) rather
 * than `pr-`, so the strip pads the side the last chip actually runs off in an
 * RTL layout — the same reason `BleedV4` bleeds `-me-` rather than `-mr-`.
 *
 * The base used `pr-md`, which is this at `md` and physical.
 */
const SPACE_PE: Record<SpaceKey, string> = {
  xs: 'pe-[var(--xen-space-xs)]',
  sm: 'pe-[var(--xen-space-sm)]',
  md: 'pe-[var(--xen-space-md)]',
  lg: 'pe-[var(--xen-space-lg)]',
  xl: 'pe-[var(--xen-space-xl)]',
  '2xl': 'pe-[var(--xen-space-2xl)]',
};

function normalize(o: FilterChipOption | string): FilterChipOption {
  return typeof o === 'string' ? { value: o, label: o } : o;
}

/**
 * **V4 filter chips** — a wrapping strip of single- or multi-select chips, on
 * the V4 design line. Same props as {@link FilterChips} plus `bleed`.
 *
 * ## Chips wrap, and the last one is always reachable
 *
 * `ONBOARDING-DESIGN-SPEC.md` §7 governs this component and it opens with the
 * rule: **chips wrap**, `spacing.sm` gaps, never a horizontal scroll that
 * clips the last option, *because a user cannot choose what they cannot see*.
 * Wrapping is the default here exactly as it was in the base, and it is now
 * `ClusterV4` doing it rather than a hand-rolled `flex-wrap` — the module's
 * one wrapping primitive, whose own defaults (`gap="sm"`, `align="center"`,
 * `wrap`) are already §4.1's chip rhythm.
 *
 * `scroll` survives because removing a prop is not additive, but it is no
 * longer allowed to clip: the scroller keeps a trailing pad, and the new
 * `bleed` prop pairs it with `BleedV4 edge="end"` so the strip runs to the
 * screen edge instead of stopping short of it (§5). The bleed's *vertical*
 * component is zeroed inline — a chip strip escapes one horizontal edge, and
 * pulling it up out of the page's vertical rhythm as well would be a second,
 * unasked-for change.
 *
 * ## 44, not 48
 *
 * §5: *"Chips are control-shaped but not fields: they take min-height 44 (the
 * HIG floor, and the house §7 minimum) with `radius.full`, not the 48 field
 * metric."* The floor comes from `MIN_TAP` — `spacing['2xl'] - spacing.xs`,
 * composed from the scale rather than typed as `44` — which is the same
 * expression `ButtonV4`, `SegmentedV4` and every V4 tab already stand on. The
 * base chip was `py-xs` around a 14px label: about 22px, half a target, on a
 * control whose entire job is to be tapped.
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
 * Press and hover are the **state layer**, never `hover:bg-neutral-100` (a raw
 * ramp step, which is what the base carried) and never an opacity dim (which
 * fades the label — M3 spends that signal on *disabled*). Each chip declares
 * its own opaque ground/ink pair through {@link stateGroundVars}, so the layer
 * over a `primary` chip is computed against `primary` rather than against
 * whatever is behind it.
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
export const FilterChipsV4 = React.forwardRef<HTMLDivElement, FilterChipsV4Props>(
  function FilterChipsV4(
    { options, selected, onChange, multi = false, scroll = false, bleed, className, ...rest },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const selectedList = Array.isArray(selected) ? selected : [selected];

    /*
      A chip is a toggle in both modes, and the active one turns itself off.
      Carried over from the base verbatim: single-select clears to `''` so the
      control can say "no filter" without an app having to invent a fake "All"
      option whose value is the empty string.
    */
    const toggle = (value: string): void => {
      if (multi) {
        const set = new Set(selectedList);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        onChange(Array.from(set));
      } else {
        onChange(selectedList.includes(value) ? '' : value);
      }
    };

    // §4.5 — nothing to choose between is nothing to draw.
    if (options.length === 0) return null;

    const chips = options.map(normalize).map((opt) => {
      const active = selectedList.includes(opt.value);
      return (
        <button
          key={opt.value}
          type="button"
          aria-pressed={active}
          data-xen-v4-chip=""
          data-xen-v4-state=""
          onClick={() => toggle(opt.value)}
          className={cn(
            'inline-flex shrink-0 items-center justify-center px-md',
            // The HIG floor, composed from the spacing scale — not a typed 44.
            MIN_TAP_CLASS,
            'rounded-[var(--xen-radius-full)] border focus-visible:outline-none',
            active ? 'border-primary bg-primary' : 'border-border bg-card'
          )}
          style={
            stateGroundVars(
              active ? 'var(--xen-primary)' : 'var(--xen-card)',
              active ? 'var(--xen-on-primary)' : 'var(--xen-on-card)'
            ) as React.CSSProperties
          }
        >
          <TextV4
            size="sm"
            weight={active ? 'semibold' : 'medium'}
            tone={active ? 'onPrimary' : 'onCard'}
          >
            {opt.label}
          </TextV4>
        </button>
      );
    });

    const strip = (
      <ClusterV4
        ref={ref}
        role="group"
        gap="sm"
        wrap={!scroll}
        className={cn(
          scroll && 'overflow-x-auto',
          // Even without a bleed the last chip keeps clear of the container's
          // edge; with one, the pad matches the gutter being escaped.
          scroll && SPACE_PE[bleed ?? 'md'],
          className
        )}
        {...rest}
      >
        {chips}
      </ClusterV4>
    );

    if (!scroll || bleed === undefined) return strip;

    return (
      <BleedV4
        edge="end"
        space={bleed}
        data-xen-v4-chips-bleed=""
        // `BleedV4` always pays a vertical bleed as well; a chip strip escapes
        // one HORIZONTAL edge and must keep its place in the page's vertical
        // rhythm. `0` is the absence of a margin, not a spacing decision.
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        {strip}
      </BleedV4>
    );
  }
);
