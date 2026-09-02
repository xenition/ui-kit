import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressV4 } from '../primitives/ProgressV4';
import { formatMoney as defaultFormatMoney } from './internal/format';
import { deductibleParts } from './coverage-v4';
import { percentText, spokenLine, TABULAR_CLASS } from './internal/tone-v4';
import type { DeductibleBarProps } from './DeductibleBar';

export interface DeductibleBarV4Props extends DeductibleBarProps {
  /** The whole caption once the ceiling is reached. Default `'Deductible met'`. */
  metLabel?: string;
  /** The words **after** the remaining amount. Default `'to go'`. */
  toGoLabel?: string;
  /**
   * The words **after** the amount applied past the ceiling. Default
   * `'applied beyond the deductible'`.
   */
  overLabel?: string;
  /**
   * The caption when no usable ceiling was supplied. Default
   * `'No deductible recorded'`.
   *
   * The string change 1 needs: with nothing to measure against there is no bar
   * and no percentage, and the line has to say *why* rather than fall back to
   * a sentence about progress.
   */
  noCeilingLabel?: string;
}

/**
 * **V4 deductible bar** — same props as {@link DeductibleBar} plus `metLabel`,
 * `toGoLabel` and `overLabel`.
 *
 * ## Four changes
 *
 * 1. **A policy with no deductible no longer reads as a deductible that has
 *    been met.** The base guarded a `<= 0` ceiling by setting `ratio = 1`, so
 *    `deductibleCents={0}` — which is what a plan with no deductible recorded,
 *    or a field that has not loaded, looks like — drew a **full green bar
 *    reading "Deductible met"**. That is a claim about money the holder does
 *    not owe. With no usable ceiling the bar is not drawn at all and the line
 *    says only what has been applied.
 * 2. **The meter and the caption are the same number.** `value={ratio * 100}`
 *    was announced as `33.33333333333333` while the caption beside it said
 *    33%; both now come from `deductibleParts`, whose `percent` is a whole
 *    number by construction.
 * 3. **Money applied beyond the ceiling is shown.** `metCents={150000}`
 *    against a `deductibleCents={100000}` displayed "$1,000.00 / $1,000.00"
 *    and never mentioned the extra $500 — the one figure the holder would have
 *    called about.
 * 4. **Every word is a prop**, and the caption is inked with `*-text` slots
 *    rather than `text-success` / `text-muted`, which are fills the compiler
 *    makes no contrast promise about as text.
 */
export const DeductibleBarV4 = React.forwardRef<HTMLDivElement, DeductibleBarV4Props>(
  function DeductibleBarV4(
    {
      metCents,
      deductibleCents,
      label = 'Deductible',
      currency = 'USD',
      formatMoney: format = defaultFormatMoney,
      metLabel = 'Deductible met',
      toGoLabel = 'to go',
      overLabel = 'applied beyond the deductible',
      noCeilingLabel = 'No deductible recorded',
      className,
      ...rest
    },
    ref
  ) {
    const parts = deductibleParts(metCents, deductibleCents);
    const metText = format(parts.met, currency);
    const ceilingText = parts.ceiling != null ? format(parts.ceiling, currency) : undefined;

    const remaining = parts.hasCeiling ? Math.max(0, (parts.ceiling ?? 0) - parts.met) : 0;
    const toGoText = `${format(remaining, currency)} ${toGoLabel}`;
    const overText = `${format(parts.over, currency)} ${overLabel}`;

    // With no usable ceiling there is no ratio to draw, and drawing one anyway
    // is what made a zero deductible look satisfied.
    const caption = !parts.hasCeiling
      ? noCeilingLabel
      : parts.over > 0
        ? overText
        : parts.satisfied
          ? metLabel
          : toGoText;

    return (
      <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
        <div className="flex items-baseline justify-between gap-sm">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-card">{label}</span>
          <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
            {ceilingText != null ? `${metText} / ${ceilingText}` : metText}
          </span>
        </div>

        {parts.hasCeiling ? (
          <ProgressV4
            value={parts.percent ?? 0}
            max={100}
            tone={parts.satisfied ? 'success' : 'warn'}
            aria-label={spokenLine([label, `${percentText(parts.percent ?? 0)} met`, caption])}
          />
        ) : null}

        <span
          className={cn(
            'text-xs',
            parts.satisfied || parts.over > 0 ? 'text-success-text' : 'text-muted-text'
          )}
        >
          {caption}
        </span>
      </div>
    );
  }
);
