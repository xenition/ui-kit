import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { ProgressV4 } from '../primitives/ProgressV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { pluralizeCount } from './workforce-v4';
import {
  cardStateVars,
  clampPercent,
  FOCUS_RING_CLASS,
  LEAVE_TYPE_META_V4,
  metaLine,
  MIN_TAP_CLASS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import type { LeaveType } from './internal';

export type LeaveBalanceV4Variant = 'default' | 'compact';

export interface LeaveBalanceV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Category of leave — supplies the glyph and, unless overridden, the name. */
  type?: LeaveType;
  /** Name of the balance. Defaults to the leave type's own label. */
  label?: string;
  /** Days accrued this period. */
  accruedDays: number;
  /** Days already taken out of the entitlement. */
  takenDays: number;
  /** Days carried over from the previous period. Counts toward the entitlement. */
  carryoverDays?: number;
  /** The period this balance covers, pre-formatted (e.g. `'2026'`). */
  periodLabel?: string;
  /** Density. `compact` drops the breakdown row. */
  variant?: LeaveBalanceV4Variant;
  /** Render a day count. Default `'12 days'` / `'1 day'`. */
  formatDays?: (days: number) => string;
  /** Caption on the accrued figure. Default `'Accrued'`. */
  accruedLabel?: string;
  /** Caption on the taken figure. Default `'Taken'`. */
  takenLabel?: string;
  /** Caption on the headline figure. Default `'Remaining'`. */
  remainingLabel?: string;
  /** Caption on the carried-over figure. Default `'Carryover'`. */
  carryoverLabel?: string;
  /**
   * The word an over-drawn balance shows in place of a negative figure.
   * Default `'Over entitlement'`.
   */
  overdrawnLabel?: string;
  /** Opens the balance's detail (web parity of the native `onPress`). */
  onClick?: () => void;
  /** Test hook, matching the rest of the module. */
  testID?: string;
}

/**
 * The default for {@link LeaveBalanceV4Props.overdrawnLabel} — what an
 * over-drawn balance says instead of a negative number.
 *
 * A balance past its entitlement is the one figure here a person acts on, and
 * "−2 days" is arithmetic rather than an answer: it reads as a quantity of
 * leave the employee has, spelled oddly.
 */
const OVERDRAWN = 'Over entitlement';

/**
 * **V4 leave balance** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks for `days` and the module has nowhere to say what those
 * days are being taken **out of**. An employee looking at "3 days — Pending"
 * cannot tell whether that is a third of what they have left or more than they
 * are owed, and a manager approving it is in the same position. Every other
 * quantity in `hr` has its context beside it — gross against net, overtime
 * against hours worked, goals against a target — and the one number an
 * employee actually plans around had none.
 *
 * ## Four things it is careful about
 *
 * 1. **The entitlement is accrued *plus* carryover.** Carried-over days are
 *    spendable; a balance that meters against the accrual alone tells someone
 *    they are out of leave while five carried days sit unused.
 * 2. **Remaining never goes negative.** Payroll systems do let a balance go
 *    under — a taken figure past the entitlement is real — so the meter fills
 *    to 100% and the overage is stated as a word rather than drawn as a bar
 *    running off its own track.
 * 3. **The meter is a real `progressbar`** with its value exposed, and it is a
 *    sibling of any activation rather than a child of it: inside a
 *    `role="button"` a `progressbar`'s value is presentational and dropped.
 * 4. **The overage word is a prop.** Every other visible string here is
 *    {@link LeaveBalanceV4Props.accruedLabel} and its neighbours, and this one
 *    sits on the figure a person acts on, so it is
 *    {@link LeaveBalanceV4Props.overdrawnLabel} rather than an English literal
 *    a caller cannot reach — and it reaches the spoken name too, which used to
 *    say "Remaining 0 days" and stop there.
 */
export const LeaveBalanceV4 = React.forwardRef<HTMLDivElement, LeaveBalanceV4Props>(
  function LeaveBalanceV4(
    {
      type,
      label,
      accruedDays,
      takenDays,
      carryoverDays = 0,
      periodLabel,
      variant = 'default',
      formatDays,
      accruedLabel = 'Accrued',
      takenLabel = 'Taken',
      remainingLabel = 'Remaining',
      carryoverLabel = 'Carryover',
      overdrawnLabel = OVERDRAWN,
      onClick,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const compact = variant === 'compact';
    const typeMeta = type ? LEAVE_TYPE_META_V4[type] : undefined;
    const name = label ?? typeMeta?.label;

    // A balance with nothing to name is a meter measuring an unlabelled thing.
    if (!name) return null;

    const days = (value: number | undefined): number =>
      Math.max(0, Number.isFinite(value) ? (value as number) : 0);
    const accrued = days(accruedDays);
    const carryover = days(carryoverDays);
    const taken = days(takenDays);
    const entitlement = accrued + carryover;
    const remaining = Math.max(0, entitlement - taken);
    const overdrawn = taken > entitlement;

    const fmt = formatDays ?? ((n: number) => pluralizeCount(n, 'day'));
    const pct = clampPercent(entitlement > 0 ? (taken / entitlement) * 100 : 0) ?? 0;
    const interactive = onClick != null;

    const heading = (
      <span className="flex min-w-0 flex-1 items-center gap-xs text-left">
        {typeMeta ? <span aria-hidden="true">{typeMeta.glyph}</span> : null}
        <span className="truncate text-sm font-semibold text-on-card">{name}</span>
        {periodLabel ? (
          <span className="shrink-0 text-xs text-muted-text">{periodLabel}</span>
        ) : null}
      </span>
    );

    const meterName = `${name}, ${remainingLabel}`;

    return (
      <Card
        ref={ref}
        data-testid={testID}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                name,
                periodLabel,
                `${remainingLabel} ${fmt(remaining)}`,
                // Otherwise the name stops at "Remaining 0 days", which is the
                // one reading of an over-drawn balance that is not true.
                overdrawn ? overdrawnLabel : undefined,
                `${takenLabel} ${fmt(taken)}`,
                `${accruedLabel} ${fmt(accrued)}`,
                carryover > 0 ? `${carryoverLabel} ${fmt(carryover)}` : undefined,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {heading}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-center">{heading}</div>
          )}
        </div>

        <div className="flex items-baseline gap-xs">
          <span className={cn('text-2xl font-bold text-on-card', TABULAR_CLASS)}>
            {fmt(remaining)}
          </span>
          <span className="text-xs text-muted-text">{remainingLabel}</span>
        </div>

        {/*
          A sibling of the activation, so its value is exposed rather than
          pruned as the presentational content of a button.
        */}
        <ProgressV4
          value={pct}
          max={100}
          size="sm"
          aria-label={meterName}
          aria-valuetext={`${fmt(taken)} / ${fmt(entitlement)}`}
        />

        {overdrawn ? (
          // The bar cannot run past its own track, so the overage is a word.
          <p className="text-xs font-semibold text-warn-text">
            <span aria-hidden="true">⚠ </span>
            {metaLine([overdrawnLabel, `${takenLabel} ${fmt(taken)} / ${fmt(entitlement)}`])}
          </p>
        ) : null}

        {!compact ? (
          <div className="flex flex-wrap gap-lg">
            <div>
              <p className="text-xs text-muted-text">{accruedLabel}</p>
              <p className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                {fmt(accrued)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-text">{takenLabel}</p>
              <p className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>{fmt(taken)}</p>
            </div>
            {carryover > 0 ? (
              <div>
                <p className="text-xs text-muted-text">{carryoverLabel}</p>
                <p className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                  {fmt(carryover)}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
