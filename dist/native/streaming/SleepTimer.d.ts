import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SleepTimerProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * SleepTimer — **V4** "spotlight" design. A sleep-timer control on a clean
 * elevated surface: a row of quick-preset chips plus an "Off" chip and an
 * optional "End of episode" chip. The active choice is the one accent — a solid
 * **primary** fill with `onPrimary` ink; the rest are a soft primary tint. Chips
 * are ≥44px tap targets, grouped as a `radiogroup`, and the active timer is
 * announced. Presentational only; token-only colors via `useXenitionTheme()`
 * and `withAlpha` (no literal hex). Dark-mode safe.
 */
export declare function SleepTimer({ value, onChange, presets, endOfEpisode, onEndOfEpisode, title, style, }: SleepTimerProps): React.ReactElement;
//# sourceMappingURL=SleepTimer.d.ts.map