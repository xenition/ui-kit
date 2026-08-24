import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type MindfulnessStreakTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export interface MindfulnessStreakProps {
    /** Current consecutive-day streak. */
    count: number;
    /** Best / longest streak (shown as a secondary stat). */
    best?: number;
    /**
     * Last-7-days completion, oldest→newest. `true` = practiced that day.
     * Trailing/short arrays are tolerated; only the last 7 are shown.
     */
    week?: boolean[];
    /** Accent tone. Default `'primary'`. */
    tone?: MindfulnessStreakTone;
    /** Word for the unit. Default "day". */
    unit?: string;
    /** Prompt shown when `count` is 0. Default "Start your streak". */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A mindfulness streak card: a flame + big day count, an optional best-streak
 * stat, and a 7-day dot strip where practiced days fill in the tone color and
 * missed days read as a muted track (state via fill + a11y label, not color
 * alone). At `count` 0 it drops the flame and shows an encouraging prompt.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export declare function MindfulnessStreak({ count, best, week, tone, unit, emptyLabel, style, }: MindfulnessStreakProps): React.ReactElement;
//# sourceMappingURL=MindfulnessStreak.d.ts.map