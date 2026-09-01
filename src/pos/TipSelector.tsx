import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from './internal';

/**
 * Props for {@link TipSelector} — a big-target tip-percentage picker for the
 * register. Presentational only: the caller owns the selection state and
 * receives callbacks. Amounts are computed from `subtotalCents` (integer
 * **cents**) for display; the selected value is echoed back via callbacks.
 */
export interface TipSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Base amount the tip percentage is applied to, in integer **cents**. */
  subtotalCents: number;
  /** ISO 4217 currency code for the computed amounts. Defaults to `'USD'`. */
  currency?: string;
  /** Preset tip percentages to offer. Defaults to `[15, 18, 20]`. */
  percents?: readonly number[];
  /** Currently selected preset percentage, or `null` for none/custom/no-tip. */
  selectedPercent?: number | null;
  /**
   * Explicit custom tip amount in integer **cents**, or `null` when no custom
   * tip is set. When non-null, the Custom option is shown as selected.
   */
  customCents?: number | null;
  /** Fired with the chosen preset percentage when a preset is pressed. */
  onSelectPercent?: (percent: number) => void;
  /** Fired when the "No tip" option is pressed. */
  onNoTip?: () => void;
  /**
   * Fired when the "Custom" option is pressed. When omitted, the Custom option
   * is not rendered.
   */
  onCustom?: () => void;
  /** Optional test id forwarded to the root element. */
  testID?: string;
}

/** Compute a tip amount (integer cents) from a subtotal and a percentage. */
function tipCentsFor(subtotalCents: number, percent: number): number {
  return Math.round((subtotalCents * percent) / 100);
}

interface OptionProps {
  selected: boolean;
  onClick?: () => void;
  ariaLabel: string;
  top: React.ReactNode;
  bottom?: React.ReactNode;
}

function TipOption({ selected, onClick, ariaLabel, top, bottom }: OptionProps): React.ReactElement {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5',
        'rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)] transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        selected
          ? 'border-primary bg-primary text-on-primary shadow-md'
          : 'border-border bg-surface text-on-surface hover:bg-primary-50 active:scale-[0.98]'
      )}
    >
      <span className="text-base font-extrabold tabular-nums">{top}</span>
      {bottom != null ? (
        <span className={cn('text-xs tabular-nums', selected ? 'text-on-primary' : 'text-muted')}>
          {bottom}
        </span>
      ) : null}
    </button>
  );
}

/**
 * TipSelector — **V4** "register" design. A `radiogroup` of big (≥44px) tip
 * options: each preset shows the **% bold** and the computed amount
 * (`subtotal × pct / 100`) in `tabular-nums` below, plus a "No tip" and an
 * optional "Custom" option. The selected option fills **solid primary** with
 * on-primary ink; the rest stay calm on `surface` with a soft-primary hover.
 * Presentational only — selection is driven by props and reported via
 * callbacks. All colors from `--xen-*` token classes (no literals), dark-mode
 * safe.
 */
export const TipSelector = React.forwardRef<HTMLDivElement, TipSelectorProps>(function TipSelector(
  {
    subtotalCents,
    currency = 'USD',
    percents = [15, 18, 20],
    selectedPercent,
    customCents,
    onSelectPercent,
    onNoTip,
    onCustom,
    testID,
    className,
    ...rest
  },
  ref
) {
  const customSelected = typeof customCents === 'number' && customCents != null;
  const noTipSelected = (selectedPercent === null || selectedPercent === undefined) && !customSelected;

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label="Tip amount"
      data-xen-tip-selector=""
      data-testid={testID}
      className={cn('flex flex-wrap gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <TipOption
        selected={noTipSelected}
        onClick={onNoTip}
        ariaLabel="No tip"
        top="No tip"
      />

      {percents.map((pct) => {
        const amount = tipCentsFor(subtotalCents, pct);
        const selected = selectedPercent === pct && !customSelected;
        return (
          <TipOption
            key={pct}
            selected={selected}
            onClick={() => onSelectPercent?.(pct)}
            ariaLabel={`Tip ${pct}%, ${formatMoney(amount, currency)}`}
            top={`${pct}%`}
            bottom={formatMoney(amount, currency)}
          />
        );
      })}

      {onCustom ? (
        <TipOption
          selected={customSelected}
          onClick={onCustom}
          ariaLabel={
            customSelected
              ? `Custom tip, ${formatMoney(customCents as number, currency)}`
              : 'Custom tip'
          }
          top="Custom"
          bottom={customSelected ? formatMoney(customCents as number, currency) : undefined}
        />
      ) : null}
    </div>
  );
});
