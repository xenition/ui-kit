import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatDuration } from './types';

export type RecordButtonVariant = 'ring' | 'solid' | 'labeled';
export type RecordButtonSize = 'sm' | 'md' | 'lg';

export interface RecordButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether recording is in progress. */
  recording: boolean;
  /**
   * - `ring` — circular record button, dot ⟷ square morph (default).
   * - `solid` — filled danger circle.
   * - `labeled` — `ring` plus a "Rec"/"Stop" label + optional timer.
   */
  variant?: RecordButtonVariant;
  /** Button size (default `md`). */
  size?: RecordButtonSize;
  /** Elapsed record time in seconds (shown in the `labeled` variant). */
  elapsedSeconds?: number;
  /** Disable the button. */
  disabled?: boolean;
  /** Fires with the next recording state when pressed. */
  onToggle?: (recording: boolean) => void;
}

const DIAM: Record<RecordButtonSize, number> = { sm: 40, md: 56, lg: 72 };

/**
 * A record toggle button — a UI shell only, it captures nothing, and the DOM
 * parity of `native/music`'s `RecordButton`. Shows a record affordance that
 * **morphs from a dot (idle) to a rounded square (recording)** — the state is
 * surfaced in the a11y label + `aria-pressed` and the shape change, never color
 * alone. Pressing fires `onToggle(next)`. The `labeled` variant adds a
 * "Rec"/"Stop" label and an elapsed timer. Uses the `danger` token for the
 * record accent; no literal colors.
 */
export const RecordButton = React.forwardRef<HTMLDivElement, RecordButtonProps>(
  function RecordButton(
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
          disabled ? 'opacity-50' : 'hover:opacity-85',
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
          <span className={cn('text-sm font-bold', recording ? 'text-danger' : 'text-on-surface')}>
            {recording ? 'Stop' : 'Rec'}
          </span>
          {recording ? (
            <span className="text-xs font-semibold text-muted">{formatDuration(elapsedSeconds ?? 0)}</span>
          ) : null}
        </div>
      </div>
    );
  }
);
