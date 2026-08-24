import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Same public contract as {@link PetActivityRing} — a drop-in alternate design. */
export type PetActivityRingV2Props = PetActivityRingProps;

const META: Record<PetActivityVariant, { glyph: string; label: string; unit: string; color: 'primary' | 'accent' | 'success' | 'warn' | 'danger' }> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
const TEXT = { primary: 'text-primary', accent: 'text-accent', success: 'text-success', warn: 'text-warn', danger: 'text-danger' } as const;

/**
 * PetActivityRing, redesigned (v2): a **bold stat medallion**. A large ring with
 * the glyph + value in the center, the label and value/goal beneath, and a "Goal
 * met ✓" pill once complete. Bigger and more celebratory than v1. Same props,
 * token-only.
 */
export const PetActivityRingV2 = React.forwardRef<HTMLDivElement, PetActivityRingV2Props>(
  function PetActivityRingV2({ variant, value, goal, size = 132, color, showCaption = true, className }, ref) {
    const meta = META[variant];
    const arc = color ?? meta.color;

    if (goal <= 0) {
      return (
        <div ref={ref} aria-label={`${meta.label}: no goal set`} className={cn('flex flex-col items-center gap-1', className)}>
          <span className="text-2xl" aria-hidden>{meta.glyph}</span>
          <span className="text-sm text-muted">No goal set</span>
        </div>
      );
    }

    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;

    return (
      <div ref={ref} className={cn('flex flex-col items-center gap-2', className)}>
        <div className="relative flex items-center justify-center">
          <ProgressRing
            value={value}
            max={goal}
            size={size}
            thickness={12}
            color={arc}
            aria-label={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
          />
          <div className="absolute flex flex-col items-center">
            <span className="text-xl" aria-hidden>{meta.glyph}</span>
            <span className={cn('text-lg font-bold', TEXT[arc as keyof typeof TEXT] ?? 'text-on-surface')}>{pct}%</span>
          </div>
        </div>
        {showCaption ? (
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-on-surface">{meta.label}</span>
            <span className="text-xs text-muted">
              {clamped} / {goal}{meta.unit ? ` ${meta.unit}` : ''}
            </span>
            {met ? (
              <span className="mt-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">Goal met ✓</span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
