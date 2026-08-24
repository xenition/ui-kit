import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Progress } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { CropCardProps, GrowthStage, CropHealth } from './CropCard';

/** Same public contract as {@link CropCard} — a drop-in alternate design. */
export type CropCardV2Props = CropCardProps;

const STAGE: Record<GrowthStage, { glyph: string; label: string }> = {
  seeding: { glyph: '🌱', label: 'Seeding' }, growing: { glyph: '🌿', label: 'Growing' }, flowering: { glyph: '🌸', label: 'Flowering' }, mature: { glyph: '🌾', label: 'Mature' }, harvested: { glyph: '📦', label: 'Harvested' },
};
const HEALTH: Record<CropHealth, { label: string; tone: BadgeTone; tint: string }> = {
  healthy: { label: 'Healthy', tone: 'success', tint: 'bg-success/10' }, stressed: { label: 'Stressed', tone: 'warn', tint: 'bg-warn/10' }, critical: { label: 'Critical', tone: 'danger', tint: 'bg-danger/10' },
};

/**
 * CropCard, redesigned (v2): a **hero planting card**. A big stage glyph sits in a
 * health-tinted disc; the name/variety, stage + health chips, a maturity bar, and
 * field/harvest hints follow. Elevated. Distinct from v1. Same props, token-only.
 */
export const CropCardV2 = React.forwardRef<HTMLDivElement, CropCardV2Props>(function CropCardV2(
  { name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  const st = STAGE[stage];
  const h = health ? HEALTH[health] : undefined;
  const interactive = typeof onClick === 'function';
  if (loading) {
    return <div ref={ref} data-xen-crop-card="" aria-label="Loading crop" className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const meta = [fieldLabel, harvestLabel].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-crop-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <span className={cn('flex h-14 w-14 items-center justify-center rounded-full text-2xl', h?.tint ?? 'bg-neutral-100')} aria-hidden>{icon ?? st.glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{name}</p>
          {variety ? <p className="text-xs text-muted">{variety}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge tone="neutral">{st.label}</Badge>
          {h ? <Badge tone={h.tone}>{h.label}</Badge> : null}
        </div>
      </div>
      {typeof progress === 'number' ? <Progress value={Math.max(0, Math.min(100, progress))} tone="success" size="sm" /> : null}
      {meta ? <p className="text-xs text-muted">{meta}</p> : null}
    </div>
  );
});
