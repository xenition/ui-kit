import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp } from './types';

export type LoopControlVariant = 'bar' | 'inline';

export interface LoopControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether looping is enabled. */
  enabled: boolean;
  /** Loop start bar (1-based). */
  start?: number;
  /** Loop end bar (1-based, inclusive). */
  end?: number;
  /** Total bars in the arrangement (for the region visualization). Default 8. */
  totalBars?: number;
  /**
   * - `bar` — toggle + a region strip over the bar count (default).
   * - `inline` — toggle + `start–end` text only.
   */
  variant?: LoopControlVariant;
  /** Disable the control. */
  disabled?: boolean;
  /** Fires with the next enabled state when the loop toggle is pressed. */
  onToggle?: (enabled: boolean) => void;
  /** Fires with `[start, end]` when the region steppers change it. */
  onRegionChange?: (start: number, end: number) => void;
}

/**
 * A loop-region control — a UI shell only, it loops no transport, and the DOM
 * parity of `native/music`'s `LoopControl`. Shows a loop on/off toggle (state
 * via `aria-pressed` + fill, not color alone) and, in the `bar` variant, a strip
 * visualizing the `[start, end]` region over `totalBars` with −/＋ steppers that
 * report through `onRegionChange`. All bounds are clamped/guarded. Token-only.
 */
export const LoopControl = React.forwardRef<HTMLDivElement, LoopControlProps>(function LoopControl(
  {
    enabled,
    start = 1,
    end = 4,
    totalBars = 8,
    variant = 'bar',
    disabled = false,
    onToggle,
    onRegionChange,
    className,
    ...rest
  },
  ref
) {
  const bars = Math.max(1, Math.trunc(Number.isFinite(totalBars) ? totalBars : 8));
  const s = clamp(Math.trunc(start), 1, bars);
  const e = clamp(Math.trunc(end), s, bars);

  const setRegion = (ns: number, ne: number): void => {
    if (disabled) return;
    const cs = clamp(ns, 1, bars);
    const ce = clamp(ne, cs, bars);
    onRegionChange?.(cs, ce);
  };

  return (
    <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-sm)]', className)} {...rest}>
      <button
        type="button"
        disabled={disabled}
        aria-pressed={enabled}
        aria-label={enabled ? 'Turn loop off' : 'Turn loop on'}
        onClick={() => onToggle?.(!enabled)}
        className={cn(
          'flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          disabled && 'opacity-50',
          enabled ? 'border-primary bg-primary/10' : 'border-border bg-transparent hover:bg-primary/10'
        )}
      >
        <Icon glyph="🔁" size="sm" color={enabled ? 'primary' : 'muted'} />
        <span className={cn('text-sm font-bold', enabled ? 'text-primary' : 'text-muted')}>
          Loop {enabled ? 'On' : 'Off'}
        </span>
      </button>

      {variant === 'bar' ? (
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <div
            role="img"
            aria-label={`Loop region bars ${s} to ${e} of ${bars}`}
            className="flex h-4 gap-px"
          >
            {Array.from({ length: bars }).map((_, i) => {
              const bar = i + 1;
              const inRegion = bar >= s && bar <= e;
              return (
                <span
                  key={bar}
                  aria-hidden="true"
                  className={cn(
                    'flex-1 rounded-[var(--xen-radius-sm)]',
                    inRegion && enabled ? 'bg-primary' : inRegion ? 'bg-primary/30' : 'bg-border'
                  )}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <Stepper label="Start" value={s} onDec={() => setRegion(s - 1, e)} onInc={() => setRegion(s + 1, e)} disabled={disabled} />
            <Stepper label="End" value={e} onDec={() => setRegion(s, e - 1)} onInc={() => setRegion(s, e + 1)} disabled={disabled} />
          </div>
        </div>
      ) : (
        <span className="text-sm font-semibold text-muted">
          Bars {s}–{e}
        </span>
      )}
    </div>
  );
});

function Stepper({
  label,
  value,
  onDec,
  onInc,
  disabled,
}: {
  label: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  disabled: boolean;
}): React.ReactElement {
  const btn = cn(
    'flex h-[26px] w-[26px] items-center justify-center rounded-[var(--xen-radius-sm)] border border-border',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-40'
  );
  return (
    <div className="flex items-center gap-[var(--xen-space-xs)]">
      <span className="text-xs font-semibold text-muted">{label}</span>
      <button type="button" aria-label={`Decrease ${label.toLowerCase()} bar`} disabled={disabled} onClick={onDec} className={btn}>
        <Icon glyph="−" size="sm" color="onSurface" />
      </button>
      <span className="min-w-4 text-center text-sm font-bold text-on-surface">{value}</span>
      <button type="button" aria-label={`Increase ${label.toLowerCase()} bar`} disabled={disabled} onClick={onInc} className={btn}>
        <Icon glyph="＋" size="sm" color="onSurface" />
      </button>
    </div>
  );
}
