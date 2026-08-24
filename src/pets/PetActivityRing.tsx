import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts';
import type { ChartColor } from '../charts';
import { SLOT_TEXT, type PetSlot } from './_tokens';

export type PetActivityVariant = 'walk' | 'play' | 'exercise' | 'steps' | 'calories';

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: ChartColor;
}

const VARIANT_META: Record<PetActivityVariant, VariantMeta> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};

export interface PetActivityRingProps {
  /** Activity type; drives the icon, label, unit and default color. */
  variant: PetActivityVariant;
  /** Current value toward the goal. */
  value: number;
  /** Goal / full-ring value. Non-positive renders a "No goal set" state. */
  goal: number;
  /** Ring diameter in px. */
  size?: number;
  /** Override the variant's accent color (a chart color token). */
  color?: ChartColor;
  /** Show the label + value line beneath the ring. */
  showCaption?: boolean;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A single activity goal ring for a pet (walk / play / steps …), built on the
 * charts {@link ProgressRing}. The center shows the percentage; an optional
 * caption repeats the label and raw value/goal. Guards a non-positive goal with
 * a muted "No goal set" note. Token-only colors.
 */
export const PetActivityRing = React.forwardRef<HTMLDivElement, PetActivityRingProps>(function PetActivityRing(
  { variant, value, goal, size = 120, color, showCaption = true, className },
  ref
) {
  const meta = VARIANT_META[variant];
  const arcColor = color ?? meta.color;

  if (goal <= 0) {
    return (
      <div
        ref={ref}
        aria-label={`${meta.label}: no goal set`}
        className={cn('flex flex-col items-center gap-[var(--xen-space-xs)]', className)}
      >
        <span className="text-2xl" aria-hidden="true">
          {meta.glyph}
        </span>
        <span className="text-sm text-muted">No goal set</span>
      </div>
    );
  }

  const clamped = Math.min(Math.max(value, 0), goal);
  const pct = Math.round((clamped / goal) * 100);
  const met = clamped >= goal;

  return (
    <div ref={ref} className={cn('flex flex-col items-center gap-[var(--xen-space-sm)]', className)}>
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        color={arcColor}
        aria-label={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      />
      {showCaption ? (
        <div className="flex flex-col items-center">
          <span className={cn('text-sm font-bold', SLOT_TEXT[arcColor as PetSlot])}>
            {met ? `✓ ${meta.label} goal met` : meta.label}
          </span>
          <span className="text-xs text-muted">
            {clamped} / {goal}
            {meta.unit ? ` ${meta.unit}` : ''}
          </span>
        </div>
      ) : null}
    </div>
  );
});
