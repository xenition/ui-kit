import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { BADGE_V4, TABULAR_CLASS, deliveryWindow, spokenLine } from './internal/menu-v4';
import type { DeliveryEstimateProps, FulfilmentMode } from './DeliveryEstimate';

export interface DeliveryEstimateV4Props extends DeliveryEstimateProps {
  /** Copy shown in place of the window while the ETA resolves. Default `'Estimating'`. */
  estimatingLabel?: string;
  /** The window's unit. Default `'min'`. */
  unit?: string;
}

const MODE_GLYPH: Record<FulfilmentMode, string> = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION: Record<FulfilmentMode, string> = {
  delivery: 'Estimated delivery',
  pickup: 'Ready for pickup',
};

/**
 * **V4 delivery estimate** — the web twin of the native `DeliveryEstimateV4`,
 * same props as {@link DeliveryEstimate} plus `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is still a window.** The base tested
 *    `maxMinutes > minMinutes` and silently dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the other end of
 *    the estimate vanished. `deliveryWindow()` reads the pair the way round a
 *    human would.
 * 2. **The name it computes is no longer thrown away.** `aria-label` sat on a
 *    role-less `div`, where a name is simply ignored — so the caption, the
 *    only thing saying whether this is delivery or pickup, never reached the
 *    reader in the `badge` variant that does not draw it.
 * 3. **Loading says a word instead of an em-dash.** "—" is not readable copy,
 *    and it announced as nothing at all; `estimatingLabel` is the word, and
 *    the readout is polite-live so the real figure is announced when it lands.
 * 4. **`unit` is a prop, and the pill is a token.** "min" was compiled in
 *    English into the component, and the badge painted `bg-neutral-100` — a
 *    light-oriented ramp step that inverts under `[data-theme="dark"]`. It now
 *    takes the module's one badge shape.
 */
export const DeliveryEstimateV4 = React.forwardRef<HTMLDivElement, DeliveryEstimateV4Props>(
  function DeliveryEstimateV4(
    {
      minMinutes,
      maxMinutes,
      mode = 'delivery',
      variant = 'inline',
      caption,
      loading = false,
      estimatingLabel = 'Estimating',
      unit = 'min',
      className,
      ...rest
    },
    ref
  ) {
    const windowText = deliveryWindow(minMinutes, maxMinutes, unit);
    const timeText = loading ? estimatingLabel : windowText;
    const captionText = caption ?? MODE_CAPTION[mode];
    const label = spokenLine([captionText, timeText]);

    /*
      `role="group"` rather than nothing: a name on a role-less element is
      dropped, which is the defect. The visible text stays readable inside it —
      a group is not children-presentational, which is exactly why it is the
      right role here and `img` is not.
    */
    const shell = {
      role: 'group',
      'aria-label': label,
      'aria-busy': loading || undefined,
      'aria-live': loading ? ('polite' as const) : undefined,
    };

    if (variant === 'badge') {
      return (
        <div ref={ref} {...shell} className={cn('inline-flex self-start', className)} {...rest}>
          <BadgeV4 {...BADGE_V4} tone="neutral" className={TABULAR_CLASS}>
            <span aria-hidden="true">{MODE_GLYPH[mode]}</span>
            {timeText}
          </BadgeV4>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div
          ref={ref}
          {...shell}
          className={cn(
            'flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {MODE_GLYPH[mode]}
          </span>
          <div className="flex flex-1 flex-col">
            <span className={cn('font-heading text-lg font-bold text-on-card', TABULAR_CLASS)}>
              {timeText}
            </span>
            <span className="text-sm text-muted-text">{captionText}</span>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} {...shell} className={cn('flex items-center gap-xs', className)} {...rest}>
        <span aria-hidden="true">{MODE_GLYPH[mode]}</span>
        <span className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>{timeText}</span>
        {/* A visible meta separator, and only that — never a reader stop. */}
        <span aria-hidden="true" className="text-sm text-muted-text">
          ·
        </span>
        <span className="text-sm text-muted-text">{captionText}</span>
      </div>
    );
  }
);
