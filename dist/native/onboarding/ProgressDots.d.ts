import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ProgressDotsSize = 'sm' | 'md';
/**
 * How the indicator draws itself.
 *
 * - `'dots'` — a row of dots with the active step widened into a pill. The
 *   slide-position indicator this component has always been.
 * - `'bars'` — the onboarding **step** indicator from the design spec (§2):
 *   one equal-width segment per step, complete and current filled with
 *   `colors.primary`, upcoming in `colors.border`. No numbers, no captions.
 *   This is what replaced the numbered-circle stepper the shipped screens used.
 */
export type ProgressDotsVariant = 'dots' | 'bars';
export interface ProgressDotsProps {
    /** Total number of steps/pages. */
    count: number;
    /** Zero-based index of the active step. */
    activeIndex: number;
    /** Dot scale. Default `'md'`. */
    size?: ProgressDotsSize;
    /**
     * Indicator treatment. Default `'dots'` — the historical rendering, so no
     * existing caller moves. Pass `'bars'` for the header step indicator.
     */
    variant?: ProgressDotsVariant;
    /** When set, dots become pressable and report the tapped index. */
    onDotPress?: (index: number) => void;
    /** Accessible name for the indicator group. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, `radius.full`, `spacing.xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotPress` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
export declare function ProgressDots({ count, activeIndex, size, variant, onDotPress, accessibilityLabel, style, }: ProgressDotsProps): React.ReactElement;
//# sourceMappingURL=ProgressDots.d.ts.map