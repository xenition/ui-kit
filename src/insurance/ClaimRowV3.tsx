import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from './internal/format';
import { claimStatus } from './internal/status';
import { pressableProps } from './internal/pressable';
import type { BadgeTone } from '../primitives/Badge';
import type { ClaimRowProps } from './ClaimRow';

/** Same public contract as {@link ClaimRow} — a drop-in alternate design. */
export type ClaimRowV3Props = ClaimRowProps;

/** Tone → status-dot fill (token utility, never a literal color). */
const DOT_BG: Record<BadgeTone, string> = {
  neutral: 'bg-on-surface',
  muted: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/** Tone → status-label text slot (neutral reads muted, approved success…). */
const LABEL_TEXT: Record<BadgeTone, string> = {
  neutral: 'text-muted',
  muted: 'text-muted',
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

/**
 * ClaimRow, redesigned (**V3**) — a **dense one-liner**. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph + label, then the
 * title and claim number share the line, and the amount + date close it on the
 * right. Status is still glyph + text + color (never color-alone). Tight
 * vertical rhythm packs long claims lists. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `ClaimRowProps`; drops in for `ClaimRow`.
 * Token-pure.
 */
export const ClaimRowV3 = React.forwardRef<HTMLDivElement, ClaimRowV3Props>(function ClaimRowV3(
  {
    claimNumber,
    title,
    status,
    amountCents,
    currency = 'USD',
    date,
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = claimStatus(status);
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn('h-2 w-2 shrink-0 rounded-full', DOT_BG[sd.tone])}
      />
      <span className={cn('shrink-0 text-xs font-semibold', LABEL_TEXT[sd.tone])}>
        <span aria-hidden="true">{sd.glyph}</span> {sd.label}
      </span>
      <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]">
        <span className="min-w-0 shrink truncate text-sm font-semibold text-on-surface">{title}</span>
        <span className="shrink-0 text-xs text-muted">{claimNumber}</span>
      </div>
      <div className="flex shrink-0 items-baseline gap-[var(--xen-space-xs)]">
        {amountCents != null ? (
          <span className="text-sm font-bold text-on-surface">
            {format(Math.max(0, Math.trunc(amountCents)), currency)}
          </span>
        ) : null}
        {date != null ? <span className="text-xs text-muted">{date}</span> : null}
      </div>
    </div>
  );
});
