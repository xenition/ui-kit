import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressRing } from '../charts';
import type { ChartColor } from '../charts';
import { SLOT_TEXT, type PetSlot } from './_tokens';
import type { PetActivityRingProps, PetActivityVariant } from './PetActivityRing';

/** Drop-in for {@link PetActivityRingProps} — same props, the V4 "companion" design. */
export type PetActivityRingV4Props = PetActivityRingProps;

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: ChartColor;
}

/** Per-variant glyph / label / unit / default color — copied from the base component. */
const VARIANT_META: Record<PetActivityVariant, VariantMeta> = {
  walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
  play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
  exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
  steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};

/**
 * PetActivityRing — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a single activity goal ring: an elevated rounded card
 * with a soft shadow wrapping the charts {@link ProgressRing} (kept token-fed and
 * unchanged from the base), a big legible central value, and the label + glyph
 * carried in a soft-primary chip beneath. Same props/behavior as
 * {@link PetActivityRingProps}: honors `variant` (walk / play / exercise / steps /
 * calories) with its glyph/label/unit, the `color` override and the `size` prop,
 * and guards a non-positive goal with a muted "No goal set" note. All colors from
 * `--xen-*` token classes (no literals).
 */
export const PetActivityRingV4 = React.forwardRef<HTMLDivElement, PetActivityRingV4Props>(function PetActivityRingV4(
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
        className={cn(
          'flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
          className
        )}
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
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
        className
      )}
    >
      <ProgressRing
        value={value}
        max={goal}
        size={size}
        color={arcColor}
        aria-label={`${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`}
      />
      {/* Big legible central value. */}
      <span className="text-3xl font-bold text-on-surface">{pct}%</span>
      {showCaption ? (
        <div className="flex flex-col items-center gap-[var(--xen-space-xs)]">
          {/* Label + glyph as a soft-primary chip. */}
          <span
            className={cn(
              'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold',
              SLOT_TEXT[arcColor as PetSlot]
            )}
          >
            <span aria-hidden="true">{meta.glyph}</span>
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
