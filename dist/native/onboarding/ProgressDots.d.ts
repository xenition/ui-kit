import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ProgressDotsSize = 'sm' | 'md';
export interface ProgressDotsProps {
    /** Total number of steps/pages. */
    count: number;
    /** Zero-based index of the active step. */
    activeIndex: number;
    /** Dot scale. Default `'md'`. */
    size?: ProgressDotsSize;
    /** When set, dots become pressable and report the tapped index. */
    onDotPress?: (index: number) => void;
    /** Accessible name for the indicator group. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides}, {@link WelcomeScreen} and the paywall flow so every
 * screen advertises its position identically. Dots are decorative unless
 * `onDotPress` is supplied, in which case each becomes a labelled button. Guards
 * an empty/negative `count`. No literal colors.
 */
export declare function ProgressDots({ count, activeIndex, size, onDotPress, accessibilityLabel, style, }: ProgressDotsProps): React.ReactElement;
//# sourceMappingURL=ProgressDots.d.ts.map