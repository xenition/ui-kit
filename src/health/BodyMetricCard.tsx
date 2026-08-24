import * as React from 'react';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import { type HealthColor } from './internal';

export type BodyMetricVariant = 'weight' | 'bmi' | 'body-fat' | 'muscle' | 'waist' | 'blood-sugar';

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
}

const VARIANT_META: Record<BodyMetricVariant, VariantMeta> = {
  weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
  bmi: { glyph: '📊', label: 'BMI', unit: '' },
  'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
  muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
  waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
  'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};

export interface BodyMetricCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Which body metric; drives the icon, label, and default unit. */
  variant: BodyMetricVariant;
  /** The current measurement. */
  value: React.ReactNode;
  /** Override the variant's default unit. Pass `''` to hide. */
  unit?: string;
  /** Change vs. the previous reading; positive reads success, negative danger. */
  delta?: number;
  /**
   * Invert the delta tone — for metrics where down is good (weight, body fat,
   * waist). When true a negative delta reads `success`.
   */
  lowerIsBetter?: boolean;
  /** Recent history for an inline sparkline trend. */
  trend?: number[];
  onPress?: () => void;
}

/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. Web parity of the
 * native `BodyMetricCard`; colors trace to `--xen-*` token classes — no literals.
 * Clickable when `onPress` is set.
 */
export const BodyMetricCard = React.forwardRef<HTMLDivElement, BodyMetricCardProps>(
  function BodyMetricCard(
    { variant, value, unit, delta, lowerIsBetter = false, trend, onPress, className, ...rest },
    ref
  ) {
    const meta = VARIANT_META[variant];
    const resolvedUnit = unit ?? meta.unit;

    let deltaClass = 'text-muted';
    let trendColor: HealthColor = 'primary';
    if (delta != null && delta !== 0) {
      const good = lowerIsBetter ? delta < 0 : delta > 0;
      deltaClass = good ? 'text-success' : 'text-danger';
      trendColor = good ? 'success' : 'danger';
    }

    const a11y = `${meta.label}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;

    const body = (
      <>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className="text-base leading-none">
            {meta.glyph}
          </span>
          <span className="text-sm text-muted">{meta.label}</span>
        </div>

        <div className="flex items-end gap-[var(--xen-space-xs)]">
          <span className="text-3xl font-bold text-on-surface">{value}</span>
          {resolvedUnit ? <span className="pb-0.5 text-base text-muted">{resolvedUnit}</span> : null}
        </div>

        {delta != null ? (
          <span className={cn('text-sm font-semibold', deltaClass)}>
            {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
            {Math.abs(delta)}
            {resolvedUnit ? ` ${resolvedUnit}` : ''}
          </span>
        ) : null}

        {trend && trend.length > 0 ? (
          <Sparkline
            data={trend}
            color={trendColor}
            aria-label={`${meta.label} trend over ${trend.length} readings`}
          />
        ) : null}
      </>
    );

    const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';

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
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {body}
      </div>
    );
  }
);
