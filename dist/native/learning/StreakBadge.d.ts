import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Streak emphasis tone. */
export type StreakTone = 'primary' | 'accent' | 'warn' | 'success';
export type StreakBadgeSize = 'sm' | 'md' | 'lg';
export interface StreakBadgeProps {
    /** Current streak length. */
    count: number;
    /** Unit noun (default "day"; pluralized automatically). */
    unit?: string;
    /** Emphasis tone. */
    tone?: StreakTone;
    /** Glyph before the count (default 🔥). */
    glyph?: string;
    /** Size preset. */
    size?: StreakBadgeSize;
    /** Copy shown when `count` is 0. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A gamified streak pill: a flame glyph + the streak count and unit. A zero
 * streak degrades to a muted prompt instead of a "0" badge. The count uses a
 * semantic `tone` color. Token-only colors.
 */
export declare function StreakBadge({ count, unit, tone, glyph, size, emptyLabel, style, }: StreakBadgeProps): React.ReactElement;
//# sourceMappingURL=StreakBadge.d.ts.map