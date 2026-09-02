import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { allocationParts } from './coverage-v4';
import {
  BENEFICIARY_KIND_LABEL,
  FOCUS_RING_CLASS,
  percentText,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import type { BeneficiaryRowProps } from './BeneficiaryRow';

export interface BeneficiaryRowV4Props extends BeneficiaryRowProps {
  /**
   * What the whole beneficiary set adds up to, as a whole percentage.
   *
   * The row is the only place the reader is looking, and it cannot see the
   * other rows. Handing it the set's total is what lets one row say the set is
   * unbalanced — see change 1.
   */
  allocationTotal?: number;
  /**
   * Word the imbalance, given the signed remainder and the set's total.
   *
   * `allocationTotal` on its own only says a number is wrong; it takes a
   * sentence to say which way and by how much, and that sentence is the whole
   * value of the prop. Default: `'Allocations total 150% — 50% over'` /
   * `'Allocations total 80% — 20% unallocated'`.
   */
  formatUnbalanced?: (remainder: number, total: number) => string;
}

/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a set adding to 150% — or to 80% — printed as three (or two) perfectly
 *    calm numbers and the policyholder had no way to see that the estate would
 *    not distribute. Pass `allocationTotal` and every row in the set says so,
 *    in words, with the shortfall or the excess.
 * 2. **The row announces the allocation and the relationship.** `aria-label`
 *    sat on the element that also rendered the percentage, so ARIA replaced it
 *    — the row announced "Dana Reyes, Primary beneficiary, 40%" while the
 *    relationship, the one field that says *who this person is*, was never
 *    spoken at all. Both are folded into the name.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"` and a hand-written Enter/Space
 *    handler; the row now takes the shared height, the shared 44 leading slot
 *    and the shared state layer, so a beneficiary list and a claims list are
 *    the same object.
 * 4. **Press is a state layer, not `hover:opacity-80`** — dimming is M3's
 *    *disabled* signal — and focus is `ring-ring`, not the `ring-primary-300`
 *    ramp step.
 * 5. **The percentage is inked with an ink slot.** It was `text-primary`, the
 *    brand **fill**; the compiler guarantees contrast for `on-primary` against
 *    it, not for it against a card.
 */
export const BeneficiaryRowV4 = React.forwardRef<HTMLDivElement, BeneficiaryRowV4Props>(
  function BeneficiaryRowV4(
    {
      name,
      relationship,
      allocationPct,
      kind = 'primary',
      avatarUrl,
      allocationTotal,
      formatUnbalanced,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!name) return null;

    // The row's own share goes through the shared reader; the set's total is
    // summed by whatever renders the list (with the same helper) and handed down,
    // because a row cannot see its siblings.
    const share = allocationParts([allocationPct]).shares[0] ?? 0;
    const kindLabel = BENEFICIARY_KIND_LABEL[kind];
    const interactive = onClick != null;

    const total =
      allocationTotal != null && Number.isFinite(allocationTotal)
        ? Math.round(allocationTotal)
        : undefined;
    const remainder = total != null ? total - 100 : 0;
    const wordImbalance =
      formatUnbalanced ??
      ((over: number, sum: number) =>
        over > 0
          ? `Allocations total ${percentText(sum)} — ${percentText(over)} over`
          : `Allocations total ${percentText(sum)} — ${percentText(-over)} unallocated`);
    const imbalance =
      total == null || remainder === 0 ? undefined : wordImbalance(remainder, total);

    const content = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4 src={avatarUrl} name={name} size="md" alt="" />
        </span>

        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
          <span className="truncate text-xs text-muted-text">
            {kindLabel}
            {relationship != null && relationship !== '' ? ` · ${relationship}` : ''}
          </span>
        </span>

        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <span className={cn('text-lg font-bold text-on-card', TABULAR_CLASS)}>
            {percentText(share)}
          </span>
          {imbalance != null ? (
            <span className="text-xs font-semibold text-warn-text">{imbalance}</span>
          ) : null}
        </span>
      </>
    );

    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(true), rowGroundClass(false));

    if (!interactive) {
      return (
        <div ref={ref} data-xen-v4-row="" className={cn(rowClass, className)} {...rest}>
          {content}
        </div>
      );
    }

    // The activation is the row; the row's own element stays a plain `div`, so a
    // control added here later is its sibling rather than a button inside a
    // button.
    return (
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        <button
          type="button"
          aria-label={spokenLine([
            name,
            relationship,
            `${kindLabel} beneficiary`,
            `${percentText(share)} allocation`,
            imbalance,
          ])}
          onClick={onClick}
          data-xen-v4-row=""
          data-interactive="true"
          data-xen-v4-state=""
          style={rowStateVars()}
          className={cn(rowClass, 'rounded-[var(--xen-radius-md)]', FOCUS_RING_CLASS)}
        >
          {content}
        </button>
      </div>
    );
  }
);
