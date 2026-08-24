import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

export interface MedicationDose {
  /** Stable identifier returned through `onToggleTaken`. */
  id: string;
  /** Medication name, e.g. "Metformin". */
  name: string;
  /** Dose text, e.g. "500 mg". */
  dose?: string;
  /** Scheduled time label, e.g. "08:00". */
  time: string;
  /** Whether this dose has been taken. */
  taken?: boolean;
  /** Marks the dose as missed/overdue (past its time, not taken). */
  missed?: boolean;
}

export interface MedicationScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Doses to render, in display order. */
  doses: MedicationDose[];
  /** Optional list heading. */
  title?: string;
  /** Fires with the dose id and its next taken state. */
  onToggleTaken?: (id: string, nextTaken: boolean) => void;
  /** Skeleton placeholder while the schedule loads. */
  loading?: boolean;
  /** Message shown when there are no doses. */
  emptyLabel?: string;
}

/**
 * A daily medication schedule — the web mirror of the native
 * `MedicationSchedule`. A timeline of doses, each with its time, drug, dose
 * text, and a taken checkbox (`role="checkbox"`, keyboard-activatable). A
 * missed/overdue dose is flagged with a glyph + label + warn color, never color
 * alone. Renders loading and empty (`EmptyState`) states. Token-only colors.
 * Informational UI only — not a medical device.
 */
export const MedicationSchedule = React.forwardRef<HTMLDivElement, MedicationScheduleProps>(
  function MedicationSchedule(
    { doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', className, ...rest },
    ref
  ) {
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
        <div>
          {doses.map((d) => {
            const taken = d.taken ?? false;
            const missed = !taken && (d.missed ?? false);
            const interactive = !!onToggleTaken;
            const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${
              taken ? 'taken' : missed ? 'missed' : 'not taken'
            }`;
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
                  'flex min-h-[52px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
                  interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80'
                )}
              >
                <div className="flex w-[52px] justify-center">
                  <span className="text-sm font-bold text-on-surface">{d.time}</span>
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
                  {missed ? (
                    <span className="inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold text-warn">
                      <span aria-hidden="true">⚠</span>
                      Missed
                    </span>
                  ) : null}
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-xs font-bold',
                    taken ? 'border-success bg-success text-on-success' : 'border-border bg-surface'
                  )}
                >
                  {taken ? '✓' : ''}
                </span>
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
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        {header}
        {body}
      </div>
    );
  }
);
