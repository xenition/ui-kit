import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatMoney } from '../commerce/money';
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
import { signParts, spokenLine } from './internal/ledger-v4';
import { MoneyAmountV4 } from './MoneyAmountV4';
import type { TransactionRowProps } from './TransactionRow';

/** The V4 row takes exactly the base's props. */
export interface TransactionRowV4Props extends TransactionRowProps {}

/**
 * **V4 transaction row** — the web twin of the native `TransactionRowV4`, same
 * props as {@link TransactionRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the amount.** The base put `aria-label={title}`
 *    on a `role="button"` root, and `button` is children-presentational — so a
 *    reader browsing a statement heard "Whole Foods, button" and never learned
 *    it was −$84.12. The name is now the whole line: merchant, category,
 *    date, then the direction word and the figure.
 * 2. **It is a real `<button>`.** The base used the module's `pressable`
 *    helper — `role="button"` plus `tabIndex` plus a hand-written Enter/Space
 *    handler on a `div`, which is three approximations of what a button
 *    already does, and it made every row a tab stop even before it made one a
 *    button.
 * 3. **Press is a state layer, and focus is the shared ring.** The base had no
 *    press feedback at all and rang itself in `ring-primary-300`, a ramp step
 *    that inverts under `[data-theme="dark"]` while `--xen-ring` is `primary`
 *    already corrected to 3:1 against the page.
 * 4. **It joins the shared row family** — one height, one 44 leading slot, one
 *    set of gutters — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`. The row clears 44 whether or not it has an icon; the
 *    base's height came entirely from the optional avatar, so an iconless feed
 *    drew 32px rows.
 * 5. **The supporting line and the date take `muted-text`**, the
 *    contrast-corrected slot, where the base used `muted` — a ramp step with
 *    no contrast promise — as an ink.
 */
export const TransactionRowV4 = React.forwardRef<HTMLDivElement, TransactionRowV4Props>(
  function TransactionRowV4(
    {
      title,
      subtitle,
      amountCents,
      currency = 'USD',
      direction,
      date,
      icon,
      iconColor = 'primary',
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

    const signedCents = direction
      ? direction === 'expense'
        ? -Math.abs(amountCents)
        : Math.abs(amountCents)
      : amountCents;
    const safeCents = Number.isFinite(signedCents) ? Math.trunc(signedCents) : 0;

    // The direction word and the figure the button's name has to carry — the
    // payload `aria-label={title}` was pruning.
    const parts = signParts(safeCents, direction);
    const label = spokenLine([
      title,
      subtitle,
      date,
      parts.word,
      formatMoney(Math.abs(safeCents), currency),
    ]);

    const body = (
      <>
        {icon != null ? (
          <span className={ROW_V4_LEADING_CLASS} aria-hidden="true">
            <span className="flex h-full w-full items-center justify-center rounded-[var(--xen-radius-full)] border border-border bg-surface">
              <Icon glyph={icon} color={iconColor} size="lg" />
            </span>
          </span>
        ) : null}
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-surface">{title}</span>
          {subtitle != null ? (
            <span className="truncate text-sm text-muted-text">{subtitle}</span>
          ) : null}
        </span>
        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <MoneyAmountV4
            cents={safeCents}
            currency={currency}
            tone={direction ?? 'auto'}
            size="md"
            signDisplay="always"
          />
          {date != null ? <span className="text-xs text-muted-text">{date}</span> : null}
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
              rowHeightClass(subtitle != null),
              'rounded-[var(--xen-radius-md)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div
            data-xen-v4-row=""
            className={cn(ROW_V4_BASE_CLASS, rowHeightClass(subtitle != null))}
          >
            {body}
          </div>
        )}
      </div>
    );
  }
);
