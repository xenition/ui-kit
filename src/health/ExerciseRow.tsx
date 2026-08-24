import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ExerciseRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Exercise name, e.g. "Bench press". */
  name: string;
  /** Number of sets. */
  sets?: number;
  /** Reps per set. */
  reps?: number;
  /** Load, e.g. "60 kg" or a raw number. */
  weight?: React.ReactNode;
  /** Whether the exercise is completed this session. */
  done?: boolean;
  /** Optional muscle group / meta line. */
  meta?: string;
  /** Fires with the next `done` state when toggled. */
  onToggle?: (next: boolean) => void;
}

/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. Web parity of the native
 * `ExerciseRow`; token-only, `role="checkbox"`.
 */
export const ExerciseRow = React.forwardRef<HTMLDivElement, ExerciseRowProps>(function ExerciseRow(
  { name, sets, reps, weight, done = false, meta, onToggle, className, ...rest },
  ref
) {
  const prescription =
    sets != null && reps != null
      ? `${sets} × ${reps}`
      : sets != null
        ? `${sets} sets`
        : reps != null
          ? `${reps} reps`
          : undefined;
  const detailParts = [prescription, weight != null ? String(weight) : undefined, meta].filter(
    Boolean
  ) as string[];
  const a11y = `${name}${detailParts.length ? `, ${detailParts.join(', ')}` : ''}, ${
    done ? 'done' : 'not done'
  }`;

  const body = (
    <>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            'truncate text-base font-semibold',
            done ? 'text-muted' : 'text-on-surface'
          )}
        >
          {name}
        </span>
        {detailParts.length ? (
          <span className="truncate text-sm text-muted">{detailParts.join('  ·  ')}</span>
        ) : null}
      </span>
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2',
          done ? 'border-success bg-success' : 'border-border bg-surface'
        )}
      >
        {done ? (
          <span aria-hidden="true" className="text-xs font-bold text-on-success">
            ✓
          </span>
        ) : null}
      </span>
    </>
  );

  const rowClass =
    'flex min-h-[52px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]';

  if (!onToggle) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(rowClass, className)} {...rest}>
        {body}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="checkbox"
      aria-checked={done}
      aria-label={a11y}
      tabIndex={0}
      onClick={() => onToggle(!done)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(!done);
        }
      }}
      className={cn(
        rowClass,
        'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
