import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import {
  V4_CARD_GROUND_ATTR,
  V4_CARD_GROUND_CSS,
  V4_CARD_GROUND_STYLE_ID,
} from '../primitives/internal/card-ground-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { ProgressRing } from '../charts/ProgressRing';
import { formatMoney } from '../commerce/money';
import { meterParts, spokenLine, TABULAR_CLASS } from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

export interface SavingsGoalCardV4Props extends SavingsGoalCardProps {
  /** The words after an overshoot figure. Default `'saved over goal'`. */
  overLabel?: string;
}

/** The words after a positive remainder. */
const TO_GO_LABEL = 'to go';

/** The ring's diameter and stroke — the base's own numbers, kept. */
const RING_SIZE = 84;
const RING_THICKNESS = 9;

/**
 * **V4 savings goal card** — the web twin of the native `SavingsGoalCardV4`,
 * same props as {@link SavingsGoalCard} plus `overLabel`.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.min(saved / target, 1)` and
 *    `Math.max(target - saved, 0)` floored the overshoot twice over, so
 *    $12,000 against a $10,000 goal rendered identically to landing exactly on
 *    target — a full ring, "100%", and "$0.00 to go". The ring still fills
 *    once, because a ring cannot say 120%, but the figure beside it now does.
 * 2. **The ring is a `progressbar` with a value.** It was a `role="img"` on
 *    both twins, so the one number the card exists to report reached a reader
 *    as a picture. `aria-valuenow` is the clamped ratio the ring draws and
 *    `aria-valuetext` is the true percentage.
 * 3. **The ring's own centred readout is off, and the percentage is written
 *    out instead.** `ProgressRing` clamps what it prints, so leaving it on
 *    would have put "100%" inside a card whose text says 120% — the same
 *    disagreement change 1 removes.
 * 4. **The card is on `card` and its captions on `muted-text`**, where it
 *    painted `surface` (the page colour, so it read flat in dark mode) and
 *    inked its captions with `muted`, a ramp step with no contrast promise.
 */
export const SavingsGoalCardV4 = React.forwardRef<HTMLDivElement, SavingsGoalCardV4Props>(
  function SavingsGoalCardV4(
    {
      title,
      savedCents,
      targetCents,
      currency = 'USD',
      deadline,
      color = 'success',
      formatMoney: format = formatMoney,
      overLabel = 'saved over goal',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_CARD_GROUND_STYLE_ID, V4_CARD_GROUND_CSS);
    }, []);

    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;

    const { ratio, percent, over } = meterParts(saved, target);
    const gap = target - saved; // negative once the goal is beaten

    const percentText = `${new Intl.NumberFormat().format(percent)}%`;
    const gapText = `${format(Math.abs(gap), currency)} ${over ? overLabel : TO_GO_LABEL}`;

    return (
      <CardV4
        ref={ref}
        {...V4_CARD_GROUND_ATTR}
        variant="outlined"
        radius="lg"
        padding="lg"
        className={className}
        {...rest}
      >
        <div className="flex items-center gap-lg">
          <ProgressRing
            role="progressbar"
            aria-label={spokenLine([title, percentText])}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(ratio * 100)}
            aria-valuetext={percentText}
            value={ratio * 100}
            max={100}
            size={RING_SIZE}
            thickness={RING_THICKNESS}
            color={color}
            showValue={false}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <p className="truncate text-base font-bold text-on-card">{title}</p>
            <div className="flex items-baseline gap-xs">
              <MoneyAmountV4
                cents={saved}
                currency={currency}
                formatMoney={format}
                tone="neutral"
                size="md"
              />
              <span className={cn('text-sm text-muted-text', TABULAR_CLASS)}>
                {`/ ${format(target, currency)}`}
              </span>
            </div>
            <p className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
              {metaLine([percentText, gapText, deadline != null ? `by ${deadline}` : undefined])}
            </p>
          </div>
        </div>
      </CardV4>
    );
  }
);
