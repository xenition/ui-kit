import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { MoneyAmount } from './MoneyAmount';
import { pressableProps } from './internal/pressable';
import type { TransactionRowProps } from './TransactionRow';

/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV3Props = TransactionRowProps;

/** Token-bound fill for the leading status dot, per semantic slot. */
const DOT_BG: Record<IconColor, string> = {
  onSurface: 'bg-on-surface',
  onPrimary: 'bg-primary',
  primary: 'bg-primary',
  muted: 'bg-muted',
  success: 'bg-success',
  onSuccess: 'bg-success',
  warn: 'bg-warn',
  onWarn: 'bg-warn',
  danger: 'bg-danger',
  onDanger: 'bg-danger',
};

/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status dot (or the bare glyph) leads, the title and a middot-joined subtitle /
 * date share one flexible line, and the signed amount hugs the right edge. No
 * avatar disc, no card — tuned for long, scannable feeds. Distinct at a glance
 * from the base/v2. Same props, integer-cents money, token-pure.
 */
export const TransactionRowV3 = React.forwardRef<HTMLDivElement, TransactionRowV3Props>(
  function TransactionRowV3(
    { title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest },
    ref
  ) {
    const signedCents = direction
      ? direction === 'expense'
        ? -Math.abs(amountCents)
        : Math.abs(amountCents)
      : amountCents;
    const meta = [subtitle, date].filter((s): s is string => s != null).join(' · ');
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? title : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
          className
        )}
        {...interactive}
        {...rest}
      >
        {icon != null ? (
          <Icon glyph={icon} color={iconColor} size="sm" />
        ) : (
          <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-[var(--xen-radius-full)]', DOT_BG[iconColor])} />
        )}
        <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]">
          <span className="truncate text-sm font-semibold text-on-surface">{title}</span>
          {meta !== '' ? <span className="min-w-0 flex-1 truncate text-xs text-muted">{meta}</span> : null}
        </div>
        <MoneyAmount
          cents={signedCents}
          currency={currency}
          tone={direction ?? 'auto'}
          size="sm"
          signDisplay="always"
        />
      </div>
    );
  }
);
