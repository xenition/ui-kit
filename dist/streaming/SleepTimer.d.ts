import * as React from 'react';
export interface SleepTimerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
export declare const SleepTimer: React.ForwardRefExoticComponent<SleepTimerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepTimer.d.ts.map