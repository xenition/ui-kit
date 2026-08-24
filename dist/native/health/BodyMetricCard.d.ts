import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BodyMetricVariant = 'weight' | 'bmi' | 'body-fat' | 'muscle' | 'waist' | 'blood-sugar';
export interface BodyMetricCardProps {
    /** Which body metric; drives the icon, label, and default unit. */
    variant: BodyMetricVariant;
    /** The current measurement. */
    value: React.ReactNode;
    /** Override the variant's default unit. Pass `''` to hide. */
    unit?: string;
    /** Change vs. the previous reading; positive reads success, negative danger. */
    delta?: number;
    /**
     * Invert the delta tone — for metrics where down is good (weight, body fat,
     * waist). When true a negative delta reads `success`.
     */
    lowerIsBetter?: boolean;
    /** Recent history for an inline sparkline trend. */
    trend?: number[];
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. Colors trace to
 * `SemanticColors` tokens — no literals. Pressable when `onPress` is set.
 */
export declare function BodyMetricCard({ variant, value, unit, delta, lowerIsBetter, trend, onPress, style, }: BodyMetricCardProps): React.ReactElement;
//# sourceMappingURL=BodyMetricCard.d.ts.map