import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Cultivation state of a field/parcel. Drives the status chip. */
export type FieldStatus = 'planted' | 'fallow' | 'harvested' | 'preparing';
/** Visual density. */
export type FieldCardVariant = 'detailed' | 'compact';

export interface FieldCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Field / parcel name (e.g. "North 40"). */
  name: string;
  /** Area magnitude (e.g. `12.5`). Rendered with `areaUnit`. */
  area?: number | string;
  /** Area unit suffix. Default `'ha'`. */
  areaUnit?: string;
  /** Crop currently on the field (e.g. "Maize"). */
  crop?: string;
  /** Soil type / classification (e.g. "Clay loam"). */
  soilType?: string;
  /** Location / GPS hint (e.g. "Sector B"). */
  location?: string;
  /** Cultivation status. Default `'planted'`. */
  status?: FieldStatus;
  /** Leading glyph/emoji. Default `'🌾'`. */
  icon?: string;
  /** Density variant. Default `'detailed'`. */
  variant?: FieldCardVariant;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

const STATUS_META: Record<FieldStatus, { label: string; tone: BadgeTone }> = {
  planted: { label: 'Planted', tone: 'success' },
  fallow: { label: 'Fallow', tone: 'neutral' },
  harvested: { label: 'Harvested', tone: 'primary' },
  preparing: { label: 'Preparing', tone: 'warn' },
};

function Meta({
  glyph,
  text,
  className,
}: {
  glyph: string;
  text: string;
  className?: string;
}): React.ReactElement {
  return <span className={cn('text-xs', className)}>{`${glyph} ${text}`}</span>;
}

/**
 * A field / parcel summary card — glyph, name, an area figure, and a cultivation
 * {@link Badge} whose text label (not color alone) carries the status. The
 * `detailed` variant adds crop / soil / location meta rows; `compact` keeps just
 * the header. When `onClick` is set the card is an accessible `role="button"`
 * with keyboard activation. Token-bound throughout — no literal colors.
 */
export const FieldCard = React.forwardRef<HTMLDivElement, FieldCardProps>(function FieldCard(
  {
    name,
    area,
    areaUnit = 'ha',
    crop,
    soilType,
    location,
    status = 'planted',
    icon = '🌾',
    variant = 'detailed',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = STATUS_META[status];
  const detailed = variant === 'detailed';
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
      data-xen-field-card=""
      className={cn(
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${name}, ${meta.label}` : undefined}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {/* accent slot → primary on web (no accent icon color) */}
        <Icon glyph={icon} size="xl" color="primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-bold text-on-surface">{name}</p>
          {area != null ? (
            <p className="text-sm text-muted">
              {String(area)} {areaUnit}
            </p>
          ) : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>

      {detailed ? (
        <div className="mt-3 flex flex-wrap gap-3">
          {crop != null ? <Meta glyph="🌱" text={crop} className="text-on-surface" /> : null}
          {soilType != null ? <Meta glyph="🪨" text={soilType} className="text-muted" /> : null}
          {location != null ? <Meta glyph="📍" text={location} className="text-muted" /> : null}
        </div>
      ) : null}
    </Card>
  );
});
