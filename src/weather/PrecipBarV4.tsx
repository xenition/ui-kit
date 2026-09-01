import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { PrecipBarProps } from './PrecipBar';

export type PrecipBarV4Props = PrecipBarProps;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * V4 design-line precipitation-probability bars — a polished elevated white
 * card. Same props, defaults and empty handling as the base `PrecipBar`: one
 * `bg-primary` column per period on a `bg-neutral-100` track, its height
 * proportional to the chance (0–100), with a droplet glyph header and muted
 * period labels. `showValues` prints the numeric % above each bar. All colors
 * flow through Tailwind token classes.
 */
export const PrecipBarV4 = React.forwardRef<HTMLDivElement, PrecipBarV4Props>(function PrecipBarV4(
  { slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', className, ...rest },
  ref
) {
  const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

  if (slots.length === 0) {
    return (
      <div ref={ref} role="img" aria-label={emptyLabel} className={cn(shell, 'flex flex-col items-center gap-2', className)} {...rest}>
        <Icon glyph="💧" size="2xl" color="primary" aria-hidden />
        <p className="text-sm text-muted">{emptyLabel}</p>
      </div>
    );
  }

  const track = clamp(height, 32, 320);

  return (
    <div ref={ref} className={cn(shell, 'flex flex-col', className)} {...rest}>
      <div className="flex flex-row items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
          <Icon glyph="💧" size="lg" color="primary" aria-label="Precipitation" />
        </span>
        <span className="text-sm text-muted">Precipitation</span>
      </div>

      <div className="mt-3 flex flex-row items-end justify-between gap-1">
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
                className="flex w-[70%] flex-col justify-end overflow-hidden rounded-full bg-neutral-100"
                style={{ height: track }}
              >
                <div className="rounded-full bg-primary" style={{ height: `${pct}%` }} />
              </div>
              <span className="text-xs text-muted">{slot.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
