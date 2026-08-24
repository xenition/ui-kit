import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { SLOT_BORDER, SLOT_TEXT, type PetSlot } from './_tokens';

export type HealthLogKind = 'symptom' | 'observation' | 'medication' | 'diet' | 'incident' | 'note';

interface KindMeta {
  glyph: string;
  label: string;
  slot: PetSlot;
}

const KIND_META: Record<HealthLogKind, KindMeta> = {
  symptom: { glyph: '🤒', label: 'Symptom', slot: 'danger' },
  observation: { glyph: '👀', label: 'Observation', slot: 'primary' },
  medication: { glyph: '💊', label: 'Medication', slot: 'accent' },
  diet: { glyph: '🍽️', label: 'Diet', slot: 'warn' },
  incident: { glyph: '⚠️', label: 'Incident', slot: 'danger' },
  note: { glyph: '📝', label: 'Note', slot: 'muted' },
};

export interface HealthLogEntry {
  id?: string | number;
  /** Entry category; drives the icon + accent. */
  kind: HealthLogKind;
  /** What happened. */
  text: string;
  /** When it was logged (already formatted). */
  timestamp?: string;
  /** Who logged it. */
  author?: string;
}

export interface PetHealthLogProps {
  /** Chronological log entries (newest first is conventional). */
  entries: HealthLogEntry[];
  /** Optional section title. */
  title?: string;
  /** Show a skeleton while data loads. */
  loading?: boolean;
  /** Copy shown when there are no entries. */
  emptyLabel?: string;
  /** Extra classes on the root. */
  className?: string;
}

const CONTAINER =
  'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]';

/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state (shared {@link EmptyState}). Kind is conveyed by icon + label text,
 * not color alone. Token-only colors.
 */
export const PetHealthLog = React.forwardRef<HTMLDivElement, PetHealthLogProps>(function PetHealthLog(
  { entries, title, loading = false, emptyLabel = 'No health entries yet', className },
  ref
) {
  const heading = title ? <p className="text-base font-bold text-on-surface">{title}</p> : null;

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading health log" aria-busy="true" className={cn(CONTAINER, className)}>
        {heading}
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3.5 rounded-[var(--xen-radius-sm)] bg-border" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        ref={ref}
        aria-label={emptyLabel}
        icon={<span className="text-2xl">📋</span>}
        title={title ?? 'Health log'}
        description={emptyLabel}
        className={className}
      />
    );
  }

  return (
    <div ref={ref} className={cn(CONTAINER, className)}>
      {heading}
      <div className="flex flex-col gap-[var(--xen-space-md)]">
        {entries.map((entry, i) => {
          const meta = KIND_META[entry.kind] ?? KIND_META.note;
          const last = i === entries.length - 1;
          return (
            <div
              key={entry.id ?? i}
              aria-label={`${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`}
              className="flex gap-[var(--xen-space-sm)]"
            >
              <div className="flex flex-col items-center">
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border text-sm', SLOT_BORDER[meta.slot])}>
                  <span aria-hidden="true">{meta.glyph}</span>
                </span>
                {!last ? <span className="mt-0.5 w-px flex-1 bg-border" /> : null}
              </div>
              <div className={cn('min-w-0 flex-1', last ? '' : 'pb-[var(--xen-space-sm)]')}>
                <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
                  <span className={cn('text-xs font-bold uppercase', SLOT_TEXT[meta.slot])}>{meta.label}</span>
                  {entry.timestamp ? <span className="text-xs text-muted">{entry.timestamp}</span> : null}
                </div>
                <p className="text-sm text-on-surface">{entry.text}</p>
                {entry.author ? <p className="text-xs text-muted">— {entry.author}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
