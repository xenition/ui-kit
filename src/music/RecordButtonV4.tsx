import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatDuration } from './types';
import type { RecordButtonProps, RecordButtonSize } from './RecordButton';

/** Drop-in for {@link RecordButtonProps} — same props, the V4 "session" design. */
export type RecordButtonV4Props = RecordButtonProps;

/** RecordButton's OWN size scale (sm/md/lg) — distinct from Icon sizes. */
const DIAM: Record<RecordButtonSize, number> = { sm: 44, md: 56, lg: 72 };

/**
 * RecordButton — **V4** "session" design (web parity of the native V4). The
 * tactile arm/record control: a round `danger`-token button whose glyph
 * **morphs from a ● dot (idle) to a rounded ■ square (recording)** and adds a
 * leading `●` marker + "Rec"/"Stop" label in the `labeled` variant — the state
 * is surfaced by shape, marker and label, **never color alone**. Honors every
 * `variant` (`ring` outlined, `solid` filled, `labeled` ring + text/timer) and
 * `size` (`sm`/`md`/`lg`, its own ≥44px scale). Pressing fires `onToggle(next)`;
 * the `labeled` variant shows the `elapsedSeconds` timer while recording. No
 * gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export const RecordButtonV4 = React.forwardRef<HTMLDivElement, RecordButtonV4Props>(function RecordButtonV4(
  { recording, variant = 'ring', size = 'md', elapsedSeconds, disabled = false, onToggle, className, ...rest },
  ref
) {
  const diam = DIAM[size];
  const solid = variant === 'solid';

  const button = (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={recording}
      aria-label={recording ? 'Stop recording' : 'Start recording'}
      onClick={() => onToggle?.(!recording)}
      style={{ width: diam, height: diam }}
      className={cn(
        'flex items-center justify-center rounded-full border-danger transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-1',
        disabled ? 'opacity-50' : 'hover:opacity-85 active:scale-95',
        solid ? 'border-0 bg-danger' : cn('border-[3px]', recording ? 'bg-danger/20' : 'bg-transparent')
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'transition-all',
          // Dot when idle, rounded square when recording (shape = state).
          recording ? 'rounded-[var(--xen-radius-sm)]' : 'rounded-full',
          solid ? 'bg-on-danger' : 'bg-danger'
        )}
        style={{
          width: recording ? diam * 0.36 : diam * 0.5,
          height: recording ? diam * 0.36 : diam * 0.5,
        }}
      />
    </button>
  );

  if (variant !== 'labeled') {
    return (
      <div ref={ref} className={className} {...rest}>
        {button}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-sm)]', className)} {...rest}>
      {button}
      <div className="flex flex-col gap-0.5">
        <span className={cn('flex items-center gap-[var(--xen-space-xs)] text-sm font-bold', recording ? 'text-danger' : 'text-on-surface')}>
          {/* A ● marker rides the label so state never rests on color alone. */}
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-danger" />
          {recording ? 'Stop' : 'Rec'}
        </span>
        {recording ? (
          <span className="text-xs font-semibold tabular-nums text-muted">{formatDuration(elapsedSeconds ?? 0)}</span>
        ) : null}
      </div>
    </div>
  );
});
