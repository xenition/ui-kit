import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  varianceMeta,
  TONE_TEXT,
  CASH_MOVEMENT_META,
  type CashMovementKind,
  type PosTone,
} from './internal';

export type CashDrawerRowVariant = 'default' | 'total';

export interface CashDrawerRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Movement kind — drives the glyph + default label. */
  kind: CashMovementKind;
  /** Override the default movement label. */
  label?: string;
  /** Amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /**
   * For `kind="variance"`: the expected amount to compare `amountCents`
   * (counted) against — resolves an over/short/balanced pill and signed delta.
   */
  expectedCents?: number;
  /** Optional muted sub-line (e.g. count of transactions). */
  detail?: string;
  /** `total` renders emphasized (bold, top rule) for a subtotal/expected line. */
  variant?: CashDrawerRowVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

const SIGN: Partial<Record<CashMovementKind, '+' | '-'>> = {
  sale: '+',
  payIn: '+',
  refund: '-',
  payOut: '-',
};

/**
 * One row of a cash-drawer count / register audit — the DOM parity of the native
 * `CashDrawerRow`: opening float, cash sales, pay-ins/outs, expected, counted,
 * and the variance. Money is integer **cents** via `formatMoney`, with in/out
 * movements signed. For `kind="variance"`, pass `expectedCents` and the counted
 * `amountCents` to draw an over/short/balanced **glyph + word** pill and a signed
 * delta — state by text, never color alone. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
export const CashDrawerRow = React.forwardRef<HTMLDivElement, CashDrawerRowProps>(
  function CashDrawerRow(
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
    const amountTone: PosTone = variance ? variance.meta.tone : 'neutral';
    const amountColor = variance ? TONE_TEXT[amountTone] : 'text-on-surface';
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
          'flex items-center justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          isTotal ? 'border-t border-border' : '',
          interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span aria-hidden="true" className="text-sm text-muted">
              {meta.glyph}
            </span>
            <span
              className={cn(
                'truncate text-sm text-on-surface',
                isTotal ? 'font-bold' : 'font-medium'
              )}
            >
              {label ?? meta.label}
            </span>
            {variance ? <StatusPill meta={variance.meta} variant="inline" size="sm" /> : null}
          </div>
          {detail ? <span className="truncate text-xs text-muted">{detail}</span> : null}
        </div>

        <span
          className={cn(
            'tabular-nums',
            isTotal ? 'text-base' : 'text-sm',
            isTotal || variance ? 'font-bold' : 'font-medium',
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
