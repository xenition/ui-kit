import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { CARD_SHELL, SLOT_BG, SLOT_ON, SLOT_TEXT, type WellnessSlot } from './_tokens';

export type SessionTimerTone = 'primary' | 'accent' | 'success';

export interface SessionTimerProps {
  /** Total session length in seconds. */
  totalSec: number;
  /** Seconds remaining; clamped to `[0, totalSec]`. */
  remainingSec: number;
  /** Whether the timer is currently counting down. */
  running?: boolean;
  /** Optional phase caption, e.g. "Body scan". */
  phaseLabel?: string;
  /** Accent tone. Default `'primary'`. */
  tone?: SessionTimerTone;
  /** Fires when the play / pause control is tapped, with the next running state. */
  onToggle?: (next: boolean) => void;
  /** Fires when the reset control is tapped (omit to hide it). */
  onReset?: () => void;
  className?: string;
}

const TONE_KEY: Record<SessionTimerTone, WellnessSlot> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

/** Progress bar has no `accent` tone — fold it into `primary`. */
const PROGRESS_TONE: Record<SessionTimerTone, 'primary' | 'success'> = {
  primary: 'primary',
  accent: 'primary',
  success: 'success',
};

function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

/**
 * A meditation session countdown (web parity of the native block): a large mm:ss
 * readout, an elapsed progress bar, a play / pause toggle as a real `<button>`,
 * and an optional reset. When `remainingSec` hits 0 it shows a "✓ Complete"
 * state instead of the toggle. Play state drives the toggle glyph and its a11y
 * label (state, not color alone). Guards a non-positive `totalSec`. Token-only
 * colors.
 */
export const SessionTimer = React.forwardRef<HTMLDivElement, SessionTimerProps>(function SessionTimer(
  { totalSec, remainingSec, running = false, phaseLabel, tone = 'primary', onToggle, onReset, className },
  ref
) {
  const slot = TONE_KEY[tone] ?? 'primary';
  const total = Math.max(0, totalSec);
  const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
  const elapsed = Math.max(0, total - remaining);
  const complete = total > 0 && remaining <= 0;

  return (
    <div
      ref={ref}
      data-xen-session-timer=""
      aria-label={`Session timer, ${fmt(remaining)} remaining${phaseLabel ? `, ${phaseLabel}` : ''}${
        complete ? ', complete' : running ? ', running' : ', paused'
      }`}
      className={cn(
        CARD_SHELL,
        'flex flex-col items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
        className
      )}
    >
      {phaseLabel ? (
        <span className={cn('text-xs font-bold uppercase tracking-wide', SLOT_TEXT[slot])}>{phaseLabel}</span>
      ) : null}

      <span className={cn('font-heading text-3xl font-extrabold', complete ? 'text-success' : 'text-on-surface')}>
        {fmt(remaining)}
      </span>

      {total > 0 ? (
        <div className="w-full">
          <Progress value={elapsed} max={total} tone={PROGRESS_TONE[tone]} size="sm" />
        </div>
      ) : null}

      <div className="flex items-center gap-[var(--xen-space-md)]">
        {complete ? (
          <span className="text-base font-bold text-success">✓ Complete</span>
        ) : (
          <button
            type="button"
            aria-pressed={running}
            aria-label={running ? 'Pause' : 'Play'}
            onClick={() => onToggle?.(!running)}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full text-lg transition-opacity',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              SLOT_BG[slot],
              SLOT_ON[slot]
            )}
          >
            {running ? '⏸' : '▶'}
          </button>
        )}
        {onReset ? (
          <button
            type="button"
            aria-label="Reset"
            onClick={onReset}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full bg-muted/10 text-base text-on-surface transition-opacity',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            ↺
          </button>
        ) : null}
      </div>
    </div>
  );
});
