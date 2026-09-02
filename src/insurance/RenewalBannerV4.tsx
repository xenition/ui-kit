import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { SpinnerV4 } from '../primitives/SpinnerV4';
import { formatMoney as defaultFormatMoney } from './internal/format';
import {
  MIN_TAP_CLASS,
  moneyParts,
  RENEWAL_URGENCY_META_V4,
  spokenLine,
  TABULAR_CLASS,
  toneGroundStyle,
  toneInkClass,
} from './internal/tone-v4';
import type { RenewalBannerProps } from './RenewalBanner';

export interface RenewalBannerV4Props extends RenewalBannerProps {
  /**
   * What is owed to renew, in integer **cents**.
   *
   * `premiumCents` is the recurring price; the amount due at renewal is often
   * neither that nor a multiple of it — arrears, a proration, a reinstatement
   * fee. The banner asked the holder to pay and never said how much.
   */
  amountDueCents?: number;
  /** The last day cover survives non-payment, already formatted by the caller. */
  graceDate?: string;
  /** The caption over the figure. Default `'Amount due'`. */
  amountDueLabel?: string;
  /** The words before `graceDate`. Default `'Grace period ends'`. */
  graceLabel?: string;
  /** Build the renewal sentence. Default `'Your policy renews on 12 Aug'`. */
  formatRenewal?: (date: string) => string;
}

/**
 * **V4 renewal banner** — same props as {@link RenewalBanner} plus
 * `amountDueCents` and `graceDate`.
 *
 * ## Five changes
 *
 * 1. **An overdue renewal announces itself.** The banner had no live region at
 *    all, so a policy that had lapsed into its grace period appeared silently:
 *    a screen-reader user who had just submitted a payment, or landed on the
 *    page from a link, was told nothing. Overdue is the one genuinely urgent
 *    state in this module — cover is ending — so it, and only it, is an
 *    `alert`. Upcoming and due stay quiet, because announcing everything
 *    teaches a user to ignore everything.
 * 2. **The label sat on a roleless `<div>`.** ARIA forbids naming a generic
 *    element and browsers drop the label, so `aria-label="Renewal overdue, 12
 *    Aug"` was never spoken by anything — while also being the only place the
 *    date was joined to the heading.
 * 3. **The heading is a heading.** It was a `<p>` in bold, so the banner was
 *    invisible to a reader navigating a policy page by heading.
 * 4. **It can say what is owed, and by when.** See `amountDueCents` and
 *    `graceDate`.
 * 5. **The tint follows the theme.** `bg-primary-50` and `border-primary` over
 *    `bg-warn/10` were three different recipes; the ground is now the tone
 *    mixed 10% into the card, which is what the native twin mixes, and the
 *    Renew button clears 44.
 */
export const RenewalBannerV4 = React.forwardRef<HTMLDivElement, RenewalBannerV4Props>(
  function RenewalBannerV4(
    {
      renewalDate,
      urgency = 'due',
      premiumCents,
      amountDueCents,
      graceDate,
      amountDueLabel = 'Amount due',
      graceLabel = 'Grace period ends',
      formatRenewal,
      currency = 'USD',
      formatMoney: format = defaultFormatMoney,
      renewLabel = 'Renew now',
      loading = false,
      onRenew,
      className,
      ...rest
    },
    ref
  ) {
    const ud = RENEWAL_URGENCY_META_V4[urgency] ?? RENEWAL_URGENCY_META_V4.due;
    const overdue = urgency === 'overdue';

    const due = moneyParts(amountDueCents, currency, format);
    const premium = moneyParts(premiumCents, currency, format);
    const amount = due ?? premium;

    const dateLine = (formatRenewal ?? ((date: string) => `Your policy renews on ${date}`))(
      renewalDate
    );
    const graceLine = graceDate != null ? `${graceLabel} ${graceDate}` : undefined;

    return (
      <div
        ref={ref}
        // Only the state that has actually gone wrong interrupts. No
        // `aria-label` here: a roleless <div> is `generic`, ARIA forbids naming
        // one, and that is exactly how the base lost its own label.
        role={overdue ? 'alert' : undefined}
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border p-lg',
          overdue ? 'border-danger' : 'border-border',
          className
        )}
        style={toneGroundStyle(ud.tone)}
        {...rest}
      >
        <div className="flex items-start gap-md">
          <span aria-hidden="true" className={cn('text-xl', toneInkClass(ud.tone))}>
            {ud.glyph}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-on-card">{ud.label}</h3>
            <p className="text-sm text-muted-text">{spokenLine([dateLine, graceLine])}</p>
            {amount != null ? (
              <p className="mt-xs flex items-baseline gap-xs">
                <span className="text-xs text-muted-text">{amountDueLabel}</span>
                <span className={cn('text-lg font-bold text-on-card', TABULAR_CLASS)}>
                  {amount.text}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        {onRenew != null ? (
          <ButtonV4
            variant={overdue ? 'danger' : 'primary'}
            onClick={onRenew}
            disabled={loading}
            aria-busy={loading || undefined}
            className={MIN_TAP_CLASS}
          >
            {loading ? <SpinnerV4 size="sm" className="mr-xs" /> : null}
            {renewLabel}
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);
