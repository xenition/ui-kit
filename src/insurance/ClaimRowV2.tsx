import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { formatMoney } from './internal/format';
import { claimStatus } from './internal/status';
import { pressableProps } from './internal/pressable';
import type { ClaimRowProps } from './ClaimRow';

/** Same public contract as {@link ClaimRow} — a drop-in alternate design. */
export type ClaimRowV2Props = ClaimRowProps;

/** Happy-path stage labels the timeline chip walks through (denied is off-path). */
const STAGES = ['Filed', 'Review', 'Approved', 'Paid'] as const;

/**
 * ClaimRow, redesigned (**V2**) — an **elevated card** carrying a compact status
 * **timeline chip**: a row of stage dots (Filed → Review → Approved → Paid) with
 * the reached stages filled `bg-primary` and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * `Badge`. Status stays glyph + text + color (never color-alone); the amount
 * anchors the top-right. Becomes a keyboard-operable button only when `onClick`
 * is set. Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export const ClaimRowV2 = React.forwardRef<HTMLDivElement, ClaimRowV2Props>(function ClaimRowV2(
  {
    claimNumber,
    title,
    status,
    amountCents,
    currency = 'USD',
    date,
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = claimStatus(status);
  const denied = status === 'denied';
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      variant="elevated"
      padding="md"
      radius="md"
      aria-label={interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{title}</p>
          <span className="text-xs text-muted">{claimNumber}</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {amountCents != null ? (
            <span className="text-lg font-extrabold text-on-surface">
              {format(Math.max(0, Math.trunc(amountCents)), currency)}
            </span>
          ) : null}
          {date != null ? <span className="text-xs text-muted">{date}</span> : null}
        </div>
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {denied ? (
          <Badge tone="danger" variant="soft" size="sm">
            <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          </Badge>
        ) : (
          <>
            <div className="flex flex-1 items-center gap-[var(--xen-space-xs)]">
              {STAGES.map((stage, i) => {
                const done = i < sd.step;
                const current = i === sd.step;
                const on = done || current;
                return (
                  <div key={stage} className="flex flex-1 items-center">
                    <span
                      aria-label={current ? `${stage}, current stage` : undefined}
                      className={cn(
                        'shrink-0 rounded-full transition-colors',
                        current ? 'h-3 w-3 ring-2 ring-primary-300' : 'h-2 w-2',
                        on ? 'bg-primary' : 'bg-neutral-100'
                      )}
                    />
                    {i < STAGES.length - 1 ? (
                      <span
                        className={cn(
                          'mx-[var(--xen-space-xs)] h-0.5 flex-1 rounded-full',
                          done ? 'bg-primary' : 'bg-neutral-100'
                        )}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-muted">
              <span aria-hidden="true">{sd.glyph}</span> {sd.label}
            </span>
          </>
        )}
      </div>
    </Card>
  );
});
