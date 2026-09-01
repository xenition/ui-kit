import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { toBadgeTone } from './_tokens';
import type { GroomingCardProps, GroomingService, GroomingStatus } from './GroomingCard';

/** V4 layout choices for the "companion" design. */
export type GroomingCardLayout = 'card' | 'compact';

/** Drop-in for {@link GroomingCardProps} — same props, the V4 "companion" design. */
export interface GroomingCardV4Props extends GroomingCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: GroomingCardLayout;
}

const SERVICE_META: Record<GroomingService, { glyph: string; label: string }> = {
  bath: { glyph: '🛁', label: 'Bath' },
  haircut: { glyph: '✂️', label: 'Haircut' },
  nails: { glyph: '💅', label: 'Nail trim' },
  teeth: { glyph: '🦷', label: 'Teeth cleaning' },
  deshedding: { glyph: '🧹', label: 'De-shedding' },
  full: { glyph: '🐩', label: 'Full groom' },
};

const STATUS_META: Record<GroomingStatus, { label: string; tone: 'primary' | 'warn' | 'danger' | 'success' }> = {
  scheduled: { label: 'Scheduled', tone: 'primary' },
  due: { label: 'Due', tone: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger' },
  done: { label: 'Done', tone: 'success' },
};

/**
 * GroomingCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a grooming service: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the service glyph in a soft-primary
 * tinted well, a bold service name, a muted groomer line, a labelled status Badge,
 * and the last/next dates shown as soft-primary chips beside a rounded book CTA.
 * "Book" stays for anything not yet done. Same props/behavior as
 * {@link GroomingCardProps}; service + status both read via glyph + labelled chip
 * (never color alone). All colors from `--xen-*` token classes (no literals).
 */
export const GroomingCardV4 = React.forwardRef<HTMLDivElement, GroomingCardV4Props>(function GroomingCardV4(
  { service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, className, variant = 'card' },
  ref
) {
  const meta = SERVICE_META[service];
  const statusMeta = STATUS_META[status];
  const showBook = onBook != null && status !== 'done';
  const a11y = `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`;

  const glyphWell = (size: string) => (
    <span
      className={cn('flex shrink-0 items-center justify-center rounded-full bg-primary/10', size)}
      aria-hidden="true"
    >
      {meta.glyph}
    </span>
  );

  const statusBadge = (
    <Badge tone={toBadgeTone(statusMeta.tone)} variant="soft">
      {statusMeta.label}
    </Badge>
  );

  // ── compact ───────────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn(
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md',
          className
        )}
      >
        {glyphWell('h-9 w-9 text-lg')}
        <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]">
          <p className="truncate text-sm font-bold text-on-surface">{meta.label}</p>
          {groomer ? <p className="truncate text-xs text-muted">✂️ {groomer}</p> : null}
        </div>
        {statusBadge}
        {price ? (
          <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface">
            {price}
          </span>
        ) : null}
      </div>
    );
  }

  // ── card (default) ─────────────────────────────────────────────────────────
  return (
    <div
      ref={ref}
      aria-label={a11y}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {glyphWell('h-11 w-11 text-xl')}
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{meta.label}</p>
          {groomer ? <p className="truncate text-sm text-muted">✂️ {groomer}</p> : null}
        </div>
        {statusBadge}
      </div>

      {lastDone || nextDue ? (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {lastDone ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface">
              Last · {lastDone}
            </span>
          ) : null}
          {nextDue ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface">
              Next · {nextDue}
            </span>
          ) : null}
        </div>
      ) : null}

      {showBook ? (
        <div className="mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]">
          {price ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface">
              {price}
            </span>
          ) : (
            <span />
          )}
          <Button variant="primary" size="sm" onClick={onBook}>
            {bookLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
});
