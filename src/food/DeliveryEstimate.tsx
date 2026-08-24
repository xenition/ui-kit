import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export type DeliveryEstimateVariant = 'inline' | 'badge' | 'card';
export type FulfilmentMode = 'delivery' | 'pickup';

export interface DeliveryEstimateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Low end of the ETA window, in minutes. */
  minMinutes: number;
  /** High end of the ETA window, in minutes. When absent a single value shows. */
  maxMinutes?: number;
  /** Delivery vs. pickup — changes the glyph and default caption. */
  mode?: FulfilmentMode;
  /** Presentation (default `inline`). */
  variant?: DeliveryEstimateVariant;
  /** Caption under/next to the time (default derives from `mode`). */
  caption?: string;
  /** Loading placeholder — shows an em-dash while the ETA resolves. */
  loading?: boolean;
}

const MODE_GLYPH: Record<FulfilmentMode, string> = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION: Record<FulfilmentMode, string> = {
  delivery: 'Estimated delivery',
  pickup: 'Ready for pickup',
};

/**
 * A compact ETA readout — "25–35 min" with a mode glyph and caption. `variant`
 * renders it inline (glyph + text), as a token-tinted `badge` pill, or as a
 * bordered `card`. `loading` shows an em-dash placeholder. The window text is
 * built defensively so a missing `maxMinutes` collapses to a single value. Web
 * parity of the native `DeliveryEstimate`; token-only.
 */
export const DeliveryEstimate = React.forwardRef<HTMLDivElement, DeliveryEstimateProps>(
  function DeliveryEstimate(
    { minMinutes, maxMinutes, mode = 'delivery', variant = 'inline', caption, loading = false, className, ...rest },
    ref
  ) {
    const window =
      typeof maxMinutes === 'number' && maxMinutes > minMinutes
        ? `${minMinutes}–${maxMinutes} min`
        : `${minMinutes} min`;
    const timeText = loading ? '—' : window;
    const captionText = caption ?? MODE_CAPTION[mode];
    const label = `${captionText}: ${loading ? 'estimating' : window}`;

    if (variant === 'badge') {
      return (
        <div
          ref={ref}
          aria-label={label}
          className={cn(
            'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5',
            className
          )}
          {...rest}
        >
          <Icon glyph={MODE_GLYPH[mode]} size="xs" />
          <span className="text-xs font-semibold text-on-surface">{timeText}</span>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div
          ref={ref}
          aria-label={label}
          className={cn(
            'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
            className
          )}
          {...rest}
        >
          <Icon glyph={MODE_GLYPH[mode]} size="xl" />
          <div className="flex flex-1 flex-col">
            <span className="font-heading text-lg font-bold text-on-surface">{timeText}</span>
            <span className="text-sm text-muted">{captionText}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-label={label}
        className={cn('flex items-center gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <Icon glyph={MODE_GLYPH[mode]} size="sm" />
        <span className="text-sm font-semibold text-on-surface">{timeText}</span>
        <span className="text-sm text-muted">· {captionText}</span>
      </div>
    );
  }
);
