import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { CartBarProps } from './CartBar';

export interface CartBarV4Props extends CartBarProps {
  /** Copy shown while the cart is settling. Default `'Updating…'`. */
  updatingLabel?: string;
  /** Build the item count's words. Default `'1 item'` / `'3 items'`. */
  formatItemCount?: (count: number) => string;
}

/** "1 items" is the tell that a count was interpolated and never read. */
function defaultCount(count: number): string {
  return count === 1 ? '1 item' : `${count} items`;
}

/**
 * **V4 cart bar** — the web twin of the native `CartBarV4`, same props as
 * {@link CartBar} plus `updatingLabel` and `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **The bar is a real button.** It was a `div` with `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler — three approximations
 *    of what a `<button>` already does, and the one that has to be re-derived
 *    on every card in this module.
 * 2. **The count pill stops using an ink slot as a fill.** It painted
 *    `bg-on-primary text-primary`: `on-primary` is the ink *guaranteed against*
 *    `primary`, not a surface, and nothing promises `primary` is readable on
 *    it. The pill is now a hairline ring in the bar's own ink, which needs no
 *    second guarantee at all.
 * 3. **`formatItemCount` fixes "1 items".**
 * 4. **`updatingLabel` is a prop**, where "Updating…" was an English string
 *    compiled into the component.
 * 5. **Disabled and hover stop fighting.** `opacity-60` and
 *    `hover:opacity-90` shared a node, so an empty or updating bar got
 *    *brighter* under the pointer. Press is the M3 state layer over the bar's
 *    own fill; unavailable is the 0.38 band and a real `disabled`.
 */
export const CartBarV4 = React.forwardRef<HTMLDivElement, CartBarV4Props>(function CartBarV4(
  {
    itemCount,
    totalCents,
    currency = 'USD',
    label = 'View cart',
    onClick,
    variant = 'primary',
    loading = false,
    emptyLabel = 'Your cart is empty',
    updatingLabel = 'Updating…',
    formatItemCount = defaultCount,
    formatMoney = defaultFormat,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const empty = itemCount <= 0;

  if (empty) {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'rounded-[var(--xen-radius-lg)] border border-border bg-card px-lg py-md text-center text-sm text-muted-text',
          className
        )}
        {...rest}
      >
        {emptyLabel}
      </div>
    );
  }

  const accent = variant === 'accent';
  const totalText = formatMoney(totalCents, currency);
  const countText = formatItemCount(itemCount);
  const action = loading ? updatingLabel : label;

  const barClass = cn(
    'flex w-full items-center justify-between gap-md px-lg py-md text-left',
    MIN_TAP_CLASS,
    'rounded-[var(--xen-radius-lg)]',
    accent ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary'
  );

  const barState = stateGroundVars(
    accent ? 'var(--xen-accent)' : 'var(--xen-primary)',
    accent ? 'var(--xen-on-accent)' : 'var(--xen-on-primary)'
  ) as React.CSSProperties;

  const content = (
    <>
      <span className="flex min-w-0 items-center gap-sm">
        <span
          aria-hidden="true"
          className={cn(
            // A ring in the bar's own ink — never `on-primary` as a fill.
            'inline-flex h-lg min-w-lg items-center justify-center rounded-full border border-current px-xs text-xs font-bold',
            TABULAR_CLASS
          )}
        >
          {itemCount}
        </span>
        {/* The pill is a bare digit; the words live beside it for the reader. */}
        <span className="sr-only">{countText}</span>
        <span className="truncate text-base font-semibold">{action}</span>
      </span>
      <span className={cn('shrink-0 text-base font-bold', TABULAR_CLASS)}>{totalText}</span>
    </>
  );

  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} className={cn('flex', className)} {...rest}>
      {interactive ? (
        <button
          type="button"
          // Rule E: `loading` means the handler does not fire, rather than
          // `aria-disabled` alongside a live `onClick`.
          disabled={loading}
          aria-busy={loading || undefined}
          aria-label={spokenLine([action, countText, totalText])}
          onClick={onClick}
          data-xen-v4-state=""
          style={barState}
          className={cn(
            barClass,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            V4_DISABLED_CLASS
          )}
        >
          {content}
        </button>
      ) : (
        // No name of its own: with the count spelled out beside the pill the
        // bar's own text already reads as one line, and a label here would
        // announce the same words twice.
        <div aria-busy={loading || undefined} className={barClass}>
          {content}
        </div>
      )}
    </div>
  );
});
