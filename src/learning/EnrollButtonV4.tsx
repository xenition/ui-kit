import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { EnrollButtonProps } from './EnrollButton';

/** Drop-in for {@link EnrollButtonProps} — same props, the V4 "campus" design. */
export type EnrollButtonV4Props = EnrollButtonProps;

/**
 * EnrollButton — **V4** "campus" design (web parity of the native V4). The
 * course enrollment CTA built on the primitive `Button`, mapping the enrollment
 * lifecycle to appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a soft-success confirmation pill with a ✓ (not
 * pressable), `full` → a disabled "Class full". State is announced and carried by
 * a word + glyph, never color alone. Identical props/behavior to
 * {@link EnrollButtonProps}. All colors from `--xen-*` token classes (no literals).
 */
export function EnrollButtonV4({
  state = 'idle',
  label = 'Enroll now',
  price,
  onEnroll,
  block = true,
  className,
}: EnrollButtonV4Props): React.ReactElement {
  const container = cn('flex flex-col gap-1', block ? 'self-stretch' : 'self-start', className);

  if (state === 'enrolled') {
    return (
      <div aria-label="Enrolled" data-xen-enroll-button="" className={container}>
        <div className="flex items-center justify-center gap-1 rounded-[var(--xen-radius-md)] bg-success/10 px-4 py-2.5 ring-1 ring-success/30">
          <span aria-hidden="true" className="text-base font-bold text-success">✓</span>
          <span className="text-sm font-bold text-success">Enrolled</span>
        </div>
      </div>
    );
  }

  if (state === 'full') {
    return (
      <div data-xen-enroll-button="" className={container}>
        <Button variant="secondary" disabled className={block ? 'w-full' : undefined}>Class full</Button>
      </div>
    );
  }

  const enrolling = state === 'enrolling';

  return (
    <div data-xen-enroll-button="" className={container}>
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
