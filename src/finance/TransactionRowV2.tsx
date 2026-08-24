import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { MoneyAmount } from './MoneyAmount';
import { pressableProps } from './internal/pressable';
import type { TransactionRowProps } from './TransactionRow';

/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV2Props = TransactionRowProps;

/** Token-bound tint for the leading glyph tile, per semantic slot. */
const TILE_BG: Record<IconColor, string> = {
  onSurface: 'bg-neutral-100',
  onPrimary: 'bg-primary/10',
  primary: 'bg-primary/10',
  muted: 'bg-muted/10',
  success: 'bg-success/10',
  onSuccess: 'bg-success/10',
  warn: 'bg-warn/10',
  onWarn: 'bg-warn/10',
  danger: 'bg-danger/10',
  onDanger: 'bg-danger/10',
};

/**
 * TransactionRow, redesigned (v2): an elevated **card row**. The category glyph
 * sits in a rounded, tinted tile on the left; the title stacks over a subtitle;
 * and the signed {@link MoneyAmount} is rendered large and bold on the right
 * over its date. Distinct at a glance from the base's borderless avatar-disc
 * row. Same props, integer-cents money, token-pure throughout.
 */
export const TransactionRowV2 = React.forwardRef<HTMLDivElement, TransactionRowV2Props>(
  function TransactionRowV2(
    { title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest },
    ref
  ) {
    const signedCents = direction
      ? direction === 'expense'
        ? -Math.abs(amountCents)
        : Math.abs(amountCents)
      : amountCents;
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? title : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
            TILE_BG[iconColor]
          )}
        >
          <Icon glyph={icon ?? '•'} color={iconColor} size="lg" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{title}</span>
          {subtitle != null ? <span className="truncate text-sm text-muted">{subtitle}</span> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <MoneyAmount
            cents={signedCents}
            currency={currency}
            tone={direction ?? 'auto'}
            size="lg"
            signDisplay="always"
          />
          {date != null ? <span className="text-xs text-muted">{date}</span> : null}
        </div>
      </div>
    );
  }
);
