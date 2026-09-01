import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp } from './types';
import type { LoopControlProps } from './LoopControl';

/** Drop-in for {@link LoopControlProps} — same props, the V4 "session" design. */
export type LoopControlV4Props = LoopControlProps;

/**
 * LoopControl — **V4** "session" design (web parity of the native V4). The
 * tactile loop control: a rounded toggle whose on state reads through a
 * soft-primary fill **and** a `🔁` glyph + "On"/"Off" label (never color
 * alone), plus — in the `bar` variant — a chunky region strip over `totalBars`
 * with the `[start, end]` region lit, driven by ≥44px −/＋ steppers reporting
 * through `onRegionChange`. The `inline` variant collapses to a bold
 * tabular-nums `Bars s–e` readout. All bounds clamp/guard; `enabled`/`disabled`
 * honored. No gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export const LoopControlV4 = React.forwardRef<HTMLDivElement, LoopControlV4Props>(function LoopControlV4(
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
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      <button
        type="button"
        disabled={disabled}
        aria-pressed={enabled}
        aria-label={enabled ? 'Turn loop off' : 'Turn loop on'}
        onClick={() => onToggle?.(!enabled)}
        className={cn(
          'flex min-h-11 shrink-0 items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          disabled && 'opacity-50',
          enabled ? 'border-primary bg-primary/15' : 'border-border bg-transparent hover:bg-primary/10'
        )}
      >
        <Icon glyph="🔁" size="sm" color={enabled ? 'primary' : 'muted'} />
        <span className={cn('text-sm font-bold', enabled ? 'text-primary' : 'text-muted')}>
          Loop {enabled ? 'On' : 'Off'}
        </span>
      </button>

      {variant === 'bar' ? (
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <div role="img" aria-label={`Loop region bars ${s} to ${e} of ${bars}`} className="flex h-5 gap-[2px]">
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
        <span className="text-sm font-bold tabular-nums text-on-surface">
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
    'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface transition-colors',
    'hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-40'
  );
  return (
    <div className="flex items-center gap-[var(--xen-space-xs)]">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      <button type="button" aria-label={`Decrease ${label.toLowerCase()} bar`} disabled={disabled} onClick={onDec} className={btn}>
        <Icon glyph="−" size="sm" color="onSurface" />
      </button>
      <span className="min-w-5 text-center text-sm font-extrabold tabular-nums text-on-surface">{value}</span>
      <button type="button" aria-label={`Increase ${label.toLowerCase()} bar`} disabled={disabled} onClick={onInc} className={btn}>
        <Icon glyph="＋" size="sm" color="onSurface" />
      </button>
    </div>
  );
}
