import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Badge, Button } from '../primitives';
import { formatMoney } from '../commerce';
import { activate, toneBadgeTone, QUOTE_META, type QuoteStatus } from './internal';

export interface QuoteCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Quote / proposal number (e.g. "Q-1042"). */
  number: string;
  /** Account the quote is for. */
  company?: string;
  /** Grand total in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Number of line items (rendered when > 0). */
  lineItems?: number;
  /** Lifecycle status — glyph + word + tone. */
  status: QuoteStatus;
  /** Pre-formatted validity / expiry date. */
  validUntil?: string;
  /** Optional primary action (e.g. "Send", "Convert"). */
  actionLabel?: string;
  onAction?: () => void;
  /** Click handler for the card body (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph + word
 * carry the status (draft/sent/viewed/accepted/rejected/expired) so it is never
 * color-only. An optional inline action button (`onAction`) drives the next
 * step. When `onClick` is set the card body is a `role="button"` div. All colors
 * are `--xen-*` token classes.
 */
export const QuoteCard = React.forwardRef<HTMLDivElement, QuoteCardProps>(function QuoteCard(
  { number, company, totalCents, currency = 'USD', lineItems, status, validUntil, actionLabel, onAction, onClick, className, ...rest },
  ref
) {
  const meta = QUOTE_META[status];
  const itemsLabel = lineItems != null && lineItems > 0 ? `${lineItems} item${lineItems === 1 ? '' : 's'}` : undefined;
  const interactive = onClick ? activate(onClick) : {};

  return (
    <Card
      ref={ref}
      aria-label={onClick ? `Quote ${number}` : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-on-surface">{number}</p>
          {company ? <p className="truncate text-sm text-muted">{company}</p> : null}
        </div>
        <Badge tone={toneBadgeTone(meta.tone)} aria-label={`Status ${meta.label}`}>
          <span aria-hidden="true">{meta.glyph}</span>
          <span>{meta.label}</span>
        </Badge>
      </div>

      <div className="flex items-end justify-between gap-[var(--xen-space-sm)]">
        <span className="text-xl font-bold text-on-surface">{formatMoney(totalCents, currency)}</span>
        {itemsLabel || validUntil ? (
          <span className="text-xs text-muted">{[itemsLabel, validUntil].filter(Boolean).join(' · ')}</span>
        ) : null}
      </div>

      {actionLabel && onAction ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
        >
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
});
