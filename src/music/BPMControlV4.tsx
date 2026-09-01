import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp, formatBpm } from './types';
import type { BPMControlProps } from './BPMControl';

/** Drop-in for {@link BPMControlProps} — same props, the V4 "session" design. */
export type BPMControlV4Props = BPMControlProps;

/**
 * BPMControl — **V4** "session" design (web parity of the native V4). The
 * tactile take on a tempo control: big **bold tabular-nums** numerals on a
 * rounded token surface, flanked by satisfying ≥44px round −/＋ steppers.
 * Honors every `variant` — `stepper` (readout + steppers), `inline` (compact
 * single-row), and `tap` (adds a soft-primary "Tap" tempo button firing
 * `onTap`). Steps clamp to `[min, max]` via `clamp` and render through
 * `formatBpm`; `playing` lights a non-color `♪` marker. No gradient — transport
 * controls stay clean/tactile. All colors from `--xen-*` token classes.
 */
export const BPMControlV4 = React.forwardRef<HTMLDivElement, BPMControlV4Props>(function BPMControlV4(
  {
    value,
    min = 40,
    max = 300,
    step = 1,
    variant = 'stepper',
    playing = false,
    disabled = false,
    onChange,
    onTap,
    className,
    ...rest
  },
  ref
) {
  const safe = clamp(value, min, max);
  const compact = variant === 'inline';

  const bump = (delta: number): void => {
    if (disabled) return;
    onChange?.(clamp(safe + delta, min, max));
  };

  const stepBtn = cn(
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xl font-bold text-on-surface transition-colors',
    'hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
    'disabled:opacity-40'
  );

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]',
        disabled && 'opacity-60',
        className
      )}
      {...rest}
    >
      <button
        type="button"
        aria-label="Decrease tempo"
        disabled={disabled || safe <= min}
        onClick={() => bump(-step)}
        className={stepBtn}
      >
        −
      </button>

      <div className={cn('flex flex-col items-center', compact ? 'min-w-[64px]' : 'min-w-[104px]')}>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          {playing ? <Icon glyph="♪" size="sm" color="primary" aria-label="playing" /> : null}
          <span
            aria-label={`Tempo ${formatBpm(safe)} beats per minute${playing ? ', playing' : ''}`}
            className={cn('font-extrabold tabular-nums text-on-surface', compact ? 'text-xl' : 'text-3xl')}
          >
            {formatBpm(safe)}
          </span>
        </div>
        {!compact ? <span className="text-xs font-bold uppercase tracking-wide text-muted">BPM</span> : null}
      </div>

      <button
        type="button"
        aria-label="Increase tempo"
        disabled={disabled || safe >= max}
        onClick={() => bump(step)}
        className={stepBtn}
      >
        ＋
      </button>

      {variant === 'tap' ? (
        <button
          type="button"
          aria-label="Tap tempo"
          disabled={disabled}
          onClick={() => onTap?.()}
          className={cn(
            'flex h-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/15 px-[var(--xen-space-md)] text-sm font-bold text-primary transition-colors',
            'hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-40'
          )}
        >
          Tap
        </button>
      ) : null}
    </div>
  );
});
