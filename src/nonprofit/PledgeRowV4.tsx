import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';
import type { PledgeRowProps, PledgeStatus } from './PledgeRow';

/** Drop-in for {@link PledgeRowProps} — same props, the V4 "rally" design. */
export type PledgeRowV4Props = PledgeRowProps;

const STATUS: Record<PledgeStatus, { tone: BadgeTone; label: string; glyph: string }> = {
  pending: { tone: 'warn', label: 'Pending', glyph: '⏳' },
  fulfilled: { tone: 'success', label: 'Fulfilled', glyph: '✅' },
  overdue: { tone: 'danger', label: 'Overdue', glyph: '⚠️' },
  declined: { tone: 'neutral', label: 'Declined', glyph: '🚫' },
};

/**
 * PledgeRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded pledge-ledger row on a clean surface (no gradient): a leading donor
 * avatar in a soft-primary well, a bold donor name with a glyph + labelled
 * status {@link Badge} (never color alone), an optional due-date chip, a
 * trailing bold pledged amount (integer cents → `formatMoney`), and — for
 * still-open (pending/overdue) pledges — a "Mark fulfilled" action that stops
 * propagation so it does not also open the row. When `onClick` is set the whole
 * row is a keyboard-activatable `role="button"`. Identical props/behavior to
 * {@link PledgeRowProps}. All colors from `--xen-*` token classes (no literals).
 */
export const PledgeRowV4 = React.forwardRef<HTMLDivElement, PledgeRowV4Props>(function PledgeRowV4(
  {
    donorName,
    avatarUrl,
    amountCents,
    currency = 'USD',
    status = 'pending',
    dueLabel,
    onFulfill,
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const meta = STATUS[status];
  const open = status === 'pending' || status === 'overdue';
  const label = `${donorName}, ${formatMoney(amountCents, currency)} pledge, ${meta.label}`;

  const container = 'flex items-center gap-md rounded-lg border border-border bg-surface text-on-surface shadow-md px-md py-sm';

  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Avatar name={donorName} src={avatarUrl} size="sm" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        <div className="flex flex-wrap items-center gap-sm">
          <span className="text-base font-bold text-on-surface">{donorName}</span>
          <Badge tone={meta.tone} variant="soft">
            <Icon glyph={meta.glyph} size="xs" aria-hidden />
            {meta.label}
          </Badge>
        </div>
        {dueLabel ? (
          <span className="inline-flex w-fit items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary">
            <Icon glyph="📅" size="xs" aria-hidden />
            {dueLabel}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-xs">
        <span className="text-base font-bold text-on-surface">{formatMoney(amountCents, currency)}</span>
        {open && onFulfill ? (
          <Button
            size="sm"
            variant="secondary"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              onFulfill();
            }}
          >
            Mark fulfilled
          </Button>
        ) : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          container,
          'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} aria-label={label} className={cn(container, className)} {...rest}>
      {inner}
    </div>
  );
});
