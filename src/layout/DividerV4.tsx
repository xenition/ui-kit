import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_MX, SPACE_MY, type SpaceKey } from './_tokens';
import type { DividerProps } from './Divider';

/**
 * Where a V4 divider starts.
 *
 * The `SpaceKey` values are the base's, unchanged — a symmetric inset off the
 * cross axis. `'leading'` is the one addition (BRIEF §4.4): the separator
 * starts where a row's *text* starts, so it clears the row's leading slot
 * instead of cutting across an avatar or a tinted badge.
 */
export type DividerV4Inset = SpaceKey | 'leading';

export interface DividerV4Props extends Omit<DividerProps, 'inset'> {
  /**
   * Inset the divider from the cross axis by a spacing token, or by
   * `'leading'` to clear a row's 44 leading slot (BRIEF §4.3/§4.4).
   *
   * A `SpaceKey` insets both ends, as it always has. `'leading'` insets only
   * the leading end — a separator between rows is meant to line up with the
   * titles above and below it and still run out to the container edge.
   *
   * Rows *without* a leading slot get a flush separator: leave `inset` unset.
   */
  inset?: DividerV4Inset;
}

/**
 * The leading inset: `44 + spacing.md`.
 *
 * 44 is the row's leading slot — the HIG tap-target floor and the house §8
 * badge size (BRIEF §4.3) — and it is one of the two bare numbers §1 allows in
 * this file. The other is the hairline's `1`, which `border-t` supplies. The
 * gap half is `spacing.md`, the row's leading-slot-to-text gap, so the sum
 * lands exactly on the row title's leading edge rather than near it.
 *
 * Both classes are written out in full rather than composed from a template,
 * so the Tailwind scanner finds them in the library source — the `_tokens.ts`
 * convention.
 */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';
const LEADING_MT = 'mt-[calc(44px+var(--xen-space-md))]';

/**
 * **V4 divider** — the web twin of the native `DividerV4`, at prop parity, in
 * the V4 design line.
 *
 * Visually it is the base: BRIEF §4.4 settles that a separator is **1px
 * `colors.border` and nothing else** — never two weights, never a tinted rule
 * — and the base already draws exactly that. So this file is structure plus
 * the one new capability the row family needs.
 *
 * **`inset="leading"`.** Where a list's rows carry a 44 leading slot, a flush
 * rule runs underneath the avatar or badge and makes the list read as a table.
 * Inset by `44 + spacing.md` it starts at the title, which is what turns a
 * stack of rows into one grouped container. Rows with no leading slot keep the
 * flush rule — that is the default, so every existing caller renders exactly
 * as it does today (§1.4).
 *
 * **Where a divider belongs.** Inside a grouped container only — between the
 * rows of a `SettingsSection`, or between a card header and a body that is a
 * list. Between free-standing blocks the separator is space, not a rule
 * (§4.4); a hairline under every block is admin styling and fights the airy
 * ground §3 asks for.
 *
 * Still an `<hr>`, for its implicit `separator` role. No label variant —
 * `AuthDividerV4` owns that.
 */
export const DividerV4 = React.forwardRef<HTMLHRElement, DividerV4Props>(function DividerV4(
  { orientation = 'horizontal', inset, className, ...rest },
  ref
) {
  const horizontal = orientation === 'horizontal';
  const leading = inset === 'leading';

  let insetClass: string | undefined;
  if (leading) {
    // One end only: a leading inset is an alignment with the row's text, not a
    // margin off both edges.
    insetClass = horizontal ? LEADING_ML : LEADING_MT;
  } else if (inset !== undefined) {
    insetClass = horizontal ? SPACE_MX[inset] : SPACE_MY[inset];
  }

  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={cn(
        'border-0 border-solid border-border',
        horizontal ? 'w-full border-t' : 'self-stretch border-l',
        insetClass,
        className
      )}
      {...rest}
    />
  );
});
