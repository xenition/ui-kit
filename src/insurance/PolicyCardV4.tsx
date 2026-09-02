import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { formatMoney as defaultFormatMoney } from './internal/format';
import { policyVariant } from './internal/status';
import { isAdverse } from './coverage-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  moneyParts,
  NEGATIVE_AMOUNT_LABEL,
  POLICY_STATUS_META_V4,
  spokenLine,
  TABULAR_CLASS,
  toneGroundStyle,
  toneInkClass,
} from './internal/tone-v4';
import type { PolicyCardProps, PremiumCadence } from './PolicyCard';

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

/** The four words the card puts in front of its figures. */
export interface PolicyCardV4Labels {
  /** Before the named insured. Default `'Insured'`. */
  insured?: string;
  /** Over the coverage figure. Default `'Coverage'`. */
  coverage?: string;
  /** Over the premium figure. Default `'Premium'`. */
  premium?: string;
  /** Before the renewal date. Default `'Renews'`. */
  renews?: string;
}

export interface PolicyCardV4Props extends PolicyCardProps {
  /**
   * Why the policy is lapsed or cancelled.
   *
   * `lapsed` and `cancelled` are decisions the holder has to act on and the
   * card had no field to carry the reason, so the screen said "✕ Cancelled"
   * over a coverage figure that is no longer real and stopped there.
   */
  statusReason?: string;
  /** When the status took effect, already formatted by the caller. */
  statusDate?: string;
  /** The words the card prints before its own figures. */
  labels?: PolicyCardV4Labels;
}

