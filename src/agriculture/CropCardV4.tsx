import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { clampPercent, SKELETON_CLASS, TONE_INK, type FarmTone } from './internal/farm-v4';
import type { ProgressTone } from '../primitives/Progress';
import type { CropCardProps, CropHealth, GrowthStage } from './CropCard';

export interface CropCardV4Props extends CropCardProps {
  /** Label for the maturity meter. Default `'Maturity'`, which the base hard-coded. */
  progressLabel?: string;
  /** Override the stage names — five English words lived inside the component. */
  stageLabels?: Partial<Record<GrowthStage, string>>;
  /** Override the health names. */
  healthLabels?: Partial<Record<CropHealth, string>>;
}

/** Stage → glyph, tone and default label. Domain knowledge, so it stays here. */
const STAGE_META: Record<GrowthStage, { label: string; glyph: string; tone: FarmTone }> = {
  seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
  growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
  flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
  mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
  harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};

/**
 * Health → tone. Genuinely a status — healthy is good and critical is bad — so
 * this is one of the places §5 of the brief *keeps* the status colours.
 */
const HEALTH_META: Record<CropHealth, { label: string; tone: ProgressTone & FarmTone }> = {
  healthy: { label: 'Healthy', tone: 'success' },
  stressed: { label: 'Stressed', tone: 'warn' },
  critical: { label: 'Critical', tone: 'danger' },
};

/**
 * **V4 crop card** — the web twin of the native `CropCardV4`, same props as
 * {@link CropCard} plus `progressLabel`, `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **An interactive card is a `<button>`.** The base made a `<div>` into one
 *    with `role="button"`, `tabIndex` and a hand-written Enter/Space handler —
 *    three things a real button gives for free, and which that combination
 *    still gets wrong (no `:disabled`, no form semantics, no native focus
 *    behaviour on Safari).
 * 2. **The skeleton stops being a ramp step.** `bg-neutral-200` carries the
 *    light orientation in both schemes, so the loading state was a pale bar on
 *    a dark page.
 * 3. **Hover is the shared state layer**, not `hover:bg-neutral-50`.
 * 4. **The location and harvest captions carry icons**, not emoji glued into
 *    the string — `'📍 ' + fieldLabel` cannot be tinted and is read aloud by a
 *    screen reader as the emoji's name.
 * 5. **Captions take `muted-text`** and nine English strings became props.
 */
export const CropCardV4 = React.forwardRef<HTMLDivElement, CropCardV4Props>(function CropCardV4(
  {
    name,
    variety,
    icon,
    stage = 'growing',
    health,
    progress,
    fieldLabel,
    harvestLabel,
    variant = 'detailed',
    loading = false,
    progressLabel = 'Maturity',
    stageLabels,
    healthLabels,
    onClick,
    className,
    ...rest
  },
  ref
) {
  if (loading) {
    return (
      <CardV4 ref={ref} data-xen-crop-card="" className={className} {...rest}>
        <div className={cn('h-4 w-3/5', SKELETON_CLASS)} />
        <div className={cn('mt-2 h-3 w-2/5', SKELETON_CLASS)} />
      </CardV4>
    );
  }

  if (!name) return null;

  const stageMeta = STAGE_META[stage];
  const stageLabel = stageLabels?.[stage] ?? stageMeta.label;
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_META[health] : null;
  const healthLabel = health ? (healthLabels?.[health] ?? healthMeta!.label) : null;
  const detailed = variant === 'detailed';
  const pct = clampPercent(progress);

  const body = (
    <>
      <div className="flex items-center gap-sm">
        <IconV4 glyph={glyph} size={detailed ? '2xl' : 'xl'} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-bold text-on-card">{name}</p>
          {variety != null ? (
            <p className="truncate text-sm text-muted-text">{variety}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-xs">
          <BadgeV4 tone={stageMeta.tone} variant="soft" size="sm">
            {stageLabel}
          </BadgeV4>
          {healthMeta ? (
            <BadgeV4 tone={healthMeta.tone} variant="soft" size="sm">
              {healthLabel}
            </BadgeV4>
          ) : null}
        </div>
      </div>

      {detailed && pct != null ? (
        <div className="mt-md flex flex-col gap-xs">
          <div className="flex justify-between">
            <span className="text-xs text-muted-text">{progressLabel}</span>
            <span
              className={cn(
                'text-xs font-semibold [font-variant-numeric:tabular-nums]',
                healthMeta ? TONE_INK[healthMeta.tone] : 'text-on-card'
              )}
            >
              {pct}%
            </span>
          </div>
          <ProgressV4 value={pct} tone={healthMeta ? healthMeta.tone : 'primary'} />
        </div>
      ) : null}

      {detailed && (fieldLabel != null || harvestLabel != null) ? (
        <div className="mt-md flex flex-wrap gap-md text-xs text-muted-text">
          {fieldLabel != null ? (
            <span className="flex items-center gap-xs">
              <IconV4 name="location" size="xs" />
              {fieldLabel}
            </span>
          ) : null}
          {harvestLabel != null ? (
            <span className="flex items-center gap-xs">
              <IconV4 name="calendar" size="xs" />
              {harvestLabel}
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (!onClick) {
    return (
      <CardV4 ref={ref} data-xen-crop-card="" className={className} {...rest}>
        {body}
      </CardV4>
    );
  }

  return (
    <CardV4 ref={ref} data-xen-crop-card="" className={cn('p-0', className)} {...rest}>
      {/*
        A real `<button>`, not a div wearing `role="button"`: the base's
        combination of role + tabIndex + a hand-written key handler is three
        approximations of what the element already does.
      */}
      <button
        type="button"
        onClick={onClick}
        aria-label={[name, variety, stageLabel, healthLabel].filter(Boolean).join(', ')}
        data-xen-v4-chrome="on-surface"
        className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
      >
        {body}
      </button>
    </CardV4>
  );
});
