import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { SLOT_BORDER, SLOT_BORDER_L, SLOT_TEXT, type PetSlot } from './_tokens';

export type MedicationForm = 'pill' | 'liquid' | 'injection' | 'topical' | 'drops' | 'chew';
export type MedicationState = 'due' | 'upcoming' | 'taken' | 'missed';

const FORM_GLYPH: Record<MedicationForm, string> = {
  pill: '💊',
  liquid: '🧪',
  injection: '💉',
  topical: '🧴',
  drops: '💧',
  chew: '🦴',
};

const STATE_META: Record<MedicationState, { label: string; tone: 'warn' | 'primary' | 'success' | 'danger'; slot: PetSlot }> = {
  due: { label: 'Due now', tone: 'warn', slot: 'warn' },
  upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
  taken: { label: 'Taken', tone: 'success', slot: 'success' },
  missed: { label: 'Missed', tone: 'danger', slot: 'danger' },
};

export interface MedicationReminderProps {
  /** Medication name, e.g. "Apoquel". */
  name: string;
  /** Dosage, e.g. "5 mg". */
  dosage?: string;
  /** Form; drives the icon. */
  form?: MedicationForm;
  /** Frequency label, e.g. "Twice daily". */
  frequency?: string;
  /** Next dose time (already formatted). */
  nextDose?: string;
  /** Reminder state; drives the chip + accent. */
  state: MedicationState;
  /** Doses remaining in the course. */
  dosesLeft?: number;
  /** Label for the mark-taken action; hidden once taken or no handler. */
  markLabel?: string;
  onMarkTaken?: () => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * real "Mark taken" `<button>`. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
export const MedicationReminder = React.forwardRef<HTMLDivElement, MedicationReminderProps>(
  function MedicationReminder(
    { name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, className },
    ref
  ) {
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        aria-label={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]',
          SLOT_BORDER_L[stateMeta.slot],
          className
        )}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="text-xl" aria-hidden="true">
            {FORM_GLYPH[form]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{title}</p>
            {frequency ? <p className="text-xs text-muted">{frequency}</p> : null}
          </div>
          <Badge tone={stateMeta.tone}>{stateMeta.label}</Badge>
        </div>

        {nextDose || dosesLeft != null ? (
          <div className="flex items-center justify-between">
            {nextDose ? <p className="text-sm text-on-surface">⏰ {nextDose}</p> : <span />}
            {dosesLeft != null ? (
              <p className="text-xs text-muted">
                {dosesLeft} dose{dosesLeft === 1 ? '' : 's'} left
              </p>
            ) : null}
          </div>
        ) : null}

        {showMark ? (
          <button
            type="button"
            aria-label={`${markLabel}: ${name}`}
            onClick={onMarkTaken}
            className={cn(
              'inline-flex self-start items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-transparent px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold',
              SLOT_BORDER[stateMeta.slot],
              SLOT_TEXT[stateMeta.slot]
            )}
          >
            ✓ {markLabel}
          </button>
        ) : null}
      </div>
    );
  }
);
