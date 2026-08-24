import * as React from 'react';
import { cn } from '../primitives/cn';
import type { CropCardProps, GrowthStage, CropHealth } from './CropCard';

/** Same public contract as {@link CropCard} — a drop-in alternate design. */
export type CropCardV3Props = CropCardProps;

const STAGE: Record<GrowthStage, { glyph: string; label: string }> = {
  seeding: { glyph: '🌱', label: 'Seeding' }, growing: { glyph: '🌿', label: 'Growing' }, flowering: { glyph: '🌸', label: 'Flowering' }, mature: { glyph: '🌾', label: 'Mature' }, harvested: { glyph: '📦', label: 'Harvested' },
};
const HEALTH_DOT: Record<CropHealth, string> = { healthy: 'bg-success', stressed: 'bg-warn', critical: 'bg-danger' };
const HEALTH_LABEL: Record<CropHealth, string> = { healthy: 'Healthy', stressed: 'Stressed', critical: 'Critical' };

/**
 * CropCard, redesigned (v3): a **dense planting line**. The stage glyph leads, the
 * name over a stage·field·harvest line with a thin maturity underline, and a
 * health dot + word trail — hairline-bordered for a plot list. The opposite of
 * v2's hero. Health is dot + word, never color alone. Same props, token-only.
 */
export const CropCardV3 = React.forwardRef<HTMLDivElement, CropCardV3Props>(function CropCardV3(
  { name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  void variety;
  const st = STAGE[stage];
  const interactive = typeof onClick === 'function';
  if (loading) {
    return <div ref={ref} data-xen-crop-card="" aria-label="Loading crop" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const meta = [st.label, fieldLabel, harvestLabel].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-crop-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={name}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className="text-xl" aria-hidden>{icon ?? st.glyph}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <p className="truncate text-xs text-muted">{meta}</p>
        {typeof progress === 'number' ? (
          <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-success" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        ) : null}
      </div>
      {health ? (
        <span className="flex items-center gap-1 text-xs text-muted">
          <span className={cn('inline-block h-2 w-2 rounded-full', HEALTH_DOT[health])} aria-hidden />
          {HEALTH_LABEL[health]}
        </span>
      ) : null}
    </div>
  );
});
