import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { Badge } from '../primitives';
import { toBadgeTone } from './_tokens';
import type { PetHealthLogProps, HealthLogKind } from './PetHealthLog';

/** Drop-in for {@link PetHealthLogProps} — same props, the V4 "companion" design. */
export type PetHealthLogV4Props = PetHealthLogProps;

interface KindMeta {
  glyph: string;
  label: string;
  tone: 'danger' | 'primary' | 'accent' | 'warn' | 'neutral';
}

const KIND_META: Record<HealthLogKind, KindMeta> = {
  symptom: { glyph: '🤒', label: 'Symptom', tone: 'danger' },
  observation: { glyph: '👀', label: 'Observation', tone: 'primary' },
  medication: { glyph: '💊', label: 'Medication', tone: 'accent' },
  diet: { glyph: '🍽️', label: 'Diet', tone: 'warn' },
  incident: { glyph: '⚠️', label: 'Incident', tone: 'danger' },
  note: { glyph: '📝', label: 'Note', tone: 'neutral' },
};

const CONTAINER =
  'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md';

/**
 * PetHealthLog — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a pet-health log: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface) wrapping a list of entry rows. Each entry
 * is a soft-primary tinted well holding the kind glyph, a labelled kind Badge, the
 * text, and a muted timestamp. Kind is conveyed by glyph + labelled Badge (never
 * color alone). Preserves the `loading` skeleton and the shared {@link EmptyState}.
 * Same props/behavior as {@link PetHealthLogProps}. All colors from `--xen-*`
 * token classes (no literals).
 */
export const PetHealthLogV4 = React.forwardRef<HTMLDivElement, PetHealthLogV4Props>(function PetHealthLogV4(
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
      <div className="flex flex-col gap-[var(--xen-space-sm)]">
        {entries.map((entry, i) => {
          const meta = KIND_META[entry.kind] ?? KIND_META.note;
          return (
            <div
              key={entry.id ?? i}
              aria-label={`${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`}
              className="flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base"
                aria-hidden="true"
              >
                {meta.glyph}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
                  <Badge tone={toBadgeTone(meta.tone)} variant="soft">
                    {meta.label}
                  </Badge>
                  {entry.timestamp ? <span className="text-xs text-muted">{entry.timestamp}</span> : null}
                </div>
                <p className="mt-[var(--xen-space-xs)] text-sm text-on-surface">{entry.text}</p>
                {entry.author ? <p className="text-xs text-muted">— {entry.author}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
