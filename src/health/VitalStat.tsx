import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_CLASS, type HealthColor } from './internal';

export type VitalStatVariant =
  | 'heart-rate'
  | 'steps'
  | 'calories'
  | 'distance'
  | 'oxygen'
  | 'blood-pressure'
  | 'temperature'
  | 'respiration';

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
  color: HealthColor;
}

/** Icon / default label / default unit / accent tone per vital variant. */
const VARIANT_META: Record<VitalStatVariant, VariantMeta> = {
  'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm', color: 'danger' },
  steps: { glyph: '👟', label: 'Steps', unit: '', color: 'primary' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'warn' },
  distance: { glyph: '📍', label: 'Distance', unit: 'km', color: 'primary' },
  oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%', color: 'accent' },
  'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg', color: 'danger' },
  temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C', color: 'warn' },
  respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min', color: 'accent' },
};

export interface VitalStatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Which vital sign this tile shows; drives the default icon, label, unit, and tone. */
  variant: VitalStatVariant;
  /** The measured value (e.g. `72`, `"120/80"`). */
  value: React.ReactNode;
  /** Override the variant's default unit suffix. Pass `''` to hide it. */
  unit?: string;
  /** Override the variant's default label. */
  label?: string;
  /** Optional change readout, e.g. `4`; positive reads success, negative danger. */
  delta?: number;
  onPress?: () => void;
}

/**
 * A single vital-sign tile: an emoji icon, the measured value with its unit, a
 * caption, and an optional trend delta. The `variant` picks sensible defaults
 * (icon / unit / accent tone) that individual props can override. Web parity of
 * the native `VitalStat`; colors resolve from `--xen-*` token classes — no
 * literals. Clickable when `onPress` is provided.
 */
export const VitalStat = React.forwardRef<HTMLDivElement, VitalStatProps>(function VitalStat(
  { variant, value, unit, label, delta, onPress, className, ...rest },
  ref
) {
  const meta = VARIANT_META[variant];
  const resolvedUnit = unit ?? meta.unit;
  const resolvedLabel = label ?? meta.label;
  const deltaClass =
    delta == null || delta === 0 ? 'text-muted' : delta > 0 ? 'text-success' : 'text-danger';
  const a11y = `${resolvedLabel}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-xs)]">
        <span aria-hidden="true" className="text-base leading-none">
          {meta.glyph}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs text-muted">{resolvedLabel}</span>
      </div>
      <div className="flex items-end gap-[var(--xen-space-xs)]">
        <span className={cn('text-2xl font-bold', TEXT_CLASS[meta.color])}>{value}</span>
        {resolvedUnit ? <span className="pb-0.5 text-sm text-muted">{resolvedUnit}</span> : null}
      </div>
      {delta != null ? (
        <span className={cn('text-xs font-semibold', deltaClass)}>
          {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
          {Math.abs(delta)}
        </span>
      ) : null}
    </>
  );

  const shell = 'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]';

  if (!onPress) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(shell, className)} {...rest}>
        {body}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="button"
      aria-label={a11y}
      tabIndex={0}
      onClick={onPress}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress();
        }
      }}
      className={cn(
        shell,
        'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
