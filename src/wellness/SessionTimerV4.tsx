import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { SessionTimerProps } from './SessionTimer';

export type SessionTimerV4Props = SessionTimerProps;

function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}

/**
 * SessionTimerV4 — the "calm" restyle of {@link SessionTimer}. Same props,
 * defaults, labels, a11y and behavior (`onToggle`/`onReset`, the `Complete`
 * state, the clamped remaining/total); only the surface changes: a clean neutral
 * card with a large mm:ss readout (`text-on-surface`), a slim gradient progress
 * bar showing elapsed (inline width %), a gradient play/pause button, and a reset
 * control. The `tone` prop is retained for parity; the calm ground is single-hue.
 * Token-only colors.
 */
export const SessionTimerV4 = React.forwardRef<
  HTMLDivElement,
  SessionTimerV4Props & React.HTMLAttributes<HTMLDivElement>
>(function SessionTimerV4(
  {
    totalSec,
    remainingSec,
    running = false,
    phaseLabel,
    // tone retained for parity; the calm ground is single-hue.
    tone = 'primary',
    onToggle,
    onReset,
    className,
    ...rest
  },
  ref
) {
  void tone;
  const total = Math.max(0, totalSec);
  const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
  const elapsed = Math.max(0, total - remaining);
  const complete = total > 0 && remaining <= 0;
  const pct = total > 0 ? Math.max(0, Math.min(1, elapsed / total)) * 100 : 0;

  return (
    <div
      ref={ref}
      data-xen-session-timer=""
      aria-label={`Session timer, ${fmt(remaining)} remaining${phaseLabel ? `, ${phaseLabel}` : ''}${
        complete ? ', complete' : running ? ', running' : ', paused'
      }`}
      className={cn(
        'flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-[var(--xen-space-lg)] text-on-surface',
        className
      )}
      {...rest}
    >
      {phaseLabel ? (
        <span className="text-xs font-bold uppercase tracking-wide text-muted">{phaseLabel}</span>
      ) : null}

      <span className={cn('font-heading text-3xl font-extrabold', complete ? 'text-success' : 'text-on-surface')}>
        {fmt(remaining)}
      </span>

      {total > 0 ? (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-700"
            style={{ width: `${pct}%` }}
          />
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
              'flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 transition-opacity',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <Icon glyph={running ? '⏸' : '▶'} size="lg" color="onPrimary" />
          </button>
        )}
        {onReset ? (
          <button
            type="button"
            aria-label="Reset"
            onClick={onReset}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-muted/10 text-base text-on-surface transition-opacity',
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