/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels`.
 *
 * ## Six changes
 *
 * 1. **A cancelled policy can say why, and when.** The base carried `status`
 *    and nothing else, so "✕ Cancelled" sat above a live-looking $250,000
 *    coverage figure with no reason, no effective date and no next step. The
 *    holder could not tell a non-payment lapse from a mid-term cancellation,
 *    and the largest number on the card was one they were no longer entitled
 *    to. An adverse status now renders the caller's sentence and its date, and
 *    the coverage figure is captioned as no longer in force.
 * 2. **The card announces its own money.** `aria-label` sat on the element
 *    that also contained the coverage, the premium and the renewal date —
 *    ARIA replaces an element's contents with its name, so the card announced
 *    "Premier Auto, Auto policy, Active" and **no amount at all**. Coverage,
 *    premium and renewal are folded into the name, joined with commas.
 * 3. **`coverageCents={-1}` no longer prints "$0.00".** Every figure in the
 *    module was clamped with `Math.max(0, …)`, so a sentinel or a bad fetch
 *    was indistinguishable from a policy that genuinely covers nothing. A
 *    below-zero amount is printed as it is and captioned.
 * 4. **The card is not a `div` pretending to be a button.** `pressableProps`
 *    gave it `role="button"`, `tabIndex` and a hand-written Enter/Space
 *    handler — three approximations of a `<button>`, and the handler is the
 *    one that steals keydowns from anything nested inside it. The activation
 *    is a real `<button>` wrapping the identity and the figures; the status
 *    pill is its **sibling**.
 * 5. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*, so a
 *    hovered card and a dead one looked alike.
 * 6. **Every word is a prop and focus is `ring-ring`.** "Insured",
 *    "Coverage", "Premium" and "Renews" were hard-coded English, and the focus
 *    ring was `ring-primary-300` — a ramp step that ignores the seed and
 *    mirrors under `[data-theme="dark"]`.
 */
export const PolicyCardV4 = React.forwardRef<HTMLDivElement, PolicyCardV4Props>(
  function PolicyCardV4(
    {
      variant,
      name,
      policyNumber,
      coverageCents,
      premiumCents,
      cadence = 'monthly',
      status = 'active',
      holder,
      renewalDate,
      currency = 'USD',
      formatMoney: format = defaultFormatMoney,
      statusReason,
      statusDate,
      labels,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    if (!name) return null;

    const vd = policyVariant(variant);
    const sd = POLICY_STATUS_META_V4[status] ?? POLICY_STATUS_META_V4.active;
    const interactive = onClick != null;
    const adverse = isAdverse(status);

    const insuredLabel = labels?.insured ?? 'Insured';
    const coverageLabel = labels?.coverage ?? 'Coverage';
    const premiumLabel = labels?.premium ?? 'Premium';
    const renewsLabel = labels?.renews ?? 'Renews';

    const coverage = moneyParts(coverageCents, currency, format);
    const premium = moneyParts(premiumCents, currency, format);

    const figures = (
      <div className="flex items-end justify-between border-t border-border pt-md">
        <span className="flex flex-col gap-xs">
          <span className="text-xs text-muted-text">{coverageLabel}</span>
          <span className={cn('text-xl font-bold text-on-card', TABULAR_CLASS)}>
            {coverage?.text ?? '—'}
          </span>
          {coverage?.negative ? (
            <span className="text-xs font-semibold text-danger-text">{NEGATIVE_AMOUNT_LABEL}</span>
          ) : null}
        </span>
        {premium ? (
          <span className="flex flex-col items-end gap-xs">
            <span className="text-xs text-muted-text">{premiumLabel}</span>
            <span className="flex items-baseline gap-xs">
              <span className={cn('text-base font-bold text-primary-text', TABULAR_CLASS)}>
                {premium.text}
              </span>
              <span className="text-xs font-normal text-muted-text">{CADENCE_SUFFIX[cadence]}</span>
            </span>
          </span>
        ) : null}
      </div>
    );

    const body = (
      <>
        <div className="flex items-center gap-md">
          <span
            aria-hidden="true"
            className={cn(
              'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
              'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'text-xl'
            )}
            style={toneGroundStyle('primary')}
          >
            {vd.glyph}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate text-lg font-bold text-on-card">{name}</span>
            <span className="truncate text-sm text-muted-text">
              {vd.label} · {policyNumber}
            </span>
          </span>
        </div>

        {holder != null ? (
          <p className="text-xs text-muted-text">
            {insuredLabel}: {holder}
          </p>
        ) : null}

        {figures}

        {renewalDate != null ? (
          <p className="text-xs text-muted-text">
            {renewsLabel} {renewalDate}
          </p>
        ) : null}
      </>
    );

    // Everything the reader would otherwise lose: ARIA drops the children of a
    // named element, and the children here are the whole point of the card.
    const spoken = spokenLine([
      name,
      `${vd.label} policy`,
      policyNumber,
      sd.label,
      statusDate,
      statusReason,
      holder != null ? `${insuredLabel} ${holder}` : undefined,
      coverage ? `${coverageLabel} ${coverage.text}` : undefined,
      coverage?.negative ? NEGATIVE_AMOUNT_LABEL : undefined,
      premium ? `${premiumLabel} ${premium.text} ${CADENCE_SUFFIX[cadence]}` : undefined,
      renewalDate != null ? `${renewsLabel} ${renewalDate}` : undefined,
    ]);

    return (
      <CardV4 ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        <div className="flex items-start gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spoken}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 flex-col gap-sm rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {body}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 flex-col gap-sm">{body}</div>
          )}

          {/*
            A sibling of the activation, never a descendant — and hidden from
            the reader when the activation already says the word, so the status
            is announced once rather than twice.
          */}
          <span
            aria-hidden={interactive || undefined}
            className={cn(
              'inline-flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-semibold',
              toneInkClass(sd.tone)
            )}
            style={toneGroundStyle(sd.tone)}
          >
            <span aria-hidden="true">{sd.glyph}</span>
            {sd.label}
          </span>
        </div>

        {adverse && (statusReason != null || statusDate != null) ? (
          <p className="text-xs font-semibold text-danger-text">
            {[statusDate, statusReason].filter((part) => part != null && part !== '').join(' · ')}
          </p>
        ) : null}
      </CardV4>
    );
  }
);
