import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { toBadgeTone } from './_tokens';
import type { VaccineRecordProps, VaccineStatus } from './VaccineRecord';

/** Drop-in for {@link VaccineRecordProps} — same props, the V4 "companion" design. */
export type VaccineRecordV4Props = VaccineRecordProps;

interface StatusMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger' | 'neutral';
  glyph: string;
}

const STATUS_META: Record<VaccineStatus, StatusMeta> = {
  current: { label: 'Up to date', tone: 'success', glyph: '✓' },
  'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳' },
  overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠' },
  unknown: { label: 'No record', tone: 'neutral', glyph: '?' },
};

/**
 * VaccineRecord — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an immunization line item: an elevated rounded card with
 * a soft shadow, the status glyph in a soft-primary tinted well, a bold vaccine
 * name, a labelled status Badge, the given/next-due dates and vet/lot meta shown
 * as small soft-primary chips, and a rounded "Book booster" CTA for anything not
 * current. Same props/behavior as {@link VaccineRecordProps}; every `status`
 * reads via a glyph + labelled Badge (never color alone). All colors from
 * `--xen-*` token classes (no literals).
 */
export const VaccineRecordV4 = React.forwardRef<HTMLDivElement, VaccineRecordV4Props>(function VaccineRecordV4(
  { name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, className },
  ref
) {
  const meta = STATUS_META[status];
  const showRenew = onRenew != null && status !== 'current';
  const footer = [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ');

  return (
    <div
      ref={ref}
      aria-label={`${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl"
        >
          {meta.glyph}
        </span>
        <p className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{name}</p>
        <Badge tone={toBadgeTone(meta.tone)} variant="soft">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </div>

      {administered || nextDue ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {administered ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface">
              Given · {administered}
            </span>
          ) : null}
          {nextDue ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface">
              Next due · {nextDue}
            </span>
          ) : null}
        </div>
      ) : null}

      {footer ? <p className="text-xs text-muted">{footer}</p> : null}

      {showRenew ? (
        <Button variant={status === 'overdue' ? 'danger' : 'outline'} size="sm" className="self-start" onClick={onRenew}>
          {renewLabel}
        </Button>
      ) : null}
    </div>
  );
});
