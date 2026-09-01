import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  varianceMeta,
  TONE_TEXT,
  TONE_SOFT_BG,
  CASH_MOVEMENT_META,
  type CashMovementKind,
  type PosTone,
} from './internal';
import type { CashDrawerRowProps } from './CashDrawerRow';

/** Drop-in for {@link CashDrawerRowProps} — same props, the V4 "register" design. */
export type CashDrawerRowV4Props = CashDrawerRowProps;

/** Signed money movements — in (+) versus out (−). */
const SIGN: Partial<Record<CashMovementKind, '+' | '-'>> = {
  sale: '+',
  payIn: '+',
  refund: '-',
  payOut: '-',
};

/**
 * CashDrawerRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a cash-movement row: the kind glyph rides in a
 * **soft-tint disc**, the label + optional detail sit beside it, and the **signed
 * amount is big and bold** in `tabular-nums` — money in reads `success`, money
 * out reads `danger` by sign, always shown with `+`/`−`. For `kind="variance"`,
 * pass `expectedCents` + counted `amountCents` for an over/short/balanced
 * **glyph + word** pill and a signed delta (state by text, never color alone).
 * When `onClick` is set the row is a keyboard-operable `role="button"`. Same
 * props/behavior as {@link CashDrawerRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const CashDrawerRowV4 = React.forwardRef<HTMLDivElement, CashDrawerRowV4Props>(
  function CashDrawerRowV4(
    {
      kind,
      label,
      amountCents,
      currency = 'USD',
      expectedCents,
      detail,
      variant = 'default',
      testID,
      onClick,
      onKeyDown,
      className,
      ...rest
    },
    ref
  ) {
    const meta = CASH_MOVEMENT_META[kind];
    const isTotal = variant === 'total';
    const interactive = typeof onClick === 'function';

    const isVariance = kind === 'variance' && typeof expectedCents === 'number';
    const variance = isVariance
      ? varianceMeta(safeCents(expectedCents), safeCents(amountCents))
      : null;

    const sign = SIGN[kind];
    const displayCents = variance ? variance.deltaCents : safeCents(amountCents);

    // Amount color: variance → its tone; signed in → success, out → danger.
    const amountTone: PosTone = variance
      ? variance.meta.tone
      : sign === '+'
        ? 'success'
        : sign === '-'
          ? 'danger'
          : 'neutral';
    const amountColor = amountTone === 'neutral' ? 'text-on-surface' : TONE_TEXT[amountTone];

    // Disc tint follows the movement's own tone.
    const discTint = TONE_SOFT_BG[meta.tone];
    const discGlyphColor = TONE_TEXT[meta.tone];

    const prefix = variance
      ? variance.deltaCents > 0
        ? '+'
        : variance.deltaCents < 0
          ? '−'
          : ''
      : sign === '+'
        ? '+'
        : sign === '-'
          ? '−'
          : '';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      onKeyDown?.(e);
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        (onClick as (ev: React.SyntheticEvent) => void)(e);
      }
    };

    return (
      <div
        ref={ref}
        data-xen-cash-drawer-row=""
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={
          interactive
            ? `${label ?? meta.label}, ${formatMoney(Math.abs(displayCents), currency)}`
            : undefined
        }
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)] transition-colors',
          isTotal ? 'mt-[var(--xen-space-xs)] border-t border-border' : '',
          interactive
            ? 'cursor-pointer hover:bg-neutral-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)]">
          <span
            aria-hidden="true"
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base',
              discTint,
              discGlyphColor
            )}
          >
            {meta.glyph}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-[var(--xen-space-xs)]">
              <span
                className={cn(
                  'truncate text-sm text-on-surface',
                  isTotal ? 'font-bold' : 'font-semibold'
                )}
              >
                {label ?? meta.label}
              </span>
              {variance ? <StatusPill meta={variance.meta} variant="inline" size="sm" /> : null}
            </div>
            {detail ? <span className="truncate text-xs text-muted">{detail}</span> : null}
          </div>
        </div>

        <span
          className={cn(
            'tabular-nums',
            isTotal ? 'text-lg' : 'text-base',
            'font-extrabold',
            amountColor
          )}
        >
          {prefix}
          {formatMoney(Math.abs(displayCents), currency)}
        </span>
      </div>
    );
  }
);
