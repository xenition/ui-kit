import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { TaxStatus, TaxSummaryCardProps } from './TaxSummaryCard';
import { formatMoney } from './internal/format';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  spokenLine,
  tintGround,
  tintInkClass,
  TONE_INK,
  type ToneV4,
} from './internal/civic-v4';

export interface TaxSummaryCardV4Props extends TaxSummaryCardProps {
  /** Override the five status words — `'Balance due'`, `'Overdue'`, … */
  statusLabels?: Partial<Record<TaxStatus, string>>;
  /** What the due date is called. Default `'Due'`. */
  dueLabel?: string;
  /** How "Pay now" names itself once armed. Default `'Confirm payment'`. */
  confirmPayLabel?: string;
}

/**
 * Status → word, glyph and tone.
 *
 * `filed` is `neutral`: having filed is a stage of the year, not an outcome,
 * and a brand-coloured pill beside a green Paid reads as a second verdict.
 */
const STATUS_V4: Record<TaxStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
  refund: { label: 'Refund', glyph: '💵', tone: 'success' },
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
  filed: { label: 'Filed', glyph: '📄', tone: IDENTITY_TONE },
};

/**
 * **V4 tax summary** — the web twin of the native `TaxSummaryCardV4`, same
 * props as {@link TaxSummaryCard} plus `statusLabels`, `dueLabel` and
 * `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date stops being an afterthought.** It was a muted 12px line —
 *    the same size and colour as the "Paid" caption — with nothing at all
 *    linking it to `overdue`, on the one component whose whole job is to say
 *    when money is owed. It is now a labelled pair, it takes the weight and the
 *    ink its consequence deserves once the account is overdue, and it is what
 *    the overdue announcement leads with.
 * 2. **Overdue announces.** `overdue` is an adverse state by
 *    {@link isAdverse}, and the base had no live region anywhere. The sentence
 *    reaches a polite region one commit after mount, because a live region
 *    announces *changes* and text present at first paint is read by nobody.
 * 3. **Paying takes a confirming press.** "Pay now" was one tap on a ~32px
 *    target with no confirm and no pending state; it arms first, renames
 *    itself, and disarms on blur. It also clears 44.
 * 4. **The amounts are ink, not fills.** `text-success` and `text-danger` are
 *    the *fill* slots and carry no contrast promise as words — the figure a
 *    taxpayer reads takes `success-text` / `danger-text`. The leading disc's
 *    glyph likewise stops being the fill drawn on a tint of itself.
 * 5. **Balance, Paid and Due are label/value pairs**, not sibling spans that
 *    happen to sit above one another — so a reader hears "Balance, $1,240.00"
 *    rather than two disconnected readings — and `filed` stops wearing the
 *    brand colour beside a green Paid.
 */
export const TaxSummaryCardV4 = React.forwardRef<HTMLDivElement, TaxSummaryCardV4Props>(
  function TaxSummaryCardV4(
    {
      taxYear,
      taxType,
      status = 'owed',
      amountCents,
      paidCents,
      dueDate,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onPay,
      statusLabels,
      dueLabel = 'Due',
      confirmPayLabel = 'Confirm payment',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armed, setArmed] = React.useState(false);

    const sd = STATUS_V4[status] ?? STATUS_V4.owed;
    const word = statusLabels?.[status] ?? sd.label;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const overdue = status === 'overdue';
    const adverse = isAdverse(status);
    const isPayable = status === 'owed' || overdue;

    const amountInk =
      status === 'refund' || status === 'paid'
        ? TONE_INK.success
        : overdue
          ? TONE_INK.danger
          : 'text-on-surface';

    const amountLabel = status === 'refund' ? 'Refund' : 'Balance';
    const amountText = format(amount, currency);
    const dueText = dueDate != null ? `${dueLabel} ${dueDate}` : undefined;
    const payWord = armed ? confirmPayLabel : 'Pay now';

    const announcement = spokenLine([word, dueText, `${amountLabel} ${amountText}`]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <span role="status" aria-live="polite" className="sr-only">
          {announced}
        </span>

        <div className="flex items-center gap-md">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: tintGround(sd.tone) }}
          >
            <IconV4 glyph="🧾" size="xl" className={tintInkClass(sd.tone)} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-xs">
            <p className="text-base font-bold text-on-surface">
              {taxType ?? 'Tax'} · {taxYear}
            </p>
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${word}`}
            </BadgeV4>
          </div>
        </div>

        {/* Label and value as one term/definition pair, so the figure is never
            read without the word that says what it is. */}
        <dl className="mt-md flex items-end justify-between border-t border-border pt-md">
          <div className="flex flex-col gap-xs">
            <dt className="text-xs text-muted-text">{amountLabel}</dt>
            <dd className={cn('text-xl font-bold', amountInk)}>{amountText}</dd>
          </div>
          {paidCents != null ? (
            <div className="flex flex-col items-end gap-xs">
              <dt className="text-xs text-muted-text">Paid</dt>
              <dd className="text-base font-semibold text-on-surface">
                {format(Math.max(0, Math.trunc(paidCents)), currency)}
              </dd>
            </div>
          ) : null}
        </dl>

        {dueDate != null ? (
          <dl className="mt-sm flex items-baseline gap-xs">
            <dt className="text-xs text-muted-text">{dueLabel}</dt>
            <dd
              className={cn(
                'text-sm font-semibold',
                // A deadline that has passed is not a caption any more.
                overdue ? TONE_INK.danger : 'text-on-surface'
              )}
            >
              {dueDate}
            </dd>
          </dl>
        ) : null}

        {isPayable && onPay != null && amount > 0 ? (
          <div className="mt-md flex justify-end">
            <ButtonV4
              size="md"
              variant={overdue ? 'danger' : 'primary'}
              aria-label={spokenLine([payWord, amountText, dueText])}
              onClick={() => {
                // Money leaving an account has no undo, so the first press only
                // arms.
                if (!armed) {
                  setArmed(true);
                  return;
                }
                setArmed(false);
                onPay();
              }}
              // Walking away from an armed payment disarms it.
              onBlur={() => setArmed(false)}
            >
              {payWord}
            </ButtonV4>
          </div>
        ) : null}
      </CardV4>
    );
  }
);
