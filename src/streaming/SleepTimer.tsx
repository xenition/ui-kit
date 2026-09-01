import * as React from 'react';
import { cn } from '../primitives/cn';

/** Default preset durations (minutes) offered by a {@link SleepTimer}. */
const DEFAULT_PRESETS: readonly number[] = [5, 15, 30, 45, 60];

export interface SleepTimerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Active timer in minutes, or `null` when the sleep timer is off. */
  value: number | null;
  /** Called with the chosen minutes, or `null` when "Off" is chosen. */
  onChange: (minutes: number | null) => void;
  /** Preset durations (minutes) to offer as chips. Defaults to `[5, 15, 30, 45, 60]`. */
  presets?: readonly number[];
  /** When `true`, an "End of episode" chip is shown and reflected as selected. */
  endOfEpisode?: boolean;
  /** Called when the "End of episode" chip is chosen. Enables the chip when provided. */
  onEndOfEpisode?: () => void;
  /** Optional header label above the chips (default `'Sleep timer'`). */
  title?: string;
}

/**
 * SleepTimer — **V4** "spotlight" design (web parity of the native V4). A
 * sleep-timer control on a clean elevated surface: a row of quick-preset chips
 * plus an "Off" chip and an optional "End of episode" chip. The active choice is
 * the one accent — a solid **primary** fill with `onPrimary` ink; the rest are a
 * soft `primary/10` tint. Chips are ≥44px tap targets, grouped as a
 * `radiogroup`, and the active timer is announced. Presentational only; all
 * colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export const SleepTimer = React.forwardRef<HTMLDivElement, SleepTimerProps>(function SleepTimer(
  { value, onChange, presets = DEFAULT_PRESETS, endOfEpisode, onEndOfEpisode, title = 'Sleep timer', className, ...rest },
  ref
) {
  const eoeSelected = !!endOfEpisode;
  const announce =
    eoeSelected
      ? 'Sleep timer: end of episode'
      : value == null
        ? 'Sleep timer off'
        : `Sleep timer: ${value} minutes`;

  const chipClass = (selected: boolean) =>
    cn(
      'inline-flex min-h-[44px] items-center justify-center rounded-full px-[var(--xen-space-md)] text-sm font-semibold',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
      selected ? 'bg-primary text-on-primary' : 'bg-primary/10 text-on-surface hover:bg-primary/20'
    );

  return (
    <div
      ref={ref}
      data-xen-sleep-timer=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg',
        className
      )}
      {...rest}
    >
      <span className="px-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted">{title}</span>

      {/* Live announcement of the active timer for screen readers. */}
      <span className="sr-only" role="status" aria-live="polite">
        {announce}
      </span>

      <div role="radiogroup" aria-label={title} className="flex flex-wrap gap-[var(--xen-space-sm)]">
        {/* Off. */}
        <button
          type="button"
          role="radio"
          aria-checked={value == null && !eoeSelected}
          onClick={() => onChange(null)}
          className={chipClass(value == null && !eoeSelected)}
        >
          Off
        </button>

        {/* Presets. */}
        {presets.map((min) => {
          const selected = !eoeSelected && value === min;
          return (
            <button
              key={min}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${min} minutes`}
              onClick={() => onChange(min)}
              className={chipClass(selected)}
            >
              {min}m
            </button>
          );
        })}

        {/* End of episode. */}
        {onEndOfEpisode ? (
          <button
            type="button"
            role="radio"
            aria-checked={eoeSelected}
            onClick={onEndOfEpisode}
            className={chipClass(eoeSelected)}
          >
            End of episode
          </button>
        ) : null}
      </div>
    </div>
  );
});
