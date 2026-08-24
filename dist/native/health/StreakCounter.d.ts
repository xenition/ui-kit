import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type StreakCounterTone = 'primary' | 'success' | 'warn' | 'accent';
export interface StreakCounterProps {
    /** Current streak length. Clamped to `>= 0`. */
    count: number;
    /** Unit noun; defaults to "day". Pluralized automatically. */
    unit?: string;
    /** Caption under the number; defaults to "streak". */
    label?: string;
    /** Accent tone for the number + flame. */
    tone?: StreakCounterTone;
    /** Optional best/record value shown as a muted sub-caption. */
    best?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. All colors trace to `SemanticColors` tokens — no literals.
 */
export declare function StreakCounter({ count, unit, label, tone, best, style, }: StreakCounterProps): React.ReactElement;
//# sourceMappingURL=StreakCounter.d.ts.map