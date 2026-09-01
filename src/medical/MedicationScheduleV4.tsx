import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox } from '../primitives/Checkbox';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { TEXT_TONE, type MedicalTone } from './internal';
import type { MedicationScheduleProps, MedicationDose } from './MedicationSchedule';

/** Drop-in for {@link MedicationScheduleProps} — same props, the V4 "clinic" design. */
export type MedicationScheduleV4Props = MedicationScheduleProps;

/** Per-dose status → glyph + label + token tone (never color alone). */
type DoseStatus = 'taken' | 'missed' | 'pending';
const STATUS_META: Record<DoseStatus, { glyph: string; label: string; tone: MedicalTone }> = {
  taken: { glyph: '✓', label: 'Taken', tone: 'success' },
  missed: { glyph: '⚠', label: 'Missed', tone: 'warn' },
  pending: { glyph: '○', label: 'Pending', tone: 'muted' },
};

/**
 * MedicationSchedule — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a daily schedule: an elevated rounded card with a soft
 * shadow wrapping a timeline of doses. Each dose row shows a big legible
 * tabular-nums time, the drug + dose text, a labelled status marker (glyph +
 * label + token tone, never color alone), and a taken checkbox affordance
 * (`role="checkbox"`, keyboard-activatable, ≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty (`EmptyState`) states. Identical props/behavior to
 * {@link MedicationScheduleProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export const MedicationScheduleV4 = React.forwardRef<HTMLDivElement, MedicationScheduleV4Props>(
  function MedicationScheduleV4(
    { doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', className, ...rest },
    ref
  ) {
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const header = title ? <span className="text-sm font-bold text-on-surface">{title}</span> : null;

    let body: React.ReactNode;
    if (loading) {
      body = (
        <div aria-label="Loading schedule" aria-busy="true" className="flex flex-col gap-[var(--xen-space-sm)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[52px] rounded-[var(--xen-radius-md)] bg-neutral-100" />
          ))}
        </div>
      );
    } else if (doses.length === 0) {
      body = <EmptyState data-xen-medication-empty="" title={emptyLabel} />;
    } else {
      body = (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {doses.map((d) => {
            const taken = d.taken ?? false;
            const missed = !taken && (d.missed ?? false);
            const status: DoseStatus = taken ? 'taken' : missed ? 'missed' : 'pending';
            const meta = STATUS_META[status];
            const interactive = !!onToggleTaken;
            const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${meta.label}`;
            const toggle = interactive ? () => onToggleTaken?.(d.id, !taken) : undefined;
            return (
              <div
                key={d.id}
                data-xen-medication-dose=""
                role={interactive ? 'checkbox' : undefined}
                aria-checked={interactive ? taken : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={a11y}
                onClick={toggle}
                onKeyDown={
                  interactive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggle?.();
                        }
                      }
                    : undefined
                }
                className={cn(
                  'flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
                  taken ? 'bg-primary/10' : 'bg-transparent',
                  interactive && 'cursor-pointer transition-opacity hover:opacity-80'
                )}
              >
                <div className="flex w-[52px] shrink-0 justify-center">
                  <span className="text-base font-bold tabular-nums text-on-surface">{d.time}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span
                    className={cn(
                      'truncate text-base font-semibold',
                      taken ? 'text-muted line-through' : 'text-on-surface'
                    )}
                  >
                    {d.name}
                    {d.dose ? <span className="font-medium text-muted">  {d.dose}</span> : null}
                  </span>
                  <span className={cn('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', TEXT_TONE[meta.tone])}>
                    <Icon glyph={meta.glyph} size="xs" />
                    {meta.label}
                  </span>
                </div>
                <Checkbox
                  checked={taken}
                  aria-label={taken ? 'Mark as not taken' : 'Mark as taken'}
                  tabIndex={-1}
                  className="h-6 w-6"
                  onChange={interactive ? (e) => onToggleTaken?.(d.id, e.target.checked) : undefined}
                />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-medication-schedule=""
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className)}
        {...rest}
      >
        {header}
        {body}
      </div>
    );
  }
);
