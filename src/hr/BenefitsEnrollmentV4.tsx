import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { ButtonV4 } from '../primitives/ButtonV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../commerce/money';
import { StatusPillV4 } from './StatusPillV4';
import {
  BENEFIT_TYPE_META_V4,
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import { BENEFIT_STATUS_META } from './internal';
import type { BenefitsEnrollmentProps } from './BenefitsEnrollment';

export interface BenefitsEnrollmentV4Props extends BenefitsEnrollmentProps {
  /**
   * Copy on the enroll action. Defaults to `'Complete enrollment'` while
   * `pending` and `'Enroll'` otherwise — the two strings the base hard-coded.
   */
  enrollLabel?: string;
  /** Render the cost. Defaults to the shared `formatMoney`. */
  formatMoney?: MoneyFormatter;
  /** Build the deadline line. Default `` `Enroll by ${date}` ``. */
  formatEnrollBy?: (date: string) => string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 benefits enrollment** — the web twin of the native
 * `BenefitsEnrollmentV4`, same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney`, `formatEnrollBy` and `testID`.
 *
 * ## Five changes
 *
 * 1. **Enrolling from the keyboard actually enrolls.** Enroll was a
 *    `<Button>` inside a `<Card role="button">` with its own Enter/Space
 *    handler. Its click was guarded with `stopPropagation`; its keydown was
 *    not, and the card's `preventDefault()` on the bubbled Enter cancels the
 *    button's own activation — so an employee tabbing to Enroll during open
 *    enrollment opened the plan detail and enrolled in nothing, before a
 *    deadline. The card is a plain container now and Enroll is a **sibling**
 *    of its activation.
 * 2. **The card is one accessible name.** `Benefit PPO Gold, Eligible`
 *    dropped the coverage tier, the cost and the enrollment deadline — the
 *    three facts the decision is made on.
 * 3. **Benefit type stops spending a status colour.** `retirement: success`
 *    and `dental: accent` made a plan list read as a scoreboard; the glyph
 *    already says what kind of plan it is.
 * 4. **Enroll is drawn the same way on both twins.** Web passed
 *    `variant="secondary"` and native `variant="soft"`, so the same action had
 *    two weights. Both are `soft`, and it clears 44.
 * 5. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop.
 */
export const BenefitsEnrollmentV4 = React.forwardRef<HTMLDivElement, BenefitsEnrollmentV4Props>(
  function BenefitsEnrollmentV4(
    {
      planName,
      type,
      status,
      coverage,
      costCents,
      costPeriod = '/mo',
      currency = 'USD',
      enrollBy,
      actionable = false,
      variant = 'default',
      onEnroll,
      onClick,
      enrollLabel,
      formatMoney = defaultFormatMoney,
      formatEnrollBy,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A plan with no name is a bordered box around a price.
    if (!planName) return null;

    const compact = variant === 'compact';
    const typeMeta = BENEFIT_TYPE_META_V4[type];
    const statusMeta = BENEFIT_STATUS_META[status];
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const interactive = onClick != null;
    const cost = costCents != null ? formatMoney(costCents, currency) : undefined;
    const deadline =
      !compact && enrollBy && !enrolled
        ? (formatEnrollBy ?? ((d: string) => `Enroll by ${d}`))(enrollBy)
        : undefined;
    const actionWord =
      enrollLabel ?? (status === 'pending' ? 'Complete enrollment' : 'Enroll');

    const summary = (
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="flex items-center gap-xs">
          <span aria-hidden="true" className="text-base">
            {typeMeta.glyph}
          </span>
          <span className="truncate text-base font-bold text-on-card">{planName}</span>
        </span>
        <span className="text-xs font-semibold text-muted-text">{typeMeta.label}</span>
      </span>
    );

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        <div className="flex items-start gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                'Benefit',
                planName,
                typeMeta.label,
                statusMeta.label,
                coverage,
                cost ? `${cost}${costPeriod}` : undefined,
                deadline,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-start gap-sm">{summary}</div>
          )}
          <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={interactive || undefined} />
        </div>

        {!compact && coverage ? <p className="text-sm text-muted-text">{coverage}</p> : null}

        <div className="flex items-end justify-between gap-sm">
          {cost ? (
            <span className="flex items-baseline gap-xs">
              <span className={cn('text-lg font-bold text-on-card', TABULAR_CLASS)}>{cost}</span>
              <span className="text-xs text-muted-text">{costPeriod}</span>
            </span>
          ) : (
            <span />
          )}
          {deadline ? <span className="text-xs text-muted-text">{deadline}</span> : null}
        </div>

        {/* A sibling of the card's activation, never a descendant of it. */}
        {showAction ? (
          <ButtonV4
            size="sm"
            variant="soft"
            className={MIN_TAP_CLASS}
            onClick={onEnroll}
          >
            {actionWord}
          </ButtonV4>
        ) : null}
      </Card>
    );
  }
);
