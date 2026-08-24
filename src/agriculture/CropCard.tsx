import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Progress } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Growth phase of a planting. Drives the stage chip + default glyph. */
export type GrowthStage = 'seeding' | 'growing' | 'flowering' | 'mature' | 'harvested';
/** Plant health — colors the health value and pairs with a text chip. */
export type CropHealth = 'healthy' | 'stressed' | 'critical';
/** Visual density. `detailed` shows the maturity bar + meta; `compact` is a slim row. */
export type CropCardVariant = 'detailed' | 'compact';

export interface CropCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Crop / planting name (e.g. "Winter Wheat"). */
  name: string;
  /** Cultivar / variety line (e.g. "Skyfall"). */
  variety?: string;
  /** Leading glyph/emoji. Defaults to a stage-appropriate glyph. */
  icon?: string;
  /** Growth phase. Default `'growing'`. */
  stage?: GrowthStage;
  /** Plant health — colors the health label and shows a text status chip. */
  health?: CropHealth;
  /** Maturity progress 0–100 (rendered as a bar in `detailed`). Guarded/clamped. */
  progress?: number;
  /** Field / plot the crop sits in (e.g. "North 40"). */
  fieldLabel?: string;
  /** Days-to-harvest or ready hint (e.g. "42 days to harvest"). */
  harvestLabel?: string;
  /** Density variant. Default `'detailed'`. */
  variant?: CropCardVariant;
  /** Show a muted placeholder while data loads. */
  loading?: boolean;
  /** Fires when the card is activated (opens the planting). */
  onClick?: () => void;
}

const STAGE_META: Record<GrowthStage, { label: string; glyph: string; tone: BadgeTone }> = {
  seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
  growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
  flowering: { label: 'Flowering', glyph: '🌸', tone: 'primary' },
  mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
  harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};

const HEALTH_META: Record<
  CropHealth,
  { label: string; text: string; tone: 'success' | 'warn' | 'danger' }
> = {
  healthy: { label: 'Healthy', text: 'text-success', tone: 'success' },
  stressed: { label: 'Stressed', text: 'text-warn', tone: 'warn' },
  critical: { label: 'Critical', text: 'text-danger', tone: 'danger' },
};

/**
 * A single crop / planting summary — glyph, name + variety, a growth-stage
 * {@link Badge}, an optional health chip (color is always paired with a text
 * label so an at-risk crop reads without color), and, in the `detailed`
 * variant, a maturity {@link Progress} bar plus field / harvest meta. When
 * `onClick` is set the card is an accessible `role="button"` with keyboard
 * activation; `loading` renders a muted placeholder. Token-bound throughout —
 * no literal colors.
 */
export const CropCard = React.forwardRef<HTMLDivElement, CropCardProps>(function CropCard(
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
    onClick,
    className,
    ...rest
  },
  ref
) {
  const stageMeta = STAGE_META[stage];
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_META[health] : null;
  const detailed = variant === 'detailed';
  const clampedProgress =
    typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;

  if (loading) {
    return (
      <Card ref={ref} data-xen-crop-card="" className={className} {...rest}>
        <div className="h-4 w-3/5 rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-2/5 rounded bg-neutral-200" />
      </Card>
    );
  }

  const interactive = typeof onClick === 'function';
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Card
      ref={ref}
      data-xen-crop-card=""
      className={cn(
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive ? `${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}` : undefined
      }
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      {...rest}
    >
      <div className="flex items-center gap-2">
        <Icon glyph={glyph} size={detailed ? '2xl' : 'xl'} color="primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-bold text-on-surface">{name}</p>
          {variety != null ? <p className="truncate text-sm text-muted">{variety}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge tone={stageMeta.tone}>{stageMeta.label}</Badge>
          {healthMeta ? <Badge tone={healthMeta.tone}>{healthMeta.label}</Badge> : null}
        </div>
      </div>

      {detailed && clampedProgress != null ? (
        <div className="mt-3">
          <div className="mb-1 flex justify-between">
            <span className="text-xs text-muted">Maturity</span>
            <span
              className={cn(
                'text-xs font-semibold',
                healthMeta ? healthMeta.text : 'text-on-surface'
              )}
            >
              {clampedProgress}%
            </span>
          </div>
          <Progress value={clampedProgress} tone={healthMeta ? healthMeta.tone : 'primary'} />
        </div>
      ) : null}

      {detailed && (fieldLabel != null || harvestLabel != null) ? (
        <div className="mt-3 flex flex-wrap gap-3">
          {fieldLabel != null ? (
            <span className="text-xs text-muted">📍 {fieldLabel}</span>
          ) : null}
          {harvestLabel != null ? (
            <span className="text-xs text-muted">🗓️ {harvestLabel}</span>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
