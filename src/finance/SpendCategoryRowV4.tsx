import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import { TONE_BG } from '../primitives/internal/tone-v4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../commerce/money';
import { spokenLine, TABULAR_CLASS } from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { SpendCategoryRowProps } from './SpendCategoryRow';

/** The V4 row takes exactly the base's props. */
export interface SpendCategoryRowV4Props extends SpendCategoryRowProps {}

/** The words after the share figure, visible and spoken. */
const SHARE_LABEL = 'of spend';

/**
 * **V4 spend-category row** — the web twin of the native
 * `SpendCategoryRowV4`, same props as {@link SpendCategoryRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the money.** `aria-label={category}` on a
 *    `role="button"` root prunes the subtree, so a reader heard "Groceries,
 *    button" and neither the amount nor the share — the two numbers the row is
 *    made of. The name is now the category, the share and the figure.
 * 2. **It is a real `<button>`**, not the module's `role="button"`-on-a-`div`
 *    helper with a hand-written Enter/Space handler.
 * 3. **Press is a state layer and focus is `ring-ring`.** There was no press
 *    feedback at all, and the focus ring was `ring-primary-300` — a ramp step,
 *    which keeps its light-mode orientation under `[data-theme="dark"]`.
 * 4. **It joins the shared row family**, so a category, a transaction and a
 *    settings row are one height and one set of gutters, and the row clears 44
 *    whether or not the optional glyph is there.
 * 5. **The captions take `muted-text`**, the contrast-corrected slot, where
 *    the base used `muted` — a ramp step with no contrast promise — as an ink.
 */
export const SpendCategoryRowV4 = React.forwardRef<HTMLDivElement, SpendCategoryRowV4Props>(
  function SpendCategoryRowV4(
    {
      category,
      amountCents,
      currency = 'USD',
      share,
      icon,
      color = 'primary',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const clampedShare =
      typeof share === 'number' && Number.isFinite(share)
        ? Math.min(Math.max(share, 0), 1)
        : undefined;
    const percent = clampedShare != null ? Math.round(clampedShare * 100) : undefined;
    const percentText =
      percent != null ? `${new Intl.NumberFormat().format(percent)}%` : undefined;

    // `Icon` has no `accent` slot; the glyph falls back to `primary` while the
    // bar keeps the requested colour — the base's own compromise.
    const iconColor: IconColor = color === 'accent' ? 'primary' : color;

    const money = formatMoney(
      Number.isFinite(amountCents) ? Math.trunc(amountCents) : 0,
      currency
    );
    const label = spokenLine([
      category,
      percentText != null ? `${percentText} ${SHARE_LABEL}` : undefined,
      money,
    ]);

    const body = (
      <>
        {icon != null ? (
          <span className={ROW_V4_LEADING_CLASS} aria-hidden="true">
            <Icon glyph={icon} color={iconColor} size="xl" />
          </span>
        ) : null}

        <span className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-baseline justify-between gap-sm">
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">
              {category}
            </span>
            {percentText != null ? (
              <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{percentText}</span>
            ) : null}
          </span>
          {clampedShare != null ? (
            <span
              role="progressbar"
              aria-label={spokenLine([category, `${percentText} ${SHARE_LABEL}`])}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="block h-sm w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-selected"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-full rounded-[var(--xen-radius-full)]',
                  TONE_BG[color]
                )}
                style={{ width: `${clampedShare * 100}%` }}
              />
            </span>
          ) : null}
        </span>

        <span className={ROW_V4_TRAILING_CLASS}>
          <MoneyAmountV4 cents={amountCents} currency={currency} tone="neutral" size="sm" />
        </span>
      </>
    );

    return (
      <div ref={ref} className={cn('flex w-full', className)} {...rest}>
        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-row=""
            data-interactive="true"
            data-xen-v4-state=""
            style={rowStateVars('var(--xen-surface)', 'var(--xen-on-surface)')}
            className={cn(
              ROW_V4_BASE_CLASS,
              rowHeightClass(clampedShare != null),
              'rounded-[var(--xen-radius-md)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div
            data-xen-v4-row=""
            className={cn(ROW_V4_BASE_CLASS, rowHeightClass(clampedShare != null))}
          >
            {body}
          </div>
        )}
      </div>
    );
  }
);
