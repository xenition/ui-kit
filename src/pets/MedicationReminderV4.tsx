import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { toBadgeTone } from './_tokens';
import type { MedicationReminderProps, MedicationForm, MedicationState } from './MedicationReminder';

/** V4 layout choices for the "companion" design. */
export type MedicationReminderLayout = 'card' | 'compact';

/** Drop-in for {@link MedicationReminderProps} — same props, the V4 "companion" design. */
export interface MedicationReminderV4Props extends MedicationReminderProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: MedicationReminderLayout;
}

const FORM_GLYPH: Record<MedicationForm, string> = {
  pill: '💊',
  liquid: '🧪',
  injection: '💉',
  topical: '🧴',
  drops: '💧',
  chew: '🦴',
};

const STATE_META: Record<MedicationState, { label: string; tone: 'warn' | 'primary' | 'success' | 'danger' }> = {
  due: { label: 'Due now', tone: 'warn' },
  upcoming: { label: 'Upcoming', tone: 'primary' },
  taken: { label: 'Taken', tone: 'success' },
  missed: { label: 'Missed', tone: 'danger' },
};

/**
 * MedicationReminder — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a dose reminder: an elevated rounded card with a
 * soft shadow, the form glyph in a soft-primary tinted well, a bold title with
 * muted dose/frequency meta, a labelled state Badge, the next-dose time and
 * doses-left rendered as small soft-primary chips, and a rounded "Mark taken"
 * CTA. Same props/behavior as {@link MedicationReminderProps}; every `form` and
 * `state` reads via a glyph + labelled Badge/chip (never color alone). All colors
 * from `--xen-*` token classes (no literals). The `onMarkTaken` action is
 * preserved as a real `<button>` that stops propagation so it stays independent
 * of any wrapping click target.
 */
export const MedicationReminderV4 = React.forwardRef<HTMLDivElement, MedicationReminderV4Props>(
  function MedicationReminderV4(
    { name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, className, variant = 'card' },
    ref
  ) {
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');

    // ── compact ───────────────────────────────────────────────────────────────
    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          aria-label={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
          className={cn(
            'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md',
            className
          )}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg"
          >
            {FORM_GLYPH[form]}
          </span>
          <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]">
            <p className="truncate text-sm font-bold text-on-surface">{name}</p>
            {dosage ? <p className="truncate text-xs text-muted">{dosage}</p> : null}
          </div>
          <Badge tone={toBadgeTone(stateMeta.tone)} variant="soft">
            {stateMeta.label}
          </Badge>
          {showMark ? (
            <button
              type="button"
              aria-label={`${markLabel}: ${name}`}
              onClick={(e) => {
                e.stopPropagation();
                onMarkTaken?.();
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary bg-primary/10 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              ✓
            </button>
          ) : null}
        </div>
      );
    }

    // ── card (default) ──────────────────────────────────────────────────────────
    return (
      <div
        ref={ref}
        aria-label={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
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
            {FORM_GLYPH[form]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{title}</p>
            {frequency ? <p className="text-xs text-muted">{frequency}</p> : null}
          </div>
          <Badge tone={toBadgeTone(stateMeta.tone)} variant="soft">
            {stateMeta.label}
          </Badge>
        </div>

        {nextDose || dosesLeft != null ? (
          <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
            {nextDose ? (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface">
                ⏰ {nextDose}
              </span>
            ) : null}
            {dosesLeft != null ? (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-on-surface">
                {dosesLeft} dose{dosesLeft === 1 ? '' : 's'} left
              </span>
            ) : null}
          </div>
        ) : null}

        {showMark ? (
          <button
            type="button"
            aria-label={`${markLabel}: ${name}`}
            onClick={(e) => {
              e.stopPropagation();
              onMarkTaken?.();
            }}
            className="inline-flex min-h-[44px] self-start items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            ✓ {markLabel}
          </button>
        ) : null}
      </div>
    );
  }
);
