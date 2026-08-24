import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { SLOT_BORDER_L, type PetSlot } from './_tokens';

export type GroomingService = 'bath' | 'haircut' | 'nails' | 'teeth' | 'deshedding' | 'full';
export type GroomingStatus = 'scheduled' | 'due' | 'overdue' | 'done';

interface ServiceMeta {
  glyph: string;
  label: string;
}

const SERVICE_META: Record<GroomingService, ServiceMeta> = {
  bath: { glyph: '🛁', label: 'Bath' },
  haircut: { glyph: '✂️', label: 'Haircut' },
  nails: { glyph: '💅', label: 'Nail trim' },
  teeth: { glyph: '🦷', label: 'Teeth cleaning' },
  deshedding: { glyph: '🧹', label: 'De-shedding' },
  full: { glyph: '🐩', label: 'Full groom' },
};

const STATUS_META: Record<GroomingStatus, { label: string; tone: 'primary' | 'warn' | 'danger' | 'success'; slot: PetSlot }> = {
  scheduled: { label: 'Scheduled', tone: 'primary', slot: 'primary' },
  due: { label: 'Due', tone: 'warn', slot: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger', slot: 'danger' },
  done: { label: 'Done', tone: 'success', slot: 'success' },
};

export interface GroomingCardProps {
  /** Grooming service; drives icon + label. */
  service: GroomingService;
  /** Where it stands; drives the chip + accent. */
  status: GroomingStatus;
  /** Groomer / salon name. */
  groomer?: string;
  /** Last-done date (already formatted). */
  lastDone?: string;
  /** Next-due date (already formatted). */
  nextDue?: string;
  /** Price label, e.g. "$45". */
  price?: string;
  /** Book action label; hidden when done or no `onBook`. */
  bookLabel?: string;
  onBook?: () => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
export const GroomingCard = React.forwardRef<HTMLDivElement, GroomingCardProps>(function GroomingCard(
  { service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, className },
  ref
) {
  const meta = SERVICE_META[service];
  const statusMeta = STATUS_META[status];
  const showBook = onBook != null && status !== 'done';

  return (
    <div
      ref={ref}
      aria-label={`${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
        SLOT_BORDER_L[statusMeta.slot],
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className="text-xl" aria-hidden="true">
          {meta.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{meta.label}</p>
          {groomer ? <p className="truncate text-sm text-muted">{groomer}</p> : null}
        </div>
        <Badge tone={statusMeta.tone}>{statusMeta.label}</Badge>
      </div>

      {lastDone || nextDue ? (
        <div className="flex gap-[var(--xen-space-xl)]">
          {lastDone ? (
            <div>
              <p className="text-xs text-muted">Last</p>
              <p className="text-sm text-on-surface">{lastDone}</p>
            </div>
          ) : null}
          {nextDue ? (
            <div>
              <p className="text-xs text-muted">Next</p>
              <p className="text-sm text-on-surface">{nextDue}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showBook ? (
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          {price ? <p className="text-base font-bold text-on-surface">{price}</p> : <span />}
          <Button variant="primary" size="sm" onClick={onBook}>
            {bookLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
});
