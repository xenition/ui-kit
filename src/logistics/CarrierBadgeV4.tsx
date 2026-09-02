import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  CARRIER_META,
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_SOFT_BG,
  TONE_BORDER,
} from './internal';
import type { CarrierBadgeProps } from './CarrierBadge';

/** Drop-in for {@link CarrierBadgeProps} — same props, the V4 "dispatch" design. */
export type CarrierBadgeV4Props = CarrierBadgeProps;

/**
 * CarrierBadge — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token class; no
 * literal colors. Identical props/behavior to {@link CarrierBadgeProps}.
 */
export const CarrierBadgeV4 = React.forwardRef<HTMLSpanElement, CarrierBadgeV4Props>(function CarrierBadgeV4(
  { carrier = 'generic', name, service, variant = 'soft', size = 'md', className, ...rest },
  ref
) {
  const meta = CARRIER_META[carrier] ?? CARRIER_META.generic;
  const label = name ?? meta.label;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const wellSize = size === 'sm' ? 'h-4 w-4 text-[10px]' : 'h-5 w-5 text-xs';

  const treatment =
    variant === 'solid'
      ? cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone])
      : variant === 'outline'
        ? cn('border', TONE_BORDER[meta.tone], TONE_TEXT[meta.tone])
        : cn(TONE_SOFT_BG[meta.tone], TONE_TEXT[meta.tone]);

  // On a solid fill the glyph well reads inverted; otherwise it sits on a tint.
  const well =
    variant === 'solid' ? cn(TONE_ON_TEXT[meta.tone], 'bg-primary-50/20') : cn(TONE_BG[meta.tone], TONE_ON_TEXT[meta.tone]);

  return (
    <span
      ref={ref}
      role="img"
      aria-label={`Carrier ${label}${service ? `, ${service}` : ''}`}
      className={cn(
        'inline-flex max-w-max items-center gap-[var(--xen-space-xs)] rounded-full py-0.5 pl-0.5 pr-[var(--xen-space-sm)] font-bold shadow-sm',
        textSize,
        treatment,
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn('flex shrink-0 items-center justify-center rounded-full', wellSize, well)}
      >
        {meta.glyph}
      </span>
      <span>{label}</span>
      {service ? (
        <span className={cn('font-medium', variant === 'solid' ? TONE_ON_TEXT[meta.tone] : 'text-muted')}>
          {`· ${service}`}
        </span>
      ) : null}
    </span>
  );
});
