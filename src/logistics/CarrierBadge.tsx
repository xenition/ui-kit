import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  CARRIER_META,
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_SOFT_BG,
  TONE_BORDER,
  type CarrierCode,
} from './internal';

export type CarrierBadgeVariant = 'soft' | 'solid' | 'outline';
export type CarrierBadgeSize = 'sm' | 'md';

export interface CarrierBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Known carrier code; anything else falls back to the generic carrier. */
  carrier?: CarrierCode;
  /** Override display name (e.g. a regional courier) — replaces the code label. */
  name?: string;
  /** Optional service level line (e.g. `Ground`, `2-Day`, `Priority`). */
  service?: string;
  /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
  variant?: CarrierBadgeVariant;
  /** Size scale. Defaults to `md`. */
  size?: CarrierBadgeSize;
}

/**
 * Compact carrier identity chip — a glyph + carrier name (+ optional service
 * level), so the carrier is never conveyed by color alone. Colors resolve from
 * the carrier's tone token class (solid / soft tint / outline); no literal
 * colors. Reused by `ShipmentCard`, `PackageRow`, `ManifestRow` and
 * `DockSchedule`. Web parity of the native `CarrierBadge`.
 */
export const CarrierBadge = React.forwardRef<HTMLSpanElement, CarrierBadgeProps>(
  function CarrierBadge(
    { carrier = 'generic', name, service, variant = 'soft', size = 'md', className, ...rest },
    ref
  ) {
    const meta = CARRIER_META[carrier] ?? CARRIER_META.generic;
    const label = name ?? meta.label;
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

    const treatment =
      variant === 'solid'
        ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
        : variant === 'outline'
          ? cn('border', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone])
          : cn(TONE_SOFT_BG[meta.tone], TONE_TEXT[meta.tone]);

    return (
      <span
        ref={ref}
        role="img"
        aria-label={`Carrier ${label}${service ? `, ${service}` : ''}`}
        className={cn(
          'inline-flex max-w-max items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-0.5',
          textSize,
          treatment,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span className="font-bold">{label}</span>
        {service ? (
          <span className={cn('text-xs', variant === 'solid' ? TONE_ON_TEXT[meta.tone] : 'text-muted')}>
            {`· ${service}`}
          </span>
        ) : null}
      </span>
    );
  }
);
