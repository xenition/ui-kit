import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce/money';
import { BADGE_V4, metaLine, spokenLine, TABULAR_CLASS } from './internal/crm-v4';
import { QUOTE_META } from './internal';
import type { QuoteCardProps } from './QuoteCard';

export interface QuoteCardV4Props extends QuoteCardProps {
  /** How the line-item count is spelled. Default `` `${n} item(s)` ``. */
  formatLineItems?: (count: number) => string;
  /** The word in front of the lifecycle status. Default `'Status'`. */
  statusLabel?: string;
}

/**
 * **V4 quote card** — the web twin of the native `QuoteCardV4`, same props as
 * {@link QuoteCard} plus `formatLineItems` and `statusLabel`.
 *
 * ## Four changes
 *
 * 1. **The action is not nested inside the card's activation.** The base
 *    guarded the identical nesting `ContactCard` has with a
 *    `stopPropagation` — which works, and which is a patch over an invalid
 *    tree: interactive content inside a `role="button"`. The card's own
 *    activation is a real `<button>` around the identity block, and the action
 *    is that button's **sibling**, so no event has anywhere to bubble to and
 *    the guard is unnecessary rather than load-bearing.
 * 2. **The status is announced.** On native the label sat on a `View` that was
 *    not an accessibility element, so it was dropped in silence; the badge is
 *    named on both twins now, and `statusLabel` says what the word is *for*.
 * 3. **One accessible name.** `Quote Q-1042` replaced the subtree, so the
 *    total, the item count, the validity date and the status — everything the
 *    card is for — were never announced.
 * 4. **The grand total is tabular, the badge is `BADGE_V4` on both twins, and
 *    a press is a state layer.**
 */
export const QuoteCardV4 = React.forwardRef<HTMLDivElement, QuoteCardV4Props>(function QuoteCardV4(
  {
    number,
    company,
    totalCents,
    currency = 'USD',
    lineItems,
    status,
    validUntil,
    actionLabel,
    onAction,
    formatLineItems,
    statusLabel = 'Status',
    onClick,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  if (!number) return null;

  const meta = QUOTE_META[status];
  const spellItems =
    formatLineItems ?? ((n: number) => `${n} item${n === 1 ? '' : 's'}`);
  const itemsLabel = lineItems != null && lineItems > 0 ? spellItems(lineItems) : undefined;
  const money = formatMoney(totalCents, currency);
  const caption = metaLine([itemsLabel, validUntil]);
  const statusName = `${statusLabel} ${meta.label}`;

  const label = spokenLine([number, company, money, itemsLabel, validUntil, statusName]);

  const body = (
    <>
      <span className="flex items-start justify-between gap-sm">
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="font-bold text-on-surface">{number}</span>
          {company ? <span className="truncate text-sm text-muted-text">{company}</span> : null}
        </span>
        <BadgeV4 {...BADGE_V4} tone={meta.tone} role="img" aria-label={statusName}>
          <span aria-hidden="true">{meta.glyph}</span>
          <span>{meta.label}</span>
        </BadgeV4>
      </span>

      <span className="flex items-end justify-between gap-sm">
        <span className={cn('text-xl font-bold text-on-surface', TABULAR_CLASS)}>{money}</span>
        {caption ? <span className="text-xs text-muted-text">{caption}</span> : null}
      </span>
    </>
  );

  return (
    <Card ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
      {onClick ? (
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
          className={cn(
            'flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            MIN_TAP_CLASS
          )}
        >
          {body}
        </button>
      ) : (
        <div className="flex w-full flex-col gap-sm">{body}</div>
      )}

      {/*
        A sibling of the card's own button, never a descendant — so the action
        does one thing without a `stopPropagation` standing between it and a
        handler that should never have been an ancestor.
      */}
      {actionLabel && onAction ? (
        <ButtonV4 variant="soft" size="sm" onClick={onAction} className={MIN_TAP_CLASS}>
          {actionLabel}
        </ButtonV4>
      ) : null}
    </Card>
  );
});
