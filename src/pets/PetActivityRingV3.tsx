import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Same public contract as {@link PetActivityRing} — a drop-in alternate design. */
export type PetActivityRingV3Props = PetActivityRingProps;

const META: Record<PetActivityVariant, { glyph: string; label: string; unit: string; fill: string }> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', fill: 'bg-primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', fill: 'bg-accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', fill: 'bg-success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', fill: 'bg-warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', fill: 'bg-danger' },
};

/**
 * PetActivityRing, redesigned (v3): a **compact activity bar**. No ring — a glyph,
 * an inline "label · value/goal unit · N%" readout, and a thin fill bar. A dense
 * row for stacking several activities. The opposite of v2's medallion. Same
 * props, token-only. (`size`/`color` are accepted for parity.)
 */
export const PetActivityRingV3 = React.forwardRef<HTMLDivElement, PetActivityRingV3Props>(
  function PetActivityRingV3({ variant, value, goal, size, color, showCaption = true, className }, ref) {
    void size;
    void color;
    const meta = META[variant];

    if (goal <= 0) {
      return (
        <div ref={ref} aria-label={`${meta.label}: no goal set`} className={cn('flex items-center gap-2', className)}>
          <span className="text-lg" aria-hidden>{meta.glyph}</span>
          <span className="text-sm text-muted">No goal set</span>
        </div>
      );
    }

    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);

    return (
      <div
        ref={ref}
        aria-label={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%`}
        className={cn('flex items-center gap-3', className)}
      >
        <span className="text-lg" aria-hidden>{meta.glyph}</span>
        <div className="min-w-0 flex-1">
          {showCaption ? (
            <p className="flex items-baseline justify-between text-xs">
              <span className="font-semibold text-on-surface">{meta.label}</span>
              <span className="text-muted">{clamped}/{goal}{meta.unit ? ` ${meta.unit}` : ''} · {pct}%</span>
            </p>
          ) : null}
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className={cn('h-full rounded-full', meta.fill)} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    );
  }
);
