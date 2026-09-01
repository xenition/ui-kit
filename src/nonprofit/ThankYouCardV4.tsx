import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Icon } from '../primitives';
import { formatMoney } from './internal';
import type { ThankYouCardProps } from './ThankYouCard';

/** Drop-in for {@link ThankYouCardProps} — same props, the V4 "rally" design. */
export type ThankYouCardV4Props = ThankYouCardProps;

/**
 * ThankYouCard — **V4** "rally" design (web parity of the native V4). The
 * post-donation confirmation card and the ONE reserved gradient moment of the
 * nonprofit "rally" line: a celebratory glyph, a thank-you headline (optionally
 * naming the donor), the gift amount in integer cents, a mission message, an
 * optional concrete impact chip, and share / receipt actions. Honors both
 * `variant`s and is prop-identical to {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: an elevated
 *   `bg-gradient-to-br from-primary-500 to-primary-700` ground with near-white
 *   `text-primary-50`/`text-primary-100` ink and frosted
 *   (`bg-primary-50/15 border-primary-50/30`) amount / impact tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient):
 *   `rounded-lg border border-border bg-surface shadow-md`, with the amount as a
 *   soft-primary chip.
 *
 * All colors come from `--xen-*` token classes (`primary`/`accent`/`neutral`
 * ramps) — no literal colors.
 */
export const ThankYouCardV4 = React.forwardRef<HTMLDivElement, ThankYouCardV4Props>(
  function ThankYouCardV4(
    {
      donorName,
      amountCents,
      currency = 'USD',
      headline,
      message,
      impactLabel,
      variant = 'default',
      onShare,
      onViewReceipt,
      className,
      ...rest
    },
    ref
  ) {
    const celebratory = variant === 'celebratory';
    const resolvedHeadline =
      headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
    const hasAmount = typeof amountCents === 'number';

    return (
      <div
        ref={ref}
        role="group"
        aria-label={resolvedHeadline}
        className={cn(
          'flex flex-col items-center gap-sm rounded-lg p-lg text-center shadow-md',
          celebratory
            ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50'
            : 'border border-border bg-surface text-on-surface',
          className
        )}
        {...rest}
      >
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-full',
            celebratory
              ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
              : 'bg-success text-on-success'
          )}
        >
          <Icon glyph={celebratory ? '💝' : '🎉'} size="xl" aria-hidden="true" />
        </span>

        <span
          className={cn(
            'text-xl font-extrabold',
            celebratory ? 'text-primary-50' : 'text-on-surface'
          )}
        >
          {resolvedHeadline}
        </span>

        {hasAmount ? (
          celebratory ? (
            <span className="rounded-full border border-primary-50/30 bg-primary-50/15 px-md py-xs text-2xl font-extrabold text-primary-50">
              {formatMoney(amountCents as number, currency)}
            </span>
          ) : (
            <span className="rounded-full bg-primary-50 px-md py-xs text-2xl font-extrabold text-primary">
              {formatMoney(amountCents as number, currency)}
            </span>
          )
        ) : null}

        {message ? (
          <span className={cn('text-sm', celebratory ? 'text-primary-100' : 'text-muted')}>
            {message}
          </span>
        ) : null}

        {impactLabel ? (
          <span
            className={cn(
              'inline-flex items-center gap-xs rounded-full px-md py-xs text-sm font-semibold',
              celebratory
                ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                : 'bg-success text-on-success'
            )}
          >
            <Icon glyph="🌱" size="sm" aria-hidden="true" />
            {impactLabel}
          </span>
        ) : null}

        {onShare || onViewReceipt ? (
          <div className="mt-xs flex gap-sm">
            {onShare ? (
              <Button variant="primary" onClick={onShare}>
                Share
              </Button>
            ) : null}
            {onViewReceipt ? (
              <Button variant="outline" onClick={onViewReceipt}>
                View receipt
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
