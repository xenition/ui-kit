import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import { clamp } from './weather-utils';

export interface PrecipSlot {
  /** Period label (e.g. `'9a'`, `'Mon'`). */
  label: string;
  /** Chance of precipitation, 0–100. */
  chance: number;
  /** Optional accumulation caption (e.g. `'0.2"'`). */
  amount?: string;
}

export interface PrecipBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-period precipitation chances, rendered as a bar column each. */
  slots: PrecipSlot[];
  /** Bar column height in px. Default `96`. */
  height?: number;
  /** Show the numeric % above each bar. Default `false`. */
  showValues?: boolean;
  /** Message shown when `slots` is empty. */
  emptyLabel?: string;
}

/**
 * Precipitation-probability bars (web parity of the native `PrecipBar`): one
 * token-filled column per period, its height proportional to the chance (0–100).
 * The fill uses a `primary` token plus a droplet glyph header, so the metric
 * reads without color alone. Values are guarded/clamped to 0–100. Renders an
 * `EmptyState` when `slots` is empty. All colors come from the `--xen-*` tokens
 * via Tailwind classes — no literal colors, no chart deps.
 */
export const PrecipBar = React.forwardRef<HTMLDivElement, PrecipBarProps>(function PrecipBar(
  { slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', className, ...rest },
  ref
) {
  if (slots.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="💧" size="2xl" aria-hidden />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  const track = clamp(height, 32, 320);

  return (
    <Card ref={ref} className={className} {...rest}>
      <div className="flex flex-row items-center gap-1">
        <Icon glyph="💧" size="sm" aria-label="Precipitation" />
        <span className="text-sm text-muted">Precipitation</span>
      </div>

      <div className="mt-2 flex flex-row items-end justify-between gap-1">
        {slots.map((slot, index) => {
          const pct = clamp(slot.chance, 0, 100);
          return (
            <div
              key={`${slot.label}-${index}`}
              role="img"
              aria-label={`${slot.label}, ${pct} percent chance${slot.amount ? `, ${slot.amount}` : ''}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              {showValues ? <span className="text-xs text-muted">{pct}%</span> : null}
              <div
                className="flex w-[70%] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100"
                style={{ height: track }}
              >
                <div
                  className="rounded-[var(--xen-radius-sm)] bg-primary"
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-muted">{slot.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
});
