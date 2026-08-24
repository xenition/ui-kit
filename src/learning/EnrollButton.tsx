import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

/** Enrollment lifecycle. */
export type EnrollState = 'idle' | 'enrolling' | 'enrolled' | 'full';

export interface EnrollButtonProps {
  /** Current enrollment state. */
  state?: EnrollState;
  /** CTA label when idle (default "Enroll now"). */
  label?: string;
  /** Optional price shown next to the button label. */
  price?: string;
  /** Fires when an idle button is clicked. */
  onEnroll?: () => void;
  /** Full-width layout. */
  block?: boolean;
  className?: string;
}

/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a success confirmation (not pressable), `full` → a
 * disabled "Class full". Announces the current state. Token-only colors
 * (`--xen-*`).
 */
export function EnrollButton({
  state = 'idle',
  label = 'Enroll now',
  price,
  onEnroll,
  block = true,
  className,
}: EnrollButtonProps): React.ReactElement {
  const container = cn('flex flex-col gap-1', block ? 'self-stretch' : 'self-start', className);

  if (state === 'enrolled') {
    return (
      <div aria-label="Enrolled" className={container}>
        <div className="flex items-center justify-center gap-1 rounded-[var(--xen-radius-md)] bg-success px-4 py-2.5">
          <span aria-hidden="true" className="text-base font-bold text-on-success">
            ✓
          </span>
          <span className="text-sm font-bold text-on-success">Enrolled</span>
        </div>
      </div>
    );
  }

  if (state === 'full') {
    return (
      <div className={container}>
        <Button variant="secondary" disabled className={block ? 'w-full' : undefined}>
          Class full
        </Button>
      </div>
    );
  }

  const enrolling = state === 'enrolling';

  return (
    <div className={container}>
      <Button
        variant="primary"
        disabled={enrolling}
        onClick={onEnroll}
        aria-label={enrolling ? 'Enrolling' : label}
        aria-busy={enrolling || undefined}
        className={block ? 'w-full' : undefined}
      >
        {enrolling ? 'Enrolling…' : price ? `${label} · ${price}` : label}
      </Button>
    </div>
  );
}
