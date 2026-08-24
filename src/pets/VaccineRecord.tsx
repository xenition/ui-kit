import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { SLOT_BORDER_L, type PetSlot } from './_tokens';

export type VaccineStatus = 'current' | 'due-soon' | 'overdue' | 'unknown';

interface StatusMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger' | 'neutral';
  glyph: string;
  slot: PetSlot;
}

const STATUS_META: Record<VaccineStatus, StatusMeta> = {
  current: { label: 'Up to date', tone: 'success', glyph: '✓', slot: 'success' },
  'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳', slot: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠', slot: 'danger' },
  unknown: { label: 'No record', tone: 'neutral', glyph: '?', slot: 'muted' },
};

export interface VaccineRecordProps {
  /** Vaccine name, e.g. "Rabies". */
  name: string;
  /** Where the record stands. Drives the status chip + accent. */
  status: VaccineStatus;
  /** Date administered (already formatted). */
  administered?: string;
  /** Next-due date (already formatted). */
  nextDue?: string;
  /** Administering vet / clinic. */
  administeredBy?: string;
  /** Batch / lot number. */
  lotNumber?: string;
  /** Label for the renew action; hidden when no `onRenew`. */
  renewLabel?: string;
  onRenew?: () => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * a glyph + text label (never color alone). Token-only colors.
 */
export const VaccineRecord = React.forwardRef<HTMLDivElement, VaccineRecordProps>(function VaccineRecord(
  { name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, className },
  ref
) {
  const meta = STATUS_META[status];
  const showRenew = onRenew != null && status !== 'current';

  return (
    <div
      ref={ref}
      aria-label={`${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]',
        SLOT_BORDER_L[meta.slot],
        className
      )}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <p className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{name}</p>
        <Badge tone={meta.tone}>{`${meta.glyph} ${meta.label}`}</Badge>
      </div>

      {administered || nextDue ? (
        <div className="flex gap-[var(--xen-space-xl)]">
          {administered ? (
            <div>
              <p className="text-xs text-muted">Given</p>
              <p className="text-sm text-on-surface">{administered}</p>
            </div>
          ) : null}
          {nextDue ? (
            <div>
              <p className="text-xs text-muted">Next due</p>
              <p className="text-sm text-on-surface">{nextDue}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {administeredBy || lotNumber ? (
        <p className="text-xs text-muted">
          {[administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ')}
        </p>
      ) : null}

      {showRenew ? (
        <Button variant={status === 'overdue' ? 'danger' : 'outline'} size="sm" className="self-start" onClick={onRenew}>
          {renewLabel}
        </Button>
      ) : null}
    </div>
  );
});
