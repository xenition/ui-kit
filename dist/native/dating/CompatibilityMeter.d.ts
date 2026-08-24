import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CompatibilityMeterVariant = 'bar' | 'ring' | 'compact';
export type CompatibilityMeterSize = 'sm' | 'md' | 'lg';
export interface CompatibilityMeterProps {
    /** Compatibility score 0–100. */
    score: number;
    /** Heading above the meter. */
    label?: string;
    /** Show the numeric percentage. Defaults to true. */
    showValue?: boolean;
    /** Presentation. `bar` (default), `ring` (dial), or `compact` (inline pill). */
    variant?: CompatibilityMeterVariant;
    /** Size scale (drives ring diameter / text). Defaults to `md`. */
    size?: CompatibilityMeterSize;
    /** Loading skeleton (indeterminate). */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compatibility score meter — visualises a 0–100 match score as a token-styled
 * bar, ring dial, or compact pill. The tone shifts across score bands but the
 * band is always spelled out in words ("Great match") and the a11y label states
 * the number, so meaning never rests on color. Colors come from semantic tokens
 * and `withAlpha` tints — no literal colors. Guarded against out-of-range input.
 */
export declare function CompatibilityMeter({ score, label, showValue, variant, size, loading, style, }: CompatibilityMeterProps): React.ReactElement;
//# sourceMappingURL=CompatibilityMeter.d.ts.map