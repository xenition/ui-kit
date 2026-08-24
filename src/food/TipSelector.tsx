import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { MoneyFormatter } from '../commerce';

export interface TipSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Selectable tip percentages (default `[10, 15, 20, 25]`). */
  percents?: number[];
  /** Currently selected percentage, or `null` for "no tip". */
  selectedPercent?: number | null;
  /** Fired with the chosen percentage (or `null` when "No tip" is picked). */
  onSelect?: (percent: number | null) => void;
  /**
   * Order subtotal in integer cents. When provided, each option shows the
   * computed tip amount under its percentage.
   */
  subtotalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Group heading (default `Add a tip`). */
  title?: string;
  /** Include a "No tip" option (default `true`). */
  allowNone?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

const DEFAULT_PERCENTS = [10, 15, 20, 25];

/**
 * A row of tip-percentage options rendered as a radio-style segmented control.
 * Each option is a real `<button role="radio">` (keyboard native) that shows
 * its percentage and, when `subtotalCents` is given, the computed amount. The
 * selected option fills with the `primary` token pair and carries
 * `aria-checked` so selection is not signalled by color alone. An optional
 * leading "No tip" option emits `null`. Web parity of the native `TipSelector`;
 * token-only.
 */
export const TipSelector = React.forwardRef<HTMLDivElement, TipSelectorProps>(function TipSelector(
  {
    percents = DEFAULT_PERCENTS,
    selectedPercent,
    onSelect,
    subtotalCents,
    currency = 'USD',
    title = 'Add a tip',
    allowNone = true,
    formatMoney = defaultFormat,
    className,
    ...rest
  },
  ref
) {
  type Choice = { key: string; percent: number | null; label: string };
  const choices: Choice[] = [
    ...(allowNone ? [{ key: 'none', percent: null as number | null, label: 'No tip' }] : []),
    ...percents.map((p) => ({ key: String(p), percent: p as number | null, label: `${p}%` })),
  ];

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {title ? <h4 className="font-heading text-base font-semibold text-on-surface">{title}</h4> : null}
      <div role="radiogroup" aria-label={title} className="flex gap-[var(--xen-space-sm)]">
        {choices.map((choice) => {
          const selected =
            choice.percent === null
              ? selectedPercent === null || selectedPercent === undefined
              : selectedPercent === choice.percent;
          const amount =
            choice.percent !== null && typeof subtotalCents === 'number'
              ? Math.round((subtotalCents * choice.percent) / 100)
              : null;

          return (
            <button
              key={choice.key}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={amount !== null ? `${choice.label}, ${formatMoney(amount, currency)}` : choice.label}
              onClick={() => onSelect?.(choice.percent)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)] transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-neutral-100'
              )}
            >
              <span className="text-sm font-bold">{choice.label}</span>
              {amount !== null ? (
                <span className={cn('text-xs tabular-nums', selected ? 'text-on-primary' : 'text-muted')}>
                  {formatMoney(amount, currency)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
});
