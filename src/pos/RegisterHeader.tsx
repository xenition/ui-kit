import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatMoney } from './internal';

export interface RegisterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Store / location name — the primary line. */
  storeName: string;
  /** Register / terminal label, e.g. `"Register 2"`. Shown next to the store name when set. */
  registerLabel?: string;
  /** Cashier on the terminal. Shown as a subline when set. */
  cashierName?: string;
  /** Whether the shift/drawer is open — drives the frosted status pill (`Shift open` vs `Shift closed`). */
  shiftOpen?: boolean;
  /** Current open-order total, in integer **cents** — the near-white running total. Shown when set. */
  runningTotalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Fires on the menu / overflow action. Shown only when set. */
  onMenu?: () => void;
  /** Fires on the shift action (open/close/manage). The status pill becomes a button when set. */
  onShift?: () => void;
}

/**
 * RegisterHeader — the POS V4 "register" **terminal header** (web parity of the
 * native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the store name + `registerLabel`, the `cashierName` subline, a frosted
 * shift-status pill (open/closed by word, not color alone), and the **near-white
 * running total** of the open order (integer cents via `formatMoney`). An optional
 * menu button sits top-right; the shift pill becomes a button when `onShift` is
 * set. Every color derives from the brand ramp via `--xen-*` classes + gradient
 * utilities — no literals, light + dark safe.
 */
export const RegisterHeader = React.forwardRef<HTMLDivElement, RegisterHeaderProps>(function RegisterHeader(
  {
    storeName,
    registerLabel,
    cashierName,
    shiftOpen,
    runningTotalCents,
    currency = 'USD',
    onMenu,
    onShift,
    className,
    ...rest
  },
  ref
) {
  const hasShift = typeof shiftOpen === 'boolean';
  const shiftText = shiftOpen ? 'Shift open' : 'Shift closed';
  const shiftGlyph = shiftOpen ? '●' : '○';
  const total = typeof runningTotalCents === 'number' ? Math.max(0, Math.trunc(runningTotalCents)) : undefined;

  const shiftPillContent = (
    <>
      <span aria-hidden="true" className="text-sm font-extrabold text-primary-50">
        {shiftGlyph}
      </span>
      <span className="text-sm font-bold text-primary-50">{shiftText}</span>
    </>
  );

  const pillClass =
    'flex min-h-[44px] items-center gap-[var(--xen-space-xs)] self-start rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]';

  return (
    <div
      ref={ref}
      data-xen-register-header=""
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span className="truncate text-lg font-extrabold text-primary-50">{storeName}</span>
            {registerLabel ? (
              <span className="whitespace-nowrap rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-primary-50">
                {registerLabel}
              </span>
            ) : null}
          </div>
          {cashierName ? <p className="mt-0.5 truncate text-sm text-primary-100">{cashierName}</p> : null}
        </div>

        {onMenu ? (
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⋯" size="lg" className="text-primary-50" />
          </button>
        ) : null}
      </div>

      {hasShift ? (
        <div className="mt-[var(--xen-space-md)]">
          {onShift ? (
            <button type="button" aria-label={`${shiftText}. Manage shift`} onClick={onShift} className={cn(pillClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300')}>
              {shiftPillContent}
            </button>
          ) : (
            <span role="status" aria-label={shiftText} className={pillClass}>
              {shiftPillContent}
            </span>
          )}
        </div>
      ) : null}

      {typeof total === 'number' ? (
        <div className="mt-[var(--xen-space-lg)]">
          <span className="text-sm font-semibold text-primary-100">Open order</span>
          <p
            aria-label={`Running total ${formatMoney(total, currency)}`}
            className="text-3xl font-extrabold tabular-nums tracking-tight text-primary-50"
          >
            {formatMoney(total, currency)}
          </p>
        </div>
      ) : null}
    </div>
  );
});
